"use client";

import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface OnThisPageProps {
  entries: TocEntry[];
}

/**
 * The right-hand "On this page" list (brief F7), with scroll-spy.
 *
 * The hrefs point at the ids written by the remark plugin
 * (src/lib/mdx/remark-heading-ids.mjs), and html carries a scroll-padding-top, so
 * a jump never lands under the fixed bar. Highlighting is driven by an
 * IntersectionObserver rather than a scroll handler, so nothing runs on the main
 * thread while the reader scrolls. The observer's band starts just below the
 * 76px bar and ends well above the foot of the viewport, which means the entry
 * that is "current" is the last heading to have crossed the top of the reading
 * area - the behaviour a table of contents is expected to have.
 */
export function OnThisPage({ entries }: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>(entries[0]?.id ?? "");

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="On this page" className="overflow-hidden rounded-input border border-line bg-bg-elev">
      <p className="text-mono-label border-b border-line px-3 py-2 text-text-muted">On this page</p>
      <ul className="max-h-[420px] overflow-y-auto">
        {entries.map((entry) => {
          const active = entry.id === activeId;

          return (
            <li key={entry.id} className="border-b border-line last:border-b-0">
              <a
                href={"#" + entry.id}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "text-meta block px-3 py-1.5 transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
                  entry.depth === 3 && "pl-5",
                  active ? "text-text" : "text-text-muted hover:text-text",
                )}
              >
                {entry.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
