import type { CSSProperties } from "react";

import { Container } from "@/components/layout/Container";
import { TRUST_MARKS } from "@/lib/navigation";

/**
 * The client-supplied marks are white-only PNGs, so they are painted through
 * `mask-image` in `currentColor` (see the `mark-mask` utility in
 * src/app/globals.css). That gives every mark one tonal treatment and lets the
 * whole strip follow the theme, instead of the artwork vanishing against the
 * light canvas. The strip fades them to 60% and lifts them to full strength on
 * hover.
 */
const CELL = "group flex h-12 items-center justify-center border-l border-line-strong px-3";

const MARK =
  "mark-mask h-5 w-full bg-current text-text opacity-60 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:opacity-100";

/**
 * The trust strip below the hero stats (brief F1.3, revised).
 *
 * A full-bleed band that sits flush under the stats strip, sharing one crisp
 * hairline with it: the top rule here and the stats band's own top rule are the
 * only horizontal lines, and both run past the container to the viewport edges.
 * Every cell carries a left rule and the list carries the right one, so the
 * verticals run the full band height and stay continuous as the grid goes 2 ->
 * 3 -> 6 columns. No horizontal rules are drawn inside the grid, so no
 * half-rules appear where the columns wrap.
 *
 * The 96px cell height is measured off the reference hero, which draws the same
 * band at roughly 94px.
 *
 * TODO(placeholder): the six marks are third-party trademarks and imply an
 * endorsement. See the note on `TRUST_MARKS` in src/lib/navigation.ts.
 */
export function TrustStrip() {
  return (
    <section aria-label="Organisations we work with" className="border-y border-line-strong bg-bg">
      <Container>
        <ul className="grid grid-cols-2 border-r border-line-strong sm:grid-cols-3 lg:grid-cols-6">
          {TRUST_MARKS.map((mark) => (
            <li key={mark.name} className={CELL}>
              <span
                role="img"
                aria-label={mark.name}
                className={MARK}
                style={{ "--mark-src": `url("${mark.logo}")` } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}