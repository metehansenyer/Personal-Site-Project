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
})
