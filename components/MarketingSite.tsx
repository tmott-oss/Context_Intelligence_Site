"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  About,
  Blueprint,
  Contact,
  ContextDifferentiator,
  Deliverables,
  Engagement,
  FailurePoints,
  Hero,
  MarketProblem,
  ReadinessAssessment,
  TransformationEquation,
} from "@/components/sections/Sections";
import { LeadDialog } from "@/components/ui/LeadDialog";

export function MarketingSite() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogIntent, setDialogIntent] = useState<"assessment" | "strategy">("assessment");
  const openAssessment = useCallback(() => {
    setDialogIntent("assessment");
    setDialogOpen(true);
  }, []);
  const openStrategy = useCallback(() => {
    setDialogIntent("strategy");
    setDialogOpen(true);
  }, []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={openStrategy} />
      <main id="main-content">
        <Hero onAssessment={openAssessment} />
        <MarketProblem />
        <FailurePoints />
        <Blueprint />
        <TransformationEquation />
        <ContextDifferentiator />
        <Deliverables />
        <Engagement />
        <ReadinessAssessment onAssessment={openAssessment} />
        <About />
        <Contact onAssessment={openAssessment} onStrategy={openStrategy} />
      </main>
      <Footer />
      <LeadDialog key={`${dialogIntent}-${dialogOpen}`} open={dialogOpen} intent={dialogIntent} onClose={closeDialog} />
    </>
  );
}
