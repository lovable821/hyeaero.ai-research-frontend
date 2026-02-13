"use client";

import React from "react";

type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex-1 min-h-0 w-full flex overflow-hidden bg-white">
      {children}
    </div>
  );
}
