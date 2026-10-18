import type { ReactNode } from "react";

import { GitHubIcon, XIcon } from "@/components/brand/SocialIcons";
import { Card } from "@/components/ui/Card";
import { FOOTER_SOCIALS } from "@/lib/navigation";

const SOCIAL_ICONS = { github: GitHubIcon, x: XIcon } as const;

/** One labelled block inside the card, separated by the card's hairline. */
function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-b border-line p-4 last:border-b-0">
      <p className="text-mono-label text-text-muted">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

/**
 * The bordered info card beside the contact form (brief F5): a direct address, an
 * expected response time and the same social links the footer carries, read from
 * the footer's own data so the two cannot drift.
 *
 * Both the address and the response window are placeholders. They are marked as
 * such inside the card rather than in a comment only, because this page is where
 * a visitor decides whether to trust the form.
 */
export function ContactInfoCard() {
  return (
    <Card padding="none" className="overflow-hidden">
      <InfoRow label="Email">
        <a
          href="mailto:hello@quantmetrics.online"
          className="text-body underline decoration-line underline-offset-[3px] transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:decoration-text"
        >
          hello@quantmetrics.online
        </a>
        <p className="text-meta mt-2 text-text-dim">
          Placeholder address - replace before launch.
        </p>
      </InfoRow>

      <InfoRow label="Response time">
        <p className="text-body">Within two business days</p>
        <p className="text-meta mt-2 text-text-dim">
          Placeholder window - confirm the real one before launch.
        </p>
      </InfoRow>

      <InfoRow label="Elsewhere">
        <ul className="flex flex-col gap-2">
          {FOOTER_SOCIALS.map((social) => {
            const Icon = SOCIAL_ICONS[social.id];

            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-5.5 w-full items-center gap-2 rounded-row border border-line px-3 text-sm tracking-[-0.01em] text-text transition-colors duration-[var(--dur-hover)] ease-[var(--ease-standard)] hover:bg-fill-faint"
                >
                  <Icon className="size-2.5 shrink-0" />
                  <span className="truncate">{social.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </InfoRow>
    </Card>
  );
}

