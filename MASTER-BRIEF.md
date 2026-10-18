Prompt 0: Load the brief (no building)‎
I'm going to build a website in stages. Below is my full master brief: the product description, the visual design system, the site map and the page content. ‎Read it completely. You can find all sample-screenshots in this address: “C:\Users\Asus\Quantmetrics.online\docs\sample-screenshots-of-dune”.‎
‎------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------‎‎------------------‎
‎[THE BEGINNING OF FULL MASTER PROMPT]‎

ROLE
You are a senior web designer, full-stack software engineer, front-end engineer, and a quantitative finance expert. Build a complete, responsive, ‎production-quality website for "Quantmetrics-Lab" (domain: quantmetrics.online), an AI-powered data-analysis and research lab for quantitative finance ‎and econometric studies. The visual language is premium, institutional "fintech-meets-editorial": near-black canvas, soft gradient-mesh banners, thin ‎hairline grid lines, serif display headlines, grotesk UI text, and monospace uppercase labels. Create an original logo placeholder, copy and icons for ‎Quantmetrics. Do not copy any third-party logo, wordmark or marketing text.‎

‎==================================================‎
A. PRODUCT BRIEF
‎==================================================‎
Quantmetrics-Lab is a financial research and data-analysis platform. It gives researchers an AI-powered quantitative intelligence lab, helps traders ‎observe and discover investment opportunities, and helps newcomers understand market behavior and stay in sync with the true rhythm of the ‎markets. Tagline: "Quantmetrics transforms market noise into clear, actionable insights."‎

Core features to showcase:‎
‎1. Research Lab: backtesting, econometric and statistical modeling (e.g. GARCH-family volatility models, VAR, cointegration, regime detection, ML ‎forecasting).‎
‎2. Institutional-grade data analytics: clean datasets, metrics dashboards, risk analytics.‎
‎3. New insights and creative ideas: curated research ideas and market observations.‎
‎4. AI-generated intelligence briefs: concise, periodic market briefs.‎
‎5. Tutorials and guides: step-by-step quantitative finance learning content.‎

Audiences: researchers, traders, newcomers. Tone: precise, calm, authoritative, never hype. Include a visible "Not investment advice" disclaimer in the ‎footer and on Insights/brief pages.‎

‎==================================================‎
B. SITE MAP AND GLOBAL NAVIGATION
‎==================================================‎
Pages: Home, Services (with sub-sections Research, Analysis, Metrics), Insights (AI intelligence briefs), Blog (tutorials/guides; includes Learn), Contact, ‎Login/Sign-up, About, Docs, Terms, Privacy, Copyright, 404.‎

TOP HEADER (on every page), exactly this order:‎
‎[Logo]   Home · Services ▾ · Insights · Blog · Contact        [Light/Dark toggle]  [Login / Logout]‎

‎- Floating rounded bar (see section D). The "Login" item changes to "Logout" (with a small avatar/initials) when authenticated. Style Login as a plain text ‎link and make the final CTA an outlined mono pill. If the layout needs a primary CTA, add "Sign up" as an outlined pill.‎
‎- Light/Dark toggle: an icon button (sun/moon, 40px circle, 1px border). Default to the user's prefers-color-scheme with dark as the fallback, persist the ‎choice in localStorage, and apply it with a data-theme attribute on <html> and no flash on load.‎
‎- Active page link: a 1px left/right border box (like an open menu item) or a small underline dot.‎
‎- "Services" opens a mega menu (section D4) with Research, Analysis and Metrics.‎

FOOTER (on every page): see section H.‎

‎==================================================‎
C. DESIGN TOKENS (CSS custom properties; define dark and light)‎
‎==================================================‎
DARK (default)‎
‎--bg:#0F0F0F; --bg-elev:#161616; --bg-hover:#2B2B2B;‎
‎--line:rgba(255,255,255,0.14); --text:#FFFFFF; --text-muted:#A3A3A3; --text-dim:#6B6B6B;‎
LIGHT
‎--bg:#FAFAF7; --bg-elev:#FFFFFF; --bg-hover:#EDEDE8;‎
‎--line:rgba(15,15,15,0.14); --text:#0F0F0F; --text-muted:#5C5C5C; --text-dim:#8A8A8A;‎
‎(In light mode, invert primary buttons to black pill with white text, keep gradient banners unchanged but add 1px --line borders.)‎

BRAND/ACCENT (both themes)‎
‎- Teal-green #1FA57C → #22A085‎
‎- Periwinkle blue #4A6FD4 → #3E5FC9‎
‎- Lavender stat overlay rgba(120,150,225,0.65)‎
‎- Pink/coral #E8548A → #F07B6B
‎- Orange/yellow #F6C94C → #F0975A
‎- Soft lilac #C9A5E8‎
‎- Positive #22C58B, Negative #F0597A (for chart deltas)‎

