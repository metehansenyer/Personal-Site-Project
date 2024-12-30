/**
 * Project Detail Page Component
 * 
 * This component renders the detailed view of a specific project.
 * It displays:
 * - Project banner image
 * - Project README content (rendered from markdown)
 * - GitHub repository link
 * 
 * Features:
 * - Dynamic routing based on project repository name
 * - Markdown content rendering
 * - Automatic redirection to 404 page for non-existent projects
 * - Responsive image handling
 */

import { projects } from '@/app/data/projects'
import { getMarkdownContent } from '@/app/lib/markdown'
import Button from '@/app/components/Button'
import { redirect } from 'next/navigation'
import ProjectBanner from '@/app/(pages)/portfolio/[projectRepoName]/ProjectBanner'

type Props = {
  params: Promise<{ projectRepoName: string }>
}

export default async function ProjectPage({ params }: Props) {
  // Extract project repository name from URL parameters
  const { projectRepoName } = await params
  
  // Find the project in the projects list
  const project = projects.find(p => p.repoName === projectRepoName)

  // Redirect to 404 if project not found
  if (!project) {
    redirect('/404')
  }

  // Get and parse the project's markdown content
  const content = await getMarkdownContent(project.repoName)

  return (
    <main className="w-full max-w-[980px] mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Project Banner Image */}
        <ProjectBanner project={project} />

        {/* Project README Content */}
        <article>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>

        {/* GitHub Repository Link */}
        <div>
          <Button
            href={`https://github.com/${project.userName}/${project.repoName}`}
            width="w-full"
            height="h-full"
            fontSize="text-[1.3rem]"
            newTab={true}
          >
            GitHub&apos;da Görüntüle
          </Button>
        </div>
      </div>
    </main>
  )
}