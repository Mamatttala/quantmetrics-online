/**
 * The page's hairline grid, declared once.
 *
 * The reference site (see docs/sample-screenshots-of-dune and the PDF pattern)
 * uses one shared scaffold for flush grid bands. Its vertical rules belong to
 * the actual card/cell matrices; open heading and control bands keep only their
 * horizontal separators. There is open space outside the scaffold, then a close
 * side-rail pair before the content columns - not a line at every page edge.
 *
 * Why one definition: the rules and the content have to agree to the pixel, or a
 * cell edge lands just beside its own hairline. `rulePositions()` and
 * `CONTENT_GRID` are both derived from the two fractions below, so the two
 * cannot drift apart.
 */

/**
 * The open outer space and the narrow side rail, each as a fraction of ONE
 * content column. Together they create the close-spaced rail pairs in the
 * reference pattern. The values are intentionally independent of the site's
 * content-column count: the PDF uses three content columns, while the footer
 * uses a different matrix.
 *
 * The PDF's sample has open space outside the first/last rule and a narrow rail
 * between each outer rule and the content matrix. A 0.35 / 0.16 ratio reproduces
 * that visual relationship at the wide home-page widths without hard-coded px.
 */
const OUTER_SPACE = 0.35;
const SIDE_RAIL = 0.16;

/**
 * The CSS `grid-template-columns` value for a content row on the scaffold.
 * This is the single source of truth: `SectionGrid` applies it through a custom
 * property, and `rulePositions()` derives the rule positions from these same
 * fractions. GridRail spans the outer-space + side-rail pair on each side.
 */
export function scaffoldTemplate(
  columns: number,
  outerSpace = OUTER_SPACE,
  sideRail = SIDE_RAIL,
): string {
  return [
    `${outerSpace}fr`,
    `${sideRail}fr`,
    ...Array.from({ length: columns }, () => "minmax(0,1fr)"),
    `${sideRail}fr`,
    `${outerSpace}fr`,
  ].join(" ");
}

export const CONTENT_GRID = scaffoldTemplate(3);

/** Horizontal positions of every vertical rule, as percentages of full width. */
export function rulePositions(
  columns = 3,
  outerSpace = OUTER_SPACE,
  sideRail = SIDE_RAIL,
): number[] {
  const total = outerSpace * 2 + sideRail * 2 + columns;
  const positions = [
    (outerSpace / total) * 100,
    ((outerSpace + sideRail) / total) * 100,
  ];

  for (let index = 1; index < columns; index += 1) {
    positions.push(((outerSpace + sideRail + index) / total) * 100);
  }

  positions.push(
    ((outerSpace + sideRail + columns) / total) * 100,
    ((outerSpace + sideRail * 2 + columns) / total) * 100,
  );
  return positions;
}
