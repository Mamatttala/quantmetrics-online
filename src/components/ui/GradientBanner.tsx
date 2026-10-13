import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

export type GradientBannerVariant = "teal-blue" | "pink-coral" | "sunset";

export interface GradientBannerProps extends ComponentPropsWithoutRef<"div"> {
  variant?: GradientBannerVariant;
  radius?: "card" | "none";
  /** Soft highlight sheen over the gradient. */
  sheen?: boolean;
}

const FILL: Record<GradientBannerVariant, string> = {
  "teal-blue": "gradient-teal-blue",
  "pink-coral": "gradient-pink-coral",
  sunset: "gradient-sunset",
};

/**
 * Gradient band. Gradients are built from accent tokens, so they are identical
 * in both themes - only the text tokens change, and they are always white here.
 */
export function GradientBanner({
  variant = "teal-blue",
  radius = "card",
  sheen = true,
  className,
  children,
  ...props
}: GradientBannerProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden text-on-gradient",
        radius === "card" && "rounded-card",
        FILL[variant],
        className,
      )}
      {...props}
    >
      {sheen ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-on-gradient/12 via-transparent to-transparent"
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}