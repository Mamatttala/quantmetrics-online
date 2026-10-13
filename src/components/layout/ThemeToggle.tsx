"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  applyTheme,
  currentTheme,
  DEFAULT_THEME,
  readStoredTheme,
  setTheme,
  systemTheme,
  THEME_CHANGE_EVENT,
  toggleTheme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  /**
   * `sm` (default) is the 40px circle used inside the mobile menu. `navbar` is
   * the 52px circle: it is exactly as tall as the header bar, so its border
   * lands on the bar's own border and its circle caps the pill's right end.
   */
  size?: "sm" | "navbar";
  className?: string;
}

/**
 * The data-theme attribute on <html> is the store; the inline script in
 * src/lib/theme.ts has already resolved it before first paint. Reading it with
 * useSyncExternalStore keeps server and client markup identical and lets the
 * button follow OS preference changes until the visitor chooses explicitly.
 */
function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia("(prefers-color-scheme: light)");

  const onSystemChange = () => {
    if (!readStoredTheme()) {
      applyTheme(systemTheme());
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  query.addEventListener("change", onSystemChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
    query.removeEventListener("change", onSystemChange);
  };
}

function getSnapshot() {
  return currentTheme();
}

function getServerSnapshot() {
  return DEFAULT_THEME;
}

/** Circular icon button (sun / moon). */
export function ThemeToggle({ size = "sm", className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";
  const glyphSize = size === "navbar" ? 22 : 18;

  const handleClick = useCallback(() => {
    setTheme(toggleTheme(currentTheme()));
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isDark}
      aria-label="Toggle colour theme"
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-pill border border-line text-text",
        "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-bg-hover",
        size === "navbar" ? "size-6.5" : "size-5",
        className,
      )}
    >
      {isDark ? <SunIcon size={glyphSize} /> : <MoonIcon size={glyphSize} />}
    </button>
  );
}

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}