import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface AiBadgeProps extends ComponentPropsWithoutRef<"span"> {
  /** Overridable so the label can be localised without a second component. */
  children?: ReactNode;
}

/**
 * The mono pill that marks machine-drafted content (brief F3). Used on every
 * intelligence-brief card and on the brief detail page, so "who wrote this" is
 * stated rather than implied.
 */
export function AiBadge({ className, children = "AI-generated", ...props }: AiBadgeProps) {
  return (
    <span
      className={cn("rounded-pill bg-bg-hover px-2 py-0.5 text-mono-label text-text-muted", className)}
      {...props}
    >
      {children}
    </span>
  );
}
