/**
 * Projects Configuration Module
 * 
 * This module manages the portfolio projects displayed on the website.
 * It provides a centralized collection of project information and metadata.
 * 
 * Features:
 * - Standardized project definitions with consistent structure
 * - Support for GitHub repository integration
 * - Technology tag management
 * - Banner image handling
 */

// Interface defining the structure of a project
// Used to maintain type safety and consistent project data
export interface Project {
  userName: string    // GitHub username
  repoName: string   // GitHub repository name
  title: string      // Display title of the project
  description: string // Brief project description
  banner: string     // URL to the project banner image
  technologies: string[] // List of technologies used
}

// Collection of all portfolio projects
// Each project includes complete metadata and GitHub integration
export const projects: Project[] = [
  {
    userName: "metehansenyer",
    repoName: "Personal-Site-Project",
    title: "Website Project: Portfolio",
    description: "Next.js ve TypeScript ile geliştirilmiş, modern web teknolojilerini kullanan kişisel portfolio websitesi.",
    banner: "/img/home_page.png",
    technologies: ["TypeScript", "React", "NextJS", "TailwindCSS", "Markdown"]
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM209-CSGameProject-Spacewar",
    title: "Game Project: Spacewar",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 24-25 Programlama Laboratuvarı III Projesi. Spacewar Oyunu.",
    banner: "https://raw.githubusercontent.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar/main/KOU-YZM209-CSGameProject-Spacewar/resources/image/menuBackground.png",
    technologies: ["C#", "Raylib"]
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM209-CSGameProject-Minesweeper",
    title: "Game Project: Minesweeper",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 24-25 Programlama Laboratuvarı III Projesi. Minesweeper.",
    banner: "https://raw.githubusercontent.com/metehansenyer/KOU-YZM209-CSGameProject-Minesweeper/main/KOU-YZM209-CSGameProject-Minesweeper/img/game_ss.png",
    technologies: ["C#", ".NET", "Windows Forms"]
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM108-ToDoSiteProject",
    title: "Site Project: ToDo Site",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 23-24 Web Teknolojileri Projesi. To Do sitesi.",
    banner: "https://raw.githubusercontent.com/metehansenyer/KOU-YZM108-ToDoSiteProject/main/img/site_ss.png",
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM104-CppGameProject-AngrySharks",
    title: "Game Project: Angry Sharks",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 23-24 Programlama Laboratuvarı I Projesi. Angry Sharks Oyunu.",
    banner: "https://raw.githubusercontent.com/metehansenyer/KOU-YZM104-CppGameProject-AngrySharks/main/resources/image/game_ss.png",
    technologies: ["C++", "Raylib"]
  },
  {
    userName: "metehansenyer",
    repoName: "Discord-Uptime-Bot",
    title: "Node.js Project: Uptime Bot",
    description: "Veritabanına kaydedilen URL'leri uyanık tutan bir Discord Bot Altyapısı.",
    banner: "https://raw.githubusercontent.com/metehansenyer/Discord-Uptime-Bot/main/img/replit_11.png",
    technologies: ["NodeJS", "Discord.JS"]
  }
]
