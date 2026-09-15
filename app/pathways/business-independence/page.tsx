import type { Metadata } from "next";
import { BusinessIndependenceSite } from "@/components/BusinessIndependenceSite";

export const metadata: Metadata = {
  title: "Business Independence Blueprint",
  description: "Executive advisory for reducing owner dependency, strengthening organizational resilience, and increasing enterprise value.",
};

export default function BusinessIndependencePage() {
  return <BusinessIndependenceSite />;
}
