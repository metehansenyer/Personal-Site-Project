import { describe, it, expect } from 'vitest'
import { z } from 'astro/zod'
import { projectSchema } from './projectSchema'

// Stand-in for Astro's `image()` helper (the real one needs the build pipeline).
const schema = projectSchema((() => z.any()) as never)

const valid = {
  title: 'Demo',
  description: 'Text',
  banner: 'x.png',
  technologies: ['typescript'],
  releaseDate: '2025-01-02',
}

describe('projectSchema', () => {
  it('applies defaults: tools [], draft false, optional fields unset', () => {
    const data = schema.parse(valid)
    expect(data.tools).toEqual([])
    expect(data.draft).toBe(false)
    expect(data.repoUrl).toBeUndefined()
    expect(data.releaseDate).toBeInstanceOf(Date)
  })

  it('rejects an unknown or misspelled key', () => {
    expect(() => schema.parse({ ...valid, releasedate: '2025-01-02' })).toThrow()
    expect(() => schema.parse({ ...valid, userName: 'someone' })).toThrow()
  })

  it('rejects unknown icon slugs in technologies and tools', () => {
    expect(() => schema.parse({ ...valid, technologies: ['nope'] })).toThrow()
    expect(() => schema.parse({ ...valid, tools: ['nope'] })).toThrow()
  })

  it('requires repoUrl and demoUrl to be URLs when set', () => {
    expect(schema.parse({ ...valid, repoUrl: 'https://github.com/a/b' }).repoUrl).toBe(
      'https://github.com/a/b',
    )
    expect(() => schema.parse({ ...valid, repoUrl: 'a/b' })).toThrow()
    expect(() => schema.parse({ ...valid, demoUrl: 'not a url' })).toThrow()
  })

  it('accepts order, updatedDate, heading, bannerAlt and draft', () => {
    const data = schema.parse({
      ...valid,
      order: 1,
      updatedDate: '2025-03-04',
      heading: 'Long',
      bannerAlt: 'Alt',
      draft: true,
    })
    expect(data.order).toBe(1)
    expect(data.updatedDate).toBeInstanceOf(Date)
    expect(data.draft).toBe(true)
  })
})
