import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import type { CollectionEntry } from 'astro:content'
import ProjectCard from './ProjectCard.astro'
import banner from '@/assets/img/polyval.png'

function makeProject(technologies: string[]) {
  return {
    id: 'My-Repo',
    collection: 'projects',
    data: {
      userName: 'someone',
      title: 'Demo project',
      description: 'Demo description',
      banner,
      technologies,
      releaseDate: new Date('2024-01-01'),
    },
  } as unknown as CollectionEntry<'projects'>
}

async function render(props: Record<string, unknown> = {}, technologies = ['javascript']) {
  const container = await AstroContainer.create()
  return container.renderToString(ProjectCard, {
    props: { project: makeProject(technologies), ...props },
  })
}

const img = (html: string) => html.match(/<img[^>]*>/)?.[0] ?? ''

describe('ProjectCard', () => {
  it('links to the project detail page by entry id', async () => {
    expect(await render()).toContain('href="/portfolio/My-Repo"')
  })

  it('priority loads eagerly with high fetch priority', async () => {
    const tag = img(await render({ loading: 'priority' }))
    expect(tag).toContain('loading="eager"')
    expect(tag).toContain('fetchpriority="high"')
  })

  it('eager loads eagerly without high fetch priority', async () => {
    const tag = img(await render({ loading: 'eager' }))
    expect(tag).toContain('loading="eager"')
    expect(tag).not.toContain('fetchpriority')
  })

  it('lazy is the default and does not raise fetch priority', async () => {
    for (const props of [{}, { loading: 'lazy' }]) {
      const tag = img(await render(props))
      expect(tag).toContain('loading="lazy"')
      expect(tag).not.toContain('fetchpriority="high"')
    }
  })

  it('shows at most 3 tags plus "+N" in the mobile row', async () => {
    const html = await render({}, ['javascript', 'nodejs', 'python', 'html', 'css'])
    const row = html.match(/<div class="mt-3 flex[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? ''
    expect(row.match(/<span/g)).toHaveLength(4)
    expect(row).toContain('+2')
  })

  it('shows no "+N" with 3 tags or fewer', async () => {
    const html = await render({}, ['javascript', 'nodejs', 'python'])
    const row = html.match(/<div class="mt-3 flex[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? ''
    expect(row.match(/<span/g)).toHaveLength(3)
    expect(row).not.toContain('+')
  })
})
