"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ${
        theme === "terminal" ? "bg-slate-800" : "bg-primary/30"
      }`}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
          theme === "terminal" ? "translate-x-4" : "-translate-x-4"
        }`}
      >
        <span className="material-symbols-outlined text-[14px] text-black">
          {theme === "terminal" ? "dark_mode" : "auto_awesome"}
        </span>
      </span>
    </button>
  );
}
