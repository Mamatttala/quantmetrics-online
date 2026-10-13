import { PriceVolatilityChart } from "@/components/charts/PriceVolatilityChart";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { KpiTile } from "@/components/ui/KpiTile";
import { SAMPLE_METRICS } from "@/lib/sample-series";

/**
 * The live-style data preview (brief F1.7): one chart panel plus three KPI
 * tiles. Everything in it is synthetic and the panel says so twice - in the
 * header chip and in the caption underneath - so no visitor can mistake the
 * drawing for a result.
 */
function LegendSwatch({ tone, children }: { tone: string; children: string }) {
  return (
    <span className="flex items-center gap-1.5 text-mono-label text-text-muted">
      <span aria-hidden="true" className={`size-1 rounded-pill ${tone}`} />
      {children}
    </span>
  );
}

export function SampleDataPanel() {
  return (
    <Section grid={false} id="preview">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>Data preview</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[24ch]">A first look at the panel</h2>
        <p className="text-meta mt-3 max-w-[56ch]">
          Price and volatility side by side, with the metrics an analyst reaches for first. The
          chart is drawn in the browser and re-drawn from the design tokens when the theme changes.
        </p>
      </Reveal>

      <Reveal className="mt-6">
        <div className="rounded-card border border-line bg-bg-elev p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-card-title text-text">Price &amp; volatility</h3>
              <span className="rounded-pill border border-dashed border-line px-2 py-0.5 text-mono-label text-text-muted">
                Sample data
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <LegendSwatch tone="bg-teal">Price</LegendSwatch>
              <LegendSwatch tone="bg-periwinkle">Volatility</LegendSwatch>
            </div>
          </div>

          <div className="mt-4 h-32 w-full sm:h-42.5">
            <PriceVolatilityChart />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 border-t border-line pt-4 sm:grid-cols-3">
            {SAMPLE_METRICS.map((metric) => (
              <KpiTile
                key={metric.label}
                label={metric.label}
                value={metric.value}
                delta={metric.delta}
                trend={metric.trend}
                caption={metric.caption}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-3">
        <p className="text-meta text-center">
          Sample data: a synthetic price path and its rolling volatility, generated for
          illustration. Not market data and not a performance claim.
        </p>
      </Reveal>
    </Section>
  );
}