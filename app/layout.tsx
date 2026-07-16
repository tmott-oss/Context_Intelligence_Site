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
    "Executive advisory for moving from disconnected AI activity to coordinated, measurable, and scalable organizational transformation.",
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
    description: "AI isn’t a software project. It’s a business transformation initiative.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Intelligence | Organizational AI Transformation",
    description: "Move from disconnected AI activity to coordinated business transformation.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0F1E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
