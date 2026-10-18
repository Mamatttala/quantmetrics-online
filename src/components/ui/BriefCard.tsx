import Link from "next/link";

import { AiBadge } from "@/components/ui/AiBadge";
import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/utils";

export type BriefCoverVariant = "teal-blue" | "pink-coral" | "sunset";

export interface BriefCardProps {
  title: string;
  excerpt: string;
  category: string;
  /** Pre-formatted so the card itself stays free of date logic. */
  date: string;
  href: string;
  /** Serif line printed on the cover; falls back to the category. */
  coverTitle?: string;
  variant?: BriefCoverVariant;
  className?: string;
}

const COVER_FILL: Record<BriefCoverVariant, string> = {
  "teal-blue": "gradient-teal-blue",
  "pink-coral": "gradient-pink-coral",
  sunset: "gradient-sunset",
};

/**
 * Intelligence-brief card (brief F3): 24px radius, title, two-line excerpt, a
 * category chip and date, a gradient cover carrying a serif title, and the
 * AI-generated badge that marks machine-drafted copy. The home rail and the
 * insights index both render this card, so the whole surface is one link.
 */
export function BriefCard({
  title,
  excerpt,
  category,
  date,
  href,
  coverTitle,
  variant = "teal-blue",
  className,
}: BriefCardProps) {
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
        <div className="flex flex-wrap items-center gap-2">
          <Chip variant="tag">{category}</Chip>
          <AiBadge />
        </div>

        <h3 className="text-card-title text-text underline-offset-[3px] group-hover:underline">{title}</h3>
        <p className="text-meta line-clamp-2">{excerpt}</p>

        <time className="text-mono-label mt-auto pt-2 text-text-dim">{date}</time>
      </div>

      <div className="relative aspect-video overflow-hidden border-t border-line">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 transition-transform duration-[var(--dur-base)] ease-[var(--ease-standard)] group-hover:scale-[1.03]",
            COVER_FILL[variant],
          )}
        />
        <span className="text-section-heading absolute inset-0 flex items-center justify-center p-4 text-center text-on-gradient">
          {coverTitle ?? category}
        </span>
      </div>
    </Link>
  );
}