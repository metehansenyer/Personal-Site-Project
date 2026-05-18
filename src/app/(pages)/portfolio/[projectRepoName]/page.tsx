/**
 * Project Detail Page Component
 *
 * This component renders the detailed view of a specific project.
 * It displays:
 * - Project banner image
 * - Project README content (rendered from MDX)
 * - GitHub repository link
 *
 * Features:
 * - Dynamic routing based on project repository name
 * - MDX content rendering with typed React components
 * - Automatic redirection to 404 page for non-existent projects
 * - Responsive image handling
 */

import type { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { projects } from '@/app/data/projects'
import Button from '@/app/components/Button'
import { redirect } from 'next/navigation'
import ProjectBanner from '@/app/(pages)/portfolio/[projectRepoName]/ProjectBanner'
import { SITE_URL, SITE_NAME } from '@/app/lib/site'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from '@/app/components/mdx/mdxComponents'
import ProjectShell from '@/app/components/mdx/ProjectShell'
import 'github-markdown-css/github-markdown-dark.css'
import './markdown-overrides.css'

// Directory containing project MDX files
const PROJECTS_DIR = path.join(process.cwd(), 'src', 'app', 'data', 'projects')

type Props = {
  params: Promise<{ projectRepoName: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectRepoName } = await params
  const project = projects.find((p) => p.repoName === projectRepoName)

  if (!project) {
    return {
      title: 'Proje Bulunamadı',
    }
  }

  const pageUrl = `${SITE_URL}/portfolio/${project.repoName}`
  const bannerUrl = `${SITE_URL}${project.banner}`

  return {
    title: `${project.title} | ${SITE_NAME}`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: pageUrl,
      siteName: SITE_NAME,
      images: [{ url: bannerUrl }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [bannerUrl],
    },
  }
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    projectRepoName: project.repoName,
  }))
}

export default async function ProjectPage({ params }: Props) {
  // Extract project repository name from URL parameters
  const { projectRepoName } = await params

  // Find the project in the projects list
  const project = projects.find((p) => p.repoName === projectRepoName)

  // Redirect to 404 if project not found
  if (!project) {
    redirect('/404')
  }

  // Read the MDX source file
  const mdxPath = path.join(PROJECTS_DIR, `${project.repoName}.mdx`)
  const source = await fs.promises.readFile(mdxPath, 'utf8')

  return (
    <main className="mx-auto w-full max-w-[980px] px-4 py-6 sm:py-8">
      <div className="space-y-6 sm:space-y-8">
        {/* Project Banner Image */}
        <ProjectBanner project={project} />

        {/* Project MDX Content */}
        <ProjectShell>
          <MDXRemote
            source={source}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
              // Allow JSX expression props like slugs={['typescript', 'nextjs']}
              blockJS: false,
            }}
          />
        </ProjectShell>

        {/* GitHub Repository Link */}
        <div>
          <Button
            href={`https://github.com/${project.userName}/${project.repoName}`}
            width="w-full"
            height="h-full"
            fontSize="text-[1.05rem] sm:text-[1.3rem]"
            newTab={true}
            umamiEvent="github-view-click"
            umamiEventData={{ project: project.repoName }}
          >
            GitHub&apos;da Görüntüle
          </Button>
        </div>
      </div>
    </main>
  )
}
