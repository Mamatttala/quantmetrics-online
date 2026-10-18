/**
 * Regression test for the maths preprocessor.
 *
 * Run with:  npm run verify:math
 *
 * The point of the file is the CURRENCY cases. A dollar sign is both the TeX
 * delimiter and the money symbol, so a naive rule turns "costs $5 and $10"
 * into one formula spanning the gap between two prices. These cases pin the two
 * guards that prevent it: the opening delimiter must be followed immediately by
 * non-whitespace, and the closing one must not be followed by a digit.
 *
 * The project has no test runner (and no network to install one), so this is a
 * dependency-free node:assert script rather than a framework suite.
 */
import assert from "node:assert/strict";

import { preprocessMath } from "../src/lib/mdx/preprocess-math.mjs";

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    passed += 1;
    console.log("  ok   " + name);
  } catch (error) {
    failed += 1;
    console.error("  FAIL " + name);
    console.error("       " + String(error.message).split("\n")[0]);
  }
}

function isMath(source) {
  return source.includes("<InlineMath") || source.includes("<DisplayMath");
}

/** Currency, code and escaped text must survive untouched. */
const NOT_MATH = [
  ["bare amount", "The dataset costs $100 per seat."],
  ["range", "Fees run from $5 to $10 per trade."],
  ["two amounts joined by 'and'", "That costs $5 and $10 respectively."],
  ["amounts around other words", "costs $5 and $10"],
  ["two amounts in a full sentence", "A $5 commission on a $10,000 position is 5 basis points of notional."],
  ["thousands separators", "Between $1,000,000 and $2,000,000 was committed."],
  ["amount at end of sentence", "The licence is $250."],
  ["space after the delimiter", "A marker $ like this, and a closing $ too."],
  ["escaped delimiter", "An escaped \\$5 stays literal."],
  ["inline code", "Run `echo $HOME` in the shell."],
  ["fenced code", "Text\n\n```sh\ncost=$42\n```\n\nMore text."],
  ["amount then a delimited-looking token", "Fees run from $5 to $x per share."],
  ["hyphenated range", "Tiers are $5-$10 and $50-$100."],
  ["price list", "It costs $5, or $9.99 with tax."],
  ["no delimiters at all", "Plain prose about volatility and persistence."],
];

/** Real maths must still be converted. */
const IS_MATH = [
  ["inline variable", "The series $x_t$ is stationary."],
  ["inline greek with script", "The variance $\\sigma^2$ is finite."],
  ["inline with underscore and caret", "Fit $\\varepsilon_{t-1}^2$ carefully."],
  ["inline with sum", "Then $\\sum_{i=1}^{p} \\alpha_i$ follows."],
  ["inline with operatorname", "Report $\\operatorname{Var}(y_t)$."],
  ["display block", "Text.\n\n$$\n\\sigma_t^2 = \\omega + \\alpha \\varepsilon_{t-1}^2\n$$\n\nMore text."],
  ["two inline runs in one paragraph", "First $a_t$ and then $b_t$ appear."],
];

console.log("not maths (must be left alone):");
for (const [name, source] of NOT_MATH) {
  check(name, () => {
    const output = preprocessMath(source);
    assert.equal(isMath(output), false, "was converted to maths: " + JSON.stringify(output));
  });
}

console.log("");
console.log("maths (must be converted):");
for (const [name, source] of IS_MATH) {
  check(name, () => {
    const output = preprocessMath(source);
    assert.equal(isMath(output), true, "was NOT converted: " + JSON.stringify(source));
  });
}

console.log("");
console.log("detail:");
check("a currency amount next to a formula is not swallowed into it", () => {
  const output = preprocessMath("It costs $5, and the variance $\\sigma^2$ is finite.");
  assert.equal((output.match(/<InlineMath/g) || []).length, 1, "expected exactly one formula: " + output);
  assert.ok(output.includes(String.fromCharCode(92) + "sigma^2"), "the formula lost its TeX: " + output);
});
check("inline TeX keeps its backslashes and braces", () => {
  const output = preprocessMath("Fit $\\varepsilon_{t-1}^2$ here.");
  const BS = String.fromCharCode(92);
  // The attribute is a JS string literal, so a TeX backslash appears doubled here
  // and MDX evaluates it back to one before katex.renderToString sees it.
  assert.ok(output.includes('tex={"' + BS + BS + 'varepsilon_{t-1}^2"}'), "got: " + output);
});
check("display TeX is trimmed into a single-line attribute", () => {
  const output = preprocessMath("$$\na + b\n$$");
  assert.ok(output.includes('tex={"a + b"}'), "got: " + output);
});
check("an escaped dollar inside maths still forms a formula", () => {
  const output = preprocessMath("A price of $\\$100$ is modelled.");
  assert.equal(isMath(output), true);
});

console.log("");
console.log(passed + " passed, " + failed + " failed");
if (failed > 0) process.exit(1);
