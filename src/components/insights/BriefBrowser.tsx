"use client";

import { useMemo, useState } from "react";

import { BriefCard } from "@/components/ui/BriefCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterToolbar } from "@/components/ui/FilterToolbar";
import type { BriefSummary } from "@/lib/briefs";

export interface BriefBrowserProps {
  briefs: BriefSummary[];
  categories: readonly string[];
}

/**
 * The insights index is the blog index minus the Explore-series rail: the same
 * filter chips, the same search field, the same three-column grid and the same
 * empty state, because the two archives differ in content rather than in how
 * they are browsed.
 *
 * The server reads the MDX files once at build time and hands this component a
 * plain array of summaries, so filtering happens locally and the page needs no
 * network round trip when a chip is clicked.
 */
export function BriefBrowser({ briefs, categories }: BriefBrowserProps) {
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return briefs.filter((brief) => {
      if (category !== "ALL" && brief.category !== category) return false;
      if (needle === "") return true;

      return [brief.title, brief.summary, brief.category, ...brief.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [briefs, category, query]);

  const hasFilters = category !== "ALL" || query.trim() !== "";

  const clear = () => {
    setCategory("ALL");
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-6">
      <FilterToolbar
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search briefs"
      />

      <p className="text-mono-label text-text-dim" role="status">
        {visible.length} {visible.length === 1 ? "brief" : "briefs"}
      </p>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((brief) => (
            <li key={brief.slug} className="flex">
              <BriefCard
                title={brief.title}
                excerpt={brief.summary}
                category={brief.category}
                date={brief.dateLabel}
                href={"/insights/" + brief.slug}
                coverTitle={brief.category}
                variant={brief.cover}
                className="h-full w-full"
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No briefs match those filters yet."
          body="The archive is still growing. Try another category or clear the search."
          onClear={hasFilters ? clear : undefined}
        />
      )}
    </div>
  );
}
