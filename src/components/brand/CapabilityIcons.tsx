import type { ReactNode } from "react";

/**
 * ORIGINAL ARTWORK - thin-line capability icons drawn for Quantmetrics.
 * 24px, currentColor, 1.5px stroke. Nothing is copied from another site.
 */

export interface CapabilityIconProps {
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

/** Research Lab: a beaker with two bubbles. */
export function ResearchLabIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <path d="M9 3h6" />
      <path d="M10 3v5.6L5.6 16.5A2.1 2.1 0 0 0 7.5 19.6h9a2.1 2.1 0 0 0 1.9-3.1L14 8.6V3" />
      <path d="M7.7 14.2h8.6" />
      <circle cx="10.7" cy="16.9" r="0.95" />
      <circle cx="13.7" cy="17.7" r="0.6" />
    </Icon>
  );
}

/** Data Analytics: a three-bar column chart on a baseline. */
export function DataAnalyticsIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <path d="M3.5 20.5h17" />
      <path d="M7 20.5v-6.2" />
      <path d="M12 20.5V8.2" />
      <path d="M17 20.5v-9.4" />
    </Icon>
  );
}

/** Intelligence Briefs: a document with a folded corner and body lines. */
export function IntelligenceBriefIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <path d="M13.6 3.5H7.2A1.7 1.7 0 0 0 5.5 5.2v13.6a1.7 1.7 0 0 0 1.7 1.7h9.6a1.7 1.7 0 0 0 1.7-1.7V8.4z" />
      <path d="M13.6 3.5v4.9h4.9" />
      <path d="M9 13.2h6" />
      <path d="M9 16.6h3.9" />
    </Icon>
  );
}

/** Insights: a magnifier over a rising trend line. */
export function InsightsIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <circle cx="10.7" cy="10.7" r="6.9" />
      <path d="M15.8 15.8 20.5 20.5" />
      <path d="M7.5 12.3l1.9-2.2 1.8 1.6 2.2-2.5" />
    </Icon>
  );
}

/** Tutorials: an open book. */
export function TutorialsIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <path d="M12 7.9C10.4 6.4 8.3 5.7 5.6 5.7a.9.9 0 0 0-.9.9v9.5a.9.9 0 0 0 .9.9c2.7 0 4.8.7 6.4 2.2 1.6-1.5 3.7-2.2 6.4-2.2a.9.9 0 0 0 .9-.9V6.6a.9.9 0 0 0-.9-.9c-2.7 0-4.8.7-6.4 2.2Z" />
      <path d="M12 7.9v11.3" />
    </Icon>
  );
}

/** Risk Analytics: a shield carrying a pulse line. */
export function RiskAnalyticsIcon({ className }: CapabilityIconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3.3 5.2 6v6.1c0 3.9 2.8 7 6.8 8.4 4-1.4 6.8-4.5 6.8-8.4V6z" />
      <path d="M8.4 12.2h2.2l1.4-2.6 1.6 4.4 1.2-1.8h1.6" />
    </Icon>
  );
}
