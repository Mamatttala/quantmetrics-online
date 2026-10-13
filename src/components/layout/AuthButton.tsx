"use client";

import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export interface AuthButtonProps {
  className?: string;
}

/**
 * Login / Logout, plus the initials avatar when signed in. Sits on the same
 * seam as the rest of the auth interface: swap the adapter, not this component.
 */
export function AuthButton({ className }: AuthButtonProps) {
  const { user, status, login, logout } = useAuth();

  if (user) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <span
          aria-hidden="true"
          className="flex size-3.5 shrink-0 items-center justify-center rounded-pill bg-bg-hover text-xs leading-none text-text"
        >
          {user.initials}
        </span>
        <button
          type="button"
          onClick={() => void logout()}
          aria-label={`Logout ${user.name}`}
          className="text-sm tracking-[-0.01em] text-text-muted transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:text-text"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => void login()}
      disabled={status === "loading"}
      className={cn(
        "text-sm tracking-[-0.01em] text-text-muted transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:text-text disabled:opacity-40",
        className,
      )}
    >
      Login
    </button>
  );
}