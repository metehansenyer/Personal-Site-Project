import { describe, it, expect, vi, afterEach } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import icons from '@/data/icons'
import type { IconSlug } from '@/data/icons'
import Icon from './Icon.astro'

async function render(slugs: string[]) {
  const container = await AstroContainer.create()
  return container.renderToString(Icon, { props: { slugs: slugs as IconSlug[] } })
}

describe('Icon - known slugs', () => {
  it('renders an anchor and img for a single known slug', async () => {
    const html = await render(['typescript'])
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.typescript.imgSrc)
    expect(html).toContain(`alt="${icons.typescript.name}"`)
  })

  it('renders multiple icons for multiple known slugs', async () => {
    const html = await render(['typescript', 'nextjs'])
    for (const slug of ['typescript', 'nextjs'] as const) {
      expect(html).toContain(icons[slug].url)
      expect(html).toContain(icons[slug].imgSrc)
    }
    expect(html.match(/<a /g)).toHaveLength(2)
  })

  it('wraps icons in a container div', async () => {
    const html = await render(['python'])
    expect(html).toMatch(/<div[^>]*class="[^"]*\bicon\b/)
    expect(html).toContain(icons.python.url)
  })

  it('renders anchor with target="_blank" and rel="noreferrer"', async () => {
    const html = await render(['react'])
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noreferrer"')
  })

  it('renders an empty container when given an empty slugs array', async () => {
    const html = await render([])
    expect(html).toContain('<div')
    expect(html).not.toContain('<a')
  })
})

describe('Icon - unknown slugs', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('skips unknown slugs and emits a console.warn', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = await render(['definitely-not-a-real-slug'])
    expect(html).not.toContain('definitely-not-a-real-slug')
    expect(html).not.toContain('<a')
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('definitely-not-a-real-slug'))
  })

  it('renders valid icons and skips invalid ones in a mixed array', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const html = await render(['typescript', 'bad-slug', 'nextjs'])
    expect(html).toContain(icons.typescript.url)
    expect(html).toContain(icons.nextjs.url)
    expect(html).not.toContain('bad-slug')
    expect(html.match(/<a /g)).toHaveLength(2)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('bad-slug'))
  })
})
