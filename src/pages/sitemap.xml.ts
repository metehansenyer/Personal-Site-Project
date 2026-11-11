/**
 * Sitemap endpoint (static, built to /sitemap.xml).
 *
 * Static routes come from `src/data/routes.ts`, project pages from `getProjects()`.
 * `changefreq` / `priority` are omitted on purpose (ignored by Google). `lastmod` is only set
 * for projects: `updatedDate ?? releaseDate`; static routes have none.
 */
import type { APIRoute } from 'astro'
import { routes } from '@/data/routes'
import { getProjects, lastModified } from '@/lib/projects'
import { SITE_URL } from '@/lib/site'

interface Entry {
  url: string
  lastModified?: Date
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

export const GET: APIRoute = async () => {
  const staticEntries: Entry[] = routes.map((route) => ({
    url: route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`,
  }))

  // Same list and order as the portfolio page (drafts excluded in production builds).
  const projects = await getProjects()
  const projectEntries: Entry[] = projects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.id}`,
    lastModified: lastModified(project),
  }))

  const body = [...staticEntries, ...projectEntries]
    .map((entry) =>
      [
        '<url>',
        `<loc>${escapeXml(entry.url)}</loc>`,
        entry.lastModified ? `<lastmod>${entry.lastModified.toISOString()}</lastmod>` : '',
        '</url>',
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } })
}
