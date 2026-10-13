"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FieldState = "default" | "error" | "success";
export type ControlVariant = "default" | "search";
export type ControlSize = "default" | "compact";

export interface FieldShellProps {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** The id the helper/error text is announced with. */
export function fieldMessageId(id: string): string {
  return `${id}-message`;
}

/** Explicit map so no two utilities ever fight over the same property. */
const BASE =
  "w-full border text-body text-text placeholder:text-text-dim transition duration-[var(--dur-hover)] ease-[var(--ease-standard)] disabled:cursor-not-allowed disabled:opacity-40 read-only:cursor-default";

const SURFACE: Record<ControlVariant, string> = {
  default: "rounded-input bg-bg-elev",
  // Search field: 4px radius on the --bg-hover fill (blog / insights filters).
  search: "rounded-sm bg-bg-hover",
};

const BORDER: Record<FieldState, string> = {
  default: "border-line focus:border-periwinkle",
  error: "border-negative focus:border-negative",
  success: "border-positive focus:border-positive",
};

const SIZE: Record<ControlSize, string> = {
  default: "h-6.5 px-2.5",
  compact: "h-5 px-2",
};

export function controlClasses({
  state = "default",
  variant = "default",
  size = "default",
  fixedHeight = true,
  className,
}: {
  state?: FieldState;
  variant?: ControlVariant;
  size?: ControlSize;
  fixedHeight?: boolean;
  className?: string;
} = {}): string {
  return cn(BASE, SURFACE[variant], BORDER[state], fixedHeight && SIZE[size], className);
}

/** Label + control + hint/error/success, with the ARIA wiring in one place. */
export function FieldShell({ id, label, hint, error, success, required, className, children }: FieldShellProps) {
  const message = error ?? success ?? hint;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label ? (
        <label htmlFor={id} className="text-mono-label text-text-muted">
          {label}
          {required ? (
            <span aria-hidden="true" className="text-negative">
              {" *"}
            </span>
          ) : null}
        </label>
      ) : null}

      {children}

      {message ? (
        <p id={fieldMessageId(id)} className="text-meta">
          <span className={cn(error ? "text-negative" : success ? "text-positive" : "text-text-dim")}>{message}</span>
        </p>
      ) : null}
    </div>
  );
}