import type { Metadata } from "next";
import { MarketingSite } from "@/components/MarketingSite";

export const metadata: Metadata = {
  title: "Context Intelligence | Organizational AI Transformation",
  description:
    "Context Intelligence helps leadership teams identify where AI can create value, design the context and controls it needs, and mobilize a governed portfolio of workflows and agents.",
};

export default function Home() {
  return <MarketingSite />;
}
