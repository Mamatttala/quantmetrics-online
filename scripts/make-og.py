"""
Generate the default Open Graph / Twitter share image for quantmetrics.online.

Rendered with Pillow on the same visual language the site uses: the dark canvas
(#0f0f0f), accent-only radial mesh blobs (teal top-left, periwinkle lower-right,
lilac upper-right), the site glyph, a serif headline and mono labels.

Font note: the site's own faces (Newsreader, Inter Tight, JetBrains Mono) are
woff2, which Pillow cannot open, and there is no network to fetch TTF builds.
The substitutes are Nimbus Roman / Nimbus Sans / Nimbus Mono PS - the URW
clones of Times New Roman, Arial and Courier New, which are exactly the
fallback faces the site's next/font/local config already declares for the
serif, sans and mono families. So the share image reads as the same typographic
register, drawn from the same documented fallbacks.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (0x0f, 0x0f, 0x0f)
TEAL = (0x1f, 0xa5, 0x7c)
PERIWINKLE = (0x4a, 0x6f, 0xd4)
LILAC = (0xc9, 0xa5, 0xe8)
WHITE = (255, 255, 255)
# Pillow composites RGB tuples opaquely onto an RGB image, so the site's
# translucent whites are pre-blended here instead of passed as triples + alpha.
GHOST = (168, 168, 168)   # 60% white over the #0f0f0f canvas
MUTED = (0xa3, 0xa3, 0xa3)
DIM = (0x6b, 0x6b, 0x6b)

# Fonts are resolved in order: the real brand faces if TTF builds have been
# dropped into src/fonts (see the note below), then the URW clones that match
# the site's documented fallback stack. Paths are looked up per platform so the
# script runs on Windows, macOS and Linux.
_HERE = os.path.dirname(os.path.abspath(__file__))
_REPO = os.path.dirname(_HERE)


def _first_existing(*candidates):
    for path in candidates:
        if path and os.path.exists(path):
            return path
    raise FileNotFoundError(
        "No usable font found. Looked for: " + ", ".join(str(c) for c in candidates)
    )


SERIF = _first_existing(
    os.path.join(_REPO, "src", "fonts", "newsreader.ttf"),
    "/usr/share/fonts/opentype/urw-base35/NimbusRoman-Regular.otf",
    r"C:\Windows\Fonts\times.ttf",
    "/System/Library/Fonts/Times.ttc",
)
SANS = _first_existing(
    os.path.join(_REPO, "src", "fonts", "inter-tight.ttf"),
    "/usr/share/fonts/opentype/urw-base35/NimbusSans-Regular.otf",
    r"C:\Windows\Fonts\arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
)
MONO = _first_existing(
    os.path.join(_REPO, "src", "fonts", "jetbrains-mono.ttf"),
    "/usr/share/fonts/opentype/urw-base35/NimbusMonoPS-Regular.otf",
    r"C:\Windows\Fonts\consola.ttf",
    "/System/Library/Fonts/Menlo.ttc",
)

OUT = os.path.join(_REPO, "src", "app", "opengraph-image.jpg")


def mesh():
    """Dark canvas with soft accent glows, matching HeroBackdrop's blob layout."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    canvas = np.zeros((H, W, 3), dtype=np.float32)
    canvas[..., 0] = BG[0]
    canvas[..., 1] = BG[1]
    canvas[..., 2] = BG[2]

    # (cx, cy, radius, colour, intensity) - teal top-left, lilac top-right,
    # periwinkle centre-right and lower-right, as in the hero mesh.
    blobs = [
        (0.08 * W, 0.02 * H, 0.72 * W, TEAL, 0.55),
        (0.92 * W, 0.10 * H, 0.52 * W, LILAC, 0.26),
        (0.62 * W, 0.55 * H, 0.66 * W, PERIWINKLE, 0.34),
        (1.02 * W, 0.96 * H, 0.58 * W, PERIWINKLE, 0.40),
    ]

    for cx, cy, radius, colour, intensity in blobs:
        d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / radius
        falloff = np.clip(1.0 - d, 0.0, 1.0) ** 2.2
        # Tighten towards the centre so the glow reads as a blob, not a wash.
        falloff = falloff * intensity
        for ch in range(3):
            canvas[..., ch] += falloff * colour[ch]

    # 1.5% grain. The hero uses 4%, but per-pixel noise is exactly what PNG
    # cannot compress: at 4% this file weighs ~970 KB, and WhatsApp drops share
    # images over ~300 KB. The grain is here to stop the gradient banding, so it
    # only needs to be strong enough to dither.
    rng = np.random.default_rng(0x5EED)
    canvas += rng.normal(0.0, 2.2, (H, W, 1))

    # A gentle vignette keeps the corners from blowing out under the glows.
    vig = 1.0 - 0.35 * (((xx / W - 0.5) ** 2 + (yy / H - 0.5) ** 2) ** 1.1)
    canvas *= vig[..., None]

    return Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8), "RGB")


