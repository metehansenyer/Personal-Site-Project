/**
 * Nav order - pure logic (no DOM access).
 *
 * The three nav destinations (`/about`, `/portfolio`, `/contact`) keep an order that is
 * persisted in `sessionStorage`. When the user navigates directly from one nav page to
 * another, those two entries swap places, so the button that was clicked is replaced in
 * place by the page the user came from.
 *
 * The stored order and the recorded paths are locale-independent (`/about`, never `/en/about`),
 * so one order is shared by every language; `stripLocalePrefix` maps the current URL and the
 * link hrefs to those paths.
 *
 * IMPORTANT: `normalizePath`, `stripLocalePrefix`, `parseStoredOrder` and `swapOrder` are also serialized with
 * `Function.prototype.toString()` into a blocking inline script (see
 * `src/components/NavOrderScript.astro`). They must therefore stay SELF-CONTAINED: no
 * references to module-level values, imports or each other - everything comes in via
 * parameters. Keep them to plain ES syntax (no TS-only runtime helpers).
 */
import { routes, type RouteLabels, type SiteRoute } from '../data/routes'
import { DEFAULT_LOCALE, LOCALES } from './locales'
import { getLocaleFromPath, localizePath } from './i18n'

export type NavPath = Exclude<SiteRoute['path'], '/'>

export const NAV_ORDER_STORAGE_KEY = 'nav-order'
export const NAV_PREV_PATH_STORAGE_KEY = 'nav-prev-path'

/** Default order, derived from `routes.ts`. */
export const DEFAULT_ORDER: readonly NavPath[] = routes
  .filter((r) => r.showInNav)
  .map((r) => r.path as NavPath)

/** Strips trailing slashes (`/about/` -> `/about`); the root stays `/`. */
export function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

/** Path prefixes of the non-default locales (`['/en']`), passed to `stripLocalePrefix`. */
export const LOCALE_PREFIXES: readonly string[] = LOCALES.filter((l) => l !== DEFAULT_LOCALE).map(
  (l) => `/${l}`,
)

/**
 * Maps a localized path to its locale-independent route: `/en/about` -> `/about`, `/en` -> `/`.
 * `path` must already be trailing-slash normalized; other paths are returned unchanged.
 */
export function stripLocalePrefix(path: string, prefixes: readonly string[]): string {
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i]
    if (path === prefix) return '/'
    if (path.indexOf(prefix + '/') === 0) return path.slice(prefix.length)
  }
  return path
}

/**
 * Validates a raw `sessionStorage` value: it must be a JSON array with the same length
 * and the same members as `defaultOrder`. Anything else yields a copy of `defaultOrder`.
 */
export function parseStoredOrder(raw: string | null, defaultOrder: readonly string[]): string[] {
  try {
    if (!raw) return defaultOrder.slice()
    const parsed: unknown = JSON.parse(raw)
    if (
      Array.isArray(parsed) &&
      parsed.length === defaultOrder.length &&
      parsed.every((p) => typeof p === 'string' && defaultOrder.indexOf(p) !== -1) &&
      defaultOrder.every((p) => parsed.indexOf(p) !== -1)
    ) {
      return parsed.slice()
    }
  } catch {
    // fall through to the default
  }
  return defaultOrder.slice()
}

/**
 * Returns the order after navigating from `prevPath` to `currentPath`. The two swap
 * places only when both are in `order` and differ (paths are trailing-slash normalized).
 * Otherwise (first load, via `/`, via a project page, reload) the order is unchanged.
 */
export function swapOrder(
  order: readonly string[],
  prevPath: string | null,
  currentPath: string,
): string[] {
  const next = order.slice()
  if (!prevPath) return next
  const norm = (p: string) => {
    const t = p.replace(/\/+$/, '')
    return t === '' ? '/' : t
  }
  const prev = norm(prevPath)
  const current = norm(currentPath)
  if (prev === current) return next
  const i = next.indexOf(prev)
  const j = next.indexOf(current)
  if (i === -1 || j === -1) return next
  const tmp = next[i]
  next[i] = next[j]
  next[j] = tmp
  return next
}

export type NavItem = { href: string; label: string }

/**
 * Server-side nav list: Home first, then the nav routes in the default order without the
 * current page; hrefs are in the locale of `pathname` (`/en/about` -> `/en`, `/en/portfolio`, ...). `labels` (from the site content) supplies the link texts. The client script
 * reorders the DOM from the stored order.
 */
export function getNavItems(pathname: string, labels: RouteLabels): NavItem[] {
  const current = stripLocalePrefix(normalizePath(pathname), LOCALE_PREFIXES)
  const locale = getLocaleFromPath(pathname)
  return [
    { href: localizePath('/', locale), label: labels['/'] },
    ...DEFAULT_ORDER.filter((p) => p !== current).map((p) => ({
      href: localizePath(p, locale),
      label: labels[p],
    })),
  ]
}
