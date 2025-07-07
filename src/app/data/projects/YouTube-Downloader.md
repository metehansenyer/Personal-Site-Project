# YouTube İndirici: CLI Tabanlı Video ve Ses İndirme Aracı

Merhaba, ben **Metehan Şenyer**. Bu proje, `yt-dlp` ve `FFmpeg` araçlarını kullanarak YouTube'dan video ve ses indirmeyi kolaylaştıran, gelişmiş bir Komut Satırı Arayüzü (CLI) uygulamasıdır.

## 🚀 Proje Hakkında

**YouTube İndirici**, kullanıcıların karmaşık komutları ezberlemeden, interaktif menüler aracılığıyla istedikleri kalitede ve formatta (MP4, MP3, FLAC vb.) YouTube içeriğini kolayca indirebilmeleri için geliştirilmiştir. Proje, güçlü indirme altyapısını kullanıcı dostu bir arayüzle birleştirir.

## 🎯 Projenin Temel Amaçları

- **Kullanıcı Dostu Arayüz**: `Rich` kütüphanesi ile modern ve interaktif bir CLI deneyimi sunmak.
- **Esnek İndirme Seçenekleri**: Video veya sadece ses olarak indirme, farklı kalite ve format seçenekleri sunmak.
- **Oynatma Listesi Desteği**: Tek bir link ile tüm oynatma listelerini indirme imkanı sağlamak.
- **Akıllı Dosya Yönetimi**: İndirilen dosyaları düzenli bir şekilde klasörlemek.
- **Otomatik Bağımlılık Kontrolü**: `FFmpeg` gibi kritik bağımlılıkların varlığını kontrol etmek.

## 🛠️ Kullanılan Araçlar

{icons: [python, ffmpeg, github]}

| Araç | Açıklama |
|:---:|:---:|
| **Python** | Projenin ana programlama dili. |
| **yt-dlp** | YouTube ve diğer video platformlarından içerik indirme motoru. |
| **FFmpeg** | İndirilen video ve ses dosyalarını birleştirme ve format dönüştürme aracı. |
| **Rich** | Konsol arayüzünü zenginleştiren ve interaktif hale getiren Python kütüphanesi. |

## 🌟 Proje Özellikleri

| Özellik | Detay |
|:---:|:---:|
| **İndirme Modları** | Video veya sadece ses (MP3, M4A, WAV, FLAC) olarak indirme seçenekleri. |
| **Video Kaliteleri** | 1080p, 720p, 480p gibi farklı video çözünürlükleri. |
| **Oynatma Listesi** | Tek bir YouTube oynatma listesi linki ile tüm videoları indirme. |
| **Klasörleme** | İndirilen tüm içerikler `indirilenler` klasörüne kaydedilir; oynatma listeleri için otomatik alt klasörler oluşturulur. |
| **Bağımlılık Kontrolü** | Program başlamadan önce `FFmpeg`'in sistemde kurulu olup olmadığını kontrol eder. |
| **İnteraktif Arayüz** | `Rich` kütüphanesi sayesinde tablolar, paneller ve canlı ilerleme çubukları ile zengin bir kullanıcı deneyimi. |
| **Hata Yönetimi** | Geçersiz linkler veya indirme sırasında oluşan hatalar için anlaşılır geri bildirimler. |

## 💾 İndirme ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **FFmpeg Kurulumu (ÖNEMLİ):**
    Bu araç, video ve ses dosyalarını işlemek için **FFmpeg**'e ihtiyaç duyar. İşletim sisteminize uygun sürümü [ffmpeg.org/download.html](https://ffmpeg.org/download.html) adresinden indirip, sisteminizin **PATH (Ortam Değişkenleri)**'ne eklediğinizden emin olun.

2.  **Repoyu Klonlayın:**
    ```bash
    git clone https://github.com/metehansenyer/YouTube-Downloader.git
    cd YouTube-Downloader
    ```

3.  **Sanal Ortam Oluşturun ve Etkinleştirin:**
    *Projenin diğer Python kurulumlarınızdan izole çalışması için bu adım şiddetle tavsiye edilir.*

    **Windows için:**
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

    **macOS/Linux için:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

4.  **Gerekli Python kütüphanelerini yükleyin:**
    ```bash
    pip install --upgrade yt-dlp rich
    ```

5.  **Programı çalıştırın:**
    ```bash
    python main.py
    ```

## 🖥️ Kullanım

1.  Programı başlattığınızda hoş geldiniz mesajı ve FFmpeg kontrolü yapılır.
2.  İndirmek istediğiniz YouTube video veya oynatma listesi linkini yapıştırıp `Enter`'a basın.
3.  Video veya ses indirme seçeneğini (`v` veya `s`) belirleyin.
4.  Ekranda sunulan tablodan istediğiniz kalite veya formatın numarasını girin.
5.  İndirme işlemi canlı ilerleme çubuğu ile başlar.
6.  İşlem tamamlandığında dosyalarınızı `indirilenler` klasöründe bulabilirsiniz.

```IMPORTANT
Bu araç, kişisel ve eğitim amaçlı kullanım için tasarlanmıştır. İndirilen içeriklerin telif haklarına ve YouTube'un hizmet şartlarına uymak kullanıcının sorumluluğundadır. Lütfen bu aracı sorumlu bir şekilde kullanın.
```

## 🌟 İletişim

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Otomasyon ve yazılım projeleri hakkında her zaman sohbet etmeye açığım!