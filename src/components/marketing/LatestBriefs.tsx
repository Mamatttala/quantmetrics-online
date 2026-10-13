import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { BriefCard } from "@/components/ui/BriefCard";
import { HOME_BRIEFS } from "@/lib/briefs";

/**
 * Latest intelligence briefs (brief F1.8): three `BriefCard`s on the home page.
 * The entries come from `HOME_BRIEFS`, which is explicitly marked placeholder
 * data until the real archive exists.
 */
export function LatestBriefs() {
  return (
    <Section grid={false} id="briefs">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>Intelligence briefs</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[24ch]">Latest briefs</h2>
        <p className="text-meta mt-3 max-w-[56ch]">
          Short, periodic notes on what moved and what it may mean. The three below are
          placeholders while the archive is being prepared.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {HOME_BRIEFS.map((brief) => (
            <li key={brief.title} className="flex">
              <BriefCard
                title={brief.title}
                excerpt={brief.excerpt}
                category={brief.category}
                date={brief.date}
                href={brief.href}
                coverTitle={brief.coverTitle}
                variant={brief.variant}
                className="h-full w-full"
              />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <Button href="/insights" variant="outline" trailingArrow>
          View all briefs
        </Button>
      </Reveal>
    </Section>
  );
}