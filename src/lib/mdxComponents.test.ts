import { describe, it, expect } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import icons from '@/data/icons'
import { loadSiteContent } from '@/test/siteContent'
import { createMdxComponents, projectIconSlugs } from './mdxComponents'

const content = loadSiteContent()
const project = { technologies: ['python', 'selenium'], tools: ['vscode', 'github'] } as never

const srcs = (html: string) => [...html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1])

async function render(component: never, props: Record<string, unknown> = {}) {
  const container = await AstroContainer.create()
  return container.renderToString(component, { props })
}

describe('projectIconSlugs', () => {
  it('lists technologies, then tools, without duplicates', () => {
    expect(projectIconSlugs({ technologies: ['python', 'git'], tools: ['git', 'github'] })).toEqual(
      ['python', 'git', 'github'],
    )
  })
})

describe('createMdxComponents - Icon', () => {
  const { Icon } = createMdxComponents(project, content)

  it('<Icon /> without slugs renders technologies then tools in order', async () => {
    expect(srcs(await render(Icon as never))).toEqual(
      ['python', 'selenium', 'vscode', 'github'].map(
        (slug) => icons[slug as keyof typeof icons].imgSrc,
      ),
    )
  })

  it('explicit slugs still win', async () => {
    expect(srcs(await render(Icon as never, { slugs: ['docker'] }))).toEqual([icons.docker.imgSrc])
  })

  it('an explicit empty list renders no icons', async () => {
    expect(srcs(await render(Icon as never, { slugs: [] }))).toEqual([])
  })
})

describe('createMdxComponents - Callout', () => {
  it('renders the localized label from the site content', async () => {
    const { Callout } = createMdxComponents(project, content)
    const html = await render(Callout as never, { type: 'warning' })
    expect(html).toContain(content.project.callouts.warning)
  })
})
