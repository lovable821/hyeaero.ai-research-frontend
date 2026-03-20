import { NextResponse } from "next/server";

/**
 * Proxy endpoint:
 * The browser should call same-origin `/api/phlydata/aircraft` to avoid CORS/network issues
 * with the remote FastAPI host. Next.js server then fetches FastAPI and returns JSON.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.toString();

  // Prefer local FastAPI (works when frontend + backend are on the same machine).
  // Fall back to NEXT_PUBLIC_API_URL if provided.
  const backendBase = process.env.PHLYDATA_BACKEND_URL || "http://localhost:8000";

  const backendUrl = `${backendBase}/api/phlydata/aircraft${search ? `?${search}` : ""}`;

  const res = await fetch(backendUrl, {
    method: "GET",
    headers: { Accept: "application/json" },
    // FastAPI is already using in-process caching, so don't add extra time-based caching here.
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

