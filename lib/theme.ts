/**
 * Central theme for HyeAero.AI frontend.
 * Single source of truth for colors, spacing, and interactive states.
 *
 * Usage:
 * - Change colors/timing here and sync the same values in app/globals.css :root (see comment there).
 * - Tailwind uses this via tailwind.config.ts (colors, transitionDuration, spacing).
 * - To add dark mode: export a second theme object and switch :root class or CSS vars at runtime.
 */

export const theme = {
  colors: {
    primary: "#0f2847",
    primaryLight: "#1e4976",
    accent: "#3b82f6",
    accentLight: "#60a5fa",
    surface: "#f8fafc",
    card: "#ffffff",
    /** Text: avoid black; use slate-800 or primary for emphasis */
    text: {
      primary: "#1e293b",
      secondary: "#475569",
      muted: "#64748b",
    },
    border: {
      DEFAULT: "#e2e8f0",
      hover: "rgba(59, 130, 246, 0.35)",
    },
  },
  /** Interactive (hover/focus/active/selection) - soft blur, no black */
  interactive: {
    hoverOverlay: "rgba(59, 130, 246, 0.08)",
    activeOverlay: "rgba(59, 130, 246, 0.12)",
    focusRing: "rgba(59, 130, 246, 0.28)",
    selectionBg: "rgba(59, 130, 246, 0.18)",
    selectionText: "#1e4976",
  },
  transition: {
    ui: "200ms",
    uiSlow: "300ms",
    easeOut: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  },
  /** Breakpoints (match Tailwind defaults; use for JS if needed) */
  screens: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  /** Touch-friendly minimum for mobile */
  touchTargetMin: "44px",
  /** Mobile nav bar height */
  mobileNavHeight: "56px",
} as const;

export type Theme = typeof theme;

/** Dark theme palette – used by globals.css .dark and Tailwind dark: variants */
export const themeDark = {
  colors: {
    primary: "#1e3a5f",
    primaryLight: "#2d4a6f",
    accent: "#60a5fa",
    accentLight: "#93c5fd",
    surface: "#0f172a",
    card: "#1e293b",
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
      muted: "#94a3b8",
    },
    border: {
      DEFAULT: "#334155",
      hover: "rgba(96, 165, 250, 0.4)",
    },
  },
  interactive: {
    hoverOverlay: "rgba(96, 165, 250, 0.1)",
    activeOverlay: "rgba(96, 165, 250, 0.15)",
    focusRing: "rgba(96, 165, 250, 0.4)",
    selectionBg: "rgba(96, 165, 250, 0.25)",
    selectionText: "#e2e8f0",
  },
} as const;

/** CSS custom properties string for :root (sync with globals.css when changing theme) */
export function getThemeCssVars(): Record<string, string> {
  const t = theme;
  return {
    "--primary": t.colors.primary,
    "--primary-light": t.colors.primaryLight,
    "--accent": t.colors.accent,
    "--accent-light": t.colors.accentLight,
    "--surface": t.colors.surface,
    "--card": t.colors.card,
    "--transition-ui": t.transition.ui,
    "--transition-slow": t.transition.uiSlow,
    "--ease-out": t.transition.easeOut,
    "--ease-in-out": t.transition.easeInOut,
    "--hover-overlay": t.interactive.hoverOverlay,
    "--active-overlay": t.interactive.activeOverlay,
    "--focus-ring": t.interactive.focusRing,
    "--selection-bg": t.interactive.selectionBg,
    "--selection-text": t.interactive.selectionText,
  };
}
