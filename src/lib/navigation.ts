export interface NavLink {
  label: string;
  href: string;
}

export interface NavItem extends NavLink {
  /** Presence of children makes the item a menu trigger rather than a link. */
  children?: NavLink[];
}

/**
 * Single source of truth for the header, the mega menu and the mobile
 * accordion, so all three stay in sync.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Research", href: "/services#research" },
      { label: "Analysis", href: "/services#analysis" },
      { label: "Metrics", href: "/services#metrics" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface ServiceCard {
  title: string;
  description: string;
  href: string;
}

/** The three cards in the Services mega menu. */
export const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Research",
    description: "Backtesting, volatility forecasting and econometric modelling.",
    href: "/services#research",
  },
  {
    title: "Analysis",
    description: "Data cleaning, exploratory statistics and risk analytics.",
    href: "/services#analysis",
  },
  {
    title: "Metrics",
    description: "Performance, risk and factor metrics with sample dashboards.",
    href: "/services#metrics",
  },
];

/** The fourth mega-menu column. */
export const CAPABILITIES: NavLink[] = [
  { label: "Backtesting", href: "/services#research" },
  { label: "Econometrics", href: "/services#research" },
  { label: "Risk Analytics", href: "/services#analysis" },
];

/* =============================================================================
   Footer (stage 4)
   Same source of truth as the header, so the two never drift apart.
   ============================================================================= */

/** A footer link. `external` adds the arrow and opens in a new tab; `badge`
 *  renders the optional green pill (for example "NEW"). Neither is in use yet. */
export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface FooterGroup {
  /** Stable key, also the id suffix used by the `nav` -> heading label link. */
  id: string;
  heading: string;
  links: FooterLink[];
}

/**
 * Retained but no longer rendered. The footer's top "Ready to explore the lab?"
 * row was removed on client instruction, so nothing imports these two
 * constants any more; they are kept because brief section H still specifies the
 * row, and they record the label and the target if it is ever reinstated.
 */
export const FOOTER_HEADLINE = "Ready to explore the lab?";

export const FOOTER_CTA: NavLink = { label: "Contact us", href: "/contact" };

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    id: "home",
    heading: "Home",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    id: "services",
    heading: "Services",
    links: [
      { label: "Research", href: "/services#research" },
      { label: "Analysis", href: "/services#analysis" },
      { label: "Metrics", href: "/services#metrics" },
    ],
  },
  {
    id: "insights",
    heading: "Insights",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Learn", href: "/blog/learn" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    id: "legal",
    heading: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Copyright", href: "/copyright" },
    ],
  },
];

export type FooterSocialId = "github" | "x";

export interface FooterSocial {
  id: FooterSocialId;
  /** Accessible name for the icon-only link. */
  label: string;
  href: string;
}

/**
 * TODO(placeholder): both URLs are stand-ins. Replace them with the real
 * Quantmetrics profiles before launch. The marks in
 * src/components/brand/SocialIcons.tsx are placeholders too.
 */
export const FOOTER_SOCIALS: FooterSocial[] = [
  { id: "github", label: "Quantmetrics on GitHub", href: "https://github.com/quantmetrics-lab" },
  { id: "x", label: "Quantmetrics on X", href: "https://x.com/quantmetrics" },
];

export interface TrustMark {
  /** Accessible name for the cell; the artwork itself is decorative. */
  name: string;
  /** Public path of the mark, served from /public. */
  logo: string;
}

/**
 * The six cells of the home-page trust strip, in order.
 *
 * The artwork lives in /public/logo. It is painted in a single tone through
 * mask-image (see the mark-mask utility in src/app/globals.css), so no
 * component hard-codes a colour and the marks follow the active theme.
 *
 * TODO(placeholder): every entry below is a third-party trademark, and a strip
 * like this asserts a relationship. Nothing here is a claim of partnership or
 * endorsement. Replace each entry with a partner whose written permission has
 * been obtained, or delete the strip, before this page is public. Referenced
 * only from src/components/marketing/TrustStrip.tsx.
 */
export const TRUST_MARKS: TrustMark[] = [
  { name: "Trust Wallet", logo: "/logo/trustwallet-logo.png" },
  { name: "RootData", logo: "/logo/rootdata-logo.png" },
  { name: "MetaMask", logo: "/logo/metamask-logo.png" },
  { name: "Laqira", logo: "/logo/laqira-logo.png" },
  { name: "Binance", logo: "/logo/binance-logo.png" },
  { name: "S&P Global", logo: "/logo/sp500-logo.png" },
];

/** Shown above the legal bar on every page. */
export const FOOTER_DISCLAIMER =
  "Content is for research and education only and is not investment advice.";

/** \u00A9 is written as an escape so this file stays plain ASCII. */
export const FOOTER_COPYRIGHT = "\u00A9 Quantmetrics 2026 | All Rights Reserved";