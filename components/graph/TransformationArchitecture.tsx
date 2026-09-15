"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { TransformationArchitectureScene } from "./TransformationArchitectureScene";

export function TransformationArchitecture({ hero = false }: { hero?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "160px" });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={hero ? "transformation-architecture transformation-architecture--hero" : "transformation-architecture"} aria-hidden="true">
      <Canvas
        dpr={hero ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0, hero ? 10.8 : 10.2], fov: hero ? 48 : 46 }}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearColor(0x05080f, 0)}
      >
        <TransformationArchitectureScene paused={!visible} hero={hero} />
      </Canvas>
    </div>
  );
}
