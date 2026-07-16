"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createGraph } from "./graphData";

export function KnowledgeGraphScene({ nodeCount, paused }: { nodeCount: number; paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Group>(null);
  const { nodes, edges } = useMemo(() => createGraph(nodeCount), [nodeCount]);
  const edgeGeometry = useMemo(() => {
    const positions: number[] = [];
    edges.forEach((edge) => positions.push(...nodes[edge.source].position, ...nodes[edge.target].position));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [edges, nodes]);
  const activeEdges = useMemo(() => edges.filter((edge) => edge.active).slice(0, 7), [edges]);

  useFrame(({ clock, pointer }, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * 0.035;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.025, 0.02);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.02, 0.02);
    if (pulses.current) {
      pulses.current.children.forEach((pulse, index) => {
        const edge = activeEdges[index];
        if (!edge) return;
        const a = new THREE.Vector3(...nodes[edge.source].position);
        const b = new THREE.Vector3(...nodes[edge.target].position);
        pulse.position.lerpVectors(a, b, (clock.elapsedTime * 0.12 + index * 0.17) % 1);
      });
    }
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial color="#506184" transparent opacity={0.28} />
      </lineSegments>
      {edges.filter((edge) => edge.active).map((edge) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...nodes[edge.source].position),
          new THREE.Vector3(...nodes[edge.target].position),
        ]);
        return <lineSegments key={`${edge.source}-${edge.target}`} geometry={geometry}><lineBasicMaterial color="#2F76FF" transparent opacity={0.65} /></lineSegments>;
      })}
      {nodes.map((node) => {
        const color = node.state === "activated" ? "#D8B679" : node.state === "available" ? "#EBE7DC" : "#273455";
        return (
          <mesh key={node.id} position={node.position} scale={node.state === "activated" ? 1.35 : 1}>
            <sphereGeometry args={[node.size, 14, 14]} />
            <meshBasicMaterial color={color} transparent opacity={node.state === "trapped" ? 0.8 : 1} />
          </mesh>
        );
      })}
      <group ref={pulses}>{activeEdges.map((edge, index) => <mesh key={`${edge.source}-${edge.target}-${index}`}><sphereGeometry args={[0.045, 10, 10]} /><meshBasicMaterial color={index % 3 === 0 ? "#D8B679" : "#2F76FF"} /></mesh>)}</group>
    </group>
  );
}
