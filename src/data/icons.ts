/**
 * Icons Configuration Module
 *
 * This module manages the technology icons used throughout the application.
 * It provides a centralized collection of technology icons with their metadata.
 *
 * Features:
 * - Standardized icon definitions with name, URL, and image source
 * - HTML generation for icon display
 * - Support for technology badges in About page
 * - Consistent styling and hover effects
 */

interface IconDefinition {
  name: string
  url: string
  imgSrc: string
}

// Collection of all available technology icons
// Each icon includes:
// - name: Display name of the technology
// - url: Official website or documentation
// - imgSrc: Self-hosted image under public/icons/tech/ (SVG, or PNG where no SVG exists)
// The `name` doubles as the alt text wherever the icon is rendered.
const icons = {
  javascript: {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    imgSrc: '/icons/tech/javascript.svg',
  },
  nodejs: {
    name: 'NodeJS',
    url: 'https://nodejs.org',
    imgSrc: '/icons/tech/nodejs.svg',
  },
  discordjs: {
    name: 'DiscordJS',
    url: 'https://discord.js.org/',
    imgSrc: '/icons/tech/discordjs.svg',
  },
  mongodb: {
    name: 'MongoDB',
    url: 'https://www.mongodb.com/',
    imgSrc: '/icons/tech/mongodb.svg',
  },
  replit: {
    name: 'Replit',
    url: 'https://replit.com/',
    imgSrc: '/icons/tech/replit.svg',
  },
  cplusplus: {
    name: 'C++',
    url: 'https://isocpp.org',
    imgSrc: '/icons/tech/cplusplus.svg',
  },
  raylib: {
    name: 'Raylib',
    url: 'https://www.raylib.com/',
    imgSrc: '/icons/tech/raylib.png',
  },
  c: {
    name: 'C',
    url: 'https://en.cppreference.com/w/c',
    imgSrc: '/icons/tech/c.svg',
  },
  python: {
    name: 'Python',
    url: 'https://www.python.org/',
    imgSrc: '/icons/tech/python.svg',
  },
  clion: {
    name: 'JetBrains CLion',
    url: 'https://www.jetbrains.com/clion/',
    imgSrc: '/icons/tech/clion.svg',
  },
  cmake: {
    name: 'CMake',
    url: 'https://cmake.org',
    imgSrc: '/icons/tech/cmake.svg',
  },
  photoshop: {
    name: 'Adobe Photoshop',
    url: 'https://www.adobe.com/tr/products/photoshop',
    imgSrc: '/icons/tech/photoshop.svg',
  },
  html: {
    name: 'HTML',
    url: 'https://html.spec.whatwg.org/multipage/',
    imgSrc: '/icons/tech/html.svg',
  },
  css: {
    name: 'CSS',
    url: 'https://www.w3.org/Style/CSS/',
    imgSrc: '/icons/tech/css.svg',
  },
  vscode: {
    name: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/',
    imgSrc: '/icons/tech/vscode.svg',
  },
  visualstudio: {
    name: 'Visual Studio',
    url: 'https://visualstudio.microsoft.com/tr/',
    imgSrc: '/icons/tech/visualstudio.svg',
  },
  github: {
    name: 'Github',
    url: 'https://github.com/',
    imgSrc: '/icons/tech/github.svg',
  },
  fontawesome: {
    name: 'Font Awesome',
    url: 'https://fontawesome.com/',
    imgSrc: '/icons/tech/fontawesome.png',
  },
  csharp: {
    name: 'C#',
    url: 'https://learn.microsoft.com/tr-tr/dotnet/csharp/',
    imgSrc: '/icons/tech/csharp.svg',
  },
  rider: {
    name: 'JetBrains Rider',
    url: 'https://www.jetbrains.com/rider/',
    imgSrc: '/icons/tech/rider.svg',
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    imgSrc: '/icons/tech/tailwindcss.svg',
  },
  typescript: {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    imgSrc: '/icons/tech/typescript.svg',
  },
  react: {
    name: 'React',
    url: 'https://react.dev/',
    imgSrc: '/icons/tech/react.svg',
  },
  arduino: {
    name: 'Arduino',
    url: 'https://www.arduino.cc/',
    imgSrc: '/icons/tech/arduino.svg',
  },
  sqlite: {
    name: 'SQLite',
    url: 'https://www.sqlite.org/',
    imgSrc: '/icons/tech/sqlite.svg',
  },
  nextjs: {
    name: 'NextJS',
    url: 'https://nextjs.org/',
    imgSrc: '/icons/tech/nextjs.svg',
  },
  astro: {
    name: 'Astro',
    url: 'https://astro.build/',
    imgSrc: '/icons/tech/astro.svg',
  },
  git: {
    name: 'Git',
    url: 'https://git-scm.com/',
    imgSrc: '/icons/tech/git.svg',
  },
  markdown: {
    name: 'Markdown',
    url: 'https://daringfireball.net/projects/markdown/',
    imgSrc: '/icons/tech/markdown.svg',
  },
  dotnet: {
    name: 'dotNet',
    url: 'https://dotnet.microsoft.com/en-us/',
    imgSrc: '/icons/tech/dotnet.svg',
  },
  winforms: {
    name: 'Windows Forms',
    url: 'https://learn.microsoft.com/en-us/dotnet/desktop/winforms/',
    imgSrc: '/icons/tech/winforms.png',
  },
  django: {
    name: 'Django',
    url: 'https://www.djangoproject.com/',
    imgSrc: '/icons/tech/django.svg',
  },
  selenium: {
    name: 'Selenium',
    url: 'https://www.selenium.dev/',
    imgSrc: '/icons/tech/selenium.svg',
  },
  ffmpeg: {
    name: 'ffmpeg',
    url: 'https://ffmpeg.org/',
    imgSrc: '/icons/tech/ffmpeg.svg',
  },
  vercel: {
    name: 'Vercel',
    url: 'https://vercel.com/',
    imgSrc: '/icons/tech/vercel.svg',
  },
  docker: {
    name: 'Docker',
    url: 'https://www.docker.com/',
    imgSrc: '/icons/tech/docker.svg',
  },
  express: {
    name: 'Express',
    url: 'https://expressjs.com/',
    imgSrc: '/icons/tech/express.svg',
  },
  fastapi: {
    name: 'FastAPI',
    url: 'https://fastapi.tiangolo.com/',
    imgSrc: '/icons/tech/fastapi.svg',
  },
  zod: {
    name: 'Zod',
    url: 'https://zod.dev/',
    imgSrc: '/icons/tech/zod.svg',
  },
  selectolax: {
    name: 'selectolax',
    url: 'https://github.com/rushter/selectolax',
    imgSrc: '/icons/tech/python.svg',
  },
  webscraping: {
    name: 'Web Scraping',
    url: 'https://en.wikipedia.org/wiki/Web_scraping',
    imgSrc: '/icons/tech/webscraping.svg',
  },
} as const

export type IconSlug = keyof typeof icons

/**
 * Generates an array of icon definitions for the About page
 * Used to display technology badges in the skills section
 *
 * @param iconNames - Array of icon keys to retrieve
 * @returns Array of IconDefinition objects
 */
export function generateAboutTechnologies(iconNames: IconSlug[]): IconDefinition[] {
  return iconNames.map((name) => icons[name])
}

export default icons
