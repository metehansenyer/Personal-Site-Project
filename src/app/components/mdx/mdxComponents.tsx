import type { MDXComponents } from 'mdx/types'
import Icon from './Icon'
import Callout from './Callout'

export const mdxComponents: MDXComponents = {
  Icon,
  Callout,
  // Headings with border-bottom styling matching the original template
  h1: ({ children, ...props }) => (
    <h1
      className="mb-4 border-b border-current pb-4 text-3xl font-bold sm:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="mb-4 border-b border-current pb-4 text-2xl font-bold sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mb-4 border-b border-current pb-4 text-xl font-bold sm:text-2xl" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="mb-4 border-b border-current pb-4 text-lg font-bold sm:text-xl" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="mb-4 border-b border-current pb-4 text-base font-bold sm:text-lg" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="mb-4 border-b border-current pb-4 text-sm font-bold sm:text-base" {...props}>
      {children}
    </h6>
  ),
  // Links styled with blue color and underline
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-[var(--text-color-blue)] underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  // Lists with proper list-style
  ul: ({ children, ...props }) => (
    <ul className="my-2 ml-6 list-disc" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-2 ml-6 list-decimal" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="my-1" {...props}>
      {children}
    </li>
  ),
  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="my-4" {...props}>
      {children}
    </p>
  ),
  // Tables
  table: ({ children, ...props }) => (
    <div className="my-4 block max-w-full overflow-auto">
      <table className="w-max max-w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-[var(--table-border-color)] px-3 py-2 text-left"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-[var(--table-border-color)] px-3 py-2" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr
      className="border-t border-[var(--table-border-color-muted)] bg-[var(--table-background-color)] even:bg-[var(--table-background-color-muted)]"
      {...props}
    >
      {children}
    </tr>
  ),
  // Code blocks
  pre: ({ children, ...props }) => (
    <pre
      className="my-4 overflow-x-auto rounded bg-[var(--nav-background-color)] p-4"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }) => (
    <code className="rounded bg-[var(--nav-background-color)] px-1 py-0.5 text-sm" {...props}>
      {children}
    </code>
  ),
  // Horizontal rule
  hr: (props) => <hr className="my-6 border-current" {...props} />,
  // Images
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt ?? ''} className="h-auto max-w-full" {...props} />
  ),
  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 border-l-4 border-current pl-4 opacity-80"
      {...props}
    >
      {children}
    </blockquote>
  ),
}
