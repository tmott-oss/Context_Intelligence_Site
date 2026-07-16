"use client";

import { useState } from "react";

const problems = [
  ["01", "Different departments pursuing unrelated AI tools", "Local experimentation grows, but the organization never develops a shared direction."],
  ["02", "Pilots that never reach production", "Promising ideas stall because ownership, integration, governance, or adoption was never designed."],
  ["03", "Automating tasks without redesigning workflows", "Faster individual tasks do not automatically improve the complete business outcome."],
  ["04", "Generic AI output disconnected from the business", "The technology lacks the terminology, rules, history, and operating context required for reliable results."],
  ["05", "Unclear ownership and governance", "Teams cannot make consistent decisions about priorities, risk, investment, or accountability."],
  ["06", "Employees bypassing approved systems", "Tools are introduced without enough trust, enablement, reinforcement, or fit with everyday work."],
  ["07", "No shared measurement of business value", "Activity is counted, but impact on growth, execution, customers, or productivity remains unclear."],
  ["08", "Leadership unable to distinguish activity from progress", "More pilots and licenses create motion without producing a coordinated transformation."],
] as const;

export function MarketProblemCarousel() {
  const [active, setActive] = useState(0);
  const previous = () => setActive((current) => (current - 1 + problems.length) % problems.length);
  const next = () => setActive((current) => (current + 1) % problems.length);

  return (
    <div className="problem-carousel" aria-roledescription="carousel" aria-label="Common signs of disconnected AI activity">
      <div className="problem-carousel__stage">
        {problems.map(([number, title, text], index) => {
          const distance = (index - active + problems.length) % problems.length;
          const position = distance === 0 ? "active" : distance === 1 ? "next" : distance === problems.length - 1 ? "previous" : "hidden";
          return (
            <article
              className={`problem-card problem-card--${position}`}
              key={title}
              aria-hidden={position !== "active"}
            >
              <div className="problem-card__visual" aria-hidden="true">
                <span>{number}</span>
                <i /><i /><i /><i />
              </div>
              <div className="problem-card__copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="problem-carousel__controls">
        <button type="button" onClick={previous} aria-label="Show previous sign">←</button>
        <p aria-live="polite"><span>{String(active + 1).padStart(2, "0")}</span> / {String(problems.length).padStart(2, "0")}</p>
        <button type="button" onClick={next} aria-label="Show next sign">→</button>
      </div>
      <div className="problem-carousel__dots" aria-label="Choose a sign">
        {problems.map(([, title], index) => (
          <button
            type="button"
            key={title}
            className={index === active ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show sign ${index + 1}: ${title}`}
            aria-current={index === active ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