TYPOGRAPHY
‎- Display serif for headlines (Google Fonts: "Newsreader", "Source Serif 4" or "Instrument Serif"), weight 400, tracking -0.02em, line-height 1.0–1.05. Hero ‎‎72–80px, H2 56px, article title 48px, section heading 32–40px.‎
‎- Grotesk sans for UI/body ("Inter Tight" or "Geist"), tracking -0.01 to -0.02em. Nav 14px, body 16px (18/1.7 for articles), card titles 28/1.1, card text 14/1.4 ‎muted, mega menu items 18px.‎
‎- Monospace for buttons, tabs, eyebrows, stat captions ("JetBrains Mono" or "Geist Mono"), UPPERCASE, tracking 0.08em, 13–14px.‎
‎- Hero trick: the second headline line uses the same serif at 60% opacity.‎
‎- Code and formula blocks: the mono font with --bg-elev, a 1px --line border and 12px radius.‎

RADIUS/SPACING
‎- Pills 9999px; cards 24px; mega menu 0 (sharp, boxed); inputs 4–8px.‎
‎- 8px spacing scale; container max-width ≈1530px at 1920 (≈190px gutters), 16px gutters on mobile; section padding 96–160px.‎

‎==================================================‎
D. NAVBAR, MEGA MENU, BUTTONS
‎==================================================‎
D1. Navbar: fixed, ~52px tall, floating inside the container with a 1px --line border and a fully rounded right end. Left: a logo pill (white in dark mode, black ‎in light mode, height 52px, padding 0 20px) with a glyph and the "Quantmetrics" wordmark in 18px sans. Center links 14px with chevrons on dropdown ‎items. Right: Light/Dark toggle, Login/Logout, CTA pill.‎
D2. Over gradient heroes the bar is transparent with a thin tinted border. After scrolling, it gets backdrop-filter: blur(12px), a 60% --bg background and a -‎‎-line border.‎
D3. Open-menu state: the active item gets 1px left/right borders, the chevron flips, and the dropdown attaches directly under the bar. The page behind ‎blurs and dims.‎
D4. Services mega menu: a sharp-cornered panel, the same width as the bar. Three equal cards (Research, Analysis, Metrics), each with a 28px title, a ‎‎14px muted description and a 4×4 dot grid at the bottom-left, plus a 4th column "Capabilities" listing rows such as Backtesting, Econometrics, Risk ‎Analytics (rows ~84px tall, 18px text, hairline separators). HOVER on a card: the background fades to --bg-hover over 200ms, the dot grid morphs into a ‎thin-line node icon, and a circled → appears at the bottom-right.‎
D5. Buttons:‎
‎- Primary: pill, mono uppercase, trailing →, height 52px, padding 0 28px. Hover: 88% opacity, arrow moves 4px right (150ms). Active: scale(0.98).‎
‎- Outline: transparent, 1px border, mono. Hover: 8% fill and a full-contrast border.‎
‎- Text link: underlined, offset 3px; hover goes muted.‎
‎- Tabs: mono uppercase; the active tab is a filled pill (inverted colors); hover raises the text to full contrast.‎
‎- Focus: a 2px periwinkle outline with a 2px offset on every interactive element.‎
‎- Mobile: hamburger opens a full-screen accordion menu.‎

‎==================================================‎
E. GLOBAL LAYOUT LANGUAGE
‎==================================================‎
‎- Faint 1px vertical hairlines at the container edges and column boundaries run through the full height of sections, with horizontal hairlines between ‎sections. Content sits in a visible blueprint-style grid.‎
‎- Every section starts with an EYEBROW (a small pill with a 1px dashed border and mono uppercase text) above a centered serif H2.‎
‎- Scroll reveals: opacity 0→1 and translateY 16→0 over 600ms with cubic-bezier(0.2,0.8,0.2,1). Respect prefers-reduced-motion.‎

