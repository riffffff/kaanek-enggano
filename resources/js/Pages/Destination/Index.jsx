import { Head, Link } from '@inertiajs/react'
import { useEffect, useMemo, useState } from 'react'

const fallbackDestinations = [
  {
    id: 1,
    slug: 'destinasi-bahari',
    name: 'Destinasi Bahari',
    tag: 'BAHARI',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    slug: 'hutan-endemik',
    name: 'Hutan Endemik',
    tag: 'WILDLIFE',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka serta petualangan alam yang liar dan memukau.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    slug: 'warisan-enam-suku',
    name: 'Warisan Enam Suku',
    tag: 'HISTORY',
    description: 'Lapisan sejarah, adat tradisi, dan artefak kebudayaan asli pulau yang membentuk identitas Enggano.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function DestinationIndex({ destinations = [], selectedType = null }) {
  // Map database destinations
  const items = useMemo(() => {
    if (!destinations || destinations.length === 0) return fallbackDestinations

    return destinations.map((item, idx) => {
      const tagLabel = item.type ? item.type.toUpperCase() : 'DESTINASI'
      const imageSrc = item.image || fallbackDestinations[idx % fallbackDestinations.length].image
      return {
        id: item.id || idx + 1,
        slug: item.slug,
        name: item.name,
        tag: tagLabel,
        description: item.short_description || item.description || 'Jelajahi keindahan alam dan kebudayaan Pulau Enggano.',
        image: imageSrc,
      }
    })
  }, [destinations])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const activeDestination = items[activeIndex] || items[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  // Auto-slide effect
  useEffect(() => {
    if (isHovered) return // Pause if hovering
    const interval = setInterval(() => {
      handleNext()
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval) // Cleanup on unmount or when hovered changes
  }, [items.length, isHovered])

  const qrTargetUrl = 'https://www.google.com/maps/d/viewer?mid=1AO0IZMyY83BGzK2OW7gaCDFDi-Tu7Yo&hl=id'
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrTargetUrl)}`

  return (
    <>
      <Head title="Destinations" />

      {/* Hero Showcase Section with Theme Color Palette & Animations */}
      <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-primary-950 text-white overflow-hidden flex items-center">
        {/* Dynamic Background Images */}
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? 'opacity-100 z-0 scale-105 transition-transform duration-10000' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="reveal-scale w-full h-full object-cover"
            />
            {/* Theme Overlay Gradients */}
            <div className="absolute inset-0 bg-linear-to-r from-primary-950/95 via-primary-950/70 to-primary-950/30" />
            <div className="absolute inset-0 bg-linear-to-t from-primary-950/90 via-transparent to-primary-950/40" />
          </div>
        ))}

        {/* Content & Showcase Slider */}
        <div className="relative z-10 mx-auto max-w-full px-6 py-20 md:px-12 lg:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Header & Active Item Info */}
            <div className="lg:col-span-5 space-y-6">
              <p className="reveal-up text-xs uppercase tracking-[0.3em] font-medium text-accent-400">
                Eksplorasi Enggano
              </p>

              <h1
                className="reveal-up font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-wider leading-tight text-white"
                style={{ '--reveal-delay': '100ms' }}
              >
                {activeDestination.name}
              </h1>

              <p
                className="reveal-up text-base leading-relaxed text-white/80 max-w-md line-clamp-2"
                style={{ '--reveal-delay': '200ms' }}
              >
                {activeDestination.description}
              </p>
            </div>

            {/* Right Interactive Destination Cards Slider */}
            <div
              className="lg:col-span-7 mt-8 lg:mt-0 relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Scroll Indicator - Left */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </div>
              </div>
              {/* Scroll Indicator - Right */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 text-white animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
              </div>
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory">
                {items.map((item, index) => {
                  const isActive = index === activeIndex
                  return (
                    <Link
                      key={item.id || index}
                      id={`destination-card-${item.id}`}
                      href={`/destinations/${item.slug}`}
                      onClick={(e) => {
                        if (!isActive) {
                          e.preventDefault()
                          setActiveIndex(index)
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
                        src={item.image}
                        alt={item.name}
                        className="media-zoom w-full h-full object-cover rounded-xl"
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
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

          {/* Slider Controls & Progress Counter */}
          <div className="reveal-up mt-12 sm:mt-16 flex items-center justify-end border-t border-white/15 pt-6" style={{ '--reveal-delay': '300ms' }}>

            {/* Slider Bar & Active Number */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:block w-32 md:w-48 h-0.5 bg-white/20 relative overflow-hidden rounded-full">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-accent-500 transition-all duration-500 rounded-full"
                  style={{
                    width: `${((activeIndex + 1) / items.length) * 100}%`,
                  }}
                />
              </div>

              <div className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                {String(activeIndex + 1).padStart(2, '0')}<span className="text-white/40 text-xl font-light">/{String(items.length).padStart(2, '0')}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,360px)] lg:items-center">
          <div className="reveal-up max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700 font-semibold">
              Peta Wisata Pulau Enggano
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Scan untuk Buka Peta Wisata
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Pindai QR code ini untuk membuka peta wisata Pulau Enggano. Tampilan dibuat bersih, modern, dan tetap fokus pada informasi utama.
            </p>
          </div>

          <div className="reveal-up mx-auto w-full max-w-sm" style={{ '--reveal-delay': '120ms' }}>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
                <div className="mx-auto flex aspect-square w-full max-w-72 items-center justify-center rounded-2xl bg-white p-5 shadow-sm">
                  <img
                    src={qrImageUrl}
                    alt="QR Code Peta Wisata Pulau Enggano"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                    Peta Wisata Pulau Enggano
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Arahkan kamera ke QR untuk membuka peta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    </>
  )
}
