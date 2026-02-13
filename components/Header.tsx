"use client";

import Link from "next/link";
import { Hexagon } from "lucide-react";

type HeaderProps = {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
};

export default function Header({ isAuthenticated, onSignIn, onSignOut }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex-shrink-0 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-heading">
          <span className="text-accent" aria-hidden>
            <Hexagon className="w-7 h-7" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold text-primary tracking-tight">
            HyeAero<span className="text-accent">.AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onSignOut}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign out
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light transition-colors"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
