/**
 * Project list helpers: the single place that decides which projects exist and in what order.
 * Use `getProjects()` instead of `getCollection('projects')`.
 */
import { getCollection, type CollectionEntry } from 'astro:content'
import { format } from '@/lib/format'
import type { SiteContent } from '@/lib/siteSchema'

export type Project = CollectionEntry<'projects'>

type Sortable = { id: string; data: { order?: number; releaseDate: Date } }

/**
 * Projects with an `order` first (ascending), then the rest by release date (newest first).
 * Ties fall back to the id so the result never depends on file-system order.
 */
export function sortProjects<T extends Sortable>(projects: readonly T[]): T[] {
  const time = (p: T) => p.data.releaseDate.getTime()
  return [...projects].sort((a, b) => {
    const ao = a.data.order
    const bo = b.data.order
    if (ao !== undefined && bo !== undefined && ao !== bo) return ao - bo
    if ((ao !== undefined) !== (bo !== undefined)) return ao !== undefined ? -1 : 1
    return time(b) - time(a) || a.id.localeCompare(b.id)
  })
}

/**
 * All projects, sorted. Drafts are excluded in production builds and included in dev
 * (`includeDrafts` overrides that).
 */
export async function getProjects({
  includeDrafts = !import.meta.env.PROD,
}: { includeDrafts?: boolean } = {}): Promise<Project[]> {
  const all = await getCollection('projects')
  return sortProjects(includeDrafts ? all : all.filter((p) => !p.data.draft))
}

/** Banner alt text: the project's `bannerAlt`, else the localized `<title> banner` template. */
export const getBannerAlt = (
  project: { data: { title: string; bannerAlt?: string } },
  content: Pick<SiteContent, 'project'>,
): string =>
  project.data.bannerAlt ?? format(content.project.bannerAlt, { title: project.data.title })

/** Sitemap `lastmod` of a project. */
export const lastModified = (project: { data: { releaseDate: Date; updatedDate?: Date } }): Date =>
  project.data.updatedDate ?? project.data.releaseDate
