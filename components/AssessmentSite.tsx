"use client";

import Link from "next/link";
import { FormEvent, useCallback, useId, useMemo, useState } from "react";
import { blueprintStages } from "@/components/content/blueprint";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadDialog } from "@/components/ui/LeadDialog";
import { submitLead } from "@/lib/lead";

type Choice = { label: string; detail: string; score: number };
type AssessmentQuestion = {
  stage: (typeof blueprintStages)[number];
  question: string;
  choices: readonly Choice[];
};

const questions: readonly AssessmentQuestion[] = [
  {
    stage: blueprintStages[0],
    question: "How clearly has leadership defined the business outcomes AI should support?",
    choices: [
      { score: 1, label: "Not yet defined", detail: "Interest exists, but there is no shared destination." },
      { score: 2, label: "Broadly discussed", detail: "Leaders agree AI matters, but priorities remain general." },
      { score: 3, label: "Outcomes selected", detail: "Priority outcomes are agreed, though ownership or measures may be incomplete." },
      { score: 4, label: "Outcomes governed", detail: "Outcomes, owners, measures, and decision criteria are explicit." },
    ],
  },
  {
    stage: blueprintStages[1],
    question: "How deliberately does your organization select the work worth transforming?",
    choices: [
      { score: 1, label: "No shared inventory", detail: "Teams pursue ideas independently or reactively." },
      { score: 2, label: "Opportunities collected", detail: "Potential use cases are known, but not consistently ranked." },
      { score: 3, label: "Priorities selected", detail: "High-impact, repeatable work is being evaluated first." },
      { score: 4, label: "Portfolio managed", detail: "Opportunities are continually ranked by value, feasibility, and risk." },
    ],
  },
  {
    stage: blueprintStages[2],
    question: "How ready is the business context AI needs to make reliable decisions?",
    choices: [
      { score: 1, label: "Mostly in people", detail: "Critical knowledge, rules, and history are difficult to access." },
      { score: 2, label: "Partly documented", detail: "Useful sources exist, but they are fragmented or inconsistently maintained." },
      { score: 3, label: "Structured and connected", detail: "Core knowledge and rules are accessible for priority workflows." },
      { score: 4, label: "Governed and current", detail: "Context has ownership, controls, freshness standards, and feedback loops." },
    ],
  },
  {
    stage: blueprintStages[3],
    question: "How far has your organization moved from AI tasks to redesigned workflows?",
    choices: [
      { score: 1, label: "Individual task use", detail: "People use tools independently without changing the broader workflow." },
      { score: 2, label: "Workflow pilots", detail: "Some end-to-end processes have been mapped or tested." },
      { score: 3, label: "Operating design defined", detail: "People, AI, approvals, handoffs, and systems are intentionally combined." },
      { score: 4, label: "Performance managed", detail: "Redesigned workflows are measured and improved against business outcomes." },
    ],
  },
  {
    stage: blueprintStages[4],
    question: "How clearly are AI agents assigned responsibilities and boundaries?",
    choices: [
      { score: 1, label: "General experimentation", detail: "Tools or assistants are used without defined authority." },
      { score: 2, label: "Early specialist pilots", detail: "Agents have narrow purposes, but controls are still forming." },
      { score: 3, label: "Roles and controls defined", detail: "Permissions, approvals, escalation, and ownership are explicit." },
      { score: 4, label: "Governed agent portfolio", detail: "Agent performance, risk, context, and lifecycle are actively managed." },
    ],
  },
  {
    stage: blueprintStages[5],
    question: "How intentionally is the organization leading adoption and behavior change?",
    choices: [
      { score: 1, label: "Optional and uneven", detail: "Adoption depends mainly on individual interest." },
      { score: 2, label: "Training introduced", detail: "People receive guidance, but reinforcement and sponsorship vary." },
      { score: 3, label: "Change system active", detail: "Sponsors, coaching, expectations, and feedback support new ways of working." },
      { score: 4, label: "Adoption measured", detail: "Behavior and performance measures guide continuous enablement." },
    ],
  },
  {
    stage: blueprintStages[6],
    question: "How consistently does your organization expand what works?",
    choices: [
      { score: 1, label: "Experiments stay isolated", detail: "Learning and solutions rarely transfer across teams." },
      { score: 2, label: "Reuse is occasional", detail: "Successful ideas spread, but without a repeatable expansion model." },
      { score: 3, label: "Patterns are repeatable", detail: "Proven workflows, context, and controls can extend to new areas." },
      { score: 4, label: "Value compounds", detail: "Governance and continuous improvement systematically increase impact." },
    ],
  },
] as const;

