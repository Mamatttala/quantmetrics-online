import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return <PlaceholderPage title="Sign up" note="The split-screen sign-up flow lands in a later stage." />;
}