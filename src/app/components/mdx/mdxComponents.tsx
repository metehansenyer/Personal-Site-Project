import type { MDXComponents } from 'mdx/types'
import Icon from './Icon'
import Callout from './Callout'

/**
 * MDX component mapping for project content.
 *
 * Typography (headings, lists, tables, code, paragraphs, blockquote, hr) is
 * styled by github-markdown-css via the .markdown-body class on ProjectShell,
 * with project-specific overrides in globals.css. Only the custom JSX
 * components and the few elements that need behaviour beyond CSS are mapped
 * here.
 */
export const mdxComponents: MDXComponents = {
  Icon,
  Callout,
  a: ({ children, href, ...props }) => {
    const isExternal = typeof href === 'string' && /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    )
  },
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ src, alt, ...props }) => <img src={src} alt={alt ?? ''} {...props} />,
}
