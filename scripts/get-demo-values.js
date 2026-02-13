/**
 * Print demo values from the database (via API). Run with backend up:
 *   node scripts/get-demo-values.js
 * Or from repo root: node frontend/scripts/get-demo-values.js
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://88.99.198.243:8000";

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.json();
}

async function main() {
  console.log("Fetching DB-backed values from", API_URL, "\n");

  const [modelsResp, priceResp] = await Promise.all([
    get(`${API_URL}/api/aircraft-models`).catch(() => ({ models: [] })),
    get(`${API_URL}/api/price-estimate-models`).catch(() => ({ models: [], sample_request: null, test_payloads: [] })),
  ]);

  const comparisonModels = modelsResp.models || [];
  const estimatorModels = priceResp.models || [];
  const sampleRequest = priceResp.sample_request || null;
  const testPayloads = priceResp.test_payloads || [];

  console.log("=== MARKET COMPARISON TAB ===");
  console.log("Aircraft models (use 2–3 for demo):", comparisonModels.slice(0, 10).join(", ") + (comparisonModels.length > 10 ? " ..." : ""));
  console.log("Region: Global (or North America, Europe, Asia Pacific)");
  console.log("Max airframe hours (optional): e.g. 10000");
  console.log("Min year: e.g. 2015  |  Max year: e.g. 2023");
  console.log("Comparison metrics: check Market Value, Price Trends, Days on Market\n");

  console.log("=== AI PRICE ESTIMATOR TAB ===");
  console.log("Models with sales (use one for demo):", estimatorModels.slice(0, 8).join(", ") + (estimatorModels.length > 8 ? " ..." : ""));
  if (sampleRequest) console.log("Example that returns a result:", sampleRequest.model, "| Region:", sampleRequest.region);
  if (testPayloads.length) console.log("Test payloads (model + Global):", testPayloads.slice(0, 5).map((p) => p.model).join(", "));
  console.log("Year: e.g. 2015–2018  |  Flight hours: e.g. 45000  |  Flight cycles: e.g. 28000");
  console.log("Current location: Global or North America\n");

  console.log("=== RESALE ADVISORY TAB ===");
  console.log('Query (plain English): e.g. "Phenom 300 2017, 1,500 hours, U.S." or "Citation X 2015 Europe resale value"\n');

  console.log("=== ASK CONSULTANT (RAG) ===");
  console.log("Example questions (from your data):");
  console.log('  - What Phenom 300 or Citation listings do you have?');
  console.log('  - What did Citation X or similar jets sell for recently?');
  console.log('  - Compare Phenom 300 2017 under 1,500 hours in the U.S.');
  if (comparisonModels.length) console.log("  - Or: What", comparisonModels[0], "listings do you have?");
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
