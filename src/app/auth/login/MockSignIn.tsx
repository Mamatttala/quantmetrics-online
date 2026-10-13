"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";

/**
 * TEMPORARY stage 3 affordance: the header shows a mocked session, and this is
 * the shortest honest way to reach the authenticated state. Delete it when the
 * real auth screens land.
 */
export function MockSignIn() {
  const { user, login, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        size="compact"
        onClick={async () => {
          await login();
          router.push("/");
        }}
      >
        {user ? "Signed in — back to home" : "Mock sign in"}
      </Button>
      {user ? (
        <Button variant="text" size="compact" onClick={() => void logout()}>
          Mock sign out
        </Button>
      ) : null}
      <span className="text-meta">Stand-in for the mocked auth context (real screens: later stage).</span>
    </div>
  );
}