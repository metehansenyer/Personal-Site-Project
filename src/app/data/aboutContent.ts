// Interface for profile information structure
// Contains basic personal information like name, location, etc.
interface ProfileInfo {
  name: string;
  location: string;
  email: string;
  education: string;
}

// Main interface for about page content
// Centralizes all content used in the about page
interface AboutContent {
  profile: ProfileInfo;
  aboutMe: string;
  sectionTitles: {
    about: string;
    technologies: string;
  };
  loadingText: string;
  noTechText: string;
  technologies: string[];
}

// Content configuration for the about page
// Contains all text content and technology list used in the about section
export const aboutContent: AboutContent = {
  profile: {
    name: "Metehan Şenyer",
    location: "Kocaeli, Türkiye",
    email: "mthansnyr@gmail.com",
    education: "KOÜ YZM (2. Sınıf)"
  },
  aboutMe: "Selam, ben Mete! 19 yaşında bir Yazılım Mühendisliği öğrencisiyim. Şu anda Kocaeli'de yaşıyorum ve sektörün kalbinde kendimi harmanlamak için elimden geleni yapıp kendimi geliştiriyorum. Size bir sır: Şarkı söylemeyi ve yemek yemeyi çok severim.",
  sectionTitles: {
    about: "Hakkımda",
    technologies: "Kullandığım Teknolojiler"
  },
  loadingText: "Teknolojiler yükleniyor...",
  noTechText: "Henüz teknoloji eklenmedi.",
  technologies: [
    "javascript",
    "nodejs",
    "mongodb",
    "c",
    "cplusplus",
    "csharp",
    "python",
    "arduino",
    "sqlite",
    "html",
    "css",
    "tailwindcss",
    "react",
    "nextjs",
    "git",
  ]
}