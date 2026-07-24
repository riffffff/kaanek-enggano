import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowRight, Calendar, Clock, Newspaper, Sparkles } from 'lucide-react'

const filters = [
  { label: 'SEMUA ARTIKEL', value: null },
  { label: 'EKONOMI', value: 'ekonomi' },
  { label: 'KESEHATAN', value: 'kesehatan' },
  { label: 'DIGITALISASI', value: 'digitalisasi' },
  { label: 'LINGKUNGAN', value: 'lingkungan' },
]

const fallbackItems = [
  {
    slug: 'restorasi-mangrove',
    category: 'lingkungan',
    date: '12 Aug 2024',
    title: 'Restorasi Mangrove di Pesisir Desa Kahyapu: Menjaga Benteng Alami Pulau Enggano',
    excerpt:
      'Upaya kolaboratif warga lokal dan tim relawan dalam merehabilitasi kawasan pesisir guna menahan laju abrasi samudera serta mengembalikan ekosistem hayati.',
    read_time: '5 min baca',
    image:
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'literasi-digital-umkm',
    category: 'digitalisasi',
    date: '08 Aug 2024',
    title: 'Literasi Digital untuk UMKM Lokal: Menembus Pasar Luar Pulau',
    excerpt:
      'Pemberdayaan pengrajin dan pelaku usaha kecil di Enggano dengan pemanfaatan platform digital dan kemasan modern agar produk lokal dikenal luas.',
    read_time: '3 min baca',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'panen-melinjo',
    category: 'ekonomi',
    date: '25 Jul 2024',
    title: 'Optimalisasi Panen & Pengolahan Melinjo Khas Enggano',
    excerpt:
      'Penerapan teknik pengolahan emping melinjo bernilai tambah untuk meningkatkan perekonomian keluarga di desa-desa pesisir.',
    read_time: '4 min baca',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'kesehatan-lansia',
    category: 'kesehatan',
    date: '14 Jul 2024',
    title: 'Layanan Pemeriksaan Kesehatan & Edukasi Gizi Lansia',
    excerpt:
      'Program pelayanan medis gratis serta pendampingan pola hidup sehat bagi para tetua suku dan masyarakat lanjut usia di pelosok kampung.',
    read_time: '4 min baca',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pemetaan-batas-desa',
    category: 'lingkungan',
    date: '02 Jul 2024',
    title: 'Pemetaan Batas Desa Partisipatif Bersama Tetua Enam Suku',
    excerpt:
      'Dokumentasi pemetaan wilayah adat dan desa berbasis partisipasi warga untuk menjamin kepastian wilayah serta konservasi hutan adat.',
    read_time: '6 min baca',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]

const excerptByTitle = {
  'Restorasi Mangrove di Pesisir Desa Kahyapu':
    'Upaya kolaboratif warga lokal dan tim relawan dalam merehabilitasi kawasan pesisir guna menahan laju abrasi samudera serta mengembalikan ekosistem hayati.',
  'Literasi Digital untuk UMKM Lokal':
    'Pemberdayaan pengrajin dan pelaku usaha kecil di Enggano dengan pemanfaatan platform digital dan kemasan modern agar produk lokal dikenal luas.',
  'Optimalisasi Hasil Panen Melinjo':
    'Penerapan teknik pengolahan emping melinjo bernilai tambah untuk meningkatkan perekonomian keluarga di desa-desa pesisir.',
  'Pemeriksaan Kesehatan Rutin Lansia':
    'Program pelayanan medis gratis serta pendampingan pola hidup sehat bagi para tetua suku dan masyarakat lanjut usia di pelosok kampung.',
  'Pemetaan Batas Desa Partisipatif':
    'Dokumentasi pemetaan wilayah adat dan desa berbasis partisipasi warga untuk menjamin kepastian wilayah serta konservasi hutan adat.',
}

const imageByCategory = {
  lingkungan:
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  digitalisasi:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  ekonomi:
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  kesehatan:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
}

export default function KknLogIndex({ items = [], selectedCategory = null }) {
  const [visibleCount, setVisibleCount] = useState(5)

  const entries = items.length
    ? items.map((item, index) => ({
        ...item,
        excerpt:
          item.excerpt ??
          excerptByTitle[item.title] ??
          'Warta dan catatan kegiatan pembangunan masyarakat, pemberdayaan ekonomi lokal, serta kebudayaan Pulau Enggano.',
        read_time: item.read_time ?? `${3 + (index % 4)} min baca`,
        image:
          item.image ??
          imageByCategory[item.category] ??
          fallbackItems[index % fallbackItems.length].image,
      }))
    : fallbackItems

  const featuredArticle = entries[0]
  const listArticles = entries.slice(1, visibleCount)

  function handleFilter(category) {
    setVisibleCount(5)
    router.get('/kkn-log', category ? { category } : {}, { preserveState: true, replace: true })
  }

  return (
    <>
      <Head title="Berita & Artikel - Kaanek Enggano" />

      {/* Hero Showcase Header */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80"
          alt="Berita & Artikel Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/40 via-primary-950/70 to-primary-950" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <div className="reveal-up inline-flex items-center gap-2 rounded-full bg-accent-500/20 border border-accent-500/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-400">
              <Newspaper size={14} />
              <span>Kabar & Catatan Lapangan</span>
            </div>
            <h1 className="reveal-up mt-4 font-display text-5xl font-extrabold tracking-tight text-white md:text-7xl" style={{ '--reveal-delay': '100ms' }}>
              Berita & Artikel
            </h1>
            <p className="reveal-up mt-5 text-base leading-relaxed text-neutral-300 md:text-xl" style={{ '--reveal-delay': '180ms' }}>
              Kumpulan warta terkini, artikel jurnal pemberdayaan, kegiatan kemasyarakatan, serta narasi budaya dari pelosok Pulau Enggano.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-20 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-6 py-4 scrollbar-hide md:px-12 lg:px-16">
          <div className="flex gap-2 min-w-max">
            {filters.map(filter => {
              const active = selectedCategory === filter.value || (!selectedCategory && filter.value === null)

              return (
                <button
                  key={filter.label}
                  type="button"
                  onClick={() => handleFilter(filter.value)}
                  className={`hover-lift px-4 py-2 text-xs font-bold tracking-[0.15em] rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-primary-950 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Articles Portal Area */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-16">
        
        {/* Featured Top Headline Article */}
        {featuredArticle && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-accent-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent-600">Berita Utama / Highlight</span>
            </div>
            
            <article className="group hover-lift overlay-glow reveal-up overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-neutral-200/80">
              <Link href={`/kkn-log/${featuredArticle.slug}`} className="grid lg:grid-cols-12">
                <div className="relative lg:col-span-7 min-h-[320px] lg:min-h-[440px] overflow-hidden">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="media-zoom h-full w-full object-cover"
                  />
                  <div className="absolute top-5 left-5 rounded-lg bg-primary-950/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    {String(featuredArticle.category ?? 'berita').toUpperCase()}
                  </div>
                </div>

                <div className="flex flex-col justify-between p-8 lg:col-span-5 md:p-10">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
                      <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary-700" /> {featuredArticle.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary-700" /> {featuredArticle.read_time}</span>
                    </div>

                    <h2 className="mt-5 font-display text-3xl font-bold leading-snug text-neutral-900 group-hover:text-primary-800 transition-colors md:text-4xl">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-neutral-600 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-2 text-sm font-bold text-accent-600 group-hover:text-accent-700">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </article>
          </div>
        )}

        {/* Standard News Grid */}
        <div className="border-t border-neutral-200/80 pt-10">
          <h3 className="font-display text-2xl font-bold text-neutral-900 mb-8">
            Daftar Artikel Terkini
          </h3>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listArticles.map((item, index) => (
              <article
                key={item.slug}
                className="group hover-lift overlay-glow reveal-up flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/80 transition-all duration-300"
                style={{ '--reveal-delay': `${120 + index * 60}ms` }}
              >
                <div>
                  <Link href={`/kkn-log/${item.slug}`} className="block relative overflow-hidden aspect-[16/10]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="media-zoom h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 rounded-md bg-primary-950/90 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      {String(item.category ?? 'artikel').toUpperCase()}
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                      <span className="flex items-center gap-1"><Calendar size={13} /> {item.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {item.read_time}</span>
                    </div>

                    <h4 className="mt-3 font-display text-xl font-bold leading-snug text-neutral-900 group-hover:text-primary-800 transition-colors line-clamp-2">
                      <Link href={`/kkn-log/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>

                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    href={`/kkn-log/${item.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-600 hover:text-accent-700 transition-colors"
                  >
                    <span>Baca Artikel</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {entries.length > visibleCount && (
          <div className="mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="hover-lift reveal-up bg-primary-950 hover:bg-primary-900 px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-white rounded-xl shadow-md transition-all"
            >
              Tampilkan Lebih Banyak Artikel
            </button>
          </div>
        )}
      </section>
    </>
  )
}

