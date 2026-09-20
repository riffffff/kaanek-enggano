import { useState, useMemo, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Compass,
  Ship,
  Home as HomeIcon,
  ScrollText,
} from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate'
import KknCard from '../../Components/KknCard'
import { historyData } from '../../data/history.js'
import Button from '../../Components/Button'
import VideoDocumentaryCard from '../../Components/VideoDocumentaryCard'

const fallbackDestinations = [
  {
    id: 1,
    slug: 'destinasi-bahari',
    name: 'Destinasi Bahari',
    tag: 'BAHARI',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    slug: 'hutan-endemik',
    name: 'Hutan Endemik',
    tag: 'WILDLIFE',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    cover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    slug: 'warisan-enam-suku',
    name: 'Warisan Enam Suku',
    tag: 'HISTORY',
    description: 'Lapisan sejarah, adat tradisi, dan artefak kebudayaan asli.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
    hero: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
    cover: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function HomeIndex({ latestKkn = [], destinations = [] }) {
  const { tt } = useTranslate('home')
  const [activeDestIndex, setActiveDestIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const items = useMemo(() => {
    const src = destinations && destinations.length ? destinations : fallbackDestinations
    return src.map((item, idx) => {
      const fallback = fallbackDestinations[idx % fallbackDestinations.length]
      const imageSrc = item.hero || item.image || item.cover || fallback.image
      return {
        id: item.id || fallback.id,
        slug: item.slug || fallback.slug,
        name: item.name || fallback.name,
        tag: item.tag || fallback.tag,
        description: item.short_description || item.description || fallback.description,
        image: imageSrc,
        cover: item.cover || imageSrc,
        hero: imageSrc,
      }
    })
  }, [destinations])

  const activeDest = items[activeDestIndex] || items[0]

  const handleNext = () => {
    setActiveDestIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveDestIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  useEffect(() => {
    if (isHovered || items.length === 0) return
    const interval = setInterval(() => {
      setActiveDestIndex((prev) => (prev + 1) % items.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [items.length, isHovered])

  return (
    <>
      <Head>
        <title>Enggano - Pulau Terluar di Samudra Hindia</title>
        <meta
          name="description"
          content="Website resmi digital Pulau Enggano untuk informasi perjalanan, destinasi, desa, dan Aktivitas di Enggano"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[100dvh] sm:min-h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
          alt="Pulau Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/35 to-black/75" />
        
        <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-24 sm:py-32 flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center text-center">
            <p className="reveal-up text-xs sm:text-sm uppercase tracking-[0.35em] text-white/75 font-semibold">
              YAUWAIKA !
            </p>
            <h1 className="reveal-up mt-3 sm:mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.1]" style={{ '--reveal-delay': '120ms' }}>
              {tt('Jelajah Enggano', 'hero.title')}
            </h1>
            <p className="reveal-up mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto" style={{ '--reveal-delay': '200ms' }}>
              Jelajahi keindahan alamnya, jajaki pulau terluar Indonesia yang berada di Samudra Hindia.
            </p>
            <div className="reveal-up mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto" style={{ '--reveal-delay': '220ms' }}>
              <Link
                href="/destinations"
                className="overlay-glow w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-500 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white hover:bg-accent-600 uppercase tracking-wider rounded-xl sm:rounded-none shadow-sm transition-colors duration-200"
              >
                {tt('Jelajahi Destinasi', 'hero.exploreDestinations')}
              </Link>
              <Link
                href="/accommodations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/90 px-7 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold text-white hover:bg-white hover:text-neutral-900 uppercase tracking-wider rounded-xl sm:rounded-none transition-colors duration-200"
              >
                {tt('Info Perjalanan', 'hero.travelInfo')}
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Down Indicator */}
        <div className="flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-white/60 text-[10px] uppercase tracking-widest pointer-events-none">
          <span>Gulir ke Bawah</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>

      {/* Quick Access Navigation */}
      <section className="bg-[#fcfbf9] pt-10 sm:pt-14 pb-4">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[85%] xl:w-[80%]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Destinasi */}
            <Link
              href="/destinations"
              className="group relative flex items-center text-left gap-4 px-4 sm:px-6 py-4 sm:py-6 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary-600 group-hover:w-full transition-all duration-300" />
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors duration-200">
                <Compass size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-semibold text-xs sm:text-base text-neutral-800 group-hover:text-primary-700 transition-colors truncate">
                    {tt('Destinasi', 'nav.destinations')}
                  </p>
                  <ArrowRight size={13} className="text-primary-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </div>
                <p className="hidden sm:block text-xs text-neutral-400 mt-0.5 truncate">Spot alam & bahari</p>
              </div>
            </Link>

            {/* Akses & Rute */}
            <Link
              href="/accommodations#transportation"
              className="group relative flex items-center text-left gap-4 px-4 sm:px-6 py-4 sm:py-6 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-500 group-hover:w-full transition-all duration-300" />
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-accent-50 text-accent-600 flex items-center justify-center shrink-0 group-hover:bg-accent-100 transition-colors duration-200">
                <Ship size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-semibold text-xs sm:text-base text-neutral-800 group-hover:text-accent-700 transition-colors truncate">
                    {tt('Akses & Rute', 'Akses')}
                  </p>
                  <ArrowRight size={13} className="text-accent-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </div>
                <p className="hidden sm:block text-xs text-neutral-400 mt-0.5 truncate">Kapal feri & tiket</p>
              </div>
            </Link>

            {/* Homestay */}
            <Link
              href="/accommodations#homestay"
              className="group relative flex items-center text-left gap-4 px-4 sm:px-6 py-4 sm:py-6 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-600 group-hover:w-full transition-all duration-300" />
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors duration-200">
                <HomeIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-semibold text-xs sm:text-base text-neutral-800 group-hover:text-emerald-700 transition-colors truncate">
                    {tt('Homestay', 'Homestay')}
                  </p>
                  <ArrowRight size={13} className="text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </div>
                <p className="hidden sm:block text-xs text-neutral-400 mt-0.5 truncate">Penginapan warga lokal</p>
              </div>
            </Link>

            {/* Sejarah & Suku */}
            <Link
              href="/about-enggano/history"
              className="group relative flex items-center text-left gap-4 px-4 sm:px-6 py-4 sm:py-6 overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-500 group-hover:w-full transition-all duration-300" />
              <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors duration-200">
                <ScrollText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-semibold text-xs sm:text-base text-neutral-800 group-hover:text-amber-700 transition-colors truncate">
                    {tt('Sejarah & Suku', 'Sejarah')}
                  </p>
                  <ArrowRight size={13} className="text-amber-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                </div>
                <p className="hidden sm:block text-xs text-neutral-400 mt-0.5 truncate">Adat, tradisi & warisan</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sejarah & Film Dokumenter Enggano Section */}
      <section className="bg-[#fcfbf9] pt-8 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 border-b border-neutral-200/50">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

            {/* Narasi Sejarah (6 kolom) */}
            <article className="reveal-up lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                {historyData.title}
              </h2>
              <div className="h-1 w-10 bg-accent-500 rounded-full mx-auto lg:mx-0" />

              <div className="space-y-3.5 text-sm sm:text-base leading-relaxed text-neutral-600 md:text-lg font-body">
                {historyData.content.split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="line-clamp-3 sm:line-clamp-none">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-2 sm:pt-3 flex justify-center lg:justify-start w-full">
                <Button
                  href="/about-enggano/history"
                  showArrow
                  className="reveal-up"
                >
                  {tt('Baca Selengkapnya', 'history.readMore')}
                </Button>
              </div>
            </article>

            {/* Video Dokumenter (6 kolom) */}
            <div className="reveal-up lg:col-span-6 w-full order-1 lg:order-2" style={{ '--reveal-delay': '140ms' }}>
              <VideoDocumentaryCard
                videoId="nTHJ1kEVIpw"
                title="Video Dokumenter"
                subtitle="Suara Enggano: Dokumentasi audio-visual peradaban, budaya, dan pesona pulau terluar."
              />
            </div>

          </div>
        </div>
      </section>

      {/* Destinations Showcase Slider */}
      {items.length > 0 && (
        <section
          className="relative min-h-[85vh] lg:min-h-screen w-full bg-primary-950 text-white overflow-hidden flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Dynamic Background Images */}
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeDestIndex ? 'opacity-100 z-0 scale-105 transition-transform duration-10000' : 'opacity-0 -z-10'
              }`}
            >
              <img
                src={item.hero || item.image}
                alt={item.name}
                className="reveal-scale w-full h-full object-cover"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb) {
                    e.currentTarget.dataset.fb = '1'
                    e.currentTarget.src = item.cover || fallbackDestinations[index % fallbackDestinations.length].hero
                  }
                }}
              />
              <div className="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/70 to-primary-950/30" />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/90 via-transparent to-primary-950/40" />
            </div>
          ))}

          {/* Content & Showcase Slider */}
          <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-12 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

              {/* Left — Header & Active Item Info */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
                <h2
                  className="reveal-up font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase tracking-wider leading-tight text-white"
                  style={{ '--reveal-delay': '100ms' }}
                >
                  {activeDest.name}
                </h2>
                <div className="reveal-up h-1 w-10 bg-accent-500 rounded-full mx-auto lg:mx-0" style={{ '--reveal-delay': '150ms' }} />

                <p
                  className="reveal-up text-xs sm:text-base leading-relaxed text-white/80 max-w-md line-clamp-2 mx-auto lg:mx-0"
                  style={{ '--reveal-delay': '200ms' }}
                >
                  {activeDest.description}
                </p>

                <div className="reveal-up flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-1" style={{ '--reveal-delay': '250ms' }}>
                  <Link
                    href={`/destinations/${activeDest.slug}`}
                    className="group inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white rounded-xl sm:rounded-none shadow-md transition-all duration-300"
                  >
                    <span>Jelajahi</span>
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/destinations"
                    className="group inline-flex items-center gap-2 border border-white/70 hover:border-white hover:bg-white hover:text-neutral-900 text-white px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xl sm:rounded-none transition-all duration-300"
                  >
                    <span>Semua Destinasi</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right — Card Slider */}
              <div className="lg:col-span-7 mt-4 sm:mt-8 lg:mt-0 relative">
                {/* Desktop Prev/Next Buttons (Hidden on mobile to keep swipe clean) */}
                <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-30">
                  <button
                    onClick={handlePrev}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 hover:scale-110 transition-all"
                    aria-label="Prev"
                  >
                    <ChevronLeft size={22} strokeWidth={2.25} />
                  </button>
                </div>
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-30">
                  <button
                    onClick={handleNext}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 hover:scale-110 transition-all"
                    aria-label="Next"
                  >
                    <ChevronRight size={22} strokeWidth={2.25} />
                  </button>
                </div>

                <div className="flex gap-3.5 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory px-1 sm:px-10">
                  {items.map((item, index) => {
                    const isActive = index === activeDestIndex
                    return (
                      <Link
                        key={item.id || index}
                        href={`/destinations/${item.slug}`}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault()
                            setActiveDestIndex(index)
                          }
                        }}
                        className={`group hover-lift overlay-glow reveal-up relative shrink-0 cursor-pointer snap-start transition-all duration-500 ease-out rounded-2xl overflow-hidden shadow-xl ${
                          isActive
                            ? 'w-44 sm:w-64 md:w-72 aspect-[3/4] sm:aspect-9/16 ring-2 ring-accent-500 scale-[1.02] sm:scale-105 z-20'
                            : 'w-40 sm:w-56 md:w-64 aspect-[3/4] sm:aspect-9/16 opacity-75 hover:opacity-100 hover:scale-102 z-10'
                        }`}
                        style={{ '--reveal-delay': `${140 + index * 60}ms` }}
                      >
                        <img
                          src={item.cover || item.image}
                          alt={item.name}
                          className="media-zoom w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fb) {
                              e.currentTarget.dataset.fb = '1'
                              e.currentTarget.src = fallbackDestinations[index % fallbackDestinations.length].cover
                            }
                          }}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-primary-950/95 via-primary-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                        {/* Card Info */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7 space-y-1">
                          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-accent-400 block">
                            {item.tag}
                          </span>
                          <h3 className="font-display font-semibold text-lg sm:text-2xl text-white leading-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-white/70 font-normal line-clamp-2 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="reveal-up mt-8 sm:mt-16 flex items-center justify-between sm:justify-end border-t border-white/15 pt-4 sm:pt-6" style={{ '--reveal-delay': '300ms' }}>
              {/* Mobile Arrows */}
              <div className="flex sm:hidden items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-white"
                  aria-label="Prev"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white/15 backdrop-blur-sm rounded-lg p-2 text-white"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="flex items-center gap-4 sm:gap-6">
                <div className="hidden sm:block w-32 md:w-48 h-0.5 bg-white/20 relative overflow-hidden rounded-full">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-accent-500 transition-all duration-500 rounded-full"
                    style={{ width: `${((activeDestIndex + 1) / items.length) * 100}%` }}
                  />
                </div>
                <div className="font-display text-xl sm:text-3xl font-semibold tracking-tight text-white">
                  {String(activeDestIndex + 1).padStart(2, '0')}<span className="text-white/40 text-base sm:text-xl font-light">/{String(items.length).padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          </div>

          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
        </section>
      )}

      {/* Jurnal Ekspedisi (Aktivitas & Berita) */}
      <section className="bg-white">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-12 sm:py-16 md:py-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-0">
            <div className="reveal-up text-center sm:text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                {tt('Catatan lapangan dari ujung samudera.', 'kkn.title')}
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full mx-auto sm:mx-0" />
            </div>
            <Link href="/activities" className="reveal-up self-center sm:self-auto shrink-0 text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-700 hover:text-primary-600 pb-1" style={{ '--reveal-delay': '120ms' }}>
              {tt('Lihat Semua', 'kkn.viewAll')} &rarr;
            </Link>
          </div>

          {/* Mobile View: Compact Media List (< md) */}
          <div className="mt-6 flex flex-col gap-2.5 md:hidden">
            {latestKkn.slice(0, 3).map((item) => (
              <Link
                key={item.slug}
                href={`/activities/${item.slug}`}
                className="flex items-center justify-between p-3 bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05)] active:scale-[0.99] transition-all gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium">
                    <span className="text-primary-900 font-bold uppercase tracking-wider">
                      {item.category || 'Aktivitas'}
                    </span>
                    {item.date && (
                      <>
                        <span>•</span>
                        <span>{item.date}</span>
                      </>
                    )}
                  </div>
                  <h4 className="mt-1 font-display text-sm font-bold text-neutral-900 leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                {item.image && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop View: 3 Column Cards (≥ md) */}
          <div className="mt-10 hidden md:grid md:grid-cols-3 gap-6">
            {latestKkn.map(item => (
              <KknCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
