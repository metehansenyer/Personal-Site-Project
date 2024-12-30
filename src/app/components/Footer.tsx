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
    <footer className="w-full text-center py-4">
      <p className="text-[var(--text-color)] opacity-70 text-base">
        <a 
          href="https://github.com/metehansenyer" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[var(--text-color-white)] transition-colors"
        >
          Metehan Şenyer
        </a>
        {' '}tarafından{' '}
        <i className="fa-solid fa-heart text-red-500 animate-pulse mx-1" aria-hidden="true"></i>
        {' '}ile kodlandı
      </p>
    </footer>
  )
} 