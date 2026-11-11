/**
 * Centralized route configuration for the site.
 *
 * This is the single source of truth for the page paths, nav visibility and the static URL
 * list of the sitemap. Labels, page titles and descriptions are texts and live in the `site`
 * content collection (`routes.<key>` in `src/content/site/<locale>.json`), looked up with
 * the route's `key`.
 */

export type SiteRoute = {
  path: '/' | '/about' | '/portfolio' | '/contact'
  /** Key of this route in the site content (`content.routes[key]`). */
  key: 'home' | 'about' | 'portfolio' | 'contact'
  /** Whether this route appears in Navbar / Header nav menus */
  showInNav: boolean
}

/** Navigation label per route path (from the site content). */
export type RouteLabels = Record<SiteRoute['path'], string>

export const routes: readonly SiteRoute[] = [
  { path: '/', key: 'home', showInNav: false },
  { path: '/about', key: 'about', showInNav: true },
  { path: '/portfolio', key: 'portfolio', showInNav: true },
  { path: '/contact', key: 'contact', showInNav: true },
]

/** Returns the route for `path`; throws on an unknown path so typos fail the build. */
export function getRoute(path: SiteRoute['path']): SiteRoute {
  const route = routes.find((r) => r.path === path)
  if (!route) throw new Error(`Unknown route: ${path}`)
  return route
}
