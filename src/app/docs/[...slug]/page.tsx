import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/blog/MdxContent";
import { DocsLayout } from "@/components/docs/DocsLayout";
import { getDoc, getDocGroups, getDocNeighbours, getDocSlugs } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

/** Every page is prerendered; the archive is small and build-time known. */
export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));

  if (!doc) return { title: "Docs" };

  return {
    title: doc.title,
    description: doc.summary,
    openGraph: {
      type: "article",
      url: SITE_URL + doc.href,
      title: doc.title,
      description: doc.summary,
    },
  };
}

/**
 * One documentation page (brief F7). The catch-all segment is used rather than a
 * single `[slug]` so a future section can nest without a new route, while the
 * sidebar still groups by the frontmatter `section`.
 */
export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));

  if (!doc) notFound();

  return (
    <DocsLayout
      title={doc.title}
      section={doc.section}
      summary={doc.summary}
      activeSlug={doc.slug}
      groups={getDocGroups()}
      contents={doc.contents}
      neighbours={getDocNeighbours(doc.slug)}
    >
      <MdxContent body={doc.body} />
    </DocsLayout>
  );
}
