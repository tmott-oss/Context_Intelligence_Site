import Image from "next/image";
import { HeroNetwork } from "@/components/graph/HeroNetwork";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MarketProblemCarousel } from "@/components/ui/MarketProblemCarousel";

export type RequestActions = {
  onAssessment: () => void;
  onStrategy: () => void;
};

const methodology = [
  {
    number: "1",
    name: "Map",
    statement: "Understand the business.",
    body: "Map priorities, workflows, decisions, systems, data, knowledge, constraints, risks, and readiness. Identify where AI can create the greatest measurable value.",
    points: [
      "Strategic priorities",
      "Workflow opportunities",
      "Decisions and bottlenecks",
      "Systems and data",
      "Knowledge and context",
      "Readiness and risk",
    ],
  },
  {
    number: "2",
    name: "Model",
    statement: "Design how AI should operate.",
    body: "Model the context, rules, permissions, approvals, escalation points, governance, success metrics, and economics required for each selected workflow.",
    points: [
      "Target workflow",
      "Required context",
      "Agent actions",
      "Human approvals",
      "Governance and escalation",
      "Business metrics and economics",
    ],
  },
  {
    number: "3",
    name: "Mobilize",
    statement: "Activate and scale what works.",
    body: "Prioritize a portfolio of initiatives and agents, launch stackable early wins, prepare employees and leaders, measure impact, and expand what works.",
    points: [
      "Prioritized initiatives",
      "Stackable early wins",
      "Agent deployment",
      "Adoption and enablement",
      "Performance measurement",
      "Expansion and improvement",
    ],
  },
] as const;

const agentPath = [
  "Business priority identified",
  "Workflow mapped",
  "Value and feasibility tested",
  "Context and systems modeled",
  "Agent actions and boundaries defined",
  "Human approvals and escalations established",
  "Deployment measured against a business outcome",
  "Successful capabilities expanded",
] as const;

const autonomyLevels = [
  ["Observe", "See the work and surface relevant context."],
  ["Recommend", "Suggest a next action for a person to evaluate."],
  ["Prepare", "Draft the work while a person remains responsible."],
  ["Act with approval", "Execute only after an explicit human decision."],
  ["Act within boundaries", "Operate autonomously inside defined permissions and controls."],
] as const;

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

