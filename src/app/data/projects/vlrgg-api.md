# VLR.GG Unofficial API

<div class="project-logo">
  <a href="https://vlrgg.metehansenyer.tech">
    <img src="https://raw.githubusercontent.com/metehansenyer/vlrgg-api/main/static/img/logo_with_text.png" alt="VLR.GG API Logo" width="150">
  </a>
</div>

<div class="center-content">
  <a href="https://www.vlr.gg/">VLR.GG</a>'den Valorant espor verilerini kazıyıp sunan modern, talep üzerine çalışan bir RESTful API.
</div>

<div class="badges">
  <a href="https://github.com/metehansenyer/vlrgg-api/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/metehansenyer/vlrgg-api/ci.yml?branch=main&style=for-the-badge" alt="GitHub Workflow Status"></a>
  <a href="https://github.com/metehansenyer/vlrgg-api"><img src="https://img.shields.io/github/stars/metehansenyer/vlrgg-api?style=for-the-badge" alt="GitHub stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue?style=for-the-badge" alt="License"></a>
  <a href="https://python.org"><img src="https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python" alt="Python Version"></a>
</div>

---

Bu proje; maçlar, haberler, takımlar, oyuncular ve etkinlikler için yapılandırılmış JSON verileri sağlayarak geliştiricilerin kazıma zahmetine girmeden Valorant verileri üzerinde kendi uygulamalarını kolayca oluşturabilmelerini sağlar.

## ✨ Özellikler

-   **Talep Üzerine Kazıma**: Veriler, bir API isteği yapıldığında vlr.gg'den gerçek zamanlı olarak çekilir.
-   **Modern Teknoloji Yığını**: Sağlam ve verimli bir API için Python, FastAPI ve Pydantic ile geliştirildi.
-   **Kapsamlı Endpoint'ler**: Maç sonuçlarından oyuncu istatistiklerine kadar geniş bir veri yelpazesine erişin.
-   **Asenkron Mimari**: Engellenmeyen I/O işlemleri için `httpx` ve `asyncio` kullanır.
-   **Kolay Dağıtım**: Vercel gibi sunucusuz platformlarda sorunsuz dağıtım için tasarlandı.
-   **Test Edilmiş**: Güvenilirliği sağlamak için `pytest` kullanan bir test paketi ile birlikte gelir.

## 🚀 Teknoloji Yığını

-   **Backend**: Python 3.12+
-   **Framework**: FastAPI
-   **HTTP İstemcisi**: `httpx`
-   **HTML Ayrıştırma**: `selectolax`
-   **Test**: `pytest`, `pytest-asyncio`, `respx`
-   **Linting/Formatlama**: `ruff`
-   **Tip Kontrolü**: `mypy`

## API Endpoint'leri

Tüm endpoint'ler için temel URL `/api`'dir.

| Endpoint                | Metot  | Açıklama                                           |
| ----------------------- | ------ | -------------------------------------------------- |
| `/health`               | `GET`  | Sağlık kontrolü endpoint'i.                        |
| `/news`                 | `GET`  | En son haber makalelerini getirir.                 |
| `/matches`              | `GET`  | Yaklaşan, canlı ve tamamlanmış maçları getirir.    |
| `/matches/{match_id}`   | `GET`  | Belirli bir maçın detaylarını getirir.             |
| `/events`               | `GET`  | Etkinlik listesini getirir.                        |
| `/events/{event_id}`    | `GET`  | Belirli bir etkinliğin detaylarını getirir.        |
| `/player/{player_id}`   | `GET`  | Belirli bir oyuncunun detaylarını getirir.         |
| `/search`               | `GET`  | Oyuncuları ve takımları arar.                      |

Sorgu parametreleri ve yanıt modelleri hakkında detaylı bilgi için lütfen `/docs` adresinde sunulan **Dokümantasyon**'a bakın.

## 📦 Kurulum

1.  **Depoyu klonlayın:**
    ```bash
    git clone https://github.com/metehansenyer/vlrgg-api.git
    cd vlrgg-api
    ```

