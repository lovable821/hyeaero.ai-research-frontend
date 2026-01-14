import Link from "next/link";
import { CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";

const features = {
  free: [
    "5 research queries per month",
    "Basic aircraft model information",
    "Limited market data access (10 views/month)",
    "Community support",
    "Standard AI response quality",
    "View reports online only",
  ],
  pro: [
    "Unlimited research queries",
    "Full market data access",
    "Priority support (24/7)",
    "Real-time data updates",
    "Enhanced AI responses with business ML",
    "Advanced analytics & insights",
    "Email reports & PDF export",
    "API access",
    "Dedicated account manager",
    "Custom data exports",
    "Historical data analysis",
  ],
};

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Choose the plan that fits your needs. Start with our free plan or upgrade to Pro for advanced features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Free</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Perfect for getting started</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {features.free.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href="/get-started"
                  className="w-full text-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors block"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shadow-xl p-8 relative hover:shadow-2xl transition-all duration-200 flex flex-col h-full" style={{ background: 'linear-gradient(to bottom right, #0284c7, #0369a1)' }}>
              <div className="absolute top-0 right-0 bg-accent-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold flex items-center gap-1" style={{ backgroundColor: '#f59e0b' }}>
                <SparklesIcon className="h-4 w-4" />
                Popular
              </div>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2 text-white">Pro</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">$99</span>
                  <span className="text-white opacity-90">/month</span>
                </div>
                <p className="text-white opacity-90 font-medium">For professionals and teams</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                {features.pro.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-white mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-white">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href="/get-started"
                  className="w-full text-center px-6 py-3 bg-white text-blue-600 font-bold rounded-md hover:bg-gray-100 transition-colors shadow-lg block"
                  style={{ color: '#0284c7' }}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Enhanced AI Responses</h3>
              <p className="text-sm text-gray-600">
                Pro users get clearer, more accurate answers powered by advanced business ML models.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Limits</h3>
              <p className="text-sm text-gray-600">
                Unlimited research queries, data access, and exports - no restrictions.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Export & Reports</h3>
              <p className="text-sm text-gray-600">
                Email reports and PDF exports for all your research and analysis.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-600 mb-4">
              All plans include access to our AI-powered research tools and market data platform.
            </p>
            <p className="text-sm text-gray-500">
              Need a custom plan? <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</Link> for enterprise solutions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
