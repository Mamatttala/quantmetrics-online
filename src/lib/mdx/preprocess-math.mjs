/**
 * Source-level maths preprocessor.
 *
 * WHY THIS EXISTS
 * The brief asks for MDX + KaTeX. The two community plugins that normally do
 * this (`remark-math` + `rehype-katex`) only work in their modern majors, which
 * are ESM-only and built on micromark. The versions pinned in this project are
 * `remark-math@3` and `rehype-katex@1.2`, which hook the pre-micromark
 * remark-parse tokenizer and therefore do nothing inside the MDX 3 pipeline:
 * maths was passed through as literal `$...$` text. `micromark-extension-math`
 * is not installed either, so there is no working plugin path.
 *
 * WHY IT RUNS ON THE SOURCE, NOT ON THE TREE
 * A remark plugin sees the document only after markdown has tokenised it, and
 * TeX is full of characters markdown claims for itself: `_` becomes emphasis,
 * `^`/`*` become text, `[` becomes a link label. A run such as
 * `$\varepsilon_{t-1}^2$` therefore arrives split across several inline nodes
 * and can never be reassembled reliably. Rewriting the raw text before the
 * parser runs sidesteps the whole problem: by the time MDX sees the document,
 * the maths is already a JSX element.
 *
 * WHAT IT PRODUCES
 * Every `$inline$` becomes `<InlineMath tex={"..."} />` and every `$$display$$`
 * becomes `<DisplayMath tex={"..."} />`. The TeX is written as a *JavaScript
 * string literal* (via JSON.stringify), not as a quoted attribute, so
 * backslashes, braces, quotes and newlines all survive parsing untouched. The
 * React components that render it live in src/mdx-components.tsx and call
 * katex.renderToString.
 *
 * WHAT IT LEAVES ALONE
 * Fenced code blocks, inline code spans, escaped `\$` and the frontmatter are
 * never rewritten, so a shell snippet containing `$PATH` or a Python snippet
 * containing `$` still prints exactly as written.
 */

const BACKTICK = "`";
const FENCE_RE = /^ {0,3}(`{3,}|~{3,})/;

function isEscaped(source, index) {
  let backslashes = 0;
  for (let i = index - 1; i >= 0 && source[i] === "\\"; i -= 1) backslashes += 1;
  return backslashes % 2 === 1;
}

/** True when everything on the `$$` delimiters own lines is whitespace. */
function isBlankAround(source, start, end) {
  const lineStart = source.lastIndexOf("\n", start - 1) + 1;
  if (source.slice(lineStart, start).trim() !== "") return false;
  const nextNewline = source.indexOf("\n", end);
  const lineEnd = nextNewline === -1 ? source.length : nextNewline;
  return source.slice(end, lineEnd).trim() === "";
}

function mathJsx(name, tex, block) {
  const element = "<" + name + " tex={" + JSON.stringify(tex) + "} />";
  return block ? "\n\n" + element + "\n\n" : element;
}

function findDisplayClose(source, from) {
  let index = source.indexOf("$$", from);
  while (index !== -1) {
    if (!isEscaped(source, index)) return index;
    index = source.indexOf("$$", index + 2);
  }
  return -1;
}

function findInlineClose(source, from) {
  for (let i = from; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === "\n") return -1;
    if (ch !== "$" || isEscaped(source, i)) continue;
    if (/\s/.test(source[i - 1] || "")) continue;
    if (/[0-9]/.test(source[i + 1] || "")) continue;
    return i;
  }
  return -1;
}

/** Rewrite maths in one run of lines that no fence covers. */
function processRun(source) {
  let out = "";
  let i = 0;
  const n = source.length;

  while (i < n) {
    const ch = source[i];

    // An inline code span is copied verbatim, so `$` inside it stays literal.
    if (ch === BACKTICK) {
      let len = 0;
      while (source[i + len] === BACKTICK) len += 1;
      const run = BACKTICK.repeat(len);
      const close = source.indexOf(run, i + len);
      if (close === -1) {
        out += run;
        i += len;
        continue;
      }
      out += source.slice(i, close + len);
      i = close + len;
      continue;
    }

    if (ch === "$" && !isEscaped(source, i)) {
      if (source[i + 1] === "$") {
        const close = findDisplayClose(source, i + 2);
        if (close !== -1 && source.slice(i + 2, close).trim() !== "") {
          const block = isBlankAround(source, i, close + 2);
          out += mathJsx("DisplayMath", source.slice(i + 2, close).trim(), block);
          i = close + 2;
          continue;
        }
      } else {
        const next = source[i + 1];
        if (next && !/\s/.test(next)) {
          const close = findInlineClose(source, i + 1);
          if (close !== -1 && source.slice(i + 1, close).trim() !== "") {
            out += mathJsx("InlineMath", source.slice(i + 1, close), false);
            i = close + 1;
            continue;
          }
        }
      }
    }

    out += ch;
    i += 1;
  }

  return out;
}

/**
 * Rewrite every maths run in a document body. Frontmatter must already be
 * stripped (see src/lib/blog.ts), because `---` fences are not code fences.
 */
export function preprocessMath(source) {
  const lines = source.split("\n");
  const fenced = new Array(lines.length).fill(false);
  let marker = "";
  let markerLength = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const match = FENCE_RE.exec(lines[i]);
    if (marker === "") {
      if (match) {
        marker = match[1][0];
        markerLength = match[1].length;
        fenced[i] = true;
      }
      continue;
    }
    fenced[i] = true;
    if (match && match[1][0] === marker && match[1].length >= markerLength) {
      marker = "";
      markerLength = 0;
    }
  }

  const out = [];
  let buffer = [];
  const flush = () => {
    if (buffer.length === 0) return;
    out.push(processRun(buffer.join("\n")));
    buffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    if (fenced[i]) {
      flush();
      out.push(lines[i]);
    } else {
      buffer.push(lines[i]);
    }
  }
  flush();

  return out.join("\n");
}
