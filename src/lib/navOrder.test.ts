import { describe, it, expect } from 'vitest'
import { loadSiteContent } from '@/test/siteContent'
import { getRouteLabels } from './content'
import { DEFAULT_ORDER, getNavItems, normalizePath, parseStoredOrder, swapOrder } from './navOrder'

const DEFAULT = ['/about', '/portfolio', '/contact']
const labels = getRouteLabels(loadSiteContent())

describe('DEFAULT_ORDER', () => {
  it('lists the nav routes in routes.ts order, without the home page', () => {
    expect([...DEFAULT_ORDER]).toEqual(DEFAULT)
  })
})

describe('normalizePath', () => {
  it('keeps paths without a trailing slash', () => {
    expect(normalizePath('/about')).toBe('/about')
  })
  it('strips one or many trailing slashes', () => {
    expect(normalizePath('/about/')).toBe('/about')
    expect(normalizePath('/about///')).toBe('/about')
  })
  it('keeps the root as "/"', () => {
    expect(normalizePath('/')).toBe('/')
    expect(normalizePath('///')).toBe('/')
  })
  it('maps the empty string to "/"', () => {
    expect(normalizePath('')).toBe('/')
  })
  it('only strips trailing slashes', () => {
    expect(normalizePath('/portfolio/foo/')).toBe('/portfolio/foo')
  })
})

describe('parseStoredOrder', () => {
  it('returns a copy of the default for null or empty input', () => {
    const result = parseStoredOrder(null, DEFAULT)
    expect(result).toEqual(DEFAULT)
    expect(result).not.toBe(DEFAULT)
    expect(parseStoredOrder('', DEFAULT)).toEqual(DEFAULT)
  })
  it('accepts a valid permutation', () => {
    const stored = ['/contact', '/about', '/portfolio']
    expect(parseStoredOrder(JSON.stringify(stored), DEFAULT)).toEqual(stored)
  })
  it('accepts the default order itself', () => {
    expect(parseStoredOrder(JSON.stringify(DEFAULT), DEFAULT)).toEqual(DEFAULT)
  })
  it('falls back on invalid JSON', () => {
    expect(parseStoredOrder('{not json', DEFAULT)).toEqual(DEFAULT)
  })
  it.each(['{}', '"/about"', '42', 'true', 'null', '{"0":"/about"}'])(
    'falls back on non-array JSON %s',
    (raw) => {
      expect(parseStoredOrder(raw, DEFAULT)).toEqual(DEFAULT)
    },
  )
  it('falls back on wrong length', () => {
    expect(parseStoredOrder(JSON.stringify(['/about', '/portfolio']), DEFAULT)).toEqual(DEFAULT)
    expect(parseStoredOrder(JSON.stringify([...DEFAULT, '/about']), DEFAULT)).toEqual(DEFAULT)
    expect(parseStoredOrder('[]', DEFAULT)).toEqual(DEFAULT)
  })
  it('falls back on unknown members', () => {
    expect(parseStoredOrder(JSON.stringify(['/about', '/portfolio', '/nope']), DEFAULT)).toEqual(
      DEFAULT,
    )
  })
  it('falls back on duplicate members', () => {
    expect(parseStoredOrder(JSON.stringify(['/about', '/about', '/contact']), DEFAULT)).toEqual(
      DEFAULT,
    )
  })
  it('falls back on non-string members', () => {
    expect(parseStoredOrder(JSON.stringify(['/about', '/portfolio', 3]), DEFAULT)).toEqual(DEFAULT)
    expect(parseStoredOrder(JSON.stringify(['/about', '/portfolio', null]), DEFAULT)).toEqual(
      DEFAULT,
    )
  })
  it('does not mutate or alias the default order', () => {
    const def = [...DEFAULT]
    const result = parseStoredOrder(null, def)
    result.reverse()
    expect(def).toEqual(DEFAULT)
  })
})

