"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_TOPICS,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  type ContactResponse,
  firstErrorField,
  hasErrors,
  validateContact,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * Stable ids, because the fields are the shared Input/Select/Textarea components
 * and those do not forward refs. Focusing the first invalid control by id keeps
 * the submit handler simple and the field markup untouched.
 */
const FIELD_IDS: Record<ContactField, string> = {
  name: "contact-name",
  email: "contact-email",
  topic: "contact-topic",
  message: "contact-message",
};

const EMPTY: ContactInput = { name: "", email: "", topic: "", message: "" };

type Status = "idle" | "submitting" | "sent" | "error";

/**
 * The contact form (brief F5): the shared field components, an outlined mono
 * "SEND MESSAGE" pill, inline messages under each field, a loading state, and one
 * live region for the outcome.
 *
 * Validation runs twice by design. The browser validates on submit so a mistake
 * is named next to the field that caused it; /api/contact revalidates the same
 * payload with the same shared rules, because a client check is a convenience
 * rather than a guarantee.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submitting = status === "submitting";
  const sent = status === "sent";

  /**
   * Once a field carries an error it is re-checked as the visitor types, so the
   * message clears the moment the input becomes valid instead of lingering until
   * the next submit.
   */
  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);

    setErrors((previous) => {
      if (previous[field] === undefined) {
        return previous;
      }

      const { errors: fresh } = validateContact(next);
      const copy = { ...previous };

      if (fresh[field] === undefined) {
        delete copy[field];
      } else {
        copy[field] = fresh[field];
      }

      return copy;
    });
  };

  const focusFirstError = (next: ContactErrors) => {
    const field = firstErrorField(next);
    if (field) {
      document.getElementById(FIELD_IDS[field])?.focus();
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const local = validateContact(values);
    if (hasErrors(local.errors)) {
      setErrors(local.errors);
      setStatus("error");
      setMessage("Some fields need attention before this can be sent.");
      focusFirstError(local.errors);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, [CONTACT_HONEYPOT_FIELD]: honeypot }),
      });
      const body = (await response.json()) as ContactResponse;

      if (!body.ok) {
        setErrors(body.errors);
        setStatus("error");
        setMessage(body.errors.form ?? "Some fields need attention before this can be sent.");
        focusFirstError(body.errors);
        return;
      }

      setStatus("sent");
      setMessage(body.message);
    } catch {
      setStatus("error");
      setMessage("The request could not be completed. Check your connection and try again.");
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setHoneypot("");
    setErrors({});
    setStatus("idle");
    setMessage("");
  };

  return (
    <div className="relative flex max-w-[520px] flex-col">
      {sent ? (
        <div className="rounded-card border border-line bg-bg-elev p-4">
          <p className="text-mono-label text-text-muted">Message received</p>
          <p className="text-body mt-3 text-text">{message}</p>
          <p className="text-meta mt-3">
            Nothing was transmitted: this build stops at the stub route so the flow can be
            reviewed without a provider.
          </p>
          <Button variant="outline" size="compact" className="mt-4" onClick={reset}>
            Send another
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              id={FIELD_IDS.name}
              name="name"
              label="Name"
              required
              autoComplete="name"
              placeholder="Your name"
              value={values.name}
              error={errors.name}
              disabled={submitting}
              onChange={(event) => update("name", event.target.value)}
            />

            <Input
              id={FIELD_IDS.email}
              name="email"
              type="email"
              label="Email"
              required
              autoComplete="email"
              placeholder="name@domain.com"
              value={values.email}
              error={errors.email}
              disabled={submitting}
              onChange={(event) => update("email", event.target.value)}
            />

            <Select
              id={FIELD_IDS.topic}
              name="topic"
              label="Topic"
              required
              placeholderOption="Choose a topic"
              value={values.topic}
              error={errors.topic}
              disabled={submitting}
              onChange={(event) => update("topic", event.target.value)}
            >
              {CONTACT_TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </Select>

            <Textarea
              id={FIELD_IDS.message}
              name="message"
              label="Message"
              required
              rows={6}
              placeholder="What would you like to look into?"
              value={values.message}
              error={errors.message}
              hint={values.message.length + "/2000"}
              disabled={submitting}
              onChange={(event) => update("message", event.target.value)}
            />
          </div>

          {/*
            Honeypot: off-canvas rather than display:none, hidden from assistive
            technology, out of the tab order and never autofilled. A person cannot
            reach it; a bot that posts every input in the form does. The route
            answers a filled trap with a plain success, so the sender learns
            nothing from the response.
          */}
          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
            <label htmlFor="contact-honeypot">Leave this field empty</label>
            <input
              id="contact-honeypot"
              name={CONTACT_HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="mt-4">
            <Button type="submit" variant="outline" trailingArrow loading={submitting}>
              Send message
            </Button>
          </div>
        </form>
      )}

      {/*
        The single live region for the outcome. It stays mounted across every
        state, including success, because a live region that is inserted with its
        text already inside it is not reliably announced.
      */}
      <p
        aria-live="polite"
        role="status"
        className={cn("text-meta text-text", message !== "" && "mt-3")}
      >
        {message}
      </p>
    </div>
  );
}

