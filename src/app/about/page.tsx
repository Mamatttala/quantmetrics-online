import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return <PlaceholderPage title="About" note="The mission, method and team land in a later stage." />;
}