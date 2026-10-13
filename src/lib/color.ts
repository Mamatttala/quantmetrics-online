/**
 * Colour helpers for the canvas charts.
 *
 * ECharts draws to a canvas, so it cannot use CSS custom properties directly.
 * The chart reads the resolved token values at runtime and, where a translucent
 * version is needed (area fills under a line), derives one here rather than
 * carrying a second hand-written colour.
 */

/** Parse `#rgb`, `#rrggbb` or an `rgb()/rgba()` string to [r, g, b, a]. */
function parse(input: string): [number, number, number, number] | null {
  const value = input.trim();

  if (value.startsWith("#")) {
    const hex = value.slice(1);
    const expand = hex.length === 3 || hex.length === 4;
    const parts = expand
      ? hex.split("").map((char) => char + char)
      : (hex.match(/.{2}/g) ?? []);
    if (parts.length < 3) {
      return null;
    }
    const [r, g, b, a] = parts.map((part) => parseInt(part, 16));
    return [r, g, b, a === undefined ? 1 : a / 255];
  }

  const match = value.match(/rgba?\(([^)]+)\)/i);
  if (!match) {
    return null;
  }
  const numbers = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (numbers.length < 3 || numbers.some(Number.isNaN)) {
    return null;
  }
  return [numbers[0], numbers[1], numbers[2], numbers.length > 3 ? numbers[3] : 1];
}

/**
 * Same colour at a different opacity. Falls back to the input unchanged when
 * the value is not a colour this helper understands, so a token swap can never
 * blank out a chart.
 */
export function withAlpha(color: string, alpha: number): string {
  const rgba = parse(color);
  if (!rgba) {
    return color;
  }
  const [r, g, b, a] = rgba;
  return `rgba(${r}, ${g}, ${b}, ${Number((a * alpha).toFixed(3))})`;
}