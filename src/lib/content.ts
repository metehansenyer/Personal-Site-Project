/**
 * Typed access to the `site` data collection (page texts, one JSON file per locale).
 *
 * Pages and the layout call `getSiteContent()` and hand the relevant strings to components
 * as props, so components stay renderable in isolation (Container API tests).
 */
import { getEntry } from 'astro:content'
import { DEFAULT_LOCALE, type Locale } from '@/lib/locales'
import type { SiteContent } from '@/lib/siteSchema'
import type { RouteLabels } from '@/data/routes'

export type { SiteContent }

/** Returns the validated texts of `locale`; throws if the locale has no content file. */
export async function getSiteContent(locale: Locale = DEFAULT_LOCALE): Promise<SiteContent> {
  const entry = await getEntry('site', locale)
  if (!entry) throw new Error(`Missing site content for locale "${locale}" (src/content/site)`)
  return entry.data
}

export function getRouteLabels(content: SiteContent): RouteLabels {
  return {
    '/': content.routes.home.label,
    '/about': content.routes.about.label,
    '/portfolio': content.routes.portfolio.label,
    '/contact': content.routes.contact.label,
  }
}
