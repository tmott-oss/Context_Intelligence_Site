"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { GraphFallback } from "./GraphFallback";
import { KnowledgeGraphScene } from "./KnowledgeGraphScene";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [nodeCount, setNodeCount] = useState(68);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setSupported(supportsWebGL());
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setNodeCount(window.innerWidth < 640 ? 32 : window.innerWidth < 1024 ? 48 : 68);
    });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const useFallback = supported === false || reducedMotion || nodeCount === 32;
  return (
    <div ref={containerRef} className="knowledge-graph">
      {useFallback ? <GraphFallback /> : (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10.5], fov: 46 }}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(0x05080f, 0)}
        >
          <KnowledgeGraphScene nodeCount={nodeCount} paused={!visible} />
        </Canvas>
      )}
    </div>
  );
}
