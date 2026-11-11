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
    - [Docker](#docker)
  - [İçerik Yönetimi](#i̇çerik-yönetimi)
    - [Yeni proje ekleme](#yeni-proje-ekleme)
    - [Yeni teknoloji ikonu ekleme](#yeni-teknoloji-ikonu-ekleme)
  - [Canlı Demo](#canlı-demo)
  - [Lisans](#lisans)

## Kullanılan Araçlar

<p align="center">
  <a href="https://astro.build/" target="_blank" rel="noreferrer"> <img src="https://cdn.simpleicons.org/astro/white" alt="astro" width="40" height="40"/> </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="tailwindcss" width="40" height="40"/> </a>
  <a href="https://fontawesome.com/" target="_blank" rel="noreferrer"> <img src="https://avatars.githubusercontent.com/u/1505683?s=48&v=4" alt="fontawesome" width="40" height="40"/> </a>
  <a href="https://daringfireball.net/projects/markdown/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg" alt="markdown" width="40" height="40"/> </a>
  <a href="https://pnpm.io/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pnpm/pnpm-original.svg" alt="pnpm" width="40" height="40"/> </a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" alt="docker" width="40" height="40"/> </a>
  <a href="https://nginx.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a>
</p>

- **Astro 7:** İçerik odaklı, statik çıktı üreten web çerçevesi. Arayüz kütüphanesi (React vb.) kullanılmaz; sayfalar saf Astro bileşenleriyle yazılmıştır.
- **TypeScript:** Düz JavaScript'e derlenen yazılı bir JavaScript üst kümesi.
- **Tailwind CSS v4:** Hızlı UI geliştirme için bir yardımcı program öncelikli CSS çerçevesi.
- **MDX İçerik Koleksiyonları:** Her proje, tiplenmiş frontmatter içeren tek bir `.mdx` dosyasıdır.
- **Font Awesome Free:** Arayüz ikonları için (satır içi SVG olarak, kit/script yüklenmez).
- **pnpm:** Paket yöneticisi.
- **Docker & nginx:** Statik çıktıyı konteyner olarak paketlemek ve sunmak için.
- **Dokploy:** Kendi sunucumda barındırma ve dağıtım için (imaj, deponun `Dockerfile` dosyasından üretilir).

## Özellikler

```json
{
  "Modern Tasarım": "Okunabilirlik ve kullanıcı deneyimine odaklanan temiz ve minimalist bir tasarım.",
  "Duyarlı Tasarım": "Masaüstü ve mobil ekran boyutlarına uyum sağlayan duyarlı tasarım.",
  "Proje Vitrini": "Projelerimi açıklamaları, kullanılan teknolojileri ve depo bağlantılarıyla birlikte sergilemek için ayrılmış bir portfolio bölümü.",
  "Hakkımda Sayfası": "Kendimi, yeteneklerimi ve geçmişimi tanıttığım bir bölüm.",
  "İletişim Sayfası": "Bana ulaşabileceğiniz yollar.",
  "Teknoloji Entegrasyonu": "Her proje için frontmatter'daki teknoloji listesinden oluşturulan teknoloji ikonları.",
  "SEO Optimize Edilmiş": "Arama motoru görünürlüğünü artırmak için uygulanan SEO en iyi uygulamaları.",
  "Karanlık Mod": "Düşük ışıklı ortamlarda rahat gezinme için görsel olarak çekici bir karanlık tema."
}
```

## Kurulum ve Çalıştırma

Yerel bir kopyayı kurmak ve çalıştırmak için bu basit adımları izleyin.

### Ön koşullar

- Node.js (v22 veya üstü)
- [pnpm](https://pnpm.io/) (npm veya yarn kullanmayın)

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
    pnpm install
    ```

### Uygulamayı Çalıştırma

- **Geliştirme modu:**

  ```bash
  pnpm dev
  ```

  Tarayıcıda görüntülemek için [http://localhost:4321](http://localhost:4321) adresini açın.

- **Production build** (statik dosyalar `dist/` dizinine yazılır):

  ```bash
  pnpm build
  ```

- **Production build'i yerelde önizleyin:**

  ```bash
  pnpm preview
  ```

- **Kontroller** (tür denetimi, ESLint ve Prettier):

  ```bash
  pnpm check
  ```

- **Testler** (Vitest):

  ```bash
  pnpm test
  ```

### Docker

Site tamamen statik olduğu için imaj, `pnpm build` çıktısını nginx ile sunar (3000 portu):

```bash
docker build -t personal-site .
docker run --rm -p 3000:3000 personal-site
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. Kanonik site adresi (canonical, sitemap.xml ve robots.txt dahil) `SITE_URL` build argümanıyla değiştirilebilir (`--build-arg SITE_URL=https://ornek.com`); verilmezse `https://who.metehansenyer.dev` kullanılır. Sağlık kontrolü için `/healthz` adresi `ok` döndürür.

Yayın ortamında site, Dokploy ile kendi sunucumda barındırılır: Docker imajı deponun `Dockerfile` dosyasından üretilir ve Dokploy tarafından yayınlanır.

## İçerik Yönetimi

Web sitesinin içeriği `src` altındaki TypeScript ve MDX dosyaları aracılığıyla yönetilir. Bu, temel bileşenlere dokunmadan kolay güncellemelere olanak tanır.

- **Hakkımda Sayfası:** `src/data/aboutContent.ts`
- **İletişim Sayfası:** `src/data/contactContent.ts`
- **Projeler:** `src/content/projects/*.mdx`
- **Teknoloji İkonları:** `src/data/icons.ts`
- **Sosyal Medya Bağlantıları:** `src/data/socialLinks.ts`

### Yeni proje ekleme

1. Banner görselini `src/assets/img/` dizinine ekleyin.
2. `src/content/projects/<repoName>.mdx` dosyasını oluşturun. Dosya adı (büyük/küçük harf duyarlı) hem URL'yi (`/portfolio/<repoName>`) hem de GitHub depo adını belirler. Dosyanın başına frontmatter ekleyin:

   ```mdx
   ---
   userName: 'github-kullanici-adi'
   title: 'Proje Başlığı'
   description: 'Kısa açıklama.'
   banner: ../../assets/img/banner.png
   technologies: [typescript, astro, tailwindcss]
   releaseDate: 2025-01-31
   ---

   # Proje Başlığı

   Markdown içeriği...
   ```

3. `technologies` alanındaki değerler `src/data/icons.ts` içindeki anahtarlardan biri olmalıdır; frontmatter build sırasında zod şemasıyla (`src/content.config.ts`) doğrulanır, hatalı bir değer build'i durdurur.

İçerikte teknoloji ikonları ve vurgulu kutular için MDX bileşenleri kullanılabilir (bileşenleri sayfaya ayrıca import etmeye gerek yoktur):

```mdx
<Icon slugs={['typescript', 'astro']} />

<Callout type="important">Önemli bir not.</Callout>
```

`Callout` türleri: `important`, `warning`, `note`.

### Yeni teknoloji ikonu ekleme

Logoyu (mümkünse SVG) `public/icons/tech/<anahtar>.<uzantı>` olarak kaydedin ve `src/data/icons.ts` içindeki `icons` nesnesine `name` (aynı zamanda img alt metni olarak kullanılır), `url` ve `imgSrc` (`/icons/tech/<anahtar>.<uzantı>`) alanlarıyla yeni bir kayıt ekleyin. Teknoloji logoları depoda barındırılır (devicon: MIT, simpleicons: CC0); uzak bir adresten yüklenmez. Anahtar, hem proje frontmatter'ındaki `technologies` listesinde hem de `<Icon slugs={[...]} />` içinde kullanılan kısa addır.

## Canlı Demo

Web sitesi şu adreste yayında: [who.metehansenyer.dev](https://who.metehansenyer.dev)

## Lisans

İkonlar: [Font Awesome Free](https://fontawesome.com/license/free) ikonları [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) lisansıyla kullanılmaktadır. Teknoloji logoları kendi sahiplerinin ticari markalarıdır.

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
