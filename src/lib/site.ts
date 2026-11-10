const DEFAULT_SITE_URL = 'https://who.metehansenyer.tech'

export const SITE_URL = (import.meta.env.SITE ?? DEFAULT_SITE_URL).replace(/\/$/, '')

export const SITE_NAME = 'Metehan Şenyer'
