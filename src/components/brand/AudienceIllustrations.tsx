/**
 * ORIGINAL ARTWORK - isometric thin-line illustrations drawn for Quantmetrics.
 *
 * Every shape is built from one tiny isometric projection, so the nine pieces
 * share a single perspective. `frame()` then centres each drawing and scales it
 * into a common box, which means they all read at the same weight. Because the
 * coordinates are scaled rather than the canvas, the stroke stays exactly 1.5px
 * in currentColor at every size. Nothing here is copied from another site.
 */

type P = [number, number];

const COS30 = 0.866;
const SIN30 = 0.5;
/** Centre of the 200x200 viewBox; all artwork is fitted around it. */
const CX = 100;
const CY = 100;
/** Side of the square each illustration is scaled into. */
const FIT = 150;

/** Project an isometric grid coordinate (i right, j left, k up) into the viewBox. */
function iso(i: number, j: number, k: number, s: number): P {
  return [CX + (i - j) * COS30 * s, CY + (i + j) * SIN30 * s - k * s];
}

/** Top, left and right faces of an isometric box. */
function prism(i: number, j: number, k: number, w: number, d: number, h: number, s: number): P[][] {
  return [
    [iso(i, j, k + h, s), iso(i + w, j, k + h, s), iso(i + w, j + d, k + h, s), iso(i, j + d, k + h, s)],
    [iso(i, j + d, k + h, s), iso(i + w, j + d, k + h, s), iso(i + w, j + d, k, s), iso(i, j + d, k, s)],
    [iso(i + w, j, k + h, s), iso(i + w, j + d, k + h, s), iso(i + w, j + d, k, s), iso(i + w, j, k, s)],
  ];
}

/** A flat disc lying in the i/j plane. */
function disc(k: number, r: number, s: number, segments = 30): P[] {
  return Array.from({ length: segments }, (_, n) => {
    const angle = (n / segments) * Math.PI * 2;
    return iso(r * Math.cos(angle), r * Math.sin(angle), k, s);
  });
}

/** Centre the artwork and fit it into the common box, so all nine match. */
function frame(shapes: P[][]): P[][] {
  const all = shapes.flat();
  const xs = all.map(([x]) => x);
  const ys = all.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scale = Math.min(FIT / (maxX - minX || 1), FIT / (maxY - minY || 1));
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;

  return shapes.map((shape) =>
    shape.map(([x, y]) => [CX + (x - midX) * scale, CY + (y - midY) * scale] as P),
  );
}

const toPoints = (shape: P[]) => shape.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
const toPath = (shape: P[]) =>
  `M ${shape.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join(" L ")}`;

export interface AudienceArtProps {
  className?: string;
}

/** `areas` are closed outlines, `lines` are open polylines. */
function Art({
  className,
  areas = [],
  lines = [],
}: AudienceArtProps & { areas?: P[][]; lines?: P[][] }) {
  const framed = frame([...areas, ...lines]);
  const framedAreas = framed.slice(0, areas.length);
  const framedLines = framed.slice(areas.length);

  return (
    <svg
      viewBox="0 0 200 200"
      width="200"
      height="200"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {framedAreas.map((shape) => (
        <polygon key={toPoints(shape)} points={toPoints(shape)} />
      ))}
      {framedLines.map((shape) => (
        <path key={toPath(shape)} d={toPath(shape)} />
      ))}
    </svg>
  );
}

/* --- Researchers --------------------------------------------------------- */

/** A cluster of volatility bars standing on a plinth. */
export function ResearcherVolatilityArt({ className }: AudienceArtProps) {
  const s = 15;
  const heights = [1.2, 2.1, 1.6, 2.7];
  const plate = prism(-2.7, -1.15, -0.4, 5.4, 2.3, 0.4, s);
  const bars = heights.flatMap((h, n) => prism(-2.3 + n * 1.3, -0.4, 0, 0.85, 0.85, h, s));
  return <Art className={className} areas={[...plate, ...bars]} />;
}

/** A backtest: three separated steps with the equity line rising over them. */
export function ResearcherBacktestArt({ className }: AudienceArtProps) {
  const s = 15;
  const areas = [0.8, 1.6, 2.4].flatMap((h, n) =>
    prism(-1.9 + n * 1.35, -0.6, 0, 1.05, 1.2, h, s),
  );
  const lines = [
    [
      iso(-1.375, 0, 0.85, s),
      iso(-0.025, 0, 1.65, s),
      iso(1.325, 0, 2.45, s),
      iso(2.5, 0, 3.2, s),
    ],
  ];
  return <Art className={className} areas={areas} lines={lines} />;
}

