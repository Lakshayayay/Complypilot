import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

// ─── Google Font Configuration ────────────────────────────────────────────────
// Inter: Primary structured sans-serif (numbers, tables, headers)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Caveat: Handwritten accent font (annotations, callouts, guidance notes)
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ─── Root Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "ComplyPilot — Compliance Management for CAs & MSMEs",
    template: "%s | ComplyPilot",
  },
  description:
    "ComplyPilot helps Chartered Accountants and MSME business owners track compliance deadlines, manage safety certifications, and stay audit-ready with a collaborative calendar and real-time document pipeline.",
  keywords: [
    "compliance management",
    "CA dashboard",
    "MSME compliance",
    "GST filing",
    "SPCB renewal",
    "chartered accountant software",
    "India compliance tracker",
  ],
  authors: [{ name: "ComplyPilot" }],
  creator: "ComplyPilot",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "ComplyPilot",
    title: "ComplyPilot — Compliance Management for CAs & MSMEs",
    description:
      "Track compliance deadlines, manage safety certifications, and stay audit-ready.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from "@/components/Providers";

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // font CSS variables available to all Tailwind classes & globals.css
      className={`${inter.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-neutral-canvas font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
