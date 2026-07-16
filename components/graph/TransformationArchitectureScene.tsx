"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createTransformationArchitecture, transformationStages } from "./transformationData";

function smoothstep(min: number, max: number, value: number) {
  const x = THREE.MathUtils.clamp((value - min) / (max - min), 0, 1);
  return x * x * (3 - 2 * x);
}

export function TransformationArchitectureScene({ paused = false, hero = false }: { paused?: boolean; hero?: boolean }) {
  const group = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const bridgeMaterials = useRef<Array<THREE.LineBasicMaterial | null>>([]);
  const pulseMaterials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const pulses = useRef<Array<THREE.Mesh | null>>([]);
  const elapsed = useRef(0);
  const { nodes, internalEdges, bridges } = useMemo(() => createTransformationArchitecture(hero ? 8 : 10), [hero]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const baseColor = useMemo(() => new THREE.Color("#2b3858"), []);
  const dynamicColor = useMemo(() => new THREE.Color(), []);
  const stageColors = useMemo(() => transformationStages.map((stage) => new THREE.Color(stage.color)), []);

  const internalGeometry = useMemo(() => {
    const positions: number[] = [];
    internalEdges.forEach((edge) => positions.push(...nodes[edge.source].position, ...nodes[edge.target].position));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [internalEdges, nodes]);

  const frameworkGeometry = useMemo(() => {
    const positions: number[] = [];
    transformationStages.forEach((stage) => {
      const [x, y, z] = stage.center;
      positions.push(x, y - 0.82, z - 0.55, x, y + 0.82, z - 0.55);
      positions.push(x, y - 0.82, z + 0.55, x, y + 0.82, z + 0.55);
      positions.push(x, y + 0.82, z - 0.55, x, y + 0.82, z + 0.55);
    });
    for (let index = 0; index < transformationStages.length - 1; index++) {
      const current = transformationStages[index].center;
      const next = transformationStages[index + 1].center;
      positions.push(current[0], current[1] + 0.82, current[2] - 0.55, next[0], next[1] + 0.82, next[2] - 0.55);
      positions.push(current[0], current[1] - 0.82, current[2] + 0.55, next[0], next[1] - 0.82, next[2] + 0.55);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  const bridgeGeometries = useMemo(() => bridges.map((bridge) => new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(...nodes[bridge.source].position),
    new THREE.Vector3(...nodes[bridge.target].position),
  ])), [bridges, nodes]);

  useEffect(() => () => {
    internalGeometry.dispose();
    frameworkGeometry.dispose();
    bridgeGeometries.forEach((geometry) => geometry.dispose());
  }, [bridgeGeometries, frameworkGeometry, internalGeometry]);

  useLayoutEffect(() => {
    if (!nodesRef.current) return;
    nodes.forEach((node, index) => {
      dummy.position.set(...node.position);
      dummy.scale.setScalar(node.size);
      dummy.updateMatrix();
      nodesRef.current?.setMatrixAt(index, dummy.matrix);
      dynamicColor.set(baseColor).lerp(stageColors[node.stage], 0.46);
      nodesRef.current?.setColorAt(index, dynamicColor);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;
    (nodesRef.current.material as THREE.Material).needsUpdate = true;
  }, [baseColor, dummy, dynamicColor, nodes, stageColors]);

  useFrame(({ pointer }, delta) => {
    if (paused || !group.current || !nodesRef.current) return;
    elapsed.current += Math.min(delta, 0.05);
    const time = elapsed.current;
    const buildWave = (Math.sin(time * 0.22 - Math.PI / 2) + 1) * 0.5 * 8.4;

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (hero ? -0.15 : -0.06) + pointer.x * 0.045, 0.025);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (hero ? -0.08 : 0) - pointer.y * 0.025, 0.025);
    group.current.position.y = Math.sin(time * 0.2) * 0.045;

    nodes.forEach((node, index) => {
      const activation = smoothstep(node.stage - 0.15, node.stage + 0.85, buildWave);
      const pulse = activation * (0.04 + Math.sin(time * 1.2 + index * 0.7) * 0.035);
      const scale = node.size * (0.84 + activation * 0.42 + pulse);
      dummy.position.set(node.position[0], node.position[1] + Math.sin(time * 0.38 + index) * 0.018, node.position[2]);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      nodesRef.current?.setMatrixAt(index, dummy.matrix);
      dynamicColor.set(baseColor).lerp(stageColors[node.stage], 0.46 + activation * 0.54);
      nodesRef.current?.setColorAt(index, dynamicColor);
    });
    nodesRef.current.instanceMatrix.needsUpdate = true;
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true;

    bridges.forEach((bridge, index) => {
      const activation = smoothstep(bridge.stage - 0.1, bridge.stage + 0.72, buildWave);
      const material = bridgeMaterials.current[index];
      const pulseMaterial = pulseMaterials.current[index];
      const pulseMesh = pulses.current[index];
      if (material) material.opacity = 0.08 + activation * 0.72;
      if (pulseMaterial) pulseMaterial.opacity = activation;
      if (pulseMesh) {
        const source = nodes[bridge.source].position;
        const target = nodes[bridge.target].position;
        const progress = (time * 0.14 + index * 0.16) % 1;
        pulseMesh.position.set(
          THREE.MathUtils.lerp(source[0], target[0], progress),
          THREE.MathUtils.lerp(source[1], target[1], progress),
          THREE.MathUtils.lerp(source[2], target[2], progress),
        );
        pulseMesh.scale.setScalar(0.7 + activation * 0.55);
      }
    });
  });

  return (
    <group ref={group} position={hero ? [1.2, -0.05, 0] : [0, 0, 0]} scale={hero ? 0.92 : 1}>
      <lineSegments geometry={frameworkGeometry}>
        <lineBasicMaterial color="#2f76ff" transparent opacity={0.08} />
      </lineSegments>
      <lineSegments geometry={internalGeometry}>
        <lineBasicMaterial color="#617092" transparent opacity={0.24} />
      </lineSegments>
      {bridgeGeometries.map((geometry, index) => (
        <lineSegments key={`bridge-${index}`} geometry={geometry}>
          <lineBasicMaterial
            ref={(material) => { bridgeMaterials.current[index] = material; }}
            color={transformationStages[index + 1].color}
            transparent
            opacity={0.08}
          />
        </lineSegments>
      ))}
      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
        <sphereGeometry args={[1, hero ? 10 : 12, hero ? 10 : 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.96} toneMapped={false} />
      </instancedMesh>
      {bridges.map((bridge, index) => (
        <mesh key={`pulse-${index}`} ref={(mesh) => { pulses.current[index] = mesh; }}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshBasicMaterial
            ref={(material) => { pulseMaterials.current[index] = material; }}
            color={transformationStages[index + 1].color}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </group>
  );
}
