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
    "Context Intelligence finds where knowledge, work, and opportunity get stuck, then builds systems that make the business run better.",
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
    title: "Context Intelligence",
    description: "Context Intelligence finds where knowledge, work, and opportunity get stuck, then builds systems that make the business run better.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Context Intelligence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Intelligence",
    description: "Context Intelligence finds where knowledge, work, and opportunity get stuck, then builds systems that make the business run better.",
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
