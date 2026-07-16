import type { Metadata } from "next";
import GraphLab from "@/components/graph/GraphLab";

export const metadata: Metadata = {
  title: "AI Transformation Architecture Lab",
  description: "An isolated visual laboratory for the seven-system AI transformation architecture.",
  robots: { index: false, follow: false },
};

export default function GraphLabPage() {
  return <GraphLab />;
}
