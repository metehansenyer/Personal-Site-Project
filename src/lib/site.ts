const DEFAULT_SITE_URL = 'https://who.metehansenyer.dev'

export const SITE_URL = (import.meta.env.SITE ?? DEFAULT_SITE_URL).replace(/\/$/, '')

export const SITE_NAME = 'Metehan Şenyer'
