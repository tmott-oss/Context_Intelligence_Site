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
        <span>Transformation Architecture Lab · Production visual system</span>
      </header>
      <section className="graph-lab__stage" aria-labelledby="graph-lab-title">
        <Suspense fallback={<GraphFallback message="Preparing the AI transformation architecture." />}>
          <KnowledgeGraph />
        </Suspense>
        <div className="graph-lab__copy">
          <p className="eyebrow">AI Transformation Architecture Lab</p>
          <h1 id="graph-lab-title">Seven business systems. <em>One coordinated transformation.</em></h1>
          <p>Vision, processes, context, workflows, agents, adoption, and scale begin as separate activity. The architecture aligns them into a connected operating system for measurable business value.</p>
        </div>
        <div className="graph-lab__roadmap" aria-label="AI Transformation Blueprint stages">
          {['Vision', 'Processes', 'Context', 'Workflows', 'Agents', 'Adoption', 'Scale'].map((stage, index) => <span key={stage}><i>{String(index + 1).padStart(2, '0')}</i>{stage}</span>)}
        </div>
      </section>
    </main>
  );
}
