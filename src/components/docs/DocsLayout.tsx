import Link from "next/link";
import type { ReactNode } from "react";

import { ContentsBox } from "@/components/blog/ArticleRail";
import { DocsNav } from "@/components/docs/DocsNav";
import { OnThisPage } from "@/components/docs/OnThisPage";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import type { TocEntry } from "@/lib/content";
import type { DocGroup, DocNeighbours, DocSummary } from "@/lib/docs";
import { cn } from "@/lib/utils";

export interface DocsLayoutProps {
  title: string;
  /** Frontmatter section, printed in the eyebrow. */
  section: string;
  summary: string;
  activeSlug: string;
  groups: DocGroup[];
  contents: TocEntry[];
  neighbours: DocNeighbours;
  children: ReactNode;
}

function PagerLink({ doc, direction }: { doc: DocSummary; direction: "prev" | "next" }) {
  return (
    <Link
      href={doc.href}
      className={cn(
        "flex flex-col gap-1 rounded-input border border-line bg-bg-elev p-3",
        "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:border-text/40 hover:bg-bg-hover",
        direction === "next" && "sm:items-end sm:text-right",
      )}
    >
      <span className="text-mono-label text-text-dim">
        {direction === "prev" ? "\u2039 Previous" : "Next \u203a"}
      </span>
      <span className="text-body">{doc.title}</span>
    </Link>
  );
}

/**
 * The documentation shell (brief F7): three columns on a wide viewport - grouped
 * sidebar, MDX content, "On this page" - collapsing to one column on small
 * screens.
 *
 * The sidebar becomes a disclosure below `lg` (see DocsNav), and the on-page
 * contents move above the article below `xl`, where a third column would leave
 * the reading measure too narrow. The top padding clears the fixed 76px header
 * with room to spare, the same offset the article shell uses, and both sticky
 * columns hang from the same 112px line so they stay level with the copy.
 */
export function DocsLayout({
  title,
  section,
  summary,
  activeSlug,
  groups,
  contents,
  neighbours,
  children,
}: DocsLayoutProps) {
  const { prev, next } = neighbours;
  const hasContents = contents.length > 0;

  return (
    <main className="pb-12">
      <div className="container-page pt-14">
        <header className="max-w-[720px]">
          <EyebrowChip>{section}</EyebrowChip>
          <h1 className="text-article-title mt-3">{title}</h1>
          <p className="text-body-lg mt-3 text-text-muted">{summary}</p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[210px_minmax(0,1fr)_180px]">
          <div className="lg:sticky lg:top-14 lg:self-start">
            <DocsNav groups={groups} activeSlug={activeSlug} />
          </div>

          <article className="min-w-0">
            {hasContents ? (
              <div className="mb-6 xl:hidden">
                <ContentsBox contents={contents} />
              </div>
            ) : null}

            <div className="max-w-[720px] [&>*:first-child]:mt-0">{children}</div>

            {prev || next ? (
              <nav
                aria-label="Documentation"
                className="mt-10 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2"
              >
                {prev ? <PagerLink doc={prev} direction="prev" /> : <span aria-hidden="true" />}
                {next ? <PagerLink doc={next} direction="next" /> : null}
              </nav>
            ) : null}
          </article>

          {hasContents ? (
            <div className="hidden xl:block">
              <div className="sticky top-14">
                <OnThisPage entries={contents} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
