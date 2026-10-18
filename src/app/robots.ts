import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * robots.txt, generated at build time by the App Router file convention.
 *
 * Two kinds of exclusion, for two different reasons:
 *
 * `DISALLOWED` holds routes that must never be indexed - the temporary
 * styleguide, the mocked auth pages and the API. Each of those also sets
 * `robots: noindex` in its own metadata, so the instruction survives even if a
 * crawler reaches the page from an external link rather than through this file.
 *
 * The legal drafts are deliberately NOT disallowed here. They already carry
 * `robots: noindex`, and a disallow would stop a crawler from reading that
 * instruction, which is the classic way a "hidden" draft ends up indexed
 * through a link. They are left crawlable and noindexed, which is the
 * combination that actually keeps them out.
 */
const DISALLOWED = ["/styleguide", "/auth/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED,
      },
    ],
    sitemap: SITE_URL + "/sitemap.xml",
    host: SITE_URL,
  };
}
