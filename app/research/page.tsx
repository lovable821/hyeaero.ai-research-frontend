"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon, ChartBarIcon, CalculatorIcon, BriefcaseIcon, PaperAirplaneIcon, SparklesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function AskConsultantTab({ onChatClick, isAuthenticated }: { onChatClick: () => void; isAuthenticated: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !isAuthenticated) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${userMessage.content}". Based on our proprietary market data and analysis, I can provide insights on aircraft models, specifications, market values, and acquisition opportunities. This is a demo response - in production, this would connect to our AI backend for real-time analysis.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What is the current market value of a Cessna 172?",
    "Compare Gulfstream G650 vs Bombardier Challenger",
    "What are the best aircraft for short-haul flights?",
    "Show me recent market trends for business jets",
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ask Consultant (AI Chat)</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Get instant answers to your aircraft research questions using our AI-powered consultant.
          </p>
          
          <div 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-12 bg-gray-50 dark:bg-gray-900/50 min-h-[400px] flex items-center justify-center transition-colors cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onChatClick}
          >
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-700 dark:text-gray-200 font-semibold text-lg mb-2">Sign up to start chatting</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Create a free account to access our AI consultant and get instant answers to your aircraft research questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden transition-colors">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-full flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Consultant</h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">Powered by HyeAero.AI</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900/30">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Start a conversation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
                Ask me anything about aircraft models, market values, specifications, or acquisition opportunities.
              </p>
              
              {/* Quick Questions */}
              <div className="w-full max-w-2xl space-y-2">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Try asking:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="w-full text-left px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-sm text-gray-700 dark:text-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary-600 dark:bg-primary-500 text-white"
                        : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === "user"
                          ? "text-primary-100"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about aircraft models, market values, specifications..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-colors"
                rows={1}
                style={{ minHeight: "48px", maxHeight: "120px" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[48px]"
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}

function MarketComparisonTab() {
  const [selectedModels, setSelectedModels] = useState<string[]>(["Cessna 172", "Piper PA-28"]);
  
  const aircraftData = {
    "Cessna 172": {
      manufacturer: "Cessna",
      year: "2020",
      price: "$350,000",
      priceTrend: "+5.2%",
      trendUp: true,
      hours: "1,200",
      condition: "Excellent",
      maxSpeed: "140 kts",
      range: "640 nm",
      seats: 4,
      fuelCapacity: "56 gal",
      marketValue: "$345,000 - $360,000",
      avgTimeToSale: "45 days",
      listings: 12,
    },
    "Piper PA-28": {
      manufacturer: "Piper",
      year: "2019",
      price: "$285,000",
      priceTrend: "+3.8%",
      trendUp: true,
      hours: "1,500",
      condition: "Very Good",
      maxSpeed: "135 kts",
      range: "580 nm",
      seats: 4,
      fuelCapacity: "50 gal",
      marketValue: "$280,000 - $295,000",
      avgTimeToSale: "52 days",
      listings: 8,
    },
    "Cirrus SR22": {
      manufacturer: "Cirrus",
      year: "2021",
      price: "$650,000",
      priceTrend: "+7.1%",
      trendUp: true,
      hours: "800",
      condition: "Excellent",
      maxSpeed: "185 kts",
      range: "1,000 nm",
      seats: 4,
      fuelCapacity: "81 gal",
      marketValue: "$640,000 - $670,000",
      avgTimeToSale: "38 days",
      listings: 5,
    },
    "Beechcraft Bonanza": {
      manufacturer: "Beechcraft",
      year: "2018",
      price: "$420,000",
      priceTrend: "+2.3%",
      trendUp: true,
      hours: "1,800",
      condition: "Good",
      maxSpeed: "195 kts",
      range: "920 nm",
      seats: 6,
      fuelCapacity: "74 gal",
      marketValue: "$410,000 - $435,000",
      avgTimeToSale: "60 days",
      listings: 15,
    },
  };

  const availableModels = Object.keys(aircraftData);

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : prev.length < 3 ? [...prev, model] : prev
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Market Comparison</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Compare multiple aircraft models side-by-side with market data, specifications, and valuations.
            </p>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Select up to 3 models to compare
          </div>
        </div>

        {/* Model Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Select Aircraft Models:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableModels.map((model) => (
              <button
                key={model}
                onClick={() => toggleModel(model)}
                disabled={!selectedModels.includes(model) && selectedModels.length >= 3}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                  selectedModels.includes(model)
                    ? "bg-primary-600 dark:bg-primary-500 text-white border-primary-600 dark:border-primary-500"
                    : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {model}
                {selectedModels.includes(model) && (
                  <XMarkIcon className="inline-block h-4 w-4 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selectedModels.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Specification
                    </th>
                    {selectedModels.map((model) => (
                      <th
                        key={model}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {model}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Manufacturer
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].manufacturer}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Year
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].year}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Current Price
                    </td>
                    {selectedModels.map((model) => {
                      const data = aircraftData[model as keyof typeof aircraftData];
                      return (
                        <td key={model} className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{data.price}</span>
                            <span className={`text-xs flex items-center ${data.trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                              {data.trendUp ? (
                                <ArrowTrendingUpIcon className="h-4 w-4" />
                              ) : (
                                <ArrowTrendingDownIcon className="h-4 w-4" />
                              )}
                              {data.priceTrend}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Market Value Range
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].marketValue}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Total Hours
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].hours}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Condition
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          {aircraftData[model as keyof typeof aircraftData].condition}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Max Speed
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].maxSpeed}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Range
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].range}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Seating Capacity
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].seats} seats
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Fuel Capacity
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].fuelCapacity}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Avg. Time to Sale
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].avgTimeToSale}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Active Listings
                    </td>
                    {selectedModels.map((model) => (
                      <td key={model} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {aircraftData[model as keyof typeof aircraftData].listings} aircraft
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-12 bg-gray-50 dark:bg-gray-900/50 text-center">
            <ChartBarIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Select at least one aircraft model to compare</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PriceEstimatorTab() {
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    totalHours: "",
    condition: "excellent",
    location: "",
    modifications: "",
  });
  const [estimate, setEstimate] = useState<{
    estimatedValue: string;
    valueRange: string;
    confidence: string;
    factors: string[];
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate calculation
    setTimeout(() => {
      const baseValue = 350000;
      const yearFactor = formData.year ? (2024 - parseInt(formData.year)) * -5000 : 0;
      const hoursFactor = formData.totalHours ? Math.max(0, (parseInt(formData.totalHours) - 1000) * -50) : 0;
      const conditionFactor = {
        excellent: 0,
        veryGood: -15000,
        good: -30000,
        fair: -50000,
      }[formData.condition as keyof typeof conditionFactor] || 0;
      
      const estimated = baseValue + yearFactor + hoursFactor + conditionFactor;
      const range = estimated * 0.1;
      
      setEstimate({
        estimatedValue: `$${estimated.toLocaleString()}`,
        valueRange: `$${(estimated - range).toLocaleString()} - $${(estimated + range).toLocaleString()}`,
        confidence: "High",
        factors: [
          "Current market conditions",
          "Aircraft specifications",
          "Historical sales data",
          "Regional market trends",
        ],
      });
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Price Estimator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Estimate aircraft values based on model, year, condition, hours, and market data using our proprietary valuation algorithm.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Aircraft Model *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Cessna 172"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  required
                  min="1950"
                  max="2024"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g., 2020"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Flight Hours *
                </label>
                <input
                  type="number"
                  id="totalHours"
                  name="totalHours"
                  required
                  min="0"
                  value={formData.totalHours}
                  onChange={handleChange}
                  placeholder="e.g., 1200"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                >
                  <option value="excellent">Excellent</option>
                  <option value="veryGood">Very Good</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., United States"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modifications" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notable Modifications (Optional)
                </label>
                <textarea
                  id="modifications"
                  name="modifications"
                  rows={3}
                  value={formData.modifications}
                  onChange={handleChange}
                  placeholder="e.g., Garmin G1000 avionics, upgraded interior"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white font-medium rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <CalculatorIcon className="h-5 w-5 mr-2" />
                    Estimate Value
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div>
            {estimate ? (
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estimated Value</h3>
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {estimate.estimatedValue}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Value Range: {estimate.valueRange}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence:</span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {estimate.confidence}
                    </span>
                  </div>
                </div>

                <div className="border-t border-primary-200 dark:border-primary-800 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Valuation Factors:</h4>
                  <ul className="space-y-2">
                    {estimate.factors.map((factor, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircleIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setEstimate(null);
                    setFormData({
                      model: "",
                      year: "",
                      totalHours: "",
                      condition: "excellent",
                      location: "",
                      modifications: "",
                    });
                  }}
                  className="mt-6 w-full px-4 py-2 border border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-sm font-medium"
                >
                  New Estimate
                </button>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-8 border border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
                <div className="text-center">
                  <CalculatorIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">Get Your Estimate</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Fill out the form to receive an accurate aircraft value estimate based on our proprietary market data and ML algorithms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResaleAdvisoryTab() {
  const [selectedAircraft, setSelectedAircraft] = useState("Cessna 172");

  const advisoryData = {
    "Cessna 172": {
      currentValue: "$350,000",
      optimalSalePrice: "$355,000 - $365,000",
      bestTimeToSell: "Q2 2024",
      marketTrend: "Rising",
      trendPercentage: "+5.2%",
      daysOnMarket: 45,
      recommendations: [
        "Market conditions are favorable - consider listing within the next 30-60 days",
        "Price your aircraft at the upper end of the market range for best results",
        "Spring and early summer show highest buyer activity for this model",
        "Ensure all maintenance records are up-to-date to maximize value",
      ],
      marketInsights: [
        "Demand for training aircraft remains strong",
        "Average time to sale has decreased by 12% compared to last quarter",
        "Similar models are selling 3-5% above asking price",
      ],
      riskFactors: [
        "New model releases may impact demand in 6-12 months",
        "Fuel price volatility could affect buyer interest",
      ],
    },
    "Piper PA-28": {
      currentValue: "$285,000",
      optimalSalePrice: "$290,000 - $300,000",
      bestTimeToSell: "Q3 2024",
      marketTrend: "Stable",
      trendPercentage: "+2.1%",
      daysOnMarket: 52,
      recommendations: [
        "Market is stable - no rush, but don't wait too long",
        "Consider minor upgrades to increase appeal",
        "Fall season shows consistent buyer interest",
        "Highlight low hours and recent maintenance in listing",
      ],
      marketInsights: [
        "Steady demand from flight schools and private owners",
        "Inventory levels are balanced",
        "Price stability expected through end of year",
      ],
      riskFactors: [
        "Economic uncertainty may slow sales in late 2024",
        "Competition from newer models increasing",
      ],
    },
  };

  const advisory = advisoryData[selectedAircraft as keyof typeof advisoryData] || advisoryData["Cessna 172"];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 mb-6 transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Resale Advisory</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get expert advice on aircraft resale strategies, timing, and market positioning based on real-time market data.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Aircraft:
            </label>
            <select
              value={selectedAircraft}
              onChange={(e) => setSelectedAircraft(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="Cessna 172">Cessna 172</option>
              <option value="Piper PA-28">Piper PA-28</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Market Overview */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-lg p-6 border border-primary-200 dark:border-primary-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Market Overview</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Current Market Value</p>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{advisory.currentValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Optimal Sale Price Range</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{advisory.optimalSalePrice}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-primary-200 dark:border-primary-800">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Market Trend</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{advisory.marketTrend}</span>
                    <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                      <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                      {advisory.trendPercentage}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Avg. Days on Market</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{advisory.daysOnMarket}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Best Time to Sell */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timing Recommendation</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <BriefcaseIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Best Time to Sell</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{advisory.bestTimeToSell}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Based on historical sales data and seasonal market patterns, this period shows the highest buyer activity and best pricing opportunities.
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Strategic Recommendations</h3>
          <div className="space-y-3">
            {advisory.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Market Insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Market Insights
            </h3>
            <ul className="space-y-2">
              {advisory.marketInsights.map((insight, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              Risk Factors
            </h3>
            <ul className="space-y-2">
              {advisory.riskFactors.map((risk, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-2">⚠</span>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
