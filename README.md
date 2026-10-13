# Quantmetrics-Lab — quantmetrics.online

AI-powered data-analysis and research lab for quantitative finance and econometric studies.

> Quantmetrics transforms market noise into clear, actionable insights.

Content on this site is for research and education only and is **not investment advice**.

---

## Status

| Stage | Scope | State |
| --- | --- | --- |
| 1 | Foundation: tokens, fonts, theming, layout primitives, `/styleguide` | done |
| 2 | Base UI components (buttons, chips, tabs, cards, stats, gradients, form controls) | done |
| 3 | Global header: navbar, Services mega menu, mobile accordion, mocked auth | done |
| 4 | Global footer: CTA row, hairline link grid, socials, legal bar | done |
| 5 | Home hero: gradient mesh, hero copy, stats strip, methods strip | done |
| 6b+ | Review round: hero copy, centred nav, stats + trust bands, styleguide additions | done |
| 6a | Home: "What you can do" capabilities grid + audience tabs | done |
| 6b | Home: feature trio, sample-data preview, latest briefs, analytics band | done |
| 7- | Review: footer rebuilt on the hairline grid, duplicate closing banner removed, band renamed | done |
| 7 | Services: dark hero, five-cell stats band, research / analysis / metrics, tag block, workflow tabs | done |
| 7+ | Review round: navbar hover box, Get started CTA, corner theme toggle, two-state buttons, footer ruled grid, supplied trust marks | done |
| 8+ | Blog, Insights, Contact, auth, About, Docs, legal, 404 | not started |

The home page carries the hero and its stats band, the trust strip, the capabilities grid, the
audience tabs, the Analyze/Visualize/Share trio, the sample-data preview, the latest-briefs row
and one closing teal-to-blue band. `/services` adds the dark hero with the wave artwork, the
five-cell stats band, the three service sections, the tag block and the workflow tabs.
`/styleguide` is a temporary internal page and is excluded from indexing.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

`next/font` fetches Newsreader, Inter Tight and JetBrains Mono at build time and self-hosts
them; the first `npm run build`/`npm run dev` after a clean `.next` needs network access.

## Folder structure

```
src/
  app/
    globals.css            # Tailwind import, @theme mapping, type scale, gradient/stat
                           #   utilities, base layer
    layout.tsx             # fonts, metadata, theme script, skip link, header, AuthProvider
    page.tsx               # home: hero + stats band, trust strip, capabilities, audience,
                           #   workflow, data preview, briefs, analytics band
    services/page.tsx      # stage 7: hero, stats band, research / analysis / metrics,
                           #   tag block, workflow tabs
    insights|blog|contact/page.tsx            # stage 3 placeholders (title only)
    auth/login|signup/page.tsx                # stage 3 placeholders
    about|docs|terms|privacy|copyright/page.tsx  # stage 4 placeholders (title only)
    blog/learn/page.tsx                          # stage 4 placeholder (title only)
    styleguide/
      page.tsx             # TEMPORARY token + component preview (both themes)
      TabsDemo.tsx         # client demo wiring TabBar to real tabpanels
  components/
    brand/                 # Glyph, Logo, SocialIcons (placeholder GitHub / X marks),
                           #   CapabilityIcons, AudienceIllustrations, FeatureIcons,
                           #   ServiceArtwork (wave backdrop + three service illustrations)
    layout/                # Container, Section, HairlineGrid, ThemeToggle, EyebrowChip,
                           #   SkipLink, Navbar, MegaMenu, MobileNav, AuthButton, Footer,
                           #   Reveal, PlaceholderPage (temporary)
    marketing/             # Hero, HeroBackdrop, TrustStrip, CapabilityGrid, AudienceTabs,
                           #   FeatureTrio, SampleDataPanel, LatestBriefs, AnalyticsBand
    services/              # ServiceHero, ServiceStatsBand, ServiceSection, TagBlock,
                           #   WorkflowTabs
    charts/                # PriceVolatilityChart (ECharts, code-split, token-driven)
    ui/                    # Button, Chip, TabBar, StatCell, Card, FeatureCard,
                           #   GradientBanner, Field, Input, Checkbox, KpiTile,
                           #   SplitArrowButton, BriefCard, icons
  lib/
    theme.ts               # theme resolution, storage, apply, inline init script
    auth.tsx               # AuthProvider + AuthAdapter seam (mock adapter)
    navigation.ts          # nav items, mega-menu cards, capabilities, footer data
    briefs.ts              # placeholder brief summaries for the home rail
    services.ts            # Services page content: stats, three sections, tag panels, workflow
    sample-series.ts       # seeded synthetic price/volatility series + KPI tiles
    chart-tokens.ts        # resolved design tokens for canvas charts (+ theme observer)
    color.ts               # withAlpha() for canvas area fills
    utils.ts               # cn() class joiner
  styles/
    tokens.css             # raw design tokens (dark + light)
```

`public/logo/` holds the six client-supplied trust-strip marks, served from `/logo/*` and painted
through a CSS mask. `public/` is otherwise empty and nothing is written to it at runtime.

Later stages add `components/article`, `components/auth`, `components/forms`,
`components/docs`, plus `src/content` (MDX) and `src/types`.

## Design tokens

`src/styles/tokens.css` holds the raw custom properties. `src/app/globals.css` maps them
into Tailwind's theme namespaces with `@theme inline`, so `bg-bg-elev` compiles to
`background-color: var(--bg-elev)` and utilities keep working across a theme switch.
**No component contains a raw hex value.**

### Surfaces and text

| Token | Dark (default) | Light |
| --- | --- | --- |
| `--bg` | `#0f0f0f` | `#fafaf7` |
| `--bg-elev` | `#161616` | `#ffffff` |
| `--bg-hover` | `#2b2b2b` | `#edede8` |
| `--line` | `rgba(255,255,255,0.14)` | `rgba(15,15,15,0.14)` |
| `--text` | `#ffffff` | `#0f0f0f` |
| `--text-muted` | `#a3a3a3` | `#5c5c5c` |
| `--text-dim` | `#6b6b6b` | `#8a8a8a` |

