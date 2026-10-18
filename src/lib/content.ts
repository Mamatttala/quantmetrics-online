import { slugify } from "@/lib/mdx/remark-heading-ids.mjs";

/**
 * Helpers shared by the two MDX content archives - the blog
 * (src/lib/blog.ts) and the intelligence briefs (src/lib/briefs.ts).
 *
 * Everything here is server-only: these functions read frontmatter and walk raw
 * markdown, so they must never reach a client bundle. Both archives import the
 * types too, which keeps one cover vocabulary and one heading rule across the
 * site.
 */

/** Gradient covers. Zero binary assets: a cover is a token-driven fill. */
export type CoverVariant = "teal-blue" | "pink-coral" | "sunset";

export const COVER_VARIANTS: CoverVariant[] = ["teal-blue", "pink-coral", "sunset"];

/** Falls back to the teal-blue gradient rather than throwing on a typo. */
export function readCover(value: unknown, fallback: CoverVariant = "teal-blue"): CoverVariant {
  return COVER_VARIANTS.includes(value as CoverVariant) ? (value as CoverVariant) : fallback;
}

export interface TocEntry {
  id: string;
  title: string;
  depth: 2 | 3;
}

const FENCE = /^\s{0,3}(```+|~~~+)/;

/**
 * Headings for a sidebar "Contents" list. Read from the raw source rather than
 * the compiled tree, because the ids have to match the ones the remark plugin
 * writes (src/lib/mdx/remark-heading-ids.mjs) - both use the same slug rule, so
 * the anchors always resolve. Fenced code is skipped, so a hash comment inside
 * a snippet is not mistaken for a heading.
 */
export function extractHeadings(body: string): TocEntry[] {
  const out: TocEntry[] = [];
  const seen = new Map<string, number>();
  let fence = "";

  for (const line of body.split(/\r?\n/)) {
    const fenceMatch = FENCE.exec(line);
    if (fence === "") {
      if (fenceMatch) {
        fence = fenceMatch[1][0];
        continue;
      }
    } else {
      if (fenceMatch && fenceMatch[1][0] === fence) fence = "";
      continue;
    }

    const heading = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!heading) continue;

    const title = heading[2]
      .replace(/`.*?`/g, "")
      .replace(/[$*_]/g, "")
      .trim();
    if (title === "") continue;

    const base = slugify(title) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    out.push({
      id: count === 0 ? base : base + "-" + (count + 1),
      title,
      depth: heading[1].length === 2 ? 2 : 3,
    });
  }

  return out;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * "2026-09-18" -> "18 Sep 2026". Parsed by hand rather than through Date, so
 * the label cannot shift by a day with the build machine's timezone.
 */
export function formatIsoDate(iso: string): string {
  const [year, month, day] = String(iso).split("-").map(Number);
  if (!year || !month || !day || month < 1 || month > 12) return String(iso);
  return String(day) + " " + MONTHS[month - 1] + " " + year;
}

/** Required frontmatter string, with an error that names the file. */
export function readString(
  data: Record<string, unknown>,
  key: string,
  where: string,
): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(where + ": frontmatter is missing a string \"" + key + "\"");
  }
  return value.trim();
}

/** Optional frontmatter string. */
export function readOptionalString(data: Record<string, unknown>, key: string): string | null {
  const value = data[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

/** Optional frontmatter list of strings; anything else becomes an empty list. */
export function readStringList(data: Record<string, unknown>, key: string): string[] {
  const value = data[key];
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string" && item.trim() !== "")
    .map((item) => item.trim());
}
