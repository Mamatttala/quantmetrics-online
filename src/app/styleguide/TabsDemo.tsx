"use client";

import { useState } from "react";

import { TabBar, type TabItem } from "@/components/ui/TabBar";

const TABS: TabItem[] = [
  { id: "researchers", label: "Researchers", panelId: "panel-researchers" },
  { id: "traders", label: "Traders", panelId: "panel-traders" },
  { id: "newcomers", label: "Newcomers", panelId: "panel-newcomers" },
];

const COPY: Record<string, string> = {
  researchers:
    "Placeholder panel copy: backtesting, econometric modelling and reproducible research pipelines.",
  traders: "Placeholder panel copy: observing and discovering opportunities without the noise.",
  newcomers: "Placeholder panel copy: understanding market behaviour and staying in sync with it.",
};

/** Wires TabBar to real tabpanels so the ARIA relationship and keyboard model are visible. */
export function TabsDemo({ size = "default" }: { size?: "default" | "compact" }) {
  const [selected, setSelected] = useState(TABS[0].id);

  return (
    <div>
      <TabBar tabs={TABS} label="Audience" value={selected} onChange={setSelected} size={size} />
      <div className="mt-3">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            id={tab.panelId}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            hidden={selected !== tab.id}
            tabIndex={0}
            className="rounded-input border border-line bg-bg-elev p-3"
          >
            <p className="text-body text-text-muted">{COPY[tab.id]}</p>
          </div>
        ))}
      </div>
      <p className="text-mono-label mt-2 text-text-dim">Left/Right/Home/End move the selection</p>
    </div>
  );
}