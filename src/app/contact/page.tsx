import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <PlaceholderPage title="Contact" note="The contact form and info card land in a later stage." />;
}