import { describe, it, expect } from 'vitest'
import { routes, getRoute } from './routes'
import { loadSiteContent } from '@/test/siteContent'

describe('getRoute', () => {
  it('returns the route for a known path', () => {
    expect(getRoute('/portfolio').key).toBe('portfolio')
    expect(getRoute('/contact').showInNav).toBe(true)
    expect(getRoute('/').showInNav).toBe(false)
  })

  it('returns every configured route', () => {
    for (const route of routes) expect(getRoute(route.path)).toBe(route)
  })

  it('throws on an unknown path', () => {
    expect(() => getRoute('/nope' as never)).toThrow(/Unknown route/)
  })
})

describe('routes and site content', () => {
  it('every route key has texts in the site content', () => {
    const content = loadSiteContent()
    for (const route of routes) expect(content.routes[route.key]).toBeDefined()
  })
})
