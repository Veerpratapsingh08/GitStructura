"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "cyberpunk" | "terminal";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("cyberpunk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("codecity-theme") as Theme;
    if (savedTheme === "terminal" || savedTheme === "cyberpunk") {
      setTheme(savedTheme);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "terminal") {
      document.body.classList.add("theme-terminal");
    } else {
      document.body.classList.remove("theme-terminal");
    }
    localStorage.setItem("codecity-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "cyberpunk" ? "terminal" : "cyberpunk"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ visibility: mounted ? "visible" : "hidden", display: "contents" }}>
        {children}
      </div>
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
