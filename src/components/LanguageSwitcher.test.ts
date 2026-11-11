import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import LanguageSwitcher from './LanguageSwitcher.astro'
import { getAlternates } from '@/lib/i18n'

async function render(current: 'tr' | 'en', path: string) {
  const container = await AstroContainer.create()
  return container.renderToString(LanguageSwitcher, {
    props: { current, alternates: getAlternates(path), label: 'Language' },
  })
}
const links = (html: string) => [...html.matchAll(/<a\s[^>]*>/g)].map((m) => m[0])

describe('LanguageSwitcher', () => {
  it('is a labelled group with a TR and an EN link to the same page', async () => {
    const html = await render('tr', '/about')
    expect(html).toContain('role="group"')
    expect(html).toContain('aria-label="Language"')
    const [tr, en] = links(html)
    expect(tr).toContain('href="/about"')
    expect(en).toContain('href="/en/about"')
    expect(html).toMatch(/>\s*TR\s*</)
    expect(html).toMatch(/>\s*EN\s*</)
  })

  it('sets lang, hreflang and the language name as the accessible name', async () => {
    const [tr, en] = links(await render('tr', '/about'))
    expect(tr).toContain('lang="tr"')
    expect(tr).toContain('hreflang="tr"')
    expect(tr).toContain('aria-label="Türkçe"')
    expect(en).toContain('lang="en"')
    expect(en).toContain('hreflang="en"')
    expect(en).toContain('aria-label="English"')
  })

  it('marks only the current language with aria-current="true"', async () => {
    const tr = links(await render('tr', '/about'))
    expect(tr[0]).toContain('aria-current="true"')
    expect(tr[1]).not.toContain('aria-current')
    const en = links(await render('en', '/en/about'))
    expect(en[0]).not.toContain('aria-current')
    expect(en[1]).toContain('aria-current="true"')
  })

  it('links the home page pair as / and /en', async () => {
    const [tr, en] = links(await render('en', '/en'))
    expect(tr).toContain('href="/"')
    expect(en).toContain('href="/en"')
  })
})
