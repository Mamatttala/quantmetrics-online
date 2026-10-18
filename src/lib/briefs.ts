import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import {
  extractHeadings,
  formatIsoDate,
  readCover,
  readString,
  readStringList,
  type CoverVariant,
  type TocEntry,
} from "@/lib/content";

/**
 * The intelligence-brief content layer.
 *
 * Briefs are MDX files in src/content/briefs with YAML frontmatter. Structurally
 * they mirror the blog (see src/lib/blog.ts): the same frontmatter guards, the
 * same heading rule for the sidebar, the same cover vocabulary. What differs is
 * the extra frontmatter - takeaways, methodology, dataSources and the
 * aiGenerated flag - which drive the two boxes on the detail page, and the fact
 * that every brief is machine-drafted, which the AiBadge states on every card.
 *
 * Everything here is illustrative. The sample briefs describe methods and
 * synthetic figures, never observed market data and never a recommendation.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "briefs");

/** Filter chips on the index. ALL is the default and is not a stored value. */
export const BRIEF_CATEGORIES = ["ALL", "MARKETS", "VOLATILITY", "MACRO", "IDEAS"] as const;
export type BriefCategory = (typeof BRIEF_CATEGORIES)[number];

/**
 * Covers are derived from the category rather than stored per file, so a brief's
 * frontmatter stays the short list above and the grid keeps one colour per
 * topic. MACRO is currently empty; its chip renders the shared empty state.
 */
const COVER_BY_CATEGORY: Record<string, CoverVariant> = {
  VOLATILITY: "teal-blue",
  MARKETS: "pink-coral",
  MACRO: "sunset",
  IDEAS: "teal-blue",
};

export interface BriefSummary {
  slug: string;
  title: string;
  /** The 2-line card excerpt; also the article standfirst. */
  summary: string;
  /** ISO yyyy-mm-dd; sortable and locale-free. */
  date: string;
  /** Pre-formatted for display, so cards do no date maths. */
  dateLabel: string;
  category: string;
  tags: string[];
  cover: CoverVariant;
  aiGenerated: boolean;
}

export interface Brief extends BriefSummary {
  body: string;
  contents: TocEntry[];
  /** Bullets for the "Key takeaways" box. */
  takeaways: string[];
  /** One paragraph for the "Methodology & data" box. */
  methodology: string;
  /** Bullets for the data-sources list inside that box. */
  dataSources: string[];
}

function parseBrief(file: string): Brief {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const where = "src/content/briefs/" + file;

  const date = readString(data, "date", where);
  const category = readString(data, "category", where).toUpperCase();
  const body = parsed.content.trim();

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: readString(data, "title", where),
    summary: readString(data, "summary", where),
    date,
    dateLabel: formatIsoDate(date),
    category,
    tags: readStringList(data, "tags"),
    cover: readCover(COVER_BY_CATEGORY[category]),
    aiGenerated: data.aiGenerated === true,
    body,
    contents: extractHeadings(body),
    takeaways: readStringList(data, "takeaways"),
    methodology: readString(data, "methodology", where),
    dataSources: readStringList(data, "dataSources"),
  };
}

let cache: Brief[] | null = null;

/** Every brief, newest first. Read once per process. */
export function getAllBriefs(): Brief[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parseBrief)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return cache;
}

export function getBriefSlugs(): string[] {
  return getAllBriefs().map((brief) => brief.slug);
}

export function getBrief(slug: string): Brief | null {
  return getAllBriefs().find((brief) => brief.slug === slug) ?? null;
}

/** The serialisable slice handed to the client-side filter and search. */
export function toBriefSummary(brief: Brief): BriefSummary {
  return {
    slug: brief.slug,
    title: brief.title,
    summary: brief.summary,
    date: brief.date,
    dateLabel: brief.dateLabel,
    category: brief.category,
    tags: brief.tags,
    cover: brief.cover,
    aiGenerated: brief.aiGenerated,
  };
}

/* =============================================================================
   Home page rail (brief F1.8)
   -----------------------------------------------------------------------------
   The home "latest briefs" row used to read a hard-coded placeholder list. It
   now derives the three newest entries from the archive above, so publishing a
   brief updates the home row with no second edit. The shape is the one
   LatestBriefs.tsx already consumed, which is why that component is unchanged.
   ============================================================================= */

export interface HomeBrief {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  coverTitle: string;
  href: string;
  variant: CoverVariant;
}

export const HOME_BRIEFS: HomeBrief[] = getAllBriefs()
  .slice(0, 3)
  .map((brief) => ({
    title: brief.title,
    excerpt: brief.summary,
    category: brief.category,
    date: brief.dateLabel,
    coverTitle: brief.category,
    href: "/insights/" + brief.slug,
    variant: brief.cover,
  }));
