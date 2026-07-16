import Image from "next/image";
import { BlueprintExplorer } from "@/components/ui/BlueprintExplorer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MarketProblemCarousel } from "@/components/ui/MarketProblemCarousel";
import { HeroNetwork } from "@/components/graph/HeroNetwork";

export type RequestActions = {
  onAssessment: () => void;
  onStrategy: () => void;
};

const failurePoints = [
  ["01", "Vision", "No shared definition of what AI-enabled success should look like."],
  ["02", "Processes", "No disciplined focus on the high-frequency, high-impact work where AI can create leverage."],
  ["03", "Context", "AI lacks the knowledge, rules, history, terminology, and operating reality of the organization."],
  ["04", "Workflows", "Individual tasks are automated without redesigning how work should flow across people and systems."],
  ["05", "Agents", "Bots and copilots are deployed without defined roles, objectives, boundaries, or accountability."],
  ["06", "Adoption", "Employees are expected to change without sufficient leadership, enablement, reinforcement, or trust."],
  ["07", "Scale", "Early wins remain isolated because there is no operating model for expanding and improving them."],
] as const;

const services = [
  ["Executive AI Alignment", "Align leadership around business outcomes, priorities, decision rights, investment principles, and accountability."],
  ["AI Transformation Readiness Assessment", "Evaluate readiness across vision, processes, context, workflows, governance, adoption, and scale."],
  ["Process and Opportunity Discovery", "Prioritize high-frequency, high-impact work according to value, feasibility, risk, and readiness."],
  ["Business Context Architecture", "Define the knowledge, policies, systems, ownership, and access model required for reliable AI and decisions."],
  ["AI-Enabled Workflow Design", "Redesign workflows around outcomes by combining people, context, AI, automation, and existing systems."],
  ["Agent Strategy", "Determine where specialized agents create leverage, what they require, and how they should be governed."],
  ["Governance and Operating Model", "Establish ownership, standards, risk controls, decision rights, measurement, and coordination."],
  ["Adoption and Change Strategy", "Build the leadership, enablement, communication, reinforcement, and measurement required for behavioral change."],
  ["Transformation Roadmap", "Sequence early wins and long-term capabilities while guiding execution, partner coordination, measurement, and expansion."],
] as const;

const engagementStages = [
  ["01", "Assess", "Understand the current state, executive priorities, AI activity, process opportunities, context gaps, and adoption readiness.", "AI Transformation Readiness Assessment"],
  ["02", "Architect", "Define the future-state architecture across vision, processes, context, workflows, agents, governance, adoption, and scale.", "AI Transformation Blueprint™ and prioritized roadmap"],
  ["03", "Activate", "Guide selected initiatives into implementation with early measurable wins and the foundations required to sustain them.", "Activated use cases, redesigned workflows, governance, and adoption plan"],
  ["04", "Expand", "Measure results, improve the system, and scale successful capabilities across functions and business units.", "Enterprise transformation roadmap and continuous-improvement model"],
] as const;

export function Hero({ onAssessment }: Pick<RequestActions, "onAssessment">) {
  return (
    <section className="hero hero--transformation" aria-labelledby="hero-title">
      <HeroNetwork />
      <div className="hero__veil" />
      <div className="shell hero__inner">
        <div className="hero__copy">
          <Eyebrow>Organizational AI Transformation</Eyebrow>
          <h1 id="hero-title">AI isn&apos;t a software project. <em>It&apos;s a business transformation initiative.</em></h1>
          <div className="hero__body">
            <p>Most organizations are experimenting with AI without a shared vision, a clear operating model, or a practical path to scale.</p>
            <p>Context Intelligence helps leadership teams move from disconnected AI activity to coordinated business transformation—aligning vision, processes, organizational context, workflows, AI agents, adoption, and continuous improvement.</p>
          </div>
          <div className="actions">
            <Button onClick={onAssessment}>Assess Your AI Transformation Readiness</Button>
            <a className="button button--outline" href="#blueprint">Explore the AI Transformation Blueprint <span aria-hidden="true">→</span></a>
          </div>
          <p className="hero__advisory-note">Independent executive advisory—not a software platform.</p>
        </div>
      </div>
    </section>
  );
}

