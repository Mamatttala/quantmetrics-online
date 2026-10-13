import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type KpiTrend = "up" | "down" | "flat";

export interface KpiTileProps {
  label: string;
  value: ReactNode;
  /** Change against the previous window, already formatted. */
  delta?: string;
  trend?: KpiTrend;
  caption?: string;
  className?: string;
}

const TREND_TONE: Record<KpiTrend, string> = {
  up: "text-positive",
  down: "text-negative",
  flat: "text-text-muted",
};

/** Direction glyph; decorative, because the delta text carries the meaning. */
const TREND_GLYPH: Record<KpiTrend, string> = {
  up: "\u2191",
  down: "\u2193",
  flat: "\u2192",
};

/**
 * Metric tile: mono label, 40px stat number, a coloured delta and a caption.
 * The delta is the only place `--positive` / `--negative` are used, which is
 * what the brief reserves them for.
 */
export function KpiTile({ label, value, delta, trend = "flat", caption, className }: KpiTileProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-mono-label text-text-dim">{label}</span>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-stat text-text">{value}</span>
        {delta ? (
          <span className={cn("text-mono-label", TREND_TONE[trend])}>
            <span aria-hidden="true">{TREND_GLYPH[trend]}</span>
            <span className="sr-only">{trend === "up" ? "up" : trend === "down" ? "down" : "flat"}</span>{" "}
            {delta}
          </span>
        ) : null}
      </span>
      {caption ? <span className="text-meta">{caption}</span> : null}
    </div>
  );
}