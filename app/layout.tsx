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
    "The executive advisory practice for building organizational intelligence into a strategic asset.",
  keywords: [
    "organizational intelligence",
    "AI transformation strategy",
    "knowledge architecture",
    "business independence",
    "executive advisory",
  ],
  icons: {
    icon: "/assets/logo-mark.png",
    shortcut: "/assets/logo-mark.png",
    apple: "/assets/logo-mark.png",
  },
  openGraph: {
    title: "Context Intelligence",
    description: "AI is not the competitive advantage. Context is.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "AI is not the competitive advantage. Context is." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Intelligence",
    description: "Capture. Connect. Activate. Advantage.",
    images: ["/og.png"],
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
