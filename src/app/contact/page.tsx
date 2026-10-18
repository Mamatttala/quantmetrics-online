import type { Metadata } from "next";

import { ContactForm } from "@/app/contact/ContactForm";
import { ContactInfoCard } from "@/app/contact/ContactInfoCard";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Section } from "@/components/layout/Section";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Quantmetrics-Lab team: research collaborations, data and metric questions, access and press.",
  openGraph: {
    type: "website",
    url: SITE_URL + "/contact",
    title: "Contact - Quantmetrics-Lab",
    description: "Get in touch with the Quantmetrics-Lab team about research, data and metrics.",
  },
};

/**
 * Contact (brief F5): eyebrow, serif H1, then two columns - the validated form on
 * the left and the bordered info card on the right.
 *
 * The heading block keeps the shape the blog and insights indexes use (a centred
 * eyebrow, headline and standfirst), so the page reads as part of the same set.
 * The form is a client component; the page stays a server component, so the
 * metadata and the info card are static.
 */
export default function ContactPage() {
  return (
    <main>
      <Section grid={false} divider={false} spacing="none" innerClassName="pt-10 pb-4">
        <div className="flex flex-col items-center text-center">
          <EyebrowChip>Contact</EyebrowChip>
          <h1 className="text-h2 mt-3 max-w-[22ch]">Get in touch</h1>
          <p className="text-meta mt-3 max-w-[58ch]">
            Questions about the research, the data or the metrics - send a note and a person
            will read it. For research and education only, never investment advice.
          </p>
        </div>
      </Section>

      <Section grid={false} spacing="none" innerClassName="pt-4 pb-12">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="min-w-0">
            <ContactForm />
          </div>
          <div className="min-w-0">
            <ContactInfoCard />
          </div>
        </div>
      </Section>
    </main>
  );
}

