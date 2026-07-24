import { Head, Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useMemo } from 'react'

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

  const activeDestination = items[activeIndex] || items[0]

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

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
              index === activeIndex ? 'opacity-100 z-0 scale-105 transition-transform duration-[10000ms]' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={item.image}
              alt={item.name}
              className="reveal-scale w-full h-full object-cover"
            />
            {/* Theme Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-950/70 to-primary-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-transparent to-primary-950/40" />
          </div>
        ))}

        {/* Content & Showcase Slider */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-16 w-full">
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
            <div className="lg:col-span-7 mt-8 lg:mt-0">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide snap-x snap-mandatory">
                {items.map((item, index) => {
                  const isActive = index === activeIndex
                  return (
                    <Link
                      key={item.id || index}
                      href={`/destinations/${item.slug}`}
                      onClick={(e) => {
                        if (!isActive) {
                          e.preventDefault()
                          setActiveIndex(index)
                        }
                      }}
                      className={`group hover-lift overlay-glow reveal-up relative flex-shrink-0 cursor-pointer snap-start transition-all duration-500 ease-out rounded-xl overflow-hidden shadow-xl ${
                        isActive
                          ? 'w-48 sm:w-56 md:w-64 h-80 sm:h-96 ring-2 ring-accent-500 scale-105 z-20'
                          : 'w-40 sm:w-48 h-72 sm:h-84 opacity-75 hover:opacity-100 hover:scale-102 z-10'
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
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/95 via-primary-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

                      {/* Card Info */}
                      <div className="absolute inset-x-0 bottom-0 p-6 space-y-1">
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-accent-400 block">
                          {item.tag}
                        </span>
                        <h3 className="font-display font-semibold text-xl sm:text-2xl text-white leading-tight line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-white/70 font-normal line-clamp-2 mt-1">
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
          <div className="reveal-up mt-12 sm:mt-16 flex items-center justify-between border-t border-white/15 pt-6" style={{ '--reveal-delay': '300ms' }}>
            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="hover-lift w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary-950 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="hover-lift w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary-950 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

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
