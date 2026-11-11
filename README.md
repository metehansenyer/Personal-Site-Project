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
- **MDX İçerik Koleksiyonları:** Her proje, katı biçimde doğrulanan frontmatter içeren tek bir `.mdx` dosyasıdır; sayfa metinleri dil başına bir JSON dosyasındadır.
- **Font Awesome Free:** Arayüz ikonları için (satır içi SVG olarak, kit/script yüklenmez).
- **pnpm:** Paket yöneticisi.
- **Docker & nginx:** Statik çıktıyı konteyner olarak paketlemek ve sunmak için.
- **Dokploy:** Kendi sunucumda barındırma ve dağıtım için (imaj, deponun `Dockerfile` dosyasından üretilir).

## Özellikler

```json
{
  "Modern Tasarım": "Okunabilirlik ve kullanıcı deneyimine odaklanan temiz ve minimalist bir tasarım.",
  "Duyarlı Tasarım": "Masaüstü ve mobil ekran boyutlarına uyum sağlayan duyarlı tasarım.",
  "Proje Vitrini": "Projelerimi açıklamaları, kullanılan teknolojileri, depo ve canlı demo bağlantılarıyla birlikte sergilemek için ayrılmış bir portfolio bölümü.",
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

- **İç bağlantı kontrolü** (önce `pnpm build` çalıştırın; `dist/` içindeki tüm iç bağlantıları, `#bölüm` bağlantılarını ve görselleri nginx'in sunuş biçimiyle doğrular, kırık bağlantıda hata verir; CI'da build'den sonra çalışır):

  ```bash
  pnpm check:links
  ```

### Docker

Site tamamen statik olduğu için imaj, `pnpm build` çıktısını nginx ile sunar (3000 portu):

```bash
docker build -t personal-site .
docker run --rm -p 3000:3000 personal-site
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın. Kanonik site adresi (canonical, sitemap.xml ve robots.txt dahil) `SITE_URL` build argümanıyla değiştirilebilir (`--build-arg SITE_URL=https://ornek.com`); verilmezse `https://who.metehansenyer.dev` kullanılır. Sağlık kontrolü için `/healthz` adresi `ok` döndürür. Çalışan konteyneri `bash scripts/smoke-test.sh http://127.0.0.1:3000` ile doğrulayabilirsiniz (durum kodları, yönlendirme olmaması, 404 sayfası, önbellek ve güvenlik başlıkları); CI aynı betiği her çalıştırmada imaj üzerinde çalıştırır.

Yayın ortamında site, Dokploy ile kendi sunucumda barındırılır: Docker imajı deponun `Dockerfile` dosyasından üretilir ve Dokploy tarafından yayınlanır.

## İçerik Yönetimi

Web sitesinin içeriği `src` altındaki JSON, TypeScript ve MDX dosyaları aracılığıyla yönetilir. Bu, temel bileşenlere dokunmadan kolay güncellemelere olanak tanır.

- **Sayfa metinleri** (Hakkımda, İletişim, 404, ana sayfa, menü ve buton yazıları, meta başlık/açıklamaları): `src/content/site/<dil>.json` (şu an `tr.json`). Dosya zod şemasıyla (`src/lib/siteSchema.ts`) doğrulanır; bilinmeyen veya eksik bir anahtar build'i durdurur. Yeni bir dil eklemek için `src/lib/locales.ts` dosyasına dil kodunu ve yeni bir `<dil>.json` dosyasını ekleyin.
- **Projeler:** `src/content/projects/*.mdx`
- **Hakkımda sayfasındaki teknolojiler:** `src/data/profile.ts`
- **Teknoloji İkonları:** `src/data/icons.ts`
- **Sosyal Medya Bağlantıları:** `src/data/socialLinks.ts`

### Yeni proje ekleme

