import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/app/data/projects'
import { useState } from 'react'

/**
 * ProjectCard Component
 *
 * A card component that displays project information in the portfolio grid.
 * Each card is a clickable link that leads to the project's detail page.
 *
 * Features:
 * - Displays project banner image
 * - Shows project title and description
 * - Includes technology tags with hover animation
 * - Responsive design with consistent styling
 */

type Props = {
  project: Project
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: Props) {
  const [src, setSrc] = useState(project.banner)
  const [isHovered, setIsHovered] = useState(false)

  // Sabit genişlik değerleri (padding dahil)
  const TAG_PADDING = 24 // px-3 (sol ve sağ padding)
  const TAG_GAP = 8 // gap-2
  const CONTAINER_WIDTH = 320 // Container genişliği

  // Tag'lerin toplam genişliğini hesapla ve sığanları belirle
  const calculateVisibleTags = () => {
    let currentWidth = 0
    let visibleCount = 0

    for (const tech of project.technologies) {
      // Her karakteri yaklaşık 8px olarak hesapla
      const tagWidth = tech.length * 8 + TAG_PADDING

      // Gap'i de ekleyerek toplam genişliği hesapla
      if (currentWidth + tagWidth + (visibleCount > 0 ? TAG_GAP : 0) <= CONTAINER_WIDTH) {
        currentWidth += tagWidth + (visibleCount > 0 ? TAG_GAP : 0)
        visibleCount++
      } else {
        break
      }
    }

    return visibleCount
  }

  const visibleCount = calculateVisibleTags()
  const visibleTechs = project.technologies.slice(0, visibleCount)
  const remainingTechs = project.technologies.slice(visibleCount)
  const hasRemainingTechs = remainingTechs.length > 0

  return (
    <div
      className="block h-[450px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/portfolio/${project.repoName}`}>
        <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-(--nav-background-color) shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative h-48 shrink-0">
            <Image
              src={src}
              alt={`${project.title} banner`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setSrc('/img/placeholder_img.png')}
            />
          </div>

          <div className="flex h-[calc(450px-12rem)] flex-col p-6">
            <div className="min-h-0 flex-1">
              <h2 className="mb-4 line-clamp-2 h-14 overflow-hidden text-2xl font-bold text-ellipsis text-(--text-color)">
                {project.title}
              </h2>

              <p className="mb-4 line-clamp-4 text-(--text-color) opacity-90">
                {project.description}
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="flex gap-2 whitespace-nowrap">
                <div
                  className={`flex gap-2 transition-all duration-700 ease-in-out ${
                    hasRemainingTechs && isHovered
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-0 opacity-100'
                  }`}
                >
                  {visibleTechs.map((tech) => (
                    <span
                      key={tech}
                      className="bg-background inline-block rounded-full px-3 py-1 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {hasRemainingTechs && (
                  <div
                    className={`absolute left-0 flex gap-2 transition-all duration-700 ease-in-out ${
                      isHovered ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                  >
                    {remainingTechs.map((tech) => (
                      <span
                        key={tech}
                        className="bg-background inline-block rounded-full px-3 py-1 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
