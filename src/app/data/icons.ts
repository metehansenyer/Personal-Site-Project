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
  name: string;
  url: string;
  imgSrc: string;
  alt: string;
}

// Collection of all available technology icons
// Each icon includes:
// - name: Display name of the technology
// - url: Official website or documentation
// - imgSrc: Path to the icon image (using CDN)
// - alt: Alternative text for accessibility
const icons: { [key: string]: IconDefinition } = {
  javascript: {
    name: 'JavaScript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    alt: 'javascript'
  },
  nodejs: {
    name: 'NodeJS',
    url: 'https://nodejs.org',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg',
    alt: 'nodejs'
  },
  discordjs: {
    name: 'DiscordJS',
    url: 'https://discord.js.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/discordjs/discordjs-plain.svg',
    alt: 'discordjs'
  },
  mongodb: {
    name: 'MongoDB',
    url: 'https://www.mongodb.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg',
    alt: 'mongodb'
  },
  replit: {
    name: 'Replit',
    url: 'https://replit.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/replit/replit-original.svg',
    alt: 'replit'
  },
  cplusplus: {
    name: 'C++',
    url: 'https://isocpp.org',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
    alt: 'cplusplus'
  },
  raylib: {
    name: 'Raylib',
    url: 'https://www.raylib.com/',
    imgSrc: 'https://github.com/raysan5/raylib/blob/master/logo/raylib_64x64.png?raw=true',
    alt: 'raylib'
  },
  c: {
    name: 'C',
    url: 'https://en.cppreference.com/w/c',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg',
    alt: 'c'
  },
  python: {
    name: 'Python',
    url: 'https://www.python.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    alt: 'python'
  },
  clion: {
    name: 'JetBrains CLion',
    url: 'https://www.jetbrains.com/clion/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/clion/clion-original.svg',
    alt: 'clion'
  },
  cmake: {
    name: 'CMake',
    url: 'https://cmake.org',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cmake/cmake-original.svg',
    alt: 'cmake'
  },
  photoshop: {
    name: 'Adobe Photoshop',
    url: 'https://www.adobe.com/tr/products/photoshop',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    alt: 'photoshop'
  },
  html: {
    name: 'HTML',
    url: 'https://html.spec.whatwg.org/multipage/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original-wordmark.svg',
    alt: 'html'
  },
  css: {
    name: 'CSS',
    url: 'https://www.w3.org/Style/CSS/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original-wordmark.svg',
    alt: 'css'
  },
  vscode: {
    name: 'Visual Studio Code',
    url: 'https://code.visualstudio.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    alt: 'vscode'
  },
  visualstudio: {
    name: 'Visual Studio',
    url: 'https://visualstudio.microsoft.com/tr/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg',
    alt: 'visualstudio'
  },
  github: {
    name: 'Github',
    url: 'https://github.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
    alt: 'github'
  },
  fontawesome: {
    name: 'Font Awesome',
    url: 'https://fontawesome.com/',
    imgSrc: 'https://avatars.githubusercontent.com/u/1505683?s=48&v=4',
    alt: 'fontawesome'
  },
  csharp: {
    name: 'C#',
    url: 'https://learn.microsoft.com/tr-tr/dotnet/csharp/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
    alt: 'csharp'
  },
  rider: {
    name: 'JetBrains Rider',
    url: 'https://www.jetbrains.com/rider/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg',
    alt: 'rider'
  },
  tailwindcss: {
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    alt: 'tailwindcss'
  },
  typescript: {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
    alt: 'typescript'
  },
  react: {
    name: 'React',
    url: 'https://react.dev/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg',
    alt: 'react'
  },
  arduino: {
    name: 'Arduino',
    url: 'https://www.arduino.cc/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original-wordmark.svg',
    alt: 'arduino'
  },
  sqlite: {
    name: 'SQLite',
    url: 'https://www.sqlite.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
    alt: 'sqlite'
  },
  nextjs: {
    name: 'NextJS',
    url: 'https://nextjs.org/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    alt: 'nextjs'
  },
  git: {
    name: 'Git',
    url: 'https://git-scm.com/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    alt: 'git'
  },
  markdown: {
    name: 'Markdown',
    url: 'https://daringfireball.net/projects/markdown/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg',
    alt: 'markdown'
  },
  dotnet: {
    name: 'dotNet',
    url: 'https://dotnet.microsoft.com/en-us/',
    imgSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain-wordmark.svg',
    alt: 'dotnet'
  },
  winforms: {
    name: 'Windows Forms',
    url: 'https://learn.microsoft.com/en-us/dotnet/desktop/winforms/',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/3/37/WinForms_Logo.png',
    alt: 'winforms'
  },
  template: {
    name: 'template',
    url: 'url',
    imgSrc: 'src',
    alt: 'template'
  }
};

/**
 * Generates HTML markup for displaying technology icons
 * Used in markdown content rendering
 * 
 * @param iconNames - Array of icon keys to generate HTML for
 * @returns HTML string containing icon elements
 */
export function generateIconsHtml(iconNames: string[]): string {
    const iconHtml = iconNames.map(name => {
        const icon = icons[name];
        if (!icon) return '';
        
        return `<a class="icon-link" href="${icon.url}" target="_blank" rel="noreferrer">\n<img class="icon-img" src="${icon.imgSrc}" alt="${icon.alt}"/>\n</a>`;
    }).join("\n");
    
    return `<div class="icon">\n${iconHtml}</div>`;
}

/**
 * Generates an array of icon definitions for the About page
 * Used to display technology badges in the skills section
 * 
 * @param iconNames - Array of icon keys to retrieve
 * @returns Array of IconDefinition objects
 */
export function generateAboutTechnologies(iconNames: string[]): IconDefinition[] {
    return iconNames.map(name => icons[name]);
}

export default icons; 