1. Banner görselini `src/assets/img/` dizinine ekleyin.
2. `src/content/projects/<dosya-adı>.mdx` dosyasını oluşturun. Dosya adı (büyük/küçük harf duyarlı) URL'yi (`/portfolio/<dosya-adı>`) belirler; GitHub depo adı olarak varsayılmaz, depo bağlantısı `repoUrl` ile açıkça verilir. Dosyanın başına frontmatter ekleyin (bilinmeyen bir alan build'i durdurur):

   ```mdx
   ---
   title: 'Proje Başlığı' # kart başlığı, tarayıcı başlığı ve (heading yoksa) sayfa başlığı
   heading: 'Daha Uzun Sayfa Başlığı' # isteğe bağlı: detay sayfasındaki <h1>
   description: 'Kısa açıklama.'
   banner: ../../assets/img/banner.png
   bannerAlt: 'Banner açıklaması' # isteğe bağlı, varsayılan: "<title> banner"
   technologies: [typescript, astro, tailwindcss] # kart etiketleri + detay sayfası ikonları
   tools: [vscode, github] # isteğe bağlı: detay sayfasında technologies'ten sonra gösterilen ek ikonlar
   releaseDate: 2025-01-31
   updatedDate: 2025-03-15 # isteğe bağlı: sitemap lastmod (yoksa releaseDate)
   order: 1 # isteğe bağlı: order'ı olanlar önce, artan sırayla; diğerleri releaseDate'e göre yeniden eskiye
   draft: true # isteğe bağlı: true ise production build'e girmez, `pnpm dev`'de görünür
   repoUrl: 'https://github.com/kullanici/depo' # isteğe bağlı: yoksa "GitHub'da Görüntüle" düğmesi çıkmaz
   demoUrl: 'https://ornek.com' # isteğe bağlı: "Canlı Demo" düğmesi
   contactNote: 'Kapanış cümlesi.' # isteğe bağlı: ortak iletişim bloğunun altındaki projeye özel cümle
   ---

   Markdown içeriği... (başlık, ikon listesi ve iletişim bölümü sayfa tarafından eklenir; içerikte `# başlık` yazmayın)

   ## Kullanılan Araçlar

   <Icon />
   ```

3. `technologies` ve `tools` değerleri `src/data/icons.ts` içindeki anahtarlardan biri olmalıdır; frontmatter build sırasında zod şemasıyla (`src/lib/projectSchema.ts`) doğrulanır, hatalı bir değer build'i durdurur. `pnpm build` ve ardından `pnpm check:links` çalıştırın.

İçerikte teknoloji ikonları ve vurgulu kutular için MDX bileşenleri kullanılabilir (bileşenleri sayfaya ayrıca import etmeye gerek yoktur):

```mdx
<Icon />

<Icon slugs={['typescript', 'astro']} />

<Callout type="important">Önemli bir not.</Callout>
```

`<Icon />` projenin `technologies` ve `tools` listesini gösterir; `slugs` verilirse yalnızca o liste gösterilir. `Callout` türleri: `important`, `warning`, `note`. İçerikteki bağlantılar tam adres olmalıdır (GitHub README'sine özgü göreli bağlantılar, örneğin `LICENSE`, sitede kırılır; `pnpm check:links` bunları yakalar).

### Yeni teknoloji ikonu ekleme

Logoyu (mümkünse SVG) `public/icons/tech/<anahtar>.<uzantı>` olarak kaydedin ve `src/data/icons.ts` içindeki `icons` nesnesine `name` (aynı zamanda img alt metni olarak kullanılır), `url` ve `imgSrc` (`/icons/tech/<anahtar>.<uzantı>`) alanlarıyla yeni bir kayıt ekleyin. Teknoloji logoları depoda barındırılır (devicon: MIT, simpleicons: CC0); uzak bir adresten yüklenmez. Anahtar, proje frontmatter'ındaki `technologies` / `tools` listelerinde, `<Icon slugs={[...]} />` içinde ve `src/data/profile.ts` içinde kullanılan kısa addır.

## Canlı Demo

Web sitesi şu adreste yayında: [who.metehansenyer.dev](https://who.metehansenyer.dev)

## Lisans

İkonlar: [Font Awesome Free](https://fontawesome.com/license/free) ikonları [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) lisansıyla kullanılmaktadır. Teknoloji logoları kendi sahiplerinin ticari markalarıdır; devicon kaynaklı dosyaların MIT lisans bildirimi `public/icons/tech/NOTICE.txt` içindedir.

Bu proje MIT Lisansı altında lisanslanmıştır. Ayrıntılar için [LICENSE](LICENSE) dosyasına bakın.
