import type { ReactNode } from 'react'

interface ProjectShellProps {
  children: ReactNode
}

export default function ProjectShell({ children }: ProjectShellProps) {
  return (
    <article className="project-content w-full overflow-wrap-anywhere text-[var(--text-color)]">
      {children}
    </article>
  )
}
