import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SplitArrowButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  "aria-label"?: string;
}

/**
 * The "Request access" pill.
 *
 * At rest it is the solid inverted pill - white with dark ink in the dark theme
 * (the "CONTACT SALES" treatment in the reference). On hover, and while it is
 * being pressed, it opens into the outlined pill whose arrow sits behind its own
 * full-height rule, i.e. the "split arrow cell" the brief asks for on the
 * analytics band. Same token set and the same two-state language as `Button`
 * variant="primary", so the two never look like a different family.
 */
export function SplitArrowButton({ children, href, className, "aria-label": ariaLabel }: SplitArrowButtonProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex h-6.5 items-stretch overflow-hidden rounded-pill border border-transparent text-mono-label",
        "bg-text text-bg transition duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
        "hover:border-line hover:bg-transparent hover:text-text",
        "active:border-line active:bg-transparent active:text-text active:scale-[0.98]",
        className,
      )}
    >
      <span className="flex items-center px-3.5">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "flex w-6.5 items-center justify-center border-l border-transparent",
          "group-hover:border-line group-focus-visible:border-line",
        )}
      >
        <span className="translate-x-0 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}