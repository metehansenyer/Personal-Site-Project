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
 * - Includes technology tags clipped to one line via CSS overflow
 * - Responsive design with consistent styling
 */

type Props = {
  project: Project
  priority?: boolean
}

export default function ProjectCard({ project, priority = false }: Props) {
  const [src, setSrc] = useState(project.banner)

  return (
    <div className="block h-[280px] sm:h-[320px] md:h-[450px]">
      <Link href={`/portfolio/${project.repoName}`} className="block h-full">
        <article className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-(--nav-background-color) shadow-lg transition-transform hover:scale-[1.02]">
          <div className="relative h-24 shrink-0 sm:h-32 md:h-48">
            <Image
              src={src}
              alt={`${project.title} banner`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
              loading={priority ? 'eager' : 'lazy'}
              onError={() => setSrc('/img/placeholder_img.png')}
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4 md:h-[calc(450px-12rem)] md:p-6">
            <div className="min-h-0 flex-1">
              <h2 className="mb-2 line-clamp-2 overflow-hidden text-base font-bold text-ellipsis text-(--text-color) sm:text-lg md:mb-4 md:h-14 md:text-2xl">
                {project.title}
              </h2>

              <p className="mb-3 line-clamp-5 text-xs text-(--text-color) opacity-90 sm:text-sm md:mb-4 md:line-clamp-4 md:text-base">
                {project.description}
              </p>
            </div>

            <div className="mt-3 max-h-[1.6rem] overflow-hidden sm:max-h-[1.75rem] md:max-h-[2rem]">
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-background inline-block shrink-0 rounded-full px-2 py-1 text-[0.65rem] leading-none whitespace-nowrap sm:text-xs md:px-3 md:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </Link>
    </div>
  )
}
