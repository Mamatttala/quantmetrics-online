import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type EyebrowChipProps = ComponentPropsWithoutRef<"span">;

/** Dashed-border pill with mono uppercase text; sits above every section H2. */
export function EyebrowChip({ className, children, ...props }: EyebrowChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-dashed border-line px-2 py-0.5 text-mono-label text-text-dim",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}