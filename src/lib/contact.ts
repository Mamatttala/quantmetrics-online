/**
 * The contact-form contract, shared by the client form
 * (src/app/contact/ContactForm.tsx) and the stub route handler
 * (src/app/api/contact/route.ts).
 *
 * One module for both sides, so the limits and the email rule cannot drift: the
 * browser validates for immediate feedback, and the route revalidates, because
 * a client check is a convenience and never a guarantee.
 */

/** Field length limits, in characters. */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

/**
 * Deliberately permissive: one @, no whitespace, a dot in the domain. Anything
 * stricter rejects addresses that are in fact deliverable, and the authoritative
 * check is the delivery attempt anyway.
 */
export const CONTACT_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Options for the topic dropdown. The value is what the route receives. */
export const CONTACT_TOPICS = [
  "General enquiry",
  "Research collaboration",
  "Access and pricing",
  "Press",
  "Something else",
] as const;

/**
 * The honeypot field name. It is rendered off-screen, hidden from assistive
 * technology and skipped by the tab order, so a human never fills it while a
 * bot that posts every input does. The route answers a filled honeypot with a
 * plain success, so a scripted submission learns nothing from the response.
 */
export const CONTACT_HONEYPOT_FIELD = "website";

/** Shown on success. Identical on both sides so the copy cannot diverge. */
export const CONTACT_SUCCESS_MESSAGE =
  "Thank you. Your message has been recorded. This preview is not yet wired to a mail provider, so nothing has been sent.";

export interface ContactInput {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export type ContactField = keyof ContactInput;

export interface ContactErrors {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  form?: string;
}

export interface ContactValidation {
  data: ContactInput;
  errors: ContactErrors;
  /** True when the hidden field arrived with content, i.e. a bot filled it. */
  honeypot: boolean;
}

export type ContactResponse =
  | { ok: true; message: string }
  | { ok: false; errors: ContactErrors };

/** Field order used to decide which error receives focus. */
export const CONTACT_FIELD_ORDER: ContactField[] = ["name", "email", "topic", "message"];

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validate any payload shape. The route passes whatever the request body parsed
 * to, so the input is typed as unknown and every field is narrowed here.
 */
export function validateContact(raw: unknown): ContactValidation {
  const source = (raw ?? {}) as Record<string, unknown>;
  const data: ContactInput = {
    name: asString(source.name),
    email: asString(source.email),
    topic: asString(source.topic),
    message: asString(source.message),
  };
  const errors: ContactErrors = {};

  if (data.name === "") {
    errors.name = "Enter your name.";
  } else if (data.name.length < CONTACT_LIMITS.name.min) {
    errors.name = "Use at least " + CONTACT_LIMITS.name.min + " characters.";
  } else if (data.name.length > CONTACT_LIMITS.name.max) {
    errors.name = "Use " + CONTACT_LIMITS.name.max + " characters or fewer.";
  }

  if (data.email === "") {
    errors.email = "Enter your email address.";
  } else if (data.email.length > CONTACT_LIMITS.email.max) {
    errors.email = "That address is too long.";
  } else if (!CONTACT_EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address, for example name@domain.com.";
  }

  if (data.topic === "") {
    errors.topic = "Choose a topic.";
  } else if (!(CONTACT_TOPICS as readonly string[]).includes(data.topic)) {
    errors.topic = "Choose one of the listed topics.";
  }

  if (data.message === "") {
    errors.message = "Add a message.";
  } else if (data.message.length < CONTACT_LIMITS.message.min) {
    errors.message = "Use at least " + CONTACT_LIMITS.message.min + " characters.";
  } else if (data.message.length > CONTACT_LIMITS.message.max) {
    errors.message = "Use " + CONTACT_LIMITS.message.max + " characters or fewer.";
  }

  return {
    data,
    errors,
    honeypot: asString(source[CONTACT_HONEYPOT_FIELD]) !== "",
  };
}

/** The first field with a message, in reading order, or null. */
export function firstErrorField(errors: ContactErrors): ContactField | null {
  return CONTACT_FIELD_ORDER.find((field) => errors[field] !== undefined) ?? null;
}

export function hasErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
