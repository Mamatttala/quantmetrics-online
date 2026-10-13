/**
 * Placeholder briefs for the home page rail.
 *
 * TODO(placeholder): replace these three entries with the real brief archive
 * (frontmatter-driven, see the Insights stage). The copy below is illustrative
 * only: no figures, no performance claim and no endorsement of any provider.
 */
export interface BriefSummary {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  coverTitle: string;
  href: string;
  variant: "teal-blue" | "pink-coral" | "sunset";
}

export const HOME_BRIEFS: BriefSummary[] = [
  {
    title: "Reading volatility after a policy shift",
    excerpt:
      "Why a single rate decision moves short-dated volatility more than it moves the level, and how to read the gap.",
    category: "Volatility",
    date: "Placeholder \u00b7 28 Sep 2026",
    coverTitle: "Volatility",
    href: "/insights",
    variant: "teal-blue",
  },
  {
    title: "When correlation quietly changes",
    excerpt:
      "Pairwise correlation drifts long before a drawdown shows up. A short note on watching the drift itself.",
    category: "Markets",
    date: "Placeholder \u00b7 21 Sep 2026",
    coverTitle: "Markets",
    href: "/insights",
    variant: "pink-coral",
  },
  {
    title: "Regime drift in a thin month",
    excerpt:
      "Lower liquidity changes the shape of the return distribution. What a regime test picks up that a mean misses.",
    category: "Macro",
    date: "Placeholder \u00b7 14 Sep 2026",
    coverTitle: "Macro",
    href: "/insights",
    variant: "sunset",
  },
];