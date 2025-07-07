# KollektifKampus: Django ile Akran Öğrenme Platformu

Merhaba, ben **Metehan Şenyer**. Bu proje, Kocaeli Üniversitesi Yazılım Mühendisliği Bölümü'nün Web Programlama dersi kapsamında geliştirdiğimiz **KollektifKampus** adlı akran öğrenme platformudur. Proje, Django çatısını kullanarak modern ve etkileşimli bir web uygulaması oluşturma becerilerimizi sergilemektedir.

## 🚀 Proje Hakkında

**KollektifKampus**, üniversite öğrencilerinin birbirlerinden öğrenmesini ve bilgi paylaşımını kolaylaştırmayı amaçlayan bir platformdur. Öğrenciler bu platformda ders talepleri oluşturabilir, eğitmen olarak kaydolabilir ve diğer öğrencilere yardımcı olarak topluluk içinde aktif bir rol alabilirler.

## 🎯 Projenin Temel Amaçları

- **Django Framework** kullanarak kapsamlı bir web uygulaması geliştirmek.
- **Farklı kullanıcı rolleri** (Öğrenci, Eğitmen, Moderatör) ve yetkilendirme sistemleri oluşturmak.
- Veritabanı üzerinde tam **CRUD (Create, Read, Update, Delete)** işlemleri sunmak.
- **Gelişmiş arama ve filtreleme** özellikleriyle kullanıcı deneyimini iyileştirmek.
- **Veri içeri/dışarı aktarma** işlevselliği ile veri yönetimini kolaylaştırmak.

## 🛠️ Kullanılan Araçlar

{icons: [python, django, sqlite, html, css, vscode, github]}

| Teknoloji | Açıklama |
|:---:|:---:|
| Python & Django | Projenin ana geliştirme dili ve web çatısı. |
| SQLite | Geliştirme aşamasında kullanılan hafif veritabanı. |
| HTML/CSS | Kullanıcı arayüzünün yapılandırılması ve stilendirilmesi. |
| Visual Studio Code | Kod geliştirme ortamı. |
| GitHub | Versiyon kontrol sistemi. |

## 🌟 Site Özellikleri

| Özellik | Açıklama |
|:---:|:---:|
| **Kullanıcı Rolleri** | Öğrenci, Eğitmen, Moderatör ve Admin olmak üzere dört farklı kullanıcı rolü ve yetkileri. |
| **Ders Talep Sistemi** | Öğrenciler, ihtiyaç duydukları dersler için talepler oluşturabilir ve bu taleplere eğitmenler yanıt verebilir. |
| **CRUD İşlemleri** | Ders talepleri, kullanıcı profilleri ve diğer veriler için tam kontrol sağlayan arayüzler. |
| **Kimlik Doğrulama** | Güvenli kullanıcı kaydı, giriş, çıkış ve şifre sıfırlama işlemleri. |
| **Gelişmiş Arama** | Ders taleplerini başlık, açıklama, kategori gibi birden çok kritere göre arama. |
| **Veri Yönetimi** | Temel verilerin toplu olarak içeri ve dışarı aktarılabilmesi. |

## 💾 İndirme ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  Repoyu klonlayın:
    ```bash
    git clone https://github.com/metehansenyer/KOU-YZM212-DjangoProject-KollektifKampus.git
    cd KollektifKampus
    ```

2.  Sanal ortam oluşturun ve aktifleştirin:
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # macOS / Linux
    source venv/bin/activate
    ```

3.  Gerekli paketleri yükleyin:
    ```bash
    pip install -r requirements.txt
    ```

4.  Veritabanı migrasyonlarını uygulayın:
    ```bash
    python manage.py migrate
    ```

5.  Geliştirme sunucusunu başlatın:
    ```bash
    python manage.py runserver
    ```

6.  Tarayıcınızda `http://127.0.0.1:8000/` adresine giderek uygulamaya erişebilirsiniz.

## 🙏 Teşekkürler

Web Programlama alanındaki öğrenimimizde katkılarından dolayı Kocaeli Üniversitesi Yazılım Mühendisliği Bölümü'den Dr. Öğr. Üyesi **Levent BAYINDIR** hocamıza teşekkürlerimizi arz ederiz.

## 🌟 İletişim

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Web geliştirme ve yazılım projeleri hakkında her zaman sohbet etmeye açığım!