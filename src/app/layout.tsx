import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mnemonic.fyi - AI Knowledge Search",
  description: "Transform your team's scattered knowledge into intelligent answers. Search across Slack and Notion with AI-powered insights.",
  keywords: ["AI", "knowledge search", "Slack", "Notion", "team collaboration"],
  authors: [{ name: "mnemonic.fyi team" }],
  openGraph: {
    title: "mnemonic.fyi - AI Knowledge Search",
    description: "Transform your team's scattered knowledge into intelligent answers.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics googleAnalyticsId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}