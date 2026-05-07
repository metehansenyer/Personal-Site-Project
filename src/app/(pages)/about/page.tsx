'use client'
import Image from 'next/image'
import { socialLinks } from '@/app/data/socialLinks'
import { aboutContent } from '@/app/data/aboutContent'
import { generateAboutTechnologies } from '@/app/data/icons'

/**
 * About Page Component
 *
 * This component renders the about page of the portfolio website.
 * It displays personal information, a brief biography, and a list of technologies.
 * The page is divided into two main sections:
 * 1. Profile section with photo, name, and contact information
 * 2. Details section with about me text and technology icons
 *
 * The content is managed through the aboutContent configuration
 * to support easy updates and potential internationalization.
 */
export default function About() {
  return (
    <main className="animate-fadeIn mx-auto flex h-full w-[80%] flex-col items-center gap-4 md:flex-row">
      {/* Profile Section - Contains photo, name, and contact information */}
      <section className="space-y-4 md:w-1/3 md:pl-[5%]">
        <Image
          src="/img/profil_fotografim.jpeg"
          alt="İŞTE BEN"
          width={250}
          height={250}
          className="rounded-[35px] transition-transform duration-300 hover:scale-105"
          priority
        />

        {/* Profile Information Table */}
        <table className="w-full text-[1.3rem]">
          <thead>
            <tr>
              <th colSpan={2} className="pb-2 text-left text-[1.7rem] font-bold">
                {aboutContent.profile.name}
              </th>
            </tr>
          </thead>
          <tbody className="space-y-1">
            {/* Location Information */}
            <tr>
              <td className="w-8 text-center">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              </td>
              <td>{aboutContent.profile.location}</td>
            </tr>
            {/* Email Information */}
            <tr>
              <td className="w-8 text-center">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </td>
              <td>
                <a
                  href={`mailto:${aboutContent.profile.email}`}
                  target="_blank"
                  className="cursor-pointer transition-colors hover:text-(--text-color-white)"
                  data-umami-event="email-click"
                >
                  {aboutContent.profile.email}
                </a>
              </td>
            </tr>
            {/* Education Information */}
            <tr>
              <td className="w-8 text-center">
                <i className="fa-solid fa-graduation-cap fa-flip-horizontal" aria-hidden="true"></i>
              </td>
              <td>{aboutContent.profile.education}</td>
            </tr>
          </tbody>
          {/* Social Links Footer */}
          <tfoot>
            <tr>
              <th colSpan={2} className="pt-4">
                <div className="flex gap-2 text-[2.2rem]">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      className="transition-all hover:scale-110 hover:text-(--nav-background-color)"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      data-umami-event="social-link-click"
                      data-umami-event-platform={link.name}
                    >
                      <i className={link.icon} aria-hidden="true"></i>
                    </a>
                  ))}
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* Details Section - Contains about me text and technologies */}
      <section className="space-y-6 md:w-2/3">
        {/* About Me Section */}
        <div className="space-y-2">
          <h2 className="text-[1.8rem] font-bold">{aboutContent.sectionTitles.about}</h2>
          <div className="flex">
            <div className="w-1 rounded-l-[15px] bg-(--text-color)"></div>
            <div className="flex-1 px-4 py-2 text-justify">
              <p className="text-[1.2rem] leading-relaxed">{aboutContent.aboutMe}</p>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="space-y-2">
          <h2 className="text-[1.8rem] font-bold">{aboutContent.sectionTitles.technologies}</h2>
          <div className="flex">
            <div className="w-1 rounded-l-[15px] bg-(--text-color)"></div>
            <div className="flex-1 px-4 py-2">
              {aboutContent.technologies.length === 0 ? (
                <p className="text-(--text-color) opacity-70">{aboutContent.noTechText}</p>
              ) : (
                <div className="flex flex-wrap gap-6">
                  {generateAboutTechnologies(aboutContent.technologies).map((tech) => (
                    <a
                      key={tech.name}
                      href={tech.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/tech"
                      aria-label={tech.name}
                    >
                      <Image
                        src={tech.imgSrc}
                        alt={tech.alt}
                        width={60}
                        height={60}
                        unoptimized
                        className="transition-all duration-300 group-hover/tech:scale-110 group-hover/tech:brightness-110"
                      />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
