/**
 * Components available inside project MDX (`<Icon />`, `<Callout>`), bound to one project
 * page: `<Icon />` without `slugs` renders that project's `technologies` followed by `tools`,
 * and `<Callout>` gets its labels from the site content. Created per page in
 * `pages/portfolio/[id].astro` and passed as `<Content components={...} />`.
 */
import { createComponent, render, renderComponent } from 'astro/compiler-runtime'
import Icon from '@/components/mdx/Icon.astro'
import Callout from '@/components/mdx/Callout.astro'
import type { IconSlug } from '@/data/icons'
import type { SiteContent } from '@/lib/siteSchema'

type AstroComponent = Parameters<typeof renderComponent>[2]

/** Wraps `Component` so that props the MDX does not pass fall back to `defaults`. */
function withDefaults(name: string, Component: AstroComponent, defaults: Record<string, unknown>) {
  return createComponent((result, props, slots) => {
    const given = Object.fromEntries(
      Object.entries(props as Record<string, unknown>).filter(([, v]) => v !== undefined),
    )
    return render`${renderComponent(result, name, Component, { ...defaults, ...given }, slots)}`
  })
}

/** Icons of a project page: `technologies`, then `tools`, without duplicates. */
export function projectIconSlugs(project: {
  technologies: readonly IconSlug[]
  tools: readonly IconSlug[]
}): IconSlug[] {
  return [...new Set([...project.technologies, ...project.tools])]
}

export function createMdxComponents(
  project: { technologies: readonly IconSlug[]; tools: readonly IconSlug[] },
  content: Pick<SiteContent, 'project'>,
) {
  return {
    Icon: withDefaults('Icon', Icon, { slugs: projectIconSlugs(project) }),
    Callout: withDefaults('Callout', Callout, { labels: content.project.callouts }),
  }
}