export function MarketProblem() {
  return (
    <section id="problem" className="section" aria-labelledby="problem-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>The Market Problem</Eyebrow>
          <h2 id="problem-title">Most companies are using AI. <em>Very few are transforming with it.</em></h2>
          <p>AI tools are entering organizations faster than the organizations themselves are changing. Teams launch copilots, automate isolated tasks, test agents, and experiment with new platforms—but the activity rarely adds up to a coordinated transformation.</p>
          <p>Without a shared business vision, prioritized processes, reliable organizational context, redesigned workflows, employee adoption, and a strategy for scale, AI becomes another layer of disconnected technology.</p>
        </div>
        <MarketProblemCarousel />
        <p className="pull-quote">The problem is not a lack of AI tools. <em>The problem is the absence of a transformation architecture.</em></p>
      </div>
    </section>
  );
}

export function FailurePoints() {
  return (
    <section className="section section--raised" aria-labelledby="stall-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>Why Initiatives Stall</Eyebrow>
          <h2 id="stall-title">AI initiatives rarely fail because the technology is incapable.</h2>
          <p>They stall because one or more of the business foundations are missing.</p>
        </div>
        <div className="failure-grid">
          {failurePoints.map(([number, title, text], index) => (
            <article key={title} className={`failure-card stage-index-${index + 1}`}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="section-close">The AI Transformation Blueprint™ addresses all seven.</p>
      </div>
    </section>
  );
}

export function Blueprint() {
  return (
    <section id="blueprint" className="section blueprint-section anchor-section" aria-labelledby="blueprint-title">
      <div className="shell">
        <div className="blueprint-intro">
          <div>
            <Eyebrow>The Flagship Advisory Offering</Eyebrow>
            <h2 id="blueprint-title">The AI Transformation Blueprint™</h2>
          </div>
          <div>
            <p>The AI Transformation Blueprint is a practical architecture for moving from AI potential to measurable, lasting business value.</p>
            <p>It gives leadership teams a structured path for deciding where they are going, which work should change, what context AI requires, how workflows should be redesigned, where agents belong, how adoption will be achieved, and how successful initiatives will scale.</p>
            <p className="blueprint-principle">Do not start with technology. <em>Start with the business you are trying to build.</em></p>
          </div>
        </div>
        <BlueprintExplorer />
      </div>
    </section>
  );
}

export function TransformationEquation() {
  return (
    <section className="section equation-section" aria-labelledby="equation-title">
      <div className="shell equation-grid">
        <div>
          <Eyebrow>A Strategic Operating Principle</Eyebrow>
          <h2 id="equation-title">The transformation equation</h2>
          <p>This is a practical way to test whether the foundations of an AI initiative are strong enough to produce business value—not a scientific formula.</p>
        </div>
        <div className="equation" aria-label="Vision plus Context multiplied by Adoption equals AI Success">
          <span>Vision</span><b>+</b><span>Context</span><b>×</b><span>Adoption</span><b>=</b><strong>AI Success</strong>
          <p>If vision, context, or adoption approaches zero, the expected value of the AI initiative approaches zero.</p>
        </div>
      </div>
    </section>
  );
}

export function ContextDifferentiator() {
  const steps = [
    ["01", "Map", "Identify the knowledge, decisions, relationships, processes, terminology, policies, systems, and operating experience AI needs to understand."],
    ["02", "Model", "Structure how that context connects across customers, roles, workflows, business rules, decisions, permissions, and desired outcomes."],
    ["03", "Mobilize", "Embed the right context into AI systems, agents, workflows, decision support, and everyday business operations."],
  ] as const;
  return (
    <section id="context-engine" className="section section--raised anchor-section" aria-labelledby="context-title">
      <div className="shell">
        <div className="context-heading">
          <div>
            <Eyebrow>Context as the Differentiator</Eyebrow>
            <h2 id="context-title">Without business context, AI guesses.</h2>
          </div>
          <div>
            <p>AI models may understand general knowledge, but they do not automatically understand how your organization operates—its customers, products, policies, decisions, terminology, workflows, priorities, exceptions, or institutional history.</p>
            <p>Context Intelligence helps leadership teams determine which knowledge matters, where it resides, how it should be organized, who should own it, and how it should support employees, workflows, and AI systems.</p>
          </div>
        </div>
        <div className="context-engine">
          <div className="context-engine__title">
            <p className="badge badge--blue">The Business Context Engine™</p>
            <h3>The architecture that makes relevant organizational knowledge accessible to employees, workflows, AI systems, and decision-makers.</h3>
          </div>
          <div className="context-method">
            {steps.map(([number, title, text]) => <article key={title}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <p className="context-engine__support">Business context creates value when it is mapped, modeled, and mobilized across the organization.</p>
        </div>
        <p className="thesis">AI is not the competitive advantage. <em>The business context behind it is.</em></p>
      </div>
    </section>
  );
}

export function Deliverables() {
  return (
    <section id="services" className="section section--light services-section anchor-section" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow dark>What Context Intelligence Delivers</Eyebrow>
          <h2 id="services-title">Transformation architecture before technology accumulation.</h2>
          <p>Context Intelligence helps executives determine what the organization should transform, how the components fit together, which initiatives should come first, and what capabilities are required to create lasting value.</p>
        </div>
        <div className="services-grid">
          {services.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <p className="services-note">Context Intelligence diagnoses, designs, prioritizes, architects, and guides transformation. Technology platforms execute specific technical capabilities.</p>
      </div>
    </section>
  );
}

export function Engagement() {
  return (
    <section id="engagement" className="section anchor-section" aria-labelledby="engagement-title">
      <div className="shell">
        <div className="section-heading section-heading--wide">
          <Eyebrow>The Engagement Model</Eyebrow>
          <h2 id="engagement-title">From AI confusion to a coordinated transformation plan.</h2>
        </div>
        <div className="engagement-grid">
          {engagementStages.map(([number, title, text, output], index) => (
            <article key={title}>
              <span className={index > 1 ? "is-blue" : ""}>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <small>Output: {output}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReadinessAssessment({ onAssessment }: Pick<RequestActions, "onAssessment">) {
  const dimensions = ["Vision and executive alignment", "Process readiness", "Organizational context", "Workflow and technology architecture", "Agent and automation strategy", "Adoption and governance", "Measurement and scale"];
  const levels = [
    ["Exploring", "AI activity exists, but priorities, ownership, and business outcomes remain unclear."],
    ["Coordinating", "The organization has selected priorities and early wins, but capabilities remain fragmented or difficult to scale."],
    ["Transforming", "AI strategy, business context, workflows, governance, adoption, and measurement operate as a coordinated system."],
  ] as const;
  return (
    <section id="assessment" className="section section--raised anchor-section" aria-labelledby="assessment-title">
      <div className="shell assessment-grid">
        <div>
          <Eyebrow>AI Transformation Readiness Assessment</Eyebrow>
          <h2 id="assessment-title">Is your organization ready to transform with AI—or merely experiment with it?</h2>
          <p>The assessment evaluates whether your organization has the strategic, operational, contextual, technical, and human foundations required to turn AI investment into business value.</p>
          <ol className="dimension-list">{dimensions.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
          <Button onClick={onAssessment}>Assess Your AI Transformation Readiness</Button>
        </div>
        <div className="readiness-scorecard" aria-label="AI transformation readiness maturity preview">
          <p className="list-label">Maturity preview</p>
          {levels.map(([title, text], index) => <article key={title} className={`readiness-level readiness-level--${index + 1}`}><div><span>Level {index + 1}</span><h3>{title}</h3></div><p>{text}</p></article>)}
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section anchor-section" aria-labelledby="about-title">
      <div className="shell about-grid">
        <Image className="headshot" src="/assets/troy-mott.png" alt="Troy Mott, Founder and Executive Advisor" width={180} height={180} unoptimized />
        <div>
          <Eyebrow>Built from Experience</Eyebrow>
          <h2 id="about-title">Built for leaders who need a practical path forward.</h2>
          <p>Troy Mott is an executive advisor and AI operations leader with more than two decades of experience across enterprise technology, sales leadership, organizational transformation, and AI-enabled workflow design.</p>
          <p>He founded Context Intelligence around a recurring executive challenge: organizations are rapidly adopting AI tools, but few have a complete architecture for turning those tools into coordinated, measurable, lasting transformation.</p>
          <p>Context Intelligence helps leadership teams connect business strategy, operating processes, organizational knowledge, AI-enabled workflows, adoption, and scale.</p>
          <p className="founder-label">Troy Mott — Founder and Executive Advisor, Context Intelligence</p>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onAssessment, onStrategy }: RequestActions) {
  return (
    <section id="contact" className="section contact anchor-section" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Eyebrow centered>Begin</Eyebrow>
        <h2 id="contact-title">Stop chasing AI tools. <em>Start building the transformation.</em></h2>
        <p>An executive strategy session will help identify where your organization currently stands, which foundations are missing, and where a disciplined AI transformation could create the greatest near-term business value.</p>
        <div className="actions actions--center">
          <Button onClick={onStrategy}>Schedule an Executive Strategy Session</Button>
          <Button variant="outline" onClick={onAssessment}>Assess Your AI Transformation Readiness</Button>
        </div>
      </div>
    </section>
  );
}
