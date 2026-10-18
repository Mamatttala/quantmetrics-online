import type { ReactNode } from "react";

import { GridRail, SectionGrid } from "@/components/layout/SectionGrid";
import { Reveal } from "@/components/layout/Reveal";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow: ReactNode;
  title: string;
  description?: ReactNode;
  /** Width of the headline measure, as a `ch` count. */
  titleWidth?: number;
  /** Draw the band's top rule. */
  topRule?: boolean;
  /** Draw the band's bottom rule. */
  bottomRule?: boolean;
  /** Padding classes for the band; defaults to the home rhythm. */
  className?: string;
}

/**
 * A centred heading band on the page scaffold.
 *
 * The reference keeps heading bands open: they use a horizontal separator but do
 * not repeat the card grid's vertical rules behind the copy. The following cell
 * band can opt into the same scaffold when it actually contains a ruled matrix.
 *
 * The copy stays centred on the three content columns, not on the viewport, so it
 * reads centred against the grid rather than against the window.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  titleWidth = 24,
  topRule = true,
  bottomRule = true,
  className,
}: SectionHeadingProps) {
  return (
    <SectionGrid rules={false} topRule={topRule} bottomRule={bottomRule}>
      <GridRail />

      <div
        className={cn(
          "col-span-1 flex flex-col items-center px-3 pt-10 pb-6 text-center lg:col-span-3",
          className,
        )}
      >
        <Reveal className="flex flex-col items-center text-center">
          {eyebrow}
          <h2 className="text-h2 mt-3" style={{ maxWidth: `${titleWidth}ch` }}>
            {title}
          </h2>
          {description ? (
            <p className="text-meta mt-3 max-w-[56ch]">{description}</p>
          ) : null}
        </Reveal>
      </div>

      <GridRail />
    </SectionGrid>
  );
}
