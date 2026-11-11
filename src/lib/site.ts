/**
 * `import.meta.env.SITE` is the `site` option of `astro.config.ts` (default
 * `https://who.metehansenyer.dev`, overridable with the `SITE_URL` env var at build time).
 * It is typed `string` but is `undefined` if `site` is ever removed from the config; fail
 * loudly then instead of emitting wrong URLs.
 */
const site: string | undefined = import.meta.env.SITE
if (!site) throw new Error('`site` is not set in astro.config.ts')

export const SITE_URL = site.replace(/\/$/, '')

export const SITE_NAME = 'Metehan Şenyer'

export const CONTACT_EMAIL = 'mthansnyr@gmail.com'

/** Browser title for a page: `<page> | <site name>`. */
export const documentTitle = (page: string) => `${page} | ${SITE_NAME}`

/** Absolute URL of a site path (`/about` -> `https://.../about`); same form as the canonical URLs. */
export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).href
