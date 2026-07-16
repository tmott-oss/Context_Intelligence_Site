"use client";

import { useState } from "react";
import { blueprintStages, stageAccents } from "@/components/content/blueprint";

export function BlueprintExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="blueprint-explorer">
      <div className="blueprint-roadmap" role="tablist" aria-label="AI Transformation Blueprint stages">
        {blueprintStages.map((stage, index) => (
          <button
            key={stage.slug}
            id={`stage-tab-${stage.slug}`}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`stage-panel-${stage.slug}`}
            className={`blueprint-tab stage-${stageAccents[index]}${active === index ? " is-active" : ""}`}
            onClick={() => setActive(index)}
          >
            <span>{stage.number}</span>
            <b>{stage.title}</b>
          </button>
        ))}
      </div>

      <div className="blueprint-panels">
        {blueprintStages.map((stage, index) => (
          <article
            key={stage.slug}
            id={`stage-panel-${stage.slug}`}
            role="tabpanel"
            aria-labelledby={`stage-tab-${stage.slug}`}
            hidden={active !== index}
            className={`blueprint-panel stage-${stageAccents[index]}`}
          >
            <div className="blueprint-panel__intro">
              <p className="blueprint-panel__number">Stage {stage.number}</p>
              {stage.statement && <p className="blueprint-panel__statement">{stage.statement}</p>}
              <h3>{stage.prompt}</h3>
              <p>{stage.description}</p>
            </div>
            <div className="blueprint-panel__details">
              <p className="list-label">{stage.listLabel}</p>
              <ul>{stage.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="blueprint-panel__result">
              <p className="list-label">Result</p>
              <p>{stage.result}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
