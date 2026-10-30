"use client";

import { useCallback } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadDialog } from "@/components/ui/LeadDialog";

const questions = [
  "Why are we missing calls?",
  "Why am I still doing this manually?",
  "Why didn't anyone follow up with that customer?",
  "Why am I spending Sunday night building schedules?",
  "Why haven't we posted anything in two weeks?",
  "Why do I have five systems that don't talk to each other?",
] as const;

const outcomes = [
  [
    "Stop losing opportunities",
    "Missed calls, leads, and forgotten follow-ups.",
    "Call answering and capture, and automated follow-ups.",
  ],
  [
    "Get hours back",
    "Scheduling, paperwork, repetitive admin, and data entry.",
    "Scheduling tools.",
  ],
  [
    "Keep customers moving",
    "Reminders, confirmations, updates, and follow-up.",
    "Reminder texts, confirmations, and follow-up messages.",
  ],
  [
    "Stay visible locally",
    "Consistent social content, such as specials, behind-the-scenes, and community posts, without the owner having to become a content creator.",
    "A managed social posting calendar.",
  ],
] as const;

const steps = [
  ["01", "Walk the business", "Show us how calls, orders, scheduling, customers, and admin actually move through the business."],
  ["02", "Find the friction", "We identify where you are losing time, customers, or money."],
  ["03", "Fix the highest-value problems first", "We build the automations, AI tools, and workflows."],
  ["04", "Keep improving", "Once something works, we move to the next bottleneck."],
] as const;

const examples = [
  [
    "A delivery and hauling operation",
    "We walked the business with the owner and mapped how calls, scheduling, and dispatch actually move, to find where time was being lost.",
  ],
  [
    "A multi-location restaurant business",
    "An AI assistant and workflow setup for the owner across locations.",
  ],
] as const;

export function LocalBusinessSite() {
  const scrollToForm = useCallback(() => {
    document.getElementById("local-assessment")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={scrollToForm} requestLabel="Find Out What's Wasting Your Time" />
      <main id="main-content" className="local-business">
        <section className="local-hero" aria-labelledby="local-hero-title">
          <div className="shell local-hero__layout">
            <div className="local-hero__copy">
              <Eyebrow>Local Business</Eyebrow>
              <h1 id="local-hero-title">Your business probably has 10 hours of work every week that nobody should be doing manually.</h1>
              <p className="local-hero__find">We find it. We fix it.</p>
              <p className="local-hero__list">Calls. Follow-ups. Scheduling. Admin. Customer communication. Social media.</p>
              <p>Practical AI and automation built around how your business actually works.</p>
              <div className="actions">
                <a className="button button--blue" href="#local-assessment">Find Out What&apos;s Wasting Your Time</a>
                <a className="button button--outline" href="#outcomes">See What We Can Fix</a>
              </div>
            </div>
            <figure className="local-hero__figure">
              {/* TODO: Replace this placeholder with a photograph of a local business owner or worker mid-shift. Do not use AI-generated people or stock photos with invented names. */}
              <div className="local-hero__placeholder" role="img" aria-label="Local business owner or worker mid-shift, photograph to be added">
                <span>Photograph to be added</span>
              </div>
            </figure>
          </div>
        </section>

        <section className="clarity-section local-questions" aria-labelledby="local-questions-title">
          <div className="shell local-questions__layout">
            <div className="clarity-heading">
              <Eyebrow>The owner&apos;s questions</Eyebrow>
              <h2 id="local-questions-title">The week gets eaten by the same problems.</h2>
            </div>
            <div>
              <ul className="local-questions__list">
                {questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
              <p className="local-bridge">We find the repetitive work eating up your week, then use AI and automation to take it off your plate.</p>
            </div>
          </div>
        </section>

        <section id="outcomes" className="clarity-section local-outcomes anchor-section" aria-labelledby="outcomes-title">
          <div className="shell">
            <div className="clarity-heading">
              <Eyebrow>What changes</Eyebrow>
              <h2 id="outcomes-title">Fix the stuff that wastes time and costs money.</h2>
            </div>
            <div className="local-outcomes__grid">
              {outcomes.map(([title, problem, implement]) => (
                <article className="family-card" key={title}>
                  <h3>{title}</h3>
                  <p>{problem}</p>
                  <small>What we put in place: {implement}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="clarity-section local-steps" aria-labelledby="local-steps-title">
          <div className="shell">
            <div className="clarity-heading">
              <Eyebrow>How it works</Eyebrow>
              <h2 id="local-steps-title">We come see how your business actually runs.</h2>
            </div>
            <ol className="local-steps__grid">
              {steps.map(([number, title, text]) => (
                <li className="family-card" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="clarity-section local-examples" aria-labelledby="local-examples-title">
          <div className="shell">
            <div className="clarity-heading">
              <Eyebrow>In the field</Eyebrow>
              <h2 id="local-examples-title">Example implementations</h2>
            </div>
            <div className="local-examples__grid">
              {examples.map(([title, text]) => (
                <article className="family-card" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="clarity-section local-objection" aria-labelledby="local-objection-title">
          <div className="shell local-objection__inner">
            <h2 id="local-objection-title">Not sure what AI could actually do for your business?</h2>
            <p>Good. You don&apos;t need to know. Show us how the business works today. We&apos;ll look for the repetitive work, dropped handoffs, and things that depend too much on you. Then we&apos;ll tell you what we&apos;d fix first.</p>
          </div>
        </section>

        <section id="local-assessment" className="clarity-section local-assessment anchor-section" aria-labelledby="local-assessment-title">
          <div className="shell local-assessment__layout">
            <div className="clarity-heading">
              <Eyebrow>Start here</Eyebrow>
              <h2 id="local-assessment-title">Find Out What&apos;s Wasting Your Time.</h2>
              <p>Tell us how to reach you. If you want, add the type of business. We will look at how the work moves today.</p>
            </div>
            <LeadDialog mode="inline" intent="local-business" open onClose={() => undefined} />
          </div>
        </section>

        <WhoWeHelp current="local" />
      </main>
      <Footer />
    </>
  );
}
