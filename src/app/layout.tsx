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

import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import { SITE_URL, SITE_NAME } from './lib/site'

// Configure Google Font (Inter)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

// Viewport configuration for correct mobile rendering
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// Metadata configuration for SEO and social sharing
export const metadata: Metadata = {
  title: SITE_NAME,
  description: 'Yazılım Mühendisliği öğrencisi ve tutkulu bir yazılım geliştiricisi.',
  keywords: ['yazılım', 'web geliştirme', 'portfolio', 'metehan şenyer'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    title: SITE_NAME,
    description: 'Yazılım Mühendisliği öğrencisi ve tutkulu bir yazılım geliştiricisi.',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: 'tr_TR',
    type: 'website',
  },
}

// Root layout component that wraps all pages
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        {/* Load Font Awesome icons before page renders */}
        <Script
          src="https://kit.fontawesome.com/76c7501aeb.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Yapısal Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: SITE_NAME,
              url: SITE_URL,
              jobTitle: 'Yazılım Mühendisliği Öğrencisi',
              alumniOf: 'Kocaeli Üniversitesi',
              sameAs: ['https://github.com/metehansenyer', 'https://linkedin.com/in/metehansenyer'],
            }),
          }}
        />
      </head>
      <body className={`flex min-h-screen flex-col overflow-x-hidden ${inter.className}`}>
        {/* Common layout elements */}
        <Header />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://umami.metehansenyer.tech/script.js"
            data-website-id="41d22223-daff-461c-bec6-d56ddd7208f6"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
