"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { Logo } from "@/components/brand/Logo";
import { AuthButton } from "@/components/layout/AuthButton";
import { Container } from "@/components/layout/Container";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Chevron } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const MENU_ID = "services-mega-menu";
const SCROLL_THRESHOLD = 24;
const OPEN_DELAY = 120;
const CLOSE_DELAY = 180;

/** Routes that open with a hero band: the bar floats transparent over them. */
const HERO_ROUTES = ["/", "/services"];

/**
 * Routes that open on a dark or gradient band - the home mesh and the Services
 * dark hero. Over these, and before the 24px scroll, the bar switches to the
 * on-gradient tone, so its links, hairlines and logo pill stay readable against
 * a dark field in light theme too.
 */
const DARK_HERO_ROUTES = ["/", "/services"];

/**
 * One style for every interactive entry in the bar: the five primary links
 * (Login and Sign up included) and the Services trigger.
 *
 * The 1px left/right box is always present but transparent, so the row never
 * shifts; it appears on hover and on keyboard focus, and disappears again the
 * moment the pointer leaves, which is what makes a click leave no box behind.
 * The current page is deliberately NOT boxed - `aria-current="page"` still
 * marks it for assistive technology.
 */
function navItemClasses(className?: string) {
  return cn(
    "flex h-6.5 items-center gap-0.5 border-x border-transparent px-2 text-sm tracking-[-0.01em] text-text-muted",
    "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
    "hover:border-line-strong hover:text-text focus-visible:border-line-strong focus-visible:text-text",
    className,
  );
}

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

/**
 * Fixed global header: logo pill, centred primary nav, Services mega menu, auth.
 *
 * The bar is a full pill - both ends round - and its left end is capped by the
 * logo pill, its right end by the "Get started" CTA.
 *
 * The theme toggle only lives in the bar below `min-[1620px]`. Above that the
 * bar stops short of the viewport edge and the toggle floats in the page corner
 * instead (see `CornerThemeToggle` in src/app/layout.tsx); below it the bar
 * reaches the corner, so a corner toggle would sit on top of the CTA.
 */
export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const scrolled = useSyncExternalStore(subscribeToScroll, getScrollSnapshot, () => false);

  // Holding the route the menu was opened on closes it on navigation without an effect.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const servicesOpen = openFor === pathname;

  const hoverTimer = useRef<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusPanelOnOpen = useRef(false);

  const clearTimer = useCallback(() => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearTimer();
    setOpenFor(pathname);
  }, [clearTimer, pathname]);

  const close = useCallback(() => {
    clearTimer();
    setOpenFor(null);
  }, [clearTimer]);

  const openLater = useCallback(() => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpenFor(pathname), OPEN_DELAY);
  }, [clearTimer, pathname]);

  const closeLater = useCallback(() => {
    clearTimer();
    hoverTimer.current = window.setTimeout(() => setOpenFor(null), CLOSE_DELAY);
  }, [clearTimer]);

  useEffect(() => clearTimer, [clearTimer]);

  // Escape closes and hands focus back to the trigger.
  useEffect(() => {
    if (!servicesOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setOpenFor(null);
      triggerRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [servicesOpen]);

  // Keyboard-opened menus move focus into the panel.
  useEffect(() => {
    if (!servicesOpen || !focusPanelOnOpen.current) {
      return;
    }
    focusPanelOnOpen.current = false;
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
  }, [servicesOpen]);

  const showBackdrop = scrolled || !HERO_ROUTES.includes(pathname);
  const overDarkHero = !scrolled && DARK_HERO_ROUTES.includes(pathname);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {servicesOpen ? (
        <div
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 -z-10 bg-bg/40 backdrop-blur-md"
        />
      ) : null}

      {/* pt-3 holds the bar off the top edge; the hero still runs behind it. */}
      <Container className="relative pt-3">
        <div
          className={cn(
            "relative flex h-6.5 items-center rounded-pill border",
            "transition-colors duration-[var(--dur-base)] ease-[var(--ease-standard)]",
            showBackdrop ? "border-line bg-bg/60 backdrop-blur-md" : "border-line/60 bg-transparent",
            // White-on-gradient while the bar floats over the mesh. Scoped to the
            // bar alone: the mega-menu panel below keeps the page theme.
            overDarkHero && "on-gradient-tone",
          )}
        >
          <Logo className="-my-px -ml-px" />

          {/* Absolutely centred, so the row stays on the bar's axis whatever the
              logo and the right-hand cluster measure. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = item.href === pathname;

              if (item.children) {
                return (
                  <button
                    key={item.href}
                    ref={triggerRef}
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls={servicesOpen ? MENU_ID : undefined}
                    aria-haspopup="true"
                    onClick={() => (servicesOpen ? close() : open())}
                    onMouseEnter={openLater}
                    onMouseLeave={closeLater}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        focusPanelOnOpen.current = true;
                        open();
                      }
                    }}
                    className={navItemClasses()}
                  >
                    {item.label}
                    <Chevron open={servicesOpen} />
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={navItemClasses()}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right cluster, left to right: Login, Sign up, the "Get started" CTA
              and - on narrow viewports only - the theme toggle. */}
          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <AuthButton className={navItemClasses()} />
            {user ? null : (
              <Link href="/auth/signup" className={navItemClasses()}>
                Sign up
              </Link>
            )}
            {user ? null : (
              <Button href="/auth/signup" variant="navCta">
                Get started
              </Button>
            )}
            <ThemeToggle size="navbar" className="-mr-px min-[1620px]:hidden" />
          </div>

          <MobileNav className="ml-auto mr-2" />
        </div>

        {/* Sibling of the bar, so the panel is always page-themed. */}
        {servicesOpen ? (
          <div
            ref={panelRef}
            onMouseEnter={open}
            onMouseLeave={closeLater}
            className="absolute inset-x-gutter top-full"
          >
            <MegaMenu id={MENU_ID} onNavigate={close} />
          </div>
        ) : null}
      </Container>
    </header>
  );
}