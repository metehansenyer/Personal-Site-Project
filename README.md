# Kişisel Portfolio Websitesi

Bu proje, projelerimi ve yeteneklerimi sergilemek amacıyla modern web teknolojileri kullanılarak oluşturulmuş kişisel bir portfolio web sitesidir. Web sitesi; temiz, minimalist ve duyarlı bir tasarıma sahiptir.

# İçerik

- [Kişisel Portfolio Websitesi](#kişisel-portfolio-websitesi)
- [İçerik](#i̇çerik)
  - [Kullanılan Araçlar](#kullanılan-araçlar)
  - [Özellikler](#özellikler)
  - [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)
    - [Ön koşullar](#ön-koşullar)
    - [Kurulum](#kurulum)
    - [Uygulamayı Çalıştırma](#uygulamayı-çalıştırma)
  - [İçerik Yönetimi](#i̇çerik-yönetimi)
  - [Canlı Demo](#canlı-demo)
  - [Lisans](#lisans)

## Kullanılan Araçlar

<p align="center">
  <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="nextjs" width="40" height="40"/> </a>
  <a href="https://react.dev/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="40" height="40"/> </a>
  <a href="https://fontawesome.com/" target="_blank" rel="noreferrer"> <img src="https://avatars.githubusercontent.com/u/1505683?s=48&v=4" alt="fontawesome" width="40" height="40"/> </a>
  <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg" alt="markdown" width="40" height="40"/> </a>
  <a href="https://vercel.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" alt="vercel" width="40" height="40"/> </a>
</p>

- **Next.js:** Sunucu tarafı oluşturma ve statik site oluşturma için React çerçevesi.
- **React:** Kullanıcı arayüzleri oluşturmak için JavaScript kütüphanesi.
- **TypeScript:** Düz JavaScript'e derlenen yazılı bir JavaScript üst kümesi.
- **Tailwind CSS:** Hızlı UI geliştirme için bir yardımcı program öncelikli CSS çerçevesi.
- **Font Awesome:** İkonlar için.
- **Vercel:** Barındırma ve dağıtım için.

## Özellikler

```json
{
  "Modern Tasarım": "Okunabilirlik ve kullanıcı deneyimine odaklanan temiz ve minimalist bir tasarım.",
  "Duyarlı Tasarım": "Masaüstü bilgisayarlarda farklı ekran boyutlarına uyum sağlayan tamamen duyarlı tasarım. Mobil geliştirmesi devam etmekte.",
  "Proje Vitrini": "Projelerimi açıklamaları, kullanılan teknolojileri ve depo bağlantılarıyla birlikte sergilemek için ayrılmış bir portfolio bölümü.",
  "Hakkımda Sayfası": "Kendimi, yeteneklerimi ve geçmişimi tanıttığım bir bölüm.",
  "İletişim Sayfası": "Bana ulaşabileceğiniz yollar.",
  "Teknoloji Entegrasyonu": "Her proje için dinamik olarak oluşturulan teknoloji ikonları.",
  "SEO Optimize Edilmiş": "Arama motoru görünürlüğünü artırmak için uygulanan SEO en iyi uygulamaları.",
  "Karanlık Mod": "Düşük ışıklı ortamlarda rahat gezinme için görsel olarak çekici bir karanlık tema."
}
```

## Kurulum ve Çalıştırma

Yerel bir kopyayı kurmak ve çalıştırmak için bu basit adımları izleyin.

### Ön koşullar

- Node.js (v18 veya üstü)
- npm veya yarn

### Kurulum

1.  **Depoyu klonlayın:**
    ```bash
    git clone https://github.com/metehansenyer/Personal-Site-Project.git
    ```
2.  **Proje dizinine gidin:**
    ```bash
    cd Personal-Site-Project
    ```
3.  **Bağımlılıkları yükleyin:**
    ```bash
    npm install
    ```

### Uygulamayı Çalıştırma

- **Geliştirme modu:**
  ```bash
  npm run dev
  ```
  Tarayıcıda görüntülemek için [http://localhost:3000](http://localhost:3000) adresini açın.

- **Production build:**
  ```bash
  npm run build
  ```

- **Production sunucusunu başlatın:**
  ```bash
  npm run start
  ```

## İçerik Yönetimi

Web sitesinin içeriği, `src/app/data` dizinindeki TypeScript dosyaları aracılığıyla yönetilir. Bu, temel bileşenlere dokunmadan kolay güncellemelere olanak tanır.

- **Hakkımda Sayfası:** `src/app/data/aboutContent.ts`
- **İletişim Sayfası:** `src/app/data/contactContent.ts`
- **Projeler:** `src/app/data/projects.ts`
- **Teknoloji İkonları:** `src/app/data/icons.ts`
- **Sosyal Medya Bağlantıları:** `src/app/data/socialLinks.ts`

## Canlı Demo

Web sitesi şu adreste yayında: [who.metehansenyer.tech](https://who.metehansenyer.tech)

## Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.