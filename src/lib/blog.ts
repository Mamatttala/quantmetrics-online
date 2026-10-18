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
import { slugify } from "@/lib/mdx/remark-heading-ids.mjs";

/**
 * The blog content layer.
 *
 * Posts are MDX files in src/content/blog with YAML frontmatter. They are read
 * and parsed here - on the server, at build time - rather than through
 * @next/mdx's page extensions, because a blog needs more than a rendered
 * component: it needs the frontmatter for the index, the heading list for the
 * sidebar's Contents box, and a plain serialisable summary to hand to the
 * client-side filter and search. Loading the files ourselves keeps all of that
 * in one place, and keeps a stray .mdx file out of the route table.
 *
 * The body is compiled to React separately (see src/components/blog/MdxContent.tsx),
 * so this module stays pure data and can be imported from both the server and
 * the client without pulling the MDX compiler into the browser bundle.
 *
 * The pieces the intelligence briefs share with this module - the cover
 * vocabulary, the heading rule, the frontmatter guards - live in
 * src/lib/content.ts.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

/** Filter chips on the index. ALL is the default and is not a stored value. */
export const BLOG_CATEGORIES = ["ALL", "GUIDE", "TUTORIAL", "RESEARCH", "NEWS"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO yyyy-mm-dd; sortable and locale-free. */
  date: string;
  /** Pre-formatted for display, so cards do no date maths. */
  dateLabel: string;
  category: string;
  series: string;
  /** Every series this post belongs to, slugified. A post can sit in more than
   *  one: "Learn" is a cross-cutting series that runs alongside a topic series. */
  seriesSlugs: string[];
  tags: string[];
  author: string;
  authorRole: string;
  readTime: string;
  cover: CoverVariant;
}

export interface Post extends PostSummary {
  /** MDX body with the frontmatter stripped. */
  body: string;
  /** h2/h3 headings, in document order, for the sidebar. */
  contents: TocEntry[];
}

export interface BlogSeriesLink {
  slug: string;
  name: string;
  description: string;
  icon: "volatility" | "time" | "backtest" | "risk" | "learn";
}

/**
 * The "Explore series" rail. Declared here rather than derived from the posts,
 * so the carousel keeps its shape as the archive grows - a series with no posts
 * yet is still a signpost.
 */
export const BLOG_SERIES: BlogSeriesLink[] = [
  {
    slug: "volatility-forecasting",
    name: "Volatility Forecasting",
    description: "GARCH-family models, realised variance and the term structure of risk.",
    icon: "volatility",
  },
  {
    slug: "time-series-101",
    name: "Time Series 101",
    description: "Stationarity, autocorrelation and the diagnostics behind every model.",
    icon: "time",
  },
  {
    slug: "backtesting",
    name: "Backtesting",
    description: "Designing tests that can fail, and reading what survives them.",
    icon: "backtest",
  },
  {
    slug: "risk-metrics",
    name: "Risk Metrics",
    description: "Drawdown, exposure and tail measures, worked through end to end.",
    icon: "risk",
  },
];

/**
 * The cross-cutting "Learn" series behind /blog/learn. It is declared on its own
 * rather than added to BLOG_SERIES, so the blog index's Explore-series rail keeps
 * its four topic collections untouched; a post opts in by listing "Learn"
 * alongside its topic series in frontmatter.
 */
export const LEARN_SERIES: BlogSeriesLink = {
  slug: "learn",
  name: "Learn",
  description: "Foundational reads: the ideas behind each model, in the order they build.",
  icon: "learn",
};

export const LEARN_SERIES_SLUG = LEARN_SERIES.slug;

function parsePost(file: string): Post {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const where = "src/content/blog/" + file;

  const title = readString(data, "title", where);
  const excerpt = readString(data, "excerpt", where);
  const date = readString(data, "date", where);
  const seriesNames = readSeries(data, where);
  const body = parsed.content.trim();

  return {
    slug: file.replace(/\.mdx$/, ""),
    title,
    excerpt,
    date,
    dateLabel: formatIsoDate(date),
    category: readString(data, "category", where).toUpperCase(),
    series: seriesNames[0],
    seriesSlugs: uniqueSlugs(seriesNames),
    tags: readStringList(data, "tags"),
    author: readString(data, "author", where),
    authorRole: typeof data.authorRole === "string" ? data.authorRole : "Quantmetrics-Lab",
    readTime: readString(data, "readTime", where),
    cover: readCover(data.cover),
    body,
    contents: extractHeadings(body),
  };
}

let cache: Post[] | null = null;

/**
 * `series` is normally a single string, but a post may also list several so it
 * can belong to its topic series and to the cross-cutting "Learn" series at the
 * same time. The first entry is the display name; every entry becomes a slug.
 */
function readSeries(data: Record<string, unknown>, where: string): string[] {
  const value = data.series;
  const list = Array.isArray(value)
    ? value
        .filter((item): item is string => typeof item === "string" && item.trim() !== "" )
        .map((item) => item.trim())
    : typeof value === "string" && value.trim() !== ""
      ? [value.trim()]
      : [];

  if (list.length === 0) {
    throw new Error(where + ': frontmatter is missing a "series" string or list');
  }

  return list;
}

function uniqueSlugs(names: string[]): string[] {
  return Array.from(new Set(names.map((name) => slugify(name)).filter((slug) => slug !== "")));
}

/** Every post, newest first. Read once per process. */
export function getAllPosts(): Post[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return cache;
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

/** Posts that belong to a series, newest first. Drives /blog/learn. */
export function getPostsInSeries(seriesSlug: string): Post[] {
  return getAllPosts().filter((post) => post.seriesSlugs.includes(seriesSlug));
}

/**
 * The serialisable slice handed to the client-side browser. Bodies stay on the
 * server: the grid needs a title, an excerpt and a cover, nothing more.
 */
export function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    dateLabel: post.dateLabel,
    category: post.category,
    series: post.series,
    seriesSlugs: post.seriesSlugs,
    tags: post.tags,
    author: post.author,
    authorRole: post.authorRole,
    readTime: post.readTime,
    cover: post.cover,
  };
}
