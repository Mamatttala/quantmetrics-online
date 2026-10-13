import { Container } from "@/components/layout/Container";
import { StatCell } from "@/components/ui/StatCell";
import { SERVICE_STATS } from "@/lib/services";
import { cn } from "@/lib/utils";

/**
 * Services stats band (brief F2): five placeholder cells on the same blueprint
 * band as the home hero strip - square cells, crisp `--line-strong` dividers,
 * one shared horizontal rule top and bottom. Below `md` the strip scrolls
 * horizontally, exactly as the brief's responsive section asks for.
 *
 * The figures are placeholders; see the TODO on SERVICE_STATS.
 */
export function ServiceStatsBand() {
  return (
    <div className="border-y border-line-strong bg-lavender">
      <Container>
        <div className="flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible">
          {SERVICE_STATS.map((stat, index) => (
            <StatCell
              key={stat.caption}
              layout="inline"
              shape="square"
              align="center"
              value={stat.value}
              caption={stat.caption}
              className={cn(
                "min-h-9 min-w-32 shrink-0 snap-start border-x border-line-strong md:min-w-0",
                index > 0 && "-ml-px",
              )}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}