"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  z: number;
  tone: "dim" | "gold" | "blue";
  radius: number;
};

type ProjectedPoint = Point & {
  px: number;
  py: number;
  depth: number;
  scale: number;
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function HeroNetwork({ dark = false }: { dark?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const random = seededRandom(24);
    const points: Point[] = Array.from({ length: 82 }, (_, index) => ({
      x: 0.05 + random() * 0.9,
      y: 0.05 + random() * 0.9,
      z: -1 + random() * 2,
      tone: index % 23 === 0 ? "gold" : index % 13 === 0 ? "blue" : "dim",
      radius: 1.35 + random() * 2.45,
    }));

    let frame = 0;
    let width = 0;
    let height = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const project = (point: Point, time: number): ProjectedPoint => {
      const angle = reduced ? 0.18 : time * 0.000045;
      const normalizedX = (point.x - 0.5) * 2;
      const normalizedY = (point.y - 0.5) * 2;
      const rotatedX = normalizedX * Math.cos(angle) + point.z * Math.sin(angle);
      const rotatedZ = -normalizedX * Math.sin(angle) + point.z * Math.cos(angle);
      const depth = (rotatedZ + 1.5) / 3;
      const scale = 1 / (1.04 + rotatedZ * 0.16);

      return {
        ...point,
        px: width * 0.52 + rotatedX * width * 0.46 * scale,
        py: height * 0.5 + normalizedY * height * 0.47 * scale,
        depth,
        scale,
      };
    };

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
      const projected = points.map((point) => project(point, time));

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y, (a.z - b.z) * 0.42);
          if (distance > 0.24) continue;

          const pa = projected[i];
          const pb = projected[j];
          const active = (i + j) % 17 === 0;
          const averageDepth = (pa.depth + pb.depth) / 2;
          const opacity = (active ? 0.44 : 0.15) + averageDepth * (active ? 0.14 : 0.12);
          context.strokeStyle = dark
            ? `rgba(142,197,232,${opacity})`
            : `rgba(37,99,169,${opacity})`;
          context.lineWidth = active ? 1.25 : 0.72 + averageDepth * 0.5;
          context.beginPath();
          context.moveTo(pa.px, pa.py);
          context.lineTo(pb.px, pb.py);
          context.stroke();
        }
      }

      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach((point, index) => {
          const pulse = reduced ? 0 : Math.sin(time * 0.001 + index) * 0.5;
          const color = point.tone === "gold"
            ? "#C99A45"
            : point.tone === "blue"
              ? "#2F73F2"
              : dark ? "#8EC5E8" : "#79B6DE";
          const radius = Math.max(1.3, (point.radius + pulse) * point.scale * (0.76 + point.depth * 0.55));

          if (point.tone !== "dim") {
            context.fillStyle = dark ? "rgba(47,115,242,.12)" : "rgba(47,115,242,.08)";
            context.beginPath();
            context.arc(point.px, point.py, radius * 3.2, 0, Math.PI * 2);
            context.fill();
          }

          context.fillStyle = color;
          context.beginPath();
          context.arc(point.px, point.py, radius, 0, Math.PI * 2);
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
  }, [dark]);

  return <canvas ref={canvasRef} className="hero-network" aria-hidden="true" />;
}
