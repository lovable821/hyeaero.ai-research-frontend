"use client";

import { ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// Mock data for Market Trends
const marketTrendsData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 135 },
  { month: "Mar", value: 145 },
  { month: "Apr", value: 138 },
  { month: "May", value: 155 },
  { month: "Jun", value: 168 },
  { month: "Jul", value: 162 },
  { month: "Aug", value: 175 },
  { month: "Sep", value: 182 },
  { month: "Oct", value: 195 },
  { month: "Nov", value: 188 },
  { month: "Dec", value: 205 },
];

// Mock data for Price Distribution
const priceDistributionData = [
  { range: "$0-1M", count: 245 },
  { range: "$1-5M", count: 320 },
  { range: "$5-10M", count: 185 },
  { range: "$10-25M", count: 142 },
  { range: "$25-50M", count: 68 },
  { range: "$50M+", count: 24 },
];

// Mock data for Model Popularity
const modelPopularityData = [
  { model: "Phenom 300", count: 145, percentage: 32 },
  { model: "Citation CJ3+", count: 128, percentage: 28 },
  { model: "King Air 350i", count: 98, percentage: 22 },
  { model: "Hawker 4000", count: 52, percentage: 12 },
  { model: "Other", count: 31, percentage: 7 },
];

// Mock data for Sales Volume
const salesVolumeData = [
  { month: "Q1", volume: 245 },
  { month: "Q2", volume: 312 },
  { month: "Q3", volume: 298 },
  { month: "Q4", volume: 367 },
];

// Mock data for Market Segments
const marketSegmentsData = [
  { segment: "Business Jets", count: 412, percentage: 45 },
  { segment: "Turboprops", count: 328, percentage: 36 },
  { segment: "Light Jets", count: 178, percentage: 19 },
];

// Helper component for Bar Chart
function BarChart({ data, maxValue, color }: { data: Array<{ month: string; value: number }>, maxValue: number, color: string }) {
  return (
    <div className="flex items-end justify-between h-[240px] gap-2">
      {data.map((item, index) => {
        const height = (item.value / maxValue) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-end h-full">
              <div
                className={`w-full rounded-t transition-all duration-300 hover:opacity-80 ${color}`}
                style={{ height: `${height}%`, minHeight: "4px" }}
                title={`${item.month}: ${item.value}`}
              />
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}

// Helper component for Horizontal Bar Chart
function HorizontalBarChart({ data, maxValue, color }: { data: Array<{ range: string; count: number }>, maxValue: number, color: string }) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const width = (item.count / maxValue) * 100;
        return (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.range}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${color}`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper component for Donut/Pie Chart representation
function DonutChart({ data }: { data: Array<{ segment: string; percentage: number; count: number }> }) {
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  let currentPercentage = 0;

  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const colors = [
          "bg-blue-500",
          "bg-primary-600",
          "bg-accent-400",
          "bg-green-500",
          "bg-purple-500",
        ];
        const color = colors[index % colors.length];
        
        return (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.segment}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${color}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper component for Model Popularity visualization
function ModelPopularityChart({ data }: { data: Array<{ model: string; count: number; percentage: number }> }) {
  return (
    <div className="space-y-3">
      {data.map((item, index) => {
        const colors = [
          "bg-primary-600",
          "bg-blue-500",
          "bg-accent-400",
          "bg-green-500",
          "bg-gray-400",
        ];
        const color = colors[index % colors.length];
        
        return (
          <div key={index}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{item.model}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">{item.count}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MarketDataPage() {
  const [timeRange, setTimeRange] = useState<"6M" | "1Y" | "2Y">("1Y");

  const maxTrendValue = Math.max(...marketTrendsData.map(d => d.value));
  const maxDistributionValue = Math.max(...priceDistributionData.map(d => d.count));
  const maxVolumeValue = Math.max(...salesVolumeData.map(d => d.volume));

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 py-12 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Market Data & Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Access aggregated market insights, trends, and analytics to make informed decisions.
          </p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Market Trends Chart */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Market Trends</h2>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    {(["6M", "1Y", "2Y"] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                          timeRange === range
                            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900 min-h-[300px] transition-colors">
                <BarChart 
                  data={marketTrendsData} 
                  maxValue={maxTrendValue}
                  color="bg-gradient-to-t from-primary-600 to-primary-400"
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Active Listings</span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  +12.5% vs last year
                </span>
              </div>
            </div>

            {/* Price Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Price Distribution</h2>
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900 min-h-[300px] transition-colors">
                <HorizontalBarChart 
                  data={priceDistributionData} 
                  maxValue={maxDistributionValue}
                  color="bg-gradient-to-r from-accent-400 to-accent-500"
                />
              </div>
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Total Listings: <span className="font-semibold text-gray-900 dark:text-white">984</span></span>
              </div>
            </div>
          </div>

          {/* Additional Charts Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Model Popularity</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[200px] transition-colors">
                <ModelPopularityChart data={modelPopularityData} />
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Based on listing volume
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales Volume</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[200px] transition-colors">
                <div className="flex items-end justify-between h-[160px] gap-3">
                  {salesVolumeData.map((item, index) => {
                    const height = (item.volume / maxVolumeValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex flex-col items-center justify-end h-full">
                          <div
                            className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-300 hover:opacity-80"
                            style={{ height: `${height}%`, minHeight: "4px" }}
                            title={`${item.month}: ${item.volume}`}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Quarterly sales transactions
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Segments</h3>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[200px] transition-colors">
                <DonutChart data={marketSegmentsData} />
              </div>
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                Distribution by aircraft type
              </div>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-800 border border-primary-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Listings</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">984</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <ArrowTrendingUpIcon className="h-3 w-3" />
                +12.5%
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-gray-800 dark:to-gray-800 border border-accent-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Price</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">$8.2M</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Median: $6.5M</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-800 border border-green-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sales This Year</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,222</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                <ArrowTrendingUpIcon className="h-3 w-3" />
                +8.3%
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-800 border border-blue-200 dark:border-gray-700 rounded-lg p-4 transition-colors">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Days on Market</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">127</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Avg. listing time</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
