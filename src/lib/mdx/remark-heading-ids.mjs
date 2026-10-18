/**
 * remark plugin: stable `id`s on every h2/h3 so the article sidebar's
 * "Contents" list can link to them.
 *
 * The ids are slugs of the heading text (`## Volatility clustering` ->
 * `volatility-clustering`), and src/lib/blog.ts derives the same ids from the
 * raw MDX source with the same rule, so the sidebar and the body never drift.
 * (`rehype-slug` would normally do this; it is not part of the installed set.)
 */

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function headingText(node) {
  let out = "";
  const walk = (n) => {
    if (!n || typeof n !== "object") return;
    if (typeof n.value === "string") out += n.value;
    if (Array.isArray(n.children)) n.children.forEach(walk);
  };
  walk(node);
  return out;
}

export default function remarkHeadingIds() {
  return (tree) => {
    const seen = new Map();
    const walk = (node) => {
      if (!node || typeof node !== "object") return;
      if (node.type === "heading" && node.depth >= 2) {
        const base = slugify(headingText(node)) || "section";
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        const id = count === 0 ? base : `${base}-${count + 1}`;
        node.data = { ...(node.data || {}), hProperties: { ...((node.data || {}).hProperties || {}), id } };
      }
      if (Array.isArray(node.children)) node.children.forEach(walk);
    };
    walk(tree);
  };
}
