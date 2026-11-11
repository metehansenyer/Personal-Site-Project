/**
 * Centralized route configuration for the site.
 *
 * This is the single source of truth for navigation labels, page titles,
 * nav visibility and the static URL list of the sitemap. Components, pages and the
 * sitemap should derive their data from this array (see `getRoute`) instead of
 * defining their own.
 */

export type SiteRoute = {
  path: '/' | '/about' | '/portfolio' | '/contact'
  /** Navigation link label (Turkish) */
  label: string
  /** Page title displayed in the Header */
  title: string
  /** Whether this route appears in Navbar / Header nav menus */
  showInNav: boolean
  /** Label used for this route's button on the home page, when it differs from `label` */
  homeLabel?: string
}

export const routes: readonly SiteRoute[] = [
  {
    path: '/',
    label: 'Ana Sayfa',
    title: '',
    showInNav: false,
  },
  {
    path: '/about',
    label: 'Ben Kimim?',
    title: 'Ben Kimim?',
    showInNav: true,
  },
  {
    path: '/portfolio',
    label: 'Portföy',
    title: 'Portföy',
    showInNav: true,
  },
  {
    path: '/contact',
    label: 'İletişim',
    title: 'İletişim',
    showInNav: true,
    homeLabel: 'Bana Ulaşın',
  },
]

/** Returns the route for `path`; throws on an unknown path so typos fail the build. */
export function getRoute(path: SiteRoute['path']): SiteRoute {
  const route = routes.find((r) => r.path === path)
  if (!route) throw new Error(`Unknown route: ${path}`)
  return route
}
