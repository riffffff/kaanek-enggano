import { Head, Link } from '@inertiajs/react'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { lazy, Suspense, useRef } from 'react'
import { tribesData } from '../../data/tribes.js'
import { historyData } from '../../data/history.js'
import { villagesList, villageImageFallback } from '../../data/villages.js'
import Button from '../../Components/Button'

const LeafletMap = lazy(() => import('../../Components/LeafletMap'))

export default function VillageIndex() {
  const villageSliderRef = useRef(null)
  const tribeSliderRef = useRef(null)

  const scrollVillagePrev = () => {
    if (!villageSliderRef.current) return
    villageSliderRef.current.scrollBy({ left: -Math.max(360, villageSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollVillageNext = () => {
    if (!villageSliderRef.current) return
    villageSliderRef.current.scrollBy({ left: Math.max(360, villageSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollTribePrev = () => {
    if (!tribeSliderRef.current) return
    tribeSliderRef.current.scrollBy({ left: -Math.max(360, tribeSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollTribeNext = () => {
    if (!tribeSliderRef.current) return
    tribeSliderRef.current.scrollBy({ left: Math.max(360, tribeSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }

  const entries = villagesList.map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    image: v.heroImage || villageImageFallback,
    summary: v.summary && v.summary.trim() !== '' ? v.summary : null,
    lat: v.lat,
    lng: v.lng,
    potential: v.potential || [],
  }))

  return (
    <>
      <Head title="Villages" />

      <section className="relative overflow-hidden text-white">
        <img
          src={entries[0]?.image || villageImageFallback}
          alt="Desa Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Desa & Budaya
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              Mengenal {entries.length} Desa di Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Jelajahi keragaman budaya dan pesona alam dari {entries.length} permukiman yang menjadi denyut nadi kehidupan di garis terdepan Samudera Hindia.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16 pb-2">
        <div className="reveal-up max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-700">PETA WILAYAH</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Enggano
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-500">
            Peta interaktif berbasis OpenStreetMap dengan fokus wilayah Pulau Enggano.
          </p>
        </div>

        <div className="hover-lift reveal-up mt-10 overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '140ms' }}>
          <Suspense
            fallback={
              <div className="flex h-87.5 items-center justify-center bg-neutral-50 text-sm text-neutral-400">
                <div className="text-center">
                  <MapPin size={32} className="mx-auto mb-3 animate-pulse text-primary-400" />
                  <p>Memuat peta Enggano…</p>
                </div>
              </div>
            }
          >
            <LeafletMap mapMarkers={[]} height={480} useMarkerBounds={false} />
          </Suspense>
        </div>
      </section>

      {/* Sejarah Enggano Section */}
      <section className="bg-[#fcfbf9] py-20 md:py-28 border-y border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <article className="reveal-up">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-primary-700 font-medium">
              WARISAN LELUHUR
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
                Baca Selengkapnya
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section id="bagian-desa" className="w-full bg-surface-50 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            src={entries[0]?.image || villageImageFallback}
            alt="Enggano Desa"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-50 via-surface-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center">
            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">DESA ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                {entries.length} Desa Pulau Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Jelajahi {entries.length} desa yang menjadi pilar kehidupan di Pulau Enggano, masing-masing dengan keunikan budaya dan pesona alamnya.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{entries.length}</span>
              </div>
            </div>

            <div className="relative w-full">
              <div className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollVillagePrev}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Prev Desa"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
              </div>
              <div className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollVillageNext}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Next Desa"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              </div>

              <div ref={villageSliderRef} className="w-full overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-10 py-3">
                <div className="flex gap-6 min-w-max pb-1">
                  {entries.map((village, index) => (
                    <Link
                      key={village.slug || index}
                      href={`/villages/${village.slug}`}
                      className="group hover-lift overlay-glow reveal-up relative overflow-hidden bg-white shadow-md shrink-0 w-72 sm:w-80 md:w-96 rounded-lg"
                      style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                    >
                      <img
                        src={village.image}
                        alt={village.name}
                        className="media-zoom h-full w-full object-cover aspect-4/5 rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95 rounded-lg" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          DESA
                        </p>
                        <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">{village.name}</h3>
                        {village.summary && <p className="mt-3 text-sm text-white/80 line-clamp-3">{village.summary}</p>}
                      </div>
                    </Link>
                  ))}
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

      <section className="w-full bg-accent-50 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            src={tribesData[0]?.image || villageImageFallback}
            alt="Enggano Suku"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-linear-to-l from-accent-50 via-accent-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 items-center">
            <div className="relative w-full">
              <div className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollTribePrev}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Prev Suku"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
              </div>
              <div className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollTribeNext}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Next Suku"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              </div>

              <div ref={tribeSliderRef} className="w-full overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-10 py-3">
                <div className="flex gap-6 min-w-max pb-1">
                  {tribesData.map((tribe, index) => (
                    <Link
                      key={tribe.id || index}
                      href={`/tribes/${tribe.id}`}
                      className="group hover-lift overlay-glow reveal-up relative overflow-hidden bg-white shadow-md shrink-0 w-72 sm:w-80 md:w-96 rounded-lg"
                      style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                    >
                      <img
                        src={tribe.image}
                        alt={tribe.name}
                        className="media-zoom h-full w-full object-cover aspect-4/5 rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95 rounded-lg" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          SUKU
                        </p>
                        <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">{tribe.name}</h3>
                        <p className="mt-3 text-sm text-white/80 line-clamp-3">{tribe.summary}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-accent-700">SUKU ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                Warisan Suku-Suku Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Kenali {tribesData.length} suku asli dan pendatang yang membangun peradaban serta mewariskan kearifan lokal di Pulau Enggano.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{tribesData.length}</span>
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
