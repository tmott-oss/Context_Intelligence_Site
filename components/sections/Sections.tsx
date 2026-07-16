import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroNetwork } from "@/components/graph/HeroNetwork";

type RequestProps = { onRequest: () => void };

const symptoms = [
  ["01", "Decisions slow down", "Leadership teams and departments operate from different information, interpret priorities differently, and repeatedly revisit issues that should already be resolved."],
  ["02", "Knowledge disappears", "Critical experience remains trapped in employees, documents, inboxes, meetings, and systems that were never designed to work together."],
  ["03", "AI underperforms", "Organizations invest in AI tools but get generic results because the technology does not understand the company's operating history, customers, decisions, workflows, or institutional knowledge."],
] as const;

const advisory = [
  ["01", "Diagnose intelligence gaps", "Identify where institutional knowledge, operating context, customer insight, decisions, and experience are being lost, duplicated, delayed, or isolated."],
  ["02", "Design the future-state architecture", "Define how people, processes, systems, knowledge, AI, and decision-making should work together."],
  ["03", "Prioritize transformation opportunities", "Determine where AI, automation, workflow redesign, or better information access can create the greatest business impact."],
  ["04", "Guide execution and adoption", "Help leadership teams establish the roadmap, governance, accountability, implementation sequence, and adoption model required for lasting results."],
] as const;

const methodology = [
  ["01", "Capture", "Identify the knowledge, experience, decisions, and operating context the organization cannot afford to lose. Design the processes, responsibilities, and systems needed to preserve it."],
  ["02", "Connect", "Determine how fragmented knowledge should be organized and connected to the customers, workflows, priorities, roles, and decisions it supports."],
  ["03", "Activate", "Design how organizational intelligence should be used through improved workflows, decision support, AI, automation, and leadership systems."],
  ["04", "Learn", "Establish the feedback loops, measurement systems, ownership, and governance needed to improve the organization continuously."],
] as const;

const process = [
  ["01", "Discover", "Align on strategic priorities, business outcomes, operating constraints, and the decisions that matter most.", "Executive priorities & objectives"],
  ["02", "Diagnose", "Map where critical knowledge is created, lost, duplicated, delayed, inaccessible, or dependent on specific people.", "Organizational Intelligence Assessment"],
  ["03", "Design", "Create the future-state architecture connecting knowledge, workflows, roles, governance, technology, and decision-making.", "Architecture & transformation roadmap"],
  ["04", "Activate", "Guide implementation of selected use cases, redesigned workflows, governance practices, and operating changes.", "Implemented capabilities & early wins"],
  ["05", "Evolve", "Measure results, capture learning, strengthen adoption, and expand successful capabilities.", "Continuous improvement system"],
] as const;

export function Hero({ onRequest }: RequestProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroNetwork />
      <div className="hero__veil" />
      <div className="shell hero__inner">
        <div className="hero__copy">
          <Eyebrow>A New Management Discipline</Eyebrow>
          <h1 id="hero-title">Your organization is losing <em>the intelligence it already paid to create.</em></h1>
          <div className="hero__body">
            <p>Every decision, project, customer interaction, workflow, and employee experience creates valuable business knowledge. Much of it stays trapped in people, inboxes, documents, meetings, and disconnected systems.</p>
            <p>Context Intelligence helps leadership teams find where that intelligence is being lost and design the strategy, systems, and operating practices needed to make it usable — faster decisions, more consistent execution, stronger AI outcomes, and an organization less dependent on any one person.</p>
          </div>
          <div className="actions">
            <Button onClick={onRequest}>Take the 5-Minute Intelligence Assessment</Button>
            <a className="button button--outline" href="#methodology">Explore the methodology <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Problem() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="shell">
        <div className="section-heading">
          <Eyebrow>The Symptoms</Eyebrow>
          <h2 id="problem-title">You have probably seen the symptoms already.</h2>
          <p>The problem rarely appears as a single technology failure. It shows up as slower decisions, repeated work, inconsistent execution, lost institutional knowledge, and AI initiatives that never reach their potential.</p>
        </div>
        <div className="segmented segmented--three">
          {symptoms.map(([number, title, text], index) => <InfoCell key={title} number={number} title={title} text={text} blue={index === 2} />)}
        </div>
        <p className="pull-quote">The result is duplicated work, avoidable risk, missed opportunities, inconsistent execution, and enterprise value that depends too heavily on individual people.</p>
      </div>
    </section>
  );
}

