"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col w-full">
        <div className="flex-1 min-h-0 min-w-0 flex flex-col">
          <Dashboard isAuthenticated={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
