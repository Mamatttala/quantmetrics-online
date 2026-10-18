import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/blog/MdxContent";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { getLegalDoc } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

/** The MDX file this route renders (src/content/legal/privacy.mdx). */
const SLUG = "privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Draft privacy policy for Quantmetrics-Lab. A placeholder structure for legal review, not a finished policy.",
  // Draft copy must not be indexed before it has been reviewed.
  robots: { index: false, follow: false },
  openGraph: {
    type: "article",
    url: SITE_URL + "/privacy",
    title: "Privacy Policy - Quantmetrics-Lab",
    description: "Draft privacy policy for Quantmetrics-Lab. A placeholder structure for legal review, not a finished policy.",
  },
};

export default async function Page() {
  const doc = getLegalDoc(SLUG);

  if (!doc) notFound();

  return (
    <LegalLayout
      title={doc.title}
      updated={doc.updated}
      updatedLabel={doc.updatedLabel}
      contents={doc.contents}
    >
      <MdxContent body={doc.body} />
    </LegalLayout>
  );
}
