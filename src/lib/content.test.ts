import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { LOCALES } from './locales'
import { siteSchema } from './siteSchema'
import { format, splitTemplate } from './format'
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
