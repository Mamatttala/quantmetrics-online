/**
 * Canonical site identity.
 *
 * The absolute origin used to live as a literal in every route's `openGraph`
 * block plus a second copy as a `SITE_URL` constant in the two article routes.
 * `robots.ts` and `sitemap.ts` now need it as well, so it is declared once here
 * and imported everywhere. Absolute URLs exist in three places only: this
 * constant, the `metadataBase` in `src/app/layout.tsx`, and the share links the
 * article routes build on the server.
 */

/** No trailing slash: every caller concatenates a path that starts with "/". */
export const SITE_URL = "https://quantmetrics.online";

export const SITE_NAME = "Quantmetrics-Lab";

export const SITE_TAGLINE = "Quantitative intelligence for the rhythm of markets";

/**
 * The one-line description used as the fallback `description` and in the
 * share image. States the research-only footing, which is the site's standing
 * editorial rule.
 */
export const SITE_DESCRIPTION =
  "Institutional-grade data analysis, research and AI-drafted briefs, in one lab. Research and education only.";

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : SITE_URL + path;
}
