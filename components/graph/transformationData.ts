export const transformationStages = [
  { key: "vision", label: "Vision", color: "#4190ff", center: [-3.45, -1.35, 0.05] },
  { key: "processes", label: "Processes", color: "#3aa9a3", center: [-2.3, -0.92, 0.32] },
  { key: "context", label: "Context", color: "#9b6fd0", center: [-1.15, -0.42, -0.24] },
  { key: "workflows", label: "Workflows", color: "#65a950", center: [0, 0.08, 0.38] },
  { key: "agents", label: "Agents", color: "#df7a28", center: [1.15, 0.58, -0.28] },
  { key: "adoption", label: "Adoption", color: "#dcae3b", center: [2.3, 1.08, 0.26] },
  { key: "scale", label: "Scale", color: "#326fc8", center: [3.45, 1.58, 0] },
] as const;

export type TransformationNode = {
  id: number;
  stage: number;
  position: [number, number, number];
  size: number;
};

export type TransformationEdge = {
  source: number;
  target: number;
  stage: number;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function createTransformationArchitecture(nodesPerStage = 10, seed = 73) {
  const random = seededRandom(seed);
  const nodes: TransformationNode[] = [];
  const internalEdges: TransformationEdge[] = [];

  transformationStages.forEach((stage, stageIndex) => {
    const firstNode = nodes.length;
    nodes.push({
      id: firstNode,
      stage: stageIndex,
      position: [stage.center[0], stage.center[1], stage.center[2]],
      size: 0.14,
    });

    for (let index = 1; index < nodesPerStage; index++) {
      const angle = (index / (nodesPerStage - 1)) * Math.PI * 2 + stageIndex * 0.46;
      const radius = 0.42 + random() * 0.38;
      const depth = (random() - 0.5) * 1.25;
      const id = nodes.length;
      nodes.push({
        id,
        stage: stageIndex,
        position: [
          stage.center[0] + Math.cos(angle) * radius,
          stage.center[1] + Math.sin(angle) * radius * 0.72,
          stage.center[2] + depth,
        ],
        size: 0.055 + random() * 0.055,
      });
      internalEdges.push({ source: firstNode, target: id, stage: stageIndex });
      if (index > 1) internalEdges.push({ source: id - 1, target: id, stage: stageIndex });
    }
    internalEdges.push({ source: firstNode + 1, target: firstNode + nodesPerStage - 1, stage: stageIndex });
  });

  const bridges = transformationStages.slice(0, -1).map((_, index) => ({
    source: index * nodesPerStage,
    target: (index + 1) * nodesPerStage,
    stage: index + 1,
  }));

  return { nodes, internalEdges, bridges };
}
