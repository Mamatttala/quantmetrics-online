"use client";

import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

export interface FilterToolbarProps {
  categories: readonly string[];
  category: string;
  onCategoryChange: (next: string) => void;
  query: string;
  onQueryChange: (next: string) => void;
  /** Accessible name for the search field, e.g. "Search articles". */
  searchLabel: string;
  className?: string;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5 14 14" />
    </svg>
  );
}

/**
 * The filter chips and the search field, shared by the blog index and the
 * insights index (brief F3/F4 both specify the same toolbar).
 *
 * It is presentational and fully controlled: the owning browser holds the
 * filter state, because it is the same state that decides which cards are
 * rendered. Keeping it here means the two indexes cannot drift into two
 * slightly different toolbars.
 */
export function FilterToolbar({
  categories,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  searchLabel,
  className,
}: FilterToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-line pt-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((item) => (
          <Chip
            key={item}
            variant="filter"
            active={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </Chip>
        ))}
      </div>

      <div className="relative w-full lg:w-[240px]">
        <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-text-dim">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          aria-label={searchLabel}
          placeholder="Search"
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-4.5 w-full rounded-sm border border-line bg-bg-hover pr-2 pl-6 text-meta text-text placeholder:text-text-dim"
        />
      </div>
    </div>
  );
}
