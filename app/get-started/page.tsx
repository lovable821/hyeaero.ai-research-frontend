"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

export default function GetStartedPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users to research
  if (isAuthenticated) {
    router.push("/research");
    return null;
  }
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Get Started</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Start using HyeAero.AI today. Create your account and begin researching aircraft models, 
            comparing values, and accessing market data.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Your Account</h2>
                <p className="text-gray-600 mb-4">
                  Sign up for a free account to get started. No credit card required.
                </p>
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Sign Up Free
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Explore Research Tools</h2>
                <p className="text-gray-600 mb-4">
                  Access our AI-powered research tools, market data, and valuation services.
                </p>
                <Link
                  href="/research"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Research Tools
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Upgrade to Pro (Optional)</h2>
                <p className="text-gray-600 mb-4">
                  Upgrade to Pro for unlimited access, advanced features, and priority support.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Pricing
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You'll Get</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="flex items-start">
              <CheckIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">AI-Powered Research</h3>
                <p className="text-gray-600">Get instant answers to your aircraft research questions.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Market Data Access</h3>
                <p className="text-gray-600">Access comprehensive market data and analytics.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Value Comparison</h3>
                <p className="text-gray-600">Compare aircraft values using proprietary data.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckIcon className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Real-Time Updates</h3>
                <p className="text-gray-600">Stay up-to-date with the latest market insights.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join professionals who trust HyeAero.AI for their aircraft research and valuation needs.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
          >
            Create Free Account
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
