/**
 * Content for the Services page (brief F2). Kept in one place so the page
 * component stays layout-only, and so the three anchors below stay in lockstep
 * with the `/services#...` deep links in src/lib/navigation.ts.
 *
 * The anchors are listed as `SERVICE_ANCHORS` and asserted by the page ids.
 */

export interface ServiceStat {
  value: string;
  caption: string;
}

/**
 * Stats band values.
 *
 * TODO: Replace with live metrics. Until then these figures are layout
 * placeholders only: they are NOT measured, audited or verified, so never
 * present them as real numbers. Confirm each one against real records before
 * launch, or remove the band. Same status as HERO_STATS in
 * src/components/marketing/Hero.tsx.
 */
export const SERVICE_STATS: ServiceStat[] = [
  { value: "504+", caption: "Users" },
  { value: "120+", caption: "Customers" },
  { value: "200+", caption: "Strategies" },
  { value: "24+", caption: "Models" },
  { value: "36+", caption: "Datasets" },
];

export interface ServiceDetail {
  label: string;
  body: string;
}

export interface ServiceSectionContent {
  /** Anchor id, also the deep-link fragment used by the header mega menu. */
  id: "research" | "analysis" | "metrics";
  eyebrow: string;
  title: string;
  summary: string;
  details: ServiceDetail[];
  linkLabel: string;
  linkHref: string;
}

export const SERVICE_SECTIONS: ServiceSectionContent[] = [
  {
    id: "research",
    eyebrow: "Service 01 / Research",
    title: "Backtests, volatility models and econometric fits",
    summary:
      "Start from a clean, versioned dataset and work the whole research loop: specify, estimate, validate, then record what you found while the diagnostics stay attached to the result.",
    details: [
      {
        label: "Backtesting",
        body: "Event-driven and vectorised engines with transaction costs, slippage and position limits you set explicitly rather than inherit from a default.",
      },
      {
        label: "Volatility forecasting",
        body: "GARCH-family estimates and realised-volatility measures, always shown next to a simple benchmark so the gain is visible.",
      },
      {
        label: "Econometric models",
        body: "Stationarity, cointegration and VAR work, with the tests reported beside the estimates instead of in a separate appendix.",
      },
      {
        label: "ML forecasting",
        body: "Time-series cross-validation and walk-forward evaluation, so a score is never quoted on data the model has already seen.",
      },
    ],
    linkLabel: "Request access",
    linkHref: "/contact",
  },
  {
    id: "analysis",
    eyebrow: "Service 02 / Analysis",
    title: "Clean the data, then read it carefully",
    summary:
      "Most of the work is the part that never makes a headline: aligning calendars, repairing gaps and checking that a series means what its label claims.",
    details: [
      {
        label: "Data cleaning",
        body: "Corporate actions, timezone and calendar alignment, outlier flags and a documented trail for every transformation applied.",
      },
      {
        label: "Exploratory analysis",
        body: "Distributions, autocorrelation, seasonality and regime splits, so the assumptions are visible before the model is.",
      },
      {
        label: "Statistical analysis",
        body: "Hypothesis tests, confidence intervals and regression diagnostics reported with their limits, not only their point estimates.",
      },
      {
        label: "Risk analytics",
        body: "Drawdown, exposure, concentration and tail measures, presented the way an allocator reads them.",
      },
    ],
    linkLabel: "See the workflow",
    linkHref: "/services#workflow",
  },
  {
    id: "metrics",
    eyebrow: "Service 03 / Metrics",
    title: "Performance and risk, measured the same way every time",
    summary:
      "One metric set, defined once and applied to every strategy, so two results are always comparable and a change in the numbers means a change in the strategy.",
    details: [
      {
        label: "Performance",
        body: "Cumulative and annualised return, hit rate, turnover and capacity, each labelled with the window it was measured over.",
      },
      {
        label: "Risk",
        body: "Volatility, drawdown and tail measures, plus correlation against a benchmark you choose and name.",
      },
      {
        label: "Factor metrics",
        body: "Exposure and attribution against a stated factor set, with the unexplained residual left visible on the chart.",
      },
      {
        label: "Sample dashboards",
        body: "Worked examples on sample data, so the layout is familiar before you bring your own numbers to it.",
      },
    ],
    linkLabel: "Request access",
    linkHref: "/contact",
  },
];

