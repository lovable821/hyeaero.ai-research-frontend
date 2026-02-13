import type { Config } from "tailwindcss";
import { theme } from "./lib/theme";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: theme.colors.primary, light: theme.colors.primaryLight },
        accent: { DEFAULT: theme.colors.accent, light: theme.colors.accentLight },
        surface: { DEFAULT: theme.colors.surface, card: theme.colors.card },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        code: ["var(--font-manrope)", "sans-serif"],
      },
      transitionDuration: {
        ui: theme.transition.ui,
        "ui-slow": theme.transition.uiSlow,
      },
      transitionTimingFunction: {
        "out-smooth": theme.transition.easeOut,
        "in-out-smooth": theme.transition.easeInOut,
      },
      minHeight: {
        touch: theme.touchTargetMin,
      },
      spacing: {
        "mobile-nav": theme.mobileNavHeight,
      },
    },
  },
  plugins: [],
};

export default config;
