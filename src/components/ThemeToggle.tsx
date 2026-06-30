"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50`}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-[var(--text-primary)] shadow-sm ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
          theme === "dark" ? "translate-x-3.5" : "-translate-x-3.5"
        }`}
      >
        <span className="material-symbols-outlined text-[14px] text-[var(--bg-primary)]">
          {theme === "dark" ? "dark_mode" : "light_mode"}
        </span>
      </span>
    </button>
  );
}
