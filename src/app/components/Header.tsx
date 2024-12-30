'use client'
import { usePathname } from 'next/navigation'
import { projects } from '@/app/data/projects'

/**
 * Header Component
 * 
 * A dynamic header component that displays the site title and current page title.
 * The header is conditionally rendered based on the current route.
 * 
 * Features:
 * - Automatically hides on home and mobile pages
 * - Dynamically updates page title based on current route
 * - Handles special cases for project detail pages
 * - Responsive design with consistent styling
 */

export default function Header() {
  const pathname = usePathname()
  
  // Ana sayfada header'ı gösterme
  if (pathname === '/') return null
  if (pathname === '/mobile') return null

  // Sayfa başlığını belirle
  const getPageTitle = () => {
    switch (pathname) {
      case '/404':
        return '404'
      case '/about':
        return 'Ben Kimim?'
      case '/portfolio':
        return 'Portföy'
      case '/contact':
        return 'İletişim'
      default:
        if (pathname?.startsWith('/portfolio/')) {
          const projectId = pathname.split('/portfolio/')[1]
          const project = projects.find(p => p.repoName === projectId)
          return project?.title || 'Proje Bulunamadı'
        }
        return ''
    }
  }

  return (
    <header className="w-full bg-[var(--background-color)] py-4">
      <div className="flex justify-between items-center px-8">
        <h1 className="text-[var(--text-color)] text-[2rem]">Metehan Şenyer</h1>
        <h2 className="text-[var(--text-color)] text-[2rem]">{getPageTitle()}</h2>
      </div>
    </header>
  )
} 