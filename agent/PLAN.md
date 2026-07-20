# WEB ENGGANO — Development Plan
**KKN Legacy Project · v3.1 · Rencana Pengerjaan Detail**

---

## 📊 Progress Saat Ini (Live di Lokal)
Berikut adalah fitur yang sudah selesai dan berjalan di `localhost:5174`:
- ✅ Layout dasar + Navbar (dengan Language Switcher!)
- ✅ Homepage (Hero, History, Explore, KKN Log)
- ✅ Halaman Tentang Enggano (Villages Index)
- ✅ Komponen reusable: Button, PrevNext, LanguageSwitcher
- ✅ Sistem multibahasa Indonesia ↔ Inggris (sudah terintegrasi di Navbar, Home, dan sebagian Villages)
- ✅ Desain konsisten antara section Desa dan Suku di homepage

---

## 🎯 Langkah Selanjutnya
Untuk melanjutkan pengembangan, berikut adalah priority task:
1. **Lengkapi translation untuk halaman Village/Index.jsx**: Tambahkan semua teks ke `en/villages.json` dan gunakan `useTranslate('villages')` di komponen
2. **Lengkapi translation untuk halaman lain**: Destination, Accommodation, KKN Log, dll
3. **Integrasikan data dinamis dari backend**: Hubungkan halaman dengan model Laravel (Villages, Destinations, dll)
4. **Test mobile responsiveness**: Pastikan semua halaman rapi di viewport 375px
5. **Setup deploy**: Siapkan konfigurasi untuk production

---

## Gambaran Umum

Project ini dibagi **4 fase** yang bisa dikerjakan secara linear. Estimasi total untuk 1 developer is_active adalah **3–4 minggu** kalau dikerjakan serius. Tiap fase bisa di-commit ke Git sendiri-sendiri.

```
Fase 1: Setup & Fondasi          → 2–3 days
Fase 2: Backend & Database       → 5–6 days
Fase 3: Frontend React           → 8–10 days
Fase 4: Polish, Test & Deploy    → 3–4 days
```

---

## Fase 1 — Project Setup & Fondasi

**Target:** Project bisa jalan di lokal, semua dependency terpasang.

### 1.1 Install Laravel 12 + Stack Utama

```bash
# Buat project baru
composer create-project laravel/laravel web-enggano "^12.0"
cd web-enggano

# Install Inertia.js (server-side)
composer require inertiajs/inertia-laravel

# Install React adapter (client-side)
npm install @inertiajs/react react react-dom

# Install Vite plugin React
npm install --save-dev @vitejs/plugin-react

# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# Install Lucide React (icons)
npm install lucide-react

# Install Filament v3
composer require filament/filament:"^3.0" -W
php artisan filament:install --panels

# Install Spatie MediaLibrary
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"

# Install Spatie Sluggable (untuk slug otomatis)
composer require spatie/laravel-sluggable

# Install Spatie Backup (untuk backup otomatis)
composer require spatie/laravel-backup
```

### 1.2 Konfigurasi Inertia

```bash
php artisan inertia:middleware
```

Edit `bootstrap/app.php`:
```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        \App\Http\Middleware\HandleInertiaRequests::class,
    ]);
})
```

### 1.3 Konfigurasi Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    laravel({ input: ['resources/css/app.css', 'resources/js/app.jsx'], refresh: true }),
    react(),
    tailwindcss(),
  ],
})
```

### 1.4 Buat app.blade.php (Satu-satunya Blade File)

```php
<!-- resources/views/app.blade.php -->
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enggano — Garis Terdepan Samudera Hindia</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    @inertiaHead
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="bg-surface-50 text-neutral-800 font-body antialiased">
    @inertia
</body>
</html>
```

### 1.5 Setup Tailwind v4 + Color Palette

```css
/* resources/css/app.css */
@import "tailwindcss";

