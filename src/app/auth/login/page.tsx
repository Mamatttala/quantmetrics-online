import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

import { MockSignIn } from "./MockSignIn";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <PlaceholderPage
      title="Login"
      note="The split-screen sign-in flow lands in a later stage. The mock below exercises the header's authenticated state."
    >
      <MockSignIn />
    </PlaceholderPage>
  );
}