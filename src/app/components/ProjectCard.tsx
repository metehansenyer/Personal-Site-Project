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
}

export default function ProjectCard({ project }: Props) {
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
      const tagWidth = (tech.length * 8) + TAG_PADDING
      
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
        <article 
          className="bg-[var(--nav-background-color)] rounded-lg overflow-hidden shadow-lg hover:scale-[1.02] transition-transform cursor-pointer h-full flex flex-col"
        >
          <div className="relative h-48 flex-shrink-0">
            <Image
              src={src}
              alt={`${project.title} banner`}
              fill
              className="object-cover"
              onError={() => setSrc('/img/placeholder_img.png')}
            />
          </div>
          
          <div className="flex flex-col h-[calc(450px-12rem)] p-6">
            <div className="flex-1 min-h-0">
              <h2 className="text-2xl font-bold text-[var(--text-color)] mb-4 h-[3.5rem] line-clamp-2 overflow-hidden text-ellipsis">
                {project.title}
              </h2>
              
              <p className="text-[var(--text-color)] opacity-90 line-clamp-4 mb-4">
                {project.description}
              </p>
            </div>
            
            <div className="relative overflow-hidden">
              <div className="flex gap-2 whitespace-nowrap">
                <div 
                  className={`flex gap-2 transition-all duration-700 ease-in-out ${
                    hasRemainingTechs && isHovered ? 'opacity-0 -translate-x-full' : 'opacity-100 translate-x-0'
                  }`}
                >
                  {visibleTechs.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-[var(--background-color)] rounded-full text-sm inline-block"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {hasRemainingTechs && (
                  <div 
                    className={`flex gap-2 transition-all duration-700 ease-in-out absolute left-0 ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                    }`}
                  >
                    {remainingTechs.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-[var(--background-color)] rounded-full text-sm inline-block"
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