import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import Header from './Header.astro'
import { getRouteLabels } from '@/lib/content'
import { getAlternates } from '@/lib/i18n'
import { loadSiteContent } from '@/test/siteContent'

const content = loadSiteContent()

async function render(pathname = '/about', locale: 'tr' | 'en' = 'tr', withSwitcher = false) {
  const c = loadSiteContent(locale)
  const container = await AstroContainer.create()
  return container.renderToString(Header, {
    props: {
      pageTitle: 'Hakkımda',
      pathname,
      navLabels: getRouteLabels(c),
      labels: c.header,
      switcher: withSwitcher
        ? { current: locale, alternates: getAlternates(pathname), label: c.languageSwitcher.label }
        : undefined,
    },
  })
}

describe('Header', () => {
  it('has no heading elements (the page owns the h1)', async () => {
    const html = await render()
    expect(html).not.toMatch(/<h[12][\s>]/)
  })

  it('renders the mobile nav panel closed, hidden and inert', async () => {
    const html = await render()
    const panel = html.match(/<nav[^>]*id="mobile-navigation"[^>]*>/)?.[0] ?? ''
    expect(panel).toMatch(/\binert\b/)
    expect(panel).toContain('aria-hidden="true"')
  })

  it('wires the button to the panel with aria-expanded=false', async () => {
    const html = await render()
    const button = html.match(/<button[^>]*>/)?.[0] ?? ''
    expect(button).toContain('aria-expanded="false"')
    expect(button).toContain('aria-controls="mobile-navigation"')
    expect(html).toContain('id="mobile-navigation"')
  })

  it('takes the menu button labels from the content', async () => {
    const html = await render()
    const button = html.match(/<button[^>]*>/)?.[0] ?? ''
    expect(button).toContain(`aria-label="${content.header.openMenu}"`)
    expect(button).toContain(`data-label-open="${content.header.closeMenu}"`)
    expect(button).toContain(`data-label-closed="${content.header.openMenu}"`)
  })

  it('lists Home and the other pages but not the current one', async () => {
    const html = await render('/about')
    const hrefs = [...html.matchAll(/<a href="([^"]+)"/g)].map((m) => m[1])
    expect(hrefs).toEqual(['/', '/portfolio', '/contact'])
  })

  it('keeps the nav links in the English locale under /en', async () => {
    const html = await render('/en/about', 'en')
    const hrefs = [...html.matchAll(/<a href="([^"]+)"/g)].map((m) => m[1])
    expect(hrefs).toEqual(['/en', '/en/portfolio', '/en/contact'])
    expect(html).toContain('aria-label="Open navigation"')
    expect(html).toContain('Portfolio')
  })

  it('renders the language switcher in the desktop and the mobile header when given', async () => {
    const html = await render('/en/about', 'en', true)
    expect(html.match(/role="group"/g)).toHaveLength(2)
    expect(html.match(/hreflang="tr" title="Türkçe"/g)).toHaveLength(2)
    expect(await render('/about')).not.toContain('role="group"')
  })
})
