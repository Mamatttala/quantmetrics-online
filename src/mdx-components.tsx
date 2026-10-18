import katex from "katex";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * The element map for compiled MDX article bodies.
 *
 * Every element is styled here rather than through a typographic plugin, so the
 * article body inherits the same tokens as the rest of the site: hairlines for
 * code and formula blocks, the display serif for section headings, the
 * grotesk for prose, and the mono face for code.
 *
 * InlineMath and DisplayMath are not standard elements. They are emitted by
 * src/lib/mdx/preprocess-math.mjs, which rewrites $...$ and $$...$$ into JSX
 * before MDX ever parses the document (see that file for why the usual
 * remark-math / rehype-katex pair cannot do it here), and they render through
 * the installed katex package.
 */

/** KaTeX, with "throw on error" off: a typo renders in place instead of breaking the build. */
function renderTex(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: false,
  });
}

function InlineMath({ tex }: { tex?: string }) {
  if (typeof tex !== "string" || tex.trim() === "") return null;
  return (
    <span
      className="whitespace-nowrap"
      dangerouslySetInnerHTML={{ __html: renderTex(tex, false) }}
    />
  );
}

/**
 * Display maths sits in the same box treatment as a code block - --bg-elev fill,
 * 1px hairline, 12px radius - so a formula reads as a figure rather than as a
 * line of prose.
 */
function DisplayMath({ tex }: { tex?: string }) {
  if (typeof tex !== "string" || tex.trim() === "") return null;
  return (
    <div className="formula-block mt-6 overflow-x-auto rounded-input border border-line bg-bg-elev px-4 py-5 text-center">
      <span dangerouslySetInnerHTML={{ __html: renderTex(tex, true) }} />
    </div>
  );
}

const LINK =
  "text-text underline decoration-line underline-offset-[3px] transition-colors " +
  "duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text";

export const mdxComponents: MDXComponents = {
  h1: ({ className, children, ...rest }: ComponentPropsWithoutRef<"h1">) => (
    <h2 className={cn("text-section-heading mt-10 mb-4", className)} {...rest}>
      {children}
    </h2>
  ),

  h2: ({ className, children, ...rest }: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={cn("text-section-heading mt-10 mb-4", className)} {...rest}>
      {children}
    </h2>
  ),

  h3: ({ className, children, ...rest }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn("mt-8 mb-3 text-[1.375rem] leading-snug font-medium tracking-[-0.02em]", className)}
      {...rest}
    >
      {children}
    </h3>
  ),

  h4: ({ className, children, ...rest }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={cn("mt-6 mb-2 text-[1.125rem] leading-snug font-medium tracking-[-0.02em]", className)}
      {...rest}
    >
      {children}
    </h4>
  ),

  p: ({ className, ...rest }: ComponentPropsWithoutRef<"p">) => (
    <p className={cn("text-body-lg mt-4", className)} {...rest} />
  ),

  a: ({ className, ...rest }: ComponentPropsWithoutRef<"a">) => (
    <a className={cn(LINK, className)} {...rest} />
  ),

  strong: ({ className, ...rest }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-medium text-text", className)} {...rest} />
  ),

  em: ({ className, ...rest }: ComponentPropsWithoutRef<"em">) => (
    <em className={cn("italic", className)} {...rest} />
  ),

  ul: ({ className, ...rest }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn("text-body-lg marker:text-text-dim mt-4 flex list-disc flex-col gap-2 pl-5", className)}
      {...rest}
    />
  ),

  ol: ({ className, ...rest }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn("text-body-lg marker:text-text-dim mt-4 flex list-decimal flex-col gap-2 pl-5", className)}
      {...rest}
    />
  ),

  li: ({ className, ...rest }: ComponentPropsWithoutRef<"li">) => (
    <li className={cn("text-body-lg pl-1", className)} {...rest} />
  ),

  blockquote: ({ className, ...rest }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cn("text-body-lg mt-6 border-l border-line pl-5 text-text-muted", className)}
      {...rest}
    />
  ),

  hr: ({ className, ...rest }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={cn("my-8 h-px border-0 bg-line", className)} {...rest} />
  ),

  /*
   * Inline code carries its own hairline box. Inside a pre element that box is
   * neutralised, because the block already draws one - see the pre entry below.
   */
  code: ({ className, ...rest }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "rounded-sm border border-line bg-bg-elev px-1 py-0.5 font-mono text-[0.85em]",
        "[pre_&]:rounded-none [pre_&]:border-0 [pre_&]:bg-transparent [pre_&]:p-0",
        className,
      )}
      {...rest}
    />
  ),

  pre: ({ className, ...rest }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-input border border-line bg-bg-elev p-4",
        "font-mono text-[0.8125rem] leading-[1.75]",
        className,
      )}
      {...rest}
    />
  ),

  table: ({ className, ...rest }: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-6 overflow-x-auto">
      <table className={cn("text-meta w-full border-collapse", className)} {...rest} />
    </div>
  ),

  th: ({ className, ...rest }: ComponentPropsWithoutRef<"th">) => (
    <th className={cn("border border-line px-3 py-2 text-left text-mono-label text-text", className)} {...rest} />
  ),

  td: ({ className, ...rest }: ComponentPropsWithoutRef<"td">) => (
    <td className={cn("border border-line px-3 py-2 align-top text-text-muted", className)} {...rest} />
  ),

  InlineMath,
  DisplayMath,
};
