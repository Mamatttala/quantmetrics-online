import type { Metadata } from "next";

import { AuthPanel } from "@/components/auth/AuthPanel";

export const metadata: Metadata = {
  title: "Sign up",
  description:
    "Create a Quantmetrics-Lab account to follow the research, the metrics and the AI-generated intelligence briefs.",
  robots: { index: false, follow: false },
};

/**
 * Sign-up (brief F6): the split-screen panel, opening on step 1 of the mocked
 * funnel. The panel is a client component because the funnel and the mock
 * sign-in live on the client; the page stays a server component for the metadata.
 */
export default function SignupPage() {
  return <AuthPanel mode="signup" />;
}

