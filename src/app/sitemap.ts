import type { MetadataRoute } from "next";

import { getAllBriefs } from "@/lib/briefs";
import { getAllPosts } from "@/lib/blog";
import { getAllDocs } from "@/lib/docs";
import { absoluteUrl } from "@/lib/site";

/**
 * sitemap.xml, generated at build time.
 *
 * The entries are derived from the same content layers the routes use, so
 * publishing an MDX file adds it to the sitemap with no second edit and no
 * chance of the two drifting apart.
 *
 * Deliberately absent: `/styleguide` (temporary), `/auth/*` (mocked, noindex),
 * `/api/*` (not a page), and `/terms`, `/privacy`, `/copyright` - legal drafts
 * ship with `robots: noindex`, and listing a noindex URL in a sitemap asks a
 * crawler to fetch a page it is then told to drop. They join the sitemap when
 * the DRAFT banner comes off.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const briefs = getAllBriefs();
  const docs = getAllDocs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/insights"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/docs"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog/learn"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
  ];

  // Dates come from frontmatter, so `lastModified` is the editorial date rather
  // than the build date - a rebuild does not claim every page changed.
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl("/blog/" + post.slug),
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const briefRoutes: MetadataRoute.Sitemap = briefs.map((brief) => ({
    url: absoluteUrl("/insights/" + brief.slug),
    lastModified: new Date(brief.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Docs carry an `order` but no date, so they get no lastModified rather than
  // a fabricated one.
  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: absoluteUrl(doc.href),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...briefRoutes, ...docRoutes];
}
