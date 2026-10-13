"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Logo } from "@/components/brand/Logo";
import { AuthButton } from "@/components/layout/AuthButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Chevron, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { useAuth } from "@/lib/auth";
import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface MobileNavProps {
  className?: string;
}

/**
 * Hamburger plus full-screen accordion menu, shown below the lg breakpoint.
 * Locks body scroll and traps focus while open.
 */
export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  // Keeping the route it was opened on means a navigation closes it for free.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpenFor(null);
    openButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") {
        return;
      }

      const node = panelRef.current;
      if (!node) {
        return;
      }
      const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Move focus into the panel once it is on screen.
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  // A resize past the breakpoint would otherwise leave the page scroll-locked.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setOpenFor(null);
      }
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={cn("lg:hidden", className)}>
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? "mobile-menu" : undefined}
        aria-label="Open menu"
        onClick={() => setOpenFor(pathname)}
        className="inline-flex size-5 shrink-0 items-center justify-center rounded-pill border border-line text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-bg-hover"
      >
        <MenuIcon />
      </button>

      {/* Portalled to <body>: a full-screen overlay must not inherit the
          on-gradient tone the bar wears while it floats over the hero. */}
      {open
        ? createPortal(
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-bg"
        >
          <div className="flex h-6.5 shrink-0 items-center justify-between border-b border-line pl-1 pr-2">
            <Logo />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex size-5 shrink-0 items-center justify-center rounded-pill border border-line text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-bg-hover"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-1 py-2">
            <ul>
              {NAV_ITEMS.map((item) => {
                const isCurrent = item.href === pathname;

                if (item.children) {
                  const isExpanded = expanded === item.href;

                  return (
                    <li key={item.href} className="border-b border-line">
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        aria-controls={isExpanded ? `mobile-submenu-${item.label}` : undefined}
                        onClick={() => setExpanded(isExpanded ? null : item.href)}
                        className="flex w-full items-center justify-between py-2 text-body-lg text-text"
                      >
                        {item.label}
                        <Chevron open={isExpanded} />
                      </button>

                      {isExpanded ? (
                        <ul id={`mobile-submenu-${item.label}`} className="pb-2">
                          <li>
                            <Link
                              href={item.href}
                              onClick={close}
                              className="flex py-1.5 text-body text-text-muted"
                            >
                              Services overview
                            </Link>
                          </li>
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={close}
                                className="flex py-1.5 text-body text-text-muted"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn("flex py-2 text-body-lg", isCurrent ? "text-text" : "text-text-muted")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-mono-label text-text-dim">Theme</span>
              <ThemeToggle />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <AuthButton />
              {user ? null : (
                <Button href="/auth/signup" variant="outline" size="compact" onClick={close}>
                  Sign up
                </Button>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )
        : null}
    </div>
  );
}