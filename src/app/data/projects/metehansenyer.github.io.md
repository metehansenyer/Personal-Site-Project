# 🚀 Modern Portfolio: Next.js & TypeScript ile Geliştirilmiş Kişisel Websitesi

Merhaba! Ben **Metehan Şenyer**, ve bu proje benim dijital kartvizitim. Modern web teknolojilerini kullanarak geliştirdiğim bu portfolio sitesi, kod kalitesi ve kullanıcı deneyimini ön planda tutuyor.

## 💡 Neden Bu Teknolojiler?

{icons: [nextjs, typescript, react, tailwindcss, markdown]}

- **Next.js 15**: SSR ve optimizasyon özellikleriyle ultra-hızlı sayfa yüklemeleri
- **TypeScript**: Tip güvenliği ve gelişmiş IDE desteğiyle hatasız kod
- **React**: Bileşen tabanlı geliştirme ve veri akışı
- **Tailwind CSS**: Özelleştirilebilir ve performanslı stil yönetimi
- **Markdown Integration**: Dinamik içerik yönetimi için modern yaklaşım

## 🛠️ Teknik Özellikler

- **Akıllı Cihaz Tespiti**: User-Agent analizi ile otomatik mobil yönlendirme
- **SEO Optimizasyonu**: Meta tag'ler ve Open Graph protokolü desteği
- **Dinamik Routing**: Next.js'in güçlü routing sistemiyle sorunsuz navigasyon
- **Performans Odaklı**: Lighthouse skorları ve Core Web Vitals metrikleri optimize edildi

## 🎯 Mimari Yaklaşım

```typescript
// Örnek: Middleware ile Akıllı Yönlendirme
export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = MOBILE_PATTERNS.some(pattern => pattern.test(userAgent))
  
  if (isMobile) {
    return NextResponse.redirect(new URL('/mobile', request.url))
  }
}
```

## 🌟 Öne Çıkan Özellikler

- **Dark Theme**: Göz yorgunluğunu azaltan şık tasarım
- **Responsive Layout**: Her ekran boyutuna uyumlu UI
- **Icon Entegrasyonu**: Teknoloji stack'ini görsel olarak sergileyen sistem
- **Markdown Parser**: Proje dokümantasyonları için özel render sistemi

## 🔍 Clean Code Prensipleri

- **SOLID** prensiplerine uygun component yapısı
- **DRY** yaklaşımıyla tekrar kullanılabilir komponentler
- **Modüler** yapı ile kolay bakım ve güncelleme
- **TypeScript** ile güçlü tip kontrolü

## 📈 Performans Metrikleri

- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Lighthouse Performance Score: 90+
- %100 TypeScript coverage

## 🎨 UI/UX Özellikleri

- Minimalist ve modern tasarım
- Sayfa geçişlerinde smooth animasyonlar
- Kullanıcı dostu navigasyon
- Profesyonel tipografi ve renk paleti

## 🔒 Güvenlik

- Güvenli external link yönetimi
- Rate limiting ve request validasyonu
- Modern güvenlik başlıkları
- XSS ve CSRF koruması

Bu proje, modern web geliştirme pratiklerini ve en iyi teknolojileri bir araya getirerek, performans ve kullanıcı deneyimini optimize eden bir yaklaşım sunuyor. 

## 🌟 Benimle İletişime Geçin

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz, aşağıdaki bağlantıları kullanabilirsiniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Yeni projeler hakkında her zaman sohbet etmeye açığım!