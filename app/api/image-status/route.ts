import { NextRequest, NextResponse } from "next/server";

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase();
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1" ||
    host.endsWith(".local") ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host) ||
    host === "0.0.0.0"
  );
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl)
    return NextResponse.json(
      { ok: false, error: "URL manquante" },
      { status: 400 },
    );
  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json(
      { ok: false, error: "URL invalide" },
      { status: 400 },
    );
  }
  if (
    !["http:", "https:"].includes(target.protocol) ||
    isPrivateHost(target.hostname)
  )
    return NextResponse.json(
      { ok: false, error: "URL non autorisée" },
      { status: 400 },
    );
  try {
    let response = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "image/*" },
    });
    if (!response.ok)
      response = await fetch(target, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(8000),
        headers: { Accept: "image/*", Range: "bytes=0-16" },
      });
    if (isPrivateHost(new URL(response.url).hostname))
      return NextResponse.json(
        { ok: false, error: "Redirection non autorisée" },
        { status: 422 },
      );
    const contentType = response.headers.get("content-type") || "";
    const ok = response.ok && contentType.toLowerCase().startsWith("image/");
    return NextResponse.json(
      { ok, status: response.status, contentType },
      { status: ok ? 200 : 422 },
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Lien inaccessible" },
      { status: 422 },
    );
  }
}
