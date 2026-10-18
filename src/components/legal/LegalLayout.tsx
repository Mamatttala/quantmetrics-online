import type { ReactNode } from "react";

import { ContentsBox } from "@/components/blog/ArticleRail";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import type { TocEntry } from "@/lib/content";
import { LEGAL_DRAFT_NOTICE } from "@/lib/legal";

export interface LegalLayoutProps {
  title: string;
  /** ISO yyyy-mm-dd, for the machine-readable `time` value. */
  updated: string;
  /** Pre-formatted date, so the layout does no date maths. */
  updatedLabel: string;
  contents: TocEntry[];
  children: ReactNode;
}

/**
 * The legal page shell (brief F7): a single readable 720px column, the
 * "Last updated" line, the draft banner, and a table of contents for the longer
 * pages.
 *
 * The banner is rendered here rather than written into each MDX file, so it
 * cannot be forgotten on one page and cannot drift in wording - and it is
 * removed from one place once the copy has been reviewed.
 */
export function LegalLayout({ title, updated, updatedLabel, contents, children }: LegalLayoutProps) {
  return (
    <main className="pb-12">
      <div className="container-page pt-14">
        <div className="mx-auto max-w-[720px]">
          <EyebrowChip>Legal</EyebrowChip>
          <h1 className="text-article-title mt-3">{title}</h1>
          <p className="text-mono-label mt-3 text-text-dim">
            Last updated <time dateTime={updated}>{updatedLabel}</time>
          </p>

          <div className="mt-6 rounded-input border border-amber bg-bg-elev p-4">
            <p className="text-mono-label text-amber">Draft</p>
            <p className="text-body mt-2">{LEGAL_DRAFT_NOTICE}</p>
          </div>

          {contents.length >= 3 ? (
            <div className="mt-6">
              <ContentsBox contents={contents} />
            </div>
          ) : null}

          <div className="mt-8 [&>*:first-child]:mt-0">{children}</div>
        </div>
      </div>
    </main>
  );
}
