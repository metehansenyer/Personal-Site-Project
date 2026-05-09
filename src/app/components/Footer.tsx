'use client'
import { usePathname } from 'next/navigation'

/**
 * Footer Component
 *
 * A simple footer component that displays attribution and copyright information.
 * The footer is conditionally rendered based on the current route.
 *
 * Features:
 * - Automatically hides on home and mobile pages
 * - Includes a link to the developer's GitHub profile
 * - Animated heart icon
 * - Consistent styling with the rest of the application
 */

export default function Footer() {
  const pathname = usePathname()

  // Don't show footer on home and mobile pages
  if (pathname === '/') return null
  if (pathname === '/mobile') return null

  return (
    <footer className="w-full px-4 py-4 text-center">
      <p className="text-sm text-(--text-color) opacity-70 sm:text-base">
        <a
          href="https://github.com/metehansenyer"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-(--text-color-white)"
        >
          Metehan Şenyer
        </a>{' '}
        tarafından{' '}
        <i className="fa-solid fa-heart mx-1 animate-pulse text-red-500" aria-hidden="true"></i> ile
        kodlandı
      </p>
      <p className="mt-1 text-xs text-(--text-color) opacity-40 md:whitespace-nowrap">
        Bu site çerez kullanmayan ve kişisel veri toplamayan{' '}
        <a
          href="https://umami.is"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-opacity hover:opacity-70"
        >
          Umami Analytics
        </a>{' '}
        kullanmaktadır. Veriler AB (Almanya) sunucularında barındırılmaktadır.
      </p>
    </footer>
  )
}
