/**
 * URL helpers for the localized routes (pure, no Astro imports; unit tested).
 *
 * The default locale (Turkish) is un-prefixed (`/about`), every other locale has a prefix
 * (`/en/about`, home `/en`). Paths handled here have no trailing slash (`/` is the root).
 *
 * Astro's own `i18n` config is intentionally not enabled: with a static build and an
 * un-prefixed default locale it would only add redirect / fallback machinery we do not want.
 */
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/lib/locales'

const PREFIXED = LOCALES.filter((l) => l !== DEFAULT_LOCALE)

const trimSlashes = (path: string) => {
  const trimmed = path.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

/** Locale of a pathname: `/en` and `/en/...` are English, everything else the default. */
export function getLocaleFromPath(pathname: string): Locale {
  const path = trimSlashes(pathname)
  return PREFIXED.find((l) => path === `/${l}` || path.startsWith(`/${l}/`)) ?? DEFAULT_LOCALE
}

/** Removes the locale prefix: `/en/about` -> `/about`, `/en` -> `/`, `/about` -> `/about`. */
export function stripLocale(pathname: string): string {
  const path = trimSlashes(pathname)
  const locale = getLocaleFromPath(path)
  if (locale === DEFAULT_LOCALE) return path
  return trimSlashes(path.slice(locale.length + 1))
}

/** Path of a (locale-independent) route in `locale`: `localizePath('/about', 'en')` -> `/en/about`. */
export function localizePath(path: string, locale: Locale): string {
  const base = stripLocale(path)
  if (locale === DEFAULT_LOCALE) return base
  return base === '/' ? `/${locale}` : `/${locale}${base}`
}

export type Alternate = { locale: Locale; path: string }

/** The same page in every locale (including the current one), in `LOCALES` order. */
export function getAlternates(pathname: string): Alternate[] {
  return LOCALES.map((locale) => ({ locale, path: localizePath(pathname, locale) }))
}

/**
 * `[...locale]` route parameter of a locale: `undefined` for the default locale (matches the
 * un-prefixed URL), else the code. Used by `getStaticPaths` of the localized pages.
 */
export const localeParam = (locale: Locale): string | undefined =>
  locale === DEFAULT_LOCALE ? undefined : locale

/** Static paths of a page that exists once per locale: `params.locale` and `props.locale`. */
export const localeStaticPaths = () =>
  LOCALES.map((locale) => ({ params: { locale: localeParam(locale) }, props: { locale } }))
