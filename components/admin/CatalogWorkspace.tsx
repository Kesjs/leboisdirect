"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type AdminStatus = "draft" | "published" | "archived";

export type AdminProduct = {
  id: string;
  slug: string;
  category_id: string;
  status: AdminStatus;
  featured: boolean;
  created_at: string;
  categoryName?: string;
  translations: {
    locale: string;
    name: string;
    short_description?: string | null;
    description?: string | null;
    conditioning?: string | null;
    delivery_info?: string | null;
  }[];
  variants: {
    id: string;
    sku: string;
    price: number;
    stock: number;
    label: string;
  }[];
  images: {
    id: string;
    storage_path: string;
    alt_text?: string | null;
    is_primary: boolean;
    publicUrl: string;
  }[];
};

export type AdminCategory = {
  id: string;
  slug: string;
  name: string;
  parent_id?: string | null;
};

export type ProductValues = {
  slug: string;
  categoryId: string;
  status: AdminStatus;
  featured: boolean;
  names: { fr: string; de: string; it: string };
  shortDescription: string;
  description: string;
  conditioning: string;
  deliveryInfo: string;
  sku: string;
  label: string;
  price: number | "";
  imageUrls: string[];
};

type Props = {
  products: AdminProduct[];
  categories: AdminCategory[];
  error: string;
  message: string;
  onCreate: (values: ProductValues, files: File[]) => Promise<boolean>;
  onSave: (
    productId: string,
    variantId: string | undefined,
    values: ProductValues,
    files: File[],
  ) => Promise<boolean>;
  onDelete: (productId: string) => Promise<boolean>;
  onImportFile: (file: File) => void;
  catalogDraft: {
    products?: {
      name?: { fr?: string };
      category?: string;
      subcategory?: string;
      sku?: string;
      slug?: string;
    }[];
  } | null;
  importing: boolean;
  onImport: () => void;
};

const statusLabels: Record<AdminStatus, string> = {
  draft: "Brouillon",
  published: "Publié",
  archived: "Archivé",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function addWatermark(file: File) {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new window.Image();
      element.onload = () => resolve(element);
      element.onerror = reject;
      element.src = sourceUrl;
    });
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(image, 0, 0);
    const size = Math.max(32, Math.round(Math.min(canvas.width, canvas.height) * 0.15));
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(-Math.PI / 7);
    context.font = `700 ${size}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "rgba(255,255,255,.48)";
    context.fillText("braviko", 0, 0);
    context.restore();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, file.type || "image/jpeg", 0.92),
    );
    if (!blob) return file;
    return new File([blob], file.name, {
      type: blob.type,
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

function initialValues(product?: AdminProduct | null): ProductValues {
  const translation = (locale: string) =>
    product?.translations.find((item) => item.locale === locale);
  const variant = product?.variants[0];
  return {
    slug: product?.slug || "",
    categoryId: product?.category_id || "",
    status: product?.status || "published",
    featured: product?.featured || false,
    names: {
      fr: translation("fr")?.name || "",
      de: translation("de")?.name || "",
      it: translation("it")?.name || "",
    },
    shortDescription: translation("fr")?.short_description || "",
    description: translation("fr")?.description || "",
    conditioning: translation("fr")?.conditioning || "",
    deliveryInfo: translation("fr")?.delivery_info || "",
    sku: variant?.sku || "",
    label: variant?.label || "",
    price: Number(variant?.price || 0),
    imageUrls: [],
  };
}

function Icon({
  name,
}: {
  name: "search" | "plus" | "upload" | "check" | "trash" | "image" | "chevron" | "close";
}) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m0 0-4 4m4-4 4 4" />
        <path d="M5 15v4h14v-4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    trash: (
      <>
        <path d="M5 7h14M10 11v5M14 11v5" />
        <path d="m8 7 .7-3h6.6l.7 3m-9 0 .7 14h8.6L17 7" />
      </>
    ),
    image: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <circle cx="9" cy="9" r="1.5" />
        <path d="m5 17 5-5 3 3 2-2 4 4" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function AdminSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="admin-input"
      >
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}

function AdminCheckbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 text-left text-sm text-smoke"
    >
      <span
        className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[4px] border transition ${checked ? "border-charcoal bg-charcoal text-white" : "border-[#c9c4bb] bg-white"}`}
      >
        {checked && <Icon name="check" />}
      </span>
      {children}
    </button>
  );
}

