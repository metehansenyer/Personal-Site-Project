# KOU Not Bilgi Sistemi: Selenium ile CLI Veri Çekme Aracı

Merhaba, ben **Metehan Şenyer**. Bu proje, Kocaeli Üniversitesi öğrenci bilgi sisteminden notları otomatik olarak çeken ve çevrimdışı erişim sağlayan bir Komut Satırı Arayüzü (CLI) aracıdır.

## 🚀 Proje Hakkında

**KOU Not Bilgi Sistemi CLI**, Selenium ve Python kullanarak geliştirilmiş, öğrencilerin not bilgilerine internet bağlantısı olmadan hızlıca erişmelerini sağlayan bir hobi projesidir. İlk girişten sonra oturum bilgilerini saklayarak sonraki girişlerde reCAPTCHA doğrulamasını atlar ve verilere saniyeler içinde erişim sunar. Bu araç, veri toplama ve otomasyon konularındaki becerilerimi test etmek amacıyla geliştirilmiştir.

## 🌟 Proje Özellikleri

| Özellik | Açıklama |
|:---:|:---:|
| **Otomatik Veri Toplama** | Tüm dönemlerin not verilerini toplar ve çevrimdışı kullanım için JSON formatında saklar. |
| **Güvenli Oturum Yönetimi** | Cookie tabanlı oturum yönetimi ile şifreleri saklamadan güvenli bir şekilde yeniden giriş yapar. |
| **Ultra Hızlı Erişim** | Veriler yerel olarak saklandığı için sonraki kullanımlarda 1 saniyeden daha kısa sürede erişim sağlar. |
| **Veri Güncelleme** | Menüden tek bir komutla sunucudan en güncel verileri çekerek yerel verileri günceller. |
| **Zengin Konsol Arayüzü** | Python'un `rich` kütüphanesi kullanılarak oluşturulmuş kullanıcı dostu ve renkli bir arayüz sunar. |
| **Çapraz Platform Desteği** | Windows, macOS ve Linux üzerinde sorunsuz çalışır. |

## 🛠️ Kullanılan Araçlar

{icons: [python, selenium, vscode, github]}

- **Python**: Projenin ana programlama dili.
- **Selenium**: Web otomasyonu ve KOU öğrenci bilgi sisteminden veri çekme işlemleri için kullanıldı.
- **Rich**: Kullanıcı dostu ve estetik konsol arayüzleri oluşturmak için tercih edildi.
- **BeautifulSoup**: HTML içeriklerini ayrıştırmak için (Selenium'a ek olarak) kullanıldı.
- **VS Code & GitHub**: Kod geliştirme ortamı ve versiyon kontrol sistemi.

## 💾 İndirme ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **Repoyu klonlayın:**
    ```bash
    git clone https://github.com/metehansenyer/KOU-Not-Bilgi-Sistemi-CLI.git
    cd KOU-Not-Bilgi-Sistemi-CLI
    ```

2.  **Sanal ortam oluşturun ve aktifleştirin:**
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS / Linux
    source venv/bin/activate
    ```

3.  **Gerekli paketleri yükleyin:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Programı çalıştırın:**
    ```bash
    python start.py
    ```

## 🖥️ Kullanım

-   **İlk Kullanım**: Programı başlattıktan sonra öğrenci numaranızı ve şifrenizi girerek reCAPTCHA'yı çözmeniz istenir. Bu işlemden sonra tüm verileriniz toplanır (~2-5 dk).
-   **Sonraki Kullanımlar**: Sadece öğrenci numaranızı girmeniz yeterlidir. Verileriniz 1 saniyeden kısa sürede yüklenir.
-   **Menü Seçenekleri**:
    1.  Güncel dönem notlarını görüntüle
    2.  Geçmiş dönemleri seçerek notları görüntüle
    3.  Verileri sunucudan güncelle
    4.  Çıkış

```IMPORTANT
Bu araç eğitim amaçlıdır ve Kocaeli Üniversitesi'nin resmi bir uygulaması değildir. Kullanım sorumluluğu tamamen kullanıcıya aittir.
```

## 🌟 İletişim

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Otomasyon ve yazılım projeleri hakkında her zaman sohbet etmeye açığım!