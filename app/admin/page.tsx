"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import Logo from "@/components/Logo";
import CatalogWorkspace, {
  AdminCategory,
  AdminProduct,
  ProductValues,
} from "@/components/admin/CatalogWorkspace";
import AdminOverview from "@/components/admin/AdminOverview";
import PageSkeleton from "@/components/PageSkeleton";

type CatalogDraft = {
  products?: Array<{
    sku?: string;
    status?: "draft" | "published" | "archived";
    name?: { fr?: string; de?: string; it?: string };
    category?: string;
    subcategory?: string;
    short_description?: string;
    main_characteristics?: string;
    packaging?: string;
    price?: number | null;
    stock?: number | null;
    delivery_time?: string;
    slug?: string;
  }>;
};
type AdminSection = "overview" | "orders" | "customers" | "products";
type CatalogScope = "all" | "heating" | "pets";
const supabase = createClient();
const STOREFRONT_URL = "https://braviko.it/";
const PET_CATEGORY_SLUGS = new Set([
  "alimentazione",
  "comfort",
  "passeggiata-trasporto",
]);
const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const resolveImageUrl = (path: string) =>
  path.startsWith("http://") || path.startsWith("https://")
    ? path
    : supabase.storage.from("braviko-product-media").getPublicUrl(path).data
        .publicUrl;

