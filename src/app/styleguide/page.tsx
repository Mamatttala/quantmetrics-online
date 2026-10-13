import type { Metadata } from "next";
import type { ReactNode } from "react";

import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { GradientBanner } from "@/components/ui/GradientBanner";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { BriefCard } from "@/components/ui/BriefCard";
import { KpiTile } from "@/components/ui/KpiTile";
import { SplitArrowButton } from "@/components/ui/SplitArrowButton";
import { StatCell } from "@/components/ui/StatCell";
import { TabBar } from "@/components/ui/TabBar";
import { cn } from "@/lib/utils";

import { TabsDemo } from "./TabsDemo";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const SURFACES = [
  { token: "--bg", className: "bg-bg" },
  { token: "--bg-elev", className: "bg-bg-elev" },
  { token: "--bg-hover", className: "bg-bg-hover" },
];

const TEXT_LEVELS = [
  { token: "--text", className: "bg-text" },
  { token: "--text-muted", className: "bg-text-muted" },
  { token: "--text-dim", className: "bg-text-dim" },
];

const ACCENTS = [
  { token: "--teal", className: "bg-teal" },
  { token: "--teal-alt", className: "bg-teal-alt" },
  { token: "--periwinkle", className: "bg-periwinkle" },
  { token: "--periwinkle-alt", className: "bg-periwinkle-alt" },
  { token: "--lavender-overlay", className: "bg-lavender" },
  { token: "--coral", className: "bg-coral" },
  { token: "--coral-alt", className: "bg-coral-alt" },
  { token: "--amber", className: "bg-amber" },
  { token: "--amber-alt", className: "bg-amber-alt" },
  { token: "--lilac", className: "bg-lilac" },
  { token: "--positive", className: "bg-positive" },
  { token: "--negative", className: "bg-negative" },
];

const TYPE_SCALE = [
  { utility: "text-hero", note: "Hero · serif 400 · clamp 40 → 80px · 1.03 · -0.02em", sample: "Quantitative intelligence" },
  { utility: "text-h2", note: "H2 · serif · clamp 32 → 56px · 1.05", sample: "Built for every kind of market mind" },
  { utility: "text-article-title", note: "Article title · serif · clamp 32 → 48px · 1.08", sample: "Regime detection in volatile markets" },
  { utility: "text-section-heading", note: "Section heading · serif · clamp 28 → 40px · 1.1", sample: "Methods & data sources" },
  { utility: "text-card-title", note: "Card title · sans 500 · 28px · 1.1", sample: "Risk analytics" },
  { utility: "text-stat", note: "Stat number · sans · 40px · 1.02 (added in stage 2)", sample: "[00]+" },
  { utility: "text-body", note: "Body · sans · 16px · 1.6", sample: "Clean datasets, metrics dashboards and risk analytics for research teams." },
  { utility: "text-body-lg", note: "Article body · sans · 18px · 1.7", sample: "Step-by-step guides that explain the method, not just the result." },
  { utility: "text-meta", note: "Card copy · sans · 14px · 1.4 · muted", sample: "Volatility · 12 min read · updated this week" },
  { utility: "text-mono-label", note: "Mono label · 13px · 0.08em · uppercase", sample: "AI-generated · sample data" },
];

const RADII = [
  { token: "rounded-pill · 9999px", className: "rounded-pill" },
  { token: "rounded-card · 24px", className: "rounded-card" },
  { token: "rounded-menu · 0px", className: "rounded-menu" },
  { token: "rounded-input · 8px", className: "rounded-input" },
  { token: "rounded-sm · 4px", className: "rounded-sm" },
];

const SPACING = [
  "--space-0-5",
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
  "--space-20",
];

const MOTION = [
  { token: "--ease-standard", note: "cubic-bezier(0.2, 0.8, 0.2, 1) · all hovers and reveals" },
  { token: "--dur-hover", note: "hover transitions" },
  { token: "--dur-menu", note: "dropdown fade + 4px slide" },
  { token: "--dur-base", note: "theme switch, gradient fills" },
  { token: "--dur-reveal", note: "scroll reveals" },
];

