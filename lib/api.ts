/**
 * HyeAero.AI — API client for Aircraft Research & Valuation Consultant
 * Base URL: NEXT_PUBLIC_API_URL (default http://localhost:8000)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type AircraftModelsResponse = { models: string[] };

export async function getAircraftModels(): Promise<AircraftModelsResponse> {
  const res = await fetch(`${API_URL}/api/aircraft-models`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<AircraftModelsResponse>;
}

type ApiOptions = {
  method?: string;
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
};

async function fetchApi<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    ...(body !== undefined && body !== null ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export type ChatResponse = { answer: string; sources?: unknown[]; error?: string | null };

export function postChat(query: string): Promise<ChatResponse> {
  return fetchApi<ChatResponse>("/api/rag/answer", { method: "POST", body: { query } });
}

export type MarketComparisonParams = {
  models: string[];
  region?: string | null;
  max_hours?: number | null;
  min_year?: number | null;
  max_year?: number | null;
  limit?: number;
};

export type MarketComparisonResponse = {
  rows: Array<Record<string, unknown>>;
  summary: string;
  error?: string | null;
};

export function postMarketComparison(params: MarketComparisonParams): Promise<MarketComparisonResponse> {
  return fetchApi<MarketComparisonResponse>("/api/market-comparison", { method: "POST", body: params });
}

export type PriceEstimateParams = {
  manufacturer?: string | null;
  model?: string | null;
  year?: number | null;
  flight_hours?: number | null;
  flight_cycles?: number | null;
  region?: string | null;
};

export type PriceEstimateResponse = {
  estimated_value_millions: number | null;
  range_low_millions: number | null;
  range_high_millions: number | null;
  confidence_pct: number;
  market_demand: string;
  vs_average_pct: number | null;
  time_to_sale_days: number | null;
  breakdown: Array<{ label: string; value_millions?: number }>;
  error?: string | null;
  message?: string | null;
};

export function postPriceEstimate(params: PriceEstimateParams): Promise<PriceEstimateResponse> {
  return fetchApi<PriceEstimateResponse>("/api/price-estimate", { method: "POST", body: params });
}

export type ResaleAdvisoryParams = {
  query?: string | null;
  listing_id?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  year?: number | null;
};

export type ResaleAdvisoryResponse = {
  insight: string;
  sources?: unknown[];
  error?: string | null;
};

export function postResaleAdvisory(params: ResaleAdvisoryParams): Promise<ResaleAdvisoryResponse> {
  return fetchApi<ResaleAdvisoryResponse>("/api/resale-advisory", { method: "POST", body: params });
}
