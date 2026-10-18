import Link from "next/link";
import type { ReactNode } from "react";

import { Chip } from "@/components/ui/Chip";
import type { CoverVariant } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface ArticleLayoutAuthor {
  name: string;
  role: string;
}

export interface ArticleLayoutProps {
  title: string;
  /** 24px standfirst under the title. */
  standfirst?: string;
  category?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  author?: ArticleLayoutAuthor;
  cover?: CoverVariant;
  /** Serif line printed on the cover; defaults to the category. */
  coverTitle?: string;
  /** Optional pill above the title, e.g. the AI-generated badge. */
  badge?: ReactNode;
  /** Back link above the title, e.g. "All posts". */
  backHref?: string;
  backLabel?: string;
  /** Sticky right-hand rail. Blog passes ArticleRail; Insights will pass its own. */
  sidebar?: ReactNode;
  /** Anything below the body but inside the main column (disclaimer, pagination). */
  footer?: ReactNode;
  children: ReactNode;
}

const COVER_FILL: Record<CoverVariant, string> = {
  "teal-blue": "gradient-teal-blue",
  "pink-coral": "gradient-pink-coral",
  sunset: "gradient-sunset",
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * The shared article shell (brief F4), reused by Insights.
 *
 * Two columns: a ~600px reading column and a ~220px sticky rail, centred as a
 * group so the measure stays inside comfortable reading range on a wide
 * viewport. The rail is a slot rather than a fixed composition, because the
 * Insights detail page needs the same shell with different boxes in it.
 *
 * The wrapper clears the fixed header (76px: 24px of top offset plus the 52px
 * bar) with room to spare, so the back link - the first thing in the column -
 * is never tucked under the bar. The sticky rail uses the same offset, so its
 * first box clears the bar too.
 */
export function ArticleLayout({
  title,
  standfirst,
  category,
  date,
  readTime,
  tags = [],
  author,
  cover = "teal-blue",
  coverTitle,
  backHref,
  backLabel = "All posts",
  badge,
  sidebar,
  footer,
  children,
}: ArticleLayoutProps) {
  const meta = [category, date, readTime].filter(Boolean) as string[];

  return (
    <main className="pb-12">
      <div className="container-page pt-14">
        <div className="mx-auto flex max-w-[900px] flex-col gap-8 lg:flex-row lg:gap-12">
          <article className="min-w-0 flex-1 lg:max-w-[600px]">
            {backHref ? (
              <Link
                href={backHref}
                className="text-mono-label inline-flex items-center gap-1 text-text-muted transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:text-text"
              >
                <span aria-hidden="true">{"\u2039"}</span>
                {backLabel}
              </Link>
            ) : null}

            {badge ? <div className="mt-4">{badge}</div> : null}

            <h1 className="text-article-title mt-4">{title}</h1>

            {standfirst ? (
              <p className="mt-3 text-[1.5rem] leading-[1.35] tracking-[-0.02em] text-text-muted">
                {standfirst}
              </p>
            ) : null}

            {meta.length > 0 ? (
              <p className="text-mono-label mt-4 flex flex-wrap items-center gap-2 text-text-dim">
                {meta.map((item, index) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    {index > 0 ? <span aria-hidden="true">{"\u00b7"}</span> : null}
                    {item}
                  </span>
                ))}
              </p>
            ) : null}

            {author ? (
              <div className="mt-4 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-mono-label inline-flex size-5 shrink-0 items-center justify-center rounded-pill border border-line bg-bg-hover text-text-muted"
                >
                  {initials(author.name)}
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.875rem] leading-[1.4] text-text">{author.name}</span>
                  <span className="text-[0.875rem] leading-[1.4] text-text-muted">{author.role}</span>
                </span>
              </div>
            ) : null}

            {tags.length > 0 ? (
              <ul className="mt-4 flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Chip variant="tag">{tag}</Chip>
                  </li>
                ))}
              </ul>
            ) : null}

            <div
              className={cn(
                "relative mt-6 aspect-video overflow-hidden rounded-card border border-line",
                COVER_FILL[cover],
              )}
            >
              <span className="text-section-heading absolute inset-0 flex items-center justify-center p-6 text-center text-on-gradient">
                {coverTitle ?? category ?? title}
              </span>
            </div>

            <div className="mt-8 [&>*:first-child]:mt-0">{children}</div>

            {footer ? <div className="mt-10">{footer}</div> : null}
          </article>

          {sidebar ? (
            <aside className="lg:w-[220px] lg:shrink-0">
              <div className="flex flex-col gap-3 lg:sticky lg:top-14">{sidebar}</div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
