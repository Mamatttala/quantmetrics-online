import type { Metadata } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AuthProvider } from "@/lib/auth";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { jsFlagScript, themeInitScript } from "@/lib/theme";
import { cn } from "@/lib/utils";

import "./globals.css";

/*
 * Typefaces are self-hosted from `src/fonts` through `next/font/local`. They are
 * the latin variable subsets of Newsreader (normal and italic), Inter Tight and
 * JetBrains Mono, copied out of the `@fontsource-variable/*` packages (see the
 * README). Nothing is fetched at build time, so a build works with no network.
 *
 * The family names, the CSS variable names, the variable weight ranges,
 * `display: swap` and the metric-adjusted fallbacks all match the previous
 * `next/font/google` setup, so the tokens and the type utilities are untouched.
 */
const newsreader = localFont({
  src: [
    { path: "../fonts/newsreader-latin-wght-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  display: "swap",
  variable: "--font-newsreader",
  // Newsreader is the serif: match it against Times New Roman while it loads.
  adjustFontFallback: "Times New Roman",
});

const interTight = localFont({
  src: "../fonts/inter-tight-latin-wght-normal.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = localFont({
  src: "../fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME + " — " + SITE_TAGLINE,
    template: "%s · " + SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME + " — " + SITE_TAGLINE,
    description:
      "Institutional-grade data analysis, research and AI-generated briefs, in one lab.",
  },
  /*
   * The share image is supplied by the file convention: src/app/opengraph-image.png
   * is picked up automatically for every route that does not define its own, so
   * no `images` array is declared here. `summary_large_image` is what makes X and
   * similar surfaces render it wide rather than as a thumbnail.
   */
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME + " — " + SITE_TAGLINE,
    description:
      "Institutional-grade data analysis, research and AI-generated briefs, in one lab.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(newsreader.variable, interTight.variable, jetbrainsMono.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">
        {/*
          Runs before first paint: resolves the theme so there is no flash of the
          wrong one, and marks the document as scripted so the scroll-reveal
          styles stay disarmed for a no-JS visitor or a crawler.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + jsFlagScript }} />

        <AuthProvider>
          <SkipLink />

          {/*
            Corner theme toggle. It belongs to the page rather than to the bar:
            it sits in the gutter, outside the header. It only appears from
            `min-[1620px]` up, the width at which the bar stops short of the
            viewport corner; below that it would sit on top of the bar's CTA, so
            the bar keeps its own toggle instead (and the mobile menu has one).
            Rendered after the skip link, which must stay the first focusable
            element.
          */}
          <ThemeToggle
            size="navbar"
            className="fixed right-4 top-3 z-[60] hidden min-[1620px]:inline-flex"
          />

          <Navbar />
          {/*
            Skip-link target. `outline-none` keeps the ring from drawing around
            the whole page when the skip link moves focus here.
          */}
          <div id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
