"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";
import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";

import Button from "@/components/ui/button";
import { contact } from "@/data/contact";

type FieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
};

function Field({ label, required, id, ...props }: FieldProps) {
  return (
    <div className="contact-field">
      <label htmlFor={id} className="contact-label">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden="true">
            {" "}*
          </span>
        )}
      </label>

      <input
        {...props}
        id={id}
        required={required}
        className="contact-input"
      />
    </div>
  );
}

type Feedback = {
  kind: "success" | "error";
  message: string;
};

export default function ContactForm() {
  const id = useId();
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    sending.current = true;
    setPending(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ?? "Your inquiry could not be sent. Please try again.",
        );
      }

      setFeedback({
        kind: "success",
        message: "Thanks — your inquiry has been sent. I’ll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      setFeedback({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again or email me directly.",
      });
    } finally {
      sending.current = false;
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {feedback && (
          <div
            className="contact-feedback"
            data-kind={feedback.kind}
          >
            {feedback.kind === "success" ? (
              <CheckCircleIcon size={24} aria-hidden="true" />
            ) : (
              <WarningCircleIcon size={24} aria-hidden="true" />
            )}

            <p>{feedback.message}</p>
          </div>
        )}
      </div>

      <fieldset disabled={pending} className="contact-fields">
        <legend className="sr-only">Your inquiry</legend>

        <Field
          id={`${id}-name`}
          name="name"
          label="Name"
          placeholder="Your name"
          autoComplete="name"
          required
          maxLength={100}
        />

        <Field
          id={`${id}-email`}
          name="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
          maxLength={254}
        />

        <Field
          id={`${id}-company`}
          name="company"
          label="Company / organization"
          placeholder="Optional"
          autoComplete="organization"
          maxLength={150}
        />

        <Field
          id={`${id}-project`}
          name="project"
          label="Project / inquiry"
          placeholder="e.g. Website, collaboration, job opportunity"
          required
          maxLength={150}
        />

        <div className="contact-field">
          <label htmlFor={`${id}-budget`} className="contact-label">
            Budget range
          </label>

          <select
            id={`${id}-budget`}
            name="budget"
            defaultValue=""
            className="contact-input"
          >
            <option value="">Select one — optional</option>

            {contact.budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <Field
          id={`${id}-timeline`}
          name="timeline"
          label="Ideal timeline"
          placeholder="e.g. Next month, next quarter, flexible"
          maxLength={150}
        />

        <div className="contact-field contact-field-wide">
          <label htmlFor={`${id}-message`} className="contact-label">
            Project details
            <span className="text-destructive" aria-hidden="true">
              {" "}*
            </span>
          </label>

          <textarea
            id={`${id}-message`}
            name="message"
            className="contact-input contact-message"
            placeholder="What are you working on, who is it for, and how can I help?"
            required
            minLength={10}
            maxLength={5000}
            rows={6}
          />
        </div>

        {/* Basic spam trap: real visitors leave this empty. */}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this empty</label>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="contact-actions contact-field-wide">
          <p className="text-sm text-muted-foreground">
            Prefer email?{" "}
            <a
              href={`mailto:${contact.email}`}
              className="break-all text-foreground hover:text-primary"
            >
              {contact.email}
            </a>
          </p>

          <Button
            type="submit"
            disabled={pending}
            className="min-h-11 px-6"
          >
            {pending ? "Sending…" : "Send inquiry"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}