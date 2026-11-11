import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { projectTranslationSchema } from './projectTranslationSchema'
import { LOCALES, DEFAULT_LOCALE } from './locales'

describe('projectTranslationSchema', () => {
  const valid = { title: 'T', description: 'D' }

  it('requires title and description', () => {
    expect(projectTranslationSchema.safeParse(valid).success).toBe(true)
    expect(projectTranslationSchema.safeParse({ title: 'T' }).success).toBe(false)
    expect(projectTranslationSchema.safeParse({ description: 'D' }).success).toBe(false)
  })

  it('accepts the optional text fields', () => {
    const all = { ...valid, heading: 'H', bannerAlt: 'A', contactNote: 'N' }
    expect(projectTranslationSchema.parse(all)).toEqual(all)
  })

  it('rejects every shared (non-text) field and typos', () => {
    for (const extra of [
      { banner: 'x.png' },
      { technologies: ['python'] },
      { tools: [] },
      { releaseDate: '2024-01-01' },
      { order: 1 },
      { draft: true },
      { repoUrl: 'https://example.com' },
      { demoUrl: 'https://example.com' },
      { titel: 'x' },
    ]) {
      expect(projectTranslationSchema.safeParse({ ...valid, ...extra }).success).toBe(false)
    }
  })
})

describe('project-translations folder', () => {
  const root = new URL('../content/', import.meta.url)
  const canonical = readdirSync(new URL('projects/', root)).sort()

  it('has only configured, non-default locale folders', () => {
    const folders = readdirSync(new URL('project-translations/', root))
    for (const folder of folders) {
      expect(LOCALES as readonly string[]).toContain(folder)
      expect(folder).not.toBe(DEFAULT_LOCALE)
    }
  })

  it('only contains translations of existing projects (same file name)', () => {
    for (const locale of readdirSync(new URL('project-translations/', root))) {
      for (const file of readdirSync(new URL(`project-translations/${locale}/`, root))) {
        expect(canonical, `${locale}/${file}`).toContain(file)
      }
    }
  })
})
