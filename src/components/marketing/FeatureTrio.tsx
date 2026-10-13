import { AnalyzeIcon, ShareIcon, VisualizeIcon } from "@/components/brand/FeatureIcons";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
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
    <Section grid={false} id="workflow">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>Workflow</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[24ch]">Analyze, visualize, share</h2>
        <p className="text-meta mt-3 max-w-[56ch]">
          Every result moves through the same three steps, and each step stays inspectable.
        </p>
      </Reveal>

      <Reveal className="mt-6">
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
    </Section>
  );
}