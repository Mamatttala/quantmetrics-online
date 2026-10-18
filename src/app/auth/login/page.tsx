import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth/AuthPanel";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Quantmetrics-Lab.",
  robots: { index: false, follow: false },
};

/**
 * Sign-in (brief F6): the same split-screen panel with the cross-links reversed.
 * The funnel stepper stays visible but marks no step, because signing in is not
 * one of the sign-up steps.
 */
export default function LoginPage() {
  return <AuthPanel mode="login" />;
}

