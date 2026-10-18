import { NextResponse } from "next/server";

import { CONTACT_SUCCESS_MESSAGE, hasErrors, validateContact } from "@/lib/contact";

/**
 * Contact submission stub.
 *
 * The form is wired end to end and the payload is validated here, but nothing is
 * delivered yet: this handler is the seam the real provider drops into.
 *
 * TODO(contact): deliver the message through a transactional provider (Resend,
 * Postmark or a forms service). That step should send to a monitored inbox, set
 * reply-to to the submitter, and record a deliverability result.
 * TODO(contact): add rate limiting before this endpoint is public. The handler is
 * stateless today, so a limiter needs a shared store (Upstash/Redis) or the
 * host's edge rules; one accepted submission per address per minute is the
 * intended shape. Nothing here depends on that decision, so it is left out
 * rather than half-built.
 *
 * Nothing from the payload is logged, not even on failure. The body carries a
 * name, an address and free text, so a debug line would write personal data into
 * the host's log retention. Validation messages are returned to the caller
 * instead, which is where they are useful.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Send the form as JSON." } },
      { status: 400 },
    );
  }

  const { errors, honeypot } = validateContact(payload);

  // A filled honeypot is answered with a success: the trap is only useful while
  // the sender cannot tell that it was seen.
  if (honeypot) {
    return NextResponse.json({ ok: true, message: CONTACT_SUCCESS_MESSAGE });
  }

  if (hasErrors(errors)) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO(contact): replace this line with the provider call described above.

  return NextResponse.json({ ok: true, message: CONTACT_SUCCESS_MESSAGE });
}
