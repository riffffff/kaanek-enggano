import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'
import { findVillageBySlug, villageImageFallback, umkmImageFallback } from '../../data/villages.js'

const fallbackUmkms = [
  {
    id: 'umkm-1',
    business_type: 'Hasil Hutan',
    owner_name: 'Ibu Siti',
    business_name: 'Madu Hutan Liar',
    notes:
      'Produk lokal yang dipanen langsung dari lanskap sekitar desa dan dikenal oleh warga sebagai hasil unggulan.',
    product_photos: null,
  },
  {
    id: 'umkm-2',
    business_type: 'Kerajinan',
    owner_name: 'Kelompok Mawar',
    business_name: 'Anyaman Daun Lontar',
    notes:
      'Kerajinan tangan khas desa yang dikerjakan secara kolektif dan menjadi bagian dari ekonomi rumah tangga setempat.',
    product_photos: null,
  },
  {
    id: 'umkm-3',
    business_type: 'Hasil Laut',
    owner_name: 'Pak Nelayan',
    business_name: 'Ikan Segar Tangkapan Hari Ini',
    notes:
      'Tangkapan segar nelayan lokal dengan ketersediaan yang mengikuti musim dan kondisi cuaca.',
    product_photos: null,
  },
]

function formatCoordinates(lat, lng) {
  if (lat == null || lng == null) return 'Belum tersedia'
  return `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`
}

