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
    }))

  return (
    <>
      <Head title="Villages" />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="absolute inset-0 bg-linear-to-br from-primary-950 via-primary-900 to-highlight-950" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-5xl font-semibold md:text-7xl">
              Mengenal 6 Desa di Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '120ms' }}>
              Jelajahi keragaman budaya dan pesona alam dari enam permukiman yang menjadi
              denyut nadi kehidupan di garis terdepan Samudera Hindia.
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
            <LeafletMap mapMarkers={villageMarkers} height={480} />
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
              <p>{historyData.content.split('\n\n')[0]}</p>
              <p>{historyData.content.split('\n\n')[1]}</p>
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
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 items-start">
          <div className="reveal-up">
            <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary-700">DESA ENGGANO</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-neutral-900 lg:text-5xl">
              Enam Desa Pulau Enggano
            </h2>
            <p className="mt-4 text-sm md:text-base leading-7 text-neutral-500">
              Jelajahi enam desa yang menjadi pilar kehidupan di Pulau Enggano, masing-masing dengan keunikan budaya dan pesona alamnya.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((village, index) => (
              <Link
                key={village.slug}
                href={`/villages/${village.slug}`}
                className="group hover-lift overlay-glow reveal-up relative overflow-hidden"
                style={{ '--reveal-delay': `${120 + index * 40}ms` }}
              >
                <img
                  src={village.image}
                  alt={village.name}
                  className="media-zoom aspect-4/3 w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                    {village.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Suku-suku */}
      <section className="bg-surface-50 border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8 items-start">
            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tribesData.map((tribe, index) => (
                <Link
                  key={tribe.id}
                  href={`/tribes/${tribe.id}`}
                  className="group hover-lift overlay-glow reveal-up relative overflow-hidden"
                  style={{ '--reveal-delay': `${120 + index * 40}ms` }}
                >
                  <img
                    src={tribe.image}
                    alt={tribe.name}
                    className="media-zoom aspect-4/3 w-full h-auto object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                      {tribe.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

            <div className="reveal-up">
              <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary-700">SUKU ENGGANO</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-neutral-900 lg:text-5xl">
                Warisan Suku-Suku Enggano
              </h2>
              <p className="mt-4 text-sm md:text-base leading-7 text-neutral-500">
                Kenali enam suku asli dan pendatang yang membangun peradaban serta mewariskan kearifan lokal di Pulau Enggano.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
