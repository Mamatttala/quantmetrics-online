import type { ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/layout/Container";
import { HairlineGrid } from "@/components/layout/HairlineGrid";
import { cn } from "@/lib/utils";

export interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  /** Column count for the blueprint hairlines; false disables the grid. */
  grid?: number | false;
  /** Horizontal hairline across the top of the section. */
  divider?: boolean;
  /** `default` applies the `--section-y` rhythm (96 -> 128 -> 160px). */
  spacing?: "default" | "none";
  /** Extra classes for the inner container. */
  innerClassName?: string;
}

/**
 * A full-width page band: container + blueprint hairlines + section rhythm.
 * Content is lifted above the hairlines so rules never cross the text.
 */
export function Section({
  grid = 4,
  divider = true,
  spacing = "default",
  innerClassName,
  className,
  children,
  ...props
}: SectionProps) {
  const showGrid = grid !== false;

  return (
    <section className={cn("relative", className)} {...props}>
      <Container className={cn("relative", spacing === "default" && "section-y", innerClassName)}>
        {showGrid || divider ? (
          <HairlineGrid columns={showGrid ? grid : 1} edges={showGrid} divider={divider} />
        ) : null}
        <div className="relative z-10">{children}</div>
      </Container>
    </section>
  );
}