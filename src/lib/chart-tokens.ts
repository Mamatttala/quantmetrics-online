"use client";

import { useEffect, useState } from "react";

/**
 * Charts are drawn on a canvas, so they cannot inherit CSS custom properties.
 * This hook resolves the design tokens the charts need and re-reads them
 * whenever the theme changes, which is what makes a chart re-render on a theme
 * switch (brief G: "Charts read the token values at runtime and re-render on
 * theme change").
 *
 * The theme is applied as `data-theme` on <html>, so a MutationObserver on that
 * one attribute is enough. The OS preference is watched as well, because a
 * visitor who has never chosen a theme follows it.
 */

export interface ChartTokens {
  text: string;
  textMuted: string;
  textDim: string;
  line: string;
  bgElev: string;
  teal: string;
  periwinkle: string;
  positive: string;
  negative: string;
  radius: string;
  fontMono: string;
}

const TOKEN_NAMES: Record<keyof ChartTokens, string> = {
  text: "--text",
  textMuted: "--text-muted",
  textDim: "--text-dim",
  line: "--line",
  bgElev: "--bg-elev",
  teal: "--teal",
  periwinkle: "--periwinkle",
  positive: "--positive",
  negative: "--negative",
  radius: "--r-input",
  fontMono: "--font-mono",
};

function readTokens(): ChartTokens {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  const entries = Object.entries(TOKEN_NAMES) as [keyof ChartTokens, string][];
  return Object.fromEntries(entries.map(([key, name]) => [key, read(name)])) as unknown as ChartTokens;
}

/** Resolved token values, or null before the first client render. */
export function useChartTokens(): ChartTokens | null {
  const [tokens, setTokens] = useState<ChartTokens | null>(null);

  useEffect(() => {
    const update = () => {
      const next = readTokens();
      setTokens((current) =>
        current && (Object.keys(next) as (keyof ChartTokens)[]).every((key) => current[key] === next[key])
          ? current
          : next,
      );
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const query = window.matchMedia("(prefers-color-scheme: dark)");
    query.addEventListener("change", update);

    return () => {
      observer.disconnect();
      query.removeEventListener("change", update);
    };
  }, []);

  return tokens;
}