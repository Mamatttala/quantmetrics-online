# Quantmetrics Project Context

## 1. Project Overview
- Quantmetrics-Lab (quantmetrics.online) is an AI-powered data-analysis and research lab for quantitative finance and econometric studies. It turns market noise into clear, actionable insights. All content is research and education only, never investment advice.
- Development stage: foundation and marketing surfaces are built. Done: Stage 1 tokens/theming/styleguide, Stage 2 base UI, Stage 3 header, Stage 4 footer, Stage 5 home hero, Stage 6a home capabilities + audience tabs, Stage 6b home feature trio / sample data / latest briefs / analytics band, Stage 7 Services page, plus several review rounds.
- Not started (Stage 8+): Blog, Insights, Contact, auth, About, Docs, legal pages, 404. These routes currently render placeholders.

## 2. Tech Stack
- Framework: Next.js 16.4 (App Router, Turbopack) with React 19.3 and TypeScript 5.
- Styling: Tailwind CSS v4 via the `@tailwindcss/turbopack` plugin. CSS-first, so there is no `tailwind.config.ts`; the theme is mapped in `src/app/globals.css` (`@theme inline`).
- Charting: ECharts 6. Fonts are self-hosted through `next/font`: Newsreader (display), Inter Tight (sans), JetBrains Mono (mono).
- Tooling: ESLint 9 (`eslint-config-next`); scripts `dev`, `build`, `start`, `lint`, `typecheck`.

## 3. Directory Structure (Key Folders Only)
- `src/app/`: routes `/` (home) and `/services`; `/styleguide` (temporary internal); placeholders for `/about`, `/insights`, `/blog`, `/blog/learn`, `/contact`, `/docs`, `/terms`, `/privacy`, `/copyright`, `/auth/login`, `/auth/signup`. Plus `layout.tsx` and `globals.css` (Tailwind entry).
- `src/components/`: `layout/` (Navbar, MegaMenu, MobileNav, Footer, Section, Container, HairlineGrid, ThemeToggle, Reveal), `marketing/` (Hero, HeroBackdrop, TrustStrip, CapabilityGrid, AudienceTabs, SampleDataPanel, LatestBriefs, AnalyticsBand), `services/` (ServiceHero, ServiceStatsBand, ServiceSection, TagBlock, WorkflowTabs), `brand/` (Logo, Glyph, icons, artwork), `ui/` (buttons, chips, cards, tabs, stats, form controls), `charts/` (PriceVolatilityChart).
- `src/lib/`: utilities, tokens and sample data: `theme.ts`, `auth.tsx`, `navigation.ts`, `services.ts`, `briefs.ts`, `sample-series.ts`, `chart-tokens.ts`, `color.ts`, `utils.ts`.
- `src/styles/`: `tokens.css` (raw design tokens), imported by `globals.css`.

## 4. Design System & Critical UI Rules
- Source of truth is `src/styles/tokens.css`; dark is the default (`:root`), light overrides via `[data-theme="light"]` with a `prefers-color-scheme` no-JS fallback. Components must use mapped Tailwind utilities (`bg-bg-elev`), never hard-coded values.
- Surfaces: `--bg`, `--bg-elev`, `--bg-hover`, and `--surface-deep` (theme-invariant near-black for the Services hero).
- Hairlines: `--line` (soft), `--line-strong` (crisp, full-length blueprint line; never faded or masked, runs edge-to-edge into the corners), `--line-grid` (1px at 30% for ruled grid frames).
- Text levels: `--text`, `--text-muted`, `--text-dim`.
- Accents (identical in both themes): teal, periwinkle, coral, amber, lilac, plus positive/negative. Gradients are built only from accent tokens; `--on-gradient*` is the only literal white.
- Layout: 8px spacing base, 1530px container, gutters 16 to 24 to 32px, card radius 24px. Hover 150ms, card gradient fill 200ms, ease cubic-bezier(0.2, 0.8, 0.2, 1). The inline theme script sets `data-theme` before first paint (no flash).
- Typography: Newsreader display serif, Inter Tight UI sans, JetBrains Mono mono; responsive clamp scale (`text-hero`, `text-h2`, `text-article-title`) with tight negative tracking on display sizes.

## 5. AI Interaction Rules (STRICT)
- NEVER take screenshots or upload images.
- NEVER output entire files unless explicitly requested. Show only changed code blocks.
- ALWAYS keep responses under 400 words.
- ALWAYS update this `CONTEXT.md` file at the end of every completed task with a "Recent Changes" log.

## 6. Pending / Next Steps

## Recent Changes
- 2026-10-13: Created `CONTEXT.md` (initial project memory).
