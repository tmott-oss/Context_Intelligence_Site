"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { submitLead } from "@/lib/lead";
import { Button } from "./Button";

type Fields = { name: string; email: string; organization: string };
const initialFields: Fields = { name: "", email: "", organization: "" };

export function LeadDialog({ open, intent, onClose }: { open: boolean; intent: "assessment" | "strategy"; onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, input, [href], [tabindex]:not([tabindex='-1'])"));
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.body.classList.add("dialog-open");
    document.addEventListener("keydown", onKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus());
    return () => {
      document.body.classList.remove("dialog-open");
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Fields> = {};
    if (!fields.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) nextErrors.email = "Enter a valid work email.";
    if (!fields.organization.trim()) nextErrors.organization = "Enter your organization.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    const result = await submitLead({ ...fields, interest: intent });
    if (result.ok) {
      setStatus("success");
      setFields(initialFields);
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  };

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <button className="dialog__close" onClick={onClose} aria-label="Close dialog">×</button>
        {status === "success" ? (
          <div className="dialog__success" aria-live="polite">
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Thank you. We will be in touch.</h2>
            <p>{intent === "assessment" ? "Your assessment request has been submitted." : "Your request has been submitted for an executive strategy conversation."}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <p className="eyebrow">{intent === "assessment" ? "AI transformation readiness" : "Executive briefing"}</p>
            <h2 id={titleId}>{intent === "assessment" ? "Request the AI Transformation Readiness Assessment" : "Schedule an executive strategy session"}</h2>
            <p id={descriptionId} className="dialog__intro">{intent === "assessment" ? "Tell us where to reach you to begin an advisory assessment of the foundations required for coordinated AI transformation." : "Tell us where to reach you to begin a focused conversation about your transformation priorities."}</p>
            <form onSubmit={handleSubmit} noValidate>
              {(["name", "email", "organization"] as const).map((field) => {
                const labels = { name: "Name", email: "Work email", organization: "Organization" };
                const placeholders = { name: "Full name", email: "you@company.com", organization: "Company" };
                return (
                  <label className="field" key={field}>
                    <span>{labels[field]}</span>
                    <input
                      type={field === "email" ? "email" : "text"}
                      autoComplete={field === "name" ? "name" : field === "email" ? "email" : "organization"}
                      value={fields[field]}
                      placeholder={placeholders[field]}
                      aria-invalid={Boolean(errors[field])}
                      onChange={(event) => setFields((current) => ({ ...current, [field]: event.target.value }))}
                    />
                    {errors[field] && <small role="alert">{errors[field]}</small>}
                  </label>
                );
              })}
              {status === "error" && <p className="form-error" role="alert">{message}</p>}
              <div className="dialog__actions">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : intent === "assessment" ? "Request assessment" : "Request session"}</Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