/** A wireframe surface - the shape a volatility or regime study takes. */
export function ResearcherRegimeArt({ className }: AudienceArtProps) {
  const steps = [0, 1, 2, 3, 4];
  const bump = (i: number, j: number) => {
    const d = (i - 2) * (i - 2) + (j - 2) * (j - 2);
    return 1.5 * Math.exp(-d / 3.4);
  };
  const lines = [
    ...steps.map((i) => steps.map((j) => iso(i, j, bump(i, j), 15))),
    ...steps.map((j) => steps.map((i) => iso(i, j, bump(i, j), 15))),
  ];
  return <Art className={className} lines={lines} />;
}

/* --- Traders ------------------------------------------------------------- */

/** A signal line traced over a flat base. */
export function TraderSignalArt({ className }: AudienceArtProps) {
  const s = 15;
  const areas = [
    [iso(-1.9, -1.9, 0, s), iso(1.9, -1.9, 0, s), iso(1.9, 1.9, 0, s), iso(-1.9, 1.9, 0, s)],
  ];
  const values = [0.5, 1.8, 1.2, 2.6, 2, 3.4];
  const lines = [values.map((v, n) => iso(-1.9 + n * 0.76, 0, v, s))];
  return <Art className={className} areas={areas} lines={lines} />;
}

/** A three-tier capital stack. */
export function TraderRiskArt({ className }: AudienceArtProps) {
  const s = 15;
  const r = 1.9;
  const h = 0.6;
  const areas = [disc(0, r, s), disc(h, r, s), disc(h * 2, r, s)];
  const lines = [
    [iso(r, 0, 0, s), iso(r, 0, h * 2, s)],
    [iso(-r, 0, 0, s), iso(-r, 0, h * 2, s)],
  ];
  return <Art className={className} areas={areas} lines={lines} />;
}

/** A position grid with one raised cell. */
export function TraderPortfolioArt({ className }: AudienceArtProps) {
  const areas: P[][] = [];
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const raised = i === 1 && j === 1;
      areas.push(...prism(i * 1.25 - 1.25, j * 1.25 - 1.25, 0, 1, 1, raised ? 1.7 : 0.6, 13));
    }
  }
  return <Art className={className} areas={areas} />;
}

/* --- Newcomers ----------------------------------------------------------- */

/** One block, with an arrow rising past it. */
export function NewcomerBasicsArt({ className }: AudienceArtProps) {
  const areas = prism(-0.9, -0.9, 0, 1.8, 1.8, 1.6, 15);
  const tip: P = [102, 52];
  const lines: P[][] = [
    [[40, 104], [56, 84], [76, 66], tip],
    [tip, [tip[0] - 13, tip[1] - 2]],
    [tip, [tip[0] - 5, tip[1] + 12]],
  ];
  return <Art className={className} areas={areas} lines={lines} />;
}

/** Two stacked sheets, the top one annotated. */
export function NewcomerNotesArt({ className }: AudienceArtProps) {
  const s = 15;
  const areas = [...prism(-1.6, -1.6, 0, 3.2, 3.2, 0.16, s), ...prism(-1.6, -1.6, 0.5, 3.2, 3.2, 0.16, s)];
  const lines = [
    [iso(-1, -0.6, 0.66, s), iso(1, -0.6, 0.66, s)],
    [iso(-1, 0.1, 0.66, s), iso(0.4, 0.1, 0.66, s)],
  ];
  return <Art className={className} areas={areas} lines={lines} />;
}

/** A wave running across a flat base - the rhythm of markets. */
export function NewcomerRhythmArt({ className }: AudienceArtProps) {
  const s = 15;
  const areas = [
    [iso(-2.4, -2.4, 0, s), iso(2.4, -2.4, 0, s), iso(2.4, 2.4, 0, s), iso(-2.4, 2.4, 0, s)],
  ];
  const lines = [
    Array.from({ length: 17 }, (_, n) => {
      const i = -2.4 + n * 0.3;
      return iso(i, 0, 1.25 + 0.85 * Math.sin((n / 16) * Math.PI * 4), s);
    }),
  ];
  return <Art className={className} areas={areas} lines={lines} />;
}