### Accents (identical in both themes)

`--teal #1fa57c` · `--teal-alt #22a085` · `--periwinkle #4a6fd4` · `--periwinkle-alt #3e5fc9`
· `--lavender-overlay rgba(120,150,225,0.65)` · `--coral #e8548a` · `--coral-alt #f07b6b`
· `--amber #f6c94c` · `--amber-alt #f0975a` · `--lilac #c9a5e8` · `--positive #22c58b`
· `--negative #f0597a`

### Derived surfaces, gradients and on-gradient text (stage 2)

| Token | Value | Used by |
| --- | --- | --- |
| `--fill-soft` | `color-mix(in srgb, var(--text) 8%, transparent)` | outline button hover |
| `--fill-faint` | `color-mix(in srgb, var(--text) 6%, transparent)` | footer link hover (stage 4) |
| `--gradient-teal-blue` | `linear-gradient(135deg, --teal, --periwinkle)` | FeatureCard, GradientBanner |
| `--gradient-pink-coral` | `linear-gradient(135deg, --coral, --coral-alt)` | FeatureCard, GradientBanner |
| `--gradient-sunset` | `linear-gradient(150deg, --amber, --coral, --coral-alt)` | brief cover, sunset variant (stage 6b) |
| `--on-gradient` / `--on-gradient-muted` | `#ffffff` / `rgba(255,255,255,0.82)` | text on gradient fills |
| `--on-gradient-dim` / `--on-gradient-line` | `rgba(255,255,255,0.62)` / `rgba(255,255,255,0.28)` | secondary copy and hairlines on a gradient |
| `--on-gradient-ink` / `--on-gradient-hover` | `#0f0f0f` / `rgba(255,255,255,0.16)` | ink for pills sitting on a gradient, plus their hover wash |
| `--mesh-blur` / `--grain-opacity` | `100px` / `0.04` | hero mesh blob softness and grain strength |
| `--surface-deep` | `#0f0f0f`, never overridden by the light block | the theme-invariant dark canvas of the Services hero |
| `--gradient-deep-halo` | two accent radial gradients (teal, periwinkle, `color-mix`) | the `deep-halo` utility behind the Services hero waves; identical in both themes |
| `--line-strong` | `rgba(255,255,255,0.5)` dark / `rgba(15,15,15,0.5)` light | The crisp, never-faded hairline for the hero stats band, the trust strip and the nav hover box. On-gradient it resolves to `--on-gradient-line-strong` (0.72 white). Raise it to `#ffffff` for literal pure white. |
| `--line-grid` | `rgba(255,255,255,0.3)` dark / `rgba(15,15,15,0.3)` light | The footer's ruled grid: outer frame, interior column dividers, title rule and links rule. Solid 1px at 30% alpha, measured off the reference footer. It flips with the theme, because a white hairline on the light canvas would be invisible. One knob: raise the alpha for a harder grid. |
| `--streak-width` / `--streak-blur` | `190px` / `30px` | vertical-streak pitch and softness, closing CTA banner (stage 6b) |
| `--streak-line` / `--streak-gap` | `rgba(255,255,255,0.24)` / `rgba(255,255,255,0)` | the streak colour and the transparent part of the repeat tile |
| `--gradient-streak-sunset` | a repeating vertical streak over `linear-gradient(105deg, --amber, --coral, --coral-alt)` | `gradient-streak-sunset` utility, closing CTA banner |

`--fill-*` resolve `--text` lazily, so they follow the theme of whichever subtree they are
in. Gradients are built only from accent tokens, so they are identical in both themes.
Browsers without `color-mix()` (pre-2023) get a solid `var(--text)` fallback emitted by the
build tooling; all current browsers get the specified 8% / 6% wash.

### Radii · spacing · containers · motion

| Group | Tokens |
| --- | --- |
| Radii | `--r-pill 9999px` · `--r-card 24px` · `--r-menu 0` · `--r-input 8px` · `--r-sm 4px` · `--r-row 20px` |
| Spacing | 8px base with a 4px half-step: `--space-0-5 4px`, `--space-1 … --space-20` (8 → 160px) |
| Containers | `--container-max 1530px` · `--gutter 16 → 24 → 32px` · `--section-y 96 → 128 → 160px` |
| Motion | `--ease-standard cubic-bezier(0.2,0.8,0.2,1)` · `--dur-hover 150ms` · `--dur-menu 180ms` · `--dur-base 250ms` · `--dur-fill 200ms` · `--dur-reveal 600ms` · `--dur-drift 26s` · `--dur-wave 22s` |
| Focus | `--focus-ring var(--periwinkle)` · `--focus-ring-width 2px` · `--focus-ring-offset 2px` |

**Spacing note.** `--spacing` is rebased from Tailwind's 4px default to `0.5rem`, so every
spacing utility is a multiple of 8px: `p-3` = 24px, `py-12` = 96px, `size-5` = 40px. The
half-step token covers the values that are not multiples of 8 and is available both as
`var(--space-0-5)` and as Tailwind's `0.5` step: `gap-0.5` / `py-0.5` = 4px, `h-6.5` = 52px,
`h-4.5` = 36px, `px-3.5` = 28px. That is how the 52px button, the 28px button padding and
the 4px arrow shift are expressed without arbitrary values. `--spacing-gutter` exposes the responsive `--gutter` on the same scale, so the header sits at the container edge with `inset-x-gutter` and the mega-menu panel uses the same value instead of an arbitrary inset.

## Typography

