import type { Metadata } from "next";
import { MarketingSite } from "@/components/MarketingSite";

export const metadata: Metadata = {
  title: "Context Intelligence | Organizational Intelligence Advisory",
  description:
    "Executive advisory for organizational intelligence, AI transformation strategy, and business independence.",
};

export default function Home() {
  return <MarketingSite />;
}
