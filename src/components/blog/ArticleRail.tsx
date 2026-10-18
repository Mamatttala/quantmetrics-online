import type { ReactNode } from "react";

import { NewsletterForm } from "@/components/blog/NewsletterForm";
import { RailShare } from "@/components/blog/RailShare";
import type { TocEntry } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface RailCta {
  title: string;
  body?: string;
  action: string;
  actionHref: string;
  secondary?: string;
  secondaryHref?: string;
}

export interface ContentsBoxProps {
  contents: TocEntry[];
}

/**
 * The bordered "Contents" box: a heading row, then one anchor per h2/h3. The
 * hrefs point at the ids the remark plugin writes into the compiled article
 * (src/lib/mdx/remark-heading-ids.mjs), and html carries a scroll-padding-top,
 * so the sticky header never covers the heading it just jumped to.
 */
export function ContentsBox({ contents }: ContentsBoxProps) {
  if (contents.length === 0) return null;

  return (
    <nav aria-label="On this page" className="overflow-hidden rounded-input border border-line bg-bg-elev">
      <p className="text-mono-label border-b border-line px-3 py-2 text-text-muted">Contents</p>
      <ul className="max-h-[340px] overflow-y-auto">
        {contents.map((entry) => (
          <li key={entry.id} className="border-b border-line last:border-b-0">
            <a
              href={"#" + entry.id}
              className={cn(
                "text-meta block px-3 py-1.5 text-text-muted transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:text-text",
                entry.depth === 3 && "pl-5",
              )}
            >
              {entry.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export interface RailCtaBoxProps {
  cta: RailCta;
}

/** The bordered call-to-action box: a short pitch, a pill and a text link. */
export function RailCtaBox({ cta }: RailCtaBoxProps) {
  return (
    <section className="rounded-input border border-line bg-bg-elev p-3 text-center">
      <p className="text-body">{cta.title}</p>
      {cta.body ? <p className="text-meta mt-2">{cta.body}</p> : null}

      <a
        href={cta.actionHref}
        className="mt-3 inline-flex h-4 items-center justify-center rounded-pill border border-line px-3 text-mono-label text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:border-text hover:bg-fill-soft"
      >
        {cta.action}
      </a>

      {cta.secondary && cta.secondaryHref ? (
        <p className="mt-2">
          <a
            href={cta.secondaryHref}
            className="text-meta underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text"
          >
            {cta.secondary}
          </a>
        </p>
      ) : null}
    </section>
  );
}

export interface ArticleRailProps {
  /** Absolute URL, resolved on the server so the share links stay static. */
  shareUrl: string;
  shareTitle: string;
  contents?: TocEntry[];
  /** Extra boxes between Contents and the CTA box (Insights adds its own). */
  extra?: ReactNode;
  cta?: RailCta | false;
  /** Pass false for an article that should not ask for a subscription. */
  newsletter?: { title?: string } | false;
}

const DEFAULT_CTA: RailCta = {
  title: "Explore the lab",
  body: "Backtesting, econometrics and risk analytics, with sample dashboards.",
  action: "Explore the lab",
  actionHref: "/services",
  secondary: "Read the docs",
  secondaryHref: "/docs",
};

/**
 * The sticky article sidebar (brief F4): Share, Contents, an optional slot, the
 * CTA box and the newsletter field. It is composed from the exported pieces
 * above, so a page can drop any of them into its own rail - which is exactly
 * what the Insights detail page will do when it reuses ArticleLayout.
 */
export function ArticleRail({
  shareUrl,
  shareTitle,
  contents = [],
  extra,
  cta = DEFAULT_CTA,
  newsletter = {},
}: ArticleRailProps) {
  return (
    <div className="flex flex-col gap-3">
      <RailShare url={shareUrl} title={shareTitle} />
      <ContentsBox contents={contents} />
      {extra}
      {cta ? <RailCtaBox cta={cta} /> : null}
      {newsletter ? <NewsletterForm title={newsletter.title} /> : null}
    </div>
  );
}
