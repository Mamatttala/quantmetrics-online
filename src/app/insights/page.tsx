import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Insights" };

export default function InsightsPage() {
  return <PlaceholderPage title="Insights" note="AI-generated intelligence briefs land in a later stage." />;
}