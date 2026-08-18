import { useCallback, useEffect, useSyncExternalStore, useState } from "react";

type Theme = "light" | "dark" | "system";

const THEME_KEY = "pkay-theme";
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((fn) => fn());
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system")
      return stored;
  } catch {
    // localStorage not available
  }
  return "system";
}

function applyThemeToDOM(theme: Theme) {
  if (typeof document === "undefined") return;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

// External store for useSyncExternalStore
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): Theme {
  return getStoredTheme();
}

function getServerSnapshot(): Theme {
  return "system";
}

export function setTheme(t: Theme) {
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {
    // localStorage not available
  }
  applyThemeToDOM(t);
  emitChange();
}

export function toggleTheme() {
  const current = getStoredTheme();
  const resolved = current === "system" ? getSystemTheme() : current;
  setTheme(resolved === "dark" ? "light" : "dark");
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const resolved: "light" | "dark" =
    theme === "system" ? getSystemTheme() : theme;

  // Keep DOM class in sync
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Listen for OS theme changes when in system mode
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      applyThemeToDOM("system");
      emitChange(); // force re-render so resolved value updates
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return {
    theme,
    resolved,
    setTheme,
    toggle: toggleTheme,
  };
}
