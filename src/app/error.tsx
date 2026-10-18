"use client";

import Link from "next/link";

import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

/**
 * The route error boundary (brief F7). It renders in the same style as the 404 so
 * a failure reads as part of the site rather than as a browser page.
 *
 * It is a client component - Next requires the boundary to be one - and it
 * deliberately reports nothing: no error text is logged, because a message could
 * carry more than a reader should see. The digest is the identifier to quote to
 * support, and it is the only detail shown.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <Section grid={false} divider={false} spacing="none" innerClassName="pt-14 pb-16">
        <div className="max-w-[640px]">
          <EyebrowChip>Error</EyebrowChip>
          <h1 className="text-h2 mt-3 max-w-[18ch]">Something went wrong</h1>
          <p className="text-body-lg mt-4 max-w-[52ch] text-text-muted">
            This part of the page failed to load. Trying again often clears it; if it does not, the
            home page and the archives below still work.
          </p>

          {error.digest ? (
            <p className="text-mono-label mt-4 text-text-dim">Reference {error.digest}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button onClick={reset} trailingArrow>
              Try again
            </Button>
            <Link
              href="/"
              className="text-mono-label text-text underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-mono-label text-text underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text"
            >
              Blog
            </Link>
            <Link
              href="/insights"
              className="text-mono-label text-text underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text"
            >
              Insights
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