2.  **Sanal ortam oluşturun ve etkinleştirin:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Windows'ta `venv\Scripts\activate` kullanın
    ```

3.  **Bağımlılıkları yükleyin:**
    ```bash
    # Üretim (yalnızca çalışma zamanı)
    pip install -r requirements.txt

    # Geliştirme (lint, tip kontrolü, testler)
    pip install -r requirements.txt -r requirements-dev.txt
    ```

4.  **Ortam değişkenlerini yapılandırın:**
    ```bash
    cp .env.example .env
    # .env dosyasını tercih ettiğiniz ayarlarla düzenleyin
    ```

## 🔧 Ortam Değişkenleri

Bu proje yapılandırma için `.env` dosyalarını kullanır. Tüm mevcut seçenekler için `.env.example` dosyasına bakın.

| Değişken | Açıklama | Varsayılan Değer |
| --- | --- | --- |
| `API_TITLE` | API'nin başlığı | `VLR.GG API` |
| `API_DESCRIPTION` | API açıklama metni | `Valorant esports data API scraped from vlr.gg` |
| `API_VERSION` | API sürümü | `1.0.0` |
| `API_DEVELOPMENT` | Log seviyesi için | `1.0.0` |
| `HOST` | Sunucu adresi | `0.0.0.0` |
| `PORT` | Sunucu portu | `8000` |
| `DEBUG` | Hata ayıklama modunu etkinleştir | `False` |
| `VLR_BASE_URL` | VLR.GG için temel URL | `https://www.vlr.gg` |
| `HTTP_TIMEOUT` | HTTP istekleri için zaman aşımı (saniye) | `10` |
| `REQUEST_MIN_DELAY` | Giden istekler arasındaki minimum gecikme (saniye) | `0.5` |
| `REQUEST_MAX_DELAY` | Giden istekler arasındaki maksimum gecikme (saniye) | `2.0` |
| `MAX_CONCURRENT_REQUESTS` | Maksimum eşzamanlı giden HTTP isteği | `2` |
| `USER_AGENT` | Kazıma için User-Agent başlığı | `.env.example` dosyasına bakın |
| `ACCEPT` | Accept başlığı | `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8` |
| `ACCEPT_LANGUAGE` | Accept-Language başlığı | `en-US,en;q=0.5` |
| `DEFAULT_NEWS_COUNT` | Döndürülecek varsayılan haber sayısı | `10` |
| `MAX_NEWS_COUNT` | Döndürülebilecek maksimum haber sayısı | `50` |
| `SEARCH_NEWS_PAGE_LIMIT` | Haber endpoint'inde aranacak maksimum sayfa | `10` |
| `DEFAULT_MATCHES_COUNT` | Varsayılan maç sayısı | `10` |
| `MAX_MATCHES_COUNT` | Maksimum maç sayısı | `50` |
| `DEFAULT_PLAYER_MATCHES_COUNT` | Varsayılan oyuncu maç sayısı | `10` |
| `MAX_PLAYER_MATCHES_COUNT` | Maksimum oyuncu maç sayısı | `50` |
| `DEFAULT_EVENTS_COUNT` | Varsayılan etkinlik sayısı | `10` |
| `MAX_EVENTS_COUNT` | Maksimum etkinlik sayısı | `50` |
| `API_RATE_LIMIT_PER_MINUTE` | Gelen API hız sınırı (IP başına dakikada) | `60` |
| `CORS_ALLOW_ORIGINS` | CORS için izin verilen kaynaklar (virgülle ayrılmış) | `*` |
| `CORS_ALLOW_METHODS` | İzin verilen HTTP metotları (virgülle ayrılmış) | `GET` |
| `CORS_ALLOW_HEADERS` | İzin verilen başlıklar (virgülle ayrılmış) | `*` |
| `TRUST_PROXY` | İstemci IP'si için `X-Forwarded-For`'a güven | `False` |
| `RESPECT_ROBOTS` | Giden istekler için robots.txt'ye uy | `True` |
| `ROBOTS_TTL_SECONDS` | robots.txt önbellek TTL'si | `86400` |
| `STATIC_CACHE_SECONDS` | Statik varlıklar için önbellek TTL'si | `86400` |
| `DOCS_CACHE_SECONDS` | Dokümantasyon HTML'i için önbellek TTL'si | `300` |
| `USE_SHARED_HTTP_SESSION` | Paylaşılan HTTP oturumu | `False`

## 🏃‍♂️ Yerel Olarak Çalıştırma

Yerel geliştirme sunucusunu başlatmak için şunu çalıştırın:

```bash
uvicorn main:app --reload
```

API `http://127.0.0.1:8000` adresinde kullanılabilir olacaktır.

-   **Ana Sayfa**: `http://127.0.0.1:8000`
-   **Dokümantasyon**: `http://127.0.0.1:8000/docs`

## ✅ Test

Bu proje test için `pytest` kullanır. Test paketini çalıştırmak için:

```bash
pytest
```

## 🚀 Dağıtım

Bu API, Vercel gibi sunucusuz platformlarda kolayca dağıtılmak üzere tasarlanmıştır. Depodaki `vercel.json` dosyası bu amaç için yapılandırılmıştır.

1.  Kodunuzu bir GitHub deposuna gönderin.
2.  Vercel'de yeni bir proje oluşturun ve GitHub deponuza bağlayın.
3.  Vercel, FastAPI uygulamasını otomatik olarak algılayacak ve dağıtacaktır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Herhangi bir öneriniz varsa veya bir hata bulursanız lütfen bir pull request göndermekten veya bir issue açmaktan çekinmeyin.

1.  Depoyu fork'layın.
2.  Özellik dalınızı oluşturun (`git checkout -b feature/HarikaOzellik`).
3.  Değişikliklerinizi commit'leyin (`git commit -m 'Harika bir özellik ekle'`).
4.  Dalı gönderin (`git push origin feature/HarikaOzellik`).
5.  Bir pull request açın.
   
## 🌐 Uluslararasılaştırma

- Site İngilizce ve Türkçe'yi destekler. Üst navigasyondaki dil değiştiriciyi kullanın (EN | TR).
- Yeni bir dil eklemek için `static/i18n/{lang}.json` konumuna bir dosya bırakın.
- Seçilen dil `localStorage`'da saklanır ve `<html>` etiketindeki `lang` özniteliği aracılığıyla yansıtılır.

## ⚖️ Sorumluluk Reddi

Bu proje [vlr.gg](https://www.vlr.gg/)'den veri kazır ve vlr.gg veya Riot Games ile bağlantılı değildir ya da onlar tarafından onaylanmamıştır. Lütfen bu API'yi sorumlu bir şekilde kullanın ve orijinal web sitesinin hizmet şartlarına saygı gösterin. Sağlanan veriler yalnızca eğitim ve kişisel kullanım içindir.

## 📄 Lisans

Bu proje Apache Lisansı, Sürüm 2.0 altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.
