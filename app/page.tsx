import type { Metadata } from "next";
import { MarketingSite } from "@/components/MarketingSite";

export const metadata: Metadata = {
  title: "Context Intelligence | Organizational AI Transformation",
  description:
    "Context Intelligence helps leadership teams move from disconnected AI experiments to coordinated business transformation through vision, process design, organizational context, AI-enabled workflows, agents, adoption, and scale.",
};

export default function Home() {
  return <MarketingSite />;
}
