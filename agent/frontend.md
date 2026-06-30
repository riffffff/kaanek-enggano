# Frontend Rules — React + Inertia + Tailwind v4
alwaysApply: false
description: Aturan spesifik untuk pekerjaan frontend — React components, Inertia pages, styling

## Kapan file ini relevan
Aktifkan rule ini saat mengerjakan file di: `resources/js/`, `resources/css/`

---

## Struktur Folder

```
resources/js/
├── app.jsx                     # Entry point — jangan diubah kecuali perlu
├── Layouts/
│   └── AppLayout.jsx           # Persistent layout — Navbar + Footer + FloatingWA
├── Pages/
│   ├── Home/Index.jsx
│   ├── Destination/Index.jsx
│   ├── Destination/Show.jsx
│   ├── Accommodation/Index.jsx
│   ├── KknLog/Index.jsx
│   ├── KknLog/Show.jsx
│   ├── Village/Index.jsx
│   └── Village/Show.jsx
└── Components/
    ├── HeroVideo.jsx
    ├── Navbar.jsx
    ├── Footer.jsx
    ├── FloatingWA.jsx
    ├── Badge.jsx
    ├── BentoGrid.jsx
    ├── DestinationCard.jsx
    ├── HomestayCard.jsx
    ├── KknCard.jsx
    ├── VillageCard.jsx
    ├── UmkmCard.jsx
    ├── ShipSchedule.jsx
    └── LeafletMap.jsx
```

---

## Aturan Komponen

### HeroVideo — atribut video WAJIB lengkap
```jsx
<video autoPlay muted loop playsInline className="...">
  <source src={src} type="video/mp4" />
</video>
```
Keempat atribut (`autoPlay`, `muted`, `loop`, `playsInline`) wajib ada. Tanpa `playsInline` → iOS tidak autoplay. Tanpa `muted` → browser block autoplay.

### Navbar — transparan di hero, solid saat scroll
```jsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60)
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```
Warna teks menyesuaikan: putih saat transparan, `text-primary-700` saat solid.

### LeafletMap — WAJIB lazy load
```jsx
// BENAR:
const LeafletMap = lazy(() => import('../Components/LeafletMap'))
// Di JSX:
<Suspense fallback={<div className="h-64 bg-neutral-100 animate-pulse" />}>
  <LeafletMap mapMarkers={mapMarkers} />
</Suspense>

// SALAH — jangan lakukan ini:
import LeafletMap from '../Components/LeafletMap'
```

### FloatingWA — nomor dari props, bukan hardcode
```jsx
// Nomor WA dari env via HandleInertiaRequests shared data
const { appWhatsappNumber } = usePage().props
const url = `https://wa.me/${appWhatsappNumber}?text=${encodeURIComponent('Halo, saya ingin info tentang Enggano')}`
```

### UmkmCard — tombol WA dengan pesan pre-filled
```jsx
const whatsappUrl = `https://wa.me/${umkm.whatsapp_number}?text=${encodeURIComponent(
  `Halo, saya tertarik dengan produk ${umkm.business_name}`
)}`
```

### ShipSchedule — logic tombol tiket
```jsx
{schedule.ticket_link ? (
  <a href={schedule.ticket_link} target="_blank" rel="noopener noreferrer"
     className="bg-accent-500 hover:bg-accent-600 text-white text-sm px-4 py-2 transition-colors">
    Beli Tiket →
  </a>
) : schedule.agent_whatsapp_number ? (
  <a href={`https://wa.me/${schedule.agent_whatsapp_number}?text=${encodeURIComponent(`Info schedule ${schedule.route}`)}`}
     target="_blank" rel="noopener noreferrer"
     className="border border-accent-500 text-accent-500 text-sm px-4 py-2 transition-colors">
    Hubungi Agen
  </a>
) : null}
```
Jangan lupa disclaimer di bawah section schedule:
```jsx
<p className="font-body text-xs text-neutral-500 mt-4">
  ⚠️ Jadwal bersifat estimasi dan dapat berubah sewaktu-waktu. Konfirmasi ke pelabuhan atau agen sebelum berangkat.
</p>
```

### Section UMKM di halaman Village — conditional render
```jsx
{village.umkms && village.umkms.length > 0 && (
  <section className="py-12">
    <h2 className="font-display text-3xl text-neutral-800 mb-6">Local UMKM</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {village.umkms.map(umkm => (
        <UmkmCard key={umkm.id} umkm={umkm} />
      ))}
    </div>
  </section>
)}
```
Jangan tampilkan section kosong jika belum ada UMKM.

---

## Tailwind CSS v4 — Token yang Tersedia

Jangan pakai warna di luar token ini:

```
primary-50 sampai primary-950   → Dusk Blue (navbar, heading, link)
surface-50 sampai surface-950   → Palm Leaf (background, badge alam)
neutral-50 sampai neutral-950   → Iron Grey (teks, border)
accent-50 sampai accent-950     → Carrot Orange (CTA, tombol utama)
highlight-50 sampai highlight-950 → Wine Plum (badge budaya/history)
```

Font:
```
font-display  → Cormorant Garamond (heading, name destinasi/villages)
font-body     → Inter (paragraf, label, tombol, nav)
```

---

## Inertia — Hal Penting

### Filter via URL query param (bukan local state)
```jsx
// Di halaman Destination/Index.jsx
import { router } from '@inertiajs/react'

function handleFilter(type) {
  router.get('/destinations', { type }, { preserveState: true, replace: true })
}
```
Ini supaya URL bisa dibookmark dan di-share.

### SEO per halaman
```jsx
import { Head } from '@inertiajs/react'

<Head>
  <title>{village.name} — Village di Pulau Enggano</title>
  <meta name="description" content={village.summary} />
</Head>
```

### Link navigasi
```jsx
// BENAR:
import { Link } from '@inertiajs/react'
<Link href="/destinations">Destination</Link>

// SALAH untuk navigasi internal:
<a href="/destinations">Destination</a>
```

---

## Checklist Sebelum Selesai

- [ ] Video hero punya semua 4 atribut: autoPlay muted loop playsInline
- [ ] Leaflet pakai lazy import + Suspense
- [ ] Semua tombol WA punya pesan pre-filled yang relevan
- [ ] UMKM section conditional — tidak tampil kalau kosong
- [ ] Disclaimer schedule kapal tampil di bawah section transportasi
- [ ] Semua `<img>` punya `loading="lazy"` kecuali hero
- [ ] Filter destinasi pakai URL query param, bukan useState
- [ ] Navigasi internal pakai `<Link>` bukan `<a>`
