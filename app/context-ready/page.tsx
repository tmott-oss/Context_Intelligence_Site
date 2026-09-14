import type { Metadata } from "next";
import { ContextReadySite } from "@/components/ContextReadySite";

export const metadata: Metadata = {
  title: { absolute: "Context Ready | The Creator Product Studio" },
  description:
    "Context Ready partners with creators and subject-matter experts to transform trusted expertise into structured, market-ready digital products.",
  openGraph: {
    title: "Context Ready | The Creator Product Studio",
    description:
      "Context Ready partners with creators and subject-matter experts to transform trusted expertise into structured, market-ready digital products.",
    type: "website",
    images: [
      {
        url: "/context-ready-og.png",
        width: 1733,
        height: 907,
        alt: "Context Ready, The Creator Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Ready | The Creator Product Studio",
    description:
      "Context Ready partners with creators and subject-matter experts to transform trusted expertise into structured, market-ready digital products.",
    images: ["/context-ready-og.png"],
  },
};

export default function ContextReadyPage() {
  return <ContextReadySite />;
}
