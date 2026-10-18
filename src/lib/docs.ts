import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { extractHeadings, readString, type TocEntry } from "@/lib/content";
import { slugify } from "@/lib/mdx/remark-heading-ids.mjs";

/**
 * The documentation content layer (brief F7).
 *
 * Docs are MDX files in src/content/docs with YAML frontmatter (title, section,
 * order, summary). Like the blog and the briefs, they are read here - on the
 * server, at build time - rather than through @next/mdx, so one module owns the
 * frontmatter, the sidebar grouping and the heading list, and a stray .mdx file
 * never becomes a route of its own.
 *
 * Layout is decided by two frontmatter fields. `order` is unique across the whole
 * archive and sets both the reading sequence and the section sequence: sections
 * appear in the order their first page appears, and pages sit in order inside a
 * section. That keeps the prev/next chain and the sidebar in the same order,
 * which is what lets "next" read as "the page you would read next".
 *
 * The pieces the other archives share - the heading rule and the frontmatter
 * guards - live in src/lib/content.ts.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "docs");

/** The page /docs renders, and the first page of the reading order. */
export const DOCS_ENTRY_SLUG = "introduction";

export interface Doc {
  /** Path-derived id, e.g. "volatility-models-overview". */
  slug: string;
  /** Public route, e.g. "/docs/volatility-models-overview". */
  href: string;
  title: string;
  /** Sidebar group heading the page belongs to. */
  section: string;
  /** Stable id for the group, so anchors and keys never depend on the label. */
  sectionSlug: string;
  order: number;
  summary: string;
  body: string;
  /** h2/h3 headings, in document order, for the "On this page" list. */
  contents: TocEntry[];
}

/** The serialisable slice used by the sidebar and the prev/next links. */
export interface DocSummary {
  slug: string;
  href: string;
  title: string;
  section: string;
  summary: string;
}

export interface DocGroup {
  id: string;
  title: string;
  items: DocSummary[];
}

export interface DocNeighbours {
  prev: DocSummary | null;
  next: DocSummary | null;
}

/** Every .mdx file under src/content/docs, as a slash-separated relative path. */
function collectFiles(dir: string, prefix = ""): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix === "" ? entry.name : prefix + "/" + entry.name;
    if (entry.isDirectory()) return collectFiles(path.join(dir, entry.name), relative);
    return entry.name.endsWith(".mdx") ? [relative] : [];
  });
}

function parseDoc(file: string): Doc {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const where = "src/content/docs/" + file;

  const slug = file.replace(/\.mdx$/, "");
  const section = readString(data, "section", where);
  const order = Number(data.order);

  if (!Number.isFinite(order)) {
    throw new Error(where + ": frontmatter needs a numeric \"order\"");
  }

  const body = parsed.content.trim();

  return {
    slug,
    href: "/docs/" + slug,
    title: readString(data, "title", where),
    section,
    sectionSlug: slugify(section) || "docs",
    order,
    summary: readString(data, "summary", where),
    body,
    contents: extractHeadings(body),
  };
}

function toSummary(doc: Doc): DocSummary {
  return {
    slug: doc.slug,
    href: doc.href,
    title: doc.title,
    section: doc.section,
    summary: doc.summary,
  };
}

let cache: Doc[] | null = null;

/** Every page, in reading order. Read once per process. */
export function getAllDocs(): Doc[] {
  if (cache) return cache;

  cache = collectFiles(CONTENT_DIR)
    .map(parseDoc)
    .sort((a, b) => (a.order === b.order ? a.title.localeCompare(b.title) : a.order - b.order));

  return cache;
}

export function getDocSlugs(): string[] {
  return getAllDocs().map((doc) => doc.slug);
}

export function getDoc(slug: string): Doc | null {
  return getAllDocs().find((doc) => doc.slug === slug) ?? null;
}

/** The sidebar: one group per section, in reading order, each page in order. */
export function getDocGroups(): DocGroup[] {
  const groups: DocGroup[] = [];

  for (const doc of getAllDocs()) {
    let group = groups.find((candidate) => candidate.id === doc.sectionSlug);
    if (!group) {
      group = { id: doc.sectionSlug, title: doc.section, items: [] };
      groups.push(group);
    }
    group.items.push(toSummary(doc));
  }

  return groups;
}

/** The page before and after `slug` in reading order. */
export function getDocNeighbours(slug: string): DocNeighbours {
  const docs = getAllDocs();
  const index = docs.findIndex((doc) => doc.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? toSummary(docs[index - 1]) : null,
    next: index < docs.length - 1 ? toSummary(docs[index + 1]) : null,
  };
}
