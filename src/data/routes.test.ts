import { describe, it, expect } from 'vitest'
import { routes, getRoute } from './routes'

describe('getRoute', () => {
  it('returns the route for a known path', () => {
    expect(getRoute('/portfolio').title).toBe('Portföy')
    expect(getRoute('/contact').homeLabel).toBe('Bana Ulaşın')
  })

  it('returns every configured route', () => {
    for (const route of routes) expect(getRoute(route.path)).toBe(route)
  })

  it('throws on an unknown path', () => {
    expect(() => getRoute('/nope' as never)).toThrow(/Unknown route/)
  })
})
