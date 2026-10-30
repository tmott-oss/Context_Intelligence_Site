import Image from "next/image";
import Link from "next/link";
import { HeroNetwork } from "@/components/graph/HeroNetwork";
import { BlueprintExplorer } from "@/components/ui/BlueprintExplorer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MarketProblemCarousel } from "@/components/ui/MarketProblemCarousel";

export type RequestActions = {
  onAssessment: () => void;
  onStrategy: () => void;
};

const audiences = [
  "Leadership teams that need a practical AI strategy",
  "Organizations with many experiments but little measurable value",
  "Companies considering agents but lacking governance and context",
  "Mature businesses seeking greater scale and less dependency on individuals",
  "Leaders preparing their organization for growth, succession, or acquisition",
] as const;

const perspectives = [
  ["AI Strategy", "Why Most AI Initiatives Underperform", "Technology moves faster than operating models. The missing work is deciding what should change, who owns it, and how value will be measured."],
  ["Business Context", "The Context Gap in Enterprise AI", "General intelligence is not organizational judgment. Reliable AI needs the rules, history, terminology, systems, and constraints of the business."],
  ["Agent Governance", "What an Agent Operating Model Must Define", "Before an agent acts, leaders need clarity on permissions, approvals, escalation, accountability, risk, and performance."],
  ["Workflow Design", "From AI Experiments to Measurable Workflows", "The unit of transformation is not a tool or task. It is a redesigned workflow tied to a business outcome."],
  ["Technology Decisions", "Why Technology Must Follow Workflow Design", "The right stack becomes clearer after the outcome, workflow, context, controls, and integration requirements are understood."],
  ["Business Independence", "Preparing Founder-Led Businesses for AI and Scale", "Reducing key-person dependency creates a stronger foundation for AI, succession, acquisition, and durable enterprise value."],
] as const;

export function Hero() {
  return (
    <section className="clarity-hero" aria-labelledby="hero-title">
      <div className="clarity-hero__visual" aria-hidden="true">
        <HeroNetwork />
      </div>
      <div className="shell clarity-hero__inner">
        <div className="clarity-hero__copy">
          <Eyebrow>Enterprise</Eyebrow>
          <h1 id="hero-title">Scale makes inefficiency expensive.</h1>
          <p>Context Intelligence does AI transformation and AI operations work for organizations where that cost already shows up in revenue, margins, customers, and execution.</p>
          <p>The AI Transformation Blueprint™ is the offer: a consultative assessment, then the operating model for vision, processes, context, workflows, agents, adoption, and scale.</p>
          <div className="actions">
            <a className="button button--blue" href="#why-it-matters">See where it shows up</a>
            <a className="button button--outline" href="#methodology">See the blueprint</a>
          </div>
          <p className="clarity-hero__proof">Strategy first. Context built in. Business value measured.</p>
        </div>
      </div>
    </section>
  );
}

export function MarketProblem() {
  return (
    <section id="why-it-matters" className="clarity-section clarity-problem anchor-section" aria-labelledby="problem-title">
      <div className="shell">
        <div className="clarity-heading clarity-heading--split">
          <div>
            <Eyebrow>Why AI Efforts Stall</Eyebrow>
            <h2 id="problem-title">More AI activity does not automatically create transformation.</h2>
          </div>
          <p>When tools, experiments, and agents move ahead without a shared transformation model, activity multiplies while business value remains difficult to see.</p>
        </div>
        <MarketProblemCarousel />
        <p className="clarity-conclusion">These are not separate technology problems. They are symptoms of an organization attempting AI without a transformation model.</p>
      </div>
    </section>
  );
}

