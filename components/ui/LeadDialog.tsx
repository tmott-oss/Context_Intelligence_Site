"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { submitLead } from "@/lib/lead";
import { Button } from "./Button";

export type LeadIntent = "assessment" | "strategy" | "context-ready";

type FieldName =
  | "name"
  | "email"
  | "organization"
  | "platform"
  | "profileUrl"
  | "expertise"
  | "audienceSize"
  | "productIdea"
  | "audienceQuestions"
  | "promotionWillingness"
  | "additionalInfo";

type Fields = Record<FieldName, string>;

const initialFields: Fields = {
  name: "",
  email: "",
  organization: "",
  platform: "",
  profileUrl: "",
  expertise: "",
  audienceSize: "",
  productIdea: "",
  audienceQuestions: "",
  promotionWillingness: "",
  additionalInfo: "",
};

const creatorTextFields = [
  ["platform", "Primary social or audience platform", "For example, YouTube, LinkedIn, a podcast, or newsletter"],
  ["profileUrl", "Profile or channel URL", "https://"],
  ["expertise", "Area of expertise", "What do people trust you to teach?"],
  ["audienceSize", "Approximate audience size", "A range is fine"],
] as const;

const creatorTextareas = [
  ["productIdea", "Product idea, if one exists", "Tell us what you have in mind. It is fine if the idea is still early."],
  ["audienceQuestions", "What does your audience regularly ask for?", "Describe the problems, outcomes, or deeper instruction they seek."],
  ["additionalInfo", "Additional information", "Anything else that would help us understand the opportunity."],
] as const;

