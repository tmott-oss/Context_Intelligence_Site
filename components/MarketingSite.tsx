"use client";

import { useCallback, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  About,
  Assessment,
  Asset,
  BeforeAfter,
  Contact,
  Cost,
  Hero,
  Methodology,
  Pathways,
  Problem,
  Process,
  WhatWeDo,
} from "@/components/sections/Sections";
import { LeadDialog } from "@/components/ui/LeadDialog";

export function MarketingSite() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header onRequest={openDialog} />
      <main id="main-content">
        <Hero onRequest={openDialog} />
        <Problem />
        <Cost />
        <Asset />
        <WhatWeDo />
        <Methodology />
        <Pathways onRequest={openDialog} />
        <Process />
        <BeforeAfter />
        <About />
        <Assessment onRequest={openDialog} />
        <Contact onRequest={openDialog} />
      </main>
      <Footer />
      <LeadDialog open={dialogOpen} onClose={closeDialog} />
    </>
  );
}
