import "katex/dist/katex.min.css";

import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import { mdxComponents } from "@/mdx-components";
import { preprocessMath } from "@/lib/mdx/preprocess-math.mjs";
import remarkHeadingIds from "@/lib/mdx/remark-heading-ids.mjs";

export interface MdxContentProps {
  /** Raw MDX body, frontmatter already stripped. */
  body: string;
}

/**
 * Compiles an MDX body and renders it.
 *
 * This runs on the server only. The article route is statically generated, so
 * compilation happens once at build time and the browser receives HTML.
 *
 * @next/mdx is deliberately not in the chain: it turns every .mdx file in the
 * project into a route, which is the opposite of what a frontmatter-driven
 * archive needs. Compiling here instead keeps post metadata, the search index
 * and the heading anchors in one place (see src/lib/blog.ts).
 *
 * preprocessMath runs first: it replaces the dollar-delimited maths runs with
 * JSX elements, because markdown claims the underscore, caret and bracket
 * characters for itself and would otherwise split a formula into fragments
 * before any plugin could see it whole.
 */
export async function MdxContent({ body }: MdxContentProps) {
  const source = preprocessMath(body);

  const compiled = await compile(source, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkHeadingIds],
  });

  const Content = (await run(compiled, { ...runtime })).default;

  return <Content components={mdxComponents} />;
}
