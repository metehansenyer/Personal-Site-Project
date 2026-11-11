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
// - imgSrc: Path to the icon image (using CDN)
// The `name` doubles as the alt text wherever the icon is rendered.
const icons = {
  javascript: {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  nodejs: {
    name: 'NodeJS',
    url: 'https://nodejs.org',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
  },
  discordjs: {
    name: 'DiscordJS',
    url: 'https://discord.js.org/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-plain.svg',
  },
  mongodb: {
    name: 'MongoDB',
    url: 'https://www.mongodb.com/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg',
  },
  replit: {
    name: 'Replit',
    url: 'https://replit.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg',
  },
  cplusplus: {
    name: 'C++',
    url: 'https://isocpp.org',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  },
  raylib: {
    name: 'Raylib',
    url: 'https://www.raylib.com/',
    imgSrc: 'https://github.com/raysan5/raylib/blob/master/logo/raylib_64x64.png?raw=true',
  },
  c: {
    name: 'C',
    url: 'https://en.cppreference.com/w/c',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
  },
  python: {
    name: 'Python',
    url: 'https://www.python.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  clion: {
    name: 'JetBrains CLion',
    url: 'https://www.jetbrains.com/clion/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clion/clion-original.svg',
  },
  cmake: {
    name: 'CMake',
    url: 'https://cmake.org',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg',
  },
  photoshop: {
    name: 'Adobe Photoshop',
    url: 'https://www.adobe.com/tr/products/photoshop',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
  },
  html: {
    name: 'HTML',
    url: 'https://html.spec.whatwg.org/multipage/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg',
  },
  css: {
    name: 'CSS',
    url: 'https://www.w3.org/Style/CSS/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg',
  },
  vscode: {
    name: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
  },
  visualstudio: {
    name: 'Visual Studio',
    url: 'https://visualstudio.microsoft.com/tr/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg',
  },
  github: {
    name: 'Github',
    url: 'https://github.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  },
  fontawesome: {
    name: 'Font Awesome',
    url: 'https://fontawesome.com/',
    imgSrc: 'https://avatars.githubusercontent.com/u/1505683?s=48&v=4',
  },
  csharp: {
    name: 'C#',
    url: 'https://learn.microsoft.com/tr-tr/dotnet/csharp/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  },
  rider: {
    name: 'JetBrains Rider',
    url: 'https://www.jetbrains.com/rider/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg',
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  typescript: {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  react: {
    name: 'React',
    url: 'https://react.dev/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg',
  },
  arduino: {
    name: 'Arduino',
    url: 'https://www.arduino.cc/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg',
  },
  sqlite: {
    name: 'SQLite',
    url: 'https://www.sqlite.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
  },
  nextjs: {
    name: 'NextJS',
    url: 'https://nextjs.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  astro: {
    name: 'Astro',
    url: 'https://astro.build/',
    imgSrc: 'https://cdn.simpleicons.org/astro/white',
  },
  git: {
    name: 'Git',
    url: 'https://git-scm.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
  markdown: {
    name: 'Markdown',
    url: 'https://daringfireball.net/projects/markdown/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg',
  },
  dotnet: {
    name: 'dotNet',
    url: 'https://dotnet.microsoft.com/en-us/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain-wordmark.svg',
  },
  winforms: {
    name: 'Windows Forms',
    url: 'https://learn.microsoft.com/en-us/dotnet/desktop/winforms/',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/37/WinForms_Logo.png',
  },
  django: {
    name: 'Django',
    url: 'https://www.djangoproject.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
  },
  selenium: {
    name: 'Selenium',
    url: 'https://www.selenium.dev/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
  },
  ffmpeg: {
    name: 'ffmpeg',
    url: 'https://ffmpeg.org/',
    imgSrc:
      'https://www.movieconverter-studio.com/_PUBLIC/ffmpeg/logo-new/ffmpeg-logo-src/ffmpeg-logo.svg',
  },
  vercel: {
    name: 'Vercel',
    url: 'https://vercel.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  },
  docker: {
    name: 'Docker',
    url: 'https://www.docker.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  },
  express: {
    name: 'Express',
    url: 'https://expressjs.com/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
  },
  fastapi: {
    name: 'FastAPI',
    url: 'https://fastapi.tiangolo.com/',
    imgSrc:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  },
  zod: {
    name: 'Zod',
    url: 'https://zod.dev/',
    imgSrc: 'https://zod.dev/logo.svg',
  },
  selectolax: {
    name: 'selectolax',
    url: 'https://github.com/rushter/selectolax',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  },
  webscraping: {
    name: 'Web Scraping',
    url: 'https://en.wikipedia.org/wiki/Web_scraping',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
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
