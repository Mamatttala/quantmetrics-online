"use client";

import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  /** id of the panel this tab controls, when panels are used. */
  panelId?: string;
}

export interface TabBarProps {
  tabs: TabItem[];
  /** Accessible name for the tablist, e.g. "Audience". */
  label: string;
  /** Controlled selection. Omit for uncontrolled use. */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  size?: "default" | "compact";
  className?: string;
}

const SIZE: Record<NonNullable<TabBarProps["size"]>, string> = {
  default: "h-5 px-3",
  compact: "h-4.5 px-2.5",
};

/**
 * Mono uppercase tabs on a roving tabindex: arrow keys, Home and End move the
 * selection and the focus together, and the active tab is an inverted pill.
 */
export function TabBar({
  tabs,
  label,
  value,
  defaultValue,
  onChange,
  size = "default",
  className,
}: TabBarProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? tabs[0]?.id ?? "");
  const selected = value ?? uncontrolled;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = useCallback(
    (id: string) => {
      if (value === undefined) {
        setUncontrolled(id);
      }
      onChange?.(id);
    },
    [onChange, value],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const current = tabs.findIndex((tab) => tab.id === selected);
    let next = -1;

    switch (event.key) {
      case "ArrowRight":
        next = (current + 1) % tabs.length;
        break;
      case "ArrowLeft":
        next = (current - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const target = tabs[next];
    if (!target) {
      return;
    }
    select(target.id);
    refs.current[next]?.focus();
  };

  return (
    <div role="tablist" aria-label={label} className={cn("inline-flex flex-wrap items-center gap-0.5", className)}>
      {tabs.map((tab, index) => {
        const isSelected = tab.id === selected;

        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={tab.panelId}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => select(tab.id)}
            onKeyDown={onKeyDown}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-pill text-mono-label",
              "transition duration-[var(--dur-hover)] ease-[var(--ease-standard)]",
              SIZE[size],
              isSelected ? "bg-text text-bg" : "text-text-muted hover:text-text",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}