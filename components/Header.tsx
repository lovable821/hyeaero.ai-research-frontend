"use client";

import Link from "next/link";
import { Hexagon, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

type HeaderProps = {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onSignOut?: () => void;
};

export default function Header({ isAuthenticated, onSignIn, onSignOut }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex-shrink-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-12 sm:h-14 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="flex items-center gap-1.5 sm:gap-2 font-heading rounded-lg py-2 px-2 -ml-2 min-h-touch text-primary dark:text-slate-100 transition-all duration-200 ease-out hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.99] active:bg-accent/15"
        >
          <span className="text-accent transition-colors duration-200 flex-shrink-0" aria-hidden>
            <Hexagon className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg font-semibold tracking-tight truncate">
            HyeAero<span className="text-accent">.AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 min-h-touch min-w-touch flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all duration-200 ease-out hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={onSignOut}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg py-2 px-3 min-h-touch flex items-center transition-all duration-200 ease-out hover:text-slate-700 dark:hover:text-slate-200 hover:bg-accent/10 dark:hover:bg-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.98] active:bg-accent/15"
            >
              Sign out
            </button>
          ) : (
            <button
              type="button"
              onClick={onSignIn}
              className="rounded-lg bg-primary dark:bg-primary-light px-3 sm:px-4 py-2 text-sm font-medium text-white min-h-touch flex items-center transition-all duration-200 ease-out hover:bg-primary-light dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 active:scale-[0.98]"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
