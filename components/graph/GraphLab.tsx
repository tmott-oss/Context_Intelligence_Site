"use client";

import { lazy, Suspense } from "react";
import Link from "next/link";
import { GraphFallback } from "./GraphFallback";

const KnowledgeGraph = lazy(() => import("./KnowledgeGraph").then((module) => ({ default: module.KnowledgeGraph })));

export default function GraphLab() {
  return (
    <main className="graph-lab">
      <header className="graph-lab__header">
        <Link href="/" className="graph-lab__back">← Context Intelligence</Link>
        <span>Experimental route · Not in production hero</span>
      </header>
      <section className="graph-lab__stage" aria-labelledby="graph-lab-title">
        <Suspense fallback={<GraphFallback message="Preparing the Organizational Intelligence graph." />}>
          <KnowledgeGraph />
        </Suspense>
        <div className="graph-lab__copy">
          <p className="eyebrow">Organizational Intelligence Graph Lab</p>
          <h1 id="graph-lab-title">Context becomes intelligence when the organization can connect and use it.</h1>
          <p>People, conversations, decisions, processes, systems, documents, and outcomes begin as fragmented clusters. Blue connections form. Gold nodes mark intelligence activated into enterprise value.</p>
        </div>
        <div className="graph-lab__legend" aria-label="Graph color legend">
          <span><i className="legend-dim" /> Trapped</span>
          <span><i className="legend-ivory" /> Available</span>
          <span><i className="legend-blue" /> Connected</span>
          <span><i className="legend-gold" /> Activated</span>
        </div>
      </section>
    </main>
  );
}
