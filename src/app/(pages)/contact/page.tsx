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
  const linkedIn = socialLinks.find(link => link.name === 'LinkedIn')

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4">
        {/* Contact Card */}
        <div className="bg-[var(--nav-background-color)] rounded-[var(--border-radius-medium)] p-6 shadow-lg text-center space-y-6">
          {/* Title and Description */}
          <h2 className="text-3xl font-bold text-[var(--text-color)]">{contactContent.title}</h2>
          <p className="text-[var(--text-color)] text-lg">
            {contactContent.description}
          </p>

          {/* Contact Links */}
          <div className="flex items-center justify-center gap-6 text-lg">
            {/* Email Link */}
            <a 
              href={`mailto:${contactContent.email}`} target="_blank"
              className="text-[var(--text-color)] hover:text-[var(--text-color-white)] transition-colors duration-300"
            >
              {contactContent.email}
            </a>
            {/* LinkedIn Link - Only shown if LinkedIn profile exists */}
            {linkedIn && (
              <>
                <span className="text-[var(--text-color)]">•</span>
                <a
                  href={linkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-color)] hover:text-[var(--text-color-white)] transition-all duration-300 transform hover:scale-110 inline-flex items-center gap-2"
                  title={linkedIn.name}
                >
                  <i className={`${linkedIn.icon} text-xl`} aria-hidden="true"></i>
                  <span>LinkedIn</span>
                </a>
              </>
            )}
          </div>

          {/* Footer Message */}
          <p className="text-[var(--text-color)] text-sm">
            {contactContent.footerText}
          </p>
        </div>
      </div>
    </main>
  )
} 