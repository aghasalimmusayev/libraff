# Libraff — Online Kitab Mağazası

Azərbaycan dilində React ilə hazırlanmış tam funksionallıqlı kitab e-ticarət platforması.

## Xüsusiyyətlər

- Kitab kataloqu (1900+ kitab) — kateqoriya, dil və müəllif üzrə filtrləmə
- Slider — öncə seçilmiş kitablar üçün banner
- Kitab detalları səhifəsi
- İstək siyahısı (Wishlist)
- Səbət (Şəbət) və Checkout
- Müəlliflər və kateqoriyalar səhifəsi
- Endirimli kitablar bölməsi
- İstifadəçi qeydiyyatı və girişi (Sign Up / Login)
- Şəxsi profil səhifəsi (qorunan route)
- Admin paneli

## Tech Stack

| Sahə | Texnologiya |
|------|-------------|
| UI Framework | React 19 |
| Build Tool | Vite 6 |
| Routing | React Router DOM v7 |
| HTTP Client | Axios |
| UI Komponentlər | Material UI, Ant Design, Styled Components |
| Slider | Swiper |
| Bildirişlər | React Hot Toast |
| API | Vercel Serverless Functions |
| Data | JSON (api/data/db.json) |

## Layihə Strukturu

```
libraff/
├── 📁 api
│   ├── 📁 Kitablar
│   │   ├── 📄 [id].js
│   │   └── 📄 index.js
│   ├── 📁 data
│   │   └── ⚙️ db.json
│   ├── 📄 Slider.js
│   └── 📄 users.js
├── 📁 public
├── 📁 src
│   ├── 📁 Components
│   │   ├── 📁 Child Components
│   │   │   ├── 📄 CrudNotify.jsx
│   │   │   ├── 📄 Kitablar.jsx
│   │   │   ├── 📄 MuellifKitablar.jsx
│   │   │   └── 🎨 kitablar.css
│   │   ├── 📁 Pages
│   │   │   ├── 📁 Admin
│   │   │   │   ├── 📁 adminCSS
│   │   │   │   │   ├── 🎨 admin.css
│   │   │   │   │   └── 🎨 modal.css
│   │   │   │   ├── 📄 AddModal.jsx
│   │   │   │   ├── 📄 Admin.jsx
│   │   │   │   ├── 📄 AdminLoading.jsx
│   │   │   │   ├── 📄 EditModal.jsx
│   │   │   │   └── 📄 test.jsx
│   │   │   ├── 📁 Links
│   │   │   │   ├── 📁 Links CSS
│   │   │   │   │   ├── 🎨 checkout.css
│   │   │   │   │   ├── 🎨 details.css
│   │   │   │   │   ├── 🎨 muellifler.css
│   │   │   │   │   └── 🎨 sebet.css
│   │   │   │   ├── 📄 Checkout.jsx
│   │   │   │   ├── 📄 Details.jsx
│   │   │   │   ├── 📄 Endirimler.jsx
│   │   │   │   ├── 📄 Muellifler.jsx
│   │   │   │   ├── 📄 Sebet.jsx
│   │   │   │   └── 📄 WishList.jsx
│   │   │   ├── 📁 Main Components
│   │   │   │   ├── 📁 Main CSS
│   │   │   │   │   ├── 🎨 footer.css
│   │   │   │   │   ├── 🎨 headerSlider.css
│   │   │   │   │   ├── 🎨 katalog.css
│   │   │   │   │   ├── 🎨 mainPage.css
│   │   │   │   │   └── 🎨 nav.css
│   │   │   │   ├── 📄 Footer.jsx
│   │   │   │   ├── 📄 HeaderSlider.jsx
│   │   │   │   ├── 📄 Katalog.jsx
│   │   │   │   ├── 📄 Loader.jsx
│   │   │   │   ├── 📄 MainPage.jsx
│   │   │   │   └── 📄 Nav.jsx
│   │   │   └── 📁 Registration
│   │   │       ├── 📄 Login.jsx
│   │   │       ├── 📄 Profile.jsx
│   │   │       ├── 📄 SignUp.jsx
│   │   │       ├── 🎨 profile.css
│   │   │       └── 🎨 registration.css
│   │   ├── 📄 Error.jsx
│   │   ├── 📄 Main.jsx
│   │   ├── 📄 Scroll.jsx
│   │   └── 🎨 error.css
│   ├── 📁 Context
│   │   ├── 📄 MyContext.jsx
│   │   └── 📄 RegContext.jsx
│   ├── 📁 assets
│   │   ├── 📁 img
│   │   │   ├── 🖼️ Slide1.webp
│   │   │   ├── 🖼️ Slide2.webp
│   │   │   ├── 🖼️ Slide3.webp
│   │   │   ├── 🖼️ Slide4.webp
│   │   │   ├── 🖼️ Slide5.webp
│   │   │   ├── 🖼️ Slide6.webp
│   │   │   ├── 🖼️ icon.png
│   │   │   └── 🖼️ logo_libraff.png
│   │   └── 🖼️ react.svg
│   ├── 📁 layout
│   │   ├── 📄 Layout.jsx
│   │   └── 📄 RegLayout.jsx
│   ├── 📁 service
│   │   ├── 📄 Instance.js
│   │   ├── 📄 RegService.js
│   │   └── 📄 service.js
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── ⚙️ .gitignore
├── 📝 README.md
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ vercel.json
└── 📄 vite.config.js
```

## Qurulum

```bash
# Asılılıqları yüklə
npm install

# .env faylı yarat
cp .env.example .env
# VITE_BASE_URL=/api
# VITE_API_TOKEN=your-secret-token
```

## İşə Salma

```bash
# Development
npm run dev

# Production build
npm run build
```

## Mühit Dəyişənləri

`.env` faylında aşağıdakı dəyişənlər olmalıdır:

```env
VITE_BASE_URL=/api
VITE_API_TOKEN=your-secret-token
```

> Vercel deploy-unda bu dəyişənlər **Project Settings → Environment Variables** bölməsindən əlavə edilməlidir.

## API Endpoint-lər

| Method | Endpoint | Təsvir |
|--------|----------|--------|
| GET | `/api/Kitablar` | Bütün kitablar (query: `CategoryName`, `Dil`, `search`) |
| GET | `/api/Kitablar/:id` | Tək kitab |
| POST | `/api/Kitablar` | Yeni kitab əlavə et |
| PATCH | `/api/Kitablar/:id` | Kitabı yenilə |
| DELETE | `/api/Kitablar/:id` | Kitabı sil |
| GET | `/api/Slider` | Slider data |
| GET | `/api/users` | İstifadəçi axtar (query: `email`, `parol`) |
| POST | `/api/users` | Yeni istifadəçi qeydiyyatı |

Bütün sorğular `x-app-token` header tələb edir.

## Deploy (Vercel)

1. Repo-nu Vercel-ə qoş
2. **Settings → Environment Variables** bölməsinə `VITE_BASE_URL` və `VITE_API_TOKEN` əlavə et
3. Deploy et — `api/` folderi avtomatik serverless function kimi tanınır
