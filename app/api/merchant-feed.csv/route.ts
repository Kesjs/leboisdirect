import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cleanImagesBySlug } from "@/data/clean-product-images";
import { isHeatingCategory } from "@/data/catalog-taxonomy";
import {
  getItalianProductOverride,
  translateVariantLabel,
} from "@/data/product-italian-overrides";

import { EXTRA_CATALOG_PRODUCTS } from "@/data/extra-catalog-products";

export const dynamic = "force-dynamic";

function csv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function siteUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://braviko.fr"
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
      "id, slug, status, braviko_categories(slug, name), braviko_product_translations(locale, name, short_description, description), braviko_product_variants(id, sku, label, price, stock), braviko_product_images(storage_path, is_primary, sort_order)",
    )
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) return new NextResponse("Errore catalogo", { status: 500 });

  const rows = [
    [
      "id", "title", "description", "link", "image_link", "price",
      "availability", "brand", "condition", "google_product_category",
    ],
  ];
  const baseUrl = siteUrl(request);

  for (const product of data || []) {
    if (product.slug === "test-paiement-1-euro") continue;
    const categorySlug = (product as any).braviko_categories?.slug || "";
    if (!isHeatingCategory(categorySlug)) continue;
    const translations = (product.braviko_product_translations || []) as any[];
    const it = translations.find((item) => item.locale === "it") || translations[0] || {};
    const override = getItalianProductOverride(product.slug);
    const variants = ((product.braviko_product_variants || []) as any[]).sort(
      (a, b) => Number(a.price) - Number(b.price),
    );
    const cleanOverrides = cleanImagesBySlug[product.slug];
    const images = ((product.braviko_product_images || []) as any[]).sort(
      (a, b) => Number(b.is_primary) - Number(a.is_primary) || Number(a.sort_order) - Number(b.sort_order),
    );
    const image = cleanOverrides?.[0]
      ? cleanOverrides[0].startsWith("http")
        ? cleanOverrides[0]
        : `${baseUrl}/${cleanOverrides[0].replace(/^\//, "")}`
      : images[0]?.storage_path
        ? images[0].storage_path.startsWith("http")
          ? images[0].storage_path
          : images[0].storage_path.startsWith("images/") || images[0].storage_path.startsWith("/images/")
            ? `${baseUrl}/${images[0].storage_path.replace(/^\//, "")}`
            : supabase.storage.from("braviko-product-media").getPublicUrl(images[0].storage_path).data.publicUrl
        : "";
    const description = override?.description || it.short_description || it.description || "";
    const baseName = override?.name || it.name || product.slug;

    // Merchant Center must never receive a fabricated zero price. Products without
    // a real purchasable variant are omitted until the catalogue is complete.
    for (const [index, variant] of variants.entries()) {
      if (variant.price == null || Number(variant.price) <= 0) continue;
      const id = variant.sku || `${product.id}-${variant.id}`;
      const localizedVariantLabel =
        index === 0 && override?.variantLabel
          ? override.variantLabel
          : translateVariantLabel(variant.label, product.slug);
      const title = [baseName, localizedVariantLabel].filter(Boolean).join(" - ");
      rows.push([
        id, title, description, `${baseUrl}/produit/${product.slug}`, image,
        `${Number(variant.price).toFixed(2)} EUR`, Number(variant.stock || 0) > 0 ? "in_stock" : "out_of_stock",
        "Braviko", "new", override?.googleCategory || "Casa e giardino > Riscaldamento",
      ]);
    }
  }

  const existingSlugs = new Set((data || []).map((product: any) => product.slug));
  for (const extra of EXTRA_CATALOG_PRODUCTS) {
    if (existingSlugs.has(extra.slug)) continue;
    if (!isHeatingCategory(extra.category)) continue;
    const override = extra.italianOverride;
    const image = extra.images[0].startsWith("http")
      ? extra.images[0]
      : `${baseUrl}/${extra.images[0].replace(/^\//, "")}`;
    for (const variant of extra.variants) {
      if (variant.price == null || Number(variant.price) <= 0) continue;
      const id = variant.sku || `${extra.id}-${variant.id}`;
      const title = [override.name, variant.label].filter(Boolean).join(" - ");
      rows.push([
        id,
        title,
        override.description,
        `${baseUrl}/produit/${extra.slug}`,
        image,
        `${Number(variant.price).toFixed(2)} EUR`,
        "in_stock",
        "Braviko",
        "new",
        override.googleCategory || "Casa e giardino > Riscaldamento",
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
