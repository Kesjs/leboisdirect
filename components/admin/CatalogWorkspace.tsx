"use client";

import { useMemo, useRef, useState } from "react";

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
  price: number;
  stock: number;
  imageUrls: string[];
};

type Props = {
  products: AdminProduct[];
  categories: AdminCategory[];
  error: string;
  message: string;
  onCreate: (values: ProductValues, files: File[]) => Promise<void>;
  onSave: (
    productId: string,
    variantId: string | undefined,
    values: ProductValues,
    files: File[],
  ) => Promise<void>;
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
    const size = Math.max(18, Math.round(canvas.width * 0.035));
    const padding = Math.round(size * 0.8);
    context.font = `700 ${size}px Arial, sans-serif`;
    context.textAlign = "right";
    context.textBaseline = "bottom";
    context.fillStyle = "rgba(35,35,35,.72)";
    context.fillText(
      "BRAVIKO",
      canvas.width - padding + 1,
      canvas.height - padding + 1,
    );
    context.fillStyle = "rgba(255,255,255,.92)";
    context.fillText(
      "BRAVIKO",
      canvas.width - padding,
      canvas.height - padding,
    );
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
    stock: Number(variant?.stock || 0),
    imageUrls: [],
  };
}

function Icon({
  name,
}: {
  name: "search" | "plus" | "upload" | "check" | "trash" | "image" | "chevron";
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
  const [open, setOpen] = useState(false);
  const selected =
    options.find((option) => option.value === value)?.label || "Choisir…";
  return (
    <div className="relative grid gap-2 text-sm font-medium">
      <span>{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-[44px] w-full min-w-0 items-center justify-between rounded-[8px] border border-hairline bg-white px-3 text-left font-normal transition hover:border-charcoal focus:border-braise focus:outline-none focus:ring-2 focus:ring-braise/10"
      >
        <span className={value ? "text-charcoal" : "text-ash"}>{selected}</span>
        <Icon name="chevron" />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[70px] z-30 overflow-hidden rounded-[10px] border border-hairline bg-white p-1 shadow-[0_18px_50px_rgba(22,22,22,.14)]"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option.value === value}
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-[6px] px-3 py-2.5 text-left text-sm hover:bg-ivory"
            >
              {option.label}
              {option.value === value && <Icon name="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
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
                <span className="absolute bottom-1 right-1 rounded bg-black/45 px-1.5 py-1 text-[8px] font-bold tracking-[.12em] text-white">
                  BRAVIKO
                </span>
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
  onClose,
}: {
  product: AdminProduct | null;
  categories: AdminCategory[];
  onCreate: Props["onCreate"];
  onSave: Props["onSave"];
  onClose: () => void;
}) {
  const [values, setValues] = useState<ProductValues>(() =>
    initialValues(product),
  );
  const [files, setFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
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
    setSaving(true);
    try {
      const filesToSave = watermark
        ? await Promise.all(files.map(addWatermark))
        : files;
      const valuesToSave = { ...values, imageUrls, status: publish ? ("published" as const) : values.status };
      if (product)
        await onSave(
          product.id,
          product.variants[0]?.id,
          valuesToSave,
          filesToSave,
        );
      else await onCreate(valuesToSave, filesToSave);
      onClose();
    } finally {
      setSaving(false);
    }
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    await save();
  };
  return (
    <form
      onSubmit={submit}
      className="flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-[12px] border border-hairline bg-white p-4 shadow-[0_14px_36px_rgba(22,22,22,.06)] sm:p-5 xl:max-h-[calc(100dvh-3rem)]"
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
          className="shrink-0 rounded-[8px] border border-hairline px-3 py-2 text-xs font-medium text-smoke transition hover:border-charcoal hover:text-charcoal"
        >
          Fermer
        </button>
      </div>
      <div className="mt-4 grid min-w-0 gap-4 xl:overflow-y-auto xl:pr-1">
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
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium">
            Prix (€)
            <input
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={(event) => update("price", Number(event.target.value))}
              className="admin-input"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Stock
            <input
              type="number"
              min="0"
              step="1"
              value={values.stock}
              onChange={(event) => update("stock", Number(event.target.value))}
              className="admin-input"
            />
          </label>
        </div>
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
              Le filigrane sera intégré aux nouvelles images au moment de
              l’enregistrement.
            </p>
          </div>
          <AdminCheckbox checked={watermark} onChange={setWatermark}>
            Ajouter le filigrane Braviko
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
          disabled={saving}
          className="h-[42px] min-w-0 rounded-[8px] bg-charcoal px-4 text-sm font-semibold text-white transition hover:bg-braise disabled:opacity-50"
        >
          {saving
            ? "Enregistrement…"
            : product
              ? "Enregistrer les modifications"
              : "Créer le produit"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        {product && values.status !== "published" && (
          <button
            type="button"
            disabled={saving}
            onClick={() => void save(true)}
            className="h-[42px] min-w-0 rounded-[8px] bg-forest px-4 text-sm font-semibold text-white transition hover:bg-forest/80 disabled:opacity-50 sm:col-span-2 xl:col-span-1 2xl:col-span-2"
          >
            {saving ? "Publication…" : "Publier et enregistrer"} <span aria-hidden="true">↗</span>
          </button>
        )}
      </div>
    </form>
  );
}

export default function CatalogWorkspace({
  products,
  categories,
  error,
  message,
  onCreate,
  onSave,
  onImportFile,
  catalogDraft,
  importing,
  onImport,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    products[0]?.id || null,
  );
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AdminStatus>("all");
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
      lowStock: products.filter((item) => Number(item.variants[0]?.stock || 0) < 10).length,
    }),
    [products],
  );
  return (
    <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(420px,500px)] xl:items-start xl:gap-10">
      <section className="min-w-0">
        <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-braise">Catalogue produits</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {products.length} fiche{products.length > 1 ? "s" : ""}
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-smoke">Gérez vos produits, leur disponibilité et leur présence dans la boutique.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCreating(true);
              setSelectedId(null);
            }}
            className="inline-flex h-[42px] w-full items-center justify-center gap-2 rounded-[8px] bg-charcoal px-4 text-sm font-semibold text-white transition hover:bg-braise sm:w-auto"
          >
            <Icon name="plus" /> Nouveau produit
          </button>
        </div>
        <div className="mb-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[14px] border border-hairline bg-white px-4 py-4">
            <p className="text-xs text-smoke">Visibles en boutique</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{counts.published}</p>
          </div>
          <div className="rounded-[14px] border border-hairline bg-white px-4 py-4">
            <p className="text-xs text-smoke">À compléter</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{counts.draft}</p>
          </div>
          <div className={`rounded-[14px] border px-4 py-4 ${counts.lowStock ? "border-braise/30 bg-braise/5" : "border-hairline bg-white"}`}>
            <p className="text-xs text-smoke">Stock à surveiller</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{counts.lowStock}</p>
          </div>
        </div>
        {error && (
          <p className="mb-5 rounded-[16px] border border-braise/30 bg-braise/10 p-4 text-sm text-braise-dark">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-5 rounded-[16px] border border-forest/20 bg-forest/10 p-4 text-sm text-forest">
            {message}
          </p>
        )}
        <div className="mb-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
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
          <div className="flex max-w-full overflow-x-auto rounded-[9px] border border-hairline bg-white p-1 text-xs font-medium">
            {(["all", "published", "draft"] as const).map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setStatus(item)}
                className={`rounded-[6px] px-3 py-2 ${status === item ? "bg-charcoal text-white" : "text-smoke hover:text-charcoal"}`}
              >
                {item === "all"
                  ? `Tous ${counts.all}`
                  : item === "published"
                    ? `Publiés ${counts.published}`
                    : `Brouillons ${counts.draft}`}
              </button>
            ))}
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
                  className={`group w-full rounded-[16px] border p-3 text-left transition hover:-translate-y-0.5 hover:border-[#cfc9be] hover:shadow-[0_14px_32px_rgba(29,29,29,.07)] ${selectedId === product.id && !creating ? "border-charcoal bg-white shadow-[0_10px_24px_rgba(29,29,29,.08)]" : "border-hairline bg-white"}`}
                >
                  <div className="relative h-40 w-full overflow-hidden rounded-[11px] bg-[#e8e3da]">
                    {image ? (
                      <img
                        src={image.publicUrl}
                        alt=""
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-smoke">
                        <Icon name="image" />
                      </div>
                    )}
                  </div>
                  <div className="px-1.5 pb-1 pt-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{name}</p>
                        <p className="mt-1 truncate text-xs text-smoke">{product.categoryName || "Sans catégorie"}</p>
                      </div>
                      <span className={`shrink-0 rounded-[6px] px-2 py-1 text-[11px] font-medium ${product.status === "published" ? "bg-forest/10 text-forest" : "bg-black/5 text-smoke"}`}>
                        {statusLabels[product.status]}
                      </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-3 text-sm">
                      <span className="font-semibold tabular-nums">{variant ? `${Number(variant.price).toFixed(2)} €` : "Prix à définir"}</span>
                      <span className={`${Number(variant?.stock || 0) < 10 ? "text-braise-dark" : "text-smoke"}`}>{variant ? `${variant.stock} en stock` : "Stock à définir"}</span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
        <details className="mt-6 rounded-[20px] border border-braise/30 bg-braise/5 p-5">
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
      <aside className="order-last min-w-0 max-w-full xl:order-none xl:sticky xl:top-6">
        {creating || selected ? (
          <ProductEditor
            key={creating ? "new" : selected?.id}
            product={creating ? null : selected}
            categories={categories}
            onCreate={onCreate}
            onSave={onSave}
            onClose={() => {
              setCreating(false);
              if (!selectedId && products[0]) setSelectedId(products[0].id);
            }}
          />
        ) : (
          <div className="rounded-[24px] border border-dashed border-[#cfc9be] bg-white/50 p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ivory text-smoke">
              <Icon name="image" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">Choisis une fiche</h2>
            <p className="mt-2 text-sm leading-6 text-smoke">
              Sélectionne un produit à gauche pour ouvrir son éditeur, ou crée
              une nouvelle fiche.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
