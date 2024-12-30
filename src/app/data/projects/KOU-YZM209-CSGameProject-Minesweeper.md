# Minesweeper Oyunu: KOÜ Yazılım Mühendisliği Projesi

Merhaba, ben **Metehan Şenyer**, Kocaeli Üniversitesi Yazılım Mühendisliği öğrencisiyim. Bu proje, 2024-2025 dönemi **Programlama Laboratuvarı III** dersi kapsamında geliştirdiğim **Minesweeper Oyunudur**. Proje, C# dilinde geliştirilmiş, OOP prensiplerini temel alan bir mayın tarlası oyunudur.

## 🚀 Proje Hakkında

**Minesweeper Oyunu**, C# dilinde geliştirilmiş, OOP prensiplerini temel alan bir mayın tarlası oyunudur. Amacım, yalnızca teknik gereklilikleri yerine getirmek değil, aynı zamanda eğlenceli ve etkileyici bir oyun deneyimi sunmaktı. Proje, Visual Studio ile geliştirildi ve Windows Forms kullanılarak oyun oluşturuldu.

## 🎯 Projenin Temel Amaçları

- **C# Programlama Dili** kullanılarak OOP prensiplerinin uygulanması.
-  **Mayın Tarlası Algoritmaları** ve oyun mekanikleri geliştirme.
-  **WinForms** kullanılarak oyunun görsel tasarımının oluşturulması.
- Teknik özelliklere ek olarak **skor sistemi**, **görseller** ve **GUI** gibi detaylarla kullanıcı deneyimini zenginleştirmek.

## 🛠️ Kullanılan Araçlar

Proje boyunca aşağıdaki araçlar ve kaynaklardan faydalandım:

{icons: [csharp, winforms, dotnet, visualstudio]}

- **C#**: Oyun geliştirme ve OOP prensiplerinin uygulanması.
- **WinForms**: Oyunun görsel tasarımının oluşturulması.
- **.Net**: Oyunun çalıştırılması.
- **Visual Studio**: Kod geliştirme ortamı.

| Kullanılan Araç | Tavsiye Linkler |
|:---:|:---:|
| C# | [Microsoft](https://learn.microsoft.com/tr-tr/collections/yz26f8y64n7k07) |
| C# | [Murat Yücedağ C# Eğitim Kampı](https://youtube.com/playlist?list=PLKnjBHu2xXNPmFMvGKVHA_ijjrgUyNIXr&si=gL6c-oeP9LUJCN2u) |
| WinForms | [Winforms C# Tutorials](https://youtube.com/playlist?list=PLp_RsiLZjwQRqemuY82VEYvgyJ7uI04sm&si=xe6qiGXioaBvPOZn) |
| Minesweeper | [Referans Oyun](https://www.google.com/fbx?fbx=minesweeper) |

## 🎮 Oynanış Mekanikleri

| Mekanik           | Açıklama |
|:---:|:---:|
| Hücre Açma | Sol tık ile hücreleri açabilir, mayın olmayan hücrelerdeki sayıları görebilirsiniz. |
| Bayrak Koyma | Sağ tık ile mayın olduğunu düşündüğünüz hücrelere bayrak koyabilirsiniz. |
| Otomatik Açılma | Boş hücrelere tıkladığınızda çevresindeki mayınsız hücreler otomatik açılır. |
| Skor Sistemi | Doğru bayrak yerleştirme ve hızlı tamamlama ile yüksek skor elde edebilirsiniz. |

## 📊 Teknik Detaylar

Projenin detayları aşağıdaki gibidir:

- **Sınıflar**: Oyunun yapısını modüler ve genişletilebilir hale getirmek için OOP prensiplerine uygun olarak tasarlandı.
  1. Cell, Board, Game gibi temel sınıflar yer almaktadır.
  2. ScoreManager ve GameState sınıfları oyun durumunu yönetir.
- **Mayın Yerleştirme Algoritması**: 
  1. Oyun başlangıcında mayınlar rastgele yerleştirilir
  2. İlk tıklamada mayın gelmemesi sağlanır
  3. Her hücre için komşu mayın sayısı hesaplanır
- **Oyun Mantığı**:
  1. Flood-fill algoritması ile boş hücrelerin açılması
  2. Bayrak sistemi ve mayın kontrolü
  3. Kazanma/kaybetme durumu kontrolü
- **Veri Yönetimi**:
  1. Yüksek skorların saklanması ve sıralanması
  2. Oyun durumunun kaydedilmesi
  3. Ayarların persistant olarak tutulması

## 💾 İndirme ve Çalıştırma

Proje dosyalarını [buradan](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Minesweeper/archive/refs/heads/main.zip) indirip kendi bilgisayarınızda çalıştırabilirsiniz:

### Geliştiriciler için
```bash
git clone https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Minesweeper.git
```

```IMPORTANT
Proje WinForms kullanması sebebiyle sadece Windows platformunda çalışmaktadır.
```

## 🎥 Oynanış Videosu

Oynanış videosunu [buradan izleyebilirsiniz](https://github.com/metehansenyer/KOU-YZM209-CSGameProject-Minesweeper?tab=readme-ov-file#oynan%C4%B1%C5%9F-videosu).

## 🤝 Teşekkürler

Zor şartlar altındaki proje sunumumdaki yardımlarından dolayı Kocaeli Üniversitesi Yazılım Mühendisliği Bölümü'den Araştırma Görevlisi **Melike Bektaş Kösesoy** ve Araştırma Görevlisi **Şevval Şolpan** hocama teşekkürlerimi arz ederim.

## 🌟 Benimle İletişime Geçin

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz, aşağıdaki bağlantıları kullanabilirsiniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Oyun geliştirme ve yazılım projeleri hakkında her zaman sohbet etmeye açığım!