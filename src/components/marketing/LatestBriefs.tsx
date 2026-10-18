import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { GridRail, SectionGrid } from "@/components/layout/SectionGrid";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BriefCard } from "@/components/ui/BriefCard";
import { HOME_BRIEFS } from "@/lib/briefs";

/**
 * Latest intelligence briefs (brief F1.8): three `BriefCard`s on the home page.
 * The entries are the three newest briefs, read from the archive through
 * `HOME_BRIEFS`, so publishing a brief updates this row with no second edit.
 */
export function LatestBriefs() {
  return (
    <section id="briefs" className="relative">
      <SectionHeading
        eyebrow={<EyebrowChip>Intelligence briefs</EyebrowChip>}
        title="Latest briefs"
        description="Short, periodic notes on what moved and what it may mean, each one walking through the method behind the reading. Every figure is illustrative sample data."
      />

      {/*
        Rounded BriefCards keep gutters between them, so this row draws no vertical
        rules; see the note in FeatureTrio. The band still closes with a rule, and
        its outer edges line up with the ruled sections above because it sits on
        the same rail cells.
      */}
      <SectionGrid rules={false} bottomRule>
        <GridRail />
        <div className="col-span-1 pt-3 pb-10 lg:col-span-3">
          <Reveal>
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
        </div>
        <GridRail />
      </SectionGrid>
    </section>
  );
}
