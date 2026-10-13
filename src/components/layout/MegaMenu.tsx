"use client";

import Link from "next/link";

import { NodeIcon } from "@/components/ui/icons";
import { CAPABILITIES, SERVICE_CARDS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export interface MegaMenuProps {
  id: string;
  /** Close the menu after a link is activated. */
  onNavigate: () => void;
  className?: string;
}

const DOT_COUNT = 16;

/**
 * Sharp-cornered Services panel: three cards plus the Capabilities column.
 * The dot grid cross-fades into a thin-line node icon on hover, and a circled
 * arrow appears at the card's bottom-right.
 */
export function MegaMenu({ id, onNavigate, className }: MegaMenuProps) {
  return (
    <div id={id} className={cn("border border-line bg-bg", className)}>
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))_18rem]">
        {SERVICE_CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex min-h-36 flex-col border-l border-line p-4 first:border-l-0",
              "transition-colors duration-[var(--dur-menu)] ease-[var(--ease-standard)]",
              "hover:bg-bg-hover focus-visible:bg-bg-hover",
            )}
          >
            <span className="text-card-title text-text">{card.title}</span>
            <span className="text-meta mt-1 max-w-[28ch]">{card.description}</span>

            <span aria-hidden="true" className="relative mt-auto block size-5">
              <span className="absolute inset-0 grid grid-cols-4 gap-1 opacity-100 transition-opacity duration-[var(--dur-menu)] ease-[var(--ease-standard)] group-hover:opacity-0 group-focus-visible:opacity-0">
                {Array.from({ length: DOT_COUNT }, (_, index) => (
                  <span key={index} className="size-0.5 rounded-pill bg-text-dim" />
                ))}
              </span>
              <span className="absolute inset-0 text-text-dim opacity-0 transition-opacity duration-[var(--dur-menu)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100">
                <NodeIcon />
              </span>
            </span>

            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 flex size-5 items-center justify-center rounded-pill border border-line text-text opacity-0 transition-opacity duration-[var(--dur-menu)] ease-[var(--ease-standard)] group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              &rarr;
            </span>
          </Link>
        ))}

        <div className="border-l border-line">
          <p className="flex h-6.5 items-center px-4 text-card-title text-text">Capabilities</p>
          {CAPABILITIES.map((row) => (
            <Link
              key={row.label}
              href={row.href}
              onClick={onNavigate}
              className={cn(
                "flex h-10.5 items-center justify-between border-t border-line px-4 text-body-lg leading-none text-text-muted",
                "transition-colors duration-[var(--dur-menu)] ease-[var(--ease-standard)] hover:bg-bg-hover hover:text-text",
              )}
            >
              {row.label}
              <span aria-hidden="true" className="text-text-dim">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}