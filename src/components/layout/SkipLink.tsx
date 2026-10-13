export interface SkipLinkProps {
  /** id of the main content wrapper in the root layout. */
  target?: string;
}

/** First focusable element on every page. */
export function SkipLink({ target = "main" }: SkipLinkProps) {
  return (
    <a
      href={`#${target}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-1 focus:top-1 focus:z-[100] focus:inline-flex focus:h-5 focus:items-center focus:rounded-pill focus:border focus:border-line focus:bg-bg-elev focus:px-2.5 focus:text-mono-label focus:text-text"
    >
      Skip to content
    </a>
  );
}