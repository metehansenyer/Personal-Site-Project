'use client'
import { usePathname } from 'next/navigation'
import Button from './Button'
import { routes } from '@/app/data/routes'

/**
 * Navbar Component
 *
 * A navigation bar component that provides links to different sections of the website.
 * The navbar is conditionally rendered based on the current route.
 *
 * Features:
 * - Automatically hides on home page and small-screen layouts
 * - Dynamically filters out the current page from navigation options
 * - Uses consistent Button components for desktop navigation
 * - Responsive design with centered layout
 */

export default function Navbar() {
  const pathname = usePathname()

  // Ana sayfada navbar'ı gösterme
  if (pathname === '/') return null

  // Mevcut sayfanın linkini filtreleyip çıkart
  const navigation = routes
    .filter((r) => r.showInNav && r.path !== pathname)
    .map((r) => ({ name: r.label, href: r.path }))

  return (
    <nav className="bg-background z-50 hidden w-full pt-1 md:block">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-8">
          {navigation.map((item) => (
            <Button
              key={item.name}
              href={item.href}
              width="w-[16rem]"
              height="h-[4rem]"
              fontSize="text-[2rem]"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
