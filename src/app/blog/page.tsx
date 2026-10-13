import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return <PlaceholderPage title="Blog" note="Tutorials, guides and the Learn series land in a later stage." />;
}