export default function VillageShow({ slug, umkms = [], prev = null, next = null }) {
  const village = findVillageBySlug(slug)

  if (!village) {
    return (
      <>
        <Head title="Desa Tidak Ditemukan" />
        <section className="min-h-screen bg-[#f8f7f4] px-6 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Desa tidak ditemukan
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-600">
            Desa yang Anda cari tidak tersedia dalam daftar permukiman di Pulau Enggano.
          </p>
          <div className="mt-10">
            <Button href="/villages" showArrow arrowPosition="left">
              Kembali ke Daftar Desa
            </Button>
          </div>
        </section>
      </>
    )
  }

  const heroImage = village.heroImage || villageImageFallback

  const hasSummary = village.summary && village.summary.trim() !== ''
  const hasHistory = village.history && village.history.trim() !== ''
  const hasTraditions = village.traditions && village.traditions.trim() !== ''
  const hasTribe = village.tribe && village.tribe.trim() !== ''
  const hasPotential = (Array.isArray(village.potential) && village.potential.length > 0) || (typeof village.potential === 'string' && village.potential.trim() !== '')
  const hasGuide = village.guide && village.guide.name && village.guide.name.trim() !== ''

  const splitIntoSentences = (text) => {
    return text
      .replace(/([.!?])\s+/g, '$1|SPLIT|')
      .split('|SPLIT|')
      .filter(s => s.trim())
      .map(s => s.trim())
  }

  const groupSentencesIntoParagraphs = (sentences, sentencesPerPara = 3) => {
    const paragraphs = []
    for (let i = 0; i < sentences.length; i += sentencesPerPara) {
      paragraphs.push(sentences.slice(i, i + sentencesPerPara).join(' '))
    }
    return paragraphs
  }

  const storyParagraphs = hasHistory
    ? groupSentencesIntoParagraphs(splitIntoSentences(village.history.trim()))
    : []
  if (hasTraditions) {
    storyParagraphs.push(village.traditions.trim())
  }

  const keyPotentials = Array.isArray(village.potential) && village.potential.length
    ? village.potential
    : typeof village.potential === 'string' && village.potential.trim() !== ''
      ? [village.potential]
      : []

  const displayUmkms = Array.isArray(umkms) && umkms.length ? umkms : fallbackUmkms

  const galleryLabels = Array.isArray(village.galleryLabels) && village.galleryLabels.length
    ? village.galleryLabels
    : [`Lanskap ${village.name}`, 'Aktivitas Warga', 'Detail Arsitektur']

  const displayGallery = Array.isArray(village.gallery) && village.gallery.length
    ? village.gallery.map((url, i) => ({ url, label: galleryLabels[i] || `Foto Galeri ${i + 1}` }))
    : [
        { url: villageImageFallback, label: galleryLabels[0] },
        { url: villageImageFallback, label: galleryLabels[1] },
        { url: villageImageFallback, label: galleryLabels[2] },
      ]

  const guide = hasGuide ? village.guide : null

  return (
    <>
      <Head title={`Desa ${village.name}`} />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src={heroImage}
          alt={`Desa ${village.name}`}
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
            {hasSummary && (
              <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '240ms' }}>
                {village.summary}
              </p>
            )}
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
              {hasTribe && (
                <div>
                  <dt className="text-sm text-neutral-500">Dominant Tribe</dt>
                  <dd className="mt-2 text-base font-semibold text-neutral-900">
                    {village.tribe}
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-neutral-500">Coordinates</dt>
                <dd className="mt-2 text-base font-semibold text-neutral-900">
                  {formatCoordinates(village.lat, village.lng)}
                </dd>
              </div>
              {hasPotential && (
                <div>
                  <dt className="text-sm text-neutral-500">Key Potential</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {keyPotentials.map((potential) => (
                      <span
                        key={potential}
                        className="bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700"
                      >
                        {potential}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </aside>

          <div className="space-y-14">
            {storyParagraphs.length > 0 && (
              <article className="reveal-up max-w-4xl" style={{ '--reveal-delay': '180ms' }}>
                <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                  Tentang Desa
                </h2>
                <div className="mt-8 space-y-6 text-base leading-8 text-neutral-700 md:text-lg">
                  {storyParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
                <blockquote className="mt-10 border-l-2 border-primary-700 pl-6 font-display text-2xl italic leading-9 text-neutral-900">
                  "Untuk memahami Enggano, seseorang perlu mendengar cerita yang disimpan
                  oleh desa-desa ini."
                </blockquote>
              </article>
            )}

            {guide && (
              <section className="hover-lift reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '240ms' }}>
                <h2 className="font-display text-3xl font-semibold text-neutral-900">
                  Tokoh Lokal
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="aspect-4/5 w-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-neutral-900">
                      {guide.name}
                    </h3>
                    {guide.role && (
                      <p className="mt-2 text-sm uppercase tracking-[0.22em] text-primary-700">
                        {guide.role}
                      </p>
                    )}
                    {guide.description && (
                      <p className="mt-4 text-base leading-7 text-neutral-600">
                        {guide.description}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            <section className="reveal-up" style={{ '--reveal-delay': '300ms' }}>
              <div>
                <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                  Glimpses of {village.name}
                </h2>
                <p className="mt-3 text-base text-neutral-600">Daily life and structural heritage.</p>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {displayGallery.map((item, idx) => (
                  <div key={`${item.url}-${idx}`} className="group hover-lift relative overflow-hidden bg-white shadow-sm">
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
          {(!umkms || umkms.length === 0) && (
            <p className="mt-3 text-sm text-neutral-500">
              Menampilkan contoh produk UMKM. Tambahkan UMKM untuk desa ini melalui panel admin.
            </p>
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayUmkms.map((umkm, idx) => (
              <article key={`${umkm.id}-${idx}`} className="group hover-lift overlay-glow reveal-up overflow-hidden bg-surface-50 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '160ms' }}>
                {umkm.product_photos ? (
                  <img
                    src={umkm.product_photos}
                    alt={umkm.business_name}
                    className="media-zoom aspect-4/3 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="aspect-4/3 w-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <p className="mt-2 text-xs text-slate-400 uppercase tracking-wide">Foto belum tersedia</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4 text-sm text-neutral-500">
                    <span>{umkm.business_type || 'UMKM Lokal'}</span>
                    <span>{umkm.owner_name || '-'}</span>
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-neutral-900">
                    {umkm.business_name}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    {umkm.notes || 'Produk lokal khas desa yang diolah dengan kearifan lokal.'}
                  </p>
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
