"use client";

import { useState } from "react";

import { EyebrowChip } from "@/components/layout/EyebrowChip";
import { Reveal } from "@/components/layout/Reveal";
import { Section } from "@/components/layout/Section";
import { TabBar, type TabItem } from "@/components/ui/TabBar";
import { WORKFLOW_BLOCK, WORKFLOW_STEPS } from "@/lib/services";

const TABS: TabItem[] = WORKFLOW_STEPS.map((step) => ({
  id: step.id,
  label: step.label,
  panelId: `workflow-panel-${step.id}`,
}));

/**
 * Workflow tabs (brief F2): DATA -> MODEL -> VALIDATE -> REPORT. `TabBar` owns
 * the roving tabindex, arrow-key model and inverted-pill active state, so this
 * component only wires it to real tabpanels - the same ARIA relationship the
 * styleguide demonstrates.
 *
 * `id="workflow"` is the target of the Analysis section's "See the workflow"
 * link and of the service section deep links.
 */
export function WorkflowTabs() {
  const [selected, setSelected] = useState(TABS[0].id);

  return (
    <Section grid={false} id="workflow">
      <Reveal className="flex flex-col items-center text-center">
        <EyebrowChip>{WORKFLOW_BLOCK.eyebrow}</EyebrowChip>
        <h2 className="text-h2 mt-3 max-w-[22ch]">{WORKFLOW_BLOCK.title}</h2>
        <p className="text-mono-label mt-3 text-text-dim">{WORKFLOW_BLOCK.sequence}</p>
      </Reveal>

      <Reveal className="mt-5">
        <div className="flex justify-center overflow-x-auto pb-2">
          <TabBar tabs={TABS} label="Workflow" value={selected} onChange={setSelected} />
        </div>

        <div className="mt-3">
          {WORKFLOW_STEPS.map((step) => (
            <div
              key={step.id}
              id={`workflow-panel-${step.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${step.id}`}
              hidden={selected !== step.id}
              tabIndex={0}
              className="rounded-card border border-line bg-bg-elev p-4 lg:p-6"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
                <div>
                  <span className="text-mono-label text-text-dim">{step.label}</span>
                  <h3 className="text-section-heading mt-2 max-w-[18ch]">{step.title}</h3>
                  <p className="text-body mt-3 max-w-[50ch] text-text-muted">{step.body}</p>
                </div>

                <ul className="flex flex-col justify-center border-t border-line lg:border-t-0 lg:border-l lg:pl-6">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-2 border-b border-line py-2 last:border-b-0"
                    >
                      <span aria-hidden="true" className="text-mono-label pt-0.5 text-text-dim">
                        &rarr;
                      </span>
                      <span className="text-meta">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}