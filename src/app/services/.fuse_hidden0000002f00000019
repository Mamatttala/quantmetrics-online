import type { Metadata } from "next";

import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceSection } from "@/components/services/ServiceSection";
import { ServiceStatsBand } from "@/components/services/ServiceStatsBand";
import { TagBlock } from "@/components/services/TagBlock";
import { WorkflowTabs } from "@/components/services/WorkflowTabs";
import { SERVICE_SECTIONS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Research, analysis and metrics from Quantmetrics-Lab: backtesting, volatility and econometric modelling, data cleaning and statistical analysis, risk analytics, and a documented performance and factor metric set. For research and education only, not investment advice.",
  openGraph: {
    type: "website",
    url: "https://quantmetrics.online/services",
    title: "Services - Quantmetrics-Lab",
    description:
      "Backtesting, econometric modelling, risk analytics and a documented metric set, in one lab. For research and education only, not investment advice.",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServiceStatsBand />

      {SERVICE_SECTIONS.map((section, index) => (
        <ServiceSection key={section.id} {...section} visualFirst={index % 2 === 1} />
      ))}

      <TagBlock />
      <WorkflowTabs />
    </main>
  );
}