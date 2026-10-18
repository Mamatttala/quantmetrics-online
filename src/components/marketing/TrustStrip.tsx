import type { CSSProperties } from "react";

import { GridRail, SectionGrid } from "@/components/layout/SectionGrid";
import { TRUST_MARKS } from "@/lib/navigation";

/**
 * The marks are client-supplied, single-tone PNGs exported on one shared
 * 500x418 canvas. They are painted through `mask-image` in `currentColor` (see
 * the `mark-mask` utility in src/app/globals.css), so no component hard-codes a
 * colour and the whole strip follows the active theme.
 *
 * Two CSS-only corrections keep the row even, because the artwork itself is
 * fixed:
 *   - `mark-scale` applies the per-mark factor stored on each TRUST_MARKS entry,
 *     which normalises the optical size (each PNG fills a different share of its
 *     canvas, so a plain `contain` renders them at visibly different heights).
 *   - `mark-solid` dilates the thin line art by about half a pixel, so the
 *     hollow marks (Trust Wallet, MetaMask) read as solid instead of as
 *     wireframes.
 *
 * The strip holds them at 80% and lifts them to full strength on hover.
 */
const CELL = "group flex h-12 items-center justify-center border-l border-line-grid px-3";

const MARK =
  "mark-mask mark-scale mark-solid h-8 w-full bg-current text-text opacity-80 " +
  "transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:opacity-100";

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
    <section aria-label="Organisations we work with" className="border-y border-line-grid bg-bg">
      <SectionGrid>
        <GridRail />
        <ul className="col-span-1 grid grid-cols-2 border-r border-line-grid sm:grid-cols-3 lg:col-span-3 lg:grid-cols-6 lg:border-r-0">
          {TRUST_MARKS.map((mark) => (
            <li key={mark.name} className={CELL}>
              <span
                role="img"
                aria-label={mark.name}
                className={MARK}
                style={
                  {
                    "--mark-src": `url("${mark.logo}")`,
                    "--mark-scale": mark.scale,
                  } as CSSProperties
                }
              />
            </li>
          ))}
        </ul>
        <GridRail />
      </SectionGrid>
    </section>
  );
}
