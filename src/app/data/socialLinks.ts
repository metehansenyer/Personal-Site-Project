/**
 * Social Links Configuration Module
 * 
 * This module manages the social media links displayed throughout the website.
 * It provides a centralized collection of social media profiles and their metadata.
 * 
 * Features:
 * - Standardized social link definitions
 * - Font Awesome icon integration
 * - Consistent link formatting
 * - Easy profile management
 */

// Interface defining the structure of a social media link
// Used to maintain type safety and consistent link data
interface SocialLink {
  name: string;    // Display name of the social platform
  icon: string;    // Font Awesome icon class
  url: string;     // Profile URL
}

// Collection of all social media links
// Used in About page and other components for social media integration
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: 'fa-brands fa-linkedin',
    url: 'https://www.linkedin.com/in/metehansenyer/'
  },
  {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    url: 'https://github.com/metehansenyer'
  },
  {
    name: 'Medium',
    icon: 'fa-brands fa-medium',
    url: 'https://medium.com/@metehansenyer'
  },
  {
    name: 'Instagram',
    icon: 'fa-brands fa-instagram',
    url: 'https://www.instagram.com/metehansenyer'
  }
] 