| Utility | Role | Spec |
| --- | --- | --- |
| `text-hero` | Hero | Newsreader 400, clamp 40 → 80px, 1.03, -0.02em |
| `text-h2` | Section/hero H2 | Newsreader, clamp 32 → 56px, 1.05 |
| `text-article-title` | Article title | Newsreader, clamp 32 → 48px, 1.08 |
| `text-section-heading` | Section heading | Newsreader, clamp 28 → 40px, 1.1 |
| `text-stat` | Stat number (stage 2) | Inter Tight 400, 40px/1.02 |
| `text-card-title` | Card title | Inter Tight 500, 28px/1.1 |
| `text-cell-title` | Capability cell title (stage 6a) | Inter Tight 500, 18px/1.35, -0.02em |
| `text-body` | Body | Inter Tight 400, 16px/1.6 |
| `text-body-lg` | Article body | Inter Tight 400, 18px/1.7 |
| `text-meta` | Card support copy | Inter Tight 400, 14px/1.4, muted |
| `text-mono-label` | Buttons, tabs, eyebrows, captions | JetBrains Mono 500, 13px, 0.08em, uppercase |

`text-mono-label`, `text-card-title`, `text-article-title`, `text-section-heading`,
`text-hero`, `text-h2` and `text-stat` deliberately set **no colour**, so they compose with
`text-text` / `text-text-muted` etc. without a specificity fight. `text-meta` does set the
muted colour; when a different colour is needed, wrap the text in a child element (as the
field messages and chips do) rather than stacking two colour utilities on one element.

## Theming

1. `src/lib/theme.ts` exports `themeInitScript`, an inline blocking script rendered as the
   first element of `<body>`. It resolves **stored choice → `prefers-color-scheme` → dark**
   and writes `data-theme` on `<html>` before anything paints, so there is no flash and the
   server HTML stays theme-agnostic.
2. `data-theme` is the single source of truth. The dark token block is attached to
   `:root, [data-theme="dark"]`, so a forced-theme wrapper inside either theme resolves
   correctly - that is what the styleguide uses to show both themes at once.
3. `ThemeToggle` reads the attribute through `useSyncExternalStore` (never owns it) and keeps
   following the OS until the visitor makes an explicit choice. It writes
   `localStorage["qm-theme"]` and dispatches `qm:themechange` on `window` so runtime-themed
   consumers (the ECharts panels, stage 6+) can re-read the tokens.
4. With JavaScript disabled the stylesheet falls back to dark, or to the OS preference via
   the mirrored `prefers-color-scheme` block in `tokens.css`.

### Previewing both themes at once

```tsx
<div data-theme="light" className="bg-bg text-text">
  {/* this subtree is forced to light, even inside a dark page */}
</div>
```

## Layout primitives

| Primitive | Purpose |
| --- | --- |
| `Container` | Centred column: `--container-max` + `--gutter`. |
| `Section` | Page band: container + section rhythm (`section-y`) + hairlines. Props: `grid` (columns, or `false`), `divider`, `spacing`. |
| `HairlineGrid` | Decorative blueprint grid: edge + column hairlines plus the horizontal section rule. `aria-hidden`, non-interactive. |
| `EyebrowChip` | Dashed mono pill above every section H2. |

## UI components

| Component | Variants / props | Notes |
| --- | --- | --- |
| `Button` | `variant`: primary · outline · text; `size`: default (52px) · compact (40px); `trailingArrow`, `loading`, `disabled`, `fullWidth`, `href` | Renders `next/link` when `href` is set, otherwise a real `<button>`. |
| `Chip` | `variant`: filter · tag; `active`, `href`, `onClick` | Filter chips are interactive with an active state; tags are static. |
| `TabBar` | `tabs`, `label`, `value`/`defaultValue`, `onChange`, `size` | `role="tablist"` with roving tabindex; pairs with consumer-rendered `role="tabpanel"`. |
| `StatCell` | `value`, `caption`, `variant`: plain · lavender, `align` | 40px sans number over a mono caption. |
| `Card` | `padding`: default (32px) · tight (24px) · none; `interactive` | 24px radius, elevated surface. |
| `FeatureCard` | `title`, `description`, `icon`, `variant`: teal-blue · pink-coral, `active` | Gradient fill on hover / focus-within; `active` forces it. |
| `GradientBanner` | `variant`: teal-blue · pink-coral · sunset; `radius`, `sheen` | Identical gradient in both themes; text uses the on-gradient tokens. |
| `Field` | shell + `controlClasses()` + `fieldMessageId()` | Label, hint, error and success in one place, with the ARIA wiring. |
| `Input` | `type` text · email · search · password · number; `variant`: default (8px) · search (4px, `--bg-hover` fill); `size`, `state` | `error` / `success` props also drive the state automatically. |
| `Textarea` / `Select` | same field props; `Select` renders a custom chevron | `Textarea` is 96px minimum height, resizable. |
| `Checkbox` | `label`, `description`, `hint`, `error`, `success`, `disabled` | Native control tinted with `accent-color: var(--text)`. |
| `KpiTile` | `label`, `value`, `delta`, `trend`: up · down · flat, `caption` | 40px sans stat, mono label and caption. The delta is the only `--positive` / `--negative` use. |
| `SplitArrowButton` | `href`, `aria-label` | Outlined mono pill whose arrow sits in its own `border-l` cell; hover shifts the arrow 4px. |
| `BriefCard` | `title`, `excerpt`, `category`, `date`, `href`, `coverTitle`, `variant`: teal-blue · pink-coral · sunset | 24px radius, the whole surface is one link; the cover scales 1.03 on hover. |

## Global header (stage 3)

`Navbar` is fixed, floats inside the container and is 52px tall (`h-6.5`), lifted 24px off the
top edge (`pt-3` on the container) so the hero still runs behind it. The bar is a **full pill**
(`rounded-pill`), so both ends are round: the white logo pill caps the left end and the
"Get started" CTA caps the right one. The primary nav is **absolutely centred** on the bar's axis
(`absolute left-1/2 -translate-x-1/2`), so it stays centred whatever the logo and the right-hand
cluster measure. The right cluster runs, left to right: Login, Sign up, "Get started" and - below
`min-[1620px]` only - the theme toggle. Login and Sign up are plain text links that take the same
hover box as the nav links.

