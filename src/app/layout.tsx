import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SkipLink } from "@/components/layout/SkipLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { AuthProvider } from "@/lib/auth";
import { jsFlagScript, themeInitScript } from "@/lib/theme";
import { cn } from "@/lib/utils";

import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quantmetrics.online"),
  title: {
    default: "Quantmetrics-Lab — Quantitative intelligence for the rhythm of markets",
    template: "%s · Quantmetrics-Lab",
  },
  description:
    "Institutional-grade data analysis, research and AI-generated briefs, in one lab. Quantmetrics transforms market noise into clear, actionable insights.",
  applicationName: "Quantmetrics-Lab",
  openGraph: {
    type: "website",
    siteName: "Quantmetrics-Lab",
    url: "https://quantmetrics.online",
    title: "Quantmetrics-Lab — Quantitative intelligence for the rhythm of markets",
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