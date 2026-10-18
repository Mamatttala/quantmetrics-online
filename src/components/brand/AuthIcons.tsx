/**
 * Auth pill marks.
 *
 * PLACEHOLDER ARTWORK, authored for this project: three simplified glyphs drawn
 * on a 16x16 grid with currentColor strokes, so the auth panel needs no icon
 * dependency and no vendor brand asset. They are deliberately generic - none of
 * them reproduces a third party's trademark. Swap them for the official marks
 * (under each vendor's brand guidelines) when the real providers are wired in.
 *
 * The GitHub mark is the same simplification the footer uses
 * (src/components/brand/SocialIcons.tsx), so the two surfaces stay consistent.
 */

export interface AuthIconProps {
  className?: string;
}

/** Suggested "G": an open ring with a bar, not the vendor's four-colour mark. */
export function GoogleMark({ className }: AuthIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M13.4 8A5.4 5.4 0 1 1 11.9 4.1" />
      <path d="M13.4 8H8.6" />
    </svg>
  );
}

/** Envelope: the mocked email option. */
export function EnvelopeMark({ className }: AuthIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="2.25" y="3.75" width="11.5" height="8.5" rx="1.5" />
      <path d="m3.5 5.75 4.5 3.2 4.5-3.2" />
    </svg>
  );
}

