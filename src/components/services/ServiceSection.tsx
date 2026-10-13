import { SERVICE_ARTWORK } from "@/components/brand/ServiceArtwork";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import type { ServiceSectionContent } from "@/lib/services";
import { cn } from "@/lib/utils";

export interface ServiceSectionProps extends ServiceSectionContent {
  /** Puts the artwork in the first column, so consecutive sections alternate. */
  visualFirst?: boolean;
}

/**
 * One service in the bordered two-column layout of brief F2: copy on one side
 * (eyebrow, serif heading, summary, the method list and a link) and the
 * thin-line artwork on the other. The two columns are separated by a single
 * hairline, and the whole block is closed by a 1px frame, so it reads as one
 * cell of the page's blueprint grid.
 *
 * The `id` on the block is the deep-link target the header mega menu uses
 * (`/services#research`, `#analysis`, `#metrics`); the global
 * `scroll-padding-top` keeps those anchors clear of the fixed bar.
 */
export function ServiceSection({
  id,
  eyebrow,
  title,
  summary,
  details,
  linkLabel,
  linkHref,
  visualFirst = false,
}: ServiceSectionProps) {
  const Artwork = SERVICE_ARTWORK[id];

  return (
    <Section grid={false}>
      <Reveal>
        <div id={id} className="grid grid-cols-1 border border-line lg:grid-cols-2">
          <div className="p-4 lg:p-6">
            <EyebrowChip>{eyebrow}</EyebrowChip>

            <h2 className="text-section-heading mt-3 max-w-[22ch]">{title}</h2>

            <p className="text-meta mt-3 max-w-[54ch]">{summary}</p>

            <ul className="mt-5 flex flex-col border-t border-line">
              {details.map((detail) => (
                <li
                  key={detail.label}
                  className="flex flex-col gap-1 border-b border-line py-2 sm:flex-row sm:gap-3"
                >
                  <span className="text-mono-label w-40 shrink-0 pt-0.5 text-text">{detail.label}</span>
                  <span className="text-meta">{detail.body}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <Button href={linkHref} variant="outline" trailingArrow>
                {linkLabel}
              </Button>
            </div>
          </div>

          {/* Artwork cell. Only one of the two side borders is ever emitted, so
              the hairline can never double up when the column order flips. */}
          <div
            className={cn(
              "flex items-center justify-center border-t border-line bg-bg-elev p-4 lg:border-t-0 lg:p-6",
              visualFirst ? "lg:order-first lg:border-r" : "lg:border-l",
            )}
          >
            <Artwork className="h-auto w-full max-w-[34rem] text-text-muted" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}