import type { Metadata } from "next";
import { AssessmentSite } from "@/components/AssessmentSite";

export const metadata: Metadata = {
  title: { absolute: "AI Transformation Readiness Assessment | Context Intelligence" },
  description:
    "A five-minute, seven-part directional assessment based on the AI Transformation Blueprint to identify strengths, gaps, and the next business priority.",
  openGraph: {
    title: "AI Transformation Readiness Assessment | Context Intelligence",
    description:
      "See where your organization is prepared for AI transformation—and where the operating foundation needs attention.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Context Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Transformation Readiness Assessment | Context Intelligence",
    description:
      "See where your organization is prepared for AI transformation—and where the operating foundation needs attention.",
    images: ["/og.png"],
  },
};

export default function AssessmentPage() {
  return <AssessmentSite />;
}
