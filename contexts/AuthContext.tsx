"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  role?: string;
  plan: "free" | "pro";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, country?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem("hyeaero_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("hyeaero_user");
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Note: We don't clear onboarding on login because the user might have already completed it
    // In a real app, onboarding status would be tied to the user account
    const userData: User = {
      email,
      plan: "free", // Default to free plan
    };
    setUser(userData);
    localStorage.setItem("hyeaero_user", JSON.stringify(userData));
  };

  const signup = async (email: string, password: string, country?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Clear any previous user data and onboarding data for fresh start
    localStorage.removeItem("hyeaero_user");
    localStorage.removeItem("hyeaero_onboarding");
    const userData: User = {
      email,
      plan: "free",
    };
    setUser(userData);
    localStorage.setItem("hyeaero_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hyeaero_user");
    localStorage.removeItem("hyeaero_onboarding");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