def tracked_text(draw, xy, text, font, fill, tracking):
    """Draw text with added letter-spacing, the way text-mono-label does."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def glyph(draw, x, y, size, colour, stroke=2):
    """The Quantmetrics mark: a market-rhythm trace inside a ring."""
    scale = size / 20.0
    cx, cy = x + size / 2, y + size / 2
    r = 8.25 * scale
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=colour, width=stroke)
    pts = [(5.6, 11.6), (8.1, 8.3), (10.2, 12.3), (12.5, 6.2), (14.4, 11.4)]
    draw.line([(x + px * scale, y + py * scale) for px, py in pts],
              fill=colour, width=stroke, joint="curve")


def main():
    img = mesh()
    draw = ImageDraw.Draw(img)

    margin = 84
    frame_top, frame_bottom = 72, 558

    # Hairline frame, echoing the blueprint grid. All content stays inside it.
    draw.rectangle([margin, frame_top, W - margin, frame_bottom],
                   outline=(74, 74, 74), width=1)

    # --- header: glyph + wordmark
    glyph(draw, margin + 44, 116, 34, WHITE, stroke=2)
    tracked_text(draw, (margin + 92, 124), "QUANTMETRICS-LAB",
                 ImageFont.truetype(MONO, 21), WHITE, 3.0)

    # --- eyebrow
    tracked_text(draw, (margin + 44, 214), "RESEARCH   ·   ANALYTICS   ·   BRIEFS",
                 ImageFont.truetype(MONO, 18), GHOST, 2.4)

    # --- headline, serif, two lines. The second line is the brief's 60% trick.
    hero = ImageFont.truetype(SERIF, 78)
    draw.text((margin + 40, 262), "Sync with the", font=hero, fill=WHITE)
    draw.text((margin + 40, 356), "market’s true rhythm", font=hero, fill=GHOST)

    # --- sub-line
    sub = ImageFont.truetype(SANS, 27)
    draw.text((margin + 44, 462),
              "Institutional-grade data analysis, research and AI-drafted briefs, in one lab.",
              font=sub, fill=MUTED)

    # --- footer rule + domain, both inside the frame
    draw.line([(margin + 44, 500), (W - margin - 44, 500)], fill=(58, 58, 58), width=1)
    tracked_text(draw, (margin + 44, 514), "QUANTMETRICS.ONLINE",
                 ImageFont.truetype(MONO, 19), WHITE, 2.6)
    note = ImageFont.truetype(SANS, 19)
    text = "Research and education only - not investment advice."
    tw = draw.textlength(text, font=note)
    draw.text((W - margin - 44 - tw, 515), text, font=note, fill=DIM)

    # JPEG, not PNG. This is a smooth gradient plus grain, which is the one thing
    # PNG compresses badly: the 24-bit file ran to ~970 KB and even a 256-colour
    # quantisation only reached 417 KB. WhatsApp drops share images over ~300 KB,
    # and JPEG q92 lands at ~120 KB with no visible loss at card size. There is no
    # alpha to preserve, so nothing is lost by dropping the alpha channel.
    img.convert("RGB").save(OUT, "JPEG", quality=92, optimize=True, progressive=True)
    size = os.path.getsize(OUT)
    print("wrote", OUT, img.size, str(round(size / 1024)) + " KB")


if __name__ == "__main__":
    main()
