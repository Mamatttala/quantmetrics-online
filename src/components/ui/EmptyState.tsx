"use client";

import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  body: string;
  /** Rendered only when filters are actually active. */
  onClear?: () => void;
  clearLabel?: string;
  className?: string;
}

/**
 * The shared "nothing matches" panel, used by both the blog index and the
 * insights index. It is the same box in both places on purpose: an empty result
 * is a state of the page, not a difference between the two archives.
 */
export function EmptyState({
  title,
  body,
  onClear,
  clearLabel = "Clear filters",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 rounded-card border border-line bg-bg-elev px-4 py-10 text-center",
        className,
      )}
    >
      <p className="text-body">{title}</p>
      <p className="text-meta">{body}</p>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="text-mono-label mt-2 rounded-pill border border-line px-3 py-1 text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft"
        >
          {clearLabel}
        </button>
      ) : null}
    </div>
  );
}
