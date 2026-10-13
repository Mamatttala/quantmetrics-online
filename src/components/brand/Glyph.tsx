export interface GlyphProps {
  className?: string;
  size?: number;
}

/**
 * Original Quantmetrics mark: a market-rhythm trace inside a ring.
 * Strokes use currentColor so the pill inverts with the theme.
 */
export function Glyph({ className, size = 20 }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="10" cy="10" r="8.25" />
      <path d="M5.6 11.6 8.1 8.3l2.1 4 2.3-6.1 1.9 5.2" />
    </svg>
  );
}