‎==================================================‎
F. PAGE-BY-PAGE CONTENT
‎==================================================‎
F1. HOME
‎1. Hero: gradient-mesh background (teal top/left, periwinkle center/lower-right, 80–120px blurred blobs, 4% grain overlay, slow 20–30s drift). Headline: ‎‎"Quantitative intelligence" (white) / "for the rhythm of markets" (60% opacity). Sub-headline: "Institutional-grade data analysis, research and AI-‎generated briefs, in one lab." Primary CTA: "EXPLORE THE LAB →". Text link: "Read the latest brief".‎
‎2. Stats strip at the hero bottom: three translucent lavender cells with a 40px number and a mono caption. USE CLEARLY MARKED PLACEHOLDER VALUES ‎‎(e.g. "[00]+ MODELS", "[00]+ DATASETS", "[00]+ BRIEFS") for me to replace. Do not invent real figures.‎
‎3. Strip below: "Methods & data sources" with 6 greyscale neutral placeholder cells. Do not use any real company logos or imply endorsements.‎
‎4. "What you can do" (eyebrow "CAPABILITIES"): a bordered 3-column grid of cells (title, muted description, 48px outlined icon box top-right) for ‎Research Lab, Data Analytics, Intelligence Briefs, Insights, Tutorials and Risk Analytics. "EXPLORE ALL" outlined pill.‎
‎5. "Built for every kind of market mind" (eyebrow "AUDIENCE"): tabs RESEARCHERS / TRADERS / NEWCOMERS, with 3 tall cards (~340px) per tab. Each has ‎a centered isometric thin-line illustration (1.5px stroke), a title and a description. HOVER: the card fills with a teal→blue gradient and the text turns white.‎
‎6. Feature trio "Analyze / Visualize / Share" using the 24px-radius cards. The active/hovered card fills with a pink→coral gradient and soft blur.‎
‎7. Live-style data preview: an example chart panel (price + volatility, built with ECharts or Plotly, themed to tokens, with mono axis labels) plus 3 KPI tiles. ‎Mark it "Sample data".‎
‎8. Latest intelligence briefs: 3 cards (see F3).‎
‎9. "Production-grade analytics" band: a full-width teal-blue → periwinkle gradient with a serif H2 and an outlined button with a split arrow cell.‎
‎10. Final CTA banner: a vertical-streak gradient (yellow → coral → pink, blurred) with a centered white serif headline "Turn market noise into insight." and ‎a white pill "GET STARTED →".‎

F2. SERVICES (Research / Analysis / Metrics)‎
‎- Overview hero (dark, with flowing blue thin-line wave artwork in SVG or canvas), serif headline "The Quantmetrics Lab", and a "REQUEST ACCESS →" ‎pill.‎
‎- Stats band with 5 placeholder cells.‎
‎- Three sections, each in a bordered 2-column layout (text + visual): ‎
‎  Research: backtesting, volatility forecasting, econometric models, ML forecasting. ‎
‎  Analysis: data cleaning, exploratory and statistical analysis, risk analytics. ‎
‎  Metrics: performance, risk and factor metrics with sample dashboards.‎
‎- Tag-block: large serif heading left; rounded panels on the right with dashed mono chips (e.g. GARCH, VAR, COINTEGRATION, REGIME DETECTION, ‎MONTE CARLO), the second panel using --bg-hover.‎
‎- Tabs for "Workflow": DATA → MODEL → VALIDATE → REPORT.‎

F3. INSIGHTS (AI-generated intelligence briefs)‎
‎- Eyebrow "INTELLIGENCE BRIEFS", H1 "Insights", filter chips (ALL / MARKETS / VOLATILITY / MACRO / IDEAS) and a search field.‎
‎- Grid of brief cards (24px radius): title, 2-line excerpt, category chip + date, and a cover with a serif title on a gradient. Include an "AI-generated" mono ‎badge on each card.‎
‎- Brief detail page: the article layout (F4) plus a "Key takeaways" box, a "Methodology & data" box and the disclaimer.‎

F4. BLOG (tutorials and guides; includes Learn)‎
‎- Header: eyebrow "BLOG", H1, "EXPLORE SERIES" carousel of series cards (e.g. Volatility Forecasting, Time Series 101, Backtesting, Risk Metrics) with ‎circular ‹ › buttons.‎
‎- Filter chips ALL / GUIDE / TUTORIAL / RESEARCH / NEWS, a search field (4px radius, --bg-hover fill) and a 3-column grid of cards with 24px radius (28px ‎title, a 14px muted 2-line excerpt, a chip + date + read time, and a 16:9 cover at the bottom). Hover: the border brightens, the image scales 1.03 and the ‎title is underlined.‎
‎- Article page: 2 columns (main ~600px + sticky sidebar ~220px). Main: "‹ All posts", a 48px serif title, a 24px standfirst, a meta row, dashed tag chips, an ‎author row (circular avatar), a cover image, then 18/1.7 body with code blocks, math formulas (KaTeX) and figures. Sidebar: a Share pill, a bordered ‎‎"Contents" box with anchor links, a CTA box ("Explore the lab") and a newsletter input with a square send button.‎

F5. CONTACT
‎- Eyebrow "CONTACT", serif H1 "Get in touch". Two columns: left, a form (name, email, topic dropdown, message, an outlined "SEND MESSAGE →" pill, ‎validation states and a success state); right, a bordered info card (email, response time and social links).‎

