import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ArticleBoxProps {
  /** Mono heading row, e.g. "Key takeaways". */
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * A bordered content box for the article column (brief F3): the "Key takeaways"
 * and "Methodology & data" panels on an intelligence brief. It repeats the rail
 * box language - --bg-elev fill, 1px hairline, 12px radius, mono heading - so a
 * box in the body reads exactly like a box in the sidebar.
 */
export function ArticleBox({ title, children, className }: ArticleBoxProps) {
  return (
    <section className={cn("rounded-input border border-line bg-bg-elev p-4", className)}>
      <p className="text-mono-label text-text-muted">{title}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}
