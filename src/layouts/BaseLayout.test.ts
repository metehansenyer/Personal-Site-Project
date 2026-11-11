import { describe, it, expect, vi, afterEach } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import BaseLayout from './BaseLayout.astro'
import { socialLinks } from '@/data/socialLinks'
import { loadSiteContent } from '@/test/siteContent'

vi.mock('astro:content', async () => (await import('@/test/siteContent')).astroContentMock)

const content = loadSiteContent()

async function render(props: Record<string, unknown> = {}, route = '/about/') {
  const container = await AstroContainer.create()
  return container.renderToString(BaseLayout, {
    props,
    request: new Request(`http://localhost:4321${route}`),
    slots: { default: '<main>content</main>' },
  })
}

afterEach(() => vi.unstubAllEnvs())

describe('BaseLayout', () => {
  it('emits canonical, og:image and twitter:card, and is indexable by default', async () => {
    const html = await render()
    expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/about">/)
    expect(html).toMatch(/<meta property="og:image" content="https?:\/\/[^"]+\.png/)
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image">')
    expect(html).not.toContain('name="robots"')
  })

  it('noindex adds the robots meta and drops canonical and og:url', async () => {
    const html = await render({ noindex: true })
    expect(html).toContain('<meta name="robots" content="noindex">')
    expect(html).not.toContain('rel="canonical"')
    expect(html).not.toContain('property="og:url"')
  })

  it('emits JSON-LD only with the jsonLd prop, with sameAs from socialLinks', async () => {
    expect(await render()).not.toContain('application/ld+json')
    const html = await render({ jsonLd: true })
    const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
    expect(json).toBeDefined()
    const data = JSON.parse(json!)
    expect(data['@type']).toBe('Person')
    expect(data.sameAs).toEqual(socialLinks.map((l) => l.url))
  })

  it('takes lang, og:locale, the default description and the JSON-LD job title from the content', async () => {
    const html = await render({ jsonLd: true })
    expect(html).toContain(`<html lang="${content.lang}">`)
    expect(html).toContain(`<meta property="og:locale" content="${content.ogLocale}">`)
    expect(html).toContain(`<meta name="description" content="${content.description}">`)
    expect(html).toContain(JSON.stringify(content.jsonLd.jobTitle).slice(1, -1))
  })

  it('uses an explicit description instead of the default', async () => {
    const html = await render({ description: 'Custom text' })
    expect(html).toContain('<meta name="description" content="Custom text">')
    expect(html).not.toContain(content.description)
  })

  it('loads no third-party script other than Umami (production)', async () => {
    vi.stubEnv('PROD', true)
    const html = await render()
    const hosts = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((src) => /^(https?:)?\/\//.test(src))
      .map((src) => new URL(src, 'https://x').host)
    expect(hosts).toEqual(['umami.metehansenyer.dev'])
  })

  it('loads no external script at all outside production', async () => {
    vi.stubEnv('PROD', false)
    expect(await render()).not.toMatch(/<script[^>]*\ssrc="(https?:)?\/\//)
  })

  describe('locales', () => {
    const en = loadSiteContent('en')
    const link = (html: string, hreflang: string) =>
      html.match(new RegExp(`<link rel="alternate" hreflang="${hreflang}" href="([^"]+)">`))?.[1]

    it('emits hreflang tr / en / x-default (x-default = the Turkish URL) on a Turkish page', async () => {
      const html = await render({}, '/about/')
      expect(link(html, 'tr')).toMatch(/^https?:\/\/[^/]+\/about$/)
      expect(link(html, 'en')).toMatch(/^https?:\/\/[^/]+\/en\/about$/)
      expect(link(html, 'x-default')).toBe(link(html, 'tr'))
      expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/about">/)
    })

    it('has the same alternates and an own-locale canonical on an English page', async () => {
      const html = await render({ locale: 'en' }, '/en/about/')
      expect(link(html, 'tr')).toMatch(/\/about$/)
      expect(link(html, 'en')).toMatch(/\/en\/about$/)
      expect(link(html, 'x-default')).toBe(link(html, 'tr'))
      expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/en\/about">/)
      expect(html).toMatch(/<meta property="og:url" content="https?:\/\/[^"]+\/en\/about">/)
    })

    it('handles the English home page (/en, no trailing slash)', async () => {
      const html = await render({ locale: 'en', showChrome: false }, '/en/')
      expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/en">/)
      expect(link(html, 'tr')).toMatch(/^https?:\/\/[^/]+\/$/)
    })

    it('sets lang, og:locale and og:locale:alternate per locale', async () => {
      const tr = await render({}, '/about/')
      expect(tr).toContain('<html lang="tr">')
      expect(tr).toContain('<meta property="og:locale" content="tr_TR">')
      expect(tr).toContain('<meta property="og:locale:alternate" content="en_US">')
      const html = await render({ locale: 'en' }, '/en/about/')
      expect(html).toContain('<html lang="en">')
      expect(html).toContain('<meta property="og:locale" content="en_US">')
      expect(html).toContain('<meta property="og:locale:alternate" content="tr_TR">')
      expect(html).toContain(`<meta name="description" content="${en.description}">`)
    })

    it('localizes the JSON-LD job title', async () => {
      const html = await render({ locale: 'en', jsonLd: true }, '/en/')
      expect(html).toContain('Software Engineering Student')
    })

    it('renders the language switcher in the header, or in a corner without chrome', async () => {
      const withChrome = await render({ locale: 'en' }, '/en/about/')
      expect(withChrome.match(/role="group"/g)).toHaveLength(2) // desktop + mobile header
      expect(withChrome).toContain('aria-label="Language"')
      const home = await render({ showChrome: false }, '/')
      expect(home.match(/role="group"/g)).toHaveLength(1)
      expect(home).toContain('aria-label="Dil seçimi"')
    })

    it('noindex pages (404) have no alternates and no switcher', async () => {
      const html = await render({ noindex: true }, '/404/')
      expect(html).not.toContain('hreflang')
      expect(html).not.toContain('og:locale:alternate')
      expect(html).not.toContain('role="group"')
      expect(html).toContain('<meta name="robots" content="noindex">')
    })
  })
})
