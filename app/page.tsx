import Link from "next/link";
import { ArrowRightIcon, SparklesIcon, ChartBarIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Aircraft Research &{" "}
              <span className="text-primary-600">Valuation Consultant</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A real-time AI assistant that helps users and internal brokers research aircraft models, 
              compare values, and assess acquisition opportunities using Hye Aero's proprietary market data, 
              resale history, and performance analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Explore Research
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Data Highlight */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 text-gray-900">
              <ClockIcon className="h-8 w-8 text-primary-600" />
              <div>
                <h3 className="text-lg font-semibold">Real-Time Data Updates</h3>
                <p className="text-sm text-gray-600">Continuously updated market data</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-900">
              <SparklesIcon className="h-8 w-8 text-primary-600" />
              <div>
                <h3 className="text-lg font-semibold">Most Recent Information</h3>
                <p className="text-sm text-gray-600">Latest market insights and valuations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Purpose
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering aircraft professionals with intelligent insights and comprehensive data
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Market Research</h3>
              <p className="text-gray-600">
                Comprehensive aircraft model research with detailed specifications, 
                performance metrics, and market positioning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <SparklesIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Value Comparison</h3>
              <p className="text-gray-600">
                Compare aircraft values using proprietary market data, resale history, 
                and performance analytics to make informed decisions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <ArrowRightIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Acquisition Assessment</h3>
              <p className="text-gray-600">
                Assess acquisition opportunities with real-time market insights 
                and comprehensive performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From query to clear answer in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-primary-200 -translate-y-1/2" />

            <div className="relative bg-white p-8 rounded-lg border-2 border-primary-200 text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ask Your Question</h3>
              <p className="text-gray-600">
                Query our AI assistant about aircraft models, specifications, 
                market values, or acquisition opportunities.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-lg border-2 border-primary-200 text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes proprietary market data, resale history, 
                and performance analytics to provide insights.
              </p>
            </div>

            <div className="relative bg-white p-8 rounded-lg border-2 border-primary-200 text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Clear Answers</h3>
              <p className="text-gray-600">
                Receive comprehensive, actionable answers with detailed 
                data, comparisons, and recommendations.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Try It Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join professionals who trust HyeAero.AI for their aircraft research and valuation needs.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-primary-600 transition-colors"
          >
            Start Your Free Trial
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
