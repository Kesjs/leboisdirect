import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { petCatalog } from "@/data/pet-catalog";
import { isPetCategory } from "@/data/catalog-taxonomy";

function getCatalogClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key)
    throw new Error("La configurazione del catalogo non è disponibile.");
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
  if (process.env.BRAVIKO_PET_PREVIEW === 'true') {
    return NextResponse.json({ products: petCatalog, categories: [...new Set(petCatalog.map((product) => product.category))], source: 'local-preview' });
  }
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
  if (error || !data?.length)
    return NextResponse.json({ products: petCatalog, categories: [...new Set(petCatalog.map((product) => product.category))], source: 'local-preview' });

  const petItems = (data || []).filter((item: any) =>
    isPetCategory(item.braviko_categories?.slug || ""),
  );
  if (!petItems.length)
    return NextResponse.json({ products: petCatalog, categories: [...new Set(petCatalog.map((product) => product.category))], source: 'local-preview' });

  const products = petItems.map((item: any) => {
    const translations = Object.fromEntries(
      (item.braviko_product_translations || []).map((translation: any) => [
        translation.locale,
        translation,
      ]),
    );
    const it = translations.it || translations.fr || translations.de || {};
    const variants = [...(item.braviko_product_variants || [])].sort(
      (a: any, b: any) => Number(a.price) - Number(b.price),
    );
    const images = [...(item.braviko_product_images || [])]
      .sort(
        (a: any, b: any) =>
          Number(b.is_primary) - Number(a.is_primary) ||
          Number(a.sort_order) - Number(b.sort_order),
      )
      .map((image: any) => resolveImageUrl(image.storage_path, supabase))
      .filter(Boolean);

    return {
      id: item.id,
      slug: item.slug,
      featured: Boolean(item.featured),
      name: it.name || item.slug,
      category: item.braviko_categories?.slug || "buches",
      description: it.short_description || it.description || "",
      features: parseFeatures(it.description || ""),
      longDescription: it.description || it.short_description || "",
      price: Number(variants[0]?.price || 0),
      image: images[0] || "/images/pet-cura.png",
      images: images.length
        ? images
        : ["/images/pet-cura.png"],
      conditioning: it.conditioning || variants[0]?.label || "",
      deliveryInfo: it.delivery_info || "",
      variants: variants.map((variant: any) => ({
        id: variant.id,
        price: Number(variant.price),
        label: variant.label,
      })),
      translations: {
        de: translations.de?.name || it.name || item.slug,
        it: translations.it?.name || it.name || item.slug,
        description: {
          de:
            translations.de?.short_description ||
            translations.de?.description ||
            "",
          it:
            translations.it?.short_description ||
            translations.it?.description ||
            "",
        },
        conditioning: {
          de: translations.de?.conditioning || "",
          it: translations.it?.conditioning || "",
        },
        delivery: {
          de: translations.de?.delivery_info || "",
          it: translations.it?.delivery_info || "",
        },
      },
    };
  });

  const categories = [
    ...new Map(
      products.map((product: any) => [
        product.category,
        { id: product.category, name: product.category },
      ]),
    ).values(),
  ];
  return NextResponse.json(
    { products, categories, source: "supabase" },
    {
      headers: { "Cache-Control": "no-store" },
    },
  );
}
