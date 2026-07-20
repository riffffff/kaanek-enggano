import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'

const villageProfiles = {
  Apoho: {
    summary:
      'The cultural heartbeat of Enggano, where ancient traditions blend seamlessly with the rhythms of the Indian Ocean.',
    tribe: 'Suku Kaitora',
    guide: {
      name: 'Bapak Harun Kaitora',
      role: 'KEPALA SUKU & PENJAGA ADAT',
      description:
        "Bapak Harun is the recognized authority on oral histories of Apoho. He frequently guides researchers and coordinates the traditional ceremonies that anchor the village's cultural identity.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Rumah Adat', 'Keseharian', 'Pesisir Apoho'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  Enggano: {
    summary:
      'Pusat ingatan kolektif dan warisan sejarah, menyimpan cerita lisan dari generasi ke generasi.',
    tribe: 'Suku Kauno',
    guide: {
      name: 'Bapak Paulus Kauno',
      role: 'PANDU BUDAYA & SEJARAH',
      description:
        "Bapak Paulus mendedikasikan hidupnya untuk mendokumentasikan cerita rakyat, asal-usul suku, dan situs pemakaman kuno di Desa Enggano.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Situs Bersejarah', 'Hutan Keramat', 'Kampung Tua'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  Kahyapu: {
    summary:
      'Pintu gerbang laut utama Enggano, tempat interaksi ekonomi dan mobilitas warga bermula.',
    tribe: 'Suku Kaahua',
    guide: {
      name: 'Bapak Hendrik Kaahua',
      role: 'PENGELOLA PELABUHAN & TOKOH MASYARAKAT',
      description:
        "Sebagai saksi perkembangan gerbang laut pulau, Pak Hendrik memandu pendatang memahami sejarah logistik dan navigasi maritim di sekitar Teluk Kahyapu.",
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Pelabuhan Utama', 'Teluk Kahyapu', 'Hutan Bakau'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  Kaana: {
    summary:
      'Desa pesisir yang asri dengan hamparan kebun kelapa dan kehidupan tani yang damai.',
    tribe: 'Suku Kaana',
    guide: {
      name: 'Bapak Thomas Kaana',
      role: 'KETUA KELOMPOK TANI & ADAT',
      description:
        "Pak Thomas ahli dalam bidang botani lokal dan sistem pertanian tradisional Enggano, sering mendampingi penelitian agroforestri di pulau.",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Kebun Kelapa', 'Pantai Pasir Putih', 'Pertanian Warga'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  Meok: {
    summary:
      'Desa nelayan dengan pesona laut lepas, di mana ombak Samudera Hindia bertemu tebing karang.',
    tribe: 'Suku Kaharubi',
    guide: {
      name: 'Bapak Simon Kaharubi',
      role: 'NELAYAN UTAMA & PANDU MARITIM',
      description:
        "Pak Simon menguasai teknik melaut tradisional dan navigasi tanpa alat elektronik, menjadi rujukan utama bagi riset kelautan di Enggano.",
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Tebing Karang', 'Perahu Tradisional', 'Lanskap Samudera'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  Malakoni: {
    summary:
      'Pusat aktivitas publik dan administratif, menghubungkan seluruh elemen masyarakat di pulau.',
    tribe: 'Suku Kaahua',
    guide: {
      name: 'Ibu Maria Kaahua',
      role: 'TOKOH PENDIDIKAN & SOSIAL',
      description:
        "Ibu Maria menggerakkan aktivitas literasi pemuda dan pemberdayaan perempuan di Malakoni, menjadi narasumber tentang dinamika sosial perkotaan kecil Enggano.",
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    },
    galleryLabels: ['Kantor Desa', 'Pasar Mingguan', 'Aktivitas Sekolah'],
    fallbackGallery: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    ],
  },
}

const defaultProfile = {
  summary:
    'A living cultural landscape on Enggano, where local memory, coastal life, and everyday rituals remain closely intertwined.',
  tribe: 'Komunitas Lokal Enggano',
  guide: {
    name: 'Tokoh Adat Setempat',
    role: 'PENJAGA CERITA LOKAL',
    description:
      'Tokoh lokal menjadi penghubung penting antara sejarah lisan, ritme hidup harian, dan identitas desa yang terus dirawat lintas generasi.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
  },
  galleryLabels: ['Lanskap Desa', 'Aktivitas Warga', 'Detail Arsitektur'],
  fallbackGallery: [
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  ],
}

const fallbackUmkms = [
  {
    id: 'umkm-1',
    business_type: 'Hasil Hutan',
    owner_name: 'Ibu Siti',
    business_name: 'Madu Hutan Liar',
    notes:
      'Produk lokal yang dipanen langsung dari lanskap sekitar desa dan dikenal oleh warga sebagai hasil unggulan.',
    whatsapp_number: '6280000000000',
    product_photos:
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'umkm-2',
    business_type: 'Kerajinan',
    owner_name: 'Kelompok Mawar',
    business_name: 'Anyaman Daun Lontar',
    notes:
      'Kerajinan tangan khas desa yang dikerjakan secara kolektif dan menjadi bagian dari ekonomi rumah tangga setempat.',
    whatsapp_number: '6280000000000',
    product_photos:
      'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'umkm-3',
    business_type: 'Hasil Laut',
    owner_name: 'Pak Nelayan',
    business_name: 'Ikan Segar Tangkapan Hari Ini',
    notes:
      'Tangkapan segar nelayan lokal dengan ketersediaan yang mengikuti musim dan kondisi cuaca.',
    whatsapp_number: '6280000000000',
    product_photos:
      'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=1200&q=80',
  },
]

function formatCoordinates(lat, lng) {
  if (lat == null || lng == null) {
    return 'Belum tersedia'
  }

  return `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`
}

export default function VillageShow({ village, prev = null, next = null }) {
  const profile = villageProfiles[village.name] ?? defaultProfile
  const heroSummary = village.summary || profile.summary
  const storyParagraphs = [
    village.history ||
      `${village.name} berdiri sebagai ruang hidup yang merangkum sejarah migrasi, hubungan antarsuku, dan adaptasi masyarakat terhadap isolasi geografis Enggano.`,
    village.traditions ||
      `Arsitektur, pola permukiman, dan kebiasaan komunal di ${village.name} memperlihatkan bagaimana tradisi lokal terus dinegosiasikan dengan kebutuhan hidup pesisir masa kini.`,
    `Hari-hari di ${village.name} bergerak mengikuti musim, laut, dan aktivitas produksi warga. Narasi desa terbentuk dari interaksi antara alam, ingatan kolektif, dan kerja sehari-hari.`,
  ]

  const keyPotentials = Array.isArray(village.potential)
    ? village.potential
    : typeof village.potential === 'string'
      ? village.potential.split(',').map(item => item.trim()).filter(Boolean)
      : ['Alam', 'Budaya']

  const umkms = village.umkms?.length ? village.umkms : fallbackUmkms

  const displayGallery = (village.gallery && village.gallery.length > 0)
    ? village.gallery.map((url, index) => ({
        url,
        label: `Foto Galeri ${index + 1}`
      }))
    : (profile.fallbackGallery || defaultProfile.fallbackGallery).map((url, index) => ({
        url,
        label: (profile.galleryLabels || defaultProfile.galleryLabels)[index] || `Foto Galeri ${index + 1}`
      }))

  return (
    <>
      <Head title={village.name} />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src={
            village.image ||
            'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80'
          }
          alt={village.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/30 via-primary-950/55 to-primary-950/90" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <Button
            href="/villages"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up"
          >
            Kembali ke Villages
          </Button>
          <div className="mt-8 max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70" style={{ '--reveal-delay': '80ms' }}>VILLAGE</p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '150ms' }}>
              Desa {village.name}
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '240ms' }}>{heroSummary}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hover-lift reveal-up space-y-8 bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '120ms' }}>
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Village Profile
              </h3>
            </div>

            <dl className="space-y-6">
              <div>
                <dt className="text-sm text-neutral-500">Dominant Tribe</dt>
                <dd className="mt-2 text-base font-semibold text-neutral-900">
                  {village.tribe || profile.tribe}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-500">Coordinates</dt>
                <dd className="mt-2 text-base font-semibold text-neutral-900">
                  {formatCoordinates(village.lat, village.lng)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-neutral-500">Key Potential</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {keyPotentials.map(potential => (
                    <span
                      key={potential}
                      className="bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700"
                    >
                      {potential}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="space-y-14">
            <article className="reveal-up max-w-4xl" style={{ '--reveal-delay': '180ms' }}>
              <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                Sejarah & Tradisi
              </h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-neutral-700 md:text-lg">
                {storyParagraphs.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-primary-700 pl-6 font-display text-2xl italic leading-9 text-neutral-900">
                "Untuk memahami Enggano, seseorang perlu mendengar cerita yang disimpan
                oleh desa-desa ini."
              </blockquote>
            </article>

            <section className="hover-lift reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '240ms' }}>
              <h2 className="font-display text-3xl font-semibold text-neutral-900">
                Tokoh Lokal
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <img
                  src={profile.guide.image}
                  alt={profile.guide.name}
                  className="aspect-4/5 w-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-display text-2xl font-semibold text-neutral-900">
                    {profile.guide.name}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-primary-700">
                    {profile.guide.role}
                  </p>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {profile.guide.description}
                  </p>
                </div>
              </div>
            </section>

            <section className="reveal-up" style={{ '--reveal-delay': '300ms' }}>
              <div>
                <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                  Glimpses of {village.name}
                </h2>
                <p className="mt-3 text-base text-neutral-600">Daily life and structural heritage.</p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {displayGallery.map((item) => (
                  <div key={item.url} className="group hover-lift relative overflow-hidden bg-white shadow-sm">
                    <img
                      src={item.url}
                      alt={item.label}
                      className="media-zoom aspect-4/5 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-5 pb-5 pt-14 text-lg font-semibold text-white">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-700">SUPPORT LOCAL</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            UMKM Lokal Desa {village.name}
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {umkms.map(umkm => (
              <article key={umkm.id} className="group hover-lift overlay-glow reveal-up overflow-hidden bg-surface-50 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '160ms' }}>
                <img
                  src={
                    umkm.product_photos ||
                    'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt={umkm.business_name}
                  className="media-zoom aspect-4/3 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 text-sm text-neutral-500">
                    <span>{umkm.business_type}</span>
                    <span>{umkm.owner_name}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-neutral-900">
                    {umkm.business_name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">{umkm.notes}</p>
                  <a
                    href={`https://wa.me/${umkm.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${umkm.business_name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift mt-6 inline-flex bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
                  >
                    Pesan via WA
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 border-t border-neutral-200 pt-8">
            <PrevNext
              prev={prev ? { href: `/villages/${prev.slug}`, title: prev.name } : null}
              next={next ? { href: `/villages/${next.slug}`, title: next.name } : null}
              prevLabel="Previous Village"
              nextLabel="Next Village"
              prevEmptyText="Belum ada desa sebelumnya."
              nextEmptyText="Belum ada desa berikutnya."
            />
          </div>
        </div>
      </section>
    </>
  )
}
