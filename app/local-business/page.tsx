import type { Metadata } from "next";
import { LocalBusinessSite } from "@/components/LocalBusinessSite";

const description = "Practical systems, automation and AI that take work off the owner's plate.";

export const metadata: Metadata = {
  title: "Local Business",
  description,
  openGraph: {
    title: "Local Business | Context Intelligence",
    description,
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Context Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Local Business | Context Intelligence",
    description,
    images: ["/og.png"],
  },
};

export default function LocalBusinessPage() {
  return <LocalBusinessSite />;
}
