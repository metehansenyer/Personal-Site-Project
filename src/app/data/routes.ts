/**
 * Centralized route configuration for the site.
 *
 * This is the single source of truth for navigation labels, page titles,
 * nav visibility, and sitemap metadata. All components and the sitemap
 * should derive their data from this array instead of defining their own.
 */

export type SiteRoute = {
  path: '/' | '/about' | '/portfolio' | '/contact'
  /** Navigation link label (Turkish) */
  label: string
  /** Page title displayed in the Header */
  title: string
  /** Whether this route appears in Navbar / Header nav menus */
  showInNav: boolean
  /** Sitemap metadata for this route */
  sitemap: {
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
    priority: number
  }
}

export const routes: readonly SiteRoute[] = [
  {
    path: '/',
    label: 'Ana Sayfa',
    title: '',
    showInNav: false,
    sitemap: { changeFrequency: 'weekly', priority: 1.0 },
  },
  {
    path: '/about',
    label: 'Ben Kimim?',
    title: 'Ben Kimim?',
    showInNav: true,
    sitemap: { changeFrequency: 'monthly', priority: 0.8 },
  },
  {
    path: '/portfolio',
    label: 'Portföy',
    title: 'Portföy',
    showInNav: true,
    sitemap: { changeFrequency: 'weekly', priority: 0.9 },
  },
  {
    path: '/contact',
    label: 'İletişim',
    title: 'İletişim',
    showInNav: true,
    sitemap: { changeFrequency: 'monthly', priority: 0.7 },
  },
]