@theme {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;

  /* Primary — Dusk Blue */
  --color-primary-50:  #eef2f7;
  --color-primary-100: #dce4ef;
  --color-primary-200: #bacade;
  --color-primary-300: #97afce;
  --color-primary-400: #7494be;
  --color-primary-500: #5279ad;
  --color-primary-600: #41618b;
  --color-primary-700: #314968;
  --color-primary-800: #213145;
  --color-primary-900: #101823;
  --color-primary-950: #0b1118;

  /* Surface — Palm Leaf */
  --color-surface-50:  #f6f7ee;
  --color-surface-100: #eeeedd;
  --color-surface-200: #dddeba;
  --color-surface-300: #cbcd98;
  --color-surface-400: #babd75;
  --color-surface-500: #a9ac53;
  --color-surface-600: #878a42;
  --color-surface-700: #656732;
  --color-surface-800: #444521;
  --color-surface-900: #222211;
  --color-surface-950: #18180c;

  /* Neutral — Iron Grey */
  --color-neutral-50:  #f2f2f3;
  --color-neutral-100: #e4e6e7;
  --color-neutral-200: #cacdce;
  --color-neutral-300: #afb4b6;
  --color-neutral-400: #959a9d;
  --color-neutral-500: #7a8185;
  --color-neutral-600: #62676a;
  --color-neutral-700: #494e50;
  --color-neutral-800: #313435;
  --color-neutral-900: #181a1b;
  --color-neutral-950: #111213;

  /* Accent — Carrot Orange */
  --color-accent-50:  #fdf3e8;
  --color-accent-100: #fbe6d0;
  --color-accent-200: #f7cda1;
  --color-accent-300: #f3b572;
  --color-accent-400: #ef9c43;
  --color-accent-500: #eb8314;
  --color-accent-600: #bc6910;
  --color-accent-700: #8d4f0c;
  --color-accent-800: #5e3408;
  --color-accent-900: #2f1a04;
  --color-accent-950: #211203;

  /* Highlight — Wine Plum */
  --color-highlight-50:  #f8ecef;
  --color-highlight-100: #f1dadf;
  --color-highlight-200: #e4b4bf;
  --color-highlight-300: #d68f9f;
  --color-highlight-400: #c9697f;
  --color-highlight-500: #bb4460;
  --color-highlight-600: #96364c;
  --color-highlight-700: #702939;
  --color-highlight-800: #4b1b26;
  --color-highlight-900: #250e13;
  --color-highlight-950: #1a090d;
}
```

### 1.6 Setup app.jsx (React Entry Point)

```jsx
// resources/js/app.jsx
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import AppLayout from './Layouts/AppLayout'
import '../css/app.css'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
    const page = pages[`./Pages/${name}.jsx`]
    page.default.layout = page.default.layout ?? (page => <AppLayout children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
```

### 1.7 Init Git

```bash
git init
git add .
git commit -m "feat: initial setup Laravel 12 + Inertia React + Tailwind v4 + Filament"
```

**Checklist Fase 1:**
- [ ] `php artisan serve` → jalan tanpa error
- [ ] `npm run dev` → Vite HMR aktif
- [ ] Buka `localhost:8000` → halaman Inertia default muncul
- [ ] Buka `localhost:8000/admin` → Filament login page muncul

---

## Fase 2 — Backend & Database

**Target:** Semua model, migration, seeder, dan Filament resources siap.

### 2.1 Buat Migrations

Urutan pembuatan penting karena ada foreign key — `villages` dan `local_guides` harus duluan:

```bash
# Tabel tanpa foreign key dulu
php artisan make:migration create_villages_table
php artisan make:migration create_local_guides_table

# Tabel yang bergantung ke atas
php artisan make:migration create_destinations_table
php artisan make:migration create_homestays_table
php artisan make:migration create_kkn_log_items_table
php artisan make:migration create_ship_schedules_table
php artisan make:migration create_umkms_table
```

Schema `create_villages_table`:
```php
Schema::create('villages', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('summary', 300)->nullable();
    $table->longText('history')->nullable();
    $table->string('tribe')->nullable();
    $table->text('traditions')->nullable();
    $table->text('potential')->nullable();
    $table->decimal('lat', 10, 7)->nullable();
    $table->decimal('lng', 10, 7)->nullable();
    $table->timestamps();
});
```

Schema `create_ship_schedules_table`:
```php
Schema::create('ship_schedules', function (Blueprint $table) {
    $table->id();
    $table->enum('type', ['ferry', 'susi_air']);
    $table->string('route');
    $table->json('days');
    $table->time('departure_time');
    $table->integer('estimated_price')->nullable();
    $table->string('ticket_link')->nullable();   // URL pembelian tiket resmi
    $table->string('agent_whatsapp_number', 20)->nullable(); // WA agen jika tidak ada link
    $table->boolean('is_active')->default(true);
    $table->timestamps();
});
```

Schema `create_umkms_table`:
```php
Schema::create('umkms', function (Blueprint $table) {
    $table->id();
    $table->foreignId('village_id')->constrained('villages')->cascadeOnDelete();
    $table->string('business_name');
    $table->string('owner_name');
    $table->string('business_type');
    $table->string('whatsapp_number', 20);
    $table->text('notes')->nullable();
    $table->timestamps();
});
```

### 2.2 Buat Models

```bash
php artisan make:model Village
php artisan make:model Destination
php artisan make:model Homestay
php artisan make:model KknLogItem
php artisan make:model ShipSchedule
php artisan make:model LocalGuide
php artisan make:model Umkm
```

Konfigurasi tiap model:

| Model | HasMedia | HasSlug | Relasi Penting |
|---|---|---|---|
| `Village` | ✅ collection `photos` | ✅ | `hasMany Umkm` |
| `Destination` | ✅ collection `photos` | ✅ | `belongsTo LocalGuide` |
| `Homestay` | ✅ collection `photos` | — | — |
| `KknLogItem` | ✅ collection `photos` | ✅ | — |
| `ShipSchedule` | — | — | — |
| `LocalGuide` | — | — | `hasMany Destination` |
| `Umkm` | ✅ collection `product_photos` | — | `belongsTo Village` |

Contoh `Village.php`:
```php
class Village extends Model {
    use HasFactory, HasMedia, InteractsWithMedia, HasSlug;

