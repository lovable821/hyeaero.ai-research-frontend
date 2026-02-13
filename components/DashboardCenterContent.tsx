"use client";

import React from "react";
import { MessageCircle, Bot, Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";
import Chat from "./Chat";
import { postMarketComparison, postPriceEstimate, postResaleAdvisory } from "@/lib/api";
import type { MarketComparisonResponse, PriceEstimateResponse, ResaleAdvisoryResponse } from "@/lib/api";

function downloadComparisonPdf(result: MarketComparisonResponse, selectedModels: Set<string>, region: string) {
  const doc = new jsPDF({ format: "a4", unit: "mm", orientation: "landscape" });
  const margin = 14;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFontSize(16);
  doc.text("HyeAero.AI — Market Comparison", margin, y);
  y += 8;
  doc.setFontSize(9);
  const subtitle = `Models: ${Array.from(selectedModels).join(", ")} | Region: ${region} | Generated: ${new Date().toLocaleString()}`;
  const subtitleLines = doc.splitTextToSize(subtitle, contentWidth);
  subtitleLines.forEach((line: string) => {
    doc.text(line, margin, y);
    y += 5;
  });
  y += 2;
  doc.text(result.summary || "", margin, y);
  y += 8;

  const cols = ["Manufacturer / Model", "Year", "Ask Price", "Sold Price", "Hours", "Location", "Status", "Days on Mkt", "Source"];
  const rowHeight = 6;
  const colWidths = [52, 10, 22, 22, 16, 48, 22, 14, 22];
  const colMaxLen = [32, 4, 12, 12, 8, 28, 12, 6, 14];
  const totalColWidth = colWidths.reduce((a, b) => a + b, 0);
  if (totalColWidth > contentWidth) {
    const scale = contentWidth / totalColWidth;
    colWidths.forEach((w, i) => { colWidths[i] = Math.floor(w * scale); });
  }

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  let x = margin;
  cols.forEach((c, i) => {
    doc.text(c, x + 1, y);
    x += colWidths[i];
  });
  y += rowHeight;
  doc.setFont("helvetica", "normal");

  const drawCell = (text: string, cx: number, cy: number, w: number, maxLen: number) => {
    const s = String(text);
    const t = s.length <= maxLen ? s : s.slice(0, maxLen - 1) + "…";
    doc.text(t, cx + 1, cy);
  };

  for (const row of result.rows.slice(0, 40)) {
    if (y > pageHeight - 18) {
      doc.addPage("a4", "landscape");
      y = margin;
    }
    const manufacturerModel = [row.manufacturer, row.model].filter(Boolean).join(" ") || "—";
    const askPrice = row.ask_price != null ? `$${Number(row.ask_price).toLocaleString()}` : "—";
    const soldPrice = row.sold_price != null ? `$${Number(row.sold_price).toLocaleString()}` : "—";
    const hours = row.airframe_total_time != null ? String(row.airframe_total_time) : "—";
    const location = [row.location, row.based_at].filter(Boolean).join(" ") || "—";
    const status = (row.listing_status as string) || "—";
    const daysOnMarket = row.days_on_market != null ? String(row.days_on_market) : "—";
    const source = (row.source_platform as string) || "—";
    const cells = [manufacturerModel, row.manufacturer_year != null ? String(row.manufacturer_year) : "—", askPrice, soldPrice, hours, location, status, daysOnMarket, source];
    x = margin;
    cells.forEach((cell, i) => {
      drawCell(cell, x, y, colWidths[i], colMaxLen[i]);
      x += colWidths[i];
    });
    y += rowHeight;
  }
  doc.save(`hyeaero-market-comparison-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function downloadValuationPdf(
  result: PriceEstimateResponse,
  form: { model: string; year: string; flightHours: string; flightCycles: string; location: string }
) {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const margin = 20;
  let y = margin;
  doc.setFontSize(16);
  doc.text("HyeAero.AI — Price Estimate", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 10;
  doc.setFontSize(11);
  doc.text("Inputs", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Model: ${form.model || "—"}  |  Year: ${form.year || "—"}  |  Location: ${form.location || "—"}`, margin, y);
  y += 5;
  doc.text(`Flight hours: ${form.flightHours || "—"}  |  Flight cycles: ${form.flightCycles || "—"}`, margin, y);
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.text("Estimated Market Value", margin, y);
  y += 7;
  doc.setFont("helvetica", "normal");
  doc.text(result.estimated_value_millions != null ? `$${result.estimated_value_millions}M` : "—", margin, y);
  y += 6;
  if (result.range_low_millions != null && result.range_high_millions != null) {
    doc.text(`Range: $${result.range_low_millions}M – $${result.range_high_millions}M`, margin, y);
    y += 6;
  }
  doc.text(`Confidence: ${result.confidence_pct}%  |  Market demand: ${result.market_demand}`, margin, y);
  y += 5;
  if (result.time_to_sale_days != null) doc.text(`Time to sale: ${result.time_to_sale_days} days`, margin, y);
  y += 8;
  if (result.breakdown && result.breakdown.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Value breakdown", margin, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    for (const row of result.breakdown) {
      doc.text(`${row.label}: ${row.value_millions != null ? `$${row.value_millions}M` : ""}`, margin, y);
      y += 5;
    }
  }
  if (result.message) {
    y += 5;
    doc.setFontSize(9);
    doc.text(result.message, margin, y);
  }
  doc.save(`hyeaero-valuation-${new Date().toISOString().slice(0, 10)}.pdf`);
}

