import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hon Dr Brian Walker MLC | Member of the Legislative Council for Western Australia",
  description: "Dr Brian Walker MLC - General Practitioner in Claremont and Member of the Legislative Council for Western Australia. Leader of the Legalise Cannabis WA Party.",
  keywords: ["Brian Walker", "MLC", "Legislative Council", "Western Australia", "Legalise Cannabis", "General Practitioner", "Claremont"],
  authors: [{ name: "Dr Brian Walker" }],
  openGraph: {
    title: "Hon Dr Brian Walker MLC",
    description: "Member of the Legislative Council for WA & General Practitioner",
    url: "https://brianwalker.com.au",
    siteName: "Brian Walker MLC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hon Dr Brian Walker",
    description: "Member of the Legislative Council for WA & General Practitioner",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-R96M1RT9HC" />
        <Analytics />
      </body>
    </html>
  );
}
