import { useState, useEffect, useRef } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import PageHeader from '../../Components/PageHeader'

const filters = [
  { label: 'Semua Artikel', value: null },
  { label: 'Ekonomi', value: 'ekonomi' },
  { label: 'Kesehatan', value: 'kesehatan' },
  { label: 'Digitalisasi', value: 'digitalisasi' },
  { label: 'Lingkungan', value: 'lingkungan' },
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

export default function KknLogIndex({ items = [], carouselItems = [], selectedCategory = null }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || null)
  const [visibleCount, setVisibleCount] = useState(6)
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef(null)
  const carouselRef = useRef(null)

  const normalizeEntry = (item, index) => ({
    ...item,
    excerpt:
      item.excerpt ??
      excerptByTitle[item.title] ??
      'Warta dan catatan kegiatan pembangunan masyarakat, pemberdayaan ekonomi lokal, serta kebudayaan Pulau Enggano.',
    read_time: item.read_time ?? `${3 + (index % 4)} min baca`,
    image:
      item.image ??
      item.cover ??
      imageByCategory[item.category] ??
      fallbackItems[index % fallbackItems.length].image,
  })

  const entries = items.length
    ? items.map((item, index) => normalizeEntry(item, index))
    : fallbackItems

  // Carousel headlines
  const carouselArticles = carouselItems && carouselItems.length
    ? carouselItems.map((item, index) => normalizeEntry(item, index))
    : entries.slice(0, 4)

  // Filtered entries
  const filteredEntries = activeCategory
    ? entries.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase())
    : entries

  const listArticles = filteredEntries.slice(0, visibleCount)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselArticles.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselArticles.length) % carouselArticles.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Autoplay logic
  useEffect(() => {
    if (carouselArticles.length <= 1) return

    const startAutoplay = () => {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 4000)
    }

    const stopAutoplay = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    startAutoplay()

    const carouselElement = carouselRef.current
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', stopAutoplay)
      carouselElement.addEventListener('mouseleave', startAutoplay)
    }

    return () => {
      stopAutoplay()
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoplay)
        carouselElement.removeEventListener('mouseleave', startAutoplay)
      }
    }
  }, [carouselArticles])

  return (
    <>
      <Head title="Berita & Aktivitas - Kaanek Enggano" />

      {/* Hero PageHeader */}
      <PageHeader
        pageKey="kknLog"
        background="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80"
      />

      {/* Main Articles Portal Area */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-8 sm:py-12 md:py-20">

        {/* Featured Top Headline Carousel */}
        {carouselArticles.length > 0 && (
          <div className="mb-8 sm:mb-14">
            <div className="flex items-center justify-between mb-3 sm:mb-6">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-accent-600">
                Berita Utama
              </h2>

              {/* Carousel Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  aria-label="Slide sebelumnya"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Slide berikutnya"
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Carousel Container */}
            <div ref={carouselRef} className="relative overflow-hidden rounded-2xl border border-neutral-100 shadow-xs">
              {/* Carousel Slides */}
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselArticles.map((article) => (
                  <article key={article.slug} className="min-w-full">
                    <Link href={`/activities/${article.slug}`} className="block lg:grid lg:grid-cols-12 bg-white">
                      {/* Image */}
                      <div className="relative lg:col-span-7 aspect-[16/10] sm:min-h-72 lg:min-h-110 overflow-hidden bg-neutral-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-10 lg:col-span-5 bg-white">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-neutral-500">
                            <span className="font-bold uppercase tracking-wider text-primary-900 text-[10px]">
                              {article.category}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Calendar size={12} className="text-primary-700" /> {article.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12} className="text-primary-700" /> {article.read_time}</span>
                          </div>

                          <h3 className="mt-2.5 font-display text-base sm:text-2xl lg:text-3xl font-bold leading-snug text-neutral-900 hover:text-primary-800 transition-colors line-clamp-2 sm:line-clamp-3">
                            {article.title}
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600 line-clamp-2 sm:line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-bold text-accent-600 hover:text-accent-700">
                          <span>Baca Selengkapnya</span>
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Carousel Indicators */}
              <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
                {carouselArticles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-6 sm:w-8 bg-accent-500' : 'w-1.5 sm:w-2 bg-neutral-300/80 hover:bg-neutral-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {filters.map(filter => {
              const isActive = activeCategory === filter.value
              return (
                <button
                  key={filter.value || 'all'}
                  type="button"
                  onClick={() => {
                    setActiveCategory(filter.value)
                    setVisibleCount(6)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary-950 text-white shadow-xs'
                      : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-50'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900">
              Daftar Artikel
            </h3>
            <div className="mt-2.5 h-1 w-8 bg-accent-500 rounded-full" />
          </div>
          <span className="text-xs text-neutral-400 font-medium">
            {filteredEntries.length} artikel
          </span>
        </div>

        {/* Mobile View: Compact News Row / Media List (< md) */}
        <div className="flex flex-col gap-2.5 md:hidden">
          {listArticles.map((item) => (
            <Link
              key={item.slug}
              href={`/activities/${item.slug}`}
              className="flex items-center justify-between p-3 bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-all gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                  <span className="text-primary-900 font-bold uppercase tracking-wider">
                    {item.category || 'Artikel'}
                  </span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <h4 className="mt-1 font-display text-sm font-bold text-neutral-900 leading-snug line-clamp-2">
                  {item.title}
                </h4>
                <p className="mt-1 text-[11px] text-neutral-500 line-clamp-1">
                  {item.excerpt}
                </p>
              </div>

              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop View: 3 Columns Grid (≥ md) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listArticles.map((item, index) => (
            <article
              key={item.slug}
              className="group hover-lift overlay-glow reveal-up flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/80 transition-all duration-300"
              style={{ '--reveal-delay': `${120 + index * 60}ms` }}
            >
              <div>
                <Link href={`/activities/${item.slug}`} className="block relative overflow-hidden aspect-16/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="media-zoom h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
                    <span className="font-bold uppercase tracking-wider text-primary-900 text-[11px]">{item.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {item.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> {item.read_time}</span>
                  </div>

                  <h4 className="mt-3 font-display text-xl font-bold leading-snug text-neutral-900 group-hover:text-primary-800 transition-colors line-clamp-2">
                    <Link href={`/activities/${item.slug}`}>
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
                  href={`/activities/${item.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-600 hover:text-accent-700 transition-colors"
                >
                  <span>Baca Artikel</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-neutral-200/80 p-8">
            <p className="text-neutral-500 text-sm">Tidak ada artikel dalam kategori ini.</p>
          </div>
        )}

        {filteredEntries.length > visibleCount && (
          <div className="mt-8 sm:mt-14 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="hover-lift bg-primary-950 hover:bg-primary-900 px-6 sm:px-8 py-3 sm:py-3.5 text-xs font-bold tracking-widest uppercase text-white rounded-xl shadow-md transition-all"
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </section>
    </>
  )
}
