import { WaveArtwork } from "@/components/brand/ServiceArtwork";
import { Container } from "@/components/layout/Container";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES_HERO } from "@/lib/services";

/**
 * Services hero (brief F2). A theme-invariant dark band - `bg-surface-deep` plus
 * the `deep-halo` accent glow - carrying the flowing thin-line wave artwork, so
 * it stays dark and legible whichever theme is active. The `on-gradient-tone`
 * utility re-points the text, hairline and button tokens to their white
 * on-gradient values, which is what makes the primary pill read as a white pill
 * with dark ink without a single override.
 */
export function ServiceHero() {
  return (
    <section className="on-gradient-tone relative isolate overflow-hidden bg-surface-deep">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="deep-halo absolute inset-0" />
        <WaveArtwork className="absolute inset-0 h-full w-full text-periwinkle" />
        <div className="grain-overlay" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-start pt-20 pb-12 lg:pt-24 lg:pb-16">
          <Reveal>
            <EyebrowChip>{SERVICES_HERO.eyebrow}</EyebrowChip>

            <h1 className="text-hero mt-3 max-w-[16ch] text-on-gradient">{SERVICES_HERO.title}</h1>

            <p className="text-body-lg mt-3 max-w-[62ch] text-on-gradient-muted">
              {SERVICES_HERO.summary}
            </p>

            <div className="mt-4">
              <Button href={SERVICES_HERO.ctaHref} trailingArrow>
                {SERVICES_HERO.ctaLabel}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}