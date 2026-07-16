"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; tone: "dim" | "gold" | "blue"; radius: number };

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const random = seededRandom(12);
    const points: Point[] = Array.from({ length: 44 }, (_, index) => ({
      x: 0.43 + random() * 0.56,
      y: 0.08 + random() * 0.82,
      tone: index % 17 === 0 ? "gold" : index % 13 === 0 ? "blue" : "dim",
      radius: 1.2 + random() * 2.2,
    }));
    let frame = 0;
    let width = 0;
    let height = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(0);
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const drift = reduced ? 0 : Math.sin(time * 0.00018) * 5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const distance = Math.hypot(dx, dy);
          if (distance > 150) continue;
          const active = (i + j) % 19 === 0;
          context.strokeStyle = active ? "rgba(47,118,255,.35)" : "rgba(247,244,236,.10)";
          context.lineWidth = active ? 1.1 : 0.7;
          context.beginPath();
          context.moveTo(a.x * width + drift, a.y * height);
          context.lineTo(b.x * width + drift, b.y * height);
          context.stroke();
        }
      }
      points.forEach((point, index) => {
        const pulse = reduced ? 0 : Math.sin(time * 0.001 + index) * 0.45;
        const color = point.tone === "gold" ? "#D8B679" : point.tone === "blue" ? "#2F76FF" : "#273455";
        context.fillStyle = color;
        context.beginPath();
        context.arc(point.x * width + drift, point.y * height, Math.max(1, point.radius + pulse), 0, Math.PI * 2);
        context.fill();
      });
      if (!reduced) frame = requestAnimationFrame(draw);
    };

    resize();
    if (!reduced) frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-network" aria-hidden="true" />;
}
