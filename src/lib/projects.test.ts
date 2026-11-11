import { describe, it, expect, vi, afterEach } from 'vitest'
import { loadSiteContent } from '@/test/siteContent'

type Fake = {
  id: string
  data: {
    releaseDate: Date
    order?: number
    draft: boolean
    updatedDate?: Date
    title: string
    bannerAlt?: string
  }
}
const d = (iso: string) => new Date(`${iso}T00:00:00Z`)
const project = (id: string, release: string, extra: Partial<Fake['data']> = {}): Fake => ({
  id,
  data: { releaseDate: d(release), draft: false, title: id, ...extra },
})

const collection: Fake[] = [
  project('b-2023', '2023-01-01'),
  project('z-2024', '2024-01-01'),
  project('first', '2020-01-01', { order: 1 }),
  project('second', '2019-01-01', { order: 2 }),
  project('draft-new', '2025-01-01', { draft: true }),
  project('a-2023', '2023-01-01'),
]

vi.mock('astro:content', () => ({ getCollection: async () => collection }))

const { getProjects, sortProjects, lastModified, getBannerAlt } = await import('./projects')

afterEach(() => vi.unstubAllEnvs())

describe('sortProjects', () => {
  it('puts projects with an order first (ascending), then release date descending, then id', () => {
    expect(sortProjects(collection).map((p) => p.id)).toEqual([
      'first',
      'second',
      'draft-new',
      'z-2024',
      'a-2023',
      'b-2023',
    ])
  })

  it('does not mutate its input', () => {
    const copy = [...collection]
    sortProjects(collection)
    expect(collection).toEqual(copy)
  })
})

describe('getProjects', () => {
  it('excludes drafts in production', async () => {
    vi.stubEnv('PROD', true)
    const ids = (await getProjects()).map((p) => p.id)
    expect(ids).not.toContain('draft-new')
    expect(ids).toHaveLength(5)
  })

  it('includes drafts in development', async () => {
    vi.stubEnv('PROD', false)
    expect((await getProjects()).map((p) => p.id)).toContain('draft-new')
  })

  it('includeDrafts overrides the environment', async () => {
    vi.stubEnv('PROD', true)
    expect((await getProjects({ includeDrafts: true })).map((p) => p.id)).toContain('draft-new')
  })
})

describe('lastModified', () => {
  it('is updatedDate when set, else releaseDate', () => {
    const p = project('x', '2024-01-01', { updatedDate: d('2025-05-05') })
    expect(lastModified(p)).toEqual(d('2025-05-05'))
    expect(lastModified(project('y', '2024-01-01'))).toEqual(d('2024-01-01'))
  })
})

describe('getBannerAlt', () => {
  const content = loadSiteContent()
  it('defaults to the localized "<title> banner" template', () => {
    expect(getBannerAlt(project('x', '2024-01-01', { title: 'Demo' }), content)).toBe('Demo banner')
  })
  it('prefers the project bannerAlt', () => {
    expect(
      getBannerAlt(project('x', '2024-01-01', { title: 'Demo', bannerAlt: 'Custom' }), content),
    ).toBe('Custom')
  })
})
