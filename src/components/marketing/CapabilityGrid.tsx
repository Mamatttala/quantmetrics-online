import Link from "next/link";
import type { ComponentType } from "react";

import {
  DataAnalyticsIcon,
  InsightsIcon,
  IntelligenceBriefIcon,
  ResearchLabIcon,
  RiskAnalyticsIcon,
  TutorialsIcon,
} from "@/components/brand/CapabilityIcons";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { GridRail, GridRule, SectionGrid } from "@/components/layout/SectionGrid";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Capability {
  title: string;
  description: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

/**
 * Six capability cells (brief F1.4). Copy is deliberately plain: it says what
 * the lab does, with no performance claim and no figure that would need a source.
 */
const CAPABILITIES: Capability[] = [
  {
    title: "Research Lab",
    description: "Backtests, volatility models and econometric fits on versioned datasets.",
    href: "/services#research",
    Icon: ResearchLabIcon,
  },
  {
    title: "Data Analytics",
    description: "Clean, explore and summarise market data without leaving the browser.",
    href: "/services#analysis",
    Icon: DataAnalyticsIcon,
  },
  {
    title: "Intelligence Briefs",
    description: "Short, periodic AI-generated notes on what moved and what it may mean.",
    href: "/insights",
    Icon: IntelligenceBriefIcon,
  },
  {
    title: "Insights",
    description: "Curated research ideas and observations from the lab's ongoing work.",
    href: "/insights",
    Icon: InsightsIcon,
  },
  {
    title: "Tutorials",
    description: "Step-by-step guides that build quantitative finance skills from the ground up.",
    href: "/blog",
    Icon: TutorialsIcon,
  },
  {
    title: "Risk Analytics",
    description: "Drawdown, exposure and factor metrics reported the way an allocator reads them.",
    href: "/services#metrics",
    Icon: RiskAnalyticsIcon,
  },
];

// min-h-15 (120px) matches the reference cell height (~119px); content sits
// top-aligned inside it so the icon box stays on the first text line.
const CELL_CLASSES = [
  "group relative flex min-h-15 flex-col p-3",
  "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
  "hover:bg-bg-hover focus-visible:bg-bg-hover",
].join(" ");

function CapabilityRow({ capabilities }: { capabilities: Capability[] }) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {capabilities.map(({ title, description, href, Icon }) => (
        <li
          key={title}
          className={cn(
            "border-b border-line-grid lg:border-b-0",
            // The dividers between columns come from the cell borders on
            // smaller screens; from lg up the page rules sit on those seams.
            "md:border-r lg:border-r-0",
          )}
        >
          <Link href={href} className={CELL_CLASSES}>
            <h3 className="text-cell-title pr-8 text-text">{title}</h3>
            <p className="text-meta mt-2">{description}</p>
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-input border border-line text-text-muted transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] group-hover:border-text/40 group-hover:text-text"
            >
              <Icon />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * "What you can do" (brief F1.4).
 *
 * Reworked onto the site scaffold so it matches the reference: the cells sit in
 * the three middle columns of the page grid and are separated by the page's own
 * vertical rules, rather than being boxed inside a self-drawn border. The
 * reference keeps those rules scoped to the cell matrix and uses horizontal
 * rules between rows, which is what this does - a full-bleed `GridRule` between
 * rows, no outer frame, no left/right borders on the cells at desktop.
 *
 * The heading and the CTA sit on the content measure (the three middle columns),
 * not on the full viewport, so they stay optically centred with the grid.
 */
export function CapabilityGrid() {
  return (
    <section id="capabilities" className="relative">
      <SectionHeading
        eyebrow={<EyebrowChip>Capabilities</EyebrowChip>}
        title="Six ways to work with market data"
        titleWidth={26}
      />

      <SectionGrid bottomRule>
        <GridRail />

        <Reveal className="col-span-1 lg:col-span-3">
          <CapabilityRow capabilities={CAPABILITIES.slice(0, 3)} />
        </Reveal>

        <GridRail />
        <GridRule />

        <GridRail />
        <Reveal className="col-span-1 lg:col-span-3">
          <CapabilityRow capabilities={CAPABILITIES.slice(3)} />
        </Reveal>

        <GridRail />
      </SectionGrid>

      <SectionGrid rules={false} bottomRule>
        <GridRail />
        <div className="col-span-1 flex justify-center px-3 pt-8 pb-10 lg:col-span-3">
          <Reveal>
            <Button href="/services" variant="outline" trailingArrow>
              Explore all
            </Button>
          </Reveal>
        </div>
        <GridRail />
      </SectionGrid>
    </section>
  );
}
