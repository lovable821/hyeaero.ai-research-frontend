import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Dashboard | HyeAero.AI",
  description: "AI-powered aircraft research and market analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden flex flex-col antialiased bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
