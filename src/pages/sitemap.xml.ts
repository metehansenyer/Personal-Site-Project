/**
 * Sitemap endpoint (static, built to /sitemap.xml).
 *
 * Every static route from `src/data/routes.ts` and every project from `getProjects()` is listed
 * once per locale (`/about`, `/en/about`, ...), each URL with `xhtml:link rel="alternate"
 * hreflang` entries for all locales plus `x-default` (the default-locale URL), as Google
 * expects. `changefreq` / `priority` are omitted on purpose (ignored by Google). `lastmod` is
 * only set for projects: `updatedDate ?? releaseDate`; static routes have none.
 */
import type { APIRoute } from 'astro'
import { routes } from '@/data/routes'
import { getAlternates, localizePath } from '@/lib/i18n'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/locales'
import { getProjects, lastModified } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

interface Entry {
  /** Locale-independent path (`/about`, `/portfolio/<id>`). */
  path: string
  lastModified?: Date
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

/** Sitemap URL of a localized path; the default-locale home is the bare origin, as before. */
const loc = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`)

export const GET: APIRoute = async () => {
  const staticEntries: Entry[] = routes.map((route) => ({ path: route.path }))

  // Same list and order as the portfolio page (drafts excluded in production builds). Projects
  // exist in every locale (untranslated ones show the default-locale content).
  const projects = await getProjects()
  const projectEntries: Entry[] = projects.map((project) => ({
    path: `/portfolio/${project.id}`,
    lastModified: lastModified(project),
  }))

  const body = [...staticEntries, ...projectEntries]
    .flatMap((entry) =>
      LOCALES.map((locale) => {
        const alternates = getAlternates(entry.path)
        const links = [
          ...alternates.map((a) => ({ hreflang: a.locale as string, path: a.path })),
          { hreflang: 'x-default', path: localizePath(entry.path, DEFAULT_LOCALE) },
        ].map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${escapeXml(loc(l.path))}" />`,
        )
        return [
          '<url>',
          `<loc>${escapeXml(loc(localizePath(entry.path, locale)))}</loc>`,
          ...links,
          entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : '',
          '</url>',
        ]
          .filter(Boolean)
          .join('\n')
      }),
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