export function Hero({ onStrategy }: Pick<RequestActions, "onStrategy">) {
  return (
    <section className="clarity-hero" aria-labelledby="hero-title">
      <div className="clarity-hero__visual" aria-hidden="true">
        <HeroNetwork />
        <span className="graph-note graph-note--strategy"><b>Strategy</b>Align investments with business priorities.</span>
        <span className="graph-note graph-note--people"><b>People</b>Equip teams with insight and clarity.</span>
        <span className="graph-note graph-note--process"><b>Processes</b>Reveal how work is done and where value is created.</span>
        <span className="graph-note graph-note--data"><b>Data</b>Make data usable and contextual.</span>
        <span className="graph-note graph-note--technology"><b>Technology</b>Adopt and integrate with purpose.</span>
        <span className="graph-note graph-note--outcomes"><b>Outcomes</b>Measure impact that matters.</span>
      </div>
      <div className="shell clarity-hero__inner">
        <div className="clarity-hero__copy">
          <Eyebrow>Organizational AI Transformation</Eyebrow>
          <h1 id="hero-title">AI transformation doesn&apos;t start with technology. It starts with understanding the business.</h1>
          <p>Context Intelligence helps leadership teams identify where AI can create meaningful value, design the context and controls it needs, and mobilize a governed portfolio of workflows and agents.</p>
          <div className="actions">
            <Button onClick={onStrategy}>Schedule an Executive Strategy Session</Button>
            <a className="button button--outline" href="#methodology">Explore the Methodology</a>
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
          <h2 id="pov-title">Technology should follow strategy—not the other way around.</h2>
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
          <h2 id="method-title">From AI ambition to governed execution.</h2>
          <p>Map. Model. Mobilize.™ creates a connected path from understanding the business to activating and scaling what works.</p>
        </div>
        <div className="method-grid">
          {methodology.map((stage) => (
            <article key={stage.name}>
              <span className="method-grid__number">{stage.number}</span>
              <p className="method-grid__name">{stage.name}</p>
              <h3>{stage.statement}</h3>
              <p>{stage.body}</p>
              <ul>{stage.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>
          ))}
        </div>
        <p className="method-loop"><span>Learning loop</span> Real-world learning improves future mapping and modeling.</p>
        <div id="deliverables" className="method-output anchor-section">
          <p className="comparison__label">The defining output</p>
          <p>The first three workflows worth agentizing—what each needs, what the agent may do, where people remain in control, and how value will be measured.</p>
        </div>
      </div>
    </section>
  );
}

export function AgentActivation() {
  return (
    <section className="clarity-section clarity-agent" aria-labelledby="agent-title">
      <HeroNetwork dark />
      <div className="shell clarity-agent__inner">
        <div className="clarity-heading clarity-heading--split clarity-heading--dark">
          <div>
            <Eyebrow>From Strategy to Active Agents</Eyebrow>
            <h2 id="agent-title">Agents should earn the right to act.</h2>
          </div>
          <p>Agent activation should be the result of disciplined operating design—not the starting point. Authority expands only as context, controls, and performance evidence become stronger.</p>
        </div>
        <ol className="agent-path">
          {agentPath.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
        </ol>
        <div className="autonomy">
          <p className="autonomy__label">A controlled progression of authority</p>
          <div>
            {autonomyLevels.map(([name, description], index) => (
              <article key={name}>
                <span>{index + 1}</span>
                <h3>{name}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Engagement() {
  return (
    <section className="clarity-section clarity-engagement" aria-labelledby="engagement-title">
      <div className="shell">
        <div className="clarity-heading clarity-heading--split">
          <div>
            <Eyebrow>Engagement Process</Eyebrow>
            <h2 id="engagement-title">A disciplined transformation process—not another AI project plan.</h2>
          </div>
          <p>The engagement model is built around the same three stages used to design the transformation, so strategy and execution stay connected.</p>
        </div>
        <div className="engagement-rows">
          <article><span>01</span><h3>Map</h3><p>Executive alignment, discovery, workflow analysis, opportunity prioritization, and readiness assessment.</p></article>
          <article><span>02</span><h3>Model</h3><p>Workflow redesign, context architecture, agent operating model, governance, controls, and measurement design.</p></article>
          <article><span>03</span><h3>Mobilize</h3><p>90-day roadmap, stackable deployments, adoption, performance measurement, and expansion.</p></article>
        </div>
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
          <h2 id="audience-title">Built for leaders who know AI matters—but refuse to chase it blindly.</h2>
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
          <p>Context Intelligence was created to help leaders move beyond disconnected tools and experiments—to build the strategy, context, operating model, and organizational capability required to turn AI into measurable business performance.</p>
          <p className="about-note">An independent executive guide who translates between business priorities, workflows, technology, governance, and adoption.</p>
        </div>
      </div>
    </section>
  );
}

export function Contact({ onAssessment, onStrategy }: RequestActions) {
  return (
    <section id="contact" className="clarity-section clarity-contact anchor-section" aria-labelledby="contact-title">
      <div className="shell clarity-contact__inner">
        <Eyebrow centered>Begin With the Business</Eyebrow>
        <h2 id="contact-title">Before choosing another AI tool, decide what should change.</h2>
        <p>An Executive Strategy Session will help clarify your highest-value opportunities, expose the gaps holding AI back, and determine whether a broader transformation engagement makes sense.</p>
        <div className="actions actions--center">
          <Button onClick={onStrategy}>Schedule an Executive Strategy Session</Button>
          <Button variant="outline" onClick={onAssessment}>Take the 5-Minute AI Transformation Assessment</Button>
        </div>
      </div>
    </section>
  );
}
