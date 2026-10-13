import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Learn" };

export default function LearnPage() {
  return <PlaceholderPage title="Learn" note="The Learn series lands in a later stage." />;
}