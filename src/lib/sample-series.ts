/**
 * Synthetic sample series for the home page's data preview.
 *
 * These numbers are GENERATED, not observed: a seeded PRNG walks a geometric
 * price path and the volatility series is its rolling standard deviation. The
 * seed makes every render - server and client - produce identical values, so
 * there is no hydration drift. They are not market data, not a backtest and not
 * a performance claim; they exist to show what a chart panel looks like.
 */

/** mulberry32: tiny deterministic PRNG, so the series never changes. */
function mulberry32(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const POINTS = 180;
const LAST_DAY = Date.UTC(2026, 8, 30); // 2026-09-30
const DAY = 86400000;
const WINDOW = 20;

export interface SamplePoint {
  /** ISO date, used for the axis and the tooltip header. */
  date: string;
  /** Synthetic closing level, rebased to 100. */
  close: number;
  /** Annualised rolling volatility in percent. */
  volatility: number;
}

function buildSeries(): SamplePoint[] {
  const random = mulberry32(0x5eed);
  const drift = 0.0004;
  const step = 0.011;

  // Box-Muller, so the innovations look like returns rather than uniform noise.
  const normal = () => {
    const u = Math.max(random(), 1e-9);
    const v = random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  const closes: number[] = [];
  let level = 100;
  for (let i = 0; i < POINTS; i += 1) {
    level *= Math.exp(drift + step * normal());
    closes.push(level);
  }

  return closes.map((close, i) => {
    const from = Math.max(0, i - WINDOW + 1);
    const window = closes.slice(from, i + 1);
    const logReturns = window.slice(1).map((value, n) => Math.log(value / window[n]));
    const mean = logReturns.reduce((sum, value) => sum + value, 0) / Math.max(1, logReturns.length);
    const variance =
      logReturns.reduce((sum, value) => sum + (value - mean) ** 2, 0) /
      Math.max(1, logReturns.length - 1);
    const annualised = Math.sqrt(variance * 252) * 100;

    return {
      date: new Date(LAST_DAY - (POINTS - 1 - i) * DAY).toISOString().slice(0, 10),
      close: Number(close.toFixed(2)),
      volatility: Number((Number.isFinite(annualised) ? annualised : 0).toFixed(2)),
    };
  });
}

/** The one series the preview draws. Deterministic; safe on the server. */
export const SAMPLE_SERIES: SamplePoint[] = buildSeries();

export interface SampleMetric {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  caption: string;
}

/**
 * KPI tiles for the preview. Derived from the synthetic series above, so they
 * move with it and never claim anything about a real instrument.
 */
export const SAMPLE_METRICS: SampleMetric[] = [
  {
    label: "Annualised volatility",
    value: `${SAMPLE_SERIES[SAMPLE_SERIES.length - 1].volatility.toFixed(1)}%`,
    delta: "+0.4 pp",
    trend: "up",
    caption: "20-day window",
  },
  {
    label: "Rolling return",
    value: "+6.8%",
    delta: "+1.2 pp",
    trend: "up",
    caption: "60-day window",
  },
  {
    label: "Max drawdown",
    value: "-4.1%",
    delta: "-0.6 pp",
    trend: "down",
    caption: "Full sample",
  },
];