describe('swapOrder', () => {
  it('swaps previous and current when both are nav paths', () => {
    expect(swapOrder(DEFAULT, '/about', '/contact')).toEqual(['/contact', '/portfolio', '/about'])
    expect(swapOrder(DEFAULT, '/contact', '/about')).toEqual(['/contact', '/portfolio', '/about'])
  })
  it('swaps adjacent entries', () => {
    expect(swapOrder(DEFAULT, '/about', '/portfolio')).toEqual(['/portfolio', '/about', '/contact'])
  })
  it('ignores trailing slashes on either side', () => {
    expect(swapOrder(DEFAULT, '/about/', '/contact/')).toEqual(['/contact', '/portfolio', '/about'])
  })
  it('does not change anything when prevPath is null', () => {
    expect(swapOrder(DEFAULT, null, '/about')).toEqual(DEFAULT)
  })
  it('does not change anything for an empty prevPath', () => {
    expect(swapOrder(DEFAULT, '', '/about')).toEqual(DEFAULT)
  })
  it('does not change anything when prev equals current (also with a trailing slash)', () => {
    expect(swapOrder(DEFAULT, '/about', '/about')).toEqual(DEFAULT)
    expect(swapOrder(DEFAULT, '/about/', '/about')).toEqual(DEFAULT)
  })
  it('does not change anything when prev is not a nav path', () => {
    expect(swapOrder(DEFAULT, '/', '/about')).toEqual(DEFAULT)
    expect(swapOrder(DEFAULT, '/portfolio/polyval', '/about')).toEqual(DEFAULT)
  })
  it('does not change anything when current is not a nav path', () => {
    expect(swapOrder(DEFAULT, '/about', '/')).toEqual(DEFAULT)
    expect(swapOrder(DEFAULT, '/about', '/404')).toEqual(DEFAULT)
  })
  it('returns a new array and does not mutate the input', () => {
    const input = [...DEFAULT]
    const unchanged = swapOrder(input, null, '/about')
    expect(unchanged).not.toBe(input)
    const swapped = swapOrder(input, '/about', '/contact')
    expect(swapped).not.toBe(input)
    expect(input).toEqual(DEFAULT)
  })
})

describe('getNavItems', () => {
  it('puts Home first and omits the current page', () => {
    expect(getNavItems('/about', labels)).toEqual([
      { href: '/', label: 'Ana Sayfa' },
      { href: '/portfolio', label: 'Portföy' },
      { href: '/contact', label: 'İletişim' },
    ])
  })
  it('omits the current page for every nav path', () => {
    for (const path of DEFAULT_ORDER) {
      const hrefs = getNavItems(path, labels).map((i) => i.href)
      expect(hrefs[0]).toBe('/')
      expect(hrefs).not.toContain(path)
      expect(hrefs).toHaveLength(DEFAULT_ORDER.length)
    }
  })
  it('normalizes trailing slashes in the pathname', () => {
    expect(getNavItems('/contact/', labels).map((i) => i.href)).toEqual([
      '/',
      '/about',
      '/portfolio',
    ])
  })
  it('lists all nav pages on the home page and on non-nav pages', () => {
    const all = ['/', '/about', '/portfolio', '/contact']
    expect(getNavItems('/', labels).map((i) => i.href)).toEqual(all)
    expect(getNavItems('/portfolio/polyval', labels).map((i) => i.href)).toEqual(all)
  })
})

/**
 * NavOrderScript.astro serializes these functions with Function.prototype.toString() into
 * an inline <script>, where module scope does not exist. Rebuilding each one from its
 * source in isolation fails if a function starts to reference an import, a module-level
 * value or another function.
 */
describe('toString() serialization contract (inline script)', () => {
  const rebuild = <T>(fn: unknown): T => new Function(`'use strict'; return (${String(fn)})`)() as T

  it('normalizePath works when rebuilt in isolation', () => {
    const f = rebuild<typeof normalizePath>(normalizePath)
    expect(f('/about/')).toBe('/about')
    expect(f('/')).toBe('/')
    expect(f('')).toBe('/')
  })

  it('parseStoredOrder works when rebuilt in isolation', () => {
    const f = rebuild<typeof parseStoredOrder>(parseStoredOrder)
    expect(f(null, DEFAULT)).toEqual(DEFAULT)
    expect(f('nope', DEFAULT)).toEqual(DEFAULT)
    expect(f('["/contact","/about","/portfolio"]', DEFAULT)).toEqual([
      '/contact',
      '/about',
      '/portfolio',
    ])
    expect(f('["/about","/about","/contact"]', DEFAULT)).toEqual(DEFAULT)
  })

  it('swapOrder works when rebuilt in isolation', () => {
    const f = rebuild<typeof swapOrder>(swapOrder)
    expect(f(DEFAULT, '/about/', '/contact')).toEqual(['/contact', '/portfolio', '/about'])
    expect(f(DEFAULT, null, '/contact')).toEqual(DEFAULT)
    expect(f(DEFAULT, '/', '/contact')).toEqual(DEFAULT)
  })

  it('the serialized sources are plain function expressions', () => {
    for (const fn of [normalizePath, parseStoredOrder, swapOrder]) {
      expect(String(fn)).toMatch(/^function\s/)
    }
  })
})
