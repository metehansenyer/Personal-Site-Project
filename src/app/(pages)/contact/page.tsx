'use client'
import { socialLinks } from '@/app/data/socialLinks'
import { contactContent } from '@/app/data/contactContent'

/**
 * Contact Page Component
 *
 * This component renders the contact page of the portfolio website.
 * It provides users with ways to get in touch, including:
 * - Direct email contact
 * - LinkedIn profile link
 *
 * The content is managed through the contactContent configuration
 * to support easy updates and potential internationalization.
 * Social links are managed through the socialLinks configuration.
 */
export default function Contact() {
  // Find LinkedIn profile from social links
  const linkedIn = socialLinks.find((link) => link.name === 'LinkedIn')

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-8 md:px-0 md:py-0">
      <div className="mx-auto w-full max-w-2xl px-4">
        {/* Contact Card */}
        <div className="space-y-6 rounded-(--border-radius-medium) bg-(--nav-background-color) p-5 text-center shadow-lg md:p-6">
          {/* Title and Description */}
          <h2 className="text-2xl font-bold text-(--text-color) md:text-3xl">
            {contactContent.title}
          </h2>
          <p className="text-base text-(--text-color) md:text-lg">{contactContent.description}</p>

          {/* Contact Links */}
          <div className="flex flex-col items-center justify-center gap-4 text-base md:flex-row md:gap-6 md:text-lg">
            {/* Email Link */}
            <a
              href={`mailto:${contactContent.email}`}
              target="_blank"
              className="break-all text-(--text-color) transition-colors duration-300 hover:text-(--text-color-white)"
              data-umami-event="email-click"
            >
              {contactContent.email}
            </a>
            {/* LinkedIn Link - Only shown if LinkedIn profile exists */}
            {linkedIn && (
              <>
                <span className="hidden text-(--text-color) md:inline">•</span>
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-(--text-color) transition-all duration-300 hover:scale-110 hover:text-(--text-color-white)"
                  title={linkedIn.name}
                  data-umami-event="social-link-click"
                  data-umami-event-platform="LinkedIn"
                >
                  <i className={`${linkedIn.icon} text-xl`} aria-hidden="true"></i>
                  <span>LinkedIn</span>
                </a>
              </>
            )}
          </div>

          {/* Footer Message */}
          <p className="text-sm text-(--text-color)">{contactContent.footerText}</p>
        </div>
      </div>
    </main>
  )
}
