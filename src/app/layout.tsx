/**
 * Root Layout Component
 * 
 * This component serves as the root layout for the entire application.
 * It provides the base structure and common elements present on all pages.
 * 
 * Features:
 * - Custom font integration (TT Firs Neue)
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
import localFont from 'next/font/local'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Configure custom font (TT Firs Neue)
// Includes regular and bold weights with fallback options
const ttFirs = localFont({
  src: [
    {
      path: '../fonts/TTFirsNeueTrialRegular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/TTFirsNeueTrialBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-tt-firs',
  preload: true,
  fallback: ['system-ui', 'arial'],
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
    url: 'https://metehansenyer.me/',
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
    <html lang="tr" className={ttFirs.variable}>
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
              "url": "https://metehansenyer.me",
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
      <body className={`min-h-screen flex flex-col ${ttFirs.className}`}>
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