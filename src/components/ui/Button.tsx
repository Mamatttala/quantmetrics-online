"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "navCta" | "text";
export type ButtonSize = "default" | "compact";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  /** default = 52px pill, compact = 40px pill. Ignored by `text`. */
  size?: ButtonSize;
  /** Trailing arrow that shifts 4px on hover. */
  trailingArrow?: boolean;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  /** Renders an anchor (next/link) instead of a button. */
  href?: string;
  target?: string;
  rel?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  id?: string;
  className?: string;
  "aria-label"?: string;
  "aria-controls"?: string;
  "aria-expanded"?: boolean;
  onClick?: () => void;
}

const BASE =
  "group relative inline-flex select-none items-center justify-center whitespace-nowrap rounded-pill text-mono-label " +
  "transition duration-[var(--dur-hover)] ease-[var(--ease-standard)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40";

const SIZES: Record<ButtonSize, string> = {
  default: "h-6.5 gap-1 px-3.5", // 52px tall, 28px padding
  compact: "h-5 gap-1 px-2.5", // 40px tall, 20px padding
};

const VARIANTS: Record<ButtonVariant, string> = {
  // Inverted pill: white in dark mode, black in light mode (both come from
  // tokens). On hover it opens into the outlined pill whose arrow sits behind a
  // full-height rule, which is the same state language as SplitArrowButton - so
  // "Explore the lab" and "Request access" behave identically. The border is
  // always present (transparent at rest) so the label never shifts by a pixel.
  primary:
    "border border-transparent bg-text text-bg hover:border-line hover:bg-transparent hover:text-text " +
    "active:border-line active:bg-transparent active:text-text",
  outline: "border border-line text-text hover:border-text hover:bg-fill-soft",
  // The header bar's CTA: outlined and transparent until hovered, then a solid
  // inverted pill (white with dark ink in the dark theme, and vice versa).
  navCta: "border border-line text-text hover:border-text hover:bg-text hover:text-bg",
  text: "text-text underline underline-offset-[3px] hover:text-text-muted",
};

/** Primary / outline / text button, optionally rendered as a link. */
export function Button({
  children,
  variant = "primary",
  size = "default",
  trailingArrow = false,
  loading = false,
  disabled = false,
  fullWidth = false,
  href,
  target,
  rel,
  title,
  type = "button",
  id,
  className,
  "aria-label": ariaLabel,
  "aria-controls": ariaControls,
  "aria-expanded": ariaExpanded,
  onClick,
}: ButtonProps) {
  const classes = cn(
    BASE,
    variant !== "text" && SIZES[size],
    VARIANTS[variant],
    fullWidth && "w-full",
    className,
  );

  const content = (
    <>
      {loading ? <Spinner /> : null}
      <span>{children}</span>
      {trailingArrow && variant === "primary" ? (
        /* The divided arrow cell of the hover state. Hidden while the pill is
           solid, and stretched so the rule spans the full button height. */
        <span
          aria-hidden="true"
          className="w-px self-stretch bg-current opacity-0 transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
        />
      ) : null}
      {trailingArrow ? (
        <span
          aria-hidden="true"
          className="translate-x-0 transition-transform duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      ) : null}
    </>
  );

  if (href && !disabled && !loading) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        title={title}
        id={id}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // A disabled link is not a link: render inert text with aria-disabled.
  if (href) {
    return (
      <span role="link" aria-disabled="true" title={title} id={id} className={classes}>
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      id={id}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="size-2 shrink-0 animate-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
      <path d="M8 1.5A6.5 6.5 0 0 1 14.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}