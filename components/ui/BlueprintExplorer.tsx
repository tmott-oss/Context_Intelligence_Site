"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  ChartLineUp,
  Database,
  FlowArrow,
  MagnifyingGlass,
  Robot,
  Target,
  Trophy,
  UsersThree,
} from "@phosphor-icons/react";
import { blueprintStages } from "@/components/content/blueprint";

const phases = [
  { name: "Map", description: "Understand the business", className: "phase-map" },
  { name: "Model", description: "Design how AI should operate", className: "phase-model" },
  { name: "Mobilize", description: "Activate and scale what works", className: "phase-mobilize" },
] as const;

const stagePhases = ["Map", "Map", "Model", "Model", "Model", "Mobilize", "Mobilize"] as const;
const stageIcons = [Target, MagnifyingGlass, Database, FlowArrow, Robot, UsersThree, ChartLineUp] as const;

export function BlueprintExplorer() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activateStage = (index: number) => {
    const next = (index + blueprintStages.length) % blueprintStages.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      activateStage(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      activateStage(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      activateStage(0);
    } else if (event.key === "End") {
      event.preventDefault();
      activateStage(blueprintStages.length - 1);
    }
  };

  const activeStage = blueprintStages[active];
  const ActiveIcon = stageIcons[active];

  return (
    <div className="blueprint-system">
      <div className="blueprint-system__phases" aria-label="Blueprint delivery phases">
        {phases.map((phase, index) => (
          <div key={phase.name} className={phase.className}>
            <span>Phase {index + 1}</span>
            <b>{phase.name}</b>
            <small>{phase.description}</small>
          </div>
        ))}
      </div>

      <p className="blueprint-system__guidance">Seven connected business systems. Select a stage to explore its action, requirements, and result.</p>

      <div className="blueprint-system__roadmap" role="tablist" aria-label="AI Transformation Blueprint stages">
        {blueprintStages.map((stage, index) => (
          <button
            key={stage.slug}
            id={`stage-tab-${stage.slug}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`stage-panel-${stage.slug}`}
            tabIndex={active === index ? 0 : -1}
            ref={(node) => { tabRefs.current[index] = node; }}
            className={`blueprint-system__tab stage-${stage.slug}${stage.slug === "context" ? " is-foundation" : ""}${active === index ? " is-active" : ""}`}
            onClick={() => setActive(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {(() => {
              const StageIcon = stageIcons[index];
              return <StageIcon size={30} weight="light" aria-hidden="true" />;
            })()}
            <span>{stage.number}</span>
            <b>{stage.title}</b>
          </button>
        ))}
      </div>

      <article
        id={`stage-panel-${activeStage.slug}`}
        role="tabpanel"
        aria-labelledby={`stage-tab-${activeStage.slug}`}
        className={`blueprint-system__panel stage-${activeStage.slug}${activeStage.slug === "context" ? " is-foundation" : ""}`}
      >
        <div className="blueprint-system__identity">
          <ActiveIcon size={46} weight="light" aria-hidden="true" />
          <p>Stage {activeStage.number} · {stagePhases[active]}</p>
          <h3>{activeStage.title}</h3>
          {activeStage.statement && <small>{activeStage.statement}</small>}
        </div>
        <div className="blueprint-system__action">
          <p>Action</p>
          <h4>{activeStage.prompt}</h4>
          <span>{activeStage.description}</span>
        </div>
        <div className="blueprint-system__details">
          <p>{activeStage.listLabel}</p>
          <ul>{activeStage.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="blueprint-system__result">
          <p>Business result</p>
          <strong>{activeStage.result}</strong>
        </div>
      </article>

      <div className="blueprint-equation" role="img" aria-label="Vision plus context multiplied by adoption equals AI success">
        <p>The success equation</p>
        <div className="blueprint-equation__formula" aria-hidden="true">
          <span><Target size={28} weight="light" /><b>Vision</b></span>
          <i>+</i>
          <span><Database size={28} weight="light" /><b>Context</b></span>
          <i>×</i>
          <span><UsersThree size={28} weight="light" /><b>Adoption</b></span>
          <i>=</i>
          <span className="is-result"><Trophy size={30} weight="light" /><b>AI Success</b></span>
        </div>
      </div>
    </div>
  );
}