function downloadResalePdf(query: string, result: ResaleAdvisoryResponse) {
  const doc = new jsPDF({ format: "a4", unit: "mm" });
  const margin = 20;
  const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const lineHeight = 6;
  let y = margin;

  doc.setFontSize(16);
  doc.text("HyeAero.AI — Resale Advisory", margin, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Query", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const queryLines = doc.splitTextToSize(query || "—", maxWidth);
  queryLines.forEach((line: string) => {
    doc.text(line, margin, y);
    y += lineHeight;
  });
  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Resale guidance", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const insightText = result.error ? result.error : (result.insight || "No guidance available.");
  const insightLines = doc.splitTextToSize(insightText, maxWidth);
  for (const line of insightLines) {
    if (y > 270) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }
  if (result.sources && Array.isArray(result.sources) && result.sources.length > 0) {
    y += lineHeight;
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Based on ${result.sources.length} source(s) from Hye Aero's database.`, margin, y);
    doc.setTextColor(0, 0, 0);
  }
  doc.save(`hyeaero-resale-advisory-${new Date().toISOString().slice(0, 10)}.pdf`);
}

type TabId = "consultant" | "comparison" | "estimator" | "resale";

export type DashboardCenterContentProps = {
  activeTab: TabId;
  isAuthenticated: boolean;
  selectedModels: Set<string>;
  toggleModel: (model: string) => void;
  onSelectAllModels?: () => void;
  onDeselectAllModels?: () => void;
  region: string;
  setRegion: (v: string) => void;
  timePeriod: string;
  setTimePeriod: (v: string) => void;
  comparisonFilters: { maxHours: string; minYear: string; maxYear: string };
  setComparisonFilters: React.Dispatch<React.SetStateAction<{ maxHours: string; minYear: string; maxYear: string }>>;
  aircraftModels: string[];
  aircraftModelsLoading: boolean;
  aircraftModelsError: string | null;
  estimatorModels?: string[];
  estimatorModelsLoading?: boolean;
  samplePriceRequest?: { model: string; region: string } | null;
  priceTestPayloads?: Array<{ model: string; region: string }>;
  metrics: { marketValue: boolean; priceTrends: boolean; transactionVolume: boolean; daysOnMarket: boolean };
  setMetrics: React.Dispatch<React.SetStateAction<{ marketValue: boolean; priceTrends: boolean; transactionVolume: boolean; daysOnMarket: boolean }>>;
  estimatorForm: { model: string; year: string; flightHours: string; flightCycles: string; location: string };
  setEstimatorForm: React.Dispatch<React.SetStateAction<{ model: string; year: string; flightHours: string; flightCycles: string; location: string }>>;
  comparisonResult: MarketComparisonResponse | null;
  comparisonLoading: boolean;
  comparisonError: string | null;
  handleGenerateComparison: () => void;
  priceResult: PriceEstimateResponse | null;
  priceLoading: boolean;
  handlePriceEstimate: () => void;
  resaleQuery: string;
  setResaleQuery: (v: string) => void;
  resaleResult: ResaleAdvisoryResponse | null;
  resaleLoading: boolean;
  handleResaleAdvisory: () => void;
  onConsultantQuerySent?: (query: string) => void;
  suggestedQuery?: string | null;
  onSuggestedQueryConsumed?: () => void;
};

export default function DashboardCenterContent(props: DashboardCenterContentProps) {
  const {
    activeTab,
    isAuthenticated,
    selectedModels,
    toggleModel,
    onSelectAllModels,
    onDeselectAllModels,
    region,
    setRegion,
    timePeriod,
    setTimePeriod,
    comparisonFilters,
    setComparisonFilters,
    aircraftModels,
    aircraftModelsLoading,
    aircraftModelsError,
    estimatorModels,
    estimatorModelsLoading,
    samplePriceRequest,
    priceTestPayloads = [],
    metrics,
    setMetrics,
    estimatorForm,
    setEstimatorForm,
    comparisonResult,
    comparisonLoading,
    comparisonError,
    handleGenerateComparison,
    priceResult,
    priceLoading,
    handlePriceEstimate,
    resaleQuery,
    setResaleQuery,
    resaleResult,
    resaleLoading,
    handleResaleAdvisory,
    onConsultantQuerySent,
    suggestedQuery,
    onSuggestedQueryConsumed,
  } = props;

  if (activeTab === "consultant") {
    if (!isAuthenticated) {
      return (
        <div className="flex-1 flex items-center justify-center p-8 bg-white dark:bg-slate-900 min-h-0 overflow-y-auto">
          <div className="max-w-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm p-10 text-center">
            <div className="w-14 h-14 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent mx-auto mb-4">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-slate-900 dark:text-slate-100">Ask Consultant</h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm mt-2">Sign in to use the AI research consultant.</p>
            <p className="text-slate-400 dark:text-slate-400 text-xs mt-4">Use the Sign in button in the header.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden bg-white dark:bg-slate-900">
        <div className="flex-shrink-0 px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-3 transition-colors duration-200">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-slate-900 dark:text-slate-100">AI Research Consultant</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Hye Aero data</p>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          <Chat
            onQuerySent={onConsultantQuerySent}
            suggestedQuery={suggestedQuery ?? undefined}
            onSuggestedQueryConsumed={onSuggestedQueryConsumed}
          />
        </div>
      </div>
    );
  }

  if (activeTab === "comparison") {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 scrollbar-ui bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">Market Comparison Tool</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Compare aircraft values across models, regions, and time periods.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Aircraft Models</label>
                {aircraftModels.length > 0 && !aircraftModelsLoading && (
                  <span className="flex items-center gap-2 text-xs">
                    <button type="button" onClick={onSelectAllModels} className="text-accent hover:underline font-medium dark:text-accent-light">
                      Select all
                    </button>
                    <span className="text-slate-300 dark:text-slate-500">|</span>
                    <button type="button" onClick={onDeselectAllModels} className="text-slate-500 dark:text-slate-400 hover:underline hover:text-slate-700 dark:hover:text-slate-300">
                      Deselect all
                    </button>
                  </span>
                )}
              </div>
              <div className="border border-slate-200 dark:border-slate-600 rounded-lg bg-slate-50/50 dark:bg-slate-800 max-h-48 overflow-y-auto p-2 scrollbar-ui">
                {aircraftModelsLoading ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-3 px-2">Loading models from database…</p>
                ) : aircraftModelsError ? (
                  <p className="text-sm text-red-600 dark:text-red-400 py-3 px-2">{aircraftModelsError}</p>
                ) : aircraftModels.length === 0 ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400 py-3 px-2">No aircraft models in database. Load aircraft data first.</p>
                ) : (
                  aircraftModels.map((model) => (
                    <label
                      key={model}
                      className={`flex items-center gap-2 py-2 px-2 rounded-md cursor-pointer transition-all duration-200 ease-out hover:bg-white hover:shadow-sm dark:hover:bg-slate-600 dark:shadow-none ${selectedModels.has(model) ? "dark:bg-slate-600/80" : ""}`}
                    >
                      <input type="checkbox" checked={selectedModels.has(model)} onChange={() => toggleModel(model)} className="rounded border-slate-300 dark:border-slate-500 dark:bg-slate-700 text-accent focus:ring-accent focus:ring-offset-0 dark:focus:ring-offset-slate-800" />
                      <span className="text-sm text-slate-700 dark:text-slate-200">{model}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Region</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} disabled={comparisonLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60">
                  <option>Global</option>
                  <option>North America</option>
                  <option>Europe</option>
                  <option>Asia Pacific</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Max airframe hours (optional)</label>
                <input type="number" min={0} step={100} placeholder="e.g. 5000" value={comparisonFilters.maxHours} onChange={(e) => setComparisonFilters((f) => ({ ...f, maxHours: e.target.value }))} disabled={comparisonLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Min year</label>
                  <input type="number" min={1990} max={2030} placeholder="e.g. 2010" value={comparisonFilters.minYear} onChange={(e) => setComparisonFilters((f) => ({ ...f, minYear: e.target.value }))} disabled={comparisonLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Max year</label>
                  <input type="number" min={1990} max={2030} placeholder="e.g. 2020" value={comparisonFilters.maxYear} onChange={(e) => setComparisonFilters((f) => ({ ...f, maxYear: e.target.value }))} disabled={comparisonLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Time period (reference)</label>
                <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} disabled={comparisonLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 12 Months</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Comparison Metrics</label>
              <div className="space-y-2">
                {["marketValue", "priceTrends", "transactionVolume", "daysOnMarket"].map((key, i) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={metrics[key as keyof typeof metrics]} onChange={(e) => setMetrics((m) => ({ ...m, [key]: e.target.checked }))} className="rounded border-slate-300 dark:border-slate-500 dark:bg-slate-800 text-accent focus:ring-accent focus:ring-offset-0 dark:focus:ring-offset-slate-900" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">{["Market Value", "Price Trends", "Transaction Volume", "Days on Market"][i]}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button type="button" onClick={handleGenerateComparison} disabled={comparisonLoading || selectedModels.size < 1} className="mt-6 w-full sm:w-auto rounded-lg bg-accent px-5 py-3 sm:py-2.5 min-h-touch sm:min-h-0 text-white text-sm font-medium transition-all duration-200 ease-out hover:bg-accent-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.98] active:bg-accent-light disabled:opacity-50 disabled:hover:bg-accent disabled:hover:shadow-none inline-flex items-center justify-center gap-2">
            {comparisonLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {comparisonLoading ? "Loading…" : "Generate Comparison"}
          </button>
          {comparisonError && <p className="mt-3 text-sm text-red-600 dark:text-red-400">{comparisonError}</p>}
          {comparisonLoading && (
            <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/80 p-8 flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
              <span className="text-slate-600 dark:text-slate-300">Fetching comparable listings…</span>
            </div>
          )}
          {comparisonResult && comparisonResult.rows.length > 0 && !comparisonLoading && (
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="text-sm text-slate-600 dark:text-slate-300">{comparisonResult.summary}</p>
                <button type="button" onClick={() => downloadComparisonPdf(comparisonResult, selectedModels, region)} className="text-sm font-medium text-slate-600 rounded-md py-1.5 px-2 transition-all duration-200 ease-out hover:text-accent hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-inset active:scale-[0.98] active:bg-accent/15 inline-flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
              <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-slate-200 dark:border-slate-600 w-full scrollbar-ui">
                <table className="w-full min-w-[800px] text-sm table-auto" style={{ tableLayout: "auto" }}>
                  <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-600">
                    <tr>
                      <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[140px]">Manufacturer / Model</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-200 w-14">Year</th>
                      {metrics.marketValue && <th className="text-right py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[90px]">Ask Price</th>}
                      {metrics.marketValue && <th className="text-right py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[90px]">Sold Price</th>}
                      <th className="text-right py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[60px]">Hours</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[160px]">Location</th>
                      <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[80px]">Status</th>
                      {metrics.daysOnMarket && <th className="text-right py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[70px]">Days on Mkt</th>}
                      <th className="text-left py-2 px-3 font-medium text-slate-700 dark:text-slate-200 min-w-[80px]">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonResult.rows.map((row: Record<string, unknown>, i: number) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-700 transition-colors duration-200 hover:bg-accent/10 dark:hover:bg-accent/15">
                        <td className="py-2 px-3 min-w-[140px] align-top">{[row.manufacturer, row.model].filter(Boolean).join(" ") || "—"}</td>
                        <td className="py-2 px-3 w-14 align-top">{row.manufacturer_year != null ? String(row.manufacturer_year) : "—"}</td>
                        {metrics.marketValue && <td className="py-2 px-3 text-right min-w-[90px] align-top">{row.ask_price != null ? `$${Number(row.ask_price).toLocaleString()}` : "—"}</td>}
                        {metrics.marketValue && <td className="py-2 px-3 text-right min-w-[90px] align-top">{row.sold_price != null ? `$${Number(row.sold_price).toLocaleString()}` : "—"}</td>}
                        <td className="py-2 px-3 text-right min-w-[60px] align-top">{row.airframe_total_time != null ? String(row.airframe_total_time) : "—"}</td>
                        <td className="py-2 px-3 min-w-[160px] max-w-[320px] align-top break-words whitespace-normal">{[row.location, row.based_at].filter(Boolean).join(" · ") || "—"}</td>
                        <td className="py-2 px-3 min-w-[80px] align-top">{(row.listing_status as string) || "—"}</td>
                        {metrics.daysOnMarket && <td className="py-2 px-3 text-right min-w-[70px] align-top">{row.days_on_market != null ? String(row.days_on_market) : "—"}</td>}
                        <td className="py-2 px-3 min-w-[80px] align-top">{(row.source_platform as string) || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {comparisonResult && comparisonResult.rows.length === 0 && !comparisonLoading && (
            <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/80 p-6 text-center">
              <p className="text-slate-600 dark:text-slate-300">{comparisonResult.summary || "No comparable listings found."}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try different models, region, or relax filters (max hours, year range).</p>
            </div>
          )}
          {!comparisonResult && !comparisonLoading && (
            <div className="mt-8 rounded-lg border border-dashed border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/80 p-8 text-center">
              <p className="font-medium text-slate-700 dark:text-slate-200">Select Aircraft Models to Compare</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Choose at least 1 aircraft model and click &quot;Generate Comparison&quot;.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (activeTab === "estimator") {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto p-6 scrollbar-ui bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-600">
              <h2 className="font-heading text-xl font-semibold text-slate-900 dark:text-slate-100">AI Price Estimator</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Get accurate valuations based on real-time market data.</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Aircraft Model</label>
                  <select value={estimatorForm.model} onChange={(e) => setEstimatorForm((f) => ({ ...f, model: e.target.value }))} disabled={priceLoading || estimatorModelsLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60">
                    <option value="">Select aircraft model (with sales data)</option>
                    {(estimatorModels?.length ? estimatorModels : aircraftModels).map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {samplePriceRequest && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Example that returns a result: <strong>{samplePriceRequest.model}</strong> with region <strong>{samplePriceRequest.region}</strong></p>
                  )}
                  {priceTestPayloads.length > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Test values from DB (select in dropdown above): {priceTestPayloads.slice(0, 5).map((p) => p.model).join(", ")}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Year of Manufacture</label>
                  <input type="text" value={estimatorForm.year} onChange={(e) => setEstimatorForm((f) => ({ ...f, year: e.target.value }))} disabled={priceLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Flight Hours</label>
                    <input type="text" value={estimatorForm.flightHours} onChange={(e) => setEstimatorForm((f) => ({ ...f, flightHours: e.target.value }))} disabled={priceLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Flight Cycles</label>
                    <input type="text" value={estimatorForm.flightCycles} onChange={(e) => setEstimatorForm((f) => ({ ...f, flightCycles: e.target.value }))} disabled={priceLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Location</label>
                  <select value={estimatorForm.location} onChange={(e) => setEstimatorForm((f) => ({ ...f, location: e.target.value }))} disabled={priceLoading} className="w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60">
                    <option>Global</option>
                    <option>North America</option>
                    <option>Europe</option>
                    <option>Asia Pacific</option>
                  </select>
                </div>
                <button type="button" onClick={handlePriceEstimate} disabled={priceLoading} className="w-full mt-4 rounded-lg bg-accent px-4 py-3 min-h-touch text-white text-sm font-medium transition-all duration-200 ease-out hover:bg-accent-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.98] active:bg-accent-light disabled:opacity-50 disabled:hover:bg-accent disabled:hover:shadow-none inline-flex items-center justify-center gap-2">
                  {priceLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {priceLoading ? "Calculating…" : "Calculate Estimated Value"}
                </button>
              </div>
            </div>
            <div className="p-6 bg-slate-50/50 dark:bg-slate-800/80">
              <h3 className="font-heading font-semibold text-slate-900 dark:text-slate-100">Valuation Results</h3>
              {priceLoading ? (
                <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-8 flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  <span className="text-slate-600 dark:text-slate-300">Calculating valuation from comparable sales…</span>
                </div>
              ) : priceResult ? (
                <>
                  {(priceResult.error || (priceResult.estimated_value_millions == null && priceResult.message)) ? (
                    <div className="mt-4 rounded-lg border border-amber-200 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/30 p-4">
                      <p className="text-sm text-amber-800 dark:text-amber-200">{priceResult.error || priceResult.message || "No valuation could be calculated."}</p>
                      {priceResult.message && !priceResult.error && <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Try a different model, year, or region; or add more sales data to the database.</p>}
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/20 dark:border-accent/30 p-5 flex-1 min-w-0">
                          <p className="text-sm text-slate-600 dark:text-slate-300">Estimated Market Value</p>
                          <p className="text-3xl font-bold text-accent mt-1">
                            {priceResult.estimated_value_millions != null ? `$${priceResult.estimated_value_millions}M` : "—"}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            {priceResult.range_low_millions != null && priceResult.range_high_millions != null
                              ? `Range: $${priceResult.range_low_millions}M – $${priceResult.range_high_millions}M`
                              : priceResult.message || ""}
                          </p>
                        </div>
                        <button type="button" onClick={() => downloadValuationPdf(priceResult, estimatorForm)} className="text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md py-1.5 px-2 transition-all duration-200 ease-out hover:text-accent hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-inset active:scale-[0.98] active:bg-accent/15 inline-flex items-center gap-1.5">
                          <Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-3 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Confidence</p>
                          <p className="text-lg font-semibold text-emerald-600">{priceResult.confidence_pct}%</p>
                        </div>
                        <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-3 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Market Demand</p>
                          <p className="text-lg font-semibold text-accent">{priceResult.market_demand}</p>
                        </div>
                        <div className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-3 text-center">
                          <p className="text-xs text-slate-500 dark:text-slate-400">Time to Sale</p>
                          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{priceResult.time_to_sale_days != null ? `${priceResult.time_to_sale_days} days` : "—"}</p>
                        </div>
                      </div>
                      {priceResult.breakdown && priceResult.breakdown.length > 0 && (
                        <>
                          <h3 className="font-heading font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">Value Breakdown</h3>
                          <ul className="space-y-2 border border-slate-200 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                            {priceResult.breakdown.map((row, i) => (
                              <li key={i} className="flex justify-between items-center px-4 py-2 border-b border-slate-100 dark:border-slate-600 last:border-0">
                                <span className="text-sm text-slate-700 dark:text-slate-300">{row.label}</span>
                                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{row.value_millions != null ? `$${row.value_millions}M` : ""}</span>
                              </li>
                            ))}
                            <li className="flex justify-between items-center px-4 py-3 bg-accent/10 dark:bg-accent/20 border-t-2 border-accent/20 dark:border-accent/30">
                              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Total Estimated Value</span>
                              <span className="text-sm font-bold text-accent">{priceResult.estimated_value_millions != null ? `$${priceResult.estimated_value_millions}M` : "—"}</span>
                            </li>
                          </ul>
                        </>
                      )}
                      {priceResult.message && !priceResult.error && <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{priceResult.message}</p>}
                    </>
                  )}
                </>
              ) : (
                <div className="mt-6 rounded-lg border border-dashed border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-6 text-center text-slate-500 dark:text-slate-400 text-sm">
                  Enter aircraft details and click &quot;Calculate Estimated Value&quot; for a valuation.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "resale") {
    return (
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 scrollbar-ui bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-sm p-4 sm:p-6 transition-colors duration-200">
            <h2 className="font-heading text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">Resale Advisory Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Strategic insights for optimal aircraft resale timing and positioning.</p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Get plain-English resale guidance</h3>
              <div className="flex gap-2">
                <input type="text" value={resaleQuery} onChange={(e) => setResaleQuery(e.target.value)} placeholder="e.g. Phenom 300 2017, 1,500 hours, U.S." disabled={resaleLoading} className="flex-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-800 dark:text-slate-200 transition-all duration-200 ease-out focus:border-accent/50 focus:ring-2 focus:ring-accent/25 hover:border-slate-300 dark:hover:border-slate-500 disabled:opacity-60" />
                <button type="button" onClick={handleResaleAdvisory} disabled={resaleLoading || !resaleQuery.trim()} className="rounded-lg bg-accent px-4 py-3 min-h-touch flex items-center justify-center text-white text-sm font-medium transition-all duration-200 ease-out hover:bg-accent-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.98] active:bg-accent-light disabled:opacity-50 disabled:hover:bg-accent disabled:hover:shadow-none inline-flex items-center gap-2">
                  {resaleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {resaleLoading ? "Loading…" : "Get insight"}
                </button>
              </div>
              {resaleLoading && (
                <div className="mt-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/80 p-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Loader2 className="w-4 h-4 animate-spin text-accent flex-shrink-0" />
                  Fetching resale guidance from Hye Aero data…
                </div>
              )}
              {resaleResult && !resaleLoading && (
                <div className="mt-3">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => downloadResalePdf(resaleQuery, resaleResult)}
                      className="text-sm font-medium text-slate-600 dark:text-slate-300 rounded-md py-1.5 px-2 transition-all duration-200 ease-out hover:text-accent hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-inset active:scale-[0.98] inline-flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                  <div className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-4 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {resaleResult.insight}
                    {resaleResult.sources && Array.isArray(resaleResult.sources) && resaleResult.sources.length > 0 && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 italic">Based on {resaleResult.sources.length} source(s) from Hye Aero&apos;s database.</p>
                    )}
                  </div>
                </div>
              )}
              {resaleResult?.error && !resaleLoading && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400">{resaleResult.error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