F6. LOGIN / SIGN-UP (split screen)‎
‎- Left 545px panel: a serif "Welcome to Quantmetrics" heading, stacked pill buttons (Google, GitHub, email), a checkbox in 12px muted text, "Already ‎have an account? Sign in" and legal links at 11px.‎
‎- Right panel: a dim (8–10% opacity) monospace backdrop of sample quantitative code (e.g. a GARCH fit in Python) with a serif headline "Every model. ‎Every metric. All explained."‎
‎- Top-center mono stepper: SIGN UP › ABOUT YOU › LET'S GO.‎

F7. ABOUT, DOCS, LEGAL
‎- About: mission, method and team placeholder in the editorial layout.‎
‎- Docs: a 3-column layout (sidebar nav, content, on-page contents). ‎
‎- Terms/Privacy/Copyright: a simple readable 720px column, with last-updated metadata.‎

‎==================================================‎
G. THEMING NOTES (LIGHT/DARK)‎
‎==================================================‎
‎- All colors come from tokens; no hard-coded hex values in components.‎
‎- Gradient banners look the same in both themes. Hairlines, cards and text switch via tokens.‎
‎- Charts read the token values at runtime and re-render on theme change.‎
‎- Images and illustrations use currentColor for strokes.‎

‎==================================================‎
H. FOOTER (exactly this structure)‎
‎==================================================‎
Top row: "Ready to explore the lab?" (28px sans) on the left; on the right, a large outlined pill "CONTACT US" (≈720px × 80px, mono).‎

Main grid (hairline-bordered):‎
‎- Left cell: Quantmetrics logo, then the social icons row: [GitHub] [X/Twitter] (24px icons, 1px circular border, hover fill).‎
‎- Four columns with mono muted uppercase headings. Every link is a full-width row (40px tall, 1px border, 20px radius, 14px text, hover background 6% of ‎‎--text):‎
‎  HOME: Home · About · Contact
‎  SERVICES: Research · Analysis · Metrics
‎  INSIGHTS: Blog · Learn · Docs
‎  LEGAL: Terms · Privacy · Copyright
‎- Optional green "NEW" pills and ↗ icons on external links.‎

Bottom bar (single line, centered or split): "© Quantmetrics 2026 | All Rights Reserved". Add a small muted disclaimer line above it: "Content is for ‎research and education only and is not investment advice."‎

‎==================================================‎
I. MOTION, RESPONSIVE, ACCESSIBILITY, PERFORMANCE
‎==================================================‎
‎- Motion: cubic-bezier(0.2,0.8,0.2,1); 150–250ms for hovers, 600ms for reveals; dropdowns fade and slide 4px in 180ms.‎
‎- Responsive (360/768/1024/1440/1920): at ≤1024px the nav collapses to a logo + hamburger, grids go 3→2→1, the hero scales to 40–48px, and stat strips ‎scroll horizontally. Keep only the outer hairlines on mobile.‎
‎- Accessibility: WCAG AA contrast, semantic landmarks, aria-expanded on menus, a skip link, visible focus rings, alt text, aria-pressed on the theme toggle ‎and keyboard-operable tabs and carousels.‎
‎- Performance: lazy-load images, SVG for line art, preload fonts, CSS/SVG gradient meshes (no heavy PNGs), and code-split charts. Add SEO basics: titles, ‎meta descriptions, OpenGraph and sitemap.‎

‎==================================================‎
J. TECH STACK AND DELIVERABLES
‎==================================================‎
Stack: Next.js (App Router) + TypeScript + Tailwind CSS with CSS variables for tokens; MDX for blog/insight content; ECharts or Plotly for charts; KaTeX for ‎math. Authentication can be mocked for now (a clean interface to swap in a real provider later).‎

Deliver:‎
‎1. Design-token file (CSS variables + tailwind.config) with dark and light themes.‎
‎2. Reusable, modular components: Navbar, MegaMenu, ThemeToggle, AuthButton, Button (primary/outline/text), EyebrowChip, TabBar, StatCell, Card, ‎FeatureCard, LogoStrip, GradientBanner, ChartPanel, BriefCard, BlogCard, ArticleLayout, DocsLayout, ContactForm, AuthSplit, Footer.‎
‎3. Pages: Home, Services, Insights (+ detail), Blog (+ article), Contact, Login/Sign-up, About, Docs, Terms, Privacy, Copyright, 404.‎
‎4. A short README documenting the folder structure, tokens, theming approach, and a list of every hover/active/focus state.‎


PROCESS
Before coding, list your assumptions. Then build in this order: tokens + theme → Navbar/MegaMenu → Footer → Home hero → remaining Home ‎sections → the other pages. Pause after the navbar, footer and hero so I can review.‎