export function PointOfView() {
  const typical = [
    "Select tools before defining outcomes",
    "Automate tasks without redesigning work",
    "Treat context, controls, and adoption as follow-up work",
    "Measure activity instead of business performance",
  ];
  const context = [
    "Define the business outcome",
    "Redesign the workflow around value",
    "Model context, controls, approvals, and measures",
    "Select technology that fits the operating design",
  ];
  return (
    <section className="clarity-section clarity-pov" aria-labelledby="pov-title">
      <div className="shell">
        <div className="clarity-heading clarity-heading--center">
          <Eyebrow centered>The Context Intelligence Point of View</Eyebrow>
          <h2 id="pov-title">Technology should follow strategy, not the other way around.</h2>
        </div>
        <div className="comparison">
          <article>
            <p className="comparison__label">Typical approach</p>
            <h3>Tech first. Hope value follows.</h3>
            <ul>{typical.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
          <span className="comparison__arrow" aria-hidden="true">Instead</span>
          <article className="comparison__preferred">
            <p className="comparison__label">Context Intelligence approach</p>
            <h3>Strategy first. Value follows.</h3>
            <ul>{context.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
        <p className="clarity-conclusion clarity-conclusion--center">The objective is not to implement more AI. It is to build an organization capable of using AI to improve how work gets done.</p>
      </div>
    </section>
  );
}

export function Methodology() {
  return (
    <section id="methodology" className="clarity-section clarity-method anchor-section" aria-labelledby="method-title">
      <HeroNetwork />
      <div className="shell clarity-method__inner">
        <div className="clarity-heading clarity-heading--center">
          <Eyebrow centered>The AI Transformation Blueprint™</Eyebrow>
          <h2 id="method-title">Seven business systems. One coordinated transformation.</h2>
          <p>A proven architecture for turning AI potential into measurable, lasting business value. Map the business, model the operating design, and mobilize what works.</p>
        </div>
        <BlueprintExplorer />
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section className="clarity-section clarity-audience" aria-labelledby="audience-title">
      <div className="shell audience-layout">
        <div className="clarity-heading">
          <Eyebrow>Who This Is For</Eyebrow>
          <h2 id="audience-title">Built for leaders who need AI to change the business, not just the task list.</h2>
        </div>
        <ul>{audiences.map((audience, index) => <li key={audience}><span>{String(index + 1).padStart(2, "0")}</span>{audience}</li>)}</ul>
      </div>
    </section>
  );
}

export function Perspectives() {
  return (
    <section id="perspectives" className="clarity-section clarity-perspectives anchor-section" aria-labelledby="perspectives-title">
      <div className="shell">
        <div className="clarity-heading clarity-heading--split">
          <div>
            <Eyebrow>Executive Perspectives</Eyebrow>
            <h2 id="perspectives-title">Practical thinking for leaders shaping AI transformation.</h2>
          </div>
          <p>Short perspectives on the decisions that determine whether AI becomes disconnected activity or measurable operating advantage.</p>
        </div>
        <div className="perspective-grid">
          {perspectives.map(([category, title, summary]) => (
            <details key={title}>
              <summary>
                <span>{category}</span>
                <h3>{title}</h3>
                <b>Read perspective <i aria-hidden="true">Expand</i></b>
              </summary>
              <p>{summary}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="clarity-section clarity-about anchor-section" aria-labelledby="about-title">
      <div className="shell about-layout">
        <div className="about-portrait">
          <Image
            src="/assets/troy-mott.png"
            alt="Troy Mott, Founder and Executive Advisor"
            width={440}
            height={440}
            sizes="(max-width: 820px) 72vw, 360px"
            priority
            unoptimized
          />
          <p>Troy Mott<br /><span>Founder &amp; Executive Advisor</span></p>
        </div>
        <div>
          <Eyebrow>About Context Intelligence</Eyebrow>
          <h2 id="about-title">Built from a simple observation: AI fails when it is disconnected from how the business actually works.</h2>
          <p>For more than two decades, Troy has helped organizations improve sales performance, operational execution, technology adoption, and business transformation.</p>
          <p>Context Intelligence was created to help leaders move past disconnected tools and experiments. The work is the strategy, context, operating model, and organizational capability required to turn AI into business performance.</p>
          <p className="about-note">An independent executive guide who translates between business priorities, workflows, technology, governance, and adoption.</p>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onStrategy }: RequestActions) {
  return (
    <section id="contact" className="clarity-section clarity-contact anchor-section" aria-labelledby="contact-title">
      <div className="shell clarity-contact__inner">
        <Eyebrow centered>Begin with the business</Eyebrow>
        <h2 id="contact-title">See where AI can change the business, then decide what to do first.</h2>
        <p>The five-minute assessment shows where the operating foundation is ready and where it is not. An executive strategy session then names the outcomes worth pursuing and whether a broader engagement makes sense.</p>
        <div className="actions actions--center">
          <Link className="button button--blue" href="/assessment">Take the 5-Minute AI Transformation Assessment</Link>
          <Button variant="outline" onClick={onStrategy}>Request an Executive Strategy Session</Button>
        </div>
      </div>
    </section>
  );
}
