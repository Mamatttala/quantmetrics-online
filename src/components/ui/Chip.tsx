"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ChipVariant = "filter" | "tag";

export interface ChipProps {
  children: ReactNode;
  /** `filter` is interactive and can be active; `tag` is a static label. */
  variant?: ChipVariant;
  active?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const BASE =
  "inline-flex items-center whitespace-nowrap rounded-pill border px-2 py-0.5 text-mono-label " +
  "transition duration-[var(--dur-hover)] ease-[var(--ease-standard)]";

/** Dashed mono chip: filter chips carry an active state, tags are static. */
export function Chip({ children, variant = "filter", active = false, href, onClick, className }: ChipProps) {
  const classes = cn(
    BASE,
    variant === "tag"
      ? "border-dashed border-line text-text-muted"
      : active
        ? "border-transparent bg-text text-bg"
        : "border-dashed border-line text-text-muted hover:border-text hover:text-text",
    (href || onClick) && "active:scale-[0.98]",
    className,
  );

  if (variant === "tag") {
    return <span className={classes}>{children}</span>;
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} aria-pressed={active} onClick={onClick}>
      {children}
    </button>
  );
}