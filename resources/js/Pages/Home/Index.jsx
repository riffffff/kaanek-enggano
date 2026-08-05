import { useState, useMemo, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ChevronRight, ChevronLeft, Landmark, ArrowRight } from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate'
import KknCard from '../../Components/KknCard'
import { historyData } from '../../data/history.js'
import Button from '../../Components/Button'

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
        <title>Enggano</title>
        <meta
          name="description"
          content="Website resmi digital Pulau Enggano untuk informasi perjalanan, destinasi, desa, dan Aktivitas di Enggano"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-screen flex items-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
          alt="Pulau Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-32 md:px-12 lg:px-16 w-full">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              YAUWAIKA !
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {tt('JELAJAH ENGGANO', 'hero.title')}
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              {tt('JELAJAHI KEINDAHAN ALAMNYA, JAJAKI PULAU TERLUAR INDONESIA YANG BERADA DI SAMUDRA HINDIA', 'hero.subtitle')}
            </p>
            <div className="reveal-up mt-10 flex flex-wrap gap-4" style={{ '--reveal-delay': '220ms' }}>
              <Link
                href="/destinations"
                className="hover-lift overlay-glow inline-flex items-center gap-2 bg-accent-500 px-8 py-4 text-sm font-semibold text-white hover:bg-accent-600 uppercase tracking-wider"
              >
                {tt('Jelajahi Destinasi', 'hero.exploreDestinations')}
              </Link>
              <Link
                href="/accommodations"
                className="hover-lift inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-sm font-semibold text-white hover:bg-white hover:text-black uppercase tracking-wider"
              >
                {tt('Info Perjalanan', 'hero.travelInfo')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sejarah Enggano Section */}
      <section className="bg-[#fcfbf9] py-20 md:py-28 border-y border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <article className="reveal-up">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-primary-700 font-medium">
              {tt('Warisan Leluhur', 'history.label')}
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-neutral-900 md:text-5xl tracking-tight">
              {historyData.title}
            </h2>
            <div className="mx-auto mt-6 h-0.5 w-12 bg-primary-600/40" />

            <div className="mt-10 space-y-6 text-base leading-8 text-neutral-600 md:text-lg md:leading-9 font-body text-center">
              {historyData.content.split('\n\n').slice(0, 2).map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                href="/villages/history"
                showArrow
                className="reveal-up"
              >
                {tt('Baca Selengkapnya', 'history.readMore')}
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* Destinations Showcase — SAMA DENGAN HALAMAN /destinations */}
      {items.length > 0 && (
        <section
          className="relative min-h-[90vh] lg:min-h-screen w-full bg-primary-950 text-white overflow-hidden flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Dynamic Background Images — Full background slider */}
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
              {/* Gradient Overlay — SAMA PERSIS dengan /destinations */}
              <div className="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/70 to-primary-950/30" />
              <div className="absolute inset-0 bg-linear-to-t from-primary-950/90 via-transparent to-primary-950/40" />
            </div>
          ))}

          {/* Content & Showcase Slider — 12-Column Grid SAMA PERSIS */}
          <div className="relative z-10 mx-auto max-w-full px-6 py-20 md:px-12 lg:px-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left — Header & Active Item Info */}
              <div className="lg:col-span-5 space-y-8">
                <p className="reveal-up text-xs uppercase tracking-[0.3em] font-medium text-accent-400">
                  {tt('Eksplorasi Enggano', 'explore.label')}
                </p>

                <h1
                  className="reveal-up font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-wider leading-tight text-white"
                  style={{ '--reveal-delay': '100ms' }}
                >
                  {activeDest.name}
                </h1>

                <p
                  className="reveal-up text-base leading-relaxed text-white/80 max-w-md line-clamp-2"
                  style={{ '--reveal-delay': '200ms' }}
                >
                  {activeDest.description}
                </p>

                <div className="reveal-up flex flex-wrap gap-4" style={{ '--reveal-delay': '250ms' }}>
                  <Link
                    href={`/destinations/${activeDest.slug}`}
                    className="group inline-flex items-center gap-2.5 bg-accent-500 hover:bg-accent-600 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-accent-500/15 hover:shadow-accent-500/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Jelajahi
                    <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/destinations"
                    className="group inline-flex items-center gap-2.5 border-2 border-white/80 hover:border-white hover:bg-white hover:text-neutral-900 text-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                  >
                    Lihat Selengkapnya
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right — Card Slider */}
              <div className="lg:col-span-7 mt-8 lg:mt-0 relative">
                {/* Arrow Kiri */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
                  <button
                    onClick={handlePrev}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 hover:scale-110 transition-all"
                    aria-label="Prev"
                  >
                    <ChevronLeft size={24} strokeWidth={2.25} />
                  </button>
                </div>
                {/* Arrow Kanan */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30">
                  <button
                    onClick={handleNext}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 hover:scale-110 transition-all"
                    aria-label="Next"
                  >
                    <ChevronRight size={24} strokeWidth={2.25} />
                  </button>
                </div>

                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory px-8 sm:px-10">
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
                        className={`group hover-lift overlay-glow reveal-up relative shrink-0 cursor-pointer snap-start transition-all duration-500 ease-out rounded-xl overflow-hidden shadow-xl ${
                          isActive
                            ? 'w-56 sm:w-64 md:w-72 aspect-9/16 ring-2 ring-accent-500 scale-105 z-20'
                            : 'w-48 sm:w-56 md:w-64 aspect-9/16 opacity-75 hover:opacity-100 hover:scale-102 z-10'
                        }`}
                        style={{ '--reveal-delay': `${140 + index * 60}ms` }}
                      >
                        <img
                          src={item.cover || item.image}
                          alt={item.name}
                          className="media-zoom w-full h-full object-cover rounded-xl"
                          loading="lazy"
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fb) {
                              e.currentTarget.dataset.fb = '1'
                              e.currentTarget.src = fallbackDestinations[index % fallbackDestinations.length].cover
                            }
                          }}
                        />

                        {/* Gradient Overlay SAMA dengan /destinations */}
                        <div className="absolute inset-0 bg-linear-to-t from-primary-950/95 via-primary-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                        {/* Card Info */}
                        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 space-y-2">
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-400 block">
                            {item.tag}
                          </span>
                          <h3 className="font-display font-semibold text-2xl sm:text-3xl text-white leading-tight line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-sm sm:text-base text-white/70 font-normal line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* Bottom Controls — Counter & Progress Bar SAMA dengan /destinations */}
            <div className="reveal-up mt-12 sm:mt-16 flex items-center justify-end border-t border-white/15 pt-6" style={{ '--reveal-delay': '300ms' }}>
              <div className="flex items-center gap-6">
                <div className="hidden sm:block w-32 md:w-48 h-0.5 bg-white/20 relative overflow-hidden rounded-full">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-accent-500 transition-all duration-500 rounded-full"
                    style={{ width: `${((activeDestIndex + 1) / items.length) * 100}%` }}
                  />
                </div>
                <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                  {String(activeDestIndex + 1).padStart(2, '0')}<span className="text-white/40 text-xl font-light">/{String(items.length).padStart(2, '0')}</span>
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="reveal-up">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">{tt('Jurnal Ekspedisi', 'kkn.label')}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">
                {tt('Catatan lapangan dari ujung samudera.', 'kkn.title')}
              </h2>
            </div>
            <Link href="/kkn-log" className="reveal-up text-sm font-semibold text-primary-700 hover:text-primary-600" style={{ '--reveal-delay': '120ms' }}>
              {tt('Lihat Semua', 'kkn.viewAll')}
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latestKkn.map(item => (
              <KknCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
