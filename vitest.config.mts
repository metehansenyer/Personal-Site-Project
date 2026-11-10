/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

// getViteConfig() loads astro.config.ts, so .astro files, the `@` alias (tsconfig paths)
// and the Astro Container API (`astro/container`) all work inside tests.
export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    passWithNoTests: true,
  },
})
