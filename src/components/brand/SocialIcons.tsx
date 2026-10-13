/**
 * Footer social marks.
 *
 * PLACEHOLDER ARTWORK: these are simplified, self-authored glyphs drawn on a
 * 24x24 grid so the footer needs no icon dependency. Swap them for the official
 * GitHub and X brand assets (from each vendor's brand guidelines) before
 * launch. Both are decorative - the accessible name lives on the link.
 */
export interface SocialIconProps {
  className?: string;
}

export function GitHubIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 1.6a10.4 10.4 0 0 0-3.29 20.27c.52.1.71-.22.71-.5v-1.94c-2.9.63-3.51-1.24-3.51-1.24-.47-1.2-1.16-1.52-1.16-1.52-.95-.65.07-.64.07-.64 1.05.08 1.6 1.08 1.6 1.08.93 1.6 2.44 1.14 3.04.87.09-.68.36-1.14.66-1.4-2.32-.26-4.76-1.16-4.76-5.17 0-1.14.41-2.08 1.08-2.81-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.87 1.07a9.9 9.9 0 0 1 5.22 0c1.99-1.35 2.87-1.07 2.87-1.07.57 1.45.21 2.52.1 2.79.67.73 1.08 1.67 1.08 2.81 0 4.02-2.45 4.91-4.78 5.17.38.32.71.96.71 1.94v2.88c0 .28.19.6.71.5A10.4 10.4 0 0 0 12 1.6Z" />
    </svg>
  );
}

export function XIcon({ className }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.53 3h2.86l-6.25 7.14L21.5 21h-5.75l-4.5-5.89L6.1 21H3.23l6.68-7.64L2.5 3h5.9l4.07 5.38L17.53 3Zm-1 16.2h1.58L7.6 4.7H5.9l10.63 14.5Z" />
    </svg>
  );
}