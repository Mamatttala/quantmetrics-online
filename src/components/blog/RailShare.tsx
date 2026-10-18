"use client";

import { useState } from "react";

export interface RailShareProps {
  /** Absolute URL of the article, resolved on the server so the X intent link is static. */
  url: string;
  title: string;
}

function ShareIcon() {
  return (
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
      <path d="M11 2.5 13.5 5 11 7.5M13.5 5H7a4 4 0 0 0-4 4v4.5" />
    </svg>
  );
}

/**
 * The sidebar share row (brief F4): a pill that copies the article URL and a
 * square button that opens X's share intent. The URL is passed in from the
 * server, so the external link is identical for every render and needs no
 * client-side location lookup.
 */
export function RailShare({ url, title }: RailShareProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-5 flex-1 items-center justify-center gap-1 rounded-pill border border-line text-mono-label text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft"
      >
        <ShareIcon />
        {copied ? "Copied" : "Share"}
      </button>

      <a
        href={"https://x.com/intent/post?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share this article on X"
        className="inline-flex size-5 items-center justify-center rounded-pill border border-line text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-soft"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M9.5 6.8 15 .5h-1.6L8.7 5.9 4.9.5H.5l5.8 8.3L.5 15.5h1.6l5.1-5.8 4 5.8h4.4L9.5 6.8Zm-1.8 2-.6-.9L2 1.7h2.2l4.1 5.9.6.9 5.4 7.7h-2.2L7.7 8.8Z" />
        </svg>
      </a>
    </div>
  );
}
