import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { GitHubIcon, XIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import {
  FOOTER_COPYRIGHT,
  FOOTER_DISCLAIMER,
  FOOTER_GROUPS,
  FOOTER_SOCIALS,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = { github: GitHubIcon, x: XIcon };

/**
 * Footer link row: full width of its grid part (`w-full`), 44px tall (`h-5.5`),
 * 1px hairline, 14px text. The 20px radius comes from the `--r-row` token.
 *
 * The row carries no outer margin, so it sits flush against the part's vertical
 * hairlines and against the rows above and below it - the stack reads as one
 * ruled column, exactly like the reference.
 */
const ROW =
  "flex h-5.5 w-full items-center gap-1 rounded-row border border-line px-3 text-sm tracking-[-0.01em] " +
  "text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] " +
  "hover:bg-fill-faint";

/**
 * The grid hairline. One token, `--line-grid`, is a solid 1px line at 30% alpha
 * (theme-aware, so it stays visible on the light canvas). Nothing here is faded,
 * masked or blurred: every rule is crisp from end to end, which is what makes
 * the footer read as a ruled grid rather than as a stack of floating cards.
 */
const GRID = "border-line-grid";

/**
 * Global footer.
 *
 * The ruled grid the reference draws, edge to edge:
 *   - the wrapper is closed on all four sides, so the grid has an outer frame
 *     on its left, right, top and bottom edges;
 *   - inside, five equal parts - the logo cell plus the four labelled columns -
 *     each carry a right-hand rule, which is what draws the vertical dividers
 *     between the columns;
 *   - every column draws a rule under its own heading, and because the parts
 *     sit side by side those four segments form one continuous line across the
 *     grid (the line that separates the headings from the links);
 *   - the links row closes with a rule, and the legal row sits below it.
 *
 * The interior verticals are drawn from `lg` up; below that the parts stack and
 * only the outer frame is kept (brief section I). At `md` the grid is two
 * columns of links under a full-width logo cell, so the divider is drawn after
 * the first and third link columns.
 */
export function Footer() {
  const lastGroup = FOOTER_GROUPS.length - 1;

  return (
    <footer className="bg-bg">
      <Container>
        <div className={cn("border", GRID)}>
          {/* Links row: logo cell + the four labelled columns. */}
          <div className={cn("grid grid-cols-1 border-b md:grid-cols-2 lg:grid-cols-5", GRID)}>
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-6 px-3 py-3 md:col-span-2 lg:col-span-1 lg:border-r",
                GRID,
              )}
            >
              <Logo />
              <ul className="flex items-center gap-1">
                {FOOTER_SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.id];

                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-pill border border-line text-text",
                          "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
                          "hover:bg-bg-hover",
                        )}
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {FOOTER_GROUPS.map((group, index) => {
              const headingId = `footer-${group.id}`;

              return (
                <nav
                  key={group.id}
                  aria-labelledby={headingId}
                  className={cn(
                    "flex flex-col",
                    GRID,
                    // Every part but the last draws the divider to its right.
                    index < lastGroup && "lg:border-r",
                    // At md the grid is two link columns wide, so the divider
                    // goes after the first and the third part only.
                    index % 2 === 0 && "md:border-r",
                  )}
                >
                  <h2 id={headingId} className="px-3 pt-3 pb-2 text-mono-label text-text-muted">
                    {group.heading}
                  </h2>

                  {/* The heading rule. Every part draws its own, so the four
                      segments form one continuous line across the grid without
                      crossing the logo cell. */}
                  <div className={cn("border-t", GRID)}>
                    <ul className="flex flex-col gap-px">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className={ROW}
                            target={link.external ? "_blank" : undefined}
                            rel={link.external ? "noopener noreferrer" : undefined}
                          >
                            <span className="truncate">{link.label}</span>
                            {link.badge ? (
                              <span className="rounded-pill bg-positive px-1 text-mono-label text-bg">
                                {link.badge}
                              </span>
                            ) : null}
                            {link.external ? (
                              <span aria-hidden="true" className="ml-auto text-text-dim">
                                {"\u2197"}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              );
            })}
          </div>

          {/* Legal bar. The rule above it is the links row's own border-bottom. */}
          <div className="px-3 py-3 text-center">
            <p className="text-meta">{FOOTER_DISCLAIMER}</p>
            <p className="mt-1 text-body text-text-muted">{FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}