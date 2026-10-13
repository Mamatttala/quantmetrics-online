import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export interface HairlineGridProps {
  /** Content columns the vertical hairlines divide the container into. */
  columns?: number;
  /** Draw 1px hairlines on the container's left and right edges. */
  edges?: boolean;
  /** Draw a 1px hairline across the top of the area. */
  divider?: boolean;
  className?: string;
}

/**
 * The blueprint grid: vertical edge + column hairlines and the horizontal
 * section rule. Decorative only - it is absolutely positioned, hidden from
 * assistive tech and never intercepts pointer events.
 */
export function HairlineGrid({ columns = 4, edges = true, divider = false, className }: HairlineGridProps) {
  const internalLines = Array.from(
    { length: Math.max(columns - 1, 0) },
    (_, index) => ((index + 1) / columns) * 100,
  );

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 select-none", className)}>
      {divider ? <span className="absolute inset-x-0 top-0 h-px bg-line" /> : null}

      {edges ? (
        <>
          <span className="absolute inset-y-0 left-0 w-px bg-line" />
          <span className="absolute inset-y-0 right-0 w-px bg-line" />
        </>
      ) : null}

      {internalLines.map((left) => (
        <span
          key={left}
          className="absolute inset-y-0 w-px bg-line"
          style={{ left: `${left}%` } as CSSProperties}
        />
      ))}
    </div>
  );
}