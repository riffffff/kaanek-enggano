import { useState, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ChevronRight, Landmark, ArrowRight } from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate'
import KknCard from '../../Components/KknCard'
import { historyData } from '../../data/history.js'
import Button from '../../Components/Button'

export default function HomeIndex({ latestKkn = [], destinations = [] }) {
  const { tt } = useTranslate('home')
  const [activeDestIndex, setActiveDestIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const destItems = destinations.length > 0 ? destinations : []
  const activeDest = destItems[activeDestIndex] || destItems[0]

  useEffect(() => {
    if (isHovered || destItems.length === 0) return
    const interval = setInterval(() => {
      setActiveDestIndex((prev) => (prev + 1) % destItems.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [destItems.length, isHovered])

  return (
    <>
      <Head>
        <title>Enggano</title>
        <meta
          name="description"
          content="Website resmi digital Pulau Enggano untuk informasi perjalanan, destinasi, desa, dan dokumentasi KKN."
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

      {/* Destinations Showcase — Editorial Split */}
      {destItems.length > 0 && (
        <section
          className="relative w-full bg-[#0d0d0c] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[88vh]">

            {/* LEFT — Content Panel */}
            <div className="relative z-10 flex flex-col justify-between px-8 py-16 md:px-14 md:py-20 lg:px-16 lg:py-24">
              {/* Top label */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-medium mb-10">
                  {tt('Eksplorasi Enggano', 'explore.label')}
                </p>

                {/* Active destination info */}
                {activeDest && (
                  <div key={activeDestIndex} className="reveal-up space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-px w-8 bg-accent-400" />
                      <span className="text-xs uppercase tracking-[0.3em] text-accent-400 font-semibold">
                        {activeDest.tag || 'Destinasi'}
                      </span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white leading-[1.05] tracking-tight">
                      {activeDest.name}
                    </h2>
                    <p className="text-sm md:text-base leading-7 text-white/75 max-w-sm">
                      {activeDest.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom — CTA + Nav */}
              <div className="mt-16 space-y-8">
                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={activeDest ? `/destinations/${activeDest.slug}` : '/destinations'}
                    className="group inline-flex items-center gap-2.5 border border-white/80 hover:border-white hover:bg-white hover:text-neutral-900 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-200"
                  >
                    Jelajahi Destinasi
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/destinations"
                    className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60"
                  >
                    Lihat Semua
                  </Link>
                </div>

                {/* Dot Nav + Counter */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2.5">
                    {destItems.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveDestIndex(idx)}
                        className={`transition-all duration-300 rounded-full ${
                          idx === activeDestIndex
                            ? 'w-7 h-2 bg-white'
                            : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                        }`}
                        aria-label={`Destinasi ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/40 font-mono tabular-nums">
                    {String(activeDestIndex + 1).padStart(2, '0')} / {String(destItems.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Full Photo Panel */}
            <div className="relative overflow-hidden min-h-[60vh] lg:min-h-full">
              {destItems.map((dest, index) => (
                <Link
                  key={dest.slug || index}
                  href={`/destinations/${dest.slug}`}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === activeDestIndex ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                  }`}
                  tabIndex={index === activeDestIndex ? 0 : -1}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-[8000ms] ease-linear scale-100 hover:scale-105"
                  />
                  {/* Subtle left vignette to blend with content */}
                  <div className="absolute inset-0 bg-linear-to-r from-[#0d0d0c]/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0c]/40 via-transparent to-transparent" />
                </Link>
              ))}

              {/* Thumbnail strip — bottom of photo */}
              <div className="absolute bottom-6 right-6 z-10 flex gap-2">
                {destItems.map((dest, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveDestIndex(idx)}
                    className={`overflow-hidden rounded transition-all duration-300 ${
                      idx === activeDestIndex
                        ? 'w-16 h-10 ring-1 ring-white/50 opacity-100'
                        : 'w-10 h-10 opacity-40 hover:opacity-70'
                    }`}
                    aria-label={dest.name}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
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
