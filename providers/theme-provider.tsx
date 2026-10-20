"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeEvent = "portfolio-theme-change";
const systemThemeQuery = "(prefers-color-scheme: dark)";

function getTheme(): Theme {
  const stored = localStorage.getItem("theme");

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia(systemThemeQuery).matches ? "dark" : "light";
}

function getServerTheme(): Theme {
  return "light";
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(systemThemeQuery);

  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", onChange);
  media.addEventListener("change", onChange);

  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", onChange);
    media.removeEventListener("change", onChange);
  };
}

function setTheme(nextTheme: Theme) {
  localStorage.setItem("theme", nextTheme);
  document.documentElement.classList.toggle("dark", nextTheme === "dark");
  window.dispatchEvent(new Event(themeEvent));
}

function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
