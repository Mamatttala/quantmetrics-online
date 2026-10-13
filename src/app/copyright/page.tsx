import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Copyright" };

export default function CopyrightPage() {
  return <PlaceholderPage title="Copyright" note="DRAFT - for lawyer review before launch." />;
}