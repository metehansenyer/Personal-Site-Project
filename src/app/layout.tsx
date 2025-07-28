/**
 * Root Layout Component
 * 
 * This component serves as the root layout for the entire application.
 * It provides the base structure and common elements present on all pages.
 * 
 * Features:
 * - Google Fonts integration (Inter)
 * - SEO metadata configuration
 * - Common layout elements (Header, Navbar, Footer)
 * - Font Awesome integration
 * - Responsive layout structure
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Script from "next/script";
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Configure Google Font (Inter)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

// Metadata configuration for SEO and social sharing
export const metadata: Metadata = {
  title: "Metehan Şenyer",
  description: "Yazılım Mühendisliği öğrencisi ve tutkulu bir yazılım geliştiricisi.",
  keywords: ['yazılım', 'web geliştirme', 'portfolio', 'metehan şenyer'],
  authors: [{ name: 'Metehan Şenyer' }],
  creator: 'Metehan Şenyer',
  openGraph: {
    title: 'Metehan Şenyer',
    description: 'Yazılım Mühendisliği öğrencisi ve tutkulu bir yazılım geliştiricisi.',
    url: 'https://who.metehansenyer.tech/',
    siteName: 'Metehan Şenyer',
    locale: 'tr_TR',
    type: 'website',
  },
};

  // Root layout component that wraps all pages
  export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        {/* Load Font Awesome icons before page renders */}
        <Script src="https://kit.fontawesome.com/76c7501aeb.js" strategy="beforeInteractive" crossOrigin="anonymous" />
        
        {/* JSON-LD Yapısal Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Metehan Şenyer",
              "url": "https://who.metehansenyer.tech",
              "jobTitle": "Yazılım Mühendisliği Öğrencisi",
              "alumniOf": "Kocaeli Üniversitesi",
              "sameAs": [
                "https://github.com/metehansenyer",
                "https://linkedin.com/in/metehansenyer"
              ]
            })
          }}
        />
      </head>
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        {/* Common layout elements */}
        <Header />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}