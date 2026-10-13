import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/layout/Reveal";
import { HeroBackdrop } from "@/components/marketing/HeroBackdrop";
import { Button } from "@/components/ui/Button";
import { StatCell } from "@/components/ui/StatCell";
import { cn } from "@/lib/utils";

/**
 * PLAUSIBLE PLACEHOLDER FIGURES, pending verification.
 *
 * TODO(placeholder): these are the client-supplied values for layout review.
 * They are NOT measured, audited or otherwise verified - confirm every one of
 * them against real records before launch, and delete this note once they are
 * genuine. Site-wide rule: never present an invented figure as a real one.
 */
const HERO_STATS = [
  { value: "504+", caption: "User" },
  { value: "120+", caption: "Customers" },
  { value: "200+", caption: "Strategies" },
];

/**
 * Home hero (brief F1.1-F1.2). The section starts at the very top of the
 * document so the floating header sits over the mesh, and carries the
 * `on-gradient-tone` utility so every descendant - the CTA pill and the stat
 * cells - reads white-on-gradient in both themes.
 *
 * The stats strip is a full-bleed lavender band: the horizontal hairlines run
 * past the container to both viewport edges and the vertical hairlines run the
 * full band height, so the section reads as part of the page grid.
 */
export function Hero() {
  return (
    <section className="on-gradient-tone relative overflow-hidden">
      <HeroBackdrop />

      <Container className="relative">
        <div className="flex flex-col items-center pt-20 pb-12 text-center">
          <Reveal className="flex flex-col items-center">
            <h1 className="text-hero">
              <span className="block text-on-gradient">Sync With The Market&rsquo;s</span>
              <span className="block text-on-gradient/60">True Rhythm</span>
            </h1>

            <p className="text-card-title leading-snug mt-3 text-balance text-on-gradient">
              <span className="block">Quantitative Finance Research Lab,</span>
              <span className="block">Institutional-Grade Data Analysis.</span>
            </p>

            <div className="mt-4">
              <Button href="/services" trailingArrow>
                Explore the lab
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Stats strip: one full-bleed band closed by crisp, unfaded hairlines. */}
      <div className="relative border-y border-line-strong bg-lavender">
        <Container>
          <div className="flex snap-x snap-mandatory overflow-x-auto sm:grid sm:grid-cols-3 sm:overflow-visible">
            {HERO_STATS.map((stat, index) => (
              <StatCell
                key={stat.caption}
                layout="inline"
                shape="square"
                align="center"
                value={stat.value}
                caption={stat.caption}
                className={cn(
                  "min-h-9 min-w-32 shrink-0 snap-start border-x border-line-strong sm:min-w-0",
                  index > 0 && "-ml-px",
                )}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}