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
    <section aria-labelledby="analytics-band-title">
      <GradientBanner
        variant="teal-blue"
        radius="none"
        className="on-gradient-tone px-gutter py-12 lg:py-16"
      >
        <Container className="flex flex-col items-center text-center">
          <h2 id="analytics-band-title" className="text-h2 max-w-[24ch] text-on-gradient">
            Turn Market Noise Into Insights
          </h2>
          <p className="text-body-lg mt-3 max-w-[56ch] text-on-gradient-muted">
            Clean datasets, documented methods and dashboards that hold up when someone else reads
            them.
          </p>
          <SplitArrowButton href="/services" className="mt-5">
            Request access
          </SplitArrowButton>
        </Container>
      </GradientBanner>
    </section>
  );
}