import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_RAG_API_URL || "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 65000;

const DEMO_ANSWER =
  "Based on real-time market data, this is a placeholder response. Connect the backend (see README) for live answers from Hye Aero's data.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body?.query;
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }
    const history = Array.isArray(body.history)
      ? body.history.filter((m: { role?: string; content?: string }) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string").map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })).slice(-12)
      : undefined;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const res = await fetch(`${BACKEND_URL}/api/rag/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(history ? { query: query.trim(), history } : { query: query.trim() }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await res.text();
      let message = "The research service is temporarily unavailable.";
      if (res.status === 503) message = "Service is starting or not configured. Check backend logs.";
      try {
        const err = JSON.parse(text);
        if (err.detail) message = err.detail;
      } catch {
        // use default message
      }
      return NextResponse.json(
        { answer: message, sources: [], data_used: null, error: message },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      answer: data.answer ?? "",
      sources: data.sources ?? [],
      data_used: data.data_used ?? null,
      error: data.error ?? null,
    });
  } catch (e) {
    const isTimeout = e instanceof Error && e.name === "AbortError";
    const message =
      process.env.NEXT_PUBLIC_DEMO_CHAT === "true"
        ? DEMO_ANSWER
        : isTimeout
          ? "The request took too long. Try a shorter or simpler question."
          : "Unable to reach the research service. Start the backend (python runners/run_api.py) and set NEXT_PUBLIC_API_URL.";
    return NextResponse.json(
      { answer: message, sources: [], data_used: null, error: message },
      { status: 200 }
    );
  }
}
