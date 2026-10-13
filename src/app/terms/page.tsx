import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return <PlaceholderPage title="Terms" note="DRAFT - for lawyer review before launch." />;
}