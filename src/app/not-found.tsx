import type { Metadata } from "next";
import Link from "next/link";

import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That address does not exist on Quantmetrics-Lab. Head back to the home page, or read the blog and the intelligence briefs.",
};

/**
 * The 404 page. It sits inside the root layout, so the header and footer stay
 * put and the reader is never stranded: one primary route back to the home page,
 * and two text links to the two archives people are usually looking for.
 */
export default function NotFound() {
  return (
    <main>
      <Section grid={false} divider={false} spacing="none" innerClassName="pt-14 pb-16">
        <div className="max-w-[640px]">
          <EyebrowChip>404</EyebrowChip>
          <h1 className="text-h2 mt-3 max-w-[18ch]">This page is not here</h1>
          <p className="text-body-lg mt-4 max-w-[52ch] text-text-muted">
            The address may be old, or the page may have moved. Nothing is broken on your side.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href="/" trailingArrow>
              Back to home
            </Button>
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
