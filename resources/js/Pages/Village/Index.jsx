import { Head, Link } from '@inertiajs/react'
import { MapPin, ArrowRight } from 'lucide-react'
import { lazy, Suspense } from 'react'
import { tribesData } from './Tribe'
import { historyData } from './History'
import Button from '../../Components/Button'

// Lazy-load LeafletMap agar tidak break SSR/Inertia
const LeafletMap = lazy(() => import('../../Components/LeafletMap'))

const fallbackVillages = [
  {
    id: 'kahyapu',
    name: 'Kahyapu',
    slug: 'kahyapu',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kaana',
    name: 'Kaana',
    slug: 'kaana',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'malakoni',
    name: 'Malakoni',
    slug: 'malakoni',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'apoho',
    name: 'Apoho',
    slug: 'apoho',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'meok',
    name: 'Meok',
    slug: 'meok',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'enggano',
    name: 'Enggano',
    slug: 'enggano',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]


export default function VillageIndex({ villages = [] }) {
  const entries = villages.length
    ? villages.map((village, index) => ({
        ...village,
        image: village.image ?? fallbackVillages[index % fallbackVillages.length].image,
        summary:
          village.summary ??
          fallbackVillages.find(item => item.name === village.name)?.summary ??
          'Potret kehidupan lokal yang membentuk identitas Enggano.',
      }))
    : fallbackVillages

  const villageMarkers = entries
    .filter(village => village.lat != null && village.lng != null)
    .map(village => ({
      name: village.name,
      lat: village.lat,
      lng: village.lng,
      slug: village.slug,
    }))

  return (
    <>
      <Head title="Villages" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={entries[0]?.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'}
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
              Mengenal 6 Desa di Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Jelajahi keragaman budaya dan pesona alam dari enam permukiman yang menjadi denyut nadi kehidupan di garis terdepan Samudera Hindia.
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
            <LeafletMap mapMarkers={villageMarkers} height={480} useMarkerBounds={true} />
          </Suspense>
        </div>
      </section>

      {/* Bagian Sejarah */}
      <section className="border-b border-neutral-200 justify-center text-center flex flex-col">
        <div className="mx-auto max-w-7xl px-6 pt-4 pb-16 md:px-12 lg:px-16">
          <div className="reveal-up max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-primary-700">WARISAN LELUHUR</p>
            <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
              {historyData.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
              {historyData.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/villages/history" showArrow>
                Baca Selengkapnya
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian Desa */}
      <section id="bagian-desa" className="w-full bg-surface-50 py-16 md:py-24 overflow-hidden relative">
        {/* Background image with overlay (lembut) */}
        <div className="absolute inset-0">
          <img
            src={entries[0]?.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80'}
            alt="Enggano Desa"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-50 via-surface-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center">
            {/* Left side: text */}
            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">DESA ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                Enam Desa Pulau Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Jelajahi enam desa yang menjadi pilar kehidupan di Pulau Enggano, masing-masing dengan keunikan budaya dan pesona alamnya.
              </p>
              <div className="mt-8">
                <a
                  href="#bagian-desa"
                  className="inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
                >
                  Jelajahi Desa
                  <ArrowRight size={18} />
                </a>
              </div>

              {/* Pagination (simple) */}
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{entries.length || '06'}</span>
              </div>
            </div>

            {/* Right side: carousel cards */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max pb-4">
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
                      <p className="mt-3 text-sm text-white/80 line-clamp-3">{village.summary}</p>
                    </div>
                  </Link>
                ))}
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

      {/* Bagian Suku-suku */}
      <section className="w-full bg-accent-50 py-16 md:py-24 overflow-hidden relative">
        {/* Background image with overlay (lembut) */}
        <div className="absolute inset-0">
          <img
            src={tribesData[0]?.image || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=80'}
            alt="Enggano Suku"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-linear-to-l from-accent-50 via-accent-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 items-center">
            {/* Left side: carousel cards */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max pb-4">
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

            {/* Right side: text */}
            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-accent-700">SUKU ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                Warisan Suku-Suku Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Kenali enam suku asli dan pendatang yang membangun peradaban serta mewariskan kearifan lokal di Pulau Enggano.
              </p>
              <div className="mt-8">
                <Link
                  href="/tribes"
                  className="inline-flex items-center gap-2 border border-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
                >
                  Lihat Semua Suku
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Pagination (simple) */}
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{tribesData.length || '06'}</span>
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
