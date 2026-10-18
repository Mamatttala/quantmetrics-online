"use client";

import Link from "next/link";
import { useId, useState } from "react";

import type { DocGroup } from "@/lib/docs";
import { cn } from "@/lib/utils";

export interface DocsNavProps {
  groups: DocGroup[];
  /** Slug of the page being read, so the current entry can mark itself. */
  activeSlug: string;
}

/**
 * The docs sidebar (brief F7): grouped navigation with a filter box, and a
 * disclosure on small screens so the same list never has to be duplicated.
 *
 * The filter is deliberately local and case-insensitive - it narrows an array
 * the server already sent, so there is no request per keystroke. A group with no
 * surviving entries is dropped rather than shown empty.
 */
export function DocsNav({ groups, activeSlug }: DocsNavProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelId = useId();
  const inputId = useId();
  const needle = query.trim().toLowerCase();

  const filtered =
    needle === ""
      ? groups
      : groups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) =>
              (item.title + " " + item.summary).toLowerCase().includes(needle),
            ),
          }))
          .filter((group) => group.items.length > 0);

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "text-mono-label flex h-5 w-full items-center justify-between rounded-sm border border-line px-3 text-text",
          "transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft lg:hidden",
        )}
      >
        <span>Docs menu</span>
        <span aria-hidden="true">{open ? "\u2212" : "+"}</span>
      </button>

      <div id={panelId} className={cn("mt-3 lg:mt-0 lg:block", open ? "block" : "hidden")}>
        <label htmlFor={inputId} className="sr-only">
          Filter documentation
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          placeholder="Filter docs"
          onChange={(event) => setQuery(event.target.value)}
          className="text-meta h-4.5 w-full rounded-sm border border-line bg-bg-hover px-2 text-text placeholder:text-text-dim"
        />

        <nav aria-label="Documentation" className="mt-4 flex flex-col gap-4">
          {filtered.map((group) => (
            <div key={group.id}>
              <p className="text-mono-label text-text-dim">{group.title}</p>
              <ul className="mt-1 flex flex-col">
                {group.items.map((item) => {
                  const active = item.slug === activeSlug;

                  return (
                    <li key={item.slug}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "text-meta block rounded-sm px-2 py-1 transition-colors",
                          "duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
                          active ? "bg-bg-hover text-text" : "text-text-muted hover:text-text",
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {filtered.length === 0 ? (
            <p className="text-meta">No pages match that filter.</p>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