export function LeadDialog({ open, intent, onClose }: { open: boolean; intent: LeadIntent; onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [fields, setFields] = useState<Fields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isContextReady = intent === "context-ready";

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button, input, select, textarea, [href], [tabindex]:not([tabindex='-1'])"));
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

  const updateField = (field: FieldName, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Partial<Record<FieldName, string>> = {};
    if (!fields.name.trim()) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) nextErrors.email = "Enter a valid email.";

    if (isContextReady) {
      if (!fields.platform.trim()) nextErrors.platform = "Tell us where your audience follows you.";
      if (!fields.profileUrl.trim()) {
        nextErrors.profileUrl = "Add a profile or channel URL.";
      } else {
        try {
          const profileUrl = new URL(fields.profileUrl);
          if (!/^https?:$/.test(profileUrl.protocol)) throw new Error("Unsupported protocol");
        } catch {
          nextErrors.profileUrl = "Enter a complete URL beginning with http:// or https://.";
        }
      }
      if (!fields.expertise.trim()) nextErrors.expertise = "Tell us about your area of expertise.";
      if (!fields.audienceQuestions.trim()) nextErrors.audienceQuestions = "Tell us what your audience asks for.";
      if (!fields.promotionWillingness) nextErrors.promotionWillingness = "Choose the option that best describes your participation.";
    } else if (!fields.organization.trim()) {
      nextErrors.organization = "Enter your organization.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    const result = await submitLead(
      isContextReady
        ? {
            name: fields.name.trim(),
            email: fields.email.trim(),
            interest: intent,
            platform: fields.platform.trim(),
            profileUrl: fields.profileUrl.trim(),
            expertise: fields.expertise.trim(),
            audienceSize: fields.audienceSize.trim(),
            productIdea: fields.productIdea.trim(),
            audienceQuestions: fields.audienceQuestions.trim(),
            promotionWillingness: fields.promotionWillingness,
            additionalInfo: fields.additionalInfo.trim(),
          }
        : {
            name: fields.name.trim(),
            email: fields.email.trim(),
            organization: fields.organization.trim(),
            interest: intent,
          },
    );
    if (result.ok) {
      setStatus("success");
      setFields(initialFields);
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  };

  const eyebrow = isContextReady ? "Context Ready partnership" : intent === "assessment" ? "AI transformation readiness" : "Executive briefing";
  const title = isContextReady ? "Apply to build your product" : intent === "assessment" ? "Request the AI Transformation Readiness Assessment" : "Request an executive strategy session";
  const intro = isContextReady
    ? "Tell us about your expertise, audience, and the opportunity you see. We review each application for partnership fit."
    : intent === "assessment"
      ? "Tell us where to reach you to begin an advisory assessment of the foundations required for coordinated AI transformation."
      : "Tell us where to reach you to begin a focused conversation about your transformation priorities.";

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div ref={dialogRef} className={`dialog${isContextReady ? " dialog--application" : ""}`} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <button className="dialog__close" onClick={onClose} aria-label="Close dialog">×</button>
        {status === "success" ? (
          <div className="dialog__success" aria-live="polite">
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Thank you. We will be in touch.</h2>
            <p>{isContextReady ? "Your Context Ready partnership application has been submitted." : intent === "assessment" ? "Your assessment request has been submitted." : "Your request has been submitted for an executive strategy conversation."}</p>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <>
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={titleId}>{title}</h2>
            <p id={descriptionId} className="dialog__intro">{intro}</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className={isContextReady ? "dialog__field-grid" : undefined}>
                {(["name", "email"] as const).map((field) => {
                  const labels = { name: "Name", email: isContextReady ? "Email" : "Work email" };
                  const placeholders = { name: "Full name", email: "you@example.com" };
                  return (
                    <label className="field" key={field}>
                      <span>{labels[field]}</span>
                      <input type={field === "email" ? "email" : "text"} autoComplete={field === "name" ? "name" : "email"} value={fields[field]} placeholder={placeholders[field]} aria-invalid={Boolean(errors[field])} onChange={(event) => updateField(field, event.target.value)} />
                      {errors[field] && <small role="alert">{errors[field]}</small>}
                    </label>
                  );
                })}
                {!isContextReady && (
                  <label className="field">
                    <span>Organization</span>
                    <input type="text" autoComplete="organization" value={fields.organization} placeholder="Company" aria-invalid={Boolean(errors.organization)} onChange={(event) => updateField("organization", event.target.value)} />
                    {errors.organization && <small role="alert">{errors.organization}</small>}
                  </label>
                )}
                {isContextReady && creatorTextFields.map(([field, label, placeholder]) => (
                  <label className="field" key={field}>
                    <span>{label}{field === "audienceSize" ? " (optional)" : ""}</span>
                    <input type={field === "profileUrl" ? "url" : "text"} value={fields[field]} placeholder={placeholder} aria-invalid={Boolean(errors[field])} onChange={(event) => updateField(field, event.target.value)} />
                    {errors[field] && <small role="alert">{errors[field]}</small>}
                  </label>
                ))}
              </div>
              {isContextReady && (
                <>
                  {creatorTextareas.map(([field, label, placeholder]) => (
                    <label className="field" key={field}>
                      <span>{label}{field === "audienceQuestions" ? "" : " (optional)"}</span>
                      <textarea rows={field === "audienceQuestions" ? 4 : 3} value={fields[field]} placeholder={placeholder} aria-invalid={Boolean(errors[field])} onChange={(event) => updateField(field, event.target.value)} />
                      {errors[field] && <small role="alert">{errors[field]}</small>}
                    </label>
                  ))}
                  <label className="field">
                    <span>Willingness to participate in promotion</span>
                    <select value={fields.promotionWillingness} aria-invalid={Boolean(errors.promotionWillingness)} onChange={(event) => updateField("promotionWillingness", event.target.value)}>
                      <option value="">Select an option</option>
                      <option value="actively-participate">I am ready to actively participate</option>
                      <option value="discuss-approach">I would like to discuss the approach</option>
                      <option value="not-sure">I am not sure yet</option>
                    </select>
                    {errors.promotionWillingness && <small role="alert">{errors.promotionWillingness}</small>}
                  </label>
                </>
              )}
              {status === "error" && <p className="form-error" role="alert">{message}</p>}
              <div className="dialog__actions">
                <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : isContextReady ? "Submit application" : intent === "assessment" ? "Request assessment" : "Request session"}</Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
