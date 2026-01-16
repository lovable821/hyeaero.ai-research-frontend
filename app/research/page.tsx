"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon, ChartBarIcon, CalculatorIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "consultant" | "comparison" | "estimator" | "advisory";

const tabs: { id: Tab; name: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "consultant", name: "Ask Consultant", icon: ChatBubbleLeftRightIcon },
  { id: "comparison", name: "Market Comparison", icon: ChartBarIcon },
  { id: "estimator", name: "Price Estimator", icon: CalculatorIcon },
  { id: "advisory", name: "Resale Advisory", icon: BriefcaseIcon },
];

export default function ResearchPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("consultant");

  const handleChatClick = () => {
    if (!isAuthenticated) {
      router.push("/signup");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-800 py-12 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Research & Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
            Access our AI-powered research tools to analyze aircraft models, compare market values, 
            and make informed acquisition decisions.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-16 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                    className={`
                    flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                    ${
                      isActive
                        ? "border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "consultant" && <AskConsultantTab onChatClick={handleChatClick} isAuthenticated={isAuthenticated} />}
          {activeTab === "comparison" && <MarketComparisonTab />}
          {activeTab === "estimator" && <PriceEstimatorTab />}
          {activeTab === "advisory" && <ResaleAdvisoryTab />}
        </div>
      </section>
    </div>
  );
}

function AskConsultantTab({ onChatClick, isAuthenticated }: { onChatClick: () => void; isAuthenticated: boolean }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ask Consultant (AI Chat)</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get instant answers to your aircraft research questions using our AI-powered consultant.
        </p>
        
        {/* Chat Interface Placeholder */}
        <div 
          className={`border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center transition-colors ${
            !isAuthenticated ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" : ""
          }`}
          onClick={!isAuthenticated ? onChatClick : undefined}
        >
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            {!isAuthenticated ? (
              <>
                <p className="text-gray-700 dark:text-gray-200 font-medium mb-2">Sign up to start chatting</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a free account to access our AI consultant and get instant answers to your questions.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-500 dark:text-gray-400">AI Chat Interface Coming Soon</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Ask questions about aircraft models, specifications, market values, and more.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketComparisonTab() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Market Comparison</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Compare multiple aircraft models side-by-side with market data, specifications, and valuations.
        </p>
        
        {/* Comparison Interface Placeholder */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center transition-colors">
          <div className="text-center">
            <ChartBarIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Market Comparison Tool Coming Soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Compare aircraft models with detailed market data and specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PriceEstimatorTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Price Estimator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Estimate aircraft values based on model, year, condition, hours, and market data.
        </p>
        
        {/* Estimator Interface Placeholder */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center transition-colors">
          <div className="text-center">
            <CalculatorIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Price Estimator Tool Coming Soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Get accurate aircraft value estimates using our proprietary market data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResaleAdvisoryTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Resale Advisory</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get expert advice on aircraft resale strategies, timing, and market positioning.
        </p>
        
        {/* Advisory Interface Placeholder */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center transition-colors">
          <div className="text-center">
            <BriefcaseIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Resale Advisory Service Coming Soon</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Receive personalized resale advice based on market trends and historical data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
