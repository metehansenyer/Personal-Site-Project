'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { projects } from '@/app/data/projects'
import { routes } from '@/app/data/routes'
import { useNavOrder } from './NavOrderProvider'

/**
 * Header Component
 *
 * A dynamic header component that displays the site title and current page title.
 * The header is conditionally rendered based on the current route.
 *
 * Features:
 * - Automatically hides on home page
 * - Dynamically updates page title based on current route
 * - Handles special cases for project detail pages
 * - Uses a compact animated mobile navigation menu
 */

export default function Header() {
  const pathname = usePathname()
  const order = useNavOrder()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Ana sayfada header'ı gösterme
  if (pathname === '/') return null

  // Sayfa başlığını belirle
  const getPageTitle = () => {
    if (pathname === '/404') return '404'
    const matched = routes.find((r) => r.path === pathname)
    if (matched) return matched.title
    if (pathname?.startsWith('/portfolio/')) {
      const projectId = pathname.split('/portfolio/')[1]
      const project = projects.find((p) => p.repoName === projectId)
      return project?.title || 'Proje Bulunamadı'
    }
    return ''
  }

  const pageTitle = getPageTitle()
  // Home is always rendered first and doesn't participate in the swap.
  // The remaining routes follow in the order maintained by NavOrderProvider.
  const routeByPath = new Map(routes.map((r) => [r.path, r]))
  const homeRoute = routeByPath.get('/')!
  const navigation = [
    { name: homeRoute.label, href: homeRoute.path },
    ...order
      .filter((p) => p !== pathname)
      .map((p) => routeByPath.get(p))
      .filter((r): r is NonNullable<typeof r> => Boolean(r))
      .map((r) => ({ name: r.label, href: r.path })),
  ]
  // Ana Sayfa is already excluded via showInNav: false — no extra filter needed
  const mobileNavigation = navigation

  return (
    <header className="sticky top-0 z-50 w-full bg-(--background-color) py-3 md:static md:py-4">
      {/* Desktop header */}
      <div className="hidden items-center justify-between px-8 md:flex">
        <h1 className="text-[2rem] text-(--text-color)">Metehan Şenyer</h1>
        <h2 className="text-right text-[2rem] text-(--text-color)">{pageTitle}</h2>
      </div>

      {/* Mobile header */}
      <div className="px-4 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <h1 className="min-w-0 flex-1 truncate text-xl font-semibold text-(--text-color)">
            {pageTitle}
          </h1>
          <button
            type="button"
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-(--text-color) bg-(--nav-background-color) transition-colors duration-300 hover:bg-(--text-color)"
            aria-label={isMenuOpen ? 'Navigasyonu kapat' : 'Navigasyonu aç'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-(--text-color) transition-all duration-300 group-hover:bg-(--nav-background-color) ${
                isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5 rotate-0'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-(--text-color) transition-all duration-300 group-hover:bg-(--nav-background-color) ${
                isMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 rounded-full bg-(--text-color) transition-all duration-300 group-hover:bg-(--nav-background-color) ${
                isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5 rotate-0'
              }`}
            />
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 pt-4 opacity-100' : 'max-h-0 pt-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <div className="space-y-4">
            {mobileNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-(--border-radius-large) border-2 border-solid border-(--text-color) bg-(--nav-background-color) px-6 py-4 text-center text-2xl leading-8 font-medium text-(--text-color) transition-colors hover:bg-(--text-color) hover:text-(--nav-background-color)"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
