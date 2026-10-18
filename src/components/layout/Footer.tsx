import Link from "next/link";
import type { CSSProperties } from "react";

import { Logo } from "@/components/brand/Logo";
import { GitHubIcon, XIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/layout/Container";
import {
  FOOTER_COPYRIGHT,
  FOOTER_GROUPS,
  FOOTER_SOCIALS,
} from "@/lib/navigation";
import { rulePositions, scaffoldTemplate } from "@/lib/layout";
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
 * The grid hairline. `--line-strong` is a solid, theme-aware 1px line: brighter
 * than the soft `--line-grid` used inside bands, because the footer has to read
 * as a crisp, table-like ruled frame. Nothing here is faded, masked or blurred -
 * every rule is solid and runs its full length.
 */
const GRID = "border-line-strong";
// The footer content is intentionally a little narrower than the home matrices,
// while the paired side rails sit closer together, matching the closing PDF
// pattern without changing the scaffold used by the rest of the home page.
const FOOTER_OUTER_SPACE = 0.6;
const FOOTER_SIDE_RAIL = 0.12;
const FOOTER_SCAFFOLD = scaffoldTemplate(FOOTER_GROUPS.length + 1, FOOTER_OUTER_SPACE, FOOTER_SIDE_RAIL);
const FOOTER_RULES = rulePositions(FOOTER_GROUPS.length + 1, FOOTER_OUTER_SPACE, FOOTER_SIDE_RAIL);

/**
 * Global footer.
 *
 * The ruled grid the reference draws, edge to edge:
 *   - the columns row has its own top, left, right and bottom rules; the legal
 *     row below is open at the sides, with only its closing horizontal rule;
 *   - inside, five equal parts - the logo cell plus the four labelled columns -
 *     align with the scaffold's vertical rule layer, which draws the paired
 *     side edges and the dividers between the columns;
 *   - every column draws a rule under its own heading, and because the parts
 *     sit side by side those four segments form one continuous line across the
 *     grid (the line that separates the headings from the links);
 *   - the links row closes with a rule, and the legal row sits below it.
 *
 * The scaffold verticals are drawn from `lg` up; below that the parts stack and
 * the horizontal boundaries remain. At `md` the grid is two columns of links
 * under a full-width logo cell, so the divider is drawn after the first and
 * third link columns.
 */
export function Footer() {
  return (
    <footer className="bg-bg">
      {/* Full-bleed matrix: open / paired side rail / five site columns /
          paired side rail / open. The horizontal boundaries intentionally reach
          the viewport edges, as in sample-banner-footer.pdf. */}
      <div
        className={cn("relative grid grid-cols-1 border-t border-b lg:[grid-template-columns:var(--footer-scaffold)]", GRID)}
        style={{ "--footer-scaffold": FOOTER_SCAFFOLD } as CSSProperties}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none lg:block">
          {FOOTER_RULES.map((left) => (
            <span
              key={left}
              className="absolute inset-y-0 w-px bg-line-strong"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>

        <div aria-hidden="true" className="hidden lg:col-span-2 lg:block" />

        <div className="col-span-1 lg:col-span-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-6 px-3 py-3 md:col-span-2 lg:col-span-1",
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
                    // At md the grid is two link columns wide, so the divider
                    // goes after the first and the third part only.
                    index % 2 === 0 && "md:border-r lg:border-r-0",
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
        </div>

        <div aria-hidden="true" className="hidden lg:col-span-2 lg:block" />
      </div>

      {/* Copyright row: full-bleed closing rule, but no vertical rails. */}
      <div className={cn("border-b px-gutter py-3 text-center", GRID)}>
        <Container>
          <p className="text-body text-text-muted">{FOOTER_COPYRIGHT}</p>
        </Container>
      </div>
    </footer>
  );
}