function FileDropzone({
  files,
  onChange,
  watermark = true,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  watermark?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const accept = (incoming: File[]) =>
    onChange([
      ...files,
      ...incoming
        .filter((file) => file.type.startsWith("image/"))
        .slice(0, 6 - files.length),
    ]);
  return (
    <div className="grid gap-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          accept(Array.from(event.dataTransfer.files));
        }}
        className={`rounded-[10px] border border-dashed p-4 transition ${dragging ? "border-braise bg-braise/5" : "border-[#cfc9be] bg-ivory"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => {
            accept(Array.from(event.target.files || []));
            event.currentTarget.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center gap-3 text-left sm:justify-center"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[8px] bg-white text-charcoal shadow-sm">
            <Icon name="upload" />
          </span>
          <span className="grid gap-0.5">
            <span className="text-sm font-semibold">Ajouter des images</span>
            <span className="text-xs text-smoke">PNG, JPG ou WebP · 6 maximum</span>
          </span>
        </button>
      </div>
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-[12px] bg-[#e8e3da]"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover"
              />
              {watermark && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
                  <span className="-rotate-[25deg] whitespace-nowrap text-[clamp(28px,5vw,52px)] font-bold tracking-[-.04em] text-white/50">
                    braviko
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() =>
                  onChange(files.filter((_, fileIndex) => fileIndex !== index))
                }
                aria-label={`Retirer ${file.name}`}
                className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-charcoal/80 text-white opacity-0 transition group-hover:opacity-100"
              >
                <Icon name="trash" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type LinkState = "idle" | "checking" | "ok" | "error";

function ImageLinksPanel({
  images,
  productName,
  pendingLinks,
  onPendingLinksChange,
  availableSlots,
  onImportedFile,
  watermark,
}: {
  images: AdminProduct["images"];
  productName: string;
  pendingLinks: string[];
  onPendingLinksChange: (links: string[]) => void;
  availableSlots: number;
  onImportedFile: (file: File) => void;
  watermark: boolean;
}) {
  const [url, setUrl] = useState("");
  const [states, setStates] = useState<Record<string, LinkState>>({});
  const [busy, setBusy] = useState(false);
  const [linkNotice, setLinkNotice] = useState("");
  const allLinks = [
    ...images
      .map((image) => image.storage_path)
      .filter((link) => /^https?:\/\//i.test(link)),
    ...pendingLinks,
  ];
  const checkLink = async (link: string) => {
    setStates((current) => ({ ...current, [link]: "checking" }));
    try {
      const response = await fetch(
        `/api/image-status?url=${encodeURIComponent(link)}`,
      );
      setStates((current) => ({
        ...current,
        [link]: response.ok ? "ok" : "error",
      }));
      return response.ok;
    } catch {
      setStates((current) => ({ ...current, [link]: "error" }));
      return false;
    }
  };
  const addLink = async () => {
    const link = url.trim();
    setLinkNotice("");
    if (!/^https?:\/\//i.test(link)) {
      setLinkNotice("Collez une adresse complète commençant par http:// ou https://.");
      return;
    }
    if (
      pendingLinks.includes(link) ||
      images.some((image) => image.storage_path === link)
    ) {
      setLinkNotice("Ce lien est déjà présent sur la fiche.");
      return;
    }
    if (availableSlots <= 0) {
      setLinkNotice("La fiche contient déjà 6 nouvelles images.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/image-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: link }),
      });
      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(result?.error || "L’image n’a pas pu être importée.");
      }
      const blob = await response.blob();
      const extension =
        blob.type === "image/png"
          ? "png"
          : blob.type === "image/webp"
            ? "webp"
            : "jpg";
      const sourceName = new URL(link).pathname.split("/").pop() || "image";
      const baseName = sourceName.replace(/\.[a-z0-9]+$/i, "") || "image";
      onImportedFile(
        new File([blob], `${baseName}.${extension}`, {
          type: blob.type,
          lastModified: Date.now(),
        }),
      );
      setUrl("");
      setLinkNotice(
        watermark
          ? "Image récupérée. Le filigrane Braviko sera intégré automatiquement à l’enregistrement."
          : "Image récupérée et ajoutée à la fiche.",
      );
    } catch (error) {
      setLinkNotice(
        error instanceof Error ? error.message : "L’image n’a pas pu être importée.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="min-w-0 grid gap-3">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold">Liens des images</p>
          <p className="mt-1 text-xs text-smoke">
            Les liens sont testés avant d’être ajoutés au produit.
          </p>
        </div>
        <button
          type="button"
          disabled={!allLinks.length || busy}
          onClick={async () => {
            setBusy(true);
            await Promise.all(allLinks.map(checkLink));
            setBusy(false);
          }}
          className="shrink-0 rounded-[8px] border border-hairline px-3 py-2 text-xs font-semibold transition hover:border-charcoal disabled:opacity-50"
        >
          {busy ? "Vérification…" : "Vérifier les liens"}
        </button>
      </div>
      {allLinks.length > 0 && (
        <div className="grid gap-2">
          {allLinks.map((link) => {
            const state = states[link] || "idle";
            const existingImage = images.find(
              (image) => image.storage_path === link,
            );
            return (
              <div
                key={link}
                className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[8px] border border-hairline bg-ivory px-3 py-2 text-xs"
              >
                {existingImage && (
                  <img
                    src={existingImage.publicUrl}
                    alt={productName}
                    className="h-9 w-9 shrink-0 rounded-[8px] object-cover"
                  />
                )}
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${state === "ok" ? "bg-forest" : state === "error" ? "bg-braise" : state === "checking" ? "animate-pulse bg-amber-500" : "bg-ash"}`}
                />
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="block min-w-0 truncate text-smoke underline decoration-hairline underline-offset-2 hover:text-charcoal"
                  title={link}
                >
                  {link}
                </a>
                {state === "ok" && (
                  <span className="shrink-0 text-forest">Répond</span>
                )}
                {state === "error" && (
                  <span className="shrink-0 text-braise">À vérifier</span>
                )}
                {pendingLinks.includes(link) && (
                  <button
                    type="button"
                    onClick={() =>
                      onPendingLinksChange(
                        pendingLinks.filter((item) => item !== link),
                      )
                    }
                    className="shrink-0 text-smoke hover:text-braise"
                    aria-label={`Retirer le lien ${link}`}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="grid min-w-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void addLink();
            }
          }}
          placeholder="https://exemple.com/image.jpg"
          className="admin-input min-w-0"
          aria-describedby={linkNotice ? "image-link-notice" : undefined}
        />
        <button
          type="button"
          onClick={() => void addLink()}
          disabled={busy || !url.trim() || availableSlots <= 0}
          className="h-[44px] whitespace-nowrap rounded-[8px] bg-charcoal px-4 text-sm font-semibold text-white transition hover:bg-braise disabled:opacity-50"
        >
          {busy ? "Importation…" : "Importer l’image"}
        </button>
      </div>
      {linkNotice && (
        <p id="image-link-notice" className="text-xs leading-5 text-braise-dark">
          {linkNotice}
        </p>
      )}
      {watermark && (
        <p className="text-xs text-smoke">
          Les images fournies par URL sont copiées dans Braviko puis filigranées,
          sans modifier le fichier du site d’origine.
        </p>
      )}
    </div>
  );
}