export interface TagPanel {
  title: string;
  caption: string;
  tags: string[];
}

/**
 * The dashed mono chips in the tag block: what the lab implements, and how the
 * work is done. Methods, not claims.
 */
export const TAG_PANELS: TagPanel[] = [
  {
    title: "Model families",
    caption: "What we implement",
    tags: [
      "GARCH",
      "EGARCH",
      "GJR-GARCH",
      "VAR",
      "VECM",
      "COINTEGRATION",
      "REGIME DETECTION",
      "MONTE CARLO",
      "WALK-FORWARD",
    ],
  },
  {
    title: "Data and method",
    caption: "How the work is done",
    tags: [
      "CALENDAR ALIGNMENT",
      "STATIONARITY",
      "ROBUST STANDARD ERRORS",
      "ROLLING WINDOWS",
      "HOLDOUT SPLITS",
      "OUT-OF-SAMPLE TESTS",
    ],
  },
];

export const TAG_BLOCK = {
  eyebrow: "Toolkit",
  title: "A narrow set of methods, applied properly",
  summary:
    "We would rather run a handful of well-understood models carefully than a long list of them quickly. Every method below is documented, versioned and reported with its caveats.",
};

export interface WorkflowStep {
  id: string;
  /** The tab label; brief F2 pins this to DATA / MODEL / VALIDATE / REPORT. */
  label: string;
  title: string;
  body: string;
  details: string[];
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: "data",
    label: "Data",
    title: "Bring the series in",
    body: "Every study starts from versioned raw inputs and a cleaning pass you can read, so a number can always be traced back to the row it came from.",
    details: [
      "Versioned raw inputs, with the pull date recorded",
      "Calendar, timezone and corporate-action alignment",
      "Missing values flagged and documented, never silently filled",
    ],
  },
  {
    id: "model",
    label: "Model",
    title: "Estimate it explicitly",
    body: "Specifications are written down before they are fitted, including the parameters that are fixed, the ones that are estimated and the ones that are assumed.",
    details: [
      "Specification recorded alongside the estimate",
      "Diagnostics run automatically after each fit",
      "Alternative specifications kept for comparison",
    ],
  },
  {
    id: "validate",
    label: "Validate",
    title: "Try to break it",
    body: "A result is only interesting once it has survived an honest attempt to invalidate it: out-of-sample windows, shifted start dates and stressed assumptions.",
    details: [
      "Walk-forward and holdout evaluation",
      "Parameter and start-date sensitivity",
      "Explicit list of what the test does not cover",
    ],
  },
  {
    id: "report",
    label: "Report",
    title: "Write it down",
    body: "The output is a short, plain document: what was asked, what was done, what came back, and where it is likely to be wrong.",
    details: [
      "One page of findings, one page of method",
      "Figures exported from the same token-driven charts",
      "Limitations stated before conclusions",
    ],
  },
];

export const WORKFLOW_BLOCK = {
  eyebrow: "Workflow",
  title: "Data, model, validate, report",
  /** Rendered as a mono sequence line under the heading. */
  sequence: "DATA \u2192 MODEL \u2192 VALIDATE \u2192 REPORT",
};

export const SERVICES_HERO = {
  eyebrow: "Quantmetrics-Lab",
  title: "The Quantmetrics Lab",
  summary:
    "Three ways to work with market data: research, analysis and metrics. Each one is documented, reproducible, and built for people who will check the numbers.",
  ctaLabel: "Request access",
  ctaHref: "/contact",
};