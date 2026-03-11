/**
 * HyeAero.AI — API client for Aircraft Research & Valuation Consultant
 * Base URL: NEXT_PUBLIC_API_URL (default http://88.99.198.243)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://88.99.198.243";

export type AircraftModelsResponse = { models: string[] };

export async function getAircraftModels(): Promise<AircraftModelsResponse> {
  const res = await fetch(`${API_URL}/api/aircraft-models`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<AircraftModelsResponse>;
}

/** Models that have at least one sale in aircraft_sales — use for Price Estimator dropdown so selections return results. */
export type PriceEstimateModelsResponse = {
  models: string[];
  sample_request?: { model: string; region: string } | null;
  /** Example payloads from DB (model + region) that return a result. Use for testing. */
  test_payloads?: Array<{ model: string; region: string }>;
};

export async function getPriceEstimateModels(): Promise<PriceEstimateModelsResponse> {
  const res = await fetch(`${API_URL}/api/price-estimate-models`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<PriceEstimateModelsResponse>;
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

// PhlyData (Internal DB) aircraft list and owner lookup
export type PhlydataAircraftRow = {
  id: string;
  serial_number: string | null;
  registration_number: string | null;
  manufacturer: string | null;
  model: string | null;
  manufacturer_year: number | null;
  delivery_year: number | null;
  category: string | null;
};

export type PhlydataAircraftResponse = {
  aircraft: PhlydataAircraftRow[];
  total: number;
  page: number;
  page_size: number;
};

export async function getPhlydataAircraft(params?: { page?: number; page_size?: number; q?: string }): Promise<PhlydataAircraftResponse> {
  const { page = 1, page_size = 100, q } = params || {};
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));
  searchParams.set("page_size", String(page_size));
  if (q && q.trim()) searchParams.set("q", q.trim());
  const res = await fetch(`${API_URL}/api/phlydata/aircraft?${searchParams}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<PhlydataAircraftResponse>;
}

export type OwnerFromListing = {
  source_platform: string | null;
  seller: string | null;
  seller_contact_name: string | null;
  seller_phone: string | null;
  seller_email: string | null;
  seller_location: string | null;
  seller_broker: string | null;
  listing_status: string | null;
  ask_price: number | null;
  sold_price: number | null;
  date_listed: string | null;
  date_sold: string | null;
};

export type OwnerFromFaa = {
  registrant_name: string | null;
  street: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  region: string | null;
  county: string | null;
  country: string | null;
};

/** ZoomInfo company search result item (GTM Data API). */
export type ZoominfoCompany = {
  id: string | null;
  type?: string;
  attributes?: Record<string, unknown>; // e.g. name, website, address, industry
};

export type ZoominfoEnrichmentItem = {
  query_name: string;
  source_platform?: string;  // "controller" | "aircraftexchange" | "faa"
  field_name?: string;      // "seller" (Controller Seller Name), "dealer_name" (AircraftExchange), "registrant_name" (FAA)
  companies: ZoominfoCompany[];
};

export type PhlydataOwnersResponse = {
  aircraft: PhlydataAircraftRow | null;
  owners_from_listings: OwnerFromListing[];
  owners_from_faa: OwnerFromFaa[];
  /** Owner/company data retrieved from ZoomInfo (primary display). */
  zoominfo_enrichment?: ZoominfoEnrichmentItem[];
  message?: string;
};

export async function getPhlydataOwners(serial: string): Promise<PhlydataOwnersResponse> {
  const params = new URLSearchParams({ serial: serial.trim() });
  const res = await fetch(`${API_URL}/api/phlydata/owners?${params}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error((err as { detail?: string }).detail || `API ${res.status}`);
  }
  return res.json() as Promise<PhlydataOwnersResponse>;
}
