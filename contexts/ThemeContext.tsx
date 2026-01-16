"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Get system preference
  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  };

  // Calculate resolved theme
  const calculateResolvedTheme = (currentTheme: Theme): "light" | "dark" => {
    return currentTheme === "system" ? getSystemTheme() : currentTheme;
  };

  // Apply theme to document - this is the key function
  const applyTheme = (newResolvedTheme: "light" | "dark") => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      // Remove both classes first
      root.classList.remove("light", "dark");
      // Add the new theme class
      root.classList.add(newResolvedTheme);
      // Update state
      setResolvedTheme(newResolvedTheme);
      console.log("Theme applied:", newResolvedTheme, "Classes:", root.classList.toString());
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Get stored theme or default to system
    const storedTheme = (localStorage.getItem("hyeaero_theme") as Theme) || "system";
    const initialResolved = calculateResolvedTheme(storedTheme);
    
    setThemeState(storedTheme);
    setResolvedTheme(initialResolved);
    
    // Apply theme immediately
    applyTheme(initialResolved);
    
    setMounted(true);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (storedTheme === "system") {
        const newResolved = e.matches ? "dark" : "light";
        applyTheme(newResolved);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  // Update resolved theme when theme preference changes
  useEffect(() => {
    if (!mounted) return;
    
    const newResolved = calculateResolvedTheme(theme);
    applyTheme(newResolved);
    
    // Also set up listener for system theme changes if theme is system
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const newResolved = e.matches ? "dark" : "light";
        applyTheme(newResolved);
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    console.log("Setting theme to:", newTheme);
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("hyeaero_theme", newTheme);
    }
    const newResolved = calculateResolvedTheme(newTheme);
    applyTheme(newResolved);
  };

  const toggleTheme = () => {
    console.log("Toggle theme called, current resolved:", resolvedTheme);
    // Toggle between light and dark (ignore system for toggle)
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    console.log("Toggling to:", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