const TAB_ITEMS = [
  { id: "researchers", label: "Researchers" },
  { id: "traders", label: "Traders" },
  { id: "newcomers", label: "Newcomers" },
];

const ANCHORS = [
  { href: "#buttons", label: "Buttons" },
  { href: "#chips", label: "Chips" },
  { href: "#tabs", label: "Tabs" },
  { href: "#stats", label: "Stats & cards" },
  { href: "#gradients", label: "Gradients" },
  { href: "#preview-parts", label: "Preview & brief cards" },
  { href: "#forms", label: "Forms" },
  { href: "#tokens", label: "Tokens" },
];

export default function StyleguidePage() {
  return (
    <main>
      <Section grid={false} divider={false} className="pt-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <EyebrowChip>Stage 2 · Base components</EyebrowChip>
            <h1 className="text-h2 mt-3">Base UI components</h1>
            <p className="text-body mt-3 max-w-[68ch] text-text-muted">
              Every component below is rendered twice - once in the dark theme and once in the light
              theme - using a forced-theme island, so both themes can be compared without switching.
              All values come from <span className="text-mono-label">src/styles/tokens.css</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-mono-label text-text-dim">Page theme</span>
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label="Styleguide sections" className="mt-6 flex flex-wrap gap-1">
          {ANCHORS.map((anchor) => (
            <Chip key={anchor.href} href={anchor.href}>
              {anchor.label}
            </Chip>
          ))}
        </nav>
      </Section>

      <DemoSection
        id="buttons"
        eyebrow="Button"
        title="Primary, outline and text"
        description="Mono uppercase pills. At rest the primary is the solid inverted pill; on hover, on keyboard focus and while pressed it opens into the outlined pill whose arrow sits behind a full-height rule, and the arrow slides 4px. Active also scales to 0.98; focus-visible paints the 2px periwinkle ring at 2px offset. The nav CTA is the header bar's pill: outlined until hovered, then solid."
      >
        <BothThemes>
          <StateRow label="Primary">
            <Button trailingArrow>Explore the lab</Button>
            <Button size="compact" trailingArrow>
              Compact
            </Button>
          </StateRow>
          <StateRow label="Nav CTA">
            <Button variant="navCta">Get started</Button>
          </StateRow>
          <StateRow label="Outline">
            <Button variant="outline">Request access</Button>
            <Button variant="outline" size="compact">
              Compact
            </Button>
          </StateRow>
          <StateRow label="Text">
            <Button variant="text">Read the latest brief</Button>
            <Button variant="text" size="compact">
              Compact
            </Button>
          </StateRow>
          <StateRow label="Loading">
            <Button loading trailingArrow>
              Loading
            </Button>
            <Button variant="outline" loading>
              Loading
            </Button>
          </StateRow>
          <StateRow label="Disabled">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled
            </Button>
            <Button variant="text" disabled>
              Disabled
            </Button>
          </StateRow>
          <StateRow label="As link">
            <Button href="#buttons" trailingArrow>
              Link button
            </Button>
          </StateRow>
          <StateRow label="Full width">
            <span className="w-full max-w-[320px]">
              <Button fullWidth trailingArrow>
                Get started
              </Button>
            </span>
          </StateRow>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="chips"
        eyebrow="EyebrowChip · Chip"
        title="Dashed pills and chips"
        description="EyebrowChip sits above every section H2. Filter chips are interactive and carry an active state; tag chips are static labels."
      >
        <BothThemes>
          <StateRow label="Eyebrow">
            <EyebrowChip>Capabilities</EyebrowChip>
            <EyebrowChip>Audience</EyebrowChip>
          </StateRow>
          <StateRow label="Filter">
            <Chip active>All</Chip>
            <Chip>Markets</Chip>
            <Chip>Volatility</Chip>
            <Chip>Macro</Chip>
            <Chip href="#chips">Ideas (link)</Chip>
          </StateRow>
          <StateRow label="Tag">
            <Chip variant="tag">GARCH</Chip>
            <Chip variant="tag">VAR</Chip>
            <Chip variant="tag">Cointegration</Chip>
            <Chip variant="tag">Regime detection</Chip>
          </StateRow>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="tabs"
        eyebrow="TabBar"
        title="Tabs with keyboard support"
        description="Roving tabindex: Left/Right arrows wrap, Home/End jump to the ends, and the active tab is an inverted filled pill. The panel below is wired with role=tabpanel."
      >
        <BothThemes>
          <TabsDemo />
          <StateRow label="Compact">
            <TabBar tabs={TAB_ITEMS} label="Audience (compact)" size="compact" />
          </StateRow>
        </BothThemes>
      </DemoSection>
      <DemoSection
        id="stats"
        eyebrow="StatCell · Card · FeatureCard"
        title="Stats, cards and feature cards"
        description="StatCell is the 40px number over a mono caption, with the translucent lavender cell used in the hero strip. FeatureCard fills with a gradient on hover; the middle card is forced active so you can see the filled state without hovering."
      >
        <BothThemes>
          <div className="grid gap-2 sm:grid-cols-3">
            <StatCell value="[00]+" caption="Models" />
            <StatCell value="[00]+" caption="Datasets" />
            <StatCell value="[00]+" caption="Briefs" variant="lavender" />
          </div>

          {/* The hero strip: one square cell row, label beside the number. */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <StatCell layout="inline" shape="square" align="center" value="504+" caption="User" className="border-line-strong" />
            <StatCell layout="inline" shape="square" align="center" value="120+" caption="Customers" className="-ml-px border-line-strong" />
            <StatCell layout="inline" shape="square" align="center" value="200+" caption="Strategies" className="-ml-px border-line-strong" />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <Card>
              <p className="text-card-title">Card</p>
              <p className="text-meta mt-2">24px radius, elevated surface, 1px hairline.</p>
            </Card>
            <Card interactive>
              <p className="text-card-title">Interactive</p>
              <p className="text-meta mt-2">Hover brightens the border and lifts the surface.</p>
            </Card>
            <Card padding="tight">
              <p className="text-card-title">Tight</p>
              <p className="text-meta mt-2">p-3 = 24px padding.</p>
            </Card>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <FeatureCard
              variant="teal-blue"
              title="Analyze"
              description="Hover fills teal → periwinkle."
              icon={<NodeIcon />}
            />
            <FeatureCard
              variant="pink-coral"
              title="Visualize"
              description="Forced active state."
              icon={<GaugeIcon />}
              active
            />
            <FeatureCard
              variant="pink-coral"
              title="Share"
              description="Hover fills pink → coral."
              icon={<ShareIcon />}
            />
          </div>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="gradients"
        eyebrow="GradientBanner"
        title="Gradient bands"
        description="Built only from accent tokens, so the gradient is identical in both themes while the text tokens stay white on top."
      >
        <BothThemes>
          <GradientBanner variant="teal-blue" className="p-4">
            <p className="text-mono-label">Teal → periwinkle</p>
            <h3 className="text-card-title mt-2">Production-grade analytics</h3>
            <p className="text-body mt-2 text-on-gradient-muted">
              Placeholder copy for the analytics band.
            </p>
          </GradientBanner>

          <GradientBanner variant="pink-coral" className="p-4">
            <p className="text-mono-label">Pink → coral</p>
            <h3 className="text-card-title mt-2">Analyze · Visualize · Share</h3>
          </GradientBanner>

          <GradientBanner variant="sunset" className="p-4">
            <p className="text-mono-label">Sunset · amber → coral → pink</p>
            <h3 className="text-card-title mt-2">Turn market noise into insight.</h3>
          </GradientBanner>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="preview-parts"
        eyebrow="KpiTile · SplitArrowButton · BriefCard"
        title="Preview and brief card parts"
        description="The three pieces added with the home data preview and briefs row. KpiTile is the mono label, 40px stat and coloured delta - the delta is the only place --positive / --negative is used. SplitArrowButton is the solid inverted pill at rest and opens into the outlined pill with its arrow in a divided cell on hover. BriefCard is a 24px-radius card whose whole surface is one link, so it takes the focus ring as a unit."
      >
        <BothThemes>
          <div className="grid gap-3 sm:grid-cols-3">
            <KpiTile
              label="Annualised volatility"
              value="10.5%"
              delta="+0.4 pp"
              trend="up"
              caption="20-day window"
            />
            <KpiTile
              label="Rolling return"
              value="+6.8%"
              delta="+1.2 pp"
              trend="up"
              caption="60-day window"
            />
            <KpiTile
              label="Max drawdown"
              value="-4.1%"
              delta="-0.6 pp"
              trend="down"
              caption="Full sample"
            />
          </div>

          <StateRow label="Solid, outlined on hover">
            <SplitArrowButton href="/services">Request access</SplitArrowButton>
          </StateRow>

          <div className="grid gap-3 sm:grid-cols-2">
            <BriefCard
              title="Reading volatility after a policy shift"
              excerpt="Why a single rate decision moves short-dated volatility more than it moves the level."
              category="Volatility"
              date="Placeholder · 28 Sep 2026"
              href="/insights"
              coverTitle="Volatility"
            />
            <BriefCard
              title="Regime drift in a thin month"
              excerpt="Lower liquidity changes the shape of the return distribution."
              category="Macro"
              date="Placeholder · 14 Sep 2026"
              href="/insights"
              coverTitle="Macro"
              variant="sunset"
            />
          </div>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="forms"
        eyebrow="Field · Input · Textarea · Select · Checkbox"
        title="Form controls"
        description="Labels are mono uppercase, helper and error text is 14px. Error and success messages are announced through aria-describedby, and aria-invalid is set on the control. Tab into a field to see the periwinkle focus ring and matching border."
      >
        <BothThemes>
          <div className="flex flex-col gap-4">
            <Input label="Text" placeholder="Search datasets" hint="Default state · 8px radius." />
            <Input label="Email" type="email" placeholder="you@lab.example" hint="Focus changes the border to periwinkle." />
            <Input label="Error" defaultValue="not-an-email" error="Enter a valid email address." />
            <Input label="Success" defaultValue="you@lab.example" success="Looks good." />
            <Input label="Disabled" defaultValue="Locked" disabled />
            <Input label="Read only" defaultValue="Read-only value" readOnly />
            <Input
              label="Search"
              type="search"
              variant="search"
              placeholder="Search briefs"
              hint="4px radius on the --bg-hover fill."
            />
            <Input label="Compact" size="compact" placeholder="40px tall" />
          </div>

          <div className="flex flex-col gap-4">
            <Textarea label="Message" placeholder="Tell us what you are researching" hint="Up to 800 characters." />
            <Textarea label="Message · error" error="This field is required." />
            <Select label="Topic" placeholderOption="Choose a topic" hint="Default state.">
              <option>Research</option>
              <option>Analysis</option>
              <option>Metrics</option>
            </Select>
            <Select label="Topic · error" placeholderOption="Choose a topic" error="Pick a topic to continue.">
              <option>Research</option>
            </Select>
            <div className="flex flex-col gap-2">
              <Checkbox label="I agree to receive product updates" />
              <Checkbox label="Checked by default" defaultChecked />
              <Checkbox label="With description" description="12px muted supporting text." />
              <Checkbox label="Error" error="You must accept to continue." />
              <Checkbox label="Disabled" disabled />
            </div>
          </div>
        </BothThemes>
      </DemoSection>

      <DemoSection
        id="tokens"
        eyebrow="Tokens"
        title="Colour, type, radii, spacing, motion"
        description="The stage 1 token set, shown in both themes. Nothing here has a raw hex value in a component - every swatch reads a custom property."
      >
        <BothThemes>
          <TokenGallery />
        </BothThemes>
      </DemoSection>
    </main>
  );
}

function DemoSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Section id={id} grid={false}>
      <EyebrowChip>{eyebrow}</EyebrowChip>
      <h2 className="text-section-heading mt-3">{title}</h2>
      {description ? <p className="text-body mt-3 max-w-[78ch] text-text-muted">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </Section>
  );
}

