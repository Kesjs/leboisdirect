import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import sharp from "sharp";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "braviko-product-media";
const MAX_BATCH = 24;
const MAX_BYTES = 8 * 1024 * 1024;

function privateAddress(address: string) {
  const value = address.toLowerCase();
  if (isIP(value) === 4) {
    const parts = value.split(".").map(Number);
    return parts[0] === 0 || parts[0] === 10 || parts[0] === 127 ||
      (parts[0] === 169 && parts[1] === 254) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) || parts[0] >= 224;
  }
  return value === "::" || value === "::1" || value.startsWith("fc") ||
    value.startsWith("fd") || value.startsWith("fe8") || value.startsWith("fe9") ||
    value.startsWith("fea") || value.startsWith("feb");
}

async function fetchPublicImage(url: string) {
  const target = new URL(url);
  if (!["http:", "https:"].includes(target.protocol) || target.username || target.password)
    throw new Error("Adresse d’image non autorisée.");
  const addresses = await lookup(target.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => privateAddress(address)))
    throw new Error("Adresse réseau privée refusée.");
  const response = await fetch(target, {
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
    headers: { Accept: "image/jpeg,image/png,image/webp", "User-Agent": "Braviko watermark worker" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Source inaccessible (${response.status}).`);
  const length = Number(response.headers.get("content-length") || 0);
  if (length > MAX_BYTES) throw new Error("Image trop volumineuse.");
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength > MAX_BYTES) throw new Error("Image trop volumineuse.");
  return buffer;
}

function watermarkSvg(width: number, height: number) {
  const size = Math.max(32, Math.round(Math.min(width, height) * 0.15));
  return Buffer.from(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><text x="50%" y="50%" transform="rotate(-25 ${width / 2} ${height / 2})" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="${size}" font-weight="700" letter-spacing="-${Math.round(size * 0.04)}" fill="rgba(255,255,255,.48)">braviko</text></svg>`);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Connexion administrateur requise." }, { status: 401 });
  const { data: admin } = await supabase.from("braviko_admins").select("active").eq("user_id", user.id).maybeSingle();
  if (!admin?.active) return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  const body = await request.json().catch(() => ({})) as { productId?: string; limit?: number };
  const limit = Math.min(Math.max(Number(body.limit || MAX_BATCH), 1), MAX_BATCH);
  let query = supabase.from("braviko_product_images").select("id, product_id, storage_path, watermarked_at").is("watermarked_at", null).order("created_at", { ascending: true }).limit(limit);
  if (body.productId) query = query.eq("product_id", body.productId);
  const { data: images, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const processed: string[] = [];
  const errors: Array<{ id: string; message: string }> = [];
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  for (const image of images || []) {
    try {
      const sourceUrl = /^https?:\/\//i.test(image.storage_path)
        ? image.storage_path
        : `${baseUrl}/storage/v1/object/public/${BUCKET}/${image.storage_path}`;
      const source = await fetchPublicImage(sourceUrl);
      const metadata = await sharp(source).metadata();
      if (!metadata.width || !metadata.height) throw new Error("Dimensions d’image introuvables.");
      const output = await sharp(source).composite([{ input: watermarkSvg(metadata.width, metadata.height) }]).png().toBuffer();
      const path = `${image.product_id}/watermarked-${image.id}.png`;
      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, output, { upsert: true, contentType: "image/png", cacheControl: "31536000" });
      if (uploadError) throw uploadError;
      const { error: updateError } = await supabase.from("braviko_product_images").update({ storage_path: path, watermarked_at: new Date().toISOString() }).eq("id", image.id);
      if (updateError) throw updateError;
      processed.push(image.id);
    } catch (itemError) {
      errors.push({ id: image.id, message: itemError instanceof Error ? itemError.message : "Traitement impossible." });
    }
  }
  return NextResponse.json({ processed: processed.length, hasMore: (images?.length || 0) === limit, errors });
}
