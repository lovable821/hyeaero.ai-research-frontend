import { ChartBarIcon, ArrowTrendingUpIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline";

export default function MarketDataPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Market Data & Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Access aggregated market insights, trends, and analytics to make informed decisions.
          </p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Market Trends Chart */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Market Trends</h2>
                <ArrowTrendingUpIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Market Trends Chart</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Aggregated market trend data visualization
                  </p>
                </div>
              </div>
            </div>

            {/* Price Distribution Chart */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Price Distribution</h2>
                <CurrencyDollarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Price Distribution Chart</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Aircraft price distribution analysis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Charts Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Popularity</h3>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Chart Placeholder</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Volume</h3>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Chart Placeholder</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Segments</h3>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Chart Placeholder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
