/**
 * Project list helpers: the single place that decides which projects exist, in what order and
 * with which texts. Use `getProjects(locale)` instead of `getCollection('projects')`.
 *
 * `src/content/projects/<id>.mdx` is the canonical (Turkish) entry with every field. A locale
 * may add `src/content/project-translations/<locale>/<id>.mdx` with only the translatable text
 * fields and a translated body; `getProjects(locale)` returns a merged view of both.
 */
import { getCollection, render, type CollectionEntry } from 'astro:content'
import { format } from '@/lib/format'
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/locales'
import type { SiteContent } from '@/lib/siteSchema'

export type Project = CollectionEntry<'projects'>
export type ProjectTranslation = CollectionEntry<'projectTranslations'>

type Sortable = { id: string; data: { order?: number; releaseDate: Date } }

/** Fields a translation overrides. `heading` / `bannerAlt` / `contactNote` are NOT inherited. */
const TEXT_FIELDS = ['title', 'description', 'heading', 'bannerAlt', 'contactNote'] as const

/** A project as shown in one locale: canonical data with the translated text fields on top. */
export type LocalizedProject<
  P extends { id: string; data: object } = Project,
  B = Project | ProjectTranslation,
> = {
  id: string
  data: P['data']
  /** The locale the page is rendered for. */
  locale: Locale
  /** Language of the texts and the body (`locale` when translated, else the default locale). */
  contentLocale: Locale
  /** False when `locale` has no translation file and the default-locale content is shown. */
  translated: boolean
  /** The entry whose MDX body is rendered (the translation, or the canonical entry). */
  bodyEntry: B
}

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
 * Splits a translation id `<locale>/<id>` and checks it: the locale must be a configured,
 * non-default locale and `<id>` must be a canonical project. Throws a build error otherwise.
 */
function parseTranslationId(id: string, canonicalIds: ReadonlySet<string>) {
  const slash = id.indexOf('/')
  const locale = id.slice(0, slash)
  const projectId = id.slice(slash + 1)
  const file = `src/content/project-translations/${id}.mdx`
  if (!(LOCALES as readonly string[]).includes(locale) || locale === DEFAULT_LOCALE) {
    const allowed = LOCALES.filter((l) => l !== DEFAULT_LOCALE).join(', ')
    throw new Error(
      `Project translation ${file}: "${locale}" is not a translation locale (allowed folders: ${allowed}).`,
    )
  }
  if (!canonicalIds.has(projectId)) {
    throw new Error(
      `Project translation ${file} has no canonical project: src/content/projects/${projectId}.mdx does not exist (the file name must match exactly, case-sensitive).`,
    )
  }
  return { locale: locale as Locale, projectId }
}

/**
 * Merges the canonical projects with the translations for `locale` (pure; no drafts filtering
 * or sorting). Validates every translation file, whichever locale it belongs to, so an orphan
 * fails every build. Without a translation (or for the default locale) the canonical content
 * is used and `translated` is false (true for the default locale itself).
 */
export function localizeProjects<
  P extends { id: string; data: object },
  T extends { id: string; data: Partial<Record<(typeof TEXT_FIELDS)[number], string>> },
>(
  canonical: readonly P[],
  translations: readonly T[],
  locale: Locale,
): LocalizedProject<P, P | T>[] {
  const canonicalIds = new Set(canonical.map((p) => p.id))
  const byProject = new Map<string, T>()
  for (const t of translations) {
    const parsed = parseTranslationId(t.id, canonicalIds)
    if (parsed.locale === locale) byProject.set(parsed.projectId, t)
  }
  return canonical.map((project) => {
    const translation = locale === DEFAULT_LOCALE ? undefined : byProject.get(project.id)
    if (!translation) {
      return {
        id: project.id,
        data: project.data,
        locale,
        contentLocale: DEFAULT_LOCALE,
        translated: locale === DEFAULT_LOCALE,
        bodyEntry: project,
      }
    }
    const texts = Object.fromEntries(TEXT_FIELDS.map((f) => [f, translation.data[f]]))
    return {
      id: project.id,
      data: { ...project.data, ...texts } as P['data'],
      locale,
      contentLocale: locale,
      translated: true,
      bodyEntry: translation,
    }
  })
}

/**
 * All projects in `locale`, sorted. Drafts are excluded in production builds and included in
 * dev (`includeDrafts` overrides that). Throws if a translation file has no canonical project.
 */
export async function getProjects(
  locale: Locale = DEFAULT_LOCALE,
  { includeDrafts = !import.meta.env.PROD }: { includeDrafts?: boolean } = {},
): Promise<LocalizedProject[]> {
  const [all, translations] = await Promise.all([
    getCollection('projects'),
    getCollection('projectTranslations'),
  ])
  const localized = localizeProjects(all, translations, locale)
  return sortProjects(includeDrafts ? localized : localized.filter((p) => !p.data.draft))
}

/** Renders the MDX body of a project view (the translation when one exists). */
export const renderProject = (project: { bodyEntry: Project | ProjectTranslation }) =>
  render(project.bodyEntry)

/** Banner alt text: the project's `bannerAlt`, else the localized `<title> banner` template. */
export const getBannerAlt = (
  project: { data: { title: string; bannerAlt?: string } },
  content: Pick<SiteContent, 'project'>,
): string =>
  project.data.bannerAlt ?? format(content.project.bannerAlt, { title: project.data.title })

/** Sitemap `lastmod` of a project. */
export const lastModified = (project: { data: { releaseDate: Date; updatedDate?: Date } }): Date =>
  project.data.updatedDate ?? project.data.releaseDate
