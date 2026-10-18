"use client";

import { useId, useState } from "react";

export interface NewsletterFormProps {
  title?: string;
}

/**
 * Sidebar newsletter capture (brief F4): a 4px-radius field on the --bg-hover
 * fill with a square send button. There is no backend yet, so submitting swaps
 * the field for a confirmation rather than pretending to post anywhere.
 */
export function NewsletterForm({ title = "Join the newsletter" }: NewsletterFormProps) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section aria-labelledby={id} className="rounded-input border border-line bg-bg-elev p-3">
      <h2 id={id} className="text-mono-label text-text-muted">
        {title}
      </h2>

      {sent ? (
        <p className="text-meta mt-2">Thanks. New research notes will land in your inbox.</p>
      ) : (
        <form
          className="mt-2 flex items-center gap-1"
          onSubmit={(event) => {
            event.preventDefault();
            if (email.trim() === "") return;
            setSent(true);
          }}
        >
          <label htmlFor={id + "-email"} className="sr-only">
            Email address
          </label>
          <input
            id={id + "-email"}
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="h-5 min-w-0 flex-1 rounded-sm border border-line bg-bg-hover px-2 text-meta text-text placeholder:text-text-dim"
          />
          <button
            type="submit"
            aria-label="Subscribe"
            className="inline-flex size-5 shrink-0 items-center justify-center rounded-sm bg-text text-bg transition-opacity duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:opacity-85"
          >
            <svg
              viewBox="0 0 16 16"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
            </svg>
          </button>
        </form>
      )}
    </section>
  );
}