function ProductEditor({
  product,
  categories,
  onCreate,
  onSave,
  onDelete,
  onClose,
}: {
  product: AdminProduct | null;
  categories: AdminCategory[];
  onCreate: Props["onCreate"];
  onSave: Props["onSave"];
  onDelete: Props["onDelete"];
  onClose: () => void;
}) {
  const [values, setValues] = useState<ProductValues>(() =>
    initialValues(product),
  );
  const [files, setFiles] = useState<File[]>([]);
  const [savingAction, setSavingAction] = useState<"save" | "publish" | "delete" | null>(null);
  const [watermark, setWatermark] = useState(true);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [language, setLanguage] = useState<"fr" | "de" | "it">("fr");
  const update = <K extends keyof ProductValues>(
    key: K,
    value: ProductValues[K],
  ) => setValues((current) => ({ ...current, [key]: value }));
  const updateName = (value: string) =>
    setValues((current) => ({
      ...current,
      names: { ...current.names, [language]: value },
    }));
  const save = async (publish = false) => {
    setSavingAction(publish ? "publish" : "save");
    try {
      const filesToSave = watermark
        ? await Promise.all(files.map(addWatermark))
        : files;
      const valuesToSave = {
        ...values,
        imageUrls,
        price: values.price === "" ? 0 : values.price,
        status: publish ? ("published" as const) : values.status,
      };
      const saved = product
        ? await onSave(
          product.id,
          product.variants[0]?.id,
          valuesToSave,
          filesToSave,
        )
        : await onCreate(valuesToSave, filesToSave);
      if (saved) onClose();
    } finally {
      setSavingAction(null);
    }
  };
  const remove = async () => {
    if (!product || !window.confirm(`Supprimer définitivement « ${values.names.fr || product.slug} » ?`)) return;
    setSavingAction("delete");
    try {
      if (await onDelete(product.id)) onClose();
    } finally {
      setSavingAction(null);
    }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await save();
  };
  return (
    <form
      onSubmit={submit}
      className="flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-[16px] border border-hairline bg-white p-4 shadow-[0_24px_80px_rgba(22,22,22,.18)] sm:p-6"
    >
      <div className="flex min-w-0 items-start justify-between gap-4 border-b border-hairline pb-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-braise">
            {product ? "Modifier le produit" : "Nouveau produit"}
          </p>
          <h2 className="mt-1 truncate text-xl font-semibold tracking-tight" title={product ? values.names.fr || product.slug : undefined}>
            {product ? values.names.fr || product.slug : "Ajouter une fiche"}
          </h2>
          <p className="mt-1 text-sm text-smoke">
            Tous les champs restent lisibles, avec un aperçu avant publication.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[8px] border border-hairline px-3 py-2 text-xs font-medium text-smoke transition hover:border-charcoal hover:text-charcoal"
        >
          <Icon name="close" />
          Fermer
        </button>
      </div>
      <div className="mt-4 grid min-w-0 gap-4 overflow-y-auto pr-1">
        {values.status !== "published" && (
          <div className="rounded-[8px] border border-amber-300/60 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
            <p className="font-semibold">Cette fiche n’est pas visible sur la boutique</p>
            <p className="mt-1 text-xs leading-5">Passe l’état à « Publié » pour l’afficher sur le site. Les brouillons restent visibles uniquement dans l’administration.</p>
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Nom du produit
            <input
              value={values.names[language]}
              onChange={(event) => updateName(event.target.value)}
              required={language === "fr"}
              placeholder={
                language === "fr"
                  ? "Bûches de chêne 33 cm"
                  : language === "de"
                    ? "Eichenholz 33 cm"
                    : "Legna di quercia 33 cm"
              }
              className="admin-input"
            />
            <span className="flex gap-1 text-xs font-normal text-smoke">
              {(["fr", "de", "it"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setLanguage(item)}
                  className={`rounded-[6px] px-2.5 py-1 uppercase transition ${language === item ? "bg-charcoal text-white" : "bg-ivory hover:bg-mist"}`}
                >
                  {item}
                </button>
              ))}
            </span>
          </label>
          <label className="grid gap-2 text-sm font-medium sm:col-span-2">
            Slug
            <input
              value={values.slug}
              onChange={(event) => update("slug", event.target.value)}
              placeholder="buches-chene-33cm"
              className="admin-input"
            />
          </label>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <AdminSelect
            label="Catégorie"
            value={values.categoryId}
            options={[
              { value: "", label: "Choisir une catégorie" },
              ...categories.map((category) => ({
                value: category.id,
                label: category.name,
              })),
            ]}
            onChange={(value) => update("categoryId", value)}
          />
          <AdminSelect
            label="État"
            value={values.status}
            options={Object.entries(statusLabels).map(([value, label]) => ({
              value,
              label,
            }))}
            onChange={(value) => update("status", value as AdminStatus)}
          />
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Prix (€)
          <input
            type="number"
            min="0"
            step="0.01"
            value={values.price}
            onChange={(event) => update("price", event.target.value === "" ? "" : Number(event.target.value))}
            className="admin-input"
          />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            SKU
            <input
              value={values.sku}
              onChange={(event) => update("sku", event.target.value)}
              required
              className="admin-input"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Format
            <input
              value={values.label}
              onChange={(event) => update("label", event.target.value)}
              required
              className="admin-input"
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium">
          Description courte
          <textarea
            value={values.shortDescription}
            onChange={(event) => update("shortDescription", event.target.value)}
            rows={3}
            className="admin-input min-h-[78px] resize-y py-2.5"
            placeholder="Une phrase claire pour présenter le produit."
          />
        </label>
        <AdminCheckbox
          checked={values.featured}
          onChange={(value) => update("featured", value)}
        >
          Mettre ce produit à la une
        </AdminCheckbox>
        <div className="grid min-w-0 gap-3 border-t border-hairline pt-4">
          <div>
            <p className="text-sm font-semibold">Images du produit</p>
            <p className="mt-1 text-xs text-smoke">
              Le filigrane est intégré dans le fichier final de chaque nouvelle
              image au moment de l’enregistrement.
            </p>
          </div>
          <AdminCheckbox checked={watermark} onChange={setWatermark}>
            Appliquer le filigrane Braviko aux nouvelles images
          </AdminCheckbox>
          <ImageLinksPanel
            images={product?.images || []}
            productName={values.names.fr}
            pendingLinks={imageUrls}
            onPendingLinksChange={setImageUrls}
            availableSlots={6 - files.length}
            onImportedFile={(file) =>
              setFiles((current) => [...current, file].slice(0, 6))
            }
            watermark={watermark}
          />
          <FileDropzone files={files} onChange={setFiles} />
        </div>
      </div>
      <div className="mt-4 grid shrink-0 gap-2 border-t border-hairline pt-4 sm:grid-cols-[auto_1fr] xl:grid-cols-1 2xl:grid-cols-[auto_1fr]">
        <button
          type="button"
          onClick={onClose}
          className="h-[42px] rounded-[8px] border border-hairline px-4 text-sm font-medium transition hover:border-charcoal"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={savingAction !== null}
          className="h-[42px] min-w-0 rounded-[8px] bg-charcoal px-4 text-sm font-semibold text-white transition hover:bg-braise disabled:opacity-50"
        >
          {savingAction === "save"
            ? "Enregistrement…"
            : product
              ? "Enregistrer les modifications"
              : "Créer le produit"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        {product && values.status !== "published" && (
          <button
            type="button"
            disabled={savingAction !== null}
            onClick={() => void save(true)}
            className="h-[42px] min-w-0 rounded-[8px] bg-forest px-4 text-sm font-semibold text-white transition hover:bg-forest/80 disabled:opacity-50 sm:col-span-2 xl:col-span-1 2xl:col-span-2"
          >
            {savingAction === "publish" ? "Publication…" : "Publier et enregistrer"} <span aria-hidden="true">↗</span>
          </button>
        )}
        {product && (
          <button
            type="button"
            disabled={savingAction !== null}
            onClick={() => void remove()}
            className="h-[42px] rounded-[8px] border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:border-red-400 hover:bg-red-50 disabled:opacity-50 sm:col-span-2 xl:col-span-1 2xl:col-span-2"
          >
            {savingAction === "delete" ? "Suppression…" : "Supprimer le produit"}
          </button>
        )}
      </div>
    </form>
  );
}

function ProductEditorModal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Éditeur de produit"
        className="max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-[20px]"
      >
        {children}
      </section>
    </div>
  );
}

