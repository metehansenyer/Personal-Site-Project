/**
 * Locales of the site. Turkish is the default and lives at the un-prefixed URLs; every other
 * locale lives under `/<code>/` (English: `/en`, `/en/about`, ...).
 *
 * Adding a locale: add its code (and its names below) here and a `src/content/site/<code>.json`
 * file (validated by `lib/siteSchema.ts`; `lib/content.test.ts` fails if a listed locale has no
 * file). Translated projects go to `src/content/project-translations/<code>/`. Routing needs no
 * change: the pages under `src/pages/[...locale]/` are generated for every listed locale.
 */
export const LOCALES = ['tr', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'tr'

/** Name of each language in that language (language switcher tooltip / accessible name). */
export const LOCALE_NAMES: Record<Locale, string> = { tr: 'Türkçe', en: 'English' }

/** Short visible label of each language in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = { tr: 'TR', en: 'EN' }
