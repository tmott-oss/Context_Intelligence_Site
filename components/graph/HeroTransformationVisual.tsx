"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { HeroNetwork } from "./HeroNetwork";

const TransformationArchitecture = lazy(() => import("./TransformationArchitecture").then((module) => ({ default: module.TransformationArchitecture })));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function HeroTransformationVisual() {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sufficientlyWide = window.innerWidth >= 800;
      const capable = (navigator.hardwareConcurrency ?? 4) > 2;
      setEnhanced(!reduced && sufficientlyWide && capable && supportsWebGL());
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!enhanced) return <HeroNetwork />;
  return <Suspense fallback={<HeroNetwork />}><TransformationArchitecture hero /></Suspense>;
}
