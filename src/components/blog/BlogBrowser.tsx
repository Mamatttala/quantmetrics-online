"use client";

import { useMemo, useRef, useState } from "react";
import type { SVGProps } from "react";

import { BlogCard } from "@/components/ui/BlogCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { FilterToolbar } from "@/components/ui/FilterToolbar";
import type { BlogSeriesLink, PostSummary } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogBrowserProps {
  posts: PostSummary[];
  series: BlogSeriesLink[];
  categories: readonly string[];
}

/** Thin-line marks for the series rail. 1.5px strokes, currentColor. */
function SeriesIcon({ name }: { name: BlogSeriesLink["icon"] }) {
  const common: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    width: 24,
    height: 24,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
  };

  if (name === "volatility") {
    return (
      <svg {...common}>
        <path d="M3 14.5 7 8l3.5 5L14 6l3 9 4-6.5" />
      </svg>
    );
  }
  if (name === "time") {
    return (
      <svg {...common}>
        <path d="M4 20V4M4 20h16" />
        <path d="M7 16l3.5-4 3 2.5L18 8" />
      </svg>
    );
  }
  if (name === "backtest") {
    return (
      <svg {...common}>
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h16M10 10v10" />
      </svg>
    );
  }
  if (name === "learn") {
    return (
      <svg {...common}>
        <path d="M12 6.6C10.2 5.4 7 5.1 4 5.4V19c3-.3 6.2 0 8 1.2" />
        <path d="M12 6.6C13.8 5.4 17 5.1 20 5.4V19c-3-.3-6.2 0-8 1.2" />
        <path d="M12 6.6v13.6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M12 16l4-5" />
    </svg>
  );
}

/**
 * The blog index's interactive half: the Explore-series rail, the filter chips,
 * the search field and the card grid. It is one client component because the
 * three of them share a single filter state - picking a series narrows the same
 * list the chips and the search box narrow.
 *
 * Everything it renders comes from props, so the server does the file reading
 * and the client only filters an array it already has.
 */
export function BlogBrowser({ posts, series, categories }: BlogBrowserProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeSeries, setActiveSeries] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("ALL");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (activeSeries && !post.seriesSlugs.includes(activeSeries)) return false;
      if (category !== "ALL" && post.category !== category) return false;
      if (needle === "") return true;

      return [post.title, post.excerpt, post.series, post.category, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [posts, activeSeries, category, query]);

  const hasFilters = activeSeries !== null || category !== "ALL" || query.trim() !== "";

  const clear = () => {
    setActiveSeries(null);
    setCategory("ALL");
    setQuery("");
  };

  const nudge = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * 260, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-mono-label text-text-muted">Explore series</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous series"
              className="inline-flex size-4 items-center justify-center rounded-pill border border-line text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft"
            >
              <span aria-hidden="true">{"\u2039"}</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next series"
              className="inline-flex size-4 items-center justify-center rounded-pill border border-line text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft"
            >
              <span aria-hidden="true">{"\u203a"}</span>
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="mt-2 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2"
        >
          {series.map((item) => {
            const active = activeSeries === item.slug;

            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSeries(active ? null : item.slug)}
                className={cn(
                  "flex w-[260px] shrink-0 snap-start items-start gap-2 rounded-card border p-3 text-left",
                  "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
                  active ? "border-text bg-bg-hover" : "border-line bg-bg-elev hover:border-text/40",
                )}
              >
                <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-line text-text-muted">
                  <SeriesIcon name={item.icon} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[0.9375rem] leading-tight font-medium tracking-[-0.01em] text-text">
                    {item.name}
                  </span>
                  <span className="text-meta line-clamp-2">{item.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <FilterToolbar
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        query={query}
        onQueryChange={setQuery}
        searchLabel="Search articles"
      />

      <p className="text-mono-label text-text-dim" role="status">
        {visible.length} {visible.length === 1 ? "post" : "posts"}
      </p>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                category={post.category}
                date={post.dateLabel}
                readTime={post.readTime}
                href={"/blog/" + post.slug}
                cover={post.cover}
                coverTitle={post.series}
                className="h-full w-full"
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No posts match those filters yet."
          body="The archive is still growing. Try another series or clear the search."
          onClear={hasFilters ? clear : undefined}
        />
      )}
    </div>
  );
}
