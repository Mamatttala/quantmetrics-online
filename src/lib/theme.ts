export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "qm-theme";
export const THEME_ATTRIBUTE = "data-theme";
export const DEFAULT_THEME: Theme = "dark";

/**
 * Dispatched on window whenever the theme is applied. Charts and other
 * runtime-themed widgets (the ECharts panels land in a later stage) listen for
 * this to re-read the tokens and re-render.
 */
export const THEME_CHANGE_EVENT = "qm:themechange";

export interface ThemeChangeDetail {
  theme: Theme;
}

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/** The visitor's OS preference; dark is the documented fallback. */
export function systemTheme(): Theme {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return DEFAULT_THEME;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** The explicit choice, if the visitor has ever made one. */
export function readStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

/** What is on screen right now: explicit choice, then OS, then fallback. */
export function currentTheme(): Theme {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }
  const attribute = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  if (isTheme(attribute)) {
    return attribute;
  }
  return readStoredTheme() ?? systemTheme();
}

/** Writes the attribute the CSS keys off and notifies runtime consumers. */
export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  window.dispatchEvent(new CustomEvent<ThemeChangeDetail>(THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode / disabled storage: the theme still applies for this session.
  }
}

export function setTheme(theme: Theme): void {
  applyTheme(theme);
  persistTheme(theme);
}

export function toggleTheme(theme: Theme): Theme {
  return theme === "dark" ? "light" : "dark";
}

/**
 * Inline, blocking script rendered as the first element of <body>.
 * It resolves explicit choice -> OS preference -> dark and sets data-theme
 * before anything paints, so there is no flash of the wrong theme and the
 * server-rendered HTML stays theme-agnostic.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"?s:window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.setAttribute("${THEME_ATTRIBUTE}",t)}catch(e){document.documentElement.setAttribute("${THEME_ATTRIBUTE}","${DEFAULT_THEME}")}})();`;
/**
 * Concatenated onto `themeInitScript`. Marks the document as scripted so that
 * styles which must not hide content from a no-JS visitor (the scroll reveal)
 * can be scoped to `html.js`.
 */
export const jsFlagScript = `document.documentElement.classList.add("js");`;