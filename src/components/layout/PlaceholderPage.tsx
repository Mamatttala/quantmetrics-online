import type { ReactNode } from "react";

import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Section } from "@/components/layout/Section";

export interface PlaceholderPageProps {
  title: string;
  eyebrow?: string;
  note?: string;
  children?: ReactNode;
}

/**
 * TEMPORARY: the title-only shell used by every route created in stage 3 so the
 * header links resolve. Delete each usage as the real page lands.
 */
export function PlaceholderPage({ title, eyebrow = "Placeholder", note, children }: PlaceholderPageProps) {
  return (
    <main>
      <Section grid={false} divider={false} className="pt-16">
        <EyebrowChip>{eyebrow}</EyebrowChip>
        <h1 className="text-h2 mt-3">{title}</h1>
        <p className="text-body mt-3 max-w-[64ch] text-text-muted">
          {note ?? "Placeholder route so the header links resolve. This page is built in a later stage."}
        </p>
        {children ? <div className="mt-6">{children}</div> : null}
      </Section>
    </main>
  );
}