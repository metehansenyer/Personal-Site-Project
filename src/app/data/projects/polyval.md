# PolyVal: Çok Dilli ve Özelleştirilebilir Doğrulama Kütüphanesi

Merhaba, ben **Metehan Şenyer**. Bu proje, geliştiricilere basitleştirilmiş bir API sunarken, arka planda Zod'u kullanan çok dilli ve son derece özelleştirilebilir bir doğrulama kütüphanesi olan **PolyVal**'dir.

## 🚀 Proje Hakkında

**PolyVal**, karmaşık tip tanımlarına veya doğrulama kuralları bilgisine ihtiyaç duymadan kullanım kolaylığı sağlamak amacıyla geliştirilmiştir. Özellikle çok dilli projelerde ve özelleştirilmiş hata mesajlarına ihtiyaç duyulan durumlarda güçlü bir çözüm sunar.

## 🎯 Projenin Temel Amaçları

- **Basitleştirilmiş API**: Geliştiricilerin karmaşık tanımlamalarla uğraşmadan doğrulama yapmasını sağlamak.
- **Çok Dilli Destek**: `en` (İngilizce) ve `tr` (Türkçe) için varsayılan destek sunmak.
- **Esnek Hata Mesajları**: Hata mesajlarını alana, kural türüne veya genel olarak tamamen özelleştirebilme imkanı.
- **Özel Kurallar**: Geliştiricilerin kendi doğrulama kurallarını kolayca tanımlayabilmesi.
- **TypeScript Desteği**: Tamamen tip güvenli bir geliştirme deneyimi sunmak.

## 🛠️ Kullanılan Araçlar

{icons: [typescript, javascript, nodejs, git, github]}

## 📦 Kurulum

```bash
npm install polyval
```

## 🚀 Temel Kullanım

```typescript
import { validate } from 'polyval'

// Basit şema tanımı
const userSchema = {
  username: {
    type: 'string',
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: 'string',
    required: true,
    email: true,
  },
  age: {
    type: 'number',
    min: 18,
  },
}

// Doğrulanacak veri
const userData = {
  username: 'jo',
  email: 'invalid-email',
  age: 16,
}

// Doğrulama (Türkçe dilinde)
const errors = validate(userSchema, userData, { lang: 'tr' })
console.log(errors)
// [
//   "Username: En az 3 karakter uzunluğunda olmalıdır",
//   "Email: Geçersiz e-posta adresi",
//   "Age: En az 18 olmalıdır"
// ]
```

## 📝 Şema Tanımlama

PolyVal şemaları, basit JavaScript nesneleri kullanılarak tanımlanır. Her alan bir yapılandırma nesnesi kullanır:

```typescript
const schema = {
  fieldName: {
    type: 'string' | 'number' | 'boolean' | 'date', // Alan türü (zorunlu)
    required: boolean, // Alan zorunlu mu? (varsayılan: false)
    // Diğer doğrulama kuralları...
  },
}
```

### Desteklenen Doğrulama Kuralları

#### String Alanları İçin

```typescript
{
  type: 'string',
  required: boolean,           // Zorunlu mu?
  min: number,                 // Minimum uzunluk
  max: number,                 // Maksimum uzunluk
  length: number,              // Tam uzunluk
  email: boolean,              // E-posta formatı
  url: boolean,                // URL formatı
  uuid: boolean,               // UUID formatı
  cuid: boolean,               // CUID formatı
  datetime: boolean,           // ISO 8601 tarih-saat formatı
  ip: 'v4' | 'v6',             // IP adresi formatı
  regex: string,               // Regex deseni (string olarak)
  startsWith: string,          // Bu değerle başlamalı
  endsWith: string,            // Bu değerle bitmeli
  numeric: boolean             // Sadece sayısal karakterler
}
```

#### Number Alanları İçin

```typescript
{
  type: 'number',
  required: boolean,           // Zorunlu mu?
  min: number,                 // Minimum değer
  max: number                  // Maksimum değer
}
```

#### Date Alanları İçin

```typescript
{
  type: 'date',
  required: boolean,           // Zorunlu mu?
  min: number,                 // Minimum tarih (timestamp)
  max: number                  // Maksimum tarih (timestamp)
}
```

#### Boolean Alanları İçin

```typescript
{
  type: 'boolean',
  required: boolean,           // Zorunlu mu?
  equals: boolean              // Belirli bir değere (true/false) eşit olması beklenir mi?
}
```

### Alan Karşılaştırma Kuralları

Bir alanı başka bir alana göre doğrulamak için:

```typescript
{
  password: {
    type: 'string',
    required: true,
    min: 8
  },
  confirmPassword: {
    type: 'string',
    required: true,
    equals: 'password'         // 'password' alanı ile eşleşmeli
  },
  oldPassword: {
    type: 'string',
    required: true,
    notEquals: 'password'      // 'password' alanı ile eşleşmemeli
  }
}
```

### Özel Doğrulama Kuralları

Kendi doğrulama mantığınızı tanımlamak için:

```typescript
{
  username: {
    type: 'string',
    required: true,
    customValidators: [
      {
        validator: (value, data) => {
          // Alfanümerik karakter kontrolü
          if (!/^[a-zA-Z0-9]+/.test(value)) {
            return 'Sadece harf ve rakam kullanabilirsiniz';
          }
          // Admin adı kontrolü
          if (value.toLowerCase() === 'admin') {
            return 'Bu kullanıcı adı kullanılamaz'; // Hata mesajı döndür
          }
          return undefined; // Başarılı doğrulama için undefined döndür
        },
        messageKey: 'noAdminUsername'  // Özel mesajlar için kullanılacak anahtar
      }
    ]
  }
}
```

