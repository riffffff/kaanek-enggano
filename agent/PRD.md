# Product Requirements Document
## Web Enggano — Digital Presence Pulau Enggano

| | |
|---|---|
| **Versi** | 1.1 |
| **Status** | Draft |
| **Dibuat oleh** | Tim KKN-PPM UGM |
| **Terakhir diperbarui** | Juni 2026 |
| **Stack** | Laravel 12 LTS · Inertia.js v2 · React 18 · Filament v3 · Tailwind CSS v4 |

---

## Daftar Isi

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [User Personas](#4-user-personas)
5. [Sitemap & Information Architecture](#5-sitemap--information-architecture)
6. [Feature Requirements](#6-feature-requirements)
7. [Design System](#7-design-system)
8. [Technical Architecture](#8-technical-architecture)
9. [Data Models](#9-data-models)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Admin Panel Requirements](#11-admin-panel-requirements)
12. [Constraints & Assumptions](#12-constraints--assumptions)
13. [Success Metrics](#13-success-metrics)
14. [Out of Scope](#14-out-of-scope)

---

## 1. Overview

**Web Enggano** adalah website resmi digital Pulau Enggano yang dibangun sebagai **KKN Legacy Project** oleh mahasiswa KKN-PPM UGM. Website ini berfungsi sebagai infrastruktur digital pertama pulau terluar di Samudera Hindia ini — menyajikan informasi pariwisata, akomodasi, transportasi, dokumentasi program kerja KKN, dan history desa-desa di Enggano dalam satu platform yang dapat dikelola mandiri oleh perangkat desa setelah mahasiswa KKN selesai bertugas.

**Tagline:** *"Enggano: Garis Terdepan Samudera Hindia."*

---

## 2. Problem Statement

### Masalah Utama

Pulau Enggano adalah pulau terluar Indonesia yang secara administratif termasuk Kabupaten Bengkulu Utara. Pulau ini memiliki potential wisata bahari, hutan endemik, dan kekayaan budaya 6 tribe asli yang luar biasa — tetapi hampir tidak memiliki kehadiran digital sama sekali.

**Akibatnya:**
- Wisatawan potensial tidak tahu cara ke Enggano (schedule kapal, pesawat, biaya)
- Tidak ada direktori homestay atau pemandu lokal yang bisa diakses secara online
- Dokumentasi program kerja KKN tersebar di laporan internal, tidak bisa diakses publik
- Sejarah dan budaya 6 desa di Enggano tidak terdokumentasi secara digital
- Produk UMKM lokal tidak punya channel pemasaran digital sama sekali
- Setelah mahasiswa KKN pulang, tidak ada warisan digital yang ditinggalkan

### Masalah Teknis Konteks

- Mayoritas pengunjung mengakses dari perangkat mobile dengan sinyal tidak stabil
- Perangkat desa tidak memiliki latar belakang teknis — butuh sistem yang sangat mudah dikelola
- Infrastruktur server harus minimal biaya dan mudah di-maintain jangka panjang

---

## 3. Goals & Non-Goals

### Goals ✅

| # | Goal | Prioritas |
|---|---|---|
| G1 | Menyediakan informasi lengkap tentang cara pergi ke Enggano (transportasi, akomodasi) | P0 |
| G2 | Mempublikasikan katalog destinasi wisata Enggano yang bisa difilter | P0 |
| G3 | Mendokumentasikan program kerja KKN secara profesional dan terbuka untuk publik | P0 |
| G4 | Menyajikan history dan profil 6 desa asli di Enggano | P1 |
| G5 | Memberikan akses mudah ke kontak pemandu lokal, homestay, dan UMKM via WhatsApp | P0 |
| G6 | Memastikan website bisa dikelola mandiri oleh perangkat desa non-teknis setelah KKN | P0 |
| G7 | Website tetap dapat diakses dengan baik di kondisi sinyal rendah | P1 |
| G8 | Mempublikasikan direktori UMKM lokal tiap desa sebagai sarana promosi produk warga | P1 |

### Non-Goals ❌

- Sistem booking atau reservasi online (terlalu kompleks untuk di-maintain desa)
- Fitur pembayaran atau e-commerce
- Forum komunitas atau fitur sosial
- Integrasi dengan platform eksternal (Traveloka, Airbnb, dll)
- Real-time data (cuaca live, tracking kapal, dll)
- Multi-bahasa (cukup Bahasa Indonesia untuk fase pertama)

---

## 4. User Personas

### Persona 1 — Wisatawan Penjelajah
> *"Saya ingin ke Enggano tapi tidak tahu harus mulai dari mana."*

- **Profil:** Pria/wanita 22–35 tahun, tertarik destinasi off-the-beaten-path, pengguna aktif media sosial
- **Device:** Smartphone Android mid-range, koneksi 4G kadang tidak stabil
- **Kebutuhan:** Jadwal kapal, biaya perjalanan, daftar homestay, rekomendasi destinasi
- **Pain point:** Informasi tersebar di grup WA, tidak ada sumber terpercaya satu pintu
- **Halaman utama:** Home → Accommodations → Destinations

### Persona 2 — Peneliti / Akademisi
> *"Saya sedang riset tentang tribe-tribe di Enggano dan butuh referensi digital."*

- **Profil:** Mahasiswa S2/S3 atau dosen, usia 25–45 tahun
- **Device:** Laptop atau tablet
- **Kebutuhan:** Sejarah desa, informasi budaya 6 tribe, dokumentasi yang bisa dikutip
- **Pain point:** Tidak ada sumber digital yang komprehensif dan terpercaya tentang Enggano
- **Halaman utama:** Villages di Enggano → KKN Log

### Persona 3 — Jurnalis / Kreator Konten
> *"Saya mau bikin artikel/video tentang pulau terluar Indonesia."*

- **Profil:** Jurnalis atau travel blogger, usia 24–40 tahun
- **Device:** Laptop + smartphone
- **Kebutuhan:** Foto berkualitas, cerita menarik, data yang bisa dikutip, kontak narasumber
- **Pain point:** Sulit mendapat informasi faktual dan visual yang layak publikasi
- **Halaman utama:** Home → Destinations → KKN Log

### Persona 4 — Perangkat Villages (Admin)
> *"Saya mau update schedule kapal dan posting berita desa, tapi tidak paham teknologi."*

- **Profil:** Aparat desa atau staf kecamatan, usia 30–55 tahun, melek smartphone tapi tidak paham coding
- **Device:** Smartphone atau PC kantor
- **Kebutuhan:** Interface admin yang sangat sederhana, hanya bisa akses menu yang relevan
- **Pain point:** Takut salah klik dan merusak website
- **Halaman utama:** `/admin` — Ship Schedule · KKN Log · Homestay · UMKM

---

## 5. Sitemap & Information Architecture

```
Web Enggano
│
├── 🏠 Home
│   ├── Hero (video fullscreen)
│   ├── Trip Essentials (3 quicklink: Kapal, Homestay, Peta Sinyal)
│   ├── 3 Pilar (Bahari · Hutan · Budaya) — Bento Grid
│   └── Latest KKN Log (3 latest articles)
│
├── 🗺️ Destinations
│   ├── Index (katalog + filter: Bahari · Sejarah · Wildlife)
│   └── Show (detail per destinasi + peta + kontak pemandu)
│
├── 🛶 Accommodations (How to Enggano)
│   ├── Transportasi (Jadwal Ferry + Susi Air)
│   ├── Homestay (katalog + kontak WA owner)
│   └── Peta Konektivitas (titik sinyal 4G via Leaflet)
│
├── 📓 KKN Log (Catatan Pengabdian)
│   ├── Index (grid kartu per category: Ekonomi · Kesehatan · Digitalisasi · Lingkungan)
│   └── Show (artikel detail + galeri photos dokumentasi)
│
└── 🏘️ Villages di Enggano
    ├── Index (peta 6 desa + kartu ringkas)
    └── Show (history, profil, tokoh, budaya per desa + daftar UMKM lokal)
```

### Navigasi Utama (Navbar)

```
[Logo: Enggano]    Destinations · Accommodations · KKN Log · Villages    [Check Ship Schedule →]
```

---

## 6. Feature Requirements

### 6.1 Home

#### FR-HOME-01: Hero Video
- **Deskripsi:** Hero section fullscreen dengan video autoplay yang menampilkan keindahan Enggano
- **Acceptance Criteria:**
  - Video autoplay saat halaman dimuat di semua device termasuk mobile iOS
  - Video muted dan loop seamless
  - Ada overlay gradient agar teks terbaca
  - Ada headline, subline, dan 2 tombol CTA
  - Jika video gagal load, tampilkan poster image sebagai fallback
- **Prioritas:** P0

#### FR-HOME-02: Trip Essentials Quicklinks
- **Deskripsi:** 3 kartu akses cepat ke informasi paling dibutuhkan wisatawan
- **Konten kartu:**
  1. 🚢 **Ship Schedule** → `/accommodations#transportation`
  2. 🏠 **Cari Homestay** → `/accommodations#homestay`
  3. 📶 **Peta Sinyal** → `/accommodations#signal-map`
- **Acceptance Criteria:** Tampil horizontal di desktop, vertikal/grid di mobile
- **Prioritas:** P0

#### FR-HOME-03: Bento Grid 3 Pilar
- **Deskripsi:** Visual showcase 3 pilar utama wisata Enggano
- **Pilar:**
  1. **Destinations Bahari** — laut, selam, pantai
  2. **Hutan Endemik** — flora fauna khas Enggano
  3. **Warisan Budaya** — 6 tribe, traditions, artefak
- **Acceptance Criteria:** Layout bento (1 besar + 2 kecil), photos dominan, hover efek subtle, klik → halaman Destinations dengan filter is_active
- **Prioritas:** P1

#### FR-HOME-04: Latest KKN Log
- **Deskripsi:** 3 kartu artikel KKN terbaru
- **Acceptance Criteria:** Data dinamis dari database, ada link "Lihat Semua →"
- **Prioritas:** P1

---

### 6.2 Destinations

#### FR-DEST-01: Katalog Destinations dengan Filter
- **Deskripsi:** Grid katalog semua destinasi wisata Enggano
- **Filter:** Semua · Bahari · Sejarah · Wildlife
- **Acceptance Criteria:**
  - Filter via URL query param (`?type=bahari`) agar bisa dibookmark/share
  - Grid 1 kolom mobile, 2 kolom tablet, 3 kolom desktop
  - Setiap kartu menampilkan: photos, name, type (badge), tingkat kesulitan (badge), description singkat
- **Prioritas:** P0

#### FR-DEST-02: Halaman Detail Destinations
- **Deskripsi:** Halaman lengkap per destinasi
- **Konten:**
  - Hero photos full-width
  - Deskripsi lengkap
  - Informasi akses & route
  - Tingkat kesulitan
  - Peta Leaflet (jika ada koordinat)
  - Kontak pemandu lokal via tombol WhatsApp (jika ada)
  - Galeri photos
- **Acceptance Criteria:** Tombol WA pemandu membuka WhatsApp langsung dengan pesan pre-filled
- **Prioritas:** P0

---

### 6.3 Accommodations (How to Enggano)

Halaman ini adalah **survival guide** — informasi paling praktis yang dibutuhkan wisatawan sebelum berangkat.

#### FR-AKOM-01: Jadwal Transportasi
- **Deskripsi:** Informasi schedule estimasi Ferry dan Susi Air beserta link/kontak pembelian tiket resmi. Jadwal yang ditampilkan bersifat **perkiraan** — bukan schedule resmi real-time.
- **Data per schedule:**
  - Jenis transportasi (Ferry / Susi Air)
  - Rute (Bengkulu → Enggano / pp)
  - Hari keberangkatan (estimasi)
  - Jam berangkat (estimasi)
  - Estimasi harga tiket
  - Status (Aktif / Tidak is_active)
  - `ticket_link` — URL ke halaman pembelian resmi atau nomor WA agen (nullable)
- **Acceptance Criteria:**
  - Tampil dalam format kartu/tabel yang mobile-friendly
  - Jika `ticket_link` tersedia → tampilkan tombol **"Beli Tiket →"** yang membuka link di tab baru
  - Jika `ticket_link` kosong → tampilkan tombol **"Hubungi Agen"** yang membuka WA dengan nomor dari field `agent_whatsapp_number`
  - Selalu tampilkan disclaimer: *"Jadwal bersifat estimasi dan dapat berubah sewaktu-waktu. Konfirmasi ke pelabuhan atau agen sebelum berangkat."*
  - Data bisa diupdate via Filament admin tanpa menyentuh kode
- **Prioritas:** P0

#### FR-AKOM-02: Direktori Homestay
- **Deskripsi:** Katalog penginapan warga lokal
- **Data per homestay:**
  - Foto (minimal 1)
  - Nama penginapan
  - Nama owner
  - Fasilitas tersedia
  - Estimasi harga per malam
  - Tombol WA langsung ke owner
- **Acceptance Criteria:**
  - Grid kartu 1 kolom mobile, 2 kolom desktop
  - Tombol WA buka WhatsApp dengan pesan pre-filled berisi name homestay
- **Prioritas:** P0

#### FR-AKOM-03: Peta Konektivitas Sinyal
- **Deskripsi:** Peta interaktif Leaflet.js yang menandai titik-titik dengan sinyal 4G
- **Acceptance Criteria:**
  - Marker dibedakan: 4G (hijau) · 3G/2G (kuning) · Blank spot (merah)
  - Peta bisa di-zoom dan di-pan
  - Tanpa API key (Leaflet + OpenStreetMap)
  - Ada legend warna
- **Prioritas:** P1

---

### 6.4 KKN Log (Catatan Pengabdian)

#### FR-KKN-01: Arsip Program Kerja
- **Deskripsi:** Dokumentasi profesional seluruh program kerja KKN
- **Kategori:** Ekonomi · Kesehatan · Digitalisasi · Lingkungan
- **Data per proker:**
  - Judul kegiatan
  - Kategori (badge berwarna)
  - Tanggal pelaksanaan
  - Konten artikel (rich text)
  - Galeri photos dokumentasi
- **Acceptance Criteria:**
  - Filter per category
  - Urutan terbaru di atas
  - Artikel bisa dibagikan via URL slug yang readable
- **Prioritas:** P0

#### FR-KKN-02: Legacy Story
- **Deskripsi:** Artikel khusus yang menceritakan latar belakang pembuatan website sebagai infrastruktur digital pertama Enggano
- **Acceptance Criteria:** Satu halaman statis yang ditulis tim KKN, bukan dari database
- **Prioritas:** P2

---

### 6.5 Villages di Enggano

Pulau Enggano memiliki 6 desa resmi. Halaman ini menjadi **arsip history digital** yang bisa digunakan peneliti, akademisi, dan publik umum.

#### FR-VILLAGE-01: Index Peta Villages
- **Deskripsi:** Halaman landing dengan peta Enggano yang menampilkan lokasi 6 desa
- **6 Villages:**
  1. Villages Enggano (ibukota kecamatan)
  2. Villages Kahyapu
  3. Villages Kaana
  4. Villages Meok
  5. Villages Apoho
  6. Villages Malakoni
- **Acceptance Criteria:**
  - Peta Leaflet dengan marker tiap desa
  - Klik marker → popup ringkas + link ke halaman detail
  - Di bawah peta: grid 6 kartu desa (photos + name + summary)
- **Prioritas:** P1

#### FR-VILLAGE-02: Halaman Detail Per Villages
- **Deskripsi:** Profil lengkap tiap desa
- **Konten:**
  - Foto representatif desa
  - Sejarah singkat (asal-usul name, berdirinya desa)
  - Suku asli yang mendiami
  - Tradisi dan budaya khas
  - Tokoh lokal (jika ada)
  - Potensi desa (alam, budaya, ekonomi)
  - Galeri photos
  - **Local UMKM Section** — daftar usaha warga desa tersebut
- **Acceptance Criteria:**
  - Konten bisa diedit via Filament admin
  - Rich text editor untuk content history (Filament bawaan)
  - Navigasi antar desa (desa sebelumnya / berikutnya)
  - Section UMKM tampil di bagian bawah halaman desa
  - Jika desa belum punya data UMKM, section disembunyikan (tidak tampil kosong)
- **Prioritas:** P1

#### FR-VILLAGE-03: Local UMKM Per Villages
- **Deskripsi:** Daftar usaha mikro, kecil, dan menengah yang ada di tiap desa — ditampilkan sebagai section di halaman detail desa
- **Data per UMKM:**
  - Nama usaha
  - Nama owner
  - Jenis usaha / produk yang dijual
  - Nomor WA owner
  - Cara pesan / notes tambahan (nullable)
  - Foto produk (minimal 1, via Spatie MediaLibrary)
- **Acceptance Criteria:**
  - Grid kartu UMKM di dalam halaman desa (1 kolom mobile, 2 kolom desktop)
  - Setiap kartu ada tombol **"Pesan via WA"** yang pre-fill pesan dengan name usaha
  - UMKM bisa ditambah/diedit oleh role `editor` (perangkat desa) via Filament
  - Relasi: `Village hasMany Umkm`
- **Prioritas:** P1

---

### 6.6 Komponen Global

#### FR-GLOBAL-01: Floating WhatsApp Button
- **Deskripsi:** Tombol WA fixed di pojok kanan bawah untuk akses cepat ke pengelola website
- **Acceptance Criteria:** Tampil di semua halaman, nomor bisa dikonfigurasi via `.env`
- **Prioritas:** P0

#### FR-GLOBAL-02: Navbar Adaptif
- **Deskripsi:** Navbar transparan di atas hero, berubah solid saat scroll
- **Menu:** Destinations · Accommodations · KKN Log · Villages · [CTA: Check Ship Schedule]
- **Acceptance Criteria:**
  - Hamburger menu di mobile
  - Smooth transition transparant → solid
  - Logo "Enggano" klik → Home
- **Prioritas:** P0

#### FR-GLOBAL-03: Footer
- **Konten:** Logo + tagline · Navigasi singkat · Kredit KKN UGM · Tahun
- **Prioritas:** P2

---

## 7. Design System

### 7.1 Visual Direction

Terinspirasi dari **Black Tomato** (blacktomato.com): editorial travel brand kelas dunia. Prinsip utama:
- **Visual first** — photos dan video bicara, bukan desain yang ramai
- **Whitespace agresif** — content tidak berdesak-desakan
- **Typography kontras** — serif besar untuk headline, sans-serif untuk body
- **Card tanpa border** — shadow tipis atau background saja
- **Hover subtle** — scale photos 1.05 dengan durasi 700ms, bukan animasi berlebihan

### 7.2 Color Palette

Semua warna menggunakan name **semantic** di Tailwind CSS v4.

| Token | Nama | Hex Default | Dipakai untuk |
|---|---|---|---|
| `primary-700` | Dusk Blue | `#314968` | Navbar, heading, link is_active, footer |
| `surface-50` | Palm Leaf Light | `#f6f7ee` | Background halaman utama |
| `surface-500` | Palm Leaf | `#a9ac53` | Badge "Alam", "Bahari", "Wildlife" |
| `neutral-800` | Iron Grey Dark | `#313435` | Body text |
| `neutral-500` | Iron Grey | `#7a8185` | Teks sekunder, caption |
| `accent-500` | Carrot Orange | `#eb8314` | Tombol CTA utama, FloatingWA |
| `highlight-500` | Wine Plum | `#bb4460` | Badge "Budaya & Sejarah", tag Villages |

**Konfigurasi di `resources/css/app.css` (Tailwind v4 `@theme`):**

```css
@import "tailwindcss";

@theme {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Primary — Dusk Blue */
  --color-primary-50: #eef2f7; --color-primary-700: #314968; --color-primary-900: #101823;
  /* Surface — Palm Leaf */
  --color-surface-50: #f6f7ee; --color-surface-500: #a9ac53; --color-surface-700: #656732;
  /* Neutral — Iron Grey */
  --color-neutral-50: #f2f2f3; --color-neutral-500: #7a8185; --color-neutral-800: #313435;
  /* Accent — Carrot Orange */
  --color-accent-50: #fdf3e8; --color-accent-500: #eb8314; --color-accent-600: #bc6910;
  /* Highlight — Wine Plum */
  --color-highlight-50: #f8ecef; --color-highlight-500: #bb4460; --color-highlight-700: #702939;
}
```

### 7.3 Typography

| Role | Font | Weight | Dipakai untuk |
|---|---|---|---|
| Display | Cormorant Garamond | 400–700 | H1, H2, name destinasi/villages, hero headline |
| Body | Inter | 400–600 | Paragraf, label, tombol, navigasi |

**Load via Google Fonts di `app.blade.php`:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### 7.4 Spacing & Layout

- Max content width: `max-w-7xl` (1280px)
- Section padding: `px-6 md:px-12 lg:px-16`
- Section vertical gap: `py-16 md:py-24`
- Card gap: `gap-6 md:gap-8`

### 7.5 Icon Library

**Lucide React** — stroke-based, tree-shakeable, konsisten di semua ukuran.

| Icon | Dipakai untuk |
|---|---|
| `Ship` | Jadwal kapal / transportasi |
| `Home` | Homestay |
| `Signal` | Peta sinyal |
| `MapPin` | Lokasi, koordinat |
| `Menu` / `X` | Navbar hamburger |
| `MessageCircle` | FloatingWA |
| `ChevronRight` | Link navigasi |
| `Calendar` | Tanggal kegiatan KKN |
| `Tag` | Badge category |
| `Plane` | Susi Air |

---

## 8. Technical Architecture

### 8.1 Stack

| Layer | Teknologi | Versi | Alasan |
|---|---|---|---|
| Backend | Laravel | 12 LTS (PHP 8.3+) | LTS support sampai 2027, cocok untuk legacy handover |
| Frontend | Inertia.js + React | Inertia v2 / React 18 | SPA tanpa REST boilerplate, DX baik |
| Build | Vite | 6.x | Sudah built-in di Laravel, HMR cepat |
| Styling | Tailwind CSS | v4 | Utility-first, `@theme` native tanpa config JS |
| Admin | Filament | v3 di `/admin` | Livewire sendiri, tidak konflik dengan React |
| Database | MySQL / SQLite | 8.0+ / 3.x | SQLite untuk dev, MySQL untuk prod |
| Media | Spatie MediaLibrary | v11 | Upload, WebP auto-convert, multi-collection |
| Map | Leaflet.js | 1.9 | Tanpa API key, ringan |
| Icons | Lucide React | latest | Tree-shakeable, stroke konsisten |
| Backup | Spatie Laravel Backup | v8 | Backup harian otomatis |

> **Kenapa Laravel 12 bukan 13?** Laravel 12 adalah LTS — support hingga 2027. Untuk project yang diserahkan ke desa post-KKN, stabilitas lebih penting dari fitur terbaru.

> **Kenapa React bisa co-exist dengan Filament?** Filament di-mount di `/admin` menggunakan Livewire stack-nya sendiri. Frontend publik (`/`) menggunakan React via Inertia. Satu aplikasi Laravel, satu server, satu SSL — zero conflict.

### 8.2 Routing Overview

```php
// routes/web.php

// Halaman publik (React via Inertia)
Route::get('/',                    [HomeController::class, 'index'])->name('home');
Route::get('/destinations',           [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{slug}',    [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/accommodations',           [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/kkn-log',             [KknLogController::class, 'index'])->name('kkn.index');
Route::get('/kkn-log/{slug}',      [KknLogController::class, 'show'])->name('kkn.show');
Route::get('/villages',                [VillageController::class, 'index'])->name('villages.index');
Route::get('/villages/{slug}',         [VillageController::class, 'show'])->name('villages.show');

// Admin panel (Filament — Livewire, di-handle otomatis)
// Route: /admin → dikelola AdminPanelProvider
```

### 8.3 Frontend Folder Structure

```
resources/js/
├── app.jsx                          # createInertiaApp() entry point
├── Layouts/
│   └── AppLayout.jsx                # Navbar + FloatingWA + Footer (persistent)
├── Pages/
│   ├── Home/
│   │   └── Index.jsx
│   ├── Destination/
│   │   ├── Index.jsx
│   │   └── Show.jsx
│   ├── Accommodations/
│   │   └── Index.jsx
│   ├── KknLog/
│   │   ├── Index.jsx
│   │   └── Show.jsx
│   └── Village/
│       ├── Index.jsx
│       └── Show.jsx
└── Components/
    ├── HeroVideo.jsx                # Hero fullscreen video
    ├── Navbar.jsx                   # Transparan → solid on scroll
    ├── Footer.jsx
    ├── FloatingWA.jsx               # Fixed bottom-right WA button
    ├── DestinationCard.jsx            # Kartu destinasi aspect 3/4
    ├── HomestayCard.jsx             # Kartu homestay + WA button
    ├── KknCard.jsx                  # Kartu artikel KKN
    ├── VillageCard.jsx                 # Kartu desa (index)
    ├── ShipSchedule.jsx              # Tabel schedule transportasi
    ├── LeafletMap.jsx               # Wrapper Leaflet (lazy loaded)
    ├── BentoGrid.jsx                # Layout bento 3 pilar
    └── Badge.jsx                    # Reusable badge/tag component
```

### 8.4 Hero Video Specification

- **Format:** MP4 (H.264), `playsInline` + `muted` wajib ada untuk iOS autoplay
- **Resolusi:** 720p (1280×720)
- **Durasi:** 20–40 detik, loop seamless
- **Ukuran target:** ≤ 8MB setelah kompresi
- **Storage:** `public/videos/hero-enggano.mp4` (serve langsung dari server)
- **Kompresi:** `ffmpeg -i input.mp4 -vcodec h264 -acodec aac -vf scale=1280:720 -crf 28 hero-enggano.mp4`

### 8.5 Deployment Target

| Environment | Provider | Spesifikasi |
|---|---|---|
| Development | DomCloud (domcloud.co) | Free tier, terminal web, SSL otomatis |
| Production | Hostinger VPS / Niagahoster VPS | PHP 8.3, Node.js 20, MySQL 8, Nginx, Ubuntu 24.04 |

**Server requirements:** PHP 8.3+ · Composer · Node.js 20+ · MySQL 8.0+ · Nginx · SSL (Let's Encrypt)

**Nginx config wajib** untuk SPA routing Inertia:
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

---

## 9. Data Models

### Destinations
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `name` | string | Nama destinasi |
| `slug` | string unique | URL-friendly, auto-generate |
| `description` | text | Konten lengkap |
| `short_description` | string(200) | Untuk card preview |
| `type` | enum | `bahari` · `history` · `wildlife` |
| `lat` | decimal(10,7) | Koordinat latitude |
| `lng` | decimal(10,7) | Koordinat longitude |
| `difficulty_level` | enum | `mudah` · `sedang` · `sulit` |
| `local_guide_id` | FK → LocalGuide | nullable |

**Media:** `HasMany` via Spatie MediaLibrary, collection `photos`

### Homestay
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `name` | string | Nama penginapan |
| `owner` | string | Nama owner |
| `whatsapp_number` | string(20) | Nomor WA owner |
| `facilities` | text | Deskripsi facilities |
| `price_per_night` | integer | nullable, estimasi dalam rupiah |

**Media:** `HasMany` via Spatie MediaLibrary, collection `photos`

### ShipSchedule
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `type` | enum | `ferry` · `susi_air` |
| `route` | string | Contoh: "Bengkulu → Enggano" |
| `days` | json | Array: `["senin","kamis"]` |
| `departure_time` | time | Estimasi jam |
| `estimated_price` | integer | nullable |
| `ticket_link` | string | nullable — URL pembelian tiket resmi |
| `agent_whatsapp_number` | string(20) | nullable — WA agen jika tidak ada link online |
| `is_active` | boolean | default true |

### KknLogItem (KKN Log)
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `title` | string | |
| `slug` | string unique | |
| `category` | enum | `ekonomi` · `kesehatan` · `digitalisasi` · `lingkungan` |
| `date` | date | Tanggal pelaksanaan |
| `content` | longText | Rich text dari Filament |

**Media:** `HasMany` via Spatie MediaLibrary, collection `photos`

### Villages
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `name` | string | Nama desa resmi |
| `slug` | string unique | |
| `summary` | string(300) | Untuk kartu index |
| `history` | longText | Rich text — history lengkap |
| `tribe` | string | Nama tribe yang mendiami |
| `traditions` | text | Tradisi dan budaya khas |
| `potential` | text | Potensi alam/ekonomi/budaya |
| `lat` | decimal(10,7) | Koordinat untuk peta |
| `lng` | decimal(10,7) | Koordinat untuk peta |

**Media:** `HasMany` via Spatie MediaLibrary, collection `photos`

**Relasi:** `HasMany Umkm`

### Umkm
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `village_id` | FK → Village | Wajib |
| `business_name` | string | Nama usaha / brand |
| `owner_name` | string | Nama owner |
| `business_type` | string | Contoh: "Kerajinan Anyaman", "Olahan Ikan" |
| `whatsapp_number` | string(20) | WA owner untuk order |
| `notes` | text | nullable — cara pesan, lokasi jual, dll |

**Media:** `HasMany` via Spatie MediaLibrary, collection `product_photos`

**Relasi:** `BelongsTo Villages`

### LocalGuide
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | bigint PK | |
| `name` | string | |
| `whatsapp_number` | string(20) | |
| `expertise` | text | nullable |

**Relasi:** `HasMany Destinations`

---

## 10. Non-Functional Requirements

### 10.1 Performance
- Halaman pertama (LCP) harus load dalam **< 3 detik** di koneksi 4G
- Video hero harus mulai diputar dalam **< 2 detik** setelah halaman load
- JS bundle per halaman **< 200KB** gzipped (code splitting Vite per page)
- Semua gambar menggunakan format **WebP** (auto-convert via Spatie)
- Semua `<img>` menggunakan `loading="lazy"` kecuali di above-the-fold

### 10.2 Accessibility
- Semua tombol interaktif memiliki `aria-label`
- Kontras teks minimum 4.5:1 (WCAG AA)
- Video hero memiliki `aria-hidden="true"` (dekoratif)
- Navigasi dapat diakses via keyboard

### 10.3 Mobile-First
- Breakpoint utama: 375px (iPhone SE) — semua layout harus bekerja
- Touch target minimum 44×44px
- Floating WA button tidak menutupi content penting
- Video `playsInline` wajib untuk iOS

### 10.4 Maintainability
- Semua content halaman dapat diedit via Filament admin tanpa menyentuh kode
- Kode mengikuti konvensi Laravel (Form Request, Service layer jika perlu, Resource collection)
- Tidak ada magic number — semua config di `.env` atau `config/`
- README berisi instruksi setup lengkap untuk developer baru

### 10.5 Security
- `APP_DEBUG=false` di production
- Semua input melewati Laravel Form Request validation
- Upload file dibatasi tipe (jpg, png, webp) dan ukuran (max 5MB per file)
- Filament admin dilindungi autentikasi
- `.env` tidak masuk Git (`.gitignore`)

### 10.6 Backup & Reliability
- Backup otomatis harian via Spatie Laravel Backup
- Storage backup: Cloudflare R2 (free 10GB) atau Google Drive via rclone
- SSL auto-renew via Certbot (Let's Encrypt)

---

## 11. Admin Panel Requirements

Admin panel menggunakan **Filament v3** di path `/admin`.

### 11.1 Resources yang Tersedia

| Resource | Model | Aksi |
|---|---|---|
| Destinations | `Destination` | Create · Read · Update · Delete · Upload photos |
| Homestay | `Homestay` | Create · Read · Update · Delete · Upload photos |
| Ship Schedule | `ShipSchedule` | Create · Read · Update · Delete |
| KKN Log | `KknLogItem` | Create · Read · Update · Delete · Upload photos |
| Villages | `Village` | Read · Update · Upload photos (tidak bisa Create/Delete — 6 desa sudah fixed) |
| UMKM | `Umkm` | Create · Read · Update · Delete · Upload photos produk |
| Local Guide | `LocalGuide` | Create · Read · Update · Delete |

### 11.2 Role & Permission

| Role | Akses |
|---|---|
| `admin` | Semua resource, semua aksi |
| `editor` | **Ship Schedule** · **KKN Log** · **Homestay** · **UMKM** |

Filosofi: perangkat desa hanya kelola hal yang **rutin berubah dan relevan dengan mereka** — schedule transportasi, berita/dokumentasi kegiatan, homestay warga, dan UMKM lokal. Konten yang sifatnya arsip tetap (history desa, destinasi, pemandu) dikunci di admin KKN agar tidak rusak setelah handover.

**Menu yang tampil untuk role `editor`:**

| Menu | Keterangan |
|---|---|
| 📅 Ship Schedule | Update estimasi schedule Ferry / Susi Air, link tiket |
| 📰 KKN Log | Post berita desa, dokumentasi kegiatan |
| 🏠 Homestay | Tambah/edit penginapan warga, update harga & nomor WA |
| 🛍️ UMKM | Tambah/edit usaha lokal per desa, upload photos produk |

### 11.3 Handover Requirements
- Panduan PDF per menu (4 halaman total — satu halaman per menu editor)
- Video tutorial ~8 menit — cara post KKN Log, update schedule kapal, tambah homestay, tambah UMKM
- Akun `editor` sudah dibuat dan ditest sebelum serah terima
- Kredensial diserahkan ke Kepala Villages + Kecamatan via form serah terima resmi

---

## 12. Constraints & Assumptions

### Constraints
- **Budget hosting:** Maksimal Rp 60rb/bulan (Hostinger VPS entry atau Niagahoster)
- **Tim developer:** Dikerjakan oleh mahasiswa KKN, bukan tim profesional penuh
- **Waktu pengembangan:** Target selesai dalam 4 minggu paralel dengan kegiatan KKN lain
- **Koneksi server:** Server tidak perlu koneksi CDN eksternal — semua asset self-hosted

### Assumptions
- Foto dan video Enggano tersedia dan sudah memiliki izin penggunaan dari pemiliknya
- Tim KKN memiliki data history 6 desa yang akurat dari sumber lokal (perangkat desa, tokoh masyarakat)
- Minimal satu anggota tim KKN memiliki kemampuan Laravel dasar
- Domain `.village.id` atau alternatif sudah disiapkan sebelum deploy

---

## 13. Success Metrics

| Metrik | Target | Cara Ukur |
|---|---|---|
| Website live sebelum akhir masa KKN | ✅ | Deploy date |
| Perangkat desa bisa update content mandiri | ✅ | Demo + observasi saat handover |
| Semua 5 halaman utama berfungsi tanpa error | ✅ | Manual test checklist |
| PageSpeed Insights mobile score | ≥ 70 | Google PageSpeed |
| Video hero load di iOS Safari | ✅ | Test di device nyata |
| Ukuran bundle JS terbesar | < 200KB gzip | Vite build output |

---

## 14. Out of Scope

Hal-hal berikut **tidak dikerjakan** dalam versi 1.0 ini dan bisa menjadi roadmap untuk tim selanjutnya:

- **Sistem booking/reservasi online** — butuh payment gateway, terlalu kompleks
- **Multi-bahasa (English)** — roadmap v2
- **Progressive Web App (PWA) / offline mode** — roadmap v2
- **Integrasi media sosial otomatis** (auto-post ke Instagram) — roadmap v2
- **Search engine** — roadmap v2
- **Rating & review destinasi** — roadmap v2
- **Galeri media publik yang bisa dikontribusi warga** — roadmap v2

---

*Web Enggano · KKN Legacy Project · PRD v1.1 · Juni 2026*
*Dibuat oleh Tim KKN-PPM UGM*