const scoreLabels = ["Emerging", "Developing", "Established", "Scaling"] as const;

const patterns = [
  {
    max: 13,
    title: "Foundation required",
    summary: "AI activity is moving ahead of the operating foundation. The next move is to align the business outcome, choose the right work, and organize the context that reliable execution requires.",
  },
  {
    max: 20,
    title: "Alignment in progress",
    summary: "Important building blocks are taking shape, but they are not yet operating as one transformation system. The next move is to connect priorities, workflow design, context, governance, and adoption.",
  },
  {
    max: 28,
    title: "Mobilization ready",
    summary: "Your organization shows many of the conditions needed to mobilize AI responsibly. The next move is to prove value in priority workflows, strengthen weaker systems, and scale only what performs.",
  },
] as const;

export function AssessmentSite() {
  const assessmentId = useId();
  const [started, setStarted] = useState(false);
  const [contact, setContact] = useState({ name: "", organization: "", title: "", email: "", phone: "" });
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof typeof contact, string>>>({});
  const [contactStatus, setContactStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [contactMessage, setContactMessage] = useState("");
  const [resultDelivery, setResultDelivery] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [complete, setComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const openStrategy = useCallback(() => setDialogOpen(true), []);
  const closeStrategy = useCallback(() => setDialogOpen(false), []);
  const selected = answers[current];

  const updateContact = (field: keyof typeof contact, value: string) => {
    setContact((currentContact) => ({ ...currentContact, [field]: value }));
    if (contactErrors[field]) setContactErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  };

  const beginAssessment = async (event: FormEvent) => {
    event.preventDefault();
    const errors: Partial<Record<keyof typeof contact, string>> = {};
    if (!contact.name.trim()) errors.name = "Enter your name.";
    if (!contact.organization.trim()) errors.organization = "Enter your company name.";
    if (!contact.title.trim()) errors.title = "Enter your title.";
    if (!/^\S+@\S+\.\S+$/.test(contact.email)) errors.email = "Enter a valid business email.";
    if (contact.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number.";
    setContactErrors(errors);
    if (Object.keys(errors).length) return;

    setContactStatus("submitting");
    const submission = await submitLead({
      name: contact.name.trim(),
      organization: contact.organization.trim(),
      title: contact.title.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      interest: "assessment",
      assessmentId,
      assessmentStatus: "started",
    });
    if (submission.ok || process.env.NODE_ENV === "development") {
      setContactStatus("idle");
      setStarted(true);
      focusHeading();
      return;
    }
    setContactStatus("error");
    setContactMessage(submission.message);
  };

  const result = useMemo(() => {
    if (!complete) return null;
    const values = answers.map((answer) => answer ?? 1);
    const total = values.reduce((sum, value) => sum + value, 0);
    const lowest = Math.min(...values);
    const highest = Math.max(...values);
    const balanced = lowest === highest;
    const priorityIndex = values.indexOf(lowest);
    const strengthIndex = values.indexOf(highest);
    const pattern = patterns.find((item) => total <= item.max) ?? patterns[patterns.length - 1];
    return { values, priorityIndex, strengthIndex, balanced, pattern };
  }, [answers, complete]);

  const choose = (score: number) => {
    setAnswers((currentAnswers) => currentAnswers.map((answer, index) => index === current ? score : answer));
  };

  const focusHeading = () => requestAnimationFrame(() => document.getElementById("assessment-question")?.focus());
  const deliverResults = async (values: number[]) => {
    const lowest = Math.min(...values);
    const highest = Math.max(...values);
    const balanced = lowest === highest;
    const priorityIndex = values.indexOf(lowest);
    const strengthIndex = values.indexOf(highest);
    const total = values.reduce((sum, value) => sum + value, 0);
    const pattern = patterns.find((item) => total <= item.max) ?? patterns[patterns.length - 1];
    setResultDelivery("sending");
    const submission = await submitLead({
      name: contact.name.trim(),
      organization: contact.organization.trim(),
      title: contact.title.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      interest: "assessment",
      assessmentId,
      assessmentStatus: "completed",
      assessmentPattern: pattern.title,
      assessmentPriority: balanced ? "No single priority; select by business impact" : questions[priorityIndex].stage.title,
      assessmentStrength: balanced ? "Balanced across all seven systems" : questions[strengthIndex].stage.title,
      assessmentScores: Object.fromEntries(questions.map(({ stage }, index) => [stage.slug, values[index]])),
    });
    setResultDelivery(submission.ok ? "sent" : "error");
  };

  const next = () => {
    if (selected === null) return;
    if (current === questions.length - 1) {
      setComplete(true);
      void deliverResults(answers.map((answer) => answer ?? 1));
      requestAnimationFrame(() => document.getElementById("assessment-result")?.focus());
      return;
    }
    setCurrent((index) => index + 1);
    focusHeading();
  };

  const back = () => {
    setCurrent((index) => Math.max(0, index - 1));
    focusHeading();
  };

  const reset = () => {
    setAnswers(questions.map(() => null));
    setCurrent(0);
    setComplete(false);
    setStarted(true);
    focusHeading();
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={openStrategy} requestLabel="Request a Strategy Session" />
      <main id="main-content" className="assessment-page">
        {!started ? (
          <section className="assessment-intro" aria-labelledby="assessment-title">
            <div className="shell assessment-intro__layout">
              <div>
                <Eyebrow>AI Transformation Readiness Assessment</Eyebrow>
                <h1 id="assessment-title">See where AI transformation can move forward—and what needs attention first.</h1>
                <p>In about five minutes, evaluate the seven business systems that determine whether AI becomes disconnected activity or measurable operating value.</p>
                <p className="assessment-note">Your seven-system snapshot appears immediately after the final question.</p>
                <ol className="assessment-intro__systems" aria-label="Assessment topics">
                  {blueprintStages.map((stage) => <li key={stage.slug}><span>{stage.number}</span>{stage.title}</li>)}
                </ol>
              </div>
              <form className="assessment-contact" onSubmit={beginAssessment} noValidate>
                  <div className="assessment-contact__heading">
                    <h2>Tell us about you</h2>
                    <p>Enter your contact information, then begin the seven-question assessment.</p>
                  </div>
                  <div className="assessment-contact__grid">
                    <label className="field">
                      <span>Name</span>
                      <input type="text" autoComplete="name" value={contact.name} placeholder="Full name" aria-invalid={Boolean(contactErrors.name)} onChange={(event) => updateContact("name", event.target.value)} />
                      {contactErrors.name && <small role="alert">{contactErrors.name}</small>}
                    </label>
                    <label className="field">
                      <span>Company name</span>
                      <input type="text" autoComplete="organization" value={contact.organization} placeholder="Company" aria-invalid={Boolean(contactErrors.organization)} onChange={(event) => updateContact("organization", event.target.value)} />
                      {contactErrors.organization && <small role="alert">{contactErrors.organization}</small>}
                    </label>
                    <label className="field">
                      <span>Title</span>
                      <input type="text" autoComplete="organization-title" value={contact.title} placeholder="Your role" aria-invalid={Boolean(contactErrors.title)} onChange={(event) => updateContact("title", event.target.value)} />
                      {contactErrors.title && <small role="alert">{contactErrors.title}</small>}
                    </label>
                    <label className="field">
                      <span>Business email</span>
                      <input type="email" autoComplete="email" value={contact.email} placeholder="you@company.com" aria-invalid={Boolean(contactErrors.email)} onChange={(event) => updateContact("email", event.target.value)} />
                      {contactErrors.email && <small role="alert">{contactErrors.email}</small>}
                    </label>
                    <label className="field assessment-contact__phone">
                      <span>Phone number</span>
                      <input type="tel" autoComplete="tel" value={contact.phone} placeholder="(555) 555-0123" aria-invalid={Boolean(contactErrors.phone)} onChange={(event) => updateContact("phone", event.target.value)} />
                      {contactErrors.phone && <small role="alert">{contactErrors.phone}</small>}
                    </label>
                  </div>
                  {contactStatus === "error" && <p className="form-error" role="alert">{contactMessage}</p>}
                  <div className="assessment-contact__actions">
                    <Button type="submit" disabled={contactStatus === "submitting"}>{contactStatus === "submitting" ? "Starting…" : "Begin the Assessment"}</Button>
                    <Link className="button button--outline" href="/#methodology">Explore the Blueprint</Link>
                  </div>
                  <p className="assessment-contact__privacy">By continuing, you agree that Context Intelligence may use this information to respond about your assessment. See our <Link href="/privacy">Privacy notice</Link>.</p>
              </form>
            </div>
          </section>
        ) : complete && result ? (
          <section className="assessment-results" aria-labelledby="assessment-result-title">
            <div className="shell">
              <div className="assessment-results__header" id="assessment-result" tabIndex={-1}>
                <Eyebrow>Your Directional Readiness Snapshot</Eyebrow>
                <p className="assessment-results__kicker">Current operating pattern</p>
                <h1 id="assessment-result-title">{result.pattern.title}</h1>
                <p>{result.pattern.summary}</p>
              </div>

              <div className="assessment-results__priorities">
                <article>
                  <span>{result.balanced ? "Readiness pattern" : "Strongest foundation"}</span>
                  <h2>{result.balanced ? "Balanced across systems" : questions[result.strengthIndex].stage.title}</h2>
                  <p>{result.balanced ? "The seven systems are developing at a similar level, so no single strength materially outranks the others." : questions[result.strengthIndex].stage.result}</p>
                </article>
                <article className="is-priority">
                  <span>Priority for attention</span>
                  <h2>{result.balanced ? "Select by business impact" : questions[result.priorityIndex].stage.title}</h2>
                  <p>{result.balanced ? "Begin with the system most closely tied to your highest-value workflow, then strengthen the connected systems around it." : <>{questions[result.priorityIndex].stage.prompt} {questions[result.priorityIndex].stage.description}</>}</p>
                </article>
              </div>

              <div className="assessment-results__system" aria-labelledby="system-results-title">
                <div>
                  <Eyebrow>Your Seven-System View</Eyebrow>
                  <h2 id="system-results-title">Readiness is only as coordinated as the systems behind it.</h2>
                </div>
                <ol>
                  {questions.map(({ stage }, index) => (
                    <li key={stage.slug}>
                      <div><span>{stage.number}</span><strong>{stage.title}</strong><em>{scoreLabels[result.values[index] - 1]}</em></div>
                      <div className="assessment-meter" aria-label={`${stage.title}: ${scoreLabels[result.values[index] - 1]}`}>
                        <i style={{ width: `${result.values[index] * 25}%` }} />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="assessment-results__next">
                <Eyebrow>Turn the Snapshot Into a Decision</Eyebrow>
                <h2>Start with the priority that unlocks the rest.</h2>
                <p>An Executive Strategy Session can examine the result in the context of your organization, identify the work worth transforming, and define a practical next move.</p>
                <div className="actions">
                  <Button onClick={openStrategy}>Request an Executive Strategy Session</Button>
                  <Button variant="outline" onClick={() => window.print()}>Print This Snapshot</Button>
                  <Button variant="ghost" onClick={reset}>Retake Assessment</Button>
                </div>
                <p className={`assessment-delivery assessment-delivery--${resultDelivery}`} aria-live="polite">
                  {resultDelivery === "sending" && "Saving your completed assessment…"}
                  {resultDelivery === "sent" && "Your completed assessment has been shared with Context Intelligence."}
                  {resultDelivery === "error" && "Your snapshot is available, but the completed assessment could not be sent. Please try again before leaving this page."}
                </p>
                {resultDelivery === "error" && <Button variant="ghost" onClick={() => void deliverResults(result.values)}>Try Sending Again</Button>}
                <small>This snapshot is a directional planning tool—not an audit, benchmark, certification, or guarantee of results.</small>
              </div>
            </div>
          </section>
        ) : (
          <section className="assessment-flow" aria-labelledby="assessment-question">
            <div className="shell assessment-flow__shell">
              <div className="assessment-progress" aria-label={`Question ${current + 1} of ${questions.length}`}>
                <div><span>Question {current + 1} of {questions.length}</span><strong>{questions[current].stage.title}</strong></div>
                <div className="assessment-progress__track"><i style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></div>
              </div>
              <div className="assessment-question">
                <Eyebrow>{questions[current].stage.number} · {questions[current].stage.prompt}</Eyebrow>
                <h1 id="assessment-question" tabIndex={-1}>{questions[current].question}</h1>
                <fieldset>
                  <legend className="sr-only">Choose the statement that best describes your organization</legend>
                  {questions[current].choices.map((choice) => (
                    <label key={choice.score} className={selected === choice.score ? "assessment-choice is-selected" : "assessment-choice"}>
                      <input type="radio" name={`question-${current}`} value={choice.score} checked={selected === choice.score} onChange={() => choose(choice.score)} />
                      <span><strong>{choice.label}</strong><small>{choice.detail}</small></span>
                    </label>
                  ))}
                </fieldset>
                <div className="assessment-question__actions">
                  <Button variant="ghost" onClick={back} disabled={current === 0}>Back</Button>
                  <Button onClick={next} disabled={selected === null}>{current === questions.length - 1 ? "See My Snapshot" : "Next Question"}</Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <LeadDialog key={`assessment-strategy-${dialogOpen}`} open={dialogOpen} intent="strategy" onClose={closeStrategy} />
    </>
  );
}
