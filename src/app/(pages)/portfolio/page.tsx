'use client'
import ProjectCard from '@/app/components/ProjectCard'
import { projects } from '@/app/data/projects'

/**
 * Portfolio Page Component
 * 
 * This component renders the portfolio page of the website.
 * It displays a grid of project cards, each representing a different project.
 * The projects are managed through the projects configuration.
 * 
 * Features:
 * - Responsive grid layout (1 column on mobile, 2 on tablet, 3 on desktop)
 * - Displays a message when no projects are available
 * - Each project is rendered using the ProjectCard component
 */
export default function Portfolio() {
  // Show message if no projects are available
  if (projects.length === 0) {
    return (
      <div className="w-[80%] mx-auto text-center py-8">
        <p className="text-[var(--text-color)] opacity-70">Henüz proje bulunmuyor.</p>
      </div>
    )
  }

  return (
    <main className="w-[80%] mx-auto py-8">
      {/* Project Grid - Responsive layout with different columns based on screen size */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.repoName} project={project} />
        ))}
      </div>
    </main>
  )
}