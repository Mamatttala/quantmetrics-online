import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface StatCellProps {
  /** 40px stat number. Use marked placeholders until real figures exist. */
  value: ReactNode;
  caption: string;
  variant?: "plain" | "lavender";
  /**
   * `rounded` (default) is the standalone cell with the 8px input radius.
   * `square` drops the radius so a row of cells sharing hairlines reads as one
   * continuous band - the hero stats strip.
   */
  shape?: "rounded" | "square";
  /**
   * `stacked` (default) puts the mono caption under the number. `inline` sets
   * the small label beside it on one baseline, which is how the hero strip reads
   * in the reference artwork.
   */
  layout?: "stacked" | "inline";
  align?: "start" | "center";
  className?: string;
}

/**
 * Stats strip cell: 40px sans number with a mono caption.
 * `lavender` is the translucent cell used in the hero stats strip.
 */
export function StatCell({
  value,
  caption,
  variant = "plain",
  shape = "rounded",
  layout = "stacked",
  align = "start",
  className,
}: StatCellProps) {
  const inline = layout === "inline";

  return (
    <div
      className={cn(
        "flex border border-line px-3 py-3",
        inline ? "flex-row items-baseline justify-center gap-2" : "flex-col gap-1",
        shape === "rounded" ? "rounded-input" : "rounded-none",
        variant === "lavender" && "bg-lavender",
        !inline && align === "center" && "items-center text-center",
        inline && align === "start" && "justify-start",
        className,
      )}
    >
      <span className="text-stat text-text">{value}</span>
      <span
        className={cn(
          "text-mono-label",
          variant === "lavender" ? "text-text/80" : "text-text-muted",
        )}
      >
        {caption}
      </span>
    </div>
  );
}