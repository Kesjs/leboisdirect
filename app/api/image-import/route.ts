import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_REDIRECTS = 3;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part)))
    return true;
  return (
    parts[0] === 0 ||
    parts[0] === 10 ||
    parts[0] === 127 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168) ||
    parts[0] >= 224
  );
}

function isPrivateAddress(address: string) {
  const normalized = address.toLowerCase();
  if (isIP(normalized) === 4) return isPrivateIpv4(normalized);
  if (isIP(normalized) !== 6) return true;
  if (normalized.startsWith("::ffff:"))
    return isPrivateIpv4(normalized.slice("::ffff:".length));
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb")
  );
}

async function assertPublicImageUrl(value: string) {
  const target = new URL(value);
  if (!["http:", "https:"].includes(target.protocol))
    throw new Error("Seules les adresses HTTP et HTTPS sont acceptées.");
  if (target.username || target.password)
    throw new Error("Les adresses contenant des identifiants sont refusées.");

  const addresses = await lookup(target.hostname, { all: true, verbatim: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address)))
    throw new Error("Cette adresse réseau n’est pas autorisée.");
  return target;
}

async function fetchImage(source: URL) {
  let target = source;
  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount++) {
    await assertPublicImageUrl(target.toString());
    const response = await fetch(target, {
      redirect: "manual",
      signal: AbortSignal.timeout(12_000),
      headers: {
        Accept: "image/jpeg,image/png,image/webp",
        "User-Agent": "Braviko image importer",
      },
      cache: "no-store",
    });

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || redirectCount === MAX_REDIRECTS)
        throw new Error("L’image comporte trop de redirections.");
      target = new URL(location, target);
      continue;
    }
    if (!response.ok) throw new Error(`Le serveur de l’image répond ${response.status}.`);
    return response;
  }
  throw new Error("L’image n’a pas pu être récupérée.");
}

async function readLimitedBody(response: Response) {
  const declaredSize = Number(response.headers.get("content-length") || 0);
  if (declaredSize > MAX_IMAGE_BYTES)
    throw new Error("L’image dépasse la limite de 8 Mo.");
  if (!response.body) throw new Error("Le serveur n’a renvoyé aucun fichier.");

  const chunks: Uint8Array[] = [];
  const reader = response.body.getReader();
  let received = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_IMAGE_BYTES) {
      await reader.cancel();
      throw new Error("L’image dépasse la limite de 8 Mo.");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Session administrateur requise." }, { status: 401 });

  const { data: admin } = await supabase
    .from("braviko_admins")
    .select("active")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin?.active)
    return NextResponse.json({ error: "Accès administrateur requis." }, { status: 403 });

  try {
    const body = (await request.json()) as { url?: string };
    if (!body.url) throw new Error("URL manquante.");
    const target = await assertPublicImageUrl(body.url);
    const response = await fetchImage(target);
    const contentType = (response.headers.get("content-type") || "")
      .split(";", 1)[0]
      .toLowerCase();
    if (!ALLOWED_TYPES.has(contentType))
      throw new Error("Le lien ne renvoie pas une image JPG, PNG ou WebP.");

    const bytes = await readLimitedBody(response);
    return new Response(bytes, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(bytes.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "L’image n’a pas pu être importée.",
      },
      { status: 422 },
    );
  }
}
