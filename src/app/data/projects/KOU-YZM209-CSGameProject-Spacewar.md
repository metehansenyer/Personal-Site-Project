# Spacewar Oyunu: KOÜ Yazılım Mühendisliği Projesi

Merhaba, ben **Metehan Şenyer**, Kocaeli Üniversitesi Yazılım Mühendisliği öğrencisiyim. Bu proje, 2024-2025 dönemi **Programlama Laboratuvarı III** dersi kapsamında geliştirdiğim **Spacewar Oyunudur**. Proje, yazılım geliştirme becerilerimi sergilemek ve OOP (Nesne Yönelimli Programlama) prensiplerini gerçek bir projede uygulama fırsatı sunmuştur.

## 🚀 Proje Hakkında

**Spacewar Oyunu**, C# dilinde geliştirilmiş, OOP prensiplerini temel alan bir uzay savaşı oyunudur. Amacım, yalnızca teknik gereklilikleri yerine getirmek değil, aynı zamanda eğlenceli ve etkileyici bir oyun deneyimi sunmaktı. Proje, JetBrains Rider ile geliştirilmiş ve MacOS üzerinde test edilmiştir.

## 🎯 Projenin Temel Amaçları

- **C# Programlama Dili** kullanılarak OOP prensiplerinin (kalıtım, polimorfizm, kapsülleme) uygulanması.
-  **Çarpışma Algoritmaları** ve oyun mekanikleri geliştirme.
- Teknik özelliklere ek olarak **ses efektleri**, **görseller**, ve **GUI** gibi detaylarla kullanıcı deneyimini zenginleştirmek.

## 🛠️ Kullanılan Araçlar

Proje boyunca aşağıdaki araçlar ve kaynaklardan faydalandım:

{icons: [csharp, raylib, rider, photoshop]}

- **C#**: Oyun geliştirme ve OOP prensiplerinin uygulanması.
- **Raylib**: Grafiksel oyun geliştirme kütüphanesi.
- **JetBrains Rider**: Kod geliştirme ortamı.
- **Adobe Photoshop**: Görsel tasarım ve düzenleme.

| Kullanılan Araç | Tavsiye Linkler |
|:---:|:---:|
| C# | [Microsoft](https://learn.microsoft.com/tr-tr/collections/yz26f8y64n7k07) |
| C# | [Murat Yücedağ C# Eğitim Kampı](https://youtube.com/playlist?list=PLKnjBHu2xXNPmFMvGKVHA_ijjrgUyNIXr&si=gL6c-oeP9LUJCN2u) |
| Raylib | [Tüm Raylib Özellikleri](https://www.raylib.com/cheatsheet/cheatsheet.html) |
| Raylib-cs | [C# Raylib Paketi](https://github.com/ChrisDill/Raylib-cs) |
| Sınıf Diyagramı | [Plant Text](https://www.planttext.com/) |
| İllüstrasyonlar | [Itch.io](https://itch.io/) |
| Ses Efektleri | [Freesound](https://freesound.org/) |
| Ses Efektleri | [Pixabay](https://pixabay.com/sound-effects/) |
| Çarpışma Sistemi | [Çember ve Üçgen Kesişim Algoritması](https://www.phatcode.net/articles.php?id=459) |
| Çarpışma Sistemi | [Üçgen içinde Nokta Testi / Same Side Tekniği](https://blackpawn.com/texts/pointinpoly/default.html) |
| Animasyon | [Animations Guide](https://www.sandromaglione.com/articles/pixel-art-character-animations-guide) |

## 🎮 Oynanış Mekanikleri

| Mekanik           | Açıklama |
|:---:|:---:|
| Oyuncu Hareketleri  | Uzay gemisini yönlendirerek düşmanlardan kaçabilir ve ateş edebilirsiniz. |
| Çarpışma Algoritması | Mermilerin ve gemilerin çarpışmalarını algılar ve gerekli işlemleri başlatır. |
| Puan Sistemi      | Ekstra can, hız ve hasar gibi avantajlar sağlar. |
| Power-Ups         | Zorluk seviyesi oyuncunun performansına göre artar. |

## 📊 Teknik Detaylar

Projenin detayları aşağıdaki gibidir:

- **Sınıflar**: Oyunun yapısını modüler ve genişletilebilir hale getirmek için OOP prensiplerine uygun olarak tasarlandı.
  1. Spaceship, Enemy, Bullet gibi sınıflar yer almaktadır.
- **Çarpışma Algoritmaları**: Özel algoritmalar (çember kesişim, üçgen içinde nokta testi) kullanılarak çarpışmalar kontrol edildi.
- **Oyun Akışı**: Başlangıç, güncelleme ve bitiş aşamaları, sade ve etkin bir oyun döngüsü ile yönetildi.

## 💾 İndirme ve Çalıştırma

Proje dosyalarını [buradan](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar/archive/refs/tags/game.zip) indirip kendi bilgisayarınızda çalıştırabilirsiniz:

### Geliştiriciler için
```bash
git clone https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar.git
```

### Sadece Oynamak İsteyenler için

| Platform  | İndirme Linki                                                                 |
|-----------|-------------------------------------------------------------------------------|
| **Windows** | [İndir](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar/releases/download/game/spacewar_win-x64.zip) |
| **MacOS**   | [İndir](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar/releases/download/game/spacewar_osx-x64.zip)  |

**MacOS Kullanıcıları için Not:**
Oyunu açmak için şu adımları takip edin:  
1. Terminal’i açın ve oyunun indirildiği klasöre gidin.  
2. Aşağıdaki komutu çalıştırın:

   ```bash
   ./KOU-YZM209-CSGameProject-Spacewar
   ```
3. Normal açılışta kaplamaların yüklenmemesi sorunu bu şekilde çözülmüştür.

## 🎥 Oynanış Videosu

Oynanış videosunu [buradan izleyebilirsiniz](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Spacewar/blob/main/README.md#oynan%C4%B1%C5%9F-videosu).

## 🤝 Teşekkürler

Zor şartlar altındaki proje sunumumdaki yardımlarından dolayı Kocaeli Üniversitesi Yazılım Mühendisliği Bölümü'den Araştırma Görevlisi **Melike Bektaş Kösesoy** ve Araştırma Görevlisi **Şevval Şolpan** hocama teşekkürlerimi arz ederim.

## 🌟 Benimle İletişime Geçin

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz, aşağıdaki bağlantıları kullanabilirsiniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Oyun geliştirme ve yazılım projeleri hakkında her zaman sohbet etmeye açığım!