"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatBubbleLeftRightIcon, ChartBarIcon, CalculatorIcon, BriefcaseIcon, PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/outline";
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