    protected $fillable = [
        'name', 'slug', 'summary', 'history',
        'tribe', 'traditions', 'potential', 'lat', 'lng',
    ];

    public function getSlugOptions(): SlugOptions {
        return SlugOptions::create()->generateSlugsFrom('name')->saveSlugsTo('slug');
    }

    public function umkms() {
        return $this->hasMany(Umkm::class);
    }

    public function registerMediaCollections(): void {
        $this->addMediaCollection('photos')->useDisk('public');
    }
}
```

Contoh `Umkm.php`:
```php
class Umkm extends Model {
    use HasFactory, HasMedia, InteractsWithMedia;

    protected $fillable = [
        'village_id', 'business_name', 'owner_name',
        'business_type', 'whatsapp_number', 'notes',
    ];

    public function village() {
        return $this->belongsTo(Village::class);
    }

    public function registerMediaCollections(): void {
        $this->addMediaCollection('product_photos')->useDisk('public');
    }
}
```

### 2.3 Buat Form Requests

```bash
php artisan make:request StoreDestinationRequest
php artisan make:request UpdateDestinationRequest
php artisan make:request StoreHomestayRequest
php artisan make:request StoreKknLogItemRequest
php artisan make:request StoreUmkmRequest
```

Contoh `StoreUmkmRequest.php`:
```php
public function rules(): array {
    return [
        'village_id'      => 'required|exists:villages,id',
        'business_name'   => 'required|string|max:255',
        'owner_name' => 'required|string|max:255',
        'business_type'  => 'required|string|max:255',
        'whatsapp_number'        => 'required|string|max:20',
        'notes'   => 'nullable|string',
    ];
}
```

### 2.4 Buat Controllers

```bash
php artisan make:controller HomeController
php artisan make:controller DestinationController
php artisan make:controller AccommodationController
php artisan make:controller KknLogController
php artisan make:controller VillageController
```

Contoh `VillageController.php`:
```php
public function index() {
    return Inertia::render('Village/Index', [
        'villages' => Village::withCount('umkms')->get(),
    ]);
}

