import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { LOCALES } from './locales'
import { siteSchema } from './siteSchema'
import { format, splitTemplate } from './format'
import { readFileSync } from 'node:fs'
import { loadSiteContent } from '@/test/siteContent'

describe('site content', () => {
  it('has one valid file for every locale and no file for an unlisted locale', () => {
    const files = readdirSync(new URL('../content/site/', import.meta.url)).sort()
    expect(files).toEqual(LOCALES.map((l) => `${l}.json`).sort())
    for (const locale of LOCALES) expect(() => loadSiteContent(locale)).not.toThrow()
  })

  it('rejects an unknown key (strict schema)', () => {
    const content = loadSiteContent()
    expect(() => siteSchema.parse({ ...content, extra: 'x' })).toThrow()
    expect(() =>
      siteSchema.parse({ ...content, footer: { ...content.footer, typo: 'x' } }),
    ).toThrow()
  })

  it('rejects a missing string', () => {
    const { description: _description, ...rest } = loadSiteContent()
    expect(() => siteSchema.parse(rest)).toThrow()
  })

  it('keeps the placeholders the components rely on', () => {
    const c = loadSiteContent()
    expect(c.footer.credit).toContain('{author}')
    expect(c.footer.credit).toContain('{heart}')
    expect(c.footer.analytics).toContain('{umami}')
    expect(c.project.bannerAlt).toContain('{title}')
    expect(c.about.photoAlt).toContain('{name}')
  })
})

/** Flattens the content to `path -> string` (arrays by index). */
function flatten(value: unknown, path = ''): Record<string, string> {
  if (typeof value === 'string') return { [path]: value }
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(value as object))
    Object.assign(out, flatten(v, path ? `${path}.${k}` : k))
  return out
}
const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
const raw = (locale: string) =>
  JSON.parse(readFileSync(new URL(`../content/site/${locale}.json`, import.meta.url), 'utf8'))

describe('locale parity', () => {
  const [base, ...others] = LOCALES
  const baseFlat = flatten(raw(base))

  for (const locale of others) {
    it(`${locale}.json has exactly the key structure of ${base}.json`, () => {
      const flat = flatten(raw(locale))
      // headline arrays may have a different number of lines: compare them by their parent key
      const norm = (keys: string[]) => [...new Set(keys.map((k) => k.replace(/\.\d+$/, '')))].sort()
      expect(norm(Object.keys(flat))).toEqual(norm(Object.keys(baseFlat)))
    })

    it(`${locale}.json keeps the {placeholders} of every ${base}.json string`, () => {
      const flat = flatten(raw(locale))
      for (const [key, text] of Object.entries(baseFlat)) {
        if (!(key in flat)) continue // arrays: covered by the structure test
        expect(placeholders(flat[key]), key).toEqual(placeholders(text))
      }
    })

    it(`${locale}.json declares its own lang and og locale`, () => {
      const c = loadSiteContent(locale)
      expect(c.lang).toBe(locale)
      expect(c.ogLocale).toMatch(new RegExp(`^${locale}_[A-Z]{2}$`))
    })
  }
})

describe('English content', () => {
  it('has the English labels and the headline', () => {
    const c = loadSiteContent('en')
    expect(c.lang).toBe('en')
    expect(c.ogLocale).toBe('en_US')
    expect(c.routes.about.label).toBe('Who Am I?')
    expect(c.home.headline.join(' ')).toBe('HERE I AM')
    expect(c.project.fallbackNotice).toBe(
      'This page is not available in English yet; showing the Turkish original.',
    )
  })
})

describe('format / splitTemplate', () => {
  it('fills known placeholders and keeps unknown ones', () => {
    expect(format('{a} and {b}', { a: 'x' })).toBe('x and {b}')
  })
  it('splits a template into text and token parts', () => {
    expect(splitTemplate('a {b} c{d}')).toEqual([
      { text: 'a ' },
      { token: 'b' },
      { text: ' c' },
      { token: 'd' },
    ])
    expect(splitTemplate('plain')).toEqual([{ text: 'plain' }])
  })
})
