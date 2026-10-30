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

function isInternalDescription(value: string) {
  return /sourcing|scheda di sourcing|approvata|selezionato da braviko|selected by braviko/i.test(value);
}

function getCustomerDescription(translation: any) {
  const description = String(translation?.description || '').trim();
  const shortDescription = String(translation?.short_description || '').trim();
  if (description && !isInternalDescription(description)) return description;
  return shortDescription || description;
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
      id, slug, status, featured, sort_order, product_attributes, product_details,
      braviko_categories ( id, slug, name ),
      braviko_product_translations ( locale, name, short_description, description, conditioning, delivery_info ),
      braviko_product_variants ( id, sku, label, price, compare_at_price, stock ),
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
    const customerDescription = getCustomerDescription(it);
    const details = item.product_details || {};
    const productDetails = {
      overview: details.overview || customerDescription,
      benefits: Array.isArray(details.benefits) ? details.benefits.filter(Boolean) : [],
      usage: details.usage || undefined,
      care: details.care || undefined,
      safety: Array.isArray(details.safety) ? details.safety.filter(Boolean) : [],
      included: details.included || undefined,
    };
    const variants = [...(item.braviko_product_variants || [])].sort(
      (a: any, b: any) => Number(a.price) - Number(b.price),
    );
    const conditioning = it.conditioning && it.conditioning.trim().toLowerCase() !== String(it.name || '').trim().toLowerCase()
      ? it.conditioning
      : '';
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
      description: customerDescription,
      features: productDetails.benefits.length ? productDetails.benefits : parseFeatures(customerDescription),
      longDescription: productDetails.overview,
      price: Number(variants[0]?.price || 0),
      image: images[0] || "/images/pet-cura.png",
      images: images.length
        ? images
        : ["/images/pet-cura.png"],
      conditioning,
      deliveryInfo: it.delivery_info || "",
      attributes: {
        brand: item.product_attributes?.brand || undefined,
        productType: item.product_attributes?.product_type || undefined,
        formatOrWeight: item.product_attributes?.format_or_weight || undefined,
        dimensions: item.product_attributes?.dimensions || undefined,
        size: item.product_attributes?.size || undefined,
        packaging: item.product_attributes?.packaging || undefined,
        materials: item.product_attributes?.materials || undefined,
        capacity: item.product_attributes?.capacity || undefined,
        color: item.product_attributes?.color || undefined,
        assembly: item.product_attributes?.assembly || undefined,
        use: item.product_attributes?.use || undefined,
      },
      details: productDetails,
      variants: variants.map((variant: any) => ({
        id: variant.id,
        sku: variant.sku,
        price: Number(variant.price),
        label: variant.label,
        stock: Number(variant.stock ?? 0),
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
            getCustomerDescription(translations.it) ||
            "",
        },
        conditioning: {
          de: translations.de?.conditioning || "",
          it: conditioning,
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
