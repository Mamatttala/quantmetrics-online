import { cn } from "@/lib/utils";

/** Small shared glyphs. All use currentColor and 1.5px strokes. */

export function Chevron({ open = false, className }: { open?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "transition-transform duration-[var(--dur-menu)] ease-[var(--ease-standard)]",
        open && "rotate-180",
        className,
      )}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M2.5 5h11M2.5 11h11" />
    </svg>
  );
}

/** Thin-line node mark the mega-menu dot grid morphs into on hover. */
export function NodeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="6" cy="12" r="2.25" />
      <circle cx="18" cy="6.5" r="2.25" />
      <circle cx="18" cy="17.5" r="2.25" />
      <path d="M8 12h4.6m0 0 3.2-4.2M12.6 12l3.2 4.2" />
    </svg>
  );
}