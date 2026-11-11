/**
 * Social Links Configuration Module
 *
 * This module manages the social media links displayed throughout the website.
 * It provides a centralized collection of social media profiles and their metadata.
 *
 * Features:
 * - Standardized social link definitions
 * - Font Awesome icon definitions (rendered with FaIcon.astro)
 * - Consistent link formatting
 * - Easy profile management
 */

import { faGithub, faInstagram, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons'
import type { FaIconDefinition } from '@/lib/faIcon'

// Interface defining the structure of a social media link
// Used to maintain type safety and consistent link data
interface SocialLink {
  name: string // Display name of the social platform
  icon: FaIconDefinition // Font Awesome icon definition
  url: string // Profile URL
}

// Collection of all social media links
// Used in About page and other components for social media integration
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/metehansenyer/',
  },
  {
    name: 'GitHub',
    icon: faGithub,
    url: 'https://github.com/metehansenyer',
  },
  {
    name: 'Medium',
    icon: faMedium,
    url: 'https://medium.com/@metehansenyer',
  },
  {
    name: 'Instagram',
    icon: faInstagram,
    url: 'https://www.instagram.com/metehansenyer',
  },
]
