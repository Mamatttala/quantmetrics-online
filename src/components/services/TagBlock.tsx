import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { Chip } from "@/components/ui/Chip";
import { TAG_BLOCK, TAG_PANELS } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Tag block (brief F2): the large serif heading on the left, and on the right
 * two rounded panels of dashed mono chips. The second panel sits on `--bg-hover`
 * as the brief specifies, so the pair reads as related rather than repeated.
 */
export function TagBlock() {
  return (
    <Section grid={false}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
        <Reveal>
          <EyebrowChip>{TAG_BLOCK.eyebrow}</EyebrowChip>
          <h2 className="text-h2 mt-3 max-w-[16ch]">{TAG_BLOCK.title}</h2>
          <p className="text-body mt-3 max-w-[46ch] text-text-muted">{TAG_BLOCK.summary}</p>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          {TAG_PANELS.map((panel, index) => (
            <div
              key={panel.title}
              className={cn(
                "rounded-card border border-line p-4",
                index === 1 ? "bg-bg-hover" : "bg-bg-elev",
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-cell-title text-text">{panel.title}</h3>
                <span className="text-mono-label text-text-dim">{panel.caption}</span>
              </div>

              <ul className="mt-3 flex flex-wrap gap-1">
                {panel.tags.map((tag) => (
                  <li key={tag}>
                    <Chip variant="tag">{tag}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}