export default function AdminPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [catalogDraft, setCatalogDraft] = useState<CatalogDraft | null>(null);
  const [importing, setImporting] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("overview");
  const [catalogScope, setCatalogScope] = useState<CatalogScope>("all");
  const checkAccess = useCallback(async () => {
    const timeout = new Promise<never>((_, reject) =>
      window.setTimeout(
        () =>
          reject(new Error("La sessione di amministrazione sta impiegando troppo tempo per rispondere.")),
        8000,
      ),
    );
    try {
      const {
        data: { session },
      } = await Promise.race([supabase.auth.getSession(), timeout]);
      const currentUser = session?.user ?? null;
      setUser(
        currentUser ? { id: currentUser.id, email: currentUser.email } : null,
      );
      if (!currentUser) {
        setAuthorized(false);
        return;
      }
      const { data } = await supabase
        .from("braviko_admins")
        .select("active")
        .eq("user_id", currentUser.id)
        .maybeSingle();
      setAuthorized(Boolean(data?.active));
    } catch (accessError) {
      setUser(null);
      setAuthorized(false);
      setError(
        accessError instanceof Error
          ? accessError.message
          : "L’accès administrateur est indisponible.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  const loadCatalog = useCallback(async () => {
    setError("");
    const [
      { data: productData, error: productError },
      { data: categoryData, error: categoryError },
    ] = await Promise.all([
      supabase
        .from("braviko_products")
        .select(
          "id, slug, category_id, status, featured, created_at, braviko_categories(name), braviko_product_translations(locale, name, short_description, description, conditioning, delivery_info), braviko_product_variants(id, sku, price, stock, label), braviko_product_images(id, storage_path, alt_text, is_primary, sort_order)",
        )
        .order("created_at", { ascending: false }),
      supabase
        .from("braviko_categories")
        .select("id, slug, name, parent_id")
        .order("sort_order"),
    ]);
    if (productError || categoryError) {
      setError(
        productError?.message ||
          categoryError?.message ||
          "Impossible de charger le catalogue.",
      );
      return;
    }
    const mapped = (
      (productData || []) as unknown as Array<
        AdminProduct & {
          braviko_categories?: { name: string } | { name: string }[];
          braviko_product_translations?: AdminProduct["translations"];
          braviko_product_variants?: AdminProduct["variants"];
          braviko_product_images?: Omit<
            AdminProduct["images"][number],
            "publicUrl"
          >[];
        }
      >
    ).map((product) => ({
      ...product,
      categoryName: Array.isArray(product.braviko_categories)
        ? product.braviko_categories[0]?.name
        : product.braviko_categories?.name,
      translations: product.braviko_product_translations || [],
      variants: product.braviko_product_variants || [],
      images: (product.braviko_product_images || [])
        .sort((a, b) => Number(b.is_primary) - Number(a.is_primary))
        .map((image) => ({
          ...image,
          publicUrl: resolveImageUrl(image.storage_path),
        })),
    }));
    setProducts(mapped);
    setCategories((categoryData || []) as AdminCategory[]);
  }, []);
  useEffect(() => {
    checkAccess();
  }, [checkAccess]);
  useEffect(() => {
    if (authorized) loadCatalog();
  }, [authorized, loadCatalog]);
  async function uploadImages(
    productId: string,
    files: File[],
    altText: string,
    hasExistingImages: boolean,
  ) {
    for (const [index, file] of files.entries()) {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${productId}/${Date.now()}-${index}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from("braviko-product-media")
        .upload(path, file, {
          upsert: false,
          contentType: file.type,
          cacheControl: "31536000",
        });
      if (uploadError) throw uploadError;
      const { error: imageError } = await supabase
        .from("braviko_product_images")
        .insert({
          product_id: productId,
          storage_path: path,
          alt_text: altText,
          sort_order: index,
          is_primary: !hasExistingImages && index === 0,
        });
      if (imageError) throw imageError;
    }
  }
  async function saveImageLinks(
    productId: string,
    links: string[],
    altText: string,
    hasExistingImages: boolean,
  ) {
    if (!links.length) return;
    const { error: imageError } = await supabase
      .from("braviko_product_images")
      .insert(
        links.map((link, index) => ({
          product_id: productId,
          storage_path: link,
          alt_text: altText,
          sort_order: index,
          is_primary: !hasExistingImages && index === 0,
        })),
      );
    if (imageError) throw imageError;
  }
  async function createProduct(values: ProductValues, files: File[]): Promise<boolean> {
    setError("");
    setMessage("");
    if (!values.names.it.trim() || !values.categoryId) {
      setError("Le nom principal et la catégorie sont obligatoires.");
      return false;
    }
    const { data: product, error: productError } = await supabase
      .from("braviko_products")
      .insert({
        slug: slugify(values.slug || values.names.it),
        category_id: values.categoryId,
        status: values.status,
        featured: values.featured,
      })
      .select("id")
      .single();
    if (productError || !product) {
      setError(productError?.message || "Impossible de créer le produit.");
      return false;
    }
    const translations = (["fr", "de", "it"] as const).map((locale) => ({
      product_id: product.id,
      locale,
      name: values.names[locale] || values.names.it,
      short_description: values.shortDescription,
      description: values.description,
      conditioning: values.conditioning,
      delivery_info: values.deliveryInfo,
    }));
    const [{ error: translationError }, { error: variantError }] =
      await Promise.all([
        supabase.from("braviko_product_translations").insert(translations),
        supabase.from("braviko_product_variants").insert({
          product_id: product.id,
          sku: values.sku || slugify(values.names.it),
          label: values.label || "Format standard",
          price: values.price,
          stock: Number(values.stock || 0),
        }),
      ]);
    if (translationError || variantError) {
      setError(
        translationError?.message ||
          variantError?.message ||
          "Le produit a été créé, mais ses détails sont incomplets.",
      );
      await loadCatalog();
      return false;
    }
    try {
      await uploadImages(product.id, files, values.names.it, false);
      await saveImageLinks(
        product.id,
        values.imageUrls,
        values.names.it,
        files.length > 0,
      );
    } catch (uploadError) {
      setError(
        `Produit créé, mais une image n’a pas pu être enregistrée : ${uploadError instanceof Error ? uploadError.message : "erreur inconnue"}`,
      );
      await loadCatalog();
      return false;
    }
    setMessage("Produit créé dans le catalogue Braviko.");
    await loadCatalog();
    return true;
  }
  async function saveProduct(
    productId: string,
    variantId: string | undefined,
    values: ProductValues,
    files: File[],
  ): Promise<boolean> {
    setError("");
    setMessage("");
    const currentProduct = products.find((item) => item.id === productId);
    const statusToSave = currentProduct?.status === "published" ? "published" : values.status;
    const { error: productError } = await supabase
      .from("braviko_products")
      .update({
        slug: slugify(values.slug || values.names.it),
        category_id: values.categoryId,
        status: statusToSave,
        featured: values.featured,
      })
      .eq("id", productId);
    if (productError) {
      setError(productError.message);
      return false;
    }
    const { error: translationError } = await supabase
      .from("braviko_product_translations")
      .upsert(
        (["fr", "de", "it"] as const).map((locale) => ({
          product_id: productId,
          locale,
          name: values.names[locale] || values.names.it,
          short_description: values.shortDescription,
          description: values.description,
          conditioning: values.conditioning,
          delivery_info: values.deliveryInfo,
        })),
        { onConflict: "product_id,locale" },
      );
    if (translationError) {
      setError(translationError.message);
      return false;
    }
    if (variantId) {
      const { error: variantError } = await supabase
        .from("braviko_product_variants")
        .update({
          sku: values.sku,
          label: values.label,
          price: values.price,
          stock: Number(values.stock || 0),
        })
        .eq("id", variantId);
      if (variantError) {
        setError(variantError.message);
        return false;
      }
    }
    try {
      await uploadImages(
        productId,
        files,
        values.names.it,
        Boolean(products.find((item) => item.id === productId)?.images.length),
      );
      await saveImageLinks(
        productId,
        values.imageUrls,
        values.names.it,
        Boolean(
          products.find((item) => item.id === productId)?.images.length,
        ) || files.length > 0,
      );
    } catch (uploadError) {
      setError(
        `Produit enregistré, mais une image n’a pas pu être ajoutée : ${uploadError instanceof Error ? uploadError.message : "erreur inconnue"}`,
      );
      await loadCatalog();
      return false;
    }
    setMessage(
      "Produit mis à jour. Les modifications sont visibles dans le catalogue.",
    );
    await loadCatalog();
    return true;
  }
  async function deleteProduct(productId: string): Promise<boolean> {
    setError("");
    setMessage("");
    const product = products.find((item) => item.id === productId);
    if (!product) {
      setError("Produit introuvable.");
      return false;
    }
    const storagePaths = product.images
      .map((image) => image.storage_path)
      .filter((path) => !/^https?:\/\//i.test(path));
    if (storagePaths.length) {
      await supabase.storage.from("braviko-product-media").remove(storagePaths);
    }
    const { error: imageError } = await supabase
      .from("braviko_product_images")
      .delete()
      .eq("product_id", productId);
    if (imageError) {
      setError(imageError.message);
      return false;
    }
    const { error: translationError } = await supabase
      .from("braviko_product_translations")
      .delete()
      .eq("product_id", productId);
    if (translationError) {
      setError(translationError.message);
      return false;
    }
    const { error: variantError } = await supabase
      .from("braviko_product_variants")
      .delete()
      .eq("product_id", productId);
    if (variantError) {
      setError(variantError.message);
      return false;
    }
    const { error: productError } = await supabase
      .from("braviko_products")
      .delete()
      .eq("id", productId);
    if (productError) {
      setError(productError.message);
      return false;
    }
    setMessage("Produit supprimé du catalogue.");
    await loadCatalog();
    return true;
  }
  async function readCatalogFile(file: File) {
    setError("");
    setMessage("");
    try {
      const parsed = JSON.parse(await file.text()) as CatalogDraft;
      if (!Array.isArray(parsed.products) || !parsed.products.length)
        throw new Error("Le fichier ne contient aucun produit utilisable.");
      setCatalogDraft(parsed);
      setMessage(
        `${parsed.products.length} prodotti pronti per l’anteprima.`,
      );
    } catch (fileError) {
      setCatalogDraft(null);
      setError(
        fileError instanceof Error
          ? fileError.message
          : "File JSON non valido.",
      );
    }
  }
  async function importCatalogDraft() {
    const entries = catalogDraft?.products || [];
    if (!entries.length) return;
    setImporting(true);
    setError("");
    setMessage("");
    let imported = 0;
    try {
      for (const [index, item] of entries.entries()) {
        const categoryName = item.category?.trim() || "Altri prodotti";
        const categorySlug = slugify(categoryName);
        const { data: parent, error: parentError } = await supabase
          .from("braviko_categories")
          .upsert(
            { slug: categorySlug, name: categoryName, sort_order: index },
            { onConflict: "slug" },
          )
          .select("id")
          .single();
        if (parentError || !parent)
          throw new Error(
          parentError?.message || `Catégorie introuvable : ${categoryName}`,
          );
        const subcategoryName = item.subcategory?.trim();
        const subcategorySlug = subcategoryName
          ? `${categorySlug}-${slugify(subcategoryName)}`
          : categorySlug;
        const { data: category, error: categoryError } = await supabase
          .from("braviko_categories")
          .upsert(
            {
              slug: subcategorySlug,
              name: subcategoryName || categoryName,
              parent_id: subcategoryName ? parent.id : null,
              sort_order: index,
            },
            { onConflict: "slug" },
          )
          .select("id")
          .single();
        if (categoryError || !category)
          throw new Error(
            categoryError?.message || "Impossible de créer la catégorie",
          );
        const nameFr =
          item.name?.fr?.trim() || item.name?.it?.trim() || item.slug || `Produit ${index + 1}`;
        const slug = slugify(item.slug || nameFr);
        const { data: product, error: productError } = await supabase
          .from("braviko_products")
          .upsert(
            {
              slug,
              category_id: category.id,
              status: item.status || "draft",
              featured: false,
              sort_order: index,
            },
            { onConflict: "slug" },
          )
          .select("id")
          .single();
        if (productError || !product)
          throw new Error(
            productError?.message || `Impossible de créer le produit : ${nameFr}`,
          );
        const { error: translationError } = await supabase
          .from("braviko_product_translations")
          .upsert(
            (["fr", "de", "it"] as const).map((locale) => ({
              product_id: product.id,
              locale,
              name: item.name?.[locale] || nameFr,
              short_description: item.short_description || "",
              description: item.main_characteristics || "",
              conditioning: item.packaging || "",
              delivery_info: item.delivery_time || "",
            })),
            { onConflict: "product_id,locale" },
          );
        if (translationError) throw translationError;
        const { error: variantError } = await supabase
          .from("braviko_product_variants")
          .upsert(
            {
              product_id: product.id,
              sku: item.sku || slug,
              label: item.packaging || "Format standard",
              price: Number(item.price || 0),
              stock: Number(item.stock || 0),
            },
            { onConflict: "sku" },
          );
        if (variantError) throw variantError;
        imported++;
      }
      setCatalogDraft(null);
      setMessage(`${imported} produits importés comme brouillons.`);
      await loadCatalog();
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Impossible de terminer l’importation.",
      );
      if (imported) await loadCatalog();
    } finally {
      setImporting(false);
    }
  }
  const catalogCounts = {
    all: products.length,
    heating: products.filter((product) => {
      const category = categories.find((item) => item.id === product.category_id);
      return !PET_CATEGORY_SLUGS.has(category?.slug || "");
    }).length,
    pets: products.filter((product) => {
      const category = categories.find((item) => item.id === product.category_id);
      return PET_CATEGORY_SLUGS.has(category?.slug || "");
    }).length,
  };
  const scopedProducts = products.filter((product) => {
    if (catalogScope === "all") return true;
    const category = categories.find((item) => item.id === product.category_id);
    const isPetProduct = PET_CATEGORY_SLUGS.has(category?.slug || "");
    return catalogScope === "pets" ? isPetProduct : !isPetProduct;
  });
  const scopedCategoryIds = new Set(scopedProducts.map((product) => product.category_id));
  const scopedCategories = categories.filter((category) => {
    if (catalogScope === "all") return true;
    return scopedCategoryIds.has(category.id) || Boolean(category.parent_id && scopedCategoryIds.has(category.parent_id));
  });
  const scopeLabel = catalogScope === "heating" ? "Braviko.fr · Chauffage" : catalogScope === "pets" ? "Braviko.it · Animaux" : "Vue globale · 2 boutiques";
  if (loading) return <PageSkeleton variant="admin" withHeader={false} label="Chargement de l’espace administrateur" />;
  if (!user) return <Login onSuccess={checkAccess} />;
  if (!authorized)
    return (
      <AccessDenied
        email={user.email}
        onSignOut={() => supabase.auth.signOut().then(() => checkAccess())}
      />
    );
  return (
    <main className="admin-shell min-h-screen bg-ivory text-charcoal">
      <header className="admin-header border-b border-hairline bg-ivory/95 px-4 py-4 backdrop-blur sm:px-10 sm:py-5">
        <div className="mx-auto flex max-w-container items-center justify-between gap-3 sm:gap-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-5">
            <Logo />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-braise sm:text-xs sm:tracking-[.22em]">
                Braviko / Admin
              </p>
              <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:mt-2 sm:text-2xl">
                Deux boutiques, un seul pilotage
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={STOREFRONT_URL}
              className="hidden text-sm text-smoke transition hover:text-charcoal sm:block"
            >
              Voir le site ↗
            </Link>
            <button
              onClick={() => supabase.auth.signOut().then(() => checkAccess())}
              className="rounded-full border border-hairline px-3 py-2 text-xs transition hover:border-charcoal sm:px-4 sm:text-sm"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </header>
      <div className="admin-workspace">
        <aside className="admin-sidebar" aria-label="Navigation administrateur">
          <div className="admin-sidebar-label">Espace de travail</div>
          <button className={activeSection === "overview" ? "is-active" : ""} onClick={() => setActiveSection("overview")}>Tableau de bord</button>
          <button className={activeSection === "orders" ? "is-active" : ""} onClick={() => setActiveSection("orders")}>Commandes</button>
          <button className={activeSection === "customers" ? "is-active" : ""} onClick={() => setActiveSection("customers")}>Clients</button>
          <button className={activeSection === "products" ? "is-active" : ""} onClick={() => setActiveSection("products")}>Produits</button>
          <div className="admin-sidebar-rule" />
          <a href={STOREFRONT_URL}>Voir la boutique <span aria-hidden="true">↗</span></a>
        </aside>
        <div className="admin-main">
          <CatalogSwitcher scope={catalogScope} counts={catalogCounts} onChange={setCatalogScope} />
          {activeSection !== "products" && <AdminOverview section={activeSection} onNavigate={setActiveSection} catalogCounts={catalogCounts} />}
          {activeSection === "products" && <div className="admin-catalog-view"><div className="admin-catalog-heading"><div><p className="admin-eyebrow">{scopeLabel}</p><h2>Gérer les produits</h2><p className="admin-muted">{scopedProducts.length} produits dans cette vue, {scopedCategories.length} catégories disponibles et des images prêtes à publier.</p></div><button className="admin-button" onClick={() => setActiveSection("overview")}>Retour au tableau de bord</button></div><CatalogWorkspace products={scopedProducts} categories={scopedCategories} error={error} message={message} onCreate={createProduct} onSave={saveProduct} onDelete={deleteProduct} onImportFile={readCatalogFile} catalogDraft={catalogDraft} importing={importing} onImport={importCatalogDraft} /></div>}
        </div>
      </div>
    </main>
  );
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const loginEmail = email.trim();
    if (!loginEmail || !password) {
      setError("Saisissez votre adresse e-mail et votre mot de passe.");
      setBusy(false);
      return;
    }
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    if (authError) setError(authError.message);
    else onSuccess();
    setBusy(false);
  }
  return (
    <main className="grid min-h-screen bg-ivory lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative isolate hidden overflow-hidden bg-charcoal lg:block">
        <Image
          src="/images/admin-catalog-hero.png"
          alt="Espace de travail organisé pour piloter les catalogues Braviko"
          fill
          priority
          className="z-0 object-cover opacity-70"
          sizes="50vw"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
        <div className="absolute left-12 top-12 z-20 text-xs font-semibold uppercase tracking-[.22em] text-orange-200">
          Braviko / Administration
        </div>
        <div className="absolute bottom-12 left-12 z-20 max-w-md text-white">
          <p className="text-sm font-medium text-white/70">Espace privé</p>
          <h1 className="mt-4 text-5xl font-semibold leading-none tracking-tight">
          Deux boutiques.
          <br />
          Un seul pilotage.
          </h1>
          <p className="mt-5 text-sm leading-6 text-white/75">
            Gérez les produits, les prix, les stocks et les commandes de Braviko.fr
            et Braviko.it depuis le même espace.
          </p>
        </div>
      </section>
      <section className="grid place-items-center px-6 py-12 sm:px-10">
        <form onSubmit={submit} className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-between gap-4">
            <Logo />
            <Link
              href={STOREFRONT_URL}
              className="text-sm text-smoke transition hover:text-charcoal"
            >
              Voir la boutique ↗
            </Link>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-braise">
            Accès administrateur
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Bienvenue.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-smoke">
            Connectez-vous avec votre compte administrateur Supabase.
          </p>
          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="vous@exemple.fr"
                className="h-[52px] min-h-[52px] rounded-card border border-hairline bg-white px-3 font-normal text-charcoal caret-braise outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Password
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  className="h-[52px] min-h-[52px] w-full rounded-card border border-hairline bg-white px-3 pr-11 font-normal text-charcoal caret-braise outline-none transition placeholder:text-ash focus:border-braise focus:ring-2 focus:ring-braise/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                  }
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center text-smoke"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </label>
          </div>
          {error && <p className="mt-4 text-sm text-braise-dark">{error}</p>}
          <button
            disabled={busy}
            className="mt-6 h-[52px] w-full rounded-full bg-charcoal px-5 text-sm font-medium text-white transition hover:bg-braise disabled:opacity-50"
          >
            {busy ? "Connexion…" : "Accéder à l’espace administrateur"}
          </button>
          <p className="mt-5 text-center text-sm text-smoke">
            Accès réservé à l’équipe Braviko
          </p>
        </form>
      </section>
    </main>
  );
}

