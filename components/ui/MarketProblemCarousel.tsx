"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

const problems = [
  ["01", "Different departments pursuing unrelated AI tools", "Local experimentation grows, but the organization never develops a shared direction.", "/images/carousel/01-disconnected-ai-tools.jpg"],
  ["02", "Experiments that never reach production", "Promising ideas stall because ownership, integration, governance, or adoption was never designed.", "/images/carousel/02-prototype-production-gap.jpg"],
  ["03", "Automating tasks without redesigning workflows", "Faster individual tasks do not automatically improve the complete business outcome.", "/images/carousel/03-fast-task-slow-workflow.jpg"],
  ["04", "Generic AI output disconnected from the business", "The technology lacks the terminology, rules, history, and operating context required for reliable results.", "/images/carousel/04-context-gap.jpg"],
  ["05", "Unclear ownership and governance", "Teams cannot make consistent decisions about priorities, risk, investment, or accountability.", "/images/carousel/05-unclear-ownership.jpg"],
  ["06", "Employees bypassing approved systems", "Tools are introduced without enough trust, enablement, reinforcement, or fit with everyday work.", "/images/carousel/06-shadow-ai-workarounds.jpg"],
  ["07", "No shared measurement of business value", "Activity is counted, but impact on growth, execution, customers, or productivity remains unclear.", "/images/carousel/07-conflicting-metrics.jpg"],
  ["08", "Leadership unable to distinguish activity from progress", "More experiments and licenses create motion without producing a coordinated transformation.", "/images/carousel/08-activity-without-progress.jpg"],
] as const;

export function MarketProblemCarousel() {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [gliding, setGliding] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const momentumFrame = useRef(0);
  const moved = useRef(false);

  useEffect(() => () => cancelAnimationFrame(momentumFrame.current), []);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(`[data-problem-index="${index}"]`);
    if (!viewport || !card) return;
    const left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
    viewport.scrollTo({ left, behavior: "smooth" });
    setActive(index);
  };

  const nearestIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport) return active;
    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    const cards = Array.from(viewport.querySelectorAll<HTMLElement>("[data-problem-index]"));
    return cards.reduce((nearest, card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const nearestCard = cards[nearest];
      const nearestCenter = nearestCard.offsetLeft + nearestCard.offsetWidth / 2;
      return Math.abs(cardCenter - center) < Math.abs(nearestCenter - center) ? index : nearest;
    }, 0);
  };

  const previous = () => scrollToIndex((active - 1 + problems.length) % problems.length);
  const next = () => scrollToIndex((active + 1) % problems.length);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    cancelAnimationFrame(momentumFrame.current);
    setGliding(false);
    viewport.setPointerCapture(event.pointerId);
    startX.current = event.clientX;
    startScroll.current = viewport.scrollLeft;
    lastX.current = event.clientX;
    lastTime.current = event.timeStamp;
    velocity.current = 0;
    moved.current = false;
    setDragging(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragging) return;
    const delta = event.clientX - startX.current;
    if (Math.abs(delta) > 4) moved.current = true;
    viewport.scrollLeft = startScroll.current - delta;

    const now = event.timeStamp;
    const elapsed = Math.max(1, now - lastTime.current);
    const instantaneousVelocity = (lastX.current - event.clientX) / elapsed;
    const cappedVelocity = Math.max(-1.35, Math.min(1.35, instantaneousVelocity));
    velocity.current = velocity.current * 0.68 + cappedVelocity * 0.32;
    lastX.current = event.clientX;
    lastTime.current = now;
  };

  const settleToNearest = () => {
    setGliding(false);
    scrollToIndex(nearestIndex());
  };

  const startMomentum = () => {
    const viewport = viewportRef.current;
    if (!viewport || Math.abs(velocity.current) < 0.035) {
      settleToNearest();
      return;
    }

    setGliding(true);
    let previousTime: number | null = null;
    let position = viewport.scrollLeft;
    const glideStart = position;
    const card = viewport.querySelector<HTMLElement>("[data-problem-index]");
    const maxGlide = (card?.offsetWidth ?? viewport.clientWidth * 0.55) * 0.92;

    const glide = (time: number) => {
      if (previousTime === null) {
        previousTime = time;
        momentumFrame.current = requestAnimationFrame(glide);
        return;
      }
      const elapsed = Math.min(32, time - previousTime);
      previousTime = time;
      position += velocity.current * elapsed;
      const maxScroll = viewport.scrollWidth - viewport.clientWidth;
      const glideMin = Math.max(0, glideStart - maxGlide);
      const glideMax = Math.min(maxScroll, glideStart + maxGlide);

      if (position <= glideMin || position >= glideMax) {
        position = Math.max(glideMin, Math.min(glideMax, position));
        velocity.current = 0;
      }

      viewport.scrollLeft = position;
      velocity.current *= Math.pow(0.89, elapsed / 16.67);

      if (Math.abs(velocity.current) < 0.035) {
        settleToNearest();
        return;
      }

      momentumFrame.current = requestAnimationFrame(glide);
    };

    momentumFrame.current = requestAnimationFrame(glide);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    setDragging(false);
    if (moved.current) startMomentum();
    else settleToNearest();
  };

  return (
    <div className="problem-carousel" aria-roledescription="carousel" aria-label="Common signs of disconnected AI activity">
      <div
        ref={viewportRef}
        className={`problem-carousel__viewport${dragging ? " is-dragging" : ""}${gliding ? " is-gliding" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          setDragging(false);
          settleToNearest();
        }}
      >
        <div className="problem-carousel__track">
          {problems.map(([number, title, text, image], index) => (
            <article
              data-problem-index={index}
              className={`problem-card${index === active ? " is-active" : ""}`}
              key={title}
              onClick={() => !moved.current && scrollToIndex(index)}
              aria-current={index === active ? "true" : undefined}
            >
              <div className="problem-card__media" aria-hidden="true">
                <Image
                  src={image}
                  alt=""
                  width={1672}
                  height={941}
                  sizes="(max-width: 560px) calc(100vw - 36px), min(620px, 66vw)"
                  unoptimized
                />
              </div>
              <div className="problem-card__copy">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="problem-carousel__controls">
        <button type="button" onClick={previous}>Previous</button>
        <p aria-live="polite"><span>{String(active + 1).padStart(2, "0")}</span> / {String(problems.length).padStart(2, "0")}</p>
        <button type="button" onClick={next}>Next</button>
      </div>
      <p className="problem-carousel__hint">Drag the banners left or right to explore.</p>
    </div>
  );
}
