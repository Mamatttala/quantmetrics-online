import type { CSSProperties, ReactNode } from "react";

import { rulePositions, scaffoldTemplate } from "@/lib/layout";
import { cn } from "@/lib/utils";

export interface SectionGridProps {
  /**
   * Draw the vertical rules. Pass `false` to lay content out on the exact same
   * template WITHOUT drawing lines - used by open heading/control bands and by
   * card rows that sit inside rounded, guttered cards. Keeping the template is
   * what makes their outer edges line up with the ruled sections above.
   */
  rules?: boolean;
  /** Draw a hairline across the top edge, full bleed. */
  topRule?: boolean;
  /** Draw a hairline across the bottom edge, full bleed. */
  bottomRule?: boolean;
  /** Extra classes for the outer (full-bleed) wrapper. */
  className?: string;
  /** Number of content columns inside the shared side-rail scaffold. */
  columns?: number;
  children: ReactNode;
}

/**
 * The site-wide hairline scaffold.
 *
 * Lays children on a seven-cell template for the default three-column case -
 * open space, a narrow rail, content columns, a narrow rail, open space - so a
 * content edge always lands exactly on a rule. `columns` expands the same
 * scaffold for bands such as the six-logo trust strip. Vertical rules are
 * opt-in: the reference uses them for flush card/cell matrices, not behind every
 * heading or control band.
 * Horizontal rules remain independent so a section can be closed without
 * turning its background into a lattice.
 *
 * Below `lg` the rules are hidden and the row collapses to a single column: at
 * that width the rail would eat most of the viewport and the rules would crowd
 * the text instead of framing it.
 *
 * Callers place children as: `<GridRail />`, then content, then `<GridRail />`.
 * Each GridRail spans the open space + narrow side-rail pair; content children
 * should be one cell each (or a span matching `columns`). `GridRule` can be
 * inserted between matrix rows when the separator must run full bleed beyond the
 * content.
 *
 * Decorative rules only - `aria-hidden` on the rules, never on the content.
 */
export function SectionGrid({
  rules = true,
  topRule = false,
  bottomRule = false,
  className,
  columns = 3,
  children,
}: SectionGridProps) {
  const positions = rulePositions(columns);
  const scaffold = scaffoldTemplate(columns);

  return (
    <div className={cn("relative", className)}>
      {/*
        Horizontal rules are independent of the vertical ones, so they are drawn
        in their own layer: a card row can suppress the verticals (a rule between
        two rounded cards would read as a seam) and still close its band.
      */}
      {topRule || bottomRule ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          {topRule ? <span className="absolute inset-x-0 top-0 h-px bg-line-grid" /> : null}
          {bottomRule ? <span className="absolute inset-x-0 bottom-0 h-px bg-line-grid" /> : null}
        </div>
      ) : null}

      {rules ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none lg:block">
          {positions.map((left) =>
            // The matrix rules stop inside the open outer space; none is anchored
            // to the viewport edge, which keeps the surrounding canvas open.
            left >= 100 ? (
              <span key="edge-right" className="absolute inset-y-0 right-0 w-px bg-line-grid" />
            ) : (
              <span
                key={left}
                className="absolute inset-y-0 w-px bg-line-grid"
                style={{ left: `${left}%` }}
              />
            ),
          )}
        </div>
      ) : null}

      {/*
        One column below `lg`; the ruled template from `lg` up. The template is
        handed over as a custom property so the collapse needs no second value,
        and it comes from src/lib/layout.ts - the same module the rule positions
        are derived from, so content and rules cannot drift apart.
      */}
      <div
        className={cn(
          "relative z-10 grid grid-cols-1",
          "lg:[grid-template-columns:var(--scaffold)]",
        )}
        style={{ "--scaffold": scaffold } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * An empty side pair. Bracket content with two of these to sit it on the middle
 * content columns of the scaffold; each pair contains open space plus a narrow
 * ruled rail.
 */
export function GridRail() {
  return <div aria-hidden="true" className="hidden lg:col-span-2 lg:block" />;
}

/** A full-width horizontal rule inserted between rows of a ruled matrix. */
export function GridRule() {
  return <div aria-hidden="true" className="col-span-1 h-px bg-line-grid lg:col-span-7" />;
}
