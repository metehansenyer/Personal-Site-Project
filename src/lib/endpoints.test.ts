import { describe, it, expect, vi } from 'vitest'
import { SITE_URL } from '@/lib/site'

vi.mock('astro:content', () => ({
  getCollection: async () => [
    { id: 'old', data: { releaseDate: new Date('2023-01-02T00:00:00Z') } },
    { id: 'new', data: { releaseDate: new Date('2024-05-06T00:00:00Z') } },
  ],
}))

// The endpoints ignore their context argument.
const ctx = {} as never

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
  it('lists static routes, then projects newest first, without changefreq/priority', async () => {
    const { GET } = await import('@/pages/sitemap.xml')
    const xml = await (await GET(ctx)).text()
    const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
    expect(locs).toEqual([
      SITE_URL,
      `${SITE_URL}/about`,
      `${SITE_URL}/portfolio`,
      `${SITE_URL}/contact`,
      `${SITE_URL}/portfolio/new`,
      `${SITE_URL}/portfolio/old`,
    ])
    expect(xml).not.toContain('changefreq')
    expect(xml).not.toContain('priority')
    // lastmod only for projects
    expect(xml.match(/<lastmod>/g)).toHaveLength(2)
    expect(xml).toContain('<lastmod>2024-05-06T00:00:00.000Z</lastmod>')
  })
})
