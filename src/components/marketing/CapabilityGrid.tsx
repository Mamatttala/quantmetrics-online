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
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

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

/**
 * "What you can do" (brief F1.4): a hairline-bordered grid of cells, each with an
 * 18px title, a muted description and a 48px outlined icon box. Every cell is a
 * link, so the whole surface is the target and the hover wash reads as one cell.
 */
export function CapabilityGrid() {
  return (
    <Section grid={false} id="capabilities">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>Capabilities</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[26ch]">Six ways to work with market data</h2>
      </Reveal>

      <Reveal className="mt-6">
        <ul className="grid grid-cols-1 border-t border-l border-line md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map(({ title, description, href, Icon }) => (
            <li key={title} className="border-r border-b border-line">
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
      </Reveal>

      <Reveal className="mt-6 flex justify-center">
        <Button href="/services" variant="outline" trailingArrow>
          Explore all
        </Button>
      </Reveal>
    </Section>
  );
}
