import { describe, it, expect } from 'vitest'
import {
  getAlternates,
  getLocaleFromPath,
  localeParam,
  localeStaticPaths,
  localizePath,
  stripLocale,
} from './i18n'

describe('getLocaleFromPath', () => {
  it('is Turkish (the default) for un-prefixed paths', () => {
    for (const p of ['/', '/about', '/portfolio/polyval', '/about/', '/entry', '/english'])
      expect(getLocaleFromPath(p)).toBe('tr')
  })
  it('is English for /en and everything below it, with or without a trailing slash', () => {
    for (const p of ['/en', '/en/', '/en/about', '/en/about/', '/en/portfolio/polyval'])
      expect(getLocaleFromPath(p)).toBe('en')
  })
})

describe('stripLocale', () => {
  it('removes the prefix and maps /en to /', () => {
    expect(stripLocale('/en')).toBe('/')
    expect(stripLocale('/en/')).toBe('/')
    expect(stripLocale('/en/about')).toBe('/about')
    expect(stripLocale('/en/portfolio/polyval/')).toBe('/portfolio/polyval')
  })
  it('keeps default-locale paths (trailing slash trimmed)', () => {
    expect(stripLocale('/')).toBe('/')
    expect(stripLocale('/about')).toBe('/about')
    expect(stripLocale('/about/')).toBe('/about')
    expect(stripLocale('/english')).toBe('/english')
  })
})

describe('localizePath', () => {
  it('leaves the default locale un-prefixed', () => {
    expect(localizePath('/', 'tr')).toBe('/')
    expect(localizePath('/about', 'tr')).toBe('/about')
    expect(localizePath('/portfolio/Personal-Site-Project', 'tr')).toBe(
      '/portfolio/Personal-Site-Project',
    )
  })
  it('prefixes other locales; the home page is /en without a trailing slash', () => {
    expect(localizePath('/', 'en')).toBe('/en')
    expect(localizePath('/about', 'en')).toBe('/en/about')
    expect(localizePath('/portfolio/polyval', 'en')).toBe('/en/portfolio/polyval')
  })
  it('converts between locales and is idempotent', () => {
    expect(localizePath('/en/about', 'tr')).toBe('/about')
    expect(localizePath('/en', 'tr')).toBe('/')
    expect(localizePath('/en/about', 'en')).toBe('/en/about')
    expect(localizePath('/about/', 'en')).toBe('/en/about')
  })
})

describe('getAlternates', () => {
  it('lists the same page in every locale, from either locale', () => {
    const about = [
      { locale: 'tr', path: '/about' },
      { locale: 'en', path: '/en/about' },
    ]
    expect(getAlternates('/about')).toEqual(about)
    expect(getAlternates('/en/about')).toEqual(about)
  })
  it('handles the home page', () => {
    expect(getAlternates('/')).toEqual([
      { locale: 'tr', path: '/' },
      { locale: 'en', path: '/en' },
    ])
    expect(getAlternates('/en')).toEqual(getAlternates('/'))
  })
})

describe('static paths', () => {
  it('has an undefined rest param for the default locale and the code for the others', () => {
    expect(localeParam('tr')).toBeUndefined()
    expect(localeParam('en')).toBe('en')
    expect(localeStaticPaths()).toEqual([
      { params: { locale: undefined }, props: { locale: 'tr' } },
      { params: { locale: 'en' }, props: { locale: 'en' } },
    ])
  })
})
