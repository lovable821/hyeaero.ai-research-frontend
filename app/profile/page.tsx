"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, ClockIcon, DocumentArrowDownIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import NotFound from "@/app/not-found";

type Tab = "subscription" | "usage" | "downloads" | "billing";

const tabs: { id: Tab; name: string }[] = [
  { id: "subscription", name: "Subscription" },
  { id: "usage", name: "Usage Limits" },
  { id: "downloads", name: "Download History" },
  { id: "billing", name: "Billing" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("subscription");

  // Show 404 page if not authenticated (security: don't reveal route exists)
  if (!isAuthenticated) {
    return <NotFound />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Profile</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Manage your subscription, usage, downloads, and billing information.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                    ${
                      isActive
                        ? "border-primary-600 text-primary-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }
                  `}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "subscription" && <SubscriptionTab />}
          {activeTab === "usage" && <UsageTab />}
          {activeTab === "downloads" && <DownloadsTab />}
          {activeTab === "billing" && <BillingTab />}
        </div>
      </section>
    </div>
  );
}

function SubscriptionTab() {
  const { user } = useAuth();
  const plan = user?.plan || "free";
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Subscription Status</h2>
        
        {/* Current Plan */}
        <div className="mb-8 p-6 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 capitalize">{plan === "pro" ? "Pro" : "Free"} Plan</h3>
              <p className="text-gray-600">Current subscription plan</p>
            </div>
            <div className="flex items-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Renews on</p>
              <p className="text-lg font-semibold text-gray-900">January 12, 2027</p>
            </div>
            {plan === "free" && (
              <Link
                href="/pricing"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* Plan Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Details</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Plan Type</span>
              <span className="font-medium text-gray-900">Free</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Monthly Cost</span>
              <span className="font-medium text-gray-900">$0.00</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <span className="text-gray-700">Status</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UsageTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Usage Limits</h2>
        
        <div className="space-y-6">
          {/* Research Queries */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Research Queries</h3>
              <span className="text-sm text-gray-600">10 / 50 per month</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: "20%" }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">40 queries remaining this month</p>
          </div>

          {/* Market Data Access */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Market Data Access</h3>
              <span className="text-sm text-gray-600">Limited</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Upgrade to Pro for unlimited access</p>
          </div>

          {/* Download Limit */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Report Downloads</h3>
              <span className="text-sm text-gray-600">2 / 5 per month</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: "40%" }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">3 downloads remaining this month</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <p className="text-sm text-gray-700">
            <strong>Upgrade to Pro</strong> for unlimited research queries, full market data access, 
            and unlimited report downloads. <Link href="/pricing" className="text-primary-600 hover:text-primary-700 underline">Learn more</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function DownloadsTab() {
  const downloads = [
    { id: 1, name: "Market Analysis Report - Q1 2026", date: "2026-01-10", format: "PDF" },
    { id: 2, name: "Aircraft Comparison - Cessna 172", date: "2026-01-08", format: "PDF" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Download History</h2>
        
        {downloads.length > 0 ? (
          <div className="space-y-4">
            {downloads.map((download) => (
              <div
                key={download.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <DocumentArrowDownIcon className="h-8 w-8 text-primary-600 mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{download.name}</h3>
                    <p className="text-sm text-gray-600">
                      Downloaded on {new Date(download.date).toLocaleDateString()} • {download.format}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium">
                  Download
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <DocumentArrowDownIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No downloads yet</p>
            <p className="text-sm text-gray-400 mt-2">Your downloaded reports will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing Information</h2>
        
        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CreditCardIcon className="h-8 w-8 text-gray-400 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">No payment method on file</p>
                  <p className="text-sm text-gray-600">Free plan - no payment required</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Add Payment Method
              </button>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Free Plan</p>
                <p className="text-sm text-gray-600">January 12, 2026</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$0.00</p>
                <p className="text-sm text-gray-600">Paid</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700">
            Billing history will appear here when you upgrade to a paid plan. 
            <Link href="/pricing" className="text-primary-600 hover:text-primary-700 underline"> View pricing plans</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