/**
 * Renders the same subtree twice: once forced to the dark theme and once forced
 * to the light theme. `data-theme` on a wrapper re-declares the tokens for that
 * subtree, and `bg-bg text-text` re-reads them, so both themes are visible at
 * once without touching the page theme.
 */
function BothThemes({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-3 xl:grid-cols-2">
      <ThemeIsland theme="dark">{children}</ThemeIsland>
      <ThemeIsland theme="light">{children}</ThemeIsland>
    </div>
  );
}

function ThemeIsland({ theme, children }: { theme: "light" | "dark"; children: ReactNode }) {
  return (
    <div data-theme={theme} className="rounded-card border border-line bg-bg p-4 text-text">
      <p className="text-mono-label text-text-dim">{theme === "light" ? "Light theme" : "Dark theme"}</p>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function StateRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-mono-label w-14 shrink-0 text-text-dim">{label}</span>
      {children}
    </div>
  );
}

function Swatch({ token, className, size = "h-5" }: { token: string; className: string; size?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={cn("w-full rounded-input border border-line", size, className)} />
      <code className="text-mono-label text-text-dim">{token}</code>
    </div>
  );
}

function TokenGallery() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SURFACES.map((item) => (
          <Swatch key={item.token} token={item.token} className={item.className} />
        ))}
        <Swatch token="--line" className="bg-line" size="h-1" />
        <Swatch token="--line-strong" className="bg-line-strong" size="h-1" />
        {TEXT_LEVELS.map((item) => (
          <Swatch key={item.token} token={item.token} className={item.className} />
        ))}
      </div>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <span className="text-body">Primary text</span>
        <span className="text-body text-text-muted">Secondary text</span>
        <span className="text-body text-text-dim">Tertiary text</span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {ACCENTS.map((item) => (
          <Swatch key={item.token} token={item.token} className={item.className} />
        ))}
      </div>

      <div className="divide-y divide-line border-t border-line">
        {TYPE_SCALE.map((item) => (
          <div key={item.utility} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <code className="text-mono-label text-text-dim">{item.utility}</code>
              <span className="text-meta">{item.note}</span>
            </div>
            <p className={cn(item.utility, "mt-2 text-text")}>{item.sample}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {RADII.map((item) => (
          <div key={item.token} className="flex flex-col gap-2">
            <div className={cn("h-5 w-full border border-line bg-bg-elev", item.className)} />
            <code className="text-mono-label text-text-dim">{item.token}</code>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {SPACING.map((token) => (
          <div key={token} className="flex items-center gap-3">
            <code className="text-mono-label w-20 shrink-0 text-text-dim">{token}</code>
            <span className="h-2 rounded-sm bg-periwinkle" style={{ width: `var(${token})` }} />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {MOTION.map((item) => (
          <div key={item.token} className="rounded-input border border-line p-3">
            <code className="text-mono-label text-text">{item.token}</code>
            <p className="text-meta mt-1">{item.note}</p>
          </div>
        ))}
      </div>

      <Container className="border-t border-line pt-3">
        <p className="text-meta">
          Nested <code className="text-mono-label">Container</code> - same max-width and gutters as
          every page band.
        </p>
      </Container>
    </div>
  );
}

function NodeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
      <circle cx="5.5" cy="12" r="2.5" />
      <circle cx="18.5" cy="6" r="2.5" />
      <circle cx="18.5" cy="18" r="2.5" />
      <path d="M8 12h4.5m0 0 3.5-4.5M12.5 12l3.5 4.5" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
      <path d="M3.5 17a9 9 0 1 1 17 0" />
      <path d="M12 17V9m0 0-3.5 2M12 9l3.5 2" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M12 15V4m0 0L8 8m4-4 4 4" />
      <path d="M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14" />
    </svg>
  );
}