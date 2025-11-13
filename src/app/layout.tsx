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
  title: "Hon Dr Brian Walker MLC | Evidence-Based Policy for Western Australia",
  description: "Dr Brian Walker MLC - Your Doctor in Parliament. 40+ years as a GP, fighting for evidence-based cannabis reform, healthcare improvements, and progressive policy in WA. Leader of the Legalise Cannabis WA Party.",
  keywords: [
    "Brian Walker",
    "MLC",
    "Legislative Council",
    "Western Australia",
    "Legalise Cannabis",
    "Cannabis Reform",
    "General Practitioner",
    "Claremont",
    "Evidence-Based Policy",
    "Healthcare Reform",
    "Progressive Policy",
    "WA Parliament",
    "Medicinal Cannabis",
    "Drug Law Reform",
    "Mental Health",
    "Harm Reduction"
  ],
  authors: [{ name: "Dr Brian Walker" }],
  creator: "Dr Brian Walker",
  publisher: "Office of Hon Dr Brian Walker MLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Hon Dr Brian Walker MLC | Evidence-Based Policy for Western Australia",
    description: "Your Doctor in Parliament. Fighting for cannabis reform, healthcare improvements, and progressive policy based on evidence, not politics as usual. 40+ years as GP, 5 years in Parliament, 11+ bills tabled.",
    url: "https://brianwalker.com.au",
    siteName: "Hon Dr Brian Walker MLC",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/images/CouncilLogo.png",
        width: 1200,
        height: 630,
        alt: "Hon Dr Brian Walker MLC - Legislative Council Western Australia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hon Dr Brian Walker MLC | Your Doctor in Parliament",
    description: "40+ years as GP, fighting for evidence-based cannabis reform & progressive policy in WA Parliament. Leader of Legalise Cannabis WA Party.",
    site: "@BrianWalkerMLC",
    creator: "@BrianWalkerMLC",
    images: ["/images/CouncilLogo.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  category: "Politics & Government",
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#00653b] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6cc24a] focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {children}
        <GoogleAnalytics gaId="G-R96M1RT9HC" />
        <Analytics />
      </body>
    </html>
  );
}
