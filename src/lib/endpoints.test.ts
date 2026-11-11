import { describe, it, expect, vi, afterEach } from 'vitest'
import { SITE_URL } from '@/lib/site'

vi.mock('astro:content', () => ({
  getCollection: async (name: string) => (name === 'projects' ? projects : []),
}))

const projects = [
  { id: 'old', data: { releaseDate: new Date('2023-01-02T00:00:00Z'), draft: false } },
  {
    id: 'updated',
    data: {
      releaseDate: new Date('2023-06-01T00:00:00Z'),
      updatedDate: new Date('2025-02-03T00:00:00Z'),
      draft: false,
    },
  },
  { id: 'new', data: { releaseDate: new Date('2024-05-06T00:00:00Z'), draft: false } },
  { id: 'wip', data: { releaseDate: new Date('2025-01-01T00:00:00Z'), draft: true } },
]

// The endpoints ignore their context argument.
const ctx = {} as never

afterEach(() => vi.unstubAllEnvs())

describe('robots.txt endpoint', () => {
  it('points the Sitemap line at SITE_URL', async () => {
    const { GET } = await import('@/pages/robots.txt')
    const res = await GET(ctx)
    expect(res.headers.get('Content-Type')).toBe('text/plain')
    const body = await res.text()
    expect(body).toContain('User-agent: *\nAllow: /')
    expect(body).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)
  })
})

describe('sitemap.xml endpoint', () => {
  async function sitemap() {
    const { GET } = await import('@/pages/sitemap.xml')
    return (await GET(ctx)).text()
  }
  const locs = (xml: string) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
  const paths = [
    '/',
    '/about',
    '/portfolio',
    '/contact',
    '/portfolio/new',
    '/portfolio/updated',
    '/portfolio/old',
  ]
  const url = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)
  const en = (path: string) => (path === '/' ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`)

  it('lists every page in both locales (Turkish unchanged, English under /en), projects newest first', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    expect(locs(xml)).toEqual(paths.flatMap((p) => [url(p), en(p)]))
    expect(xml).not.toContain('changefreq')
    expect(xml).not.toContain('priority')
  })

  it('declares the xhtml namespace and links each URL to all its alternates plus x-default', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    const block = (loc: string) =>
      xml.match(new RegExp(`<url>\\n<loc>${loc}</loc>\\n([\\s\\S]*?)</url>`))?.[1] ?? ''
    for (const p of ['/about', '/en/about'].map((x) =>
      x === '/about' ? url(x) : `${SITE_URL}${x}`,
    )) {
      const links = [
        ...block(p).matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="([^"]+)" \/>/g),
      ]
      expect(links.map((m) => [m[1], m[2]])).toEqual([
        ['tr', `${SITE_URL}/about`],
        ['en', `${SITE_URL}/en/about`],
        ['x-default', `${SITE_URL}/about`],
      ])
    }
    expect(block(en('/'))).toContain(`hreflang="en" href="${SITE_URL}/en"`)
  })

  it('sets lastmod only for projects (both locales)', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    expect(xml.match(/<lastmod>/g)).toHaveLength(6)
    expect(xml).toContain('<lastmod>2024-05-06T00:00:00.000Z</lastmod>')
  })

  it('uses updatedDate for lastmod when present, else the release date', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    const entry = (loc: string) =>
      xml.match(new RegExp(`<loc>${loc}</loc>[\\s\\S]*?<lastmod>(.*?)</lastmod>`))?.[1]
    for (const prefix of [SITE_URL, `${SITE_URL}/en`]) {
      expect(entry(`${prefix}/portfolio/updated`)).toBe('2025-02-03T00:00:00.000Z')
      expect(entry(`${prefix}/portfolio/old`)).toBe('2023-01-02T00:00:00.000Z')
    }
  })

  it('leaves drafts out of production builds but lists them in dev', async () => {
    vi.stubEnv('PROD', true)
    expect(locs(await sitemap())).not.toContain(`${SITE_URL}/portfolio/wip`)
    vi.stubEnv('PROD', false)
    const dev = locs(await sitemap())
    expect(dev).toContain(`${SITE_URL}/portfolio/wip`)
    expect(dev).toContain(`${SITE_URL}/en/portfolio/wip`)
  })
})
