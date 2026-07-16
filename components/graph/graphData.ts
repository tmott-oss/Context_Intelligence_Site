import type { GraphEdge, GraphNode, NodeFamily } from "./graphTypes";

const families: NodeFamily[] = ["people", "conversations", "decisions", "processes", "systems", "documents", "outcomes"];
const clusterCenters: [number, number, number][] = [[-3.6, 1.5, -1], [-1.4, -1.8, 0.8], [1.4, 1.8, -0.4], [3.7, -1.2, 0.6]];

function randomFactory(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (1664525 * value + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

export function createGraph(nodeCount = 68, seed = 48): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const random = randomFactory(seed);
  const nodes: GraphNode[] = Array.from({ length: nodeCount }, (_, id) => {
    const cluster = id % clusterCenters.length;
    const center = clusterCenters[cluster];
    const state = id % 19 === 0 ? "activated" : id % 5 === 0 ? "available" : "trapped";
    return {
      id,
      family: families[id % families.length],
      position: [
        center[0] + (random() - 0.5) * 3.2,
        center[1] + (random() - 0.5) * 2.8,
        center[2] + (random() - 0.5) * 3.4,
      ],
      state,
      size: 0.075 + random() * 0.075,
    };
  });

  const edges: GraphEdge[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const source = nodes[i];
    const distances = nodes
      .filter((node) => node.id !== i)
      .map((node) => ({ id: node.id, distance: Math.hypot(source.position[0] - node.position[0], source.position[1] - node.position[1], source.position[2] - node.position[2]) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, i % 4 === 0 ? 3 : 2);
    distances.forEach(({ id }) => {
      if (!edges.some((edge) => (edge.source === i && edge.target === id) || (edge.source === id && edge.target === i))) {
        edges.push({ source: i, target: id, active: (i + id) % 17 === 0 });
      }
    });
  }

  for (let cluster = 0; cluster < clusterCenters.length - 1; cluster++) {
    edges.push({ source: cluster, target: cluster + 1, active: true });
  }

  return { nodes, edges };
}
