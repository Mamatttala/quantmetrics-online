import Link from "next/link";

import { Glyph } from "@/components/brand/Glyph";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  /** Pass null to render the pill as a static element. */
  href?: string | null;
}

/**
 * Logo pill: white in dark mode, black in light mode (both read from --text /
 * --bg), 52px tall with 20px horizontal padding, glyph plus 18px wordmark.
 */
export function Logo({ className, href = "/" }: LogoProps) {
  const classes = cn(
    "inline-flex h-6.5 shrink-0 items-center gap-1 rounded-pill bg-text px-2.5 text-bg",
    className,
  );

  const content = (
    <>
      <Glyph />
      <span className="text-body-lg leading-none font-medium tracking-[-0.02em]">Quantmetrics</span>
    </>
  );

  if (href === null) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <Link href={href} className={classes} aria-label="Quantmetrics-Lab — home">
      {content}
    </Link>
  );
}