function CatalogSwitcher({
  scope,
  counts,
  onChange,
}: {
  scope: CatalogScope;
  counts: Record<CatalogScope, number>;
  onChange: (scope: CatalogScope) => void;
}) {
  const options: Array<{ id: CatalogScope; eyebrow: string; label: string; detail: string }> = [
    { id: "all", eyebrow: "Pilotage", label: "Vue globale", detail: "Les deux boutiques" },
    { id: "heating", eyebrow: "Braviko.fr", label: "Chauffage", detail: "Produits maison & chauffage" },
    { id: "pets", eyebrow: "Braviko.it", label: "Animaux", detail: "Produits pour chiens & chats" },
  ];
  return (
    <section className="border-b border-hairline bg-white/60 px-4 py-5 sm:px-10">
      <div className="mx-auto max-w-container">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="admin-eyebrow">Périmètre du catalogue</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">Choisissez la boutique à piloter</h2>
          </div>
          <p className="text-sm text-smoke">Les nombres viennent du catalogue publié.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`rounded-card border p-4 text-left transition ${scope === option.id ? "border-charcoal bg-charcoal text-white shadow-sm" : "border-hairline bg-ivory hover:border-charcoal"}`}
              aria-pressed={scope === option.id}
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`text-[10px] font-semibold uppercase tracking-[.18em] ${scope === option.id ? "text-orange-200" : "text-braise"}`}>{option.eyebrow}</span>
                <strong className="text-2xl tracking-tight">{counts[option.id]}</strong>
              </div>
              <span className="mt-3 block text-base font-semibold">{option.label}</span>
              <span className={`mt-1 block text-sm ${scope === option.id ? "text-white/70" : "text-smoke"}`}>{option.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccessDenied({
  email,
  onSignOut,
}: {
  email?: string;
  onSignOut: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-ivory px-6">
      <div className="w-full max-w-md rounded-card border border-hairline bg-white/70 p-8">
        <p className="text-xs font-semibold uppercase tracking-[.22em] text-braise">
          Accès limité
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Compte non autorisé
        </h1>
        <p className="mt-3 text-sm leading-6 text-smoke">
          {email || "Ce compte"} est connecté, mais n’est pas encore autorisé
              à accéder à l’administration Braviko.
        </p>
        <button
          onClick={onSignOut}
          className="mt-6 rounded-full border border-charcoal px-5 py-3 text-sm font-medium"
        >
          Changer de compte
        </button>
      </div>
    </main>
  );
}
