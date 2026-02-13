"use client";

import { Lightbulb, Clock, MessageSquare } from "lucide-react";

const TIPS = [
  { title: "Be Specific", text: "Include aircraft model, age, hours, and region for accurate results." },
  { title: "Compare Markets", text: "Ask about regional differences to find the best opportunities." },
  { title: "Historical Context", text: "Request trend analysis to understand market dynamics." },
];

/** 10 queries to test Ask Consultant (based on saved & embedded data: listings, sales, aircraft, FAA; last one triggers LLM fallback). */
export const CONSULTANT_TEST_QUERIES = [
  "What Phenom 300 or Citation listings do you have?",
  "What did Citation X or similar jets sell for recently?",
  "Compare Phenom 300 2017 under 1,500 hours in the U.S.",
  "Do you have any Gulfstream G650 or G650ER listings?",
  "FAA registrations for Phenom 300 or Citation",
  "Show me Boeing 737 or Airbus A320 listings with asking price",
  "Recent aircraft sales by model and sold price",
  "What aircraft master or model details do you have for Embraer or Cessna?",
  "Listings in North America with airframe hours and price",
  "What types of flight models are available?",
];

type ChatSidebarProps = {
  recentQueries?: string[];
  onSuggestedQueryClick?: (query: string) => void;
};

export default function ChatSidebar({ recentQueries = [], onSuggestedQueryClick }: ChatSidebarProps) {
  return (
    <aside className="space-y-5 flex-shrink-0">
      {CONSULTANT_TEST_QUERIES.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            Try these (test Ask Consultant)
          </h3>
          <ul className="space-y-2 text-sm">
            {CONSULTANT_TEST_QUERIES.map((q, i) => (
              <li key={i}>
                {onSuggestedQueryClick ? (
                  <button
                    type="button"
                    onClick={() => onSuggestedQueryClick(q)}
                    className="text-left w-full text-slate-600 hover:text-accent hover:underline truncate block"
                  >
                    {q}
                  </button>
                ) : (
                  <span className="text-slate-600 truncate block">{q}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Quick Research Tips</h3>
        <ul className="space-y-3">
          {TIPS.map((t) => (
            <li key={t.title} className="flex gap-2">
              <span className="text-amber-500 mt-0.5 flex-shrink-0">
                <Lightbulb className="w-4 h-4" />
              </span>
              <div>
                <span className="text-sm font-medium text-slate-800">{t.title}</span>
                <p className="text-xs text-slate-500 mt-0.5">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          Recent Queries
        </h3>
        <ul className="space-y-2 text-sm text-slate-600">
          {recentQueries.length > 0 ? (
            recentQueries.map((q, i) => (
              <li key={i} className="truncate pl-0">{q}</li>
            ))
          ) : (
            <li className="text-slate-400 italic">No recent queries yet. Ask the consultant something to see them here.</li>
          )}
        </ul>
      </div>
    </aside>
  );
}
