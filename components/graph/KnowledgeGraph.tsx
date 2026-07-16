"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { TransformationFallback } from "./TransformationFallback";

const TransformationArchitecture = lazy(() => import("./TransformationArchitecture").then((module) => ({ default: module.TransformationArchitecture })));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function KnowledgeGraph() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSupported(supportsWebGL());
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setCompact(window.innerWidth < 768);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const useFallback = supported === false || reducedMotion || compact;
  return useFallback
    ? <TransformationFallback />
    : <Suspense fallback={<TransformationFallback />}><TransformationArchitecture /></Suspense>;
}
