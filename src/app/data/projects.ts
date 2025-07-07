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
  releaseDate: Date // Release date of the project
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
    technologies: ["TypeScript", "React", "NextJS", "TailwindCSS", "Markdown"],
    releaseDate: new Date(2025, 1, 2)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM209-CSGameProject-Spacewar",
    title: "Game Project: Spacewar",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 24-25 Programlama Laboratuvarı III Projesi. Spacewar Oyunu.",
    banner: "/img/kou_yzm209_csgameproject_spacewar.png",
    technologies: ["C#", "Raylib"],
    releaseDate: new Date(2024, 12, 23)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM209-CSGameProject-Minesweeper",
    title: "Game Project: Minesweeper",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 24-25 Programlama Laboratuvarı III Projesi. Minesweeper.",
    banner: "/img/kou_yzm209_csgameproject_minesweeper.png",
    technologies: ["C#", ".NET", "Windows Forms"],
    releaseDate: new Date(2024, 11, 1)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM108-ToDoSiteProject",
    title: "Site Project: ToDo Site",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 23-24 Web Teknolojileri Projesi. To Do sitesi.",
    banner: "/img/kou_yzm108_todositeproject.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    releaseDate: new Date(2024, 5, 10)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM104-CppGameProject-AngrySharks",
    title: "Game Project: Angry Sharks",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 23-24 Programlama Laboratuvarı I Projesi. Angry Sharks Oyunu.",
    banner: "/img/kou_yzm104_cppgameproject_angrysharks.png",
    technologies: ["C++", "Raylib"],
    releaseDate: new Date(2024, 5, 4)
  },
  {
    userName: "metehansenyer",
    repoName: "Discord-Uptime-Bot",
    title: "Node.js Project: Uptime Bot",
    description: "Veritabanına kaydedilen URL'leri uyanık tutan bir Discord Bot Altyapısı.",
    banner: "/img/discord_uptime_bot.png",
    technologies: ["NodeJS", "Discord.JS"],
    releaseDate: new Date(2023, 9, 28)
  },
  {
    userName: "metehansenyer",
    repoName: "polyval",
    title: "PolyVal",
    description: "PolyVal geliştiricilere basitleştirilmiş bir API sunarken, arka planda Zod'u kullanan çok dilli ve son derece özelleştirilebilir bir doğrulama kütüphanesidir.",
    banner: "/img/polyval.png",
    technologies: ["NodeJS", "Zod", "Typescript"],
    releaseDate: new Date(2025, 5, 22)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-YZM212-DjangoProject-KollektifKampus",
    title: "Site Project: Kollektif Kampus",
    description: "Kocaeli Üniversitesi Mühendislik Fakültesi Yazılım Mühendisliği 24-25 Web Programlama Dersi Projesi. KollektifKampus.",
    banner: "/img/kou_yzm212_djangoproject_kollektifkampus.png",
    technologies: ["Python", "Django", "SQLite"],
    releaseDate: new Date(2025, 5, 28)
  },
  {
    userName: "metehansenyer",
    repoName: "KOU-Not-Bilgi-Sistemi-CLI",
    title: "Scraping Project: Kocaeli Üniversitesi Not Bilgi Sistemi",
    description: "Kocaeli Üniversitesi öğrenci bilgi sisteminden otomatik not çekme ve offline erişim aracı. Veri toplama ile hızlı offline erişim sağlar.",
    banner: "/img/kou_not_bilgi_sistemi_cli.png",
    technologies: ["Python", "Selenium", "Web Scraping"],
    releaseDate: new Date(2025, 6, 9)
  },
  {
    userName: "metehansenyer",
    repoName: "YouTube-Downloader",
    title: "YouTube Downloader",
    description: "`yt-dlp` ve `FFmpeg` üzerine kurulmuş, gelişmiş bir komut satırı arayüzü (CLI) ile YouTube'dan video ve ses indirme aracı. Kullanıcı dostu arayüzü ile belirli format ve kalitelerde indirme yapmayı kolaylaştırır.",
    banner: "/img/youtube_downloader.png",
    technologies: ["Python", "yt-dlp", "FFmpeg"],
    releaseDate: new Date(2025, 6, 16)
  }
]