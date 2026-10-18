/**
 * Minimal ambient types for gray-matter@2.
 *
 * The package ships no declarations and there is no @types/gray-matter, so this
 * file describes exactly the surface src/lib/blog.ts uses: parse a string and
 * hand back the frontmatter object plus the remaining body.
 */
declare module "gray-matter" {
  export interface GrayMatterResult {
    data: Record<string, unknown>;
    content: string;
    excerpt?: string;
    isEmpty?: boolean;
  }

  export default function matter(input: string, options?: Record<string, unknown>): GrayMatterResult;
}
