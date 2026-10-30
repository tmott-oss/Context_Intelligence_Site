import type { Metadata } from "next";
import { MarketingSite } from "@/components/MarketingSite";

const description = "AI transformation for organizations where scale makes inefficiency expensive.";

export const metadata: Metadata = {
  title: "Enterprise",
  description,
  openGraph: {
    title: "Enterprise | Context Intelligence",
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Context Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise | Context Intelligence",
    description,
    images: ["/og.png"],
  },
};

export default function Home() {
  return <MarketingSite />;
}