public function show(string $slug) {
    $village = Village::where('slug', $slug)
        ->with(['umkms' => function ($q) {
            $q->with('media');
        }])
        ->withMedia()
        ->firstOrFail();

    return Inertia::render('Village/Show', [
        'village' => $village,
        'prev' => Village::where('id', '<', $village->id)->latest('id')->first(['name', 'slug']),
        'next' => Village::where('id', '>', $village->id)->oldest('id')->first(['name', 'slug']),
    ]);
}
```

### 2.5 Setup Routes

```php
// routes/web.php
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\KknLogController;
use App\Http\Controllers\VillageController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/accommodations', [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/kkn-log', [KknLogController::class, 'index'])->name('kkn.index');
Route::get('/kkn-log/{slug}', [KknLogController::class, 'show'])->name('kkn.show');
Route::get('/villages', [VillageController::class, 'index'])->name('villages.index');
Route::get('/villages/{slug}', [VillageController::class, 'show'])->name('villages.show');
```

### 2.6 Buat Filament Resources

```bash
php artisan make:filament-resource Destination --generate
php artisan make:filament-resource Homestay --generate
php artisan make:filament-resource KknLogItem --generate
php artisan make:filament-resource ShipSchedule --generate
php artisan make:filament-resource Village --generate
php artisan make:filament-resource Umkm --generate
php artisan make:filament-resource LocalGuide --generate
```

Konfigurasi penting per resource:

**ShipScheduleResource** — form harus punya field `ticket_link` dan `agent_whatsapp_number`:
```php
Forms\Components\TextInput::make('ticket_link')
    ->label('Link Pembelian Tiket')
    ->url()
    ->placeholder('https://...')
    ->nullable()
    ->helperText('Kosongkan jika tidak ada pembelian online, isi nomor WA agen di bawah'),

Forms\Components\TextInput::make('agent_whatsapp_number')
    ->label('WA Agen (jika tidak ada link tiket)')
    ->tel()
    ->nullable(),
```

**VillageResource** — nonaktifkan Create dan Delete, karena 6 desa sudah fixed:
```php
public static function canCreate(): bool { return false; }
public static function canDelete(Model $record): bool { return false; }
```

**UmkmResource** — filter by desa di table:
```php
Tables\Filters\SelectFilter::make('village_id')
    ->label('Villages')
    ->relationship('village', 'name'),
```

**Role permission** — `canAccess()` di resource yang hanya untuk admin:
```php
// Di DestinationResource, VillageResource, LocalGuideResource
public static function canAccess(): bool {
    return auth()->user()->role === 'admin';
}

// Editor desa hanya bisa akses:
// ShipScheduleResource, KknLogItemResource, HomestayResource, UmkmResource
```

### 2.7 Buat Seeders

```bash
php artisan make:seeder VillageSeeder          # 6 desa dengan data awal
php artisan make:seeder LocalGuideSeeder
php artisan make:seeder DestinationSeeder
php artisan make:seeder HomestaySeeder
php artisan make:seeder ShipScheduleSeeder
php artisan make:seeder KknLogItemSeeder
php artisan make:seeder UmkmSeeder          # dummy UMKM per desa
php artisan make:seeder UserSeeder          # 1 admin + 1 editor
```

`VillageSeeder` — isi 6 desa dengan data yang sudah dikumpulkan dari lapangan:
```php
$villages = [
    ['name' => 'Enggano',   'tribe' => 'Kauno'],
    ['name' => 'Kahyapu',   'tribe' => 'Kaahua'],
    ['name' => 'Kaana',     'tribe' => 'Kaana'],
    ['name' => 'Meok',      'tribe' => 'Meok'],
    ['name' => 'Apoho',     'tribe' => 'Apoho'],
    ['name' => 'Malakoni',  'tribe' => 'Malakoni'],
];
```

`UserSeeder`:
```php
User::create([
    'name'     => 'Admin KKN',
    'email'    => 'admin@enggano.village.id',
    'password' => bcrypt('password'),
    'role'     => 'admin',
]);

