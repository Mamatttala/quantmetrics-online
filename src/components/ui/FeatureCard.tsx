import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FeatureCardVariant = "teal-blue" | "pink-coral";

export interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  variant?: FeatureCardVariant;
  /** Forces the filled state, so a preview can show it without hovering. */
  active?: boolean;
  className?: string;
}

const FILL: Record<FeatureCardVariant, string> = {
  "teal-blue": "gradient-teal-blue",
  "pink-coral": "gradient-pink-coral",
};

/**
 * Bordered card that fills with a gradient on hover (and on focus-within, so
 * keyboard users see the same state). Text switches to the on-gradient tokens.
 */
export function FeatureCard({
  title,
  description,
  icon,
  variant = "teal-blue",
  active = false,
  className,
}: FeatureCardProps) {
  const fill = FILL[variant];
  const fillOpacity = active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100";
  const glowOpacity = active ? "opacity-60" : "opacity-0 group-hover:opacity-60 group-focus-within:opacity-60";
  const titleTone = active
    ? "text-on-gradient"
    : "text-text group-hover:text-on-gradient group-focus-within:text-on-gradient";
  const iconTone = active
    ? "text-on-gradient"
    : "text-text group-hover:text-on-gradient group-focus-within:text-on-gradient";
  const bodyTone = active
    ? "text-on-gradient-muted"
    : "text-meta group-hover:text-on-gradient-muted group-focus-within:text-on-gradient-muted";

  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-card border border-line bg-bg-elev p-4",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 scale-110 blur-xl",
          "transition-opacity duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          fill,
          glowOpacity,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "transition-opacity duration-[var(--dur-base)] ease-[var(--ease-standard)]",
          fill,
          fillOpacity,
        )}
      />

      <div className="relative flex h-full flex-col gap-2">
        {icon ? (
          <span className={cn("transition-colors duration-[var(--dur-hover)]", iconTone)}>
            {icon}
          </span>
        ) : null}
        <h3 className={cn("text-card-title transition-colors duration-[var(--dur-hover)]", titleTone)}>
          {title}
        </h3>
        {description ? (
          <p className={cn("transition-colors duration-[var(--dur-hover)]", bodyTone)}>
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}