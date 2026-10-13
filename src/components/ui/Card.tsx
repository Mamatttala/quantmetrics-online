import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  padding?: "default" | "tight" | "none";
  /** Adds the hover treatment used by blog, brief and feature cards. */
  interactive?: boolean;
}

const PADDING: Record<NonNullable<CardProps["padding"]>, string> = {
  default: "p-4",
  tight: "p-3",
  none: "",
};

/** Base surface: 24px radius, elevated background, 1px hairline. */
export function Card({ padding = "default", interactive = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-bg-elev",
        PADDING[padding],
        interactive &&
          "transition duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:border-text/40 hover:bg-bg-hover",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}