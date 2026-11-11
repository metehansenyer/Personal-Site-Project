import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Footer from './Footer.astro'
import { loadSiteContent } from '@/test/siteContent'

const labels = loadSiteContent().footer

async function render(props = { labels }) {
  const container = await AstroContainer.create()
  return container.renderToString(Footer, { props })
}

/** Visible text of the rendered footer (test helper, not sanitization). */
const text = (html: string) => {
  let out = html.replace(/<svg[\s\S]*?<\/svg>/g, '{heart}').replace(/<\/p>/g, ' ')
  let previous
  do {
    previous = out
    out = out.replace(/<[^>]+>/g, '')
  } while (out !== previous)
  return out.replace(/\s+/g, ' ').trim()
}

describe('Footer', () => {
  it('renders the credit and analytics sentences from the content', async () => {
    const html = await render()
    expect(text(html)).toBe(
      'Metehan Şenyer tarafından {heart} ile kodlandı Bu site çerez kullanmayan ve kişisel veri toplamayan Umami Analytics kullanmaktadır.',
    )
  })

  it('places the markup at the template tokens', async () => {
    const html = await render({
      labels: { credit: '{heart} by {author}', analytics: '{umami}!', analyticsLink: 'Stats' },
    })
    expect(text(html)).toBe('{heart} by Metehan Şenyer Stats!')
    expect(html).toContain('href="https://umami.is"')
    expect(html).toContain('href="https://github.com/metehansenyer"')
  })
})
