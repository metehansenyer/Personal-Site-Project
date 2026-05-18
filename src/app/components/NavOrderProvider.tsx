'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { routes, type SiteRoute } from '@/app/data/routes'

type NavPath = Exclude<SiteRoute['path'], '/'>

const STORAGE_KEY = 'nav-order'

const defaultOrder: NavPath[] = routes
  .filter((r) => r.showInNav)
  .map((r) => r.path as NavPath)

const NavOrderContext = createContext<readonly NavPath[]>(defaultOrder)

function isNavPath(path: string): path is NavPath {
  return (defaultOrder as readonly string[]).includes(path)
}

export function NavOrderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPathRef = useRef<string | null>(null)

  const [order, setOrder] = useState<NavPath[]>(() => {
    if (typeof window === 'undefined') return defaultOrder
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (!stored) return defaultOrder
      const parsed: unknown = JSON.parse(stored)
      if (
        Array.isArray(parsed) &&
        parsed.length === defaultOrder.length &&
        parsed.every((p): p is NavPath => typeof p === 'string' && isNavPath(p)) &&
        defaultOrder.every((p) => parsed.includes(p))
      ) {
        return parsed
      }
    } catch {
      // fall through to default
    }
    return defaultOrder
  })

  useEffect(() => {
    const prev = prevPathRef.current
    prevPathRef.current = pathname
    if (!prev || prev === pathname) return
    if (!isNavPath(prev) || !isNavPath(pathname)) return
    setOrder((current) => {
      const next = [...current]
      const i = next.indexOf(prev)
      const j = next.indexOf(pathname)
      if (i === -1 || j === -1) return current
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }, [pathname])

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      // sessionStorage unavailable — order still works in-memory
    }
  }, [order])

  return <NavOrderContext.Provider value={order}>{children}</NavOrderContext.Provider>
}

export function useNavOrder() {
  return useContext(NavOrderContext)
}
