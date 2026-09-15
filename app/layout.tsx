import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Context Intelligence",
    template: "%s | Context Intelligence",
  },
  description:
    "Independent executive advisory for organizational AI transformation—strategy, context, workflow redesign, governance, adoption, and measurable business outcomes.",
  keywords: [
    "organizational AI transformation",
    "AI Transformation Blueprint",
    "AI transformation strategy",
    "business context architecture",
    "AI readiness assessment",
    "AI-enabled workflow design",
    "AI agent strategy",
    "executive advisory",
  ],
  icons: {
    icon: "/assets/logo-mark.png",
    shortcut: "/assets/logo-mark.png",
    apple: "/assets/logo-mark.png",
  },
  openGraph: {
    title: "Context Intelligence | Organizational AI Transformation",
    description: "Strategy first. Context built in. Business value measured.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Context Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Intelligence | Organizational AI Transformation",
    description: "Strategy first. Context built in. Business value measured.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FAFC",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
