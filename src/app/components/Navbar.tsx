'use client'
import { usePathname } from 'next/navigation'
import Button from './Button'
import { routes } from '@/app/data/routes'
import { useNavOrder } from './NavOrderProvider'

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
  const order = useNavOrder()

  // Ana sayfada navbar'ı gösterme
  if (pathname === '/') return null

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