User::create([
    'name'     => 'Editor Villages',
    'email'    => 'editor@enggano.village.id',
    'password' => bcrypt('password'),
    'role'     => 'editor',
]);
```

> Jangan lupa tambahkan kolom `role` ke migration `users` table atau buat migration alter table.

```bash
php artisan migrate --seed
```

### 2.8 Test Filament Panel

Buka `localhost:8000/admin`:
- [ ] Login sebagai `admin` → semua resource tampil (7 resource)
- [ ] Login sebagai `editor` → hanya tampil 4 menu: Ship Schedule · KKN Log · Homestay · UMKM
- [ ] CRUD Destinations berjalan termasuk upload photos
- [ ] CRUD UMKM berjalan, filter by desa berfungsi
- [ ] Form ShipSchedule punya field link tiket dan WA agen
- [ ] Villages tidak ada tombol Create dan Delete

```bash
git commit -m "feat: models, migrations, controllers, filament resources, seeders"
```

---

## Fase 3 — Frontend React

**Target:** Semua halaman publik selesai dengan desain final.

### 3.1 Buat Layout & Komponen Global

**Step 1 — AppLayout**
```
resources/js/Layouts/AppLayout.jsx
```
Isi: `<Navbar /> + {children} + <Footer /> + <FloatingWA />`

**Step 2 — Navbar**
```
resources/js/Components/Navbar.jsx
```
- Menu: Destinations · Accommodations · KKN Log · Villages
- CTA button: "Check Ship Schedule" → `/accommodations#transportation`
- Transparan di hero, solid saat scroll
- Hamburger menu untuk mobile

**Step 3 — FloatingWA**
```
resources/js/Components/FloatingWA.jsx
```
- Fixed bottom-right, warna `accent-500`
- Ikon `MessageCircle` dari Lucide React
- Nomor dari `APP_WA_NUMBER` di `.env`

**Step 4 — Footer**
```
resources/js/Components/Footer.jsx
```
- Background `primary-900`, teks putih
- 3 kolom: brand + navigasi + kredit KKN UGM

**Step 5 — Badge (reusable)**
```
resources/js/Components/Badge.jsx
```
```jsx
export default function Badge({ children, variant = 'default' }) {
  const variants = {
    bahari:   'bg-primary-700/20 text-primary-700',
    history:  'bg-highlight-500/20 text-highlight-700',
    wildlife: 'bg-surface-500/20 text-surface-700',
    ekonomi:  'bg-accent-500/20 text-accent-700',
    umkm:     'bg-surface-500/20 text-surface-700',
  }
  return (
    <span className={`font-body text-xs px-2 py-0.5 ${variants[variant] ?? 'bg-neutral-100 text-neutral-600'}`}>
      {children}
    </span>
  )
}
```

### 3.2 Homepage (Home/Index.jsx)

**Section 1 — HeroVideo**
```
resources/js/Components/HeroVideo.jsx
```
- `<video autoPlay muted loop playsInline>` — wajib semua atribut ini untuk iOS
- Overlay gradient `from-black/20 via-transparent to-black/60`
- Headline font `font-display`, teks putih
- 2 CTA: "Jelajahi Destinations" (accent) + "Info Perjalanan" (outlined)

**Section 2 — Trip Essentials**
- 3 kartu quicklink: Ship Schedule · Cari Homestay · Peta Sinyal
- Ikon Lucide: `Ship` · `Home` · `Signal`
- Link ke: `/accommodations#transportation` · `/accommodations#homestay` · `/accommodations#signal-map`

**Section 3 — Bento Grid 3 Pilar**
```
resources/js/Components/BentoGrid.jsx
```
- Layout: 1 besar kiri + 2 kecil kanan
- Foto dominan, overlay teks di bawah
- Klik → `/destinations?type=bahari` / `?type=history` / `?type=wildlife`

**Section 4 — Latest KKN Log**
- 3 kartu dari props `latestKkn`
- CTA: "Lihat Semua Catatan →" → `/kkn-log`

### 3.3 Destinations Page (Destinations/Index.jsx + Show.jsx)

**Index:**
- Filter bar: Semua · Bahari · Sejarah · Wildlife
- Filter via URL query param `?type=bahari`
- Grid 1 kolom mobile, 2 tablet, 3 desktop
- `DestinationCard` — aspect 3/4, hover scale photos 1.05

