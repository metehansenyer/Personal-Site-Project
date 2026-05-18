import type { ReactNode } from 'react'

interface ProjectShellProps {
  children: ReactNode
}

export default function ProjectShell({ children }: ProjectShellProps) {
  return (
    <article className="project-content overflow-wrap-anywhere w-full text-[var(--text-color)]">
      {children}
    </article>
  )
}
