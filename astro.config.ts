import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import tailwindcss from '@tailwindcss/vite'
import rehypeExternalLinks from 'rehype-external-links'

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://who.metehansenyer.dev',
  output: 'static',
  trailingSlash: 'ignore',
  markdown: {
    // The old site had no syntax highlighting (plain github-markdown-css code blocks).
    // `.mdx` inherits this setting.
    syntaxHighlight: false,
    // Astro 7: the default processor is Sätteri (no rehype plugin support), so the
    // unified (remark/rehype) processor is used to keep rehype-external-links.
    // `.mdx` files inherit this processor.
    processor: unified({
      gfm: true,
      // The old site rendered plain quotes; Astro would turn them into typographic ones.
      smartypants: false,
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: '_blank', rel: ['noopener', 'noreferrer'], protocols: ['http', 'https'] },
        ],
      ],
    }),
  },
  integrations: [mdx()],
  image: {
    domains: ['raw.githubusercontent.com', 'cdn.jsdelivr.net'],
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
