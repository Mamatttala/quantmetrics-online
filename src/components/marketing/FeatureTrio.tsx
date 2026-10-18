import { AnalyzeIcon, ShareIcon, VisualizeIcon } from "@/components/brand/FeatureIcons";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { GridRail, SectionGrid } from "@/components/layout/SectionGrid";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";

/**
 * The feature trio (brief F1.6): three 24px-radius cards that fill with the
 * pink-to-coral gradient and a soft blur on hover. `FeatureCard` already owns
 * exactly that state, so this section only supplies the copy and the icons.
 */
const FEATURES = [
  {
    title: "Analyze",
    description:
      "Run the numbers on versioned data: backtests, regressions and volatility models, each with its diagnostics attached.",
    Icon: AnalyzeIcon,
  },
  {
    title: "Visualize",
    description:
      "Turn a result into a chart you can read at a glance, drawn from the same tokens as the rest of the site.",
    Icon: VisualizeIcon,
  },
  {
    title: "Share",
    description:
      "Export a figure, a table or a link, so a finding survives the trip to a colleague, a paper or a committee.",
    Icon: ShareIcon,
  },
];

export function FeatureTrio() {
  return (
    <section id="workflow" className="relative">
      <SectionHeading
        eyebrow={<EyebrowChip>Workflow</EyebrowChip>}
        title="Analyze, visualize, share"
        description="Every result moves through the same three steps, and each step stays inspectable."
      />

      {/*
        The card row sits on the scaffold template but draws no vertical rules:
        these are rounded, bordered cards with gutters between them, and the
        reference only rules behind flush cell grids. An empty rail cell on each
        side would eat 12.9% of the width twice over, so this is a RAIL-less row -
        `rules={false}` keeps the template off while the inner grid does the work.
      */}
      <SectionGrid rules={false} bottomRule>
        <GridRail />
        <div className="col-span-1 py-10 lg:col-span-3">
          <Reveal>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {FEATURES.map(({ title, description, Icon }) => (
                <li key={title} className="flex">
                  <FeatureCard
                    title={title}
                    description={description}
                    variant="pink-coral"
                    icon={<Icon className="size-7" />}
                    className="h-full w-full"
                  />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <GridRail />
      </SectionGrid>
    </section>
  );
}
