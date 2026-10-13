"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Scroll reveal from section E: opacity 0 -> 1 and translateY(16px) -> 0 over
 * 600ms. The hidden state lives behind `html.js` in globals.css, so it is only
 * armed when scripting is available - without it the content is simply visible.
 *
 * Anything already inside the viewport at mount (the hero) is revealed on the
 * next tick rather than waiting for an observer callback, so above-the-fold copy
 * can never be left hidden if the observer is slow or unavailable.
 * `prefers-reduced-motion` likewise skips straight to the visible state.
 */
export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rect = node.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

    // Deferred rather than set synchronously, which would cascade a render
    // inside the effect body.
    if (prefersReducedMotion || inViewport || typeof IntersectionObserver === "undefined") {
      const timer = window.setTimeout(() => setRevealed(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed ? "true" : "false"} className={cn("reveal", className)}>
      {children}
    </div>
  );
}