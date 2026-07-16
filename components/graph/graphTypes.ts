export type NodeFamily = "people" | "conversations" | "decisions" | "processes" | "systems" | "documents" | "outcomes";

export type GraphNode = {
  id: number;
  family: NodeFamily;
  position: [number, number, number];
  state: "trapped" | "available" | "activated";
  size: number;
};

export type GraphEdge = {
  source: number;
  target: number;
  active: boolean;
};
