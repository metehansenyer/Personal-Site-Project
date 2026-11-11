import { describe, it, expect, vi, afterEach } from 'vitest'
import { SITE_URL } from '@/lib/site'

vi.mock('astro:content', () => ({
  getCollection: async () => [
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
  ],
}))

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

  it('lists static routes, then projects newest first, without changefreq/priority', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    expect(locs(xml)).toEqual([
      SITE_URL,
      `${SITE_URL}/about`,
      `${SITE_URL}/portfolio`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/portfolio/new`,
      `${SITE_URL}/portfolio/updated`,
      `${SITE_URL}/portfolio/old`,
    ])
    expect(xml).not.toContain('changefreq')
    expect(xml).not.toContain('priority')
    // lastmod only for projects
    expect(xml.match(/<lastmod>/g)).toHaveLength(3)
    expect(xml).toContain('<lastmod>2024-05-06T00:00:00.000Z</lastmod>')
  })

  it('uses updatedDate for lastmod when present, else the release date', async () => {
    vi.stubEnv('PROD', true)
    const xml = await sitemap()
    const entry = (id: string) =>
      xml.match(new RegExp(`<loc>[^<]*/portfolio/${id}</loc>\\s*<lastmod>(.*?)</lastmod>`))?.[1]
    expect(entry('updated')).toBe('2025-02-03T00:00:00.000Z')
    expect(entry('old')).toBe('2023-01-02T00:00:00.000Z')
  })

  it('leaves drafts out of production builds but lists them in dev', async () => {
    vi.stubEnv('PROD', true)
    expect(locs(await sitemap())).not.toContain(`${SITE_URL}/portfolio/wip`)
    vi.stubEnv('PROD', false)
    expect(locs(await sitemap())).toContain(`${SITE_URL}/portfolio/wip`)
  })
})
