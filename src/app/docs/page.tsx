import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Docs" };

export default function DocsPage() {
  return <PlaceholderPage title="Docs" note="Methodology and platform documentation land in a later stage." />;
}