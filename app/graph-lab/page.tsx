import type { Metadata } from "next";
import GraphLab from "@/components/graph/GraphLab";

export const metadata: Metadata = {
  title: "Organizational Intelligence Graph Lab",
  description: "An isolated visual laboratory for the Context Intelligence knowledge graph.",
  robots: { index: false, follow: false },
};

export default function GraphLabPage() {
  return <GraphLab />;
}