export function Cost() {
  const costs = ["Slower execution", "Repeated mistakes", "Inconsistent decisions", "Lower AI returns", "Missed customer opportunities", "Greater dependence on key employees", "Increased transformation risk", "Reduced organizational and enterprise value"];
  return (
    <section className="section section--raised" aria-labelledby="cost-title">
      <div className="shell split">
        <div>
          <Eyebrow>The Business Cost</Eyebrow>
          <h2 id="cost-title">Lost intelligence becomes an operating cost.</h2>
          <p>When organizational knowledge is fragmented, employees spend more time searching, recreating, confirming, and escalating. Leaders decide with incomplete information. Teams repeat mistakes. Customer insight never reaches the people who could act on it. AI tools produce answers without understanding how the organization actually works.</p>
          <p>{"The cost is not limited to inefficiency. Fragmented intelligence slows growth, increases key-person risk, weakens technology returns, creates inconsistent decisions, and limits the organization's ability to scale."}</p>
        </div>
        <div>
          <p className="list-label">What it costs</p>
          <div className="stack-list">{costs.map((cost, index) => <div className={index === costs.length - 1 ? "is-gold" : ""} key={cost}>{cost}</div>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Asset() {
  return (
    <section id="asset" className="section anchor-section" aria-labelledby="asset-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>Organizational Intelligence</Eyebrow>
          <h2 id="asset-title">These are not isolated problems. They are symptoms of unmanaged Organizational Intelligence.</h2>
        </div>
        <div className="split">
          <div>
            <p>{"Organizational Intelligence is the usable knowledge created through an organization's people, decisions, customer relationships, operating experience, workflows, and systems."}</p>
            <p>Most companies generate enormous amounts of it. Very few manage it intentionally. Context Intelligence helps leadership teams understand where this intelligence exists, where it is being lost, which business outcomes depend on it, and how the organization should be redesigned to make that knowledge accessible and useful.</p>
          </div>
          <div>
            <ol className="asset-list">{["People", "Capital", "Technology", "Data", "Organizational Intelligence"].map((item, index) => <li key={item} className={index === 4 ? "is-gold" : ""}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
            <p className="caption">Four assets receive deliberate investment and oversight. The fifth rarely does — yet it influences nearly every outcome that matters.</p>
          </div>
        </div>
        <p className="thesis">AI is not the competitive advantage. <em>The organizational context behind it is.</em></p>
      </div>
    </section>
  );
}

export function WhatWeDo() {
  return (
    <section className="section section--raised" aria-labelledby="advisory-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>The Advisory Role</Eyebrow>
          <h2 id="advisory-title">{"We help leadership teams make their organization's intelligence usable."}</h2>
          <p>Context Intelligence works with executives to identify where important knowledge is created, where it becomes fragmented, which decisions and workflows depend on it, and where the organization is overly dependent on specific individuals. We then design the strategy, architecture, operating model, workflows, governance, technology requirements, and adoption plan needed to turn that intelligence into a durable business capability.</p>
        </div>
        <div className="segmented segmented--four">{advisory.map(([number, title, text], index) => <InfoCell key={title} number={number} title={title} text={text} blue={index > 1} compact />)}</div>
        <p className="caption advisory-note">Context Intelligence is an advisory and transformation firm. Technology platforms may support the work, but they are never presented as proprietary Context Intelligence capabilities.</p>
      </div>
    </section>
  );
}

export function Methodology() {
  return (
    <section id="methodology" className="section anchor-section" aria-labelledby="method-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>The Methodology</Eyebrow>
          <h2 id="method-title">A practical system for turning organizational knowledge into advantage.</h2>
          <p>Capture. Connect. Activate. Learn. An advisory methodology — not a software workflow.</p>
        </div>
        <div className="segmented segmented--four">{methodology.map(([number, title, text], index) => <InfoCell key={title} number={number} title={title} text={text} blue={index > 1} compact />)}</div>
      </div>
    </section>
  );
}

export function Pathways({ onRequest }: RequestProps) {
  const aiItems = ["Executive alignment", "Organizational Intelligence Assessment", "AI readiness evaluation", "Use-case prioritization", "Workflow and knowledge architecture", "Governance and risk model", "Transformation roadmap", "Adoption strategy", "Measurement framework"];
  const biItems = ["Key-person dependency analysis", "Institutional knowledge assessment", "Decision-rights clarification", "Succession and transferability roadmap"];
  return (
    <section id="pathways" className="section section--raised anchor-section" aria-labelledby="pathways-title">
      <div className="shell">
        <div className="section-heading">
          <Eyebrow>Strategic Pathways</Eyebrow>
          <h2 id="pathways-title">Two pathways. One intelligence foundation.</h2>
          <p>Organizations face different transformation challenges, but both require the same foundation: important knowledge must become accessible, connected, and usable beyond the individuals who currently hold it.</p>
        </div>
        <div className="pathways-grid">
          <article id="pathway-ai" className="pathway pathway--gold anchor-section">
            <p className="pathway__type">Primary pathway</p>
            <span className="badge badge--gold">AI Transformation Blueprint</span>
            <h3>From disconnected AI experiments to a business-led strategy</h3>
            <p>For leadership teams that need to move from disconnected AI experiments to a focused, business-led transformation strategy. The blueprint aligns business priorities, organizational knowledge, workflows, governance, technology, adoption, and measurement around meaningful outcomes.</p>
            <p className="list-label">Includes</p>
            <ul className="check-grid">{aiItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <Button onClick={onRequest}>Explore the AI Transformation Blueprint</Button>
          </article>
          <article id="pathway-bi" className="pathway pathway--blue anchor-section">
            <p className="pathway__type">Specialized pathway</p>
            <span className="badge badge--blue">Business Independence Blueprint</span>
            <h3>For owner-dependent organizations</h3>
            <p>For founder-led and owner-dependent organizations seeking greater scalability, resilience, transferability, or enterprise value. The blueprint identifies where the business depends too heavily on individual people and designs the systems, documentation, and knowledge architecture needed to reduce that dependency.</p>
            <p className="list-label">Includes</p>
            <ul className="check-list">{biItems.map((item) => <li key={item}>{item}</li>)}</ul>
            <Button variant="blue" onClick={onRequest}>Explore the Business Independence Blueprint</Button>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section anchor-section" aria-labelledby="process-title">
      <div className="shell">
        <div className="section-heading"><Eyebrow>The Engagement</Eyebrow><h2 id="process-title">From fragmented knowledge to an operating capability.</h2></div>
        <div className="process-grid">{process.map(([number, title, text, output], index) => <article key={title}><span className={index > 2 ? "is-blue" : ""}>{number}</span><h3>{title}</h3><p>{text}</p><small>Output: {output}</small></article>)}</div>
      </div>
    </section>
  );
}

export function BeforeAfter() {
  const cards = [
    ["Executive decisions", "Leadership teams repeatedly revisit the same issues because earlier decisions, assumptions, evidence, and outcomes are difficult to find.", "The organization has clear practices for preserving decision context, improving continuity, and reducing repeated debate."],
    ["Institutional knowledge", "Important knowledge exists primarily in the minds of experienced employees, founders, and executives.", "Critical experience is identified, documented, structured, and embedded into workflows and decision frameworks."],
    ["AI transformation", "Teams launch disconnected AI experiments without a shared strategy, reliable context, governance, or measurement.", "AI initiatives are prioritized around business outcomes and supported by the knowledge, governance, and adoption systems required to create value."],
  ];
  return (
    <section className="section section--light" aria-labelledby="practice-title">
      <div className="shell">
        <div className="section-heading"><Eyebrow dark>In Practice</Eyebrow><h2 id="practice-title">What changes when intelligence becomes usable.</h2></div>
        <div className="before-after">{cards.map(([title, before, after]) => <article key={title}><h3>{title}</h3><div><span className="before">Before</span><p>{before}</p></div><div><span className="after">After</span><p>{after}</p></div></article>)}</div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section section--raised anchor-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <Image className="headshot" src="/assets/troy-mott.png" alt="Troy Mott, Founder and Executive Advisor" width={180} height={180} unoptimized />
        <div>
          <Eyebrow>Built from Experience</Eyebrow>
          <h2 id="about-title">Built from the realities of enterprise transformation.</h2>
          <p>Troy Mott is an executive advisor and AI operations leader with more than two decades of experience in enterprise technology, sales leadership, organizational transformation, and AI-enabled workflow design.</p>
          <p>His work focuses on a recurring executive challenge: organizations invest heavily in people, systems, customer relationships, and technology, yet much of the intelligence created through those investments remains fragmented and underused.</p>
          <p>Context Intelligence was established to help leadership teams identify where that intelligence is being lost and design the strategy, architecture, operating model, and transformation roadmap needed to turn it into lasting organizational capability.</p>
          <p className="founder-label">Troy Mott — Founder & Executive Advisor, Context Intelligence</p>
        </div>
      </div>
    </section>
  );
}

export function Assessment({ onRequest }: RequestProps) {
  const areas = ["Knowledge capture", "Information accessibility", "Decision consistency", "AI readiness", "Key-person dependency"];
  const levels = [
    ["Fragmented", "Level 1", "Important intelligence exists, but remains isolated across people, departments, documents, workflows, and systems."],
    ["Connected", "Level 2", "Some knowledge and workflows are linked, but access, ownership, consistency, and adoption remain uneven."],
    ["Activated", "Level 3", "Organizational intelligence is intentionally managed and used to improve decisions, execution, workflows, and AI initiatives."],
  ];
  return (
    <section id="assessment" className="section anchor-section" aria-labelledby="assessment-title">
      <div className="shell split">
        <div>
          <Eyebrow>The Assessment</Eyebrow>
          <h2 id="assessment-title">How much organizational intelligence is your company losing?</h2>
          <p>The five-minute Organizational Intelligence Assessment helps leadership teams identify where critical knowledge, operating context, decision history, and institutional experience are becoming fragmented, inaccessible, or overly dependent on individual people.</p>
          <ul className="check-list check-list--gold">{areas.map((area) => <li key={area}>{area}</li>)}</ul>
          <Button onClick={onRequest}>Take the 5-Minute Assessment</Button>
        </div>
        <div>
          <p className="list-label">Maturity scorecard</p>
          <div className="maturity">{levels.map(([title, level, text], index) => <article key={title} className={`level-${index + 1}`}><div><h3>{title}</h3><span>{level}</span></div><p>{text}</p></article>)}</div>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onRequest }: RequestProps) {
  return (
    <section id="contact" className="section contact anchor-section" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Eyebrow centered>Begin</Eyebrow>
        <h2 id="contact-title">Find where your organization is losing intelligence before investing in more technology.</h2>
        <p>In an executive strategy session, we will identify where critical knowledge and operating context are becoming trapped, which business outcomes are being affected, and where organizational, workflow, AI, or automation changes could create the greatest near-term advantage.</p>
        <div className="actions actions--center"><Button onClick={onRequest}>Schedule an Executive Strategy Session</Button><a className="button button--outline" href="#assessment">Take the 5-Minute Assessment</a></div>
      </div>
    </section>
  );
}

function InfoCell({ number, title, text, blue = false, compact = false }: { number: string; title: string; text: string; blue?: boolean; compact?: boolean }) {
  return <article className={compact ? "info-cell info-cell--compact" : "info-cell"}><span className={blue ? "is-blue" : ""}>{number}</span><h3>{title}</h3><p>{text}</p></article>;
}