export default function CatalogWorkspace({
  products,
  categories,
  error,
  message,
  onCreate,
  onSave,
  onDelete,
  onImportFile,
  catalogDraft,
  importing,
  onImport,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AdminStatus>("all");
  const [backfilling, setBackfilling] = useState(false);
  const [backfillNotice, setBackfillNotice] = useState("");
  const selected =
    products.find((product) => product.id === selectedId) || null;
  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const name =
          product.translations.find((item) => item.locale === "fr")?.name ||
          product.slug;
        return (
          (!query ||
            `${name} ${product.slug} ${product.categoryName || ""}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (status === "all" || product.status === status)
        );
      }),
    [products, query, status],
  );
  const counts = useMemo(
    () => ({
      all: products.length,
      published: products.filter((item) => item.status === "published").length,
      draft: products.filter((item) => item.status === "draft").length,
    }),
    [products],
  );
  const filterImage = (filter: "all" | AdminStatus) =>
    products.find((product) => {
      if (filter !== "all" && product.status !== filter) return false;
      return product.images.some((image) => Boolean(image.publicUrl));
    })?.images.find((image) => Boolean(image.publicUrl))?.publicUrl;
  const filterItems = [
    { value: "all" as const, label: "Tout le catalogue", count: counts.all },
    { value: "published" as const, label: "Publié", count: counts.published },
    { value: "draft" as const, label: "À compléter", count: counts.draft },
  ];
  const backfillImages = async () => {
    setBackfilling(true);
    setBackfillNotice("");
    let total = 0;
    let hasMore = true;
    try {
      while (hasMore) {
        const response = await fetch("/api/admin/watermark-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ limit: 24 }),
        });
        const result = (await response.json().catch(() => null)) as
          | { processed?: number; hasMore?: boolean; error?: string; errors?: Array<{ message: string }> }
          | null;
        if (!response.ok) throw new Error(result?.error || result?.errors?.[0]?.message || "Le filigranage n’a pas pu démarrer.");
        total += result?.processed || 0;
        hasMore = Boolean(result?.hasMore);
        if (result?.errors?.length) throw new Error(`${result.errors[0].message}${result.errors.length > 1 ? ` (+${result.errors.length - 1} autre${result.errors.length > 2 ? "s" : ""})` : ""}`);
        if (!result?.processed && hasMore) throw new Error("Le traitement est bloqué sur une image.");
      }
      setBackfillNotice(total ? `${total} image${total > 1 ? "s" : ""} filigranée${total > 1 ? "s" : ""} et protégée${total > 1 ? "s" : ""}.` : "Toutes les images sont déjà protégées.");
    } catch (backfillError) {
      setBackfillNotice(backfillError instanceof Error ? backfillError.message : "Le filigranage a échoué.");
    } finally {
      setBackfilling(false);
    }
  };
  return (
    <div className="min-w-0">
      <section className="min-w-0">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-braise">Catalogue produits</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {products.length} fiche{products.length > 1 ? "s" : ""}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-smoke">Gérez vos produits, leur disponibilité et leur présence dans la boutique.</p>
          </div>
          <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-[auto_auto]">
            <button
              type="button"
              onClick={backfillImages}
              disabled={backfilling}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] border border-hairline bg-white px-4 text-sm font-semibold text-charcoal transition hover:border-charcoal disabled:opacity-50"
            >
              {backfilling ? "Protection…" : "Protéger les images existantes"}
            </button>
            <button
              type="button"
              onClick={() => {
                setCreating(true);
                setSelectedId(null);
              }}
              className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] bg-charcoal px-4 text-sm font-semibold text-white transition hover:bg-braise"
            >
              <Icon name="plus" /> Nouveau produit
            </button>
          </div>
        </div>
        {backfillNotice && <p role="status" className="mb-5 rounded-[12px] border border-forest/20 bg-forest/10 p-4 text-sm text-forest">{backfillNotice}</p>}
        <div className="mb-6 grid overflow-hidden rounded-[12px] border border-hairline bg-white sm:grid-cols-2">
          <div className="border-b border-hairline px-4 py-3.5 sm:border-b-0 sm:border-r">
            <p className="text-xs text-smoke">Visibles en boutique</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{counts.published}</p>
          </div>
          <div className="border-b border-hairline px-4 py-3.5 sm:border-b-0 sm:border-r">
            <p className="text-xs text-smoke">À compléter</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{counts.draft}</p>
          </div>
        </div>
        {error && (
          <p role="alert" className="mb-5 rounded-[12px] border border-braise/30 bg-braise/10 p-4 text-sm text-braise-dark">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mb-5 rounded-[12px] border border-forest/20 bg-forest/10 p-4 text-sm text-forest">
            {message}
          </p>
        )}
        <div className="mb-4">
          <label className="relative">
            <span className="sr-only">Rechercher un produit</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit, une catégorie…"
              className="admin-input h-[44px] w-full pl-10"
            />
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-smoke">
              <Icon name="search" />
            </span>
          </label>
        </div>
        <div className="mb-6 -mx-1 overflow-x-auto px-1 pb-2">
          <div className="flex min-w-max items-stretch gap-2.5" role="group" aria-label="Filtrer le catalogue">
            {filterItems.map((item, index) => {
              const image = filterImage(item.value);
              const active = status === item.value;
              return (
                <button
                  type="button"
                  key={item.value}
                  aria-pressed={active}
                  onClick={() => setStatus(item.value)}
                  className={`group relative h-[76px] w-[152px] overflow-hidden rounded-[12px] border text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 ${index === 1 ? "-skew-x-2" : index === 2 ? "skew-x-2" : ""} ${active ? "border-charcoal" : "border-hairline"}`}
                >
                  {image ? <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-300 group-hover:scale-105" /> : null}
                  <span className={`absolute inset-0 ${active ? "bg-charcoal/75" : "bg-charcoal/55"}`} />
                  <span className={`relative flex h-full skew-x-0 flex-col justify-between p-3 text-white ${index === 1 ? "transform skew-x-2" : index === 2 ? "transform -skew-x-2" : ""}`}>
                    <span className="text-[11px] font-medium uppercase tracking-[.12em]">{item.label}</span>
                    <span className="flex items-end justify-between gap-2"><strong className="text-xl font-semibold leading-none tabular-nums">{item.count}</strong><span className="text-[11px] text-white/75">fiches</span></span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.length === 0 ? (
            <div className="rounded-[16px] border border-dashed border-[#cfc9be] bg-white/60 p-12 text-center text-sm text-smoke sm:col-span-2">
              Aucun produit ne correspond à cette recherche.
            </div>
          ) : (
            filtered.map((product) => {
              const name =
                product.translations.find((item) => item.locale === "fr")
                  ?.name || product.slug;
              const variant = product.variants[0];
              const image =
                product.images.find((item) => item.is_primary) ||
                product.images[0];
              return (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => {
                    setCreating(false);
                    setSelectedId(product.id);
                  }}
                  className={`group w-full overflow-hidden rounded-[14px] border text-left transition hover:border-charcoal focus:outline-none focus-visible:ring-2 focus-visible:ring-braise focus-visible:ring-offset-2 ${selectedId === product.id && !creating ? "border-charcoal bg-white" : "border-hairline bg-white"}`}
                >
                  <div className="relative aspect-[16/8] w-full overflow-hidden bg-[#e8e3da]">
                    {image ? (
                      <img
                        src={image.publicUrl}
                        alt={name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center bg-ivory text-center text-sm text-smoke">
                        <span className="grid justify-items-center gap-2 rounded-[10px] border border-dashed border-[#cfc9be] bg-white/70 px-4 py-3">
                          <Icon name="image" />
                          <span>Image à ajouter</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold">{name}</p>
                        <p className="mt-1 truncate text-xs text-smoke">{product.categoryName || "Sans catégorie"}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-medium ${product.status === "published" ? "bg-forest/10 text-forest" : "bg-black/5 text-smoke"}`}>
                        {statusLabels[product.status]}
                      </span>
                    </div>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-3.5 text-sm">
                      <span className="font-semibold tabular-nums">{variant ? `${Number(variant.price).toFixed(2)} €` : "Prix à définir"}</span>
                      <span className="text-xs font-semibold text-smoke transition group-hover:text-charcoal">Ouvrir la fiche <span aria-hidden="true">→</span></span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        <details className="mt-6 rounded-[12px] border border-braise/30 bg-braise/5 p-4">
          <summary className="cursor-pointer list-none">
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-braise">
              Import rapide
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              Préremplir depuis un catalogue JSON
            </h3>
            <p className="mt-1 text-sm text-smoke">
              Analyse locale avant toute écriture dans Supabase.
            </p>
          </summary>
          <div className="mt-4">
            <input
              type="file"
              accept="application/json,.json"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onImportFile(file);
              }}
              className="block w-full rounded-[14px] border border-hairline bg-white px-3 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-charcoal file:px-3 file:py-2 file:text-white"
            />
            {catalogDraft?.products?.length ? (
              <>
                <p className="mt-3 text-sm font-semibold">
                  {catalogDraft.products.length} fiches prêtes
                </p>
                <button
                  type="button"
                  onClick={onImport}
                  disabled={importing}
                  className="mt-3 rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
                >
                  {importing
                    ? "Import en cours…"
                    : `Importer ${catalogDraft.products.length} produits en brouillons`}
                </button>
              </>
            ) : null}
          </div>
        </details>
      </section>
      {creating || selected ? (
        <ProductEditorModal
          onClose={() => {
            setCreating(false);
            setSelectedId(null);
          }}
        >
          <ProductEditor
            key={creating ? "new" : selected?.id}
            product={creating ? null : selected}
            categories={categories}
            onCreate={onCreate}
            onSave={onSave}
            onDelete={onDelete}
            onClose={() => {
              setCreating(false);
              setSelectedId(null);
            }}
          />
        </ProductEditorModal>
      ) : null}
    </div>
  );
}
