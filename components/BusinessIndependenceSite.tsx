"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadDialog } from "@/components/ui/LeadDialog";

const focusAreas = [
  ["01", "Key-person dependency analysis", "Identify the decisions, relationships, knowledge, and operating responsibilities concentrated in individual people."],
  ["02", "Institutional knowledge assessment", "Determine which experience and context the organization cannot afford to lose."],
  ["03", "Decision-rights clarification", "Create greater clarity around ownership, authority, escalation, and continuity."],
  ["04", "Succession and transferability roadmap", "Build a practical path toward greater resilience, scalability, and enterprise value."],
] as const;

export function BusinessIndependenceSite() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={openDialog} />
      <main id="main-content">
        <section className="secondary-hero" aria-labelledby="independence-title">
          <div className="secondary-hero__grid" aria-hidden="true" />
          <div className="shell secondary-hero__inner">
            <Eyebrow>Secondary Advisory Offering</Eyebrow>
            <p className="badge badge--blue">Business Independence Blueprint</p>
            <h1 id="independence-title">Reduce owner dependency. <em>Increase enterprise value.</em></h1>
            <p>For founder-led and owner-dependent organizations preparing for succession, acquisition, or scale—where critical knowledge, decisions, and relationships still live with one person.</p>
            <div className="actions"><Button variant="blue" onClick={openDialog}>Schedule an Executive Strategy Session</Button><Link className="button button--outline" href="/#blueprint">Explore AI Transformation</Link></div>
          </div>
        </section>
        <section className="section section--raised" aria-labelledby="independence-focus-title">
          <div className="shell">
            <div className="section-heading section-heading--wide">
              <Eyebrow>A Specialized Pathway</Eyebrow>
              <h2 id="independence-focus-title">Make the business stronger beyond any one person.</h2>
              <p>The Business Independence Blueprint identifies where an organization depends too heavily on founders, executives, or experienced employees and designs the systems, knowledge architecture, and operating practices required to reduce that risk.</p>
            </div>
            <div className="segmented segmented--four">
              {focusAreas.map(([number, title, text]) => <article className="info-cell info-cell--compact" key={title}><span className="is-blue">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>
        <section className="section contact" aria-labelledby="independence-contact-title">
          <div className="contact__inner">
            <Eyebrow centered>Begin</Eyebrow>
            <h2 id="independence-contact-title">Build an organization that can scale, transfer, and endure.</h2>
            <p>An executive strategy session will help identify the most consequential dependencies and the practical steps required to reduce them.</p>
            <div className="actions actions--center"><Button onClick={openDialog}>Schedule an Executive Strategy Session</Button></div>
          </div>
        </section>
      </main>
      <Footer />
      <LeadDialog key={`strategy-${dialogOpen}`} open={dialogOpen} intent="strategy" onClose={closeDialog} />
    </>
  );
}
