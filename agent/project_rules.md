# Project Rules — Web Enggano
alwaysApply: true

## Identitas Project

Web Enggano adalah website resmi digital Pulau Enggano, dibangun sebagai KKN Legacy Project oleh mahasiswa KKN-PPM UGM. Ini adalah infrastruktur digital pertama pulau terluar di Samudera Hindia tersebut.

**Stack:**
- Backend: Laravel 12 LTS (PHP 8.3+)
- Frontend: Inertia.js v2 + React 18
- Build: Vite 6
- Styling: Tailwind CSS v4 (pakai `@theme` di CSS, bukan `tailwind.config.js`)
- Admin panel: Filament v3 — mount di `/admin`, pakai Livewire sendiri, tidak konflik dengan React
- Database: MySQL (prod) / SQLite (dev)
- Media: Spatie MediaLibrary v11
- Icons: Lucide React
- Maps: Leaflet.js (tanpa API key)

---

## Aturan Umum

- Jangan pernah install package baru tanpa konfirmasi eksplisit dari user
- Jangan refactor file yang tidak diminta
- Jangan ubah struktur folder yang sudah ada kecuali diminta
- Jangan tambahkan komentar yang tidak perlu di kode
- Selalu tanya jika ada ambiguitas sebelum menulis kode — jangan assume

---

## Konvensi Laravel

### Validasi
- Selalu gunakan **Form Request** untuk validasi, bukan `$request->validate()` langsung di controller
- Naming: `StoreModelNameRequest`, `UpdateModelNameRequest`

### Controller
- Controller hanya boleh berisi: validasi (via Form Request), panggil service/model, return Inertia response
- Tidak ada business logic di controller
- Semua controller return `Inertia::render()`, bukan `view()`

### Model
- Selalu definisikan `$fillable` secara eksplisit — jangan pakai `$guarded = []`
- Relasi ditulis sebagai method terpisah yang jelas namanya
- Slug menggunakan `spatie/laravel-sluggable` dengan `generateSlugsOnlyOnCreate()` — jangan ubah slug setelah dibuat agar URL tidak berputar

### Migration
- Urutan migration harus memperhatikan foreign key — tabel parent dibuat duluan
- Urutan yang benar: `villages` → `local_guides` → `destinations` → `homestays` → `kkn_log_items` → `ship_schedules` → `umkms`

### Naming Convention
- Model: singular PascalCase → `Village`, `Umkm`, `KknLogItem`
- Tabel: plural snake_case → `villages`, `umkms`, `kkn_log_items`
- Controller: `VillageController`, `AccommodationController`, `KknLogController`
- Route name: `villages.index`, `villages.show`, `kkn.index`, `kkn.show`

---

## Konvensi React / Inertia

### File
- Semua Page component di `resources/js/Pages/`
- Semua reusable component di `resources/js/Components/`
- Layout di `resources/js/Layouts/AppLayout.jsx`
- Naming: PascalCase untuk semua component dan file

### Aturan Kode
- Gunakan functional component + hooks
- Jangan pakai `innerHTML` — gunakan JSX
- Untuk loop: boleh pakai `.map()` dengan arrow function (ini React, bukan vanilla JS)
- State management: `useState` dan `useEffect` cukup — jangan install Zustand atau Redux tanpa konfirmasi
- Import icon dari `lucide-react`, jangan dari source lain

### Inertia
- Link antar halaman pakai `<Link>` dari `@inertiajs/react`, bukan `<a href>`
- Meta tag per halaman pakai `<Head>` dari `@inertiajs/react`
- Data dari Laravel diterima via `props` — jangan fetch di frontend kecuali untuk Leaflet

### Leaflet
- Selalu lazy load: `const LeafletMap = lazy(() => import('../Components/LeafletMap'))`
- Wrap dengan `<Suspense fallback={...}>`
- Ini penting — Leaflet tidak support SSR dan akan error kalau di-import biasa

### Reusable Components
- **Button**: Gunakan komponen `Button` dari `Components/Button.jsx` untuk tombol/link dengan gaya konsisten
  - Props yang tersedia: `href`, `variant`, `size`, `showArrow`, `arrowPosition`, `className`
  - Variants: `primary` (tombol utama), `ghost` (teks putih untuk hero section), `ghostLight` (teks primary untuk light background)
  - Contoh: `<Button href="/path" variant="ghost" showArrow arrowPosition="left">Kembali</Button>`
- **PrevNext**: Gunakan komponen `PrevNext` dari `Components/PrevNext.jsx` untuk navigasi sebelumnya/berikutnya
  - Props yang tersedia: `prev`, `next`, `prevLabel`, `nextLabel`, `prevEmptyText`, `nextEmptyText`, `prevCardClass`, `nextCardClass`
  - Contoh: `<PrevNext prev={{ href: '/prev', title: 'Prev' }} next={{ href: '/next', title: 'Next' }} prevCardClass="bg-white" nextCardClass="bg-white" />`
- **LanguageSwitcher**: Sudah terintegrasi di Navbar, tidak perlu menambahkannya manual di halaman lain
---

## Sistem Multibahasa (i18n)
Kita pakai **react-i18next** untuk sistem multibahasa Indonesia ↔ Inggris, dengan struktur sebagai berikut:
### Struktur File Translation
```
resources/js/locales/
├── id/
│   └── common.json       (teks umum: nav, button, dll)
└── en/
    ├── common.json       (teks umum bahasa Inggris)
    ├── home.json         (teks halaman Home bahasa Inggris)
    └── villages.json     (teks halaman Villages bahasa Inggris)
```

