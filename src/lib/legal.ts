import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { extractHeadings, formatIsoDate, readString, type TocEntry } from "@/lib/content";

/**
 * The legal pages content layer (brief F7).
 *
 * Small on purpose. Each page is an MDX file in src/content/legal carrying a
 * title, an updated date and a short summary for the metadata; the body is
 * compiled by the same pipeline as the blog and the briefs (see
 * src/components/blog/MdxContent.tsx).
 *
 * Every page is a DRAFT. The notice below is rendered as a banner by
 * src/components/legal/LegalLayout.tsx on all of them, so a reader can never land
 * on a page like this without seeing it - and so it disappears in one place once
 * the copy has been reviewed.
 */

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "legal");

/** Shown on every legal page. Single source of truth, shared with the layout. */
export const LEGAL_DRAFT_NOTICE =
  "Draft for legal review. Not for publication until reviewed by a qualified lawyer.";

export interface LegalDoc {
  /** Path-derived id, e.g. "terms". */
  slug: string;
  href: string;
  title: string;
  /** ISO yyyy-mm-dd, from frontmatter. */
  updated: string;
  /** Pre-formatted for display, so the page does no date maths. */
  updatedLabel: string;
  summary: string;
  body: string;
  /** h2/h3 headings, in document order, for the optional table of contents. */
  contents: TocEntry[];
}

function parseDoc(file: string): LegalDoc {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const where = "src/content/legal/" + file;
  const slug = file.replace(/\.mdx$/, "");
  const updated = readString(data, "updated", where);
  const body = parsed.content.trim();

  return {
    slug,
    href: "/" + slug,
    title: readString(data, "title", where),
    updated,
    updatedLabel: formatIsoDate(updated),
    summary: readString(data, "summary", where),
    body,
    contents: extractHeadings(body),
  };
}

let cache: LegalDoc[] | null = null;

/** Every legal page, in filename order. Read once per process. */
export function getAllLegalDocs(): LegalDoc[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }

  cache = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map(parseDoc);

  return cache;
}

export function getLegalDoc(slug: string): LegalDoc | null {
  return getAllLegalDocs().find((doc) => doc.slug === slug) ?? null;
}
