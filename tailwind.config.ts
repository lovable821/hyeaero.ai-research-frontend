import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0f2847", light: "#1e4976" },
        accent: { DEFAULT: "#3b82f6", light: "#60a5fa" },
        surface: { DEFAULT: "#f8fafc", card: "#ffffff" },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial", "Helvetica", "sans-serif"],
        body: ["var(--font-body)", "Arial", "Helvetica", "sans-serif"],
        code: ["var(--font-code)", "Arial", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
