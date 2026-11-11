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

const translations: { id: string; data: Record<string, string> }[] = []

vi.mock('astro:content', () => ({
  getCollection: async (name: string) => (name === 'projects' ? collection : translations),
  render: async () => ({}),
}))

const { getProjects, sortProjects, lastModified, getBannerAlt, localizeProjects } =
  await import('./projects')

afterEach(() => {
  vi.unstubAllEnvs()
  translations.length = 0
})

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
    expect((await getProjects('tr', { includeDrafts: true })).map((p) => p.id)).toContain(
      'draft-new',
    )
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

describe('localizeProjects / getProjects(locale)', () => {
  const canonical = [
    {
      id: 'Alpha',
      data: {
        title: 'Alfa',
        description: 'Aciklama',
        heading: 'Uzun Baslik',
        bannerAlt: 'Afis',
        contactNote: 'Not',
        technologies: ['python'],
        draft: false,
        releaseDate: d('2024-01-01'),
      },
    },
    {
      id: 'Beta',
      data: { title: 'Beta', description: 'Betim', draft: false, releaseDate: d('2023-01-01') },
    },
  ]
  const tr = (id: string, data: Record<string, string>) => ({ id: `en/${id}`, data })

  it('is the canonical content for the default locale (translations are ignored)', () => {
    const [alpha] = localizeProjects(canonical, [tr('Alpha', { title: 'Alpha' })], 'tr')
    expect(alpha).toMatchObject({
      id: 'Alpha',
      locale: 'tr',
      contentLocale: 'tr',
      translated: true,
      bodyEntry: canonical[0],
    })
    expect(alpha.data).toBe(canonical[0].data)
  })

  it('overlays only the text fields of a translation and keeps every other field canonical', () => {
    const translation = tr('Alpha', { title: 'Alpha', description: 'Description' })
    const [alpha] = localizeProjects(canonical, [translation], 'en')
    expect(alpha).toMatchObject({ locale: 'en', contentLocale: 'en', translated: true })
    expect(alpha.bodyEntry).toBe(translation)
    expect(alpha.data).toMatchObject({
      title: 'Alpha',
      description: 'Description',
      technologies: ['python'],
      releaseDate: d('2024-01-01'),
    })
    // heading / bannerAlt / contactNote are Turkish texts: never inherited by a translation
    expect(alpha.data.heading).toBeUndefined()
    expect(alpha.data.bannerAlt).toBeUndefined()
    expect(alpha.data.contactNote).toBeUndefined()
  })

  it('uses translated heading, bannerAlt and contactNote when given', () => {
    const [alpha] = localizeProjects(
      canonical,
      [
        tr('Alpha', {
          title: 'A',
          description: 'D',
          heading: 'H',
          bannerAlt: 'B',
          contactNote: 'N',
        }),
      ],
      'en',
    )
    expect(alpha.data).toMatchObject({ heading: 'H', bannerAlt: 'B', contactNote: 'N' })
  })

  it('falls back to the canonical content when a locale has no translation', () => {
    const [, beta] = localizeProjects(canonical, [tr('Alpha', { title: 'A' })], 'en')
    expect(beta).toMatchObject({
      id: 'Beta',
      locale: 'en',
      contentLocale: 'tr',
      translated: false,
      bodyEntry: canonical[1],
    })
    expect(beta.data.title).toBe('Beta')
  })

  it('fails with a clear message for a translation without a canonical project', () => {
    expect(() => localizeProjects(canonical, [tr('Gamma', { title: 'G' })], 'en')).toThrow(
      /project-translations\/en\/Gamma\.mdx has no canonical project: src\/content\/projects\/Gamma\.mdx does not exist/,
    )
    // the id is case-sensitive, like the canonical file name
    expect(() => localizeProjects(canonical, [tr('alpha', { title: 'a' })], 'en')).toThrow(
      /no canonical project/,
    )
  })

  it('validates translations of every locale, not only the requested one', () => {
    expect(() => localizeProjects(canonical, [tr('Gamma', { title: 'G' })], 'tr')).toThrow(
      /no canonical project/,
    )
  })

  it('fails for a translation folder that is not a translation locale', () => {
    expect(() => localizeProjects(canonical, [{ id: 'xx/Alpha', data: {} }], 'en')).toThrow(
      /"xx" is not a translation locale/,
    )
    expect(() => localizeProjects(canonical, [{ id: 'tr/Alpha', data: {} }], 'en')).toThrow(
      /"tr" is not a translation locale/,
    )
  })

  it('getProjects(locale) merges the collections, sorts, and fails on an orphan', async () => {
    vi.stubEnv('PROD', true)
    translations.push({ id: 'en/first', data: { title: 'First', description: 'D' } })
    const en = await getProjects('en')
    expect(en.map((p) => [p.id, p.translated])).toEqual([
      ['first', true],
      ['second', false],
      ['z-2024', false],
      ['a-2023', false],
      ['b-2023', false],
    ])
    expect(en[0].data.title).toBe('First')
    translations.push({ id: 'en/nope', data: { title: 'x', description: 'x' } })
    await expect(getProjects('en')).rejects.toThrow(/no canonical project/)
  })
})
