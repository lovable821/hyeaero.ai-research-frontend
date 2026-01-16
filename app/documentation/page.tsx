import Link from "next/link";
import { BookOpenIcon, DocumentTextIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function DocumentationPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 py-12 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Learn how to use HyeAero.AI to research aircraft, compare values, and make informed decisions.
          </p>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Getting Started */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <BookOpenIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Learn the basics of using HyeAero.AI for aircraft research and valuation.
              </p>
              <Link
                href="/get-started"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                View Guide →
              </Link>
            </div>

            {/* API Reference */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">API Reference</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Complete API documentation for integrating HyeAero.AI into your workflows.
              </p>
              <Link
                href="#"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                View API Docs →
              </Link>
            </div>

            {/* FAQ */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-colors">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                <QuestionMarkCircleIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">FAQs</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Frequently asked questions about HyeAero.AI features and usage.
              </p>
              <Link
                href="/contact"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Contact Support →
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 transition-colors">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/research" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Research Tools →
              </Link>
              <Link href="/market-data" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Market Data →
              </Link>
              <Link href="/pricing" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Pricing Plans →
              </Link>
              <Link href="/contact" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