The theme toggle is 52px tall wherever it appears. From `min-[1620px]` up it is mounted from
`src/app/layout.tsx` as a corner toggle at `fixed right-4 top-3`, sitting in the page gutter
outside the bar entirely. Below that width the bar's right edge reaches the viewport corner, so a
corner toggle would land on top of the "Get started" pill; there the toggle stays in the bar
(pulled 1px right with `-mr-px`, so its border lands on the bar's own border) and the corner one
is `hidden`. Below `lg` both are out of the way and the mobile menu carries its own toggle.

| Behaviour | Implementation |
| --- | --- |
| Transparent over heroes | `HERO_ROUTES` in `Navbar.tsx` (`/`, `/services`) keep the bar transparent with a thin tinted hairline while `scrollY <= 24`. `GRADIENT_HERO_ROUTES` (`/` today) also switch the bar to the on-gradient tone, so the nav links and the logo pill stay readable on the mesh in light theme; both revert at 24px. |
| Scrolled state | Past 24px the bar gets `bg-bg/60` + `backdrop-blur-md` (12px) + a `--line` border. Scroll position comes from `useSyncExternalStore`, so no state is written inside an effect. |
| Nav item box | Every entry in the bar - the five links, the Services trigger, Login and Sign up - carries a 1px left/right `--line-strong` box that is transparent at rest and appears on hover and on keyboard focus only. Clicking navigates away and the box leaves with the pointer, so no item stays boxed. The borders are always present, so the row never shifts. |
| Current page | Marked for assistive technology with `aria-current="page"` and deliberately **not** boxed, so the "open menu item" shape is reserved for hover and for the open Services trigger. |
| Right-hand CTA | "Get started" (`Button variant="navCta"`, 52px mono pill linking to `/auth/signup`): outlined and transparent at rest, then a solid inverted pill on hover - white with dark ink in the dark theme, and the reverse in light. Hidden while signed in, like Sign up. |
| Mega menu | Sharp-cornered panel, the same width as the bar, attached with `absolute inset-x-0 top-full`. Three cards (28px title, 14px muted copy, 4x4 dot grid bottom-left) plus the Capabilities column (84px rows, 18px labels, hairline separators). |
| Page behind | A `fixed inset-0 -z-10 bg-bg/40 backdrop-blur-md` overlay inside the header's stacking context, so the bar and panel stay crisp. It also closes the menu on outside click. |
| Open / close | Opens on hover after 120ms, on click, and on `ArrowDown`; closes on `Escape` (focus returns to the trigger), outside click, mouse-leave (180ms) and any navigation. `aria-expanded` / `aria-controls` / `aria-haspopup` are wired; `ArrowDown` moves focus to the first card. |
| Route-change close | The open state stores the route it opened on (`openFor === pathname`), so navigating closes the menu without an effect. |
| Mobile (<=1024px) | Logo + hamburger opens a full-screen accordion (`role="dialog"`, `aria-modal`), Services nested, theme toggle and auth inside. Body scroll is locked and Tab is trapped; crossing the breakpoint closes it. |
| Auth | `AuthProvider` + the `AuthAdapter` seam in `src/lib/auth.tsx`; the mock adapter keeps a placeholder session in localStorage. Swap the adapter for a real provider - the header only knows `user` / `login` / `logout`. Initials come from `initialsFromName`. |
| Skip link | `SkipLink` is the first focusable element and targets `#main` in the root layout. |

Conventions for later stages:

- Add a route to `HERO_ROUTES` when it opens with a gradient or dark hero; the bar then floats
  transparent over it.
- Non-hero pages add their own top padding (`pt-16` = 128px clears the 52px bar). `html` carries
  `scroll-padding-top: 72px` so anchors such as `/services#research` are not hidden behind the bar.
- `/services#research`, `#analysis` and `#metrics` currently land on the placeholder route; the
  anchors arrive with the real Services page.

## Global footer (stage 4)

`src/components/layout/Footer.tsx`, rendered from the root layout so it appears on every page.
Every string and link lives in `src/lib/navigation.ts` next to the header data.

| Part | Detail |
| --- | --- |
| Landmark | A `<footer>` sibling of the page's `<main>`. Each link group is its own `<nav aria-labelledby>` pointing at the id of its mono heading. |
| Frame | The grid wrapper carries a `border` on all four sides, so the ruled grid is closed at its left, right, top and bottom edges. Every rule comes from `--line-grid`: solid, never faded, never masked. |
| Grid | Five equal parts at `lg` - the logo cell, then HOME, SERVICES, INSIGHTS, LEGAL - two at `md`, one below. Every part but the last carries `lg:border-r`, which is what draws the four interior dividers (including the one between the logo cell and HOME). At `md` the logo cell spans both columns, so the divider is drawn after the first and the third link column. Below `lg` the parts stack and only the outer frame is kept. |
| Title rule | One horizontal hairline separates the part titles from their link rows. Each labelled part draws its own `border-t`, so the four segments form a single unbroken line from the first part to the right-hand frame, and it never crosses the logo cell - matching the reference footer. |
| Link row | The full width of its part (`w-full`, no outer margin, so it meets the part's hairlines), 44px tall (`h-5.5`), 1px `--line` border, 20px radius (`rounded-row`), 14px text at full contrast, stacked with a 1px gap (`gap-px`) so consecutive rows touch. Hover adds only the background wash: `--fill-faint` (6% of `--text`). |
| Socials | GitHub and X: a 24px glyph inside a 40px circular 1px-bordered button (`size-5`), hover fills `--bg-hover`. Icon-only with an `aria-label`, opening in a new tab. |
| Optional link extras | `FooterLink.external` adds the arrow glyph plus `target="_blank"`; `FooterLink.badge` renders the green "NEW" pill. Both are wired but unused so far. |
| Legal bar | Muted disclaimer line, then the copyright line, both centred. |
| Sticky bottom | `body` is a `min-h-dvh` flex column and the `#main` wrapper is `flex-1`, so the footer sits at the bottom of short pages. |

**Placeholder social links.** `FOOTER_SOCIALS` carries `TODO(placeholder)` URLs
(`https://github.com/quantmetrics-lab`, `https://x.com/quantmetrics`) and
`src/components/brand/SocialIcons.tsx` holds simplified placeholder marks. Swap both for the real
profiles and the official brand assets before launch.

**Footer row radius.** The 20px radius is the `--r-row` token, mapped to `rounded-row` in
`globals.css`, so the footer carries no arbitrary radius. The only bracketed values left in the component layer are token references (`duration-[var(--dur-hover)]`), brief-specified literals (`-0.02em` tracking, `0.98` press scale, `3px` underline offset) and `ch` text measures.

**Final review round** (references: `docs/sample-screenshots-of-dune/sample-home-page-footer.png`
and the client's marked-up `home-page-footer-problems copy.png`). The top "Ready to explore the
lab?" row and its "Contact us" pill were **removed**, and the grid was reworked into the ruled
structure the reference draws:

- the wrapper now carries a border on all four sides, so the grid has an outer frame;
- the interior dividers moved from `border-l` on the labelled parts to `border-r` on every part
  but the last, so all four dividers exist - the logo/HOME one included;
- the links row got its own `border-b`, so a single rule separates the columns from the legal row;
- every rule now comes from `--line-grid` (solid, 1px, 30% alpha) instead of `--line-strong`, so
  the grid is quieter than the hairline bands above it, as in the reference;
- measured at 1920: a 1466px frame from x = 227 to x = 1693, a 293px logo cell, four 293px
  columns, dividers at x = 521 / 814 / 1106 / 1399, and one 1px rule under the links row.

`FOOTER_HEADLINE` and `FOOTER_CTA` are kept in `src/lib/navigation.ts` but nothing imports them
any more. Brief section H still specifies that row, so they are retained rather than deleted.

## Home hero (stage 5)

`src/app/page.tsx` renders `<Hero />` then `<TrustStrip />`. The hero is the first element in the
document, so the fixed header floats over the mesh rather than sitting above it.

| Part | Detail |
| --- | --- |
| Backdrop | `HeroBackdrop` is a CSS/SVG-only mesh: the `gradient-teal-blue` base plus four `mesh-blob` layers (teal top-left, periwinkle centre and lower-right, lilac upper-right) softened with `--mesh-blur` (100px, inside the 80-120px band) and drifted over `--dur-drift` (26s). Negative `animation-delay` values desynchronise the blobs. |
| Grain | `grain-overlay`: an inline `feTurbulence` SVG at `--grain-opacity` (4%), so the hero ships no bitmap. |
| Theme invariance | The mesh reads only accent tokens, so it is identical in dark and light. Hero copy sits inside `on-gradient-tone`, which re-points `--text`, `--text-muted`, `--text-dim`, `--line` and `--bg` for that subtree. |
| Headline | `text-hero` (Newsreader, clamp 40-80px) as two `block` spans: "Sync With The Market's" white, "True Rhythm" at 60% opacity - the brief second-line trick. Below `sm` each span wraps, so the three visual lines are white / white / 60%. |
| Sub-headline | `text-card-title` (Inter Tight, 28px) as two explicit `block` spans, so it is exactly two centred lines from `sm` up. |
| Calls to action | One primary pill, "Explore the lab", linking to `/services` with the trailing arrow. The secondary text link was removed in the review round. |
| Stats strip | A **full-bleed** translucent lavender band (`bg-lavender` on the band, not the cells) closed by `border-y border-line-strong`, so both rules run past the container to the viewport edges. Three equal `StatCell`s at `layout="inline"` (40px sans number with the mono label on the same baseline), `shape="square"`, each carrying `border-x border-line-strong` plus `-ml-px` so the vertical rules run the full band height, mark the container edges and never double up. Below `sm` the strip becomes a horizontal snap scroller. |
| Reveal | `Reveal` wraps the copy: opacity 0 to 1 and translateY(16px) to 0 over `--dur-reveal` (600ms). |
| Trust strip | `TrustStrip`: a full-bleed band flush under the stats strip. It carries `border-t` + `border-b border-line-strong`, so the stats band and the strip share one hairline; every cell carries `border-l border-line-strong` and the list carries the right one, so the verticals stay continuous as the grid goes 2 -> 3 -> 6 columns. The cell is 96px tall (`h-12`), measured off the reference band (about 94px). |
| Trust marks | The six client-supplied PNGs in `public/logo/` are painted through the `mark-mask` utility - a CSS mask filled with `currentColor` - so one tonal treatment covers every mark and both themes. The artwork is stored white only, and a plain `<img>` would therefore disappear on the light canvas. Each mark is 40px tall at 60% opacity, full opacity on hover. |
| Metadata | `page.tsx` sets the home title and a research/education description that states the content is not investment advice. |

### Scroll reveal

`src/components/layout/Reveal.tsx` is a client component used by the hero and available to every
later section. The hidden state (`opacity: 0; transform: translateY(16px)`) is scoped to
`html.js .reveal` in `globals.css`, so a no-JS visitor or a crawler always sees the content; the
root layout appends `jsFlagScript` to the theme script, which sets that class before first paint.

Content already inside the viewport at mount (the hero) is revealed on the next tick instead of
waiting for an `IntersectionObserver` callback, so above-the-fold copy can never be left hidden.
Anything further down is observed (threshold 0.1, `-8%` bottom root margin) and revealed once.
`prefers-reduced-motion: reduce` skips straight to the visible state.

## Home - capabilities and audience (stage 6a)

Both sections use the same self-contained hairline pattern as the hero's stats band: the
`Section` has `grid={false}` and the bordered grid is drawn by the section itself, so the cell
borders meet exactly and the outer frame stays a single hairline.

| Part | Detail |
| --- | --- |
| Eyebrow + H2 | `CAPABILITIES` / `AUDIENCE` dashed `EyebrowChip` over a centred serif `text-h2`. Copy is original and makes no performance claim. |
| Capability grid | Six cells - Research Lab, Data Analytics, Intelligence Briefs, Insights, Tutorials, Risk Analytics - in a 3-column grid that drops to 2 at `md` and 1 below. Each cell is a `next/link` (`/services#research`, `/services#analysis`, `/insights`, `/insights`, `/blog`, `/services#metrics`) holding an 18px `text-cell-title`, a 14px muted line and a 48px outlined icon box pinned top-right. |
| Cell height | `min-h-15` (120px), the measured reference cell height (~119px); rows stretch to the tallest cell, so a two-line description grows only its own row. |
| Cell hover | The whole cell washes to `--bg-hover` over `--dur-hover` (150ms) and the icon box and glyph rise to `--text`. `focus-visible` applies the same wash, so keyboard focus reads like hover. |
| Icons | `components/brand/CapabilityIcons.tsx`: six original 24px glyphs sharing one 1.5px `currentColor` shell. |
| Audience tabs | The stage 2 `TabBar` (RESEARCHERS / TRADERS / NEWCOMERS) wired to real `role="tabpanel"` regions; the bar is wrapped in a horizontal scroller so the three labels stay on one line on a narrow screen. |
| Audience cards | Three `h-42.5` (340px) cells per tab in a hairline grid (3 columns, 1 below `md`). Each holds a centred isometric illustration, a 28px `text-card-title` and a 14px muted line. |
| Card hover | A `--gradient-teal-blue` overlay fades in over `--dur-fill` (200ms) behind the copy; the title, description and illustration switch to the `--on-gradient*` tokens. |
| Illustrations | `components/brand/AudienceIllustrations.tsx`: nine original isometric line drawings on one shared projection. Every shape is coordinate-fitted (`frame()`) into the same box, so the stroke stays exactly 1.5px at any size. |
| Reveal | Eyebrow + H2, the grid and the CTA are separate `Reveal` wrappers, so they fade and rise in sequence and stay visible with `prefers-reduced-motion`. |

`FeatureCard` was not reused for the audience cards, although the brief allowed it: it carries a
24px radius and its own border, which cannot compose into a shared-hairline grid. The fill uses
the same `--gradient-teal-blue` token it does.

The only value here that is not already a token is the `min-h-15` (120px) capability-cell step,
which is on the existing 8px scale.

## Home - feature trio, preview, briefs and bands (stage 6b)

`src/app/page.tsx` renders these four sections in brief order after the audience tabs:
`FeatureTrio`, `SampleDataPanel`, `LatestBriefs`, `AnalyticsBand`. Each one is a
`Reveal`-wrapped `Section`, except the full-bleed band, so they fade and rise in sequence
and stay visible under `prefers-reduced-motion`.

| Section | Detail |
| --- | --- |
| Analyze / Visualize / Share | `FeatureTrio` (`id="workflow"`). Three 24px-radius `FeatureCard`s with `variant="pink-coral"`, so the hover state is exactly the brief's pink-to-coral fill plus the soft blurred glow; the copy and the three original thin-line icons (`components/brand/FeatureIcons.tsx`) switch to the `--on-gradient*` tokens on hover. |
| Data preview | `SampleDataPanel` (`id="preview"`). One `rounded-card` panel holding the chart, a dashed "Sample data" chip and three `KpiTile`s under a `border-t` rule. |
| Chart | `PriceVolatilityChart` is a client component. ECharts is imported inside the effect (`echarts/core` + `charts` + `components` + `renderers`), so the library is code-split out of the initial bundle. Two series on two scaled axes: sample price (teal, gradient area fill) and 20-day annualised volatility (periwinkle). Mono axis labels, `--line` split lines, a themed tooltip with `--r-input` corners. `role="img"` plus an aria-label. |
| Chart theming | A canvas cannot inherit custom properties, so `lib/chart-tokens.ts` resolves the tokens it needs and watches `data-theme` with a `MutationObserver`, plus the `prefers-color-scheme` media query. `setOption(option, true)` replaces the option outright on every token change, so no colour from the previous theme survives. Colours reach the canvas already resolved; the translucent area fill is derived with `withAlpha()` rather than a second hard-written colour. |
| Chart responsiveness | The label density and the grid gutters follow the measured panel width (`ResizeObserver`), so a wide panel keeps a six-label rhythm and a 390px panel drops to four evenly spaced labels instead of overlapping. |
| Sample data | `lib/sample-series.ts` builds the series with a seeded `mulberry32` PRNG over a geometric price path; the same seed on the server and the client means no hydration drift. The KPI values are derived from that series. Everything is labelled synthetic three times - the "Sample data" chip, the section copy and the caption under the panel. |
| Latest briefs | `LatestBriefs` (`id="briefs"`), three `BriefCard`s from `lib/briefs.ts` plus an outline "View all briefs" pill to `/insights`. Dates read "Placeholder · 28 Sep 2026" and the copy is illustrative only. |
| Analytics band | `AnalyticsBand` is a full-bleed `GradientBanner variant="teal-blue" radius="none"` carrying the serif H2 "Turn Market Noise Into Insights", a line of support copy and a `SplitArrowButton` ("Request access", arrow in its own divided cell) to `/services`. |
| Only one closing band | The stage 6b sunset `CtaBanner` was **deleted** in the stage 7 review: it repeated the same closing message on a second full-bleed banner. The teal-to-blue band is now the single close, and it sits directly above the footer, as in the reference layout. `--gradient-streak-sunset` and the `--streak-*` tokens are left in `tokens.css` (marked unused) rather than removed, so the streak treatment can be reused without a new token round. |
| Review round | Hero copy replaced, the secondary CTA removed, the stats strip made full-bleed and inline, `LogoStrip` replaced by `TrustStrip`, and the navbar reworked (centred nav, 12px top offset, Login | Sign up | sun order with the sun capping the pill). `KpiTile`, `SplitArrowButton` and `BriefCard` were added to `/styleguide`. |
| Stage 7 review | The three-band close was reduced to one, and the footer was rebuilt on the hairline grid (see "Global footer"). |

## Services page (stage 7)

`src/app/services/page.tsx`, with all copy in `src/lib/services.ts`. Five blocks, in brief order.

| Block | Detail |
| --- | --- |
| Hero (`ServiceHero`) | A dark band: `bg-surface-deep`, the theme-invariant `#0f0f0f` canvas, so it stays dark in light theme too, under `deep-halo` (two accent radial gradients) with the 4% grain layer. `on-gradient-tone` re-points the text, hairline and button tokens, which is what turns the primary `Button` into the white pill and gives the eyebrow and hairlines their on-gradient values without a single override. Serif H1 "The Quantmetrics Lab", the summary, and a "Request access" pill to `/contact`. |
| Wave artwork (`WaveArtwork`) | Six generated sine lines on a 1200x640 viewBox, stroked in `currentColor` (`text-periwinkle`) at 1.5px with `preserveAspectRatio="xMidYMid slice"`, so the lines fill the band edge to edge instead of letterboxing inside it. Each line is drawn twice: a quiet solid base, then a dashed highlight whose `stroke-dashoffset` streams through the `wave-flow` utility over `--dur-wave` (22s). Every dash and gap sums to the normalised `pathLength` of 1200, so the loop closes with no seam, and `prefers-reduced-motion` stops the stream. |
| Stats band (`ServiceStatsBand`) | Five square `StatCell`s on the lavender band with `--line-strong` dividers - the same blueprint language as the hero strip. Below `md` the strip scrolls horizontally. The five figures are placeholders (see "Content and legal"). |
| Service sections (`ServiceSection` x3) | One bordered two-column block each: eyebrow, serif heading, summary, a hairline method list (`text-mono-label` label beside a `text-meta` body) and an outline pill on one side, the matching thin-line artwork on `bg-bg-elev` on the other. The block ids are the deep-link anchors `#research`, `#analysis` and `#metrics` that the header mega menu points at. The Analysis block sets `visualFirst`, which swaps `lg:border-l` for `lg:order-first` plus `lg:border-r`, so exactly one side border is ever emitted and the hairline can never double up. |
| Section artwork | `components/brand/ServiceArtwork.tsx`: original 1.5px `currentColor` line drawings on one shared 320x180 frame - a cumulative curve with a benchmark and a drawdown strip (research), an observations-plus-fitted-line scatter with the residuals left visible (analysis), and a metric panel with bars, a target line and a readout table (metrics). |
| Tag block (`TagBlock`) | The large serif heading on the left; two `rounded-card` panels on the right (`bg-bg-elev`, then `bg-bg-hover` as the brief specifies) holding dashed mono `Chip`s: GARCH, EGARCH, GJR-GARCH, VAR, VECM, COINTEGRATION, REGIME DETECTION, MONTE CARLO, WALK-FORWARD, then the method tags. |
| Workflow tabs (`WorkflowTabs`) | `id="workflow"`. A client component wiring `TabBar` to four real tabpanels - DATA, MODEL, VALIDATE, REPORT - with the roving tabindex, the arrow-key model and the inverted-pill active state that `TabBar` owns. Each panel is a two-column layout: the step explanation beside a hairline detail list. |

**Anchor offset.** No per-section offset is needed: `html { scroll-padding-top }` in `globals.css`
already keeps `#research`, `#analysis`, `#metrics` and `#workflow` clear of the fixed header.
Measured at 1920: `/services#metrics` lands the block 56px from the top of the viewport, with the
block's own 24px padding below that, so the heading sits under the bar rather than behind it.

**Header change.** `/services` was added to the navbar's dark-hero route list in
`src/components/layout/Navbar.tsx` (the constant was renamed `GRADIENT_HERO_ROUTES` ->
`DARK_HERO_ROUTES`, because the Services hero is a dark canvas rather than a mesh). The comment in
that file already anticipated the change. Without it the bar would keep the theme's dark text in
light theme and be near-invisible over the dark hero.
## Interaction states
Every interactive element gets a **2px periwinkle focus ring at 2px offset** through the
global `:focus-visible` rule in `globals.css`.

| Element | Hover | Active / selected | Focus | Disabled |
| --- | --- | --- | --- | --- |
| Button · primary | solid inverted pill at rest; on hover, on keyboard focus and while pressed it opens into the outlined pill whose arrow sits behind a full-height rule, and the arrow shifts 4px right | `scale(0.98)` | ring | opacity 40%, pointer-events none |
| Button · nav CTA | outlined and transparent at rest; hover fills solid `--text` with `--bg` ink | `scale(0.98)` | ring | - |
| Button · outline | border → `--text`, fill → `--fill-soft` (8%) | `scale(0.98)` | ring | opacity 40% |
| Button · text | colour → `--text-muted`; 3px underline offset | `scale(0.98)` | ring | opacity 40% |
| Button · loading | - | - | ring | spinner + `aria-busy`, interaction blocked |
| Chip · filter | border → `--text`, text → `--text` | inverted pill (`--text` / `--bg`), `aria-pressed` | ring | - |
| TabBar | text → `--text` | inverted pill, `aria-selected`, roving tabindex | ring + Left/Right/Home/End | - |
| Card · interactive | border → `--text` 40%, background → `--bg-hover` | - | ring when it wraps a link | - |
| FeatureCard | gradient fill fades in over 250ms + blurred glow, text → `--on-gradient` | `active` forces the same state | focus-within matches hover | - |
| Input / Textarea / Select | - | focus border → `--periwinkle` (error → `--negative`, success → `--positive`) | ring | opacity 40%, not-allowed cursor; read-only keeps the default cursor |
| Checkbox | - | checked via `accent-color` | ring | opacity 40% |
| ThemeToggle | background → `--bg-hover` | `aria-pressed` reflects the dark state | ring | - |
| ThemeToggle (navbar size) | background → `--bg-hover` | 52px circle, flush with the bar's right cap; 22px glyph | ring | - |
| Nav link | text → `--text` **and** the 1px left/right `--line-strong` box, which clears again as soon as the pointer leaves | nothing - the current page is marked with `aria-current="page"` but is never boxed | ring (same box) | - |
| Nav trigger (Services) | opens after 120ms; text → `--text` | `aria-expanded`, chevron flips 180deg, 1px left/right box | ring; `ArrowDown` opens and focuses the first card | - |
| Mega-menu card | background → `--bg-hover` (180ms), dot grid cross-fades into the node icon, circled arrow appears | - | ring + the same fill via `focus-visible` | - |
| Capabilities row | background → `--bg-hover`, text → `--text` | - | ring | - |
| Capability cell (home) | cell washes to `--bg-hover` (150ms), icon box and glyph → `--text` | - | ring (same wash via `focus-visible`) | - |
| Audience card | 200ms fading `--gradient-teal-blue` fill, copy and illustration → `--on-gradient` | - | ring | - |
| Hamburger / close | background → `--bg-hover` | `aria-expanded` reflects the dialog | ring; the dialog traps Tab and locks body scroll | - |
| Footer link row | background → `--fill-faint` (6%); text stays at full contrast | - | ring | - |
| Footer social icon | background → `--bg-hover` | - | ring | - |
| Auth login / logout | text → `--text` | avatar shows the user initials | ring | Login is disabled while the session resolves |
| Navbar over a dark hero | on-gradient tone while unscrolled (home mesh and the Services dark hero), then theme colours past 24px | - | - | - |
| Corner theme toggle | hover fills `--bg-hover` | `aria-pressed` reflects dark mode | ring | - |
| Trust strip cell | mark 60% to 100% opacity; the mark is painted in `currentColor`, so it follows the active theme | - | - | - |
| Feature trio card | pink-to-coral gradient fill plus blurred glow, copy and icon to `--on-gradient` | `active` forces the same state | focus-within matches hover | - |
| KPI tile | - | - | - | - |
| Brief card | border to `--text` 40%, cover scales 1.03, title underlined | - | ring (the whole card is the link) | - |
| Split arrow button (Request access) | solid inverted pill at rest; hover and press open the outlined pill with the arrow's divided cell, and the arrow shifts 4px | `scale(0.98)` | ring | - |
| Chart panel | tooltip follows the pointer | - | - | - |
| Service section card | no card-level hover, so the hairline frame stays quiet; the outline pill inside carries the button hover | - | ring | - |
| Service artwork | decorative (`aria-hidden`); the wave stream runs on regardless | - | - | - |
| Workflow tabs | text to `--text` on the inactive tabs | inverted pill, `aria-selected`, roving tabindex, `hidden` on the other panels | ring on the tab and on the panel; Left/Right/Home/End | - |
| Wave artwork | `stroke-dashoffset` streams over `--dur-wave` (22s); frozen under `prefers-reduced-motion` | - | - | - |
| Scroll reveal | 600ms fade plus a 16px rise on first intersection | - | - | - |
`prefers-reduced-motion: reduce` collapses every animation and transition to 0.01ms.

## Content and legal

- Statistics, logos and testimonials are placeholders throughout. The client-supplied hero
  figures and the six trust-strip marks are laid out as final but are **unverified**; each one
  needs confirming against real records or written permission before launch (see the
  `TODO(placeholder)` notes in `Hero.tsx` and `lib/navigation.ts`). The trust-strip artwork is
  third-party trademark material supplied by the client and stored in `public/logo/`; nothing in
  the strip asserts a partnership.
- Legal pages (`/terms`, `/privacy`, `/copyright`) ship marked **DRAFT — for lawyer review
  before launch**.
- The footer carries the "not investment advice" disclaimer site-wide, repeated on
  Insights/brief pages.
- The footer's social links and marks are placeholders (see the stage 4 section above).
- The trust strip now renders the client-supplied **logo artwork**, so all six marks must be confirmed in writing or removed before launch - a logo wall on a financial site reads as an endorsement even when no wording claims one. The artwork is painted through a CSS mask in `currentColor` (see `mark-mask` in `src/app/globals.css`), which is also what keeps it visible on the light canvas. See the `TODO(placeholder)` on `TRUST_MARKS` in `src/lib/navigation.ts`.
- The hero stats band and the preview KPIs are **client-supplied placeholders pending verification** (`HERO_STATS` in `Hero.tsx`, `SAMPLE_METRICS` in `lib/sample-series.ts`). They are laid out as final but are not measured figures; confirm or replace them before launch.
- The home preview chart and its three KPI tiles are drawn from a seeded **synthetic** series, labelled "Sample data" in the panel, in the section copy and in the caption. They are not market data, not a backtest and not a performance claim.
- The three briefs on the home page are placeholder entries with "Placeholder" dates; nothing in them states a figure.
- The Services stats band figures (`SERVICE_STATS` in `src/lib/services.ts`) are placeholders on the same footing as `HERO_STATS`: laid out as final, not measured, and to be confirmed or removed before launch.
- The Services page makes no performance claim. Its copy describes methods and process, and the "Sample dashboards" item is explicitly about sample data.