## 🎨 Hata Mesajlarını Özelleştirme

PolyVal, hata mesajlarını tamamen özelleştirmenize olanak tanır:

```typescript
const errors = validate(schema, data, {
  lang: 'tr',
  customMessages: {
    // 1. Genel hata mesajları
    required: 'Bu alan boş bırakılamaz',
    invalid_type: 'Geçersiz değer türü',

    // 2. Türe dayalı hata mesajları
    string: {
      min: (min) => `Lütfen en az ${min} karakter girin`,
      email: 'Lütfen geçerli bir e-posta adresi girin',
    },
    number: {
      min: (min) => `Değer en az ${min} olmalıdır`,
    },

    // 3. Özel karşılaştırma kuralı mesajları
    equals: (field) => `Bu alan, ${field} alanı ile eşleşmelidir`,

    // 4. Alana dayalı özel mesajlar (en yüksek öncelik)
    fields: {
      username: {
        min: (min) => `Kullanıcı adı en az ${min} karakter olmalıdır`,
        required: 'Kullanıcı adı zorunludur',
        // Özel doğrulama kuralı için mesaj
        noAdminUsername: 'Admin kullanıcı adı rezerve edilmiştir',
      },
    },

    // 5. Genel özel doğrulayıcı mesajları
    custom: {
      noAdminUsername: 'Admin kullanıcı adı kullanılamaz',
    },
  },
})
```

### Mesaj Öncelik Sırası

Hata mesajları aşağıdaki öncelik sırasına göre belirlenir (en yüksekten en düşüğe):

1.  Alana dayalı özel doğrulayıcı mesajları (`customMessages.fields['fieldName']['customMessageKey']`)
2.  Diğer alana dayalı özel mesajlar (`customMessages.fields['fieldName']['min']`)
3.  Genel özel doğrulayıcı mesajları (`customMessages.custom['messageKey']`)
4.  Genel kural tabanlı özel mesajlar (`customMessages.string.email`, `customMessages.number.min`)
5.  Genel hata türü mesajları (`customMessages.required`, `customMessages.invalid_type`)
6.  Seçilen dildeki varsayılan mesajlar

## 🌟 Kapsamlı Örnekler

### Kullanıcı Kayıt Doğrulama Örneği

```typescript
import { validate } from 'polyval'

// Kullanıcı kayıt şeması
const userRegistrationSchema = {
  username: {
    type: 'string',
    required: true,
    min: 3,
    max: 20,
    customValidators: [
      {
        validator: (value) =>
          value.toLowerCase() !== 'admin' ? undefined : 'Admin kullanıcı adı kullanılamaz',
        messageKey: 'noAdminUsername',
      },
    ],
  },
  email: {
    type: 'string',
    required: true,
    email: true,
  },
  age: {
    type: 'number',
    min: 18,
    required: false,
  },
  password: {
    type: 'string',
    required: true,
    min: 8,
    max: 100, // Güçlü şifre için minimum/maksimum uzunluk kontrolü
  },
  confirmPassword: {
    type: 'string',
    required: true,
    equals: 'password', // 'password' alanı ile eşleşmeli
    customValidators: [
      {
        validator: (value, data) =>
          value !== data.password + '123' ? undefined : 'Tahmin edilebilir bir şifre kullandınız',
        messageKey: 'predictablePassword',
      },
    ],
  },
  acceptTerms: {
    type: 'boolean',
    required: true,
    equals: true, // Kullanıcı şartları kabul etmeli
  },
}

// Geçersiz veri
const userData = {
  username: 'al',
  email: 'invalid-email',
  password: '123',
  confirmPassword: '456',
  acceptTerms: false,
}

// Türkçe hata mesajları ile doğrulama
const errorsTR = validate(userRegistrationSchema, userData, { lang: 'tr' })
console.log(errorsTR)

// İngilizce ve özelleştirilmiş mesajlarla doğrulama
const errorsEN = validate(userRegistrationSchema, userData, {
  lang: 'en',
  customMessages: {
    string: {
      min: (min) => `Please ensure this field has at least ${min} characters.`,
      email: "That doesn't look like a valid email address.",
    },
    fields: {
      username: {
        noAdminUsername: "Sorry, 'admin' is a reserved username.",
      },
      confirmPassword: {
        equals: 'Passwords must match exactly.',
      },
    },
  },
})

console.log(errorsEN)
```

## 💻 Geliştirme

### Kurulum

```bash
git clone https://github.com/metehansenyer/polyval.git
cd polyval
npm install
```

### Test

```bash
npm test
```

### Build

```bash
npm run build
```

## ✨ Örnek Kullanım

`example` dizininde kütüphanenin nasıl kullanılacağını gösteren bir örnek proje bulunmaktadır. Bu örneği incelemek ve çalıştırmak için:

1.  Ana PolyVal projesini kurun ve build edin:

    ```bash
    npm install
    npm run build
    ```

2.  Örnek projeye gidin ve çalıştırın:
    ```bash
    cd example
    npm install
    npm run dev
    ```

Bu örnek, kullanıcı kaydı doğrulamasını, çok dilli hata mesajlarını ve özelleştirilmiş mesajların nasıl kullanılacağını gösterir.

## 📄 Lisans

MIT

## 🌟 İletişim

Eğer bu proje ilginizi çektiyse ve benimle iletişime geçmek isterseniz:

- **Email:** [mthansnyr@gmail.com](mailto:mthansnyr@gmail.com)
- **LinkedIn:** [@metehansenyer](https://www.linkedin.com/in/metehansenyer/)

Yazılım projeleri hakkında her zaman sohbet etmeye açığım!
