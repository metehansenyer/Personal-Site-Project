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
    <main className="flex h-full w-full items-center justify-center">
      <div className="mx-auto w-full max-w-2xl px-4">
        {/* Contact Card */}
        <div className="space-y-6 rounded-(--border-radius-medium) bg-(--nav-background-color) p-6 text-center shadow-lg">
          {/* Title and Description */}
          <h2 className="text-3xl font-bold text-(--text-color)">{contactContent.title}</h2>
          <p className="text-lg text-(--text-color)">{contactContent.description}</p>

          {/* Contact Links */}
          <div className="flex items-center justify-center gap-6 text-lg">
            {/* Email Link */}
            <a
              href={`mailto:${contactContent.email}`}
              target="_blank"
              className="text-(--text-color) transition-colors duration-300 hover:text-(--text-color-white)"
              data-umami-event="email-click"
            >
              {contactContent.email}
            </a>
            {/* LinkedIn Link - Only shown if LinkedIn profile exists */}
            {linkedIn && (
              <>
                <span className="text-(--text-color)">•</span>
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
