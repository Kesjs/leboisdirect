import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cleanImagesBySlug } from "@/data/clean-product-images";
import {
  getItalianProductOverride,
  translateVariantLabel,
} from "@/data/product-italian-overrides";

import {
  EXTRA_CATALOG_PRODUCTS,
  formatExtraProductForCatalog,
} from "@/data/extra-catalog-products";

function getCatalogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key)
    throw new Error("Configurazione del catalogo mancante.");
  return createClient(url, key);
}

function resolveImageUrl(
  path: string,
  supabase: ReturnType<typeof getCatalogClient>,
) {
  if (path.startsWith('/')) return path;
  return path.startsWith("http://") || path.startsWith("https://")
    ? path
    : supabase.storage.from("braviko-product-media").getPublicUrl(path).data
        .publicUrl;
}

function parseFeatures(description: string) {
  return description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[^:]{2,40}:\s*\S+/.test(line))
    .map((line) => line.replace(/^[*-]\s*/, ""));
}

export async function GET(request: NextRequest) {
  const supabase = getCatalogClient();
  const slug = request.nextUrl.searchParams.get("slug");
  let query = supabase
    .from("braviko_products")
    .select(
      `
      id, slug, status, featured, sort_order,
      braviko_categories ( id, slug, name ),
      braviko_product_translations ( locale, name, short_description, description, conditioning, delivery_info ),
      braviko_product_variants ( id, sku, label, price, compare_at_price ),
      braviko_product_images ( storage_path, alt_text, sort_order, is_primary )
    `,
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (slug) query = query.eq("slug", slug);
  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const products = (data || []).map((item: any) => {
    const translations = Object.fromEntries(
      (item.braviko_product_translations || []).map((translation: any) => [
        translation.locale,
        translation,
      ]),
    );
    const it = translations.it || translations.fr || translations.de || {};
    const override = getItalianProductOverride(item.slug);
    const variants = [...(item.braviko_product_variants || [])].sort(
      (a: any, b: any) => Number(a.price) - Number(b.price),
    );
    const cleanOverrides = cleanImagesBySlug[item.slug];
    const images = (cleanOverrides && cleanOverrides.length > 0)
      ? cleanOverrides
      : [...(item.braviko_product_images || [])]
          .sort(
            (a: any, b: any) =>
              Number(b.is_primary) - Number(a.is_primary) ||
              Number(a.sort_order) - Number(b.sort_order),
          )
          .map((image: any) => resolveImageUrl(image.storage_path, supabase))
          .filter(Boolean);

    const localizedVariants = variants.map((variant: any, index: number) => ({
      id: variant.id,
      price: Number(variant.price),
      label:
        index === 0 && override?.variantLabel
          ? override.variantLabel
          : translateVariantLabel(variant.label, item.slug),
    }));

    const localizedName = override?.name || it.name || item.slug;
    const localizedDescription = override?.description || it.short_description || it.description || "";
    const localizedFeatures = override?.features || parseFeatures(it.description || "");
    const localizedLongDescription =
      override?.longDescription ||
      localizedDescription;
    const localizedConditioning =
      override?.conditioning || it.conditioning || localizedVariants[0]?.label || "";
    const localizedDelivery = override?.deliveryInfo || it.delivery_info || "";

    return {
      id: item.id,
      slug: item.slug,
      featured: Boolean(item.featured),
      name: localizedName,
      category: item.braviko_categories?.slug || "buches",
      description: localizedDescription,
      features: localizedFeatures,
      longDescription: localizedLongDescription,
      price: Number(variants[0]?.price || 0),
      image: images[0] || "/images/photorealistic-perspective-wood-logs.jpg",
      images: images.length
        ? images
        : ["/images/photorealistic-perspective-wood-logs.jpg"],
      conditioning: localizedConditioning,
      deliveryInfo: localizedDelivery,
      variants: localizedVariants,
      translations: {
        de: translations.de?.name || localizedName,
        it: localizedName,
        description: {
          de:
            translations.de?.short_description ||
            translations.de?.description ||
            localizedDescription,
          it: localizedDescription,
        },
        conditioning: {
          de: translations.de?.conditioning || localizedConditioning,
          it: localizedConditioning,
        },
        delivery: {
          de: translations.de?.delivery_info || localizedDelivery,
          it: localizedDelivery,
        },
      },
    };
  });

  const existingSlugs = new Set(products.map((item: any) => item.slug));
  const extraProducts = EXTRA_CATALOG_PRODUCTS.filter(
    (item) => !existingSlugs.has(item.slug) && (!slug || item.slug === slug),
  ).map(formatExtraProductForCatalog);

  const allProducts = [...products, ...extraProducts];

  const categories = [
    ...new Map(
      allProducts.map((product: any) => [
        product.category,
        { id: product.category, name: product.category },
      ]),
    ).values(),
  ];
  return NextResponse.json(
    { products: allProducts, categories },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
