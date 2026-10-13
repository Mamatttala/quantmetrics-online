"use client";

import { useState } from "react";
import type { ComponentType } from "react";

import {
  NewcomerBasicsArt,
  NewcomerNotesArt,
  NewcomerRhythmArt,
  ResearcherBacktestArt,
  ResearcherRegimeArt,
  ResearcherVolatilityArt,
  TraderPortfolioArt,
  TraderRiskArt,
  TraderSignalArt,
} from "@/components/brand/AudienceIllustrations";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { TabBar } from "@/components/ui/TabBar";
import type { TabItem } from "@/components/ui/TabBar";

interface AudienceCard {
  title: string;
  description: string;
  Art: ComponentType<{ className?: string }>;
}

interface Audience {
  id: string;
  label: string;
  cards: AudienceCard[];
}

const PANEL_PREFIX = "audience-panel-";

/**
 * Nine cards across three audiences (brief F1.5). The copy describes what each
 * reader gets, in their own terms, without promising an outcome.
 */
const AUDIENCES: Audience[] = [
  {
    id: "researchers",
    label: "Researchers",
    cards: [
      {
        title: "Volatility models",
        description: "Fit GARCH-family models and read how the forecast behaves out of sample.",
        Art: ResearcherVolatilityArt,
      },
      {
        title: "Backtests",
        description: "Replay a rule over years of data and see where it holds and where it breaks.",
        Art: ResearcherBacktestArt,
      },
      {
        title: "Econometric studies",
        description: "Cointegration, VAR and regime detection, reported with the diagnostics that matter.",
        Art: ResearcherRegimeArt,
      },
    ],
  },
  {
    id: "traders",
    label: "Traders",
    cards: [
      {
        title: "Signals",
        description: "Turn an idea into a monitored signal with a clear entry, exit and decay profile.",
        Art: TraderSignalArt,
      },
      {
        title: "Risk views",
        description: "Exposure, drawdown and factor attribution in one view, refreshed as positions change.",
        Art: TraderRiskArt,
      },
      {
        title: "Position monitoring",
        description: "Watch a book of positions against the risk you actually intended to take.",
        Art: TraderPortfolioArt,
      },
    ],
  },
  {
    id: "newcomers",
    label: "Newcomers",
    cards: [
      {
        title: "Start with one idea",
        description: "Begin with a single concept - volatility, return, drawdown - and build from there.",
        Art: NewcomerBasicsArt,
      },
      {
        title: "Plain-language notes",
        description: "Every brief explains the method in words before it shows the formulas.",
        Art: NewcomerNotesArt,
      },
      {
        title: "Stay in step",
        description: "Learn why markets move in cycles, and what that means for the decisions you make.",
        Art: NewcomerRhythmArt,
      },
    ],
  },
];

const TABS: TabItem[] = AUDIENCES.map((audience) => ({
  id: audience.id,
  label: audience.label,
  panelId: `${PANEL_PREFIX}${audience.id}`,
}));

const FADE = "transition-colors duration-[var(--dur-fill)] ease-[var(--ease-standard)]";

/**
 * Audience tabs (brief F1.5): three tall cards per audience in a hairline-bordered
 * grid. Hovering a card fades the teal-to-blue gradient in behind the copy and
 * lifts the illustration to full contrast over 200ms.
 *
 * FeatureCard was not reused: it carries a 24px radius and its own border, which
 * cannot compose into a shared-hairline grid. The fill uses the same gradient
 * tokens it does.
 */
export function AudienceTabs() {
  const [active, setActive] = useState(AUDIENCES[0].id);

  return (
    <Section grid={false} id="audience">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>Audience</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[22ch]">Built for every kind of market mind</h2>
      </Reveal>

      {/* The bar keeps its own width and the wrapper scrolls, so the tabs stay on
          one line on a narrow screen instead of wrapping. */}
      <Reveal className="mt-6">
        <div className="flex overflow-x-auto">
          <TabBar
            tabs={TABS}
            label="Audience"
            value={active}
            onChange={setActive}
            className="mx-auto min-w-max"
          />
        </div>
      </Reveal>

      <Reveal className="mt-6">
        {AUDIENCES.map((audience) => (
          <div
            key={audience.id}
            id={`${PANEL_PREFIX}${audience.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${audience.id}`}
            hidden={audience.id !== active}
          >
            <ul className="grid grid-cols-1 border-t border-l border-line md:grid-cols-3">
              {audience.cards.map(({ title, description, Art }) => (
                <li key={title} className="group relative overflow-hidden border-r border-b border-line">
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 gradient-teal-blue opacity-0 ${FADE} group-hover:opacity-100`}
                  />

                  <div className="relative flex h-42.5 flex-col items-center justify-end p-4 text-center">
                    <span
                      className={`flex flex-1 items-center justify-center text-text-muted ${FADE} group-hover:text-on-gradient`}
                    >
                      <Art />
                    </span>
                    <h3 className={`text-card-title text-text ${FADE} group-hover:text-on-gradient`}>
                      {title}
                    </h3>
                    <p className={`text-meta mt-2 max-w-[34ch] ${FADE} group-hover:text-on-gradient-muted`}>
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
