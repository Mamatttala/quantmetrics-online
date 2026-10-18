import { Container } from "@/components/layout/Container";
import { GradientBanner } from "@/components/ui/GradientBanner";
import { SplitArrowButton } from "@/components/ui/SplitArrowButton";

/**
 * The closing band: a full-bleed teal-to-blue gradient carrying a serif
 * headline and an outlined button whose arrow sits in its own divided cell.
 * `on-gradient-tone` re-points the surface tokens for the subtree, so the button
 * takes its on-gradient border and text automatically.
 *
 * It is the only closing band on the page - the earlier sunset/streak banner was
 * removed as a duplicate of this message.
 */
export function AnalyticsBand() {
  return (
    <section aria-labelledby="analytics-band-title" className="border-y border-line-strong">
      <GradientBanner
        variant="teal-blue"
        radius="none"
        className="on-gradient-tone px-gutter py-10 lg:py-12"
      >
        <Container className="flex flex-col items-center text-center">
          <h2 id="analytics-band-title" className="text-h2 max-w-[24ch] text-on-gradient">
            Turn Market Noise Into Insights
          </h2>
          <SplitArrowButton href="/services" className="mt-6">
            Request access
          </SplitArrowButton>
        </Container>
      </GradientBanner>
    </section>
  );
}
