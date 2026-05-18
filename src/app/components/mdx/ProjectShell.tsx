import type { ReactNode } from 'react'

interface ProjectShellProps {
  children: ReactNode
}

export default function ProjectShell({ children }: ProjectShellProps) {
  return (
    <article
      className="markdown-body project-content w-full"
      style={{
        backgroundColor: 'transparent',
        color: 'var(--text-color)',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </article>
  )
}
