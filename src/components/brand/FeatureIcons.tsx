import type { ReactNode } from "react";

/**
 * ORIGINAL ARTWORK - thin-line icons for the home page feature trio
 * (Analyze / Visualize / Share). 24px, currentColor, 1.5px stroke.
 * Nothing is copied from another site.
 */

export interface FeatureIconProps {
  className?: string;
}

/** Shared shell: one place for the 1.5px thin-line treatment. */
function Icon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
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

/** Analyze: a plot frame with a line traced through a marked data point. */
export function AnalyzeIcon({ className }: FeatureIconProps) {
  return (
    <Icon className={className}>
      <path d="M4 4.2v15.6h15.8" />
      <path d="M6.8 15.4 10.6 11l3.2 2.8 4.6-6.2" />
      <circle cx="10.6" cy="11" r="1.25" />
    </Icon>
  );
}

/** Visualize: a pie with two radii marking one quarter. */
export function VisualizeIcon({ className }: FeatureIconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="7.7" />
      <path d="M12 4.3V12h7.7" />
    </Icon>
  );
}

/** Share: a panel with an arrow leaving the top-right corner. */
export function ShareIcon({ className }: FeatureIconProps) {
  return (
    <Icon className={className}>
      <path d="M14.4 4.6h5v5" />
      <path d="M19.4 4.6 11.6 12.4" />
      <path d="M18.2 14v4.4a1.6 1.6 0 0 1-1.6 1.6H6.2a1.6 1.6 0 0 1-1.6-1.6V8a1.6 1.6 0 0 1 1.6-1.6h4.4" />
    </Icon>
  );
}