import type { ReactNode } from "react";

/**
 * ORIGINAL ARTWORK for the Services page. Everything here is drawn for
 * Quantmetrics on a thin-line system: 1.5px stroke, `currentColor`, no fills
 * except the soft washes, so the tone follows the surrounding text colour and
 * the pieces work in both themes. Nothing is copied from another site.
 */

interface ArtworkProps {
  className?: string;
}

/** Shared shell: one place for the 1.5px thin-line treatment. */
function Frame({
  viewBox,
  className,
  preserveAspectRatio,
  children,
}: {
  viewBox: string;
  className?: string;
  preserveAspectRatio?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/* -----------------------------------------------------------------------------
   Hero: flowing thin-line waves.
   Six long sine lines span a wide viewBox so the artwork can be stretched with
   `slice`. Each line is drawn twice: a quiet solid base and a dashed highlight
   that streams along it through `wave-flow`. Colours come from the parent's text
   colour, so the hero decides how blue it is.
   -------------------------------------------------------------------------- */

const WAVE_WIDTH = 1200;
const WAVE_HEIGHT = 640;

/** Samples one sine line into a polyline path. */
function wavePath(baseY: number, amplitude: number, periods: number, phase: number) {
  const step = 16;
  let d = "";

  for (let x = 0; x <= WAVE_WIDTH; x += step) {
    const y = baseY + Math.sin((x / WAVE_WIDTH) * Math.PI * 2 * periods + phase) * amplitude;
    d += `${x === 0 ? "M" : "L"}${x} ${y.toFixed(2)}`;
  }

  return d;
}

interface Wave {
  baseY: number;
  amplitude: number;
  periods: number;
  phase: number;
  opacity: number;
  /** Dash pitch of the streaming highlight. */
  dash: string;
  delay: string;
}

const WAVES: Wave[] = [
  // Dash + gap always sums to the 1200 unit `pathLength`, so the highlight
  // streams through the whole line and the loop closes without a seam.
  { baseY: 96, amplitude: 34, periods: 2.4, phase: 0.0, opacity: 0.30, dash: "120 1080", delay: "0s" },
  { baseY: 176, amplitude: 46, periods: 1.9, phase: 1.1, opacity: 0.42, dash: "180 1020", delay: "-3.5s" },
  { baseY: 262, amplitude: 30, periods: 2.8, phase: 2.2, opacity: 0.34, dash: "90 1110", delay: "-7s" },
  { baseY: 348, amplitude: 52, periods: 2.1, phase: 0.7, opacity: 0.50, dash: "220 980", delay: "-10.5s" },
  { baseY: 434, amplitude: 34, periods: 2.6, phase: 1.8, opacity: 0.38, dash: "140 1060", delay: "-14s" },
  { baseY: 520, amplitude: 44, periods: 2.0, phase: 3.0, opacity: 0.26, dash: "160 1040", delay: "-17.5s" },
];

export function WaveArtwork({ className }: ArtworkProps) {
  return (
    // `slice` lets the six lines fill the hero edge to edge instead of
    // letterboxing inside it; the outer lines simply run off the top and bottom.
    <Frame
      viewBox={`0 0 ${WAVE_WIDTH} ${WAVE_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      {WAVES.map((wave) => {
        const d = wavePath(wave.baseY, wave.amplitude, wave.periods, wave.phase);

        return (
          <g key={wave.baseY}>
            <path d={d} strokeOpacity={wave.opacity * 0.6} pathLength={1200} />
            <path
              className="wave-flow"
              d={d}
              pathLength={1200}
              strokeDasharray={wave.dash}
              strokeOpacity={wave.opacity}
              style={{ animationDelay: wave.delay }}
            />
          </g>
        );
      })}
    </Frame>
  );
}

/* -----------------------------------------------------------------------------
   Section artwork: one per service. Same 320x180 frame so the three columns of
   the page read as one set.
   -------------------------------------------------------------------------- */

/** Research: a cumulative curve against a flat benchmark, with a drawdown strip. */
export function ResearchArtwork({ className }: ArtworkProps) {
  return (
    <Frame viewBox="0 0 320 180" className={className}>
      <path d="M24 12v138h272" strokeOpacity="0.5" />

      {/* benchmark */}
      <path d="M24 92h272" strokeOpacity="0.3" strokeDasharray="4 6" />

      {/* shaded band around the result */}
      <path
        d="M24 74c26-9 42 5 66-6s38-24 62-20 40 20 62 8 52-30 82-34v52c-30 4-60 26-82 30s-38-14-62-14-36 8-62 6-40-8-66-6z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="none"
      />
      <path d="M24 74c26-9 42 5 66-6s38-24 62-20 40 20 62 8 52-30 82-34" />

      {/* marked observation */}
      <circle cx="152" cy="48" r="3" />
      <path d="M152 48v44" strokeOpacity="0.45" strokeDasharray="3 4" />

      {/* drawdown strip */}
      <path d="M24 164h272" strokeOpacity="0.2" />
      <path d="M24 156c30 0 48 6 74 6s44-14 70-14 46 10 74 10 54-6 54-6" strokeOpacity="0.55" />
    </Frame>
  );
}

/** Analysis: observations with a fitted line and the residuals left visible. */
export function AnalysisArtwork({ className }: ArtworkProps) {
  const points: Array<[number, number]> = [
    [36, 132], [52, 120], [64, 126], [78, 104], [92, 112], [104, 92],
    [118, 98], [132, 78], [146, 88], [158, 64], [172, 72], [186, 52],
    [200, 60], [214, 40], [228, 48], [246, 30], [262, 36], [280, 22],
  ];

  return (
    <Frame viewBox="0 0 320 180" className={className}>
      <path d="M24 12v138h272" strokeOpacity="0.5" />

      {/* gridlines */}
      <path d="M24 50h272" strokeOpacity="0.18" />
      <path d="M24 92h272" strokeOpacity="0.18" />
      <path d="M24 134h272" strokeOpacity="0.18" />

      {/* residuals */}
      {points
        .filter((_, index) => index % 3 === 0)
        .map(([x, y]) => {
          const fitted = 138 - x * 0.42;
          return <path key={x} d={`M${x} ${y}v${(fitted - y).toFixed(1)}`} strokeOpacity="0.4" />;
        })}

      {/* fitted line */}
      <path d="M28 124 288 20" strokeDasharray="6 5" strokeOpacity="0.7" />

      {/* observations */}
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" />
      ))}
    </Frame>
  );
}

/** Metrics: a metric panel - bars, a target line and a small readout table. */
export function MetricsArtwork({ className }: ArtworkProps) {
  const bars = [
    { x: 30, height: 58 },
    { x: 66, height: 84 },
    { x: 102, height: 46 },
    { x: 138, height: 96 },
    { x: 174, height: 70 },
  ];

  return (
    <Frame viewBox="0 0 320 180" className={className}>
      <path d="M24 12v138h168" strokeOpacity="0.5" />

      {/* target line */}
      <path d="M24 46h272" strokeDasharray="5 5" strokeOpacity="0.55" />

      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={144 - bar.height}
          width={18}
          height={bar.height}
          rx="2"
          fill="currentColor"
          fillOpacity="0.14"
        />
      ))}

      {/* readout */}
      <path d="M212 24h84" strokeOpacity="0.45" />
      <path d="M212 52h84" strokeOpacity="0.25" />
      <path d="M212 80h84" strokeOpacity="0.25" />
      <path d="M212 108h84" strokeOpacity="0.25" />
      <path d="M212 136h84" strokeOpacity="0.25" />
      <path d="M252 24v112" strokeOpacity="0.25" />
      <rect x="212" y="24" width="30" height="9" rx="2" fill="currentColor" fillOpacity="0.45" stroke="none" />
      <rect x="258" y="52" width="22" height="9" rx="2" fill="currentColor" fillOpacity="0.3" stroke="none" />
      <rect x="258" y="80" width="34" height="9" rx="2" fill="currentColor" fillOpacity="0.3" stroke="none" />
      <rect x="258" y="108" width="18" height="9" rx="2" fill="currentColor" fillOpacity="0.3" stroke="none" />
    </Frame>
  );
}

/** Maps a service anchor to its artwork, so the page stays declarative. */
export const SERVICE_ARTWORK = {
  research: ResearchArtwork,
  analysis: AnalysisArtwork,
  metrics: MetricsArtwork,
} as const;