**Show:**
- Hero photos full-width + overlay
- Breadcrumb: Home → Destinations → [Nama]
- Sidebar: type, tingkat kesulitan, koordinat
- Tombol WA Local Guide (jika ada) — pre-filled pesan
- Leaflet map (lazy loaded — lihat catatan SSR di bawah)

```
resources/js/Components/DestinationCard.jsx
resources/js/Components/LeafletMap.jsx
```

> **Leaflet + SSR:** Inertia tidak pakai SSR by default, tapi aman pakai lazy import:
> ```jsx
> const LeafletMap = lazy(() => import('../Components/LeafletMap'))
> // Wrap dengan <Suspense fallback={<div>Memuat peta...</div>}>
> ```

### 3.4 Accommodations Page (Accommodations/Index.jsx)

**Section 1 — Jadwal Transportasi** (`#transportation`)
```
resources/js/Components/ShipSchedule.jsx
```
- Kartu per schedule, bukan tabel (lebih mobile-friendly)
- Ikon `Ship` (Ferry) dan `Plane` (Susi Air)
- Badge days keberangkatan
- **Logic tombol tiket:**
  ```jsx
  {schedule.ticket_link ? (
    <a href={schedule.ticket_link} target="_blank" rel="noopener noreferrer"
       className="bg-accent-500 text-white px-4 py-2 text-sm">
      Beli Tiket →
    </a>
  ) : schedule.agent_whatsapp_number ? (
    <a href={`https://wa.me/${schedule.agent_whatsapp_number}?text=Halo, saya ingin info schedule ${schedule.route}`}
       target="_blank" className="border border-accent-500 text-accent-500 px-4 py-2 text-sm">
      Hubungi Agen
    </a>
  ) : null}
  ```
- Disclaimer wajib di bawah section:
  ```
  ⚠️ Jadwal bersifat estimasi dan dapat berubah sewaktu-waktu.
  Konfirmasi ke pelabuhan atau agen sebelum berangkat.
  ```

**Section 2 — Homestay** (`#homestay`)
```
resources/js/Components/HomestayCard.jsx
```
- Grid 1 kolom mobile, 2 desktop
- Foto, name penginapan, owner, facilities, harga estimasi
- Tombol WA → `wa.me/{whatsapp_number}?text=Halo, saya tertarik menginap di {name}`

**Section 3 — Peta Sinyal** (`#signal-map`)
- Leaflet map dengan 3 warna marker
- Legend: 🟢 4G · 🟡 3G/2G · 🔴 Blank Spot

### 3.5 KKN Log Page (KknLog/Index.jsx + Show.jsx)

**Index:**
- Filter category: Semua · Ekonomi · Kesehatan · Digitalisasi · Lingkungan
- Grid kartu — editorial feel, date + category badge + title
- Urutan terbaru di atas

**Show:**
- Layout artikel: `max-w-2xl mx-auto`
- Konten rich text dari Filament
- Galeri photos dokumentasi (grid 2 kolom)
- Navigasi artikel: ← Sebelumnya · Berikutnya →

### 3.6 Villages Page (Villages/Index.jsx + Show.jsx)

**Index:**
```
resources/js/Pages/Village/Index.jsx
```
- Peta Leaflet di atas: 6 marker desa, klik marker → popup name + link detail
- Di bawah peta: grid 6 kartu desa (photos + name + summary + jumlah UMKM)

```jsx
// Kartu desa dengan badge jumlah UMKM
<div className="flex items-center gap-2 mt-2">
  <ShoppingBag size={13} className="text-surface-500" />
  <span className="font-body text-xs text-neutral-500">
    {village.umkms_count} Local UMKM
  </span>
</div>
```

**Show:**
```
resources/js/Pages/Village/Show.jsx
resources/js/Components/UmkmCard.jsx
```
Layout halaman dari atas ke bawah:
1. Hero photos desa full-width
2. Info ringkas: tribe, potential
3. **Section Sejarah** — rich text `history`
4. **Section Tradisi & Budaya** — rich text `traditions`
5. **Local UMKM Section** — grid `UmkmCard` (hanya tampil jika `village.umkms.length > 0`)
6. Navigasi desa: ← Villages Sebelumnya · Villages Berikutnya →

`UmkmCard.jsx`:
```jsx
export default function UmkmCard({ umkm }) {
  const whatsappUrl = `https://wa.me/${umkm.whatsapp_number}?text=${encodeURIComponent(
    `Halo, saya tertarik dengan produk ${umkm.business_name}`
  )}`
  return (
    <div className="bg-white shadow-sm p-4">
      {umkm.product_photos && (
        <img src={umkm.product_photos} alt={umkm.business_name}
             className="w-full aspect-square object-cover mb-3" loading="lazy" />
      )}
      <Badge variant="umkm">{umkm.business_type}</Badge>
      <h4 className="font-display text-lg text-neutral-800 mt-2">{umkm.business_name}</h4>
      <p className="font-body text-sm text-neutral-500">{umkm.owner_name}</p>
      {umkm.notes && (
        <p className="font-body text-sm text-neutral-500 mt-1 line-clamp-2">{umkm.notes}</p>
      )}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
         className="mt-3 flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white text-sm px-4 py-2 transition-colors w-full justify-center">
        <MessageCircle size={14} />
        Pesan via WA
      </a>
    </div>
  )
}
```

### 3.7 Mobile Responsiveness Check

Test di viewport 375px (iPhone SE) untuk setiap halaman:
- [ ] Navbar hamburger berfungsi, menu overlay tampil
- [ ] Hero video autoplay di iOS Safari (`playsInline` + `muted`)
- [ ] Grid turun ke 1 kolom
- [ ] Tombol WA (floating + UmkmCard + HomestayCard) bisa diklik
- [ ] Kartu schedule kapal — tombol tiket/agen tidak terpotong
- [ ] Leaflet map responsive, bisa di-pan dan zoom dengan jari
- [ ] FloatingWA tidak menutupi content penting di halaman desa (banyak kartu)

```bash
git commit -m "feat: all React pages and components complete"
```

---

## Fase 4 — Polish, Test & Deploy

### 4.1 Performance Optimization

**Compress video hero:**
```bash
ffmpeg -i raw-enggano.mp4 -vcodec h264 -acodec aac -vf scale=1280:720 -crf 28 public/videos/hero-enggano.mp4
ls -lh public/videos/hero-enggano.mp4  # target ≤ 8MB
```

**Images:**
- Upload via Filament → Spatie otomatis convert ke WebP
- Semua `<img>` pakai `loading="lazy"` kecuali above-the-fold

**Build production:**
```bash
npm run build
ls -lh public/build/assets/*.js  # target chunk terbesar < 200KB gzipped
```

### 4.2 SEO & Meta Tags

Di `HandleInertiaRequests.php`:
```php
public function share(Request $request): array {
    return array_merge(parent::share($request), [
        'appName' => config('app.name'),
        'flash'   => ['message' => $request->session()->get('message')],
    ]);
}
```

Di setiap Page component:
```jsx
import { Head } from '@inertiajs/react'

<Head>
  <title>{village.name} — Villages di Pulau Enggano</title>
  <meta name="description" content={village.summary} />
  <meta property="og:image" content={village.photo_url} />
</Head>
```

### 4.3 Error Pages

```bash
php artisan make:controller ErrorController
```

Buat `resources/js/Pages/Error.jsx` untuk 404 dan 500 yang sesuai visual brand.

### 4.4 Deploy ke Server

```bash
# Di server
git clone https://github.com/org/web-enggano.git /var/www/enggano
cd /var/www/enggano
composer install --no-dev -o
npm ci && npm run build
cp .env.example .env
php artisan key:generate
# Edit .env: DB_*, APP_URL, APP_WA_NUMBER
php artisan migrate --seed
chown -R www-data:www-data storage bootstrap/cache
php artisan storage:link
certbot --nginx -d enggano.village.id
```

### 4.5 Setup Backup Otomatis

