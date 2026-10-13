import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <PlaceholderPage title="Privacy" note="DRAFT - for lawyer review before launch." />;
}