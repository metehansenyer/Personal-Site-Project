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
    <main className="animate-fadeIn mx-auto flex h-full w-[80%] flex-col items-center gap-8 px-2 py-8 md:mt-10 md:flex-row md:gap-4 md:px-0 md:py-0">
      {/* Profile Section - Contains photo, name, and contact information */}
      <section className="w-full space-y-4 md:w-1/3 md:pl-[5%]">
        <Image
          src="/img/profil_fotografim.jpeg"
          alt="İŞTE BEN"
          width={250}
          height={250}
          className="mx-auto rounded-[35px] transition-transform duration-300 hover:scale-105 md:mx-0"
          priority
        />

        {/* Profile Information */}
        <div className="w-full text-[1rem] sm:text-[1.15rem] md:text-[1.3rem]">
          {/* Name */}
          <div className="pb-2 text-center text-[1.4rem] font-bold md:text-left md:text-[1.7rem]">
            {aboutContent.profile.name}
          </div>
          {/* Info Rows */}
          <div className="space-y-1">
            {/* Location Information */}
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="w-5 text-center">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
              </span>
              <span className="break-words">{aboutContent.profile.location}</span>
            </div>
            {/* Email Information */}
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="w-5 text-center">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
              </span>
              <a
                href={`mailto:${aboutContent.profile.email}`}
                target="_blank"
                className="cursor-pointer break-words transition-colors hover:text-(--text-color-white)"
                data-umami-event="email-click"
              >
                {aboutContent.profile.email}
              </a>
            </div>
            {/* Education Information */}
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <span className="w-5 text-center">
                <i className="fa-solid fa-graduation-cap fa-flip-horizontal" aria-hidden="true"></i>
              </span>
              <span className="break-words">{aboutContent.profile.education}</span>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex justify-center gap-3 pt-4 text-[2rem] md:justify-start md:text-[2.2rem]">
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
        </div>
      </section>

      {/* Details Section - Contains about me text and technologies */}
      <section className="w-full space-y-6 md:w-2/3">
        {/* About Me Section */}
        <div className="space-y-2">
          <h2 className="text-[1.5rem] font-bold md:text-[1.8rem]">
            {aboutContent.sectionTitles.about}
          </h2>
          <div className="flex">
            <div className="w-1 rounded-l-[15px] bg-(--text-color)"></div>
            <div className="flex-1 px-4 py-2 text-left md:text-justify">
              <p className="text-[1.05rem] leading-relaxed md:text-[1.2rem]">
                {aboutContent.aboutMe}
              </p>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <div className="space-y-2">
          <h2 className="text-[1.5rem] font-bold md:text-[1.8rem]">
            {aboutContent.sectionTitles.technologies}
          </h2>
          <div className="flex">
            <div className="w-1 rounded-l-[15px] bg-(--text-color)"></div>
            <div className="flex-1 px-4 py-2">
              {aboutContent.technologies.length === 0 ? (
                <p className="text-(--text-color) opacity-70">{aboutContent.noTechText}</p>
              ) : (
                <div className="flex flex-wrap justify-center gap-5 md:justify-start md:gap-6">
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
                        width={52}
                        height={52}
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
