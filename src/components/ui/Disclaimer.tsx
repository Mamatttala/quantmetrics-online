import { FOOTER_DISCLAIMER } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export interface DisclaimerProps {
  className?: string;
}

/**
 * The "not investment advice" line (brief section A): it belongs in the footer
 * and on every Insights or brief surface. The copy itself lives in
 * src/lib/navigation.ts next to the other footer strings, so the footer and the
 * content pages cannot drift apart.
 */
export function Disclaimer({ className }: DisclaimerProps) {
  return <p className={cn("text-meta", className)}>{FOOTER_DISCLAIMER}</p>;
}
