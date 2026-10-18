import type { Metadata } from "next";

import { BlogBrowser } from "@/components/blog/BlogBrowser";
import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Section } from "@/components/layout/Section";
import { BLOG_CATEGORIES, BLOG_SERIES, getAllPosts, toSummary } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials, guides and research notes on quantitative finance: volatility modelling, time series diagnostics and backtesting practice. For research and education only.",
  openGraph: {
    type: "website",
    url: SITE_URL + "/blog",
    title: "Blog - Quantmetrics-Lab",
    description:
      "Tutorials, guides and research notes on quantitative finance, from volatility modelling to backtesting practice.",
  },
};

/**
 * The blog index (brief F4). The page is a server component: it reads the MDX
 * archive once at build time and hands the client browser a plain array of
 * summaries, so the filter, search and carousel need no network round trip.
 */
export default function BlogPage() {
  const posts = getAllPosts().map(toSummary);

  return (
    <main>
      <Section grid={false} divider={false} spacing="none" innerClassName="pt-10 pb-4">
        <div className="flex flex-col items-center text-center">
          <EyebrowChip>Blog</EyebrowChip>
          <h1 className="text-h2 mt-3 max-w-[22ch]">Guides, tutorials and research notes</h1>
          <p className="text-meta mt-3 max-w-[58ch]">
            Worked-through methods from the lab: volatility models, time series diagnostics and
            backtesting practice, written to be reproduced.
          </p>
        </div>
      </Section>

      <Section grid={3} spacing="none" innerClassName="pt-4 pb-12">
        <BlogBrowser posts={posts} series={BLOG_SERIES} categories={BLOG_CATEGORIES} />
      </Section>
    </main>
  );
}
