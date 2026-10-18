import Link from "next/link";

import { Chip } from "@/components/ui/Chip";
import type { CoverVariant } from "@/lib/content";
import { cn } from "@/lib/utils";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  category: string;
  /** Pre-formatted, so the card stays free of date logic. */
  date: string;
  readTime: string;
  href: string;
  cover?: CoverVariant;
  /** Serif line printed on the cover; falls back to the category. */
  coverTitle?: string;
  className?: string;
}

const COVER_FILL: Record<CoverVariant, string> = {
  "teal-blue": "gradient-teal-blue",
  "pink-coral": "gradient-pink-coral",
  sunset: "gradient-sunset",
};

/**
 * Blog index card (brief F4): 24px radius, 28px title, a two-line muted excerpt,
 * a chip / date / read-time row, and a 16:9 cover pinned to the bottom.
 *
 * Hover is the brief's three-part treatment: the border brightens, the cover
 * scales 1.03 and the title underlines. The whole surface is one link, so the
 * card is a single tab stop.
 *
 * The cover is a token-driven gradient rather than a bitmap: it keeps the page
 * free of heavy images (brief section I) and, because the gradients are built
 * from accent tokens, it looks identical in both themes.
 */
export function BlogCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  href,
  cover = "teal-blue",
  coverTitle,
  className,
}: BlogCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-line bg-bg-elev",
        "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:border-text/40",
        className,
      )}
    >
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-card-title text-text underline-offset-[3px] group-hover:underline">{title}</h3>
        <p className="text-meta line-clamp-2">{excerpt}</p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Chip variant="tag">{category}</Chip>
          <span className="text-mono-label text-text-dim">{date}</span>
          <span aria-hidden="true" className="text-mono-label text-text-dim">
            ·
          </span>
          <span className="text-mono-label text-text-dim">{readTime}</span>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden border-t border-line">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)] group-hover:scale-[1.03]",
            COVER_FILL[cover],
          )}
        />
        <span className="text-section-heading absolute inset-0 flex items-center justify-center p-4 text-center text-on-gradient">
          {coverTitle ?? category}
        </span>
      </div>
    </Link>
  );
}