```bash
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

Edit `config/backup.php` → set destination disk ke `s3` (Cloudflare R2).

```bash
php artisan backup:run   # test manual
crontab -e
# Tambahkan:
0 2 * * * cd /var/www/enggano && php artisan schedule:run
```

### 4.6 Final Checklist Pre-Launch

**Fungsionalitas:**
- [ ] Semua 5 halaman publik bisa diakses tanpa error
- [ ] Filter destinasi (`?type=`) berfungsi dan URL bisa di-share
- [ ] Video hero autoplay di desktop dan mobile iOS
- [ ] Tombol WA di FloatingWA, HomestayCard, UmkmCard — semua buka WA dengan pesan pre-filled
- [ ] Jadwal kapal: jika ada `ticket_link` → tombol "Beli Tiket →", jika tidak → "Hubungi Agen"
- [ ] Disclaimer schedule kapal tampil
- [ ] Leaflet map tampil di Accommodations dan Villages, marker muncul, klik popup berfungsi
- [ ] Section UMKM di halaman desa: tampil jika ada data, tersembunyi jika kosong
- [ ] Login admin → akses semua 7 resource
- [ ] Login editor → hanya akses 4 menu (Ship Schedule · KKN Log · Homestay · UMKM)
- [ ] Villages tidak ada tombol Create/Delete di Filament
- [ ] Upload photos via Filament → tersimpan dan tampil di frontend
- [ ] Navigasi antar desa (prev/next) berfungsi

**Visual:**
- [ ] Font Cormorant Garamond load di semua halaman
- [ ] Warna konsisten: `primary`, `surface`, `accent`, `highlight`
- [ ] Ikon Lucide React tampil semua
- [ ] Navbar transparan di hero, solid saat scroll
- [ ] Badge warna sesuai category (bahari biru, history plum, wildlife hijau, dll)
- [ ] Mobile layout rapi di 375px

**Performance:**
- [ ] PageSpeed Insights mobile ≥ 70
- [ ] Video hero ≤ 8MB
- [ ] Image lazy loading is_active
- [ ] No console errors di production build

**Security:**
- [ ] `.env` tidak ter-commit ke Git
- [ ] `APP_DEBUG=false` di production
- [ ] SSL is_active dan auto-renew
- [ ] Filament login dilindungi autentikasi

```bash
git commit -m "chore: production ready, deploy to server"
git tag v1.0.0
git push origin main --tags
```

---

## Catatan Penting

### Urutan Prioritas Kalau Waktu Terbatas

Kerjakan dalam urutan ini untuk versi minimum yang bisa diserahkan:

1. **Setup awal** (Fase 1) — 1 days
2. **Migrations + Models + Seeder** termasuk Village & UMKM — 1.5 days
3. **Filament Resources** — 1.5 days (admin langsung usable oleh editor desa)
4. **Homepage** (Hero + 3 section) — 2 days
5. **Accommodations Page** (paling dibutuhkan wisatawan) — 1 days
6. **Destinations Page** — 1–2 days
7. **Villages Page + UMKM** — 2 days
8. **KKN Log Page** — 1 days
9. **Deploy** — 0.5 days

Total minimum yang viable: **~11–12 days kerja.**

### Titik yang Sering Jadi Masalah

| Masalah | Solusi |
|---|---|
| Video iOS tidak autoplay | Pastikan `playsInline` dan `muted` keduanya ada di `<video>` |
| Leaflet error saat render | Gunakan `lazy(() => import(...))` + `<Suspense>` |
| Filament konflik React | Tidak konflik — Filament di `/admin` pakai Livewire sendiri |
| Tailwind v4 class tidak muncul | Pastikan `@import "tailwindcss"` ada di `app.css`, bukan di `tailwind.config.js` |
| Inertia 404 saat refresh halaman | Pastikan Nginx config punya `try_files $uri $uri/ /index.php` |
| Upload photos tidak muncul | Jalankan `php artisan storage:link` |
| Section UMKM tampil kosong | Cek kondisi `{village.umkms.length > 0 && <SectionUmkm />}` |
| Tombol tiket tidak muncul | Pastikan `ticket_link` dan `agent_whatsapp_number` di-pass dari controller ke Inertia props |
| Slug desa berubah setelah edit | Set `generateSlugsOnlyOnCreate()` di `getSlugOptions()` agar URL tidak berubah |

---

*Web Enggano · KKN Legacy Project · Development Plan v3.1*
