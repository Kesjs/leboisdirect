import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function csv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function siteUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://braviko.it"
  );
}

export async function GET(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return new NextResponse("Catalogo non disponibile", { status: 500 });
  }

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("braviko_products")
    .select(
      "id, slug, status, braviko_categories(name), braviko_product_translations(locale, name, short_description, description), braviko_product_variants(id, sku, label, price, stock), braviko_product_images(storage_path, is_primary, sort_order)",
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) return new NextResponse("Errore del catalogo", { status: 500 });

  const rows = [
    [
      "id", "title", "description", "link", "image_link", "price",
      "availability", "brand", "condition", "google_product_category",
    ],
  ];
  const baseUrl = siteUrl(request);

  for (const product of data || []) {
    const translations = (product.braviko_product_translations || []) as any[];
    const it = translations.find((item) => item.locale === "it") || translations[0] || {};
    const variants = ((product.braviko_product_variants || []) as any[]).sort(
      (a, b) => Number(a.price) - Number(b.price),
    );
    const images = ((product.braviko_product_images || []) as any[]).sort(
      (a, b) => Number(b.is_primary) - Number(a.is_primary) || Number(a.sort_order) - Number(b.sort_order),
    );
    const image = images[0]?.storage_path
      ? images[0].storage_path.startsWith("http")
        ? images[0].storage_path
        : images[0].storage_path.startsWith("images/") || images[0].storage_path.startsWith("/images/")
          ? `${baseUrl}/${images[0].storage_path.replace(/^\//, "")}`
          : supabase.storage.from("braviko-product-media").getPublicUrl(images[0].storage_path).data.publicUrl
      : "";
    const description = it.short_description || it.description || "";

    // Merchant Center must never receive a fabricated zero price. Products without
    // a real purchasable variant are omitted until the catalogue is complete.
    for (const variant of variants) {
      if (variant.price == null || Number(variant.price) <= 0) continue;
      const id = variant.sku || `${product.id}-${variant.id}`;
      const title = [it.name || product.slug, variant.label].filter(Boolean).join(" - ");
      rows.push([
        id, title, description, `${baseUrl}/produit/${product.slug}`, image,
        `${Number(variant.price).toFixed(2)} EUR`, Number(variant.stock || 0) > 0 ? "in_stock" : "out_of_stock",
        "Braviko", "new", (product as any).braviko_categories?.name || "Home & Garden",
      ]);
    }
  }

  const body = rows.map((row) => row.map(csv).join(",")).join("\n") + "\n";
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
