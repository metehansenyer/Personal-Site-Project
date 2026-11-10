import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier/flat'
import globals from 'globals'

export default defineConfig([
  globalIgnores([
    'dist/**',
    '.astro/**',
    'node_modules/**',
    'coverage/**',
    'src/app/**', // TODO(phase-3): remove (legacy Next.js files)
    'scripts/**', // TODO(phase-3): remove (legacy Next.js scripts)
  ]),
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  prettier,
])