### Cara Pakai
1. **Import custom hook**: Pakai `useTranslate` dari `../hooks/useTranslate`
2. **Pilih namespace**: Parameter pertama `useTranslate` adalah nama file translation tanpa `.json` (misal `'home'`, `'villages'`, atau `'common'`)
3. **Ganti teks**: Pakai fungsi `tt('TEKS_BAHASA_INDONESIA', 'key.di.file.translation')`

Contoh di `Home/Index.jsx`:
```jsx
import { useTranslate } from '../../hooks/useTranslate'

export default function HomeIndex() {
  const { tt } = useTranslate('home') // namespace = 'home' (pakai en/home.json)
  
  return (
    <h1>{tt('Enggano: Garis Terdepan Samudera Hindia', 'hero.title')}</h1>
    <Button>{tt('Baca Selengkapnya', 'history.readMore')}</Button>
  )
}
```

### Aturan Penting
- **Bahasa Indonesia**: Hardcode langsung di komponen sebagai parameter pertama `tt()`
- **Bahasa Inggris**: Ditarik dari file translation di `resources/js/locales/en/`
- **Teks umum (nav, button)**: Pakai namespace `'common'`
- **Tambahkan namespace baru**: Kalau buat halaman baru, buat file translation di `en/<nama-halaman>.json` dan tambahkan ke `resources/js/i18n/index.js` di bagian `resources.en` dan `ns` array

---

## Konvensi Tailwind CSS v4

- Semua custom color pakai token semantic yang sudah didefinisikan di `resources/css/app.css`
- Token yang tersedia: `primary-*`, `surface-*`, `neutral-*`, `accent-*`, `highlight-*`
- Jangan hardcode warna hex langsung di JSX
- Font: `font-display` (Cormorant Garamond) untuk heading, `font-body` (Inter) untuk teks biasa
- Jangan buat `tailwind.config.js` — v4 tidak pakai file itu

---

## Konvensi Filament v3

- Semua Filament resource di `app/Filament/Resources/`
- `VillageResource`: nonaktifkan Create dan Delete — 6 desa sudah fixed
  ```php
  public static function canCreate(): bool { return false; }
  public static function canDelete(Model $record): bool { return false; }
  ```
- Resource yang hanya untuk admin (bukan editor desa): tambahkan
  ```php
  public static function canAccess(): bool {
      return auth()->user()->role === 'admin';
  }
  ```
- Resource untuk editor desa: `ShipScheduleResource`, `KknLogItemResource`, `HomestayResource`, `UmkmResource`

---

## Struktur Halaman & Routes

| URL | Controller | Inertia Page |
|---|---|---|
| `/` | `HomeController@index` | `Home/Index` |
| `/destinations` | `DestinationController@index` | `Destination/Index` |
| `/destinations/{slug}` | `DestinationController@show` | `Destination/Show` |
| `/accommodations` | `AccommodationController@index` | `Accommodation/Index` |
| `/kkn-log` | `KknLogController@index` | `KknLog/Index` |
| `/kkn-log/{slug}` | `KknLogController@show` | `KknLog/Show` |
| `/villages` | `VillageController@index` | `Village/Index` |
| `/villages/{slug}` | `VillageController@show` | `Village/Show` |
| `/admin/*` | Filament (otomatis) | — |

---

## Data Models Penting

### Relasi utama
- `Village` hasMany `Umkm`
- `Umkm` belongsTo `Village`
- `Destination` belongsTo `LocalGuide`
- `LocalGuide` hasMany `Destination`

### Field kritis yang sering terlupa
- `ShipSchedule`: punya `ticket_link` (nullable URL) dan `agent_whatsapp_number` (nullable string)
- `Village`: slug harus `generateSlugsOnlyOnCreate()` — jangan sampai URL desa berubah
- `Umkm`: foreign key ke `villages`, bukan `village` — sesuaikan name tabel

---

## Warna Badge per Kategori

| Kategori | Class Tailwind |
|---|---|
| bahari | `bg-primary-700/20 text-primary-700` |
| history | `bg-highlight-500/20 text-highlight-700` |
| wildlife | `bg-surface-500/20 text-surface-700` |
| ekonomi | `bg-accent-500/20 text-accent-700` |
| umkm | `bg-surface-500/20 text-surface-700` |
| mudah | `bg-surface-500/20 text-surface-700` |
| sedang | `bg-accent-500/20 text-accent-700` |
| sulit | `bg-highlight-500/20 text-highlight-700` |

---

## Hal yang Sering Error — Perhatikan

1. **Video iOS tidak autoplay** — pastikan `<video autoPlay muted loop playsInline>`, keempat atribut wajib ada
2. **Leaflet error** — wajib lazy import, jangan import biasa
3. **Tailwind class tidak muncul** — pastikan `@import "tailwindcss"` ada di `app.css`
4. **Inertia 404 saat refresh** — Nginx harus punya `try_files $uri $uri/ /index.php`
5. **Upload photos tidak muncul** — jalankan `php artisan storage:link`
6. **Section UMKM tampil kosong** — cek kondisi `{village.umkms.length > 0 && <SectionUmkm />}`
7. **Tombol tiket tidak muncul** — pastikan `ticket_link` dan `agent_whatsapp_number` di-pass dari controller ke Inertia props
