import { Head } from '@inertiajs/react'
import { Mountain, Navigation, Timer, Play } from 'lucide-react'
import LeafletMap from '../../Components/LeafletMap'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'

// Helper to check if file is video
const isVideo = (url) => {
  if (!url) return false
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
  return videoExtensions.some(ext => url.toLowerCase().includes(ext))
}

export default function DestinationShow({ destination, prev = null, next = null }) {
  const hasCoordinates = Number.isFinite(Number(destination.lat)) && Number.isFinite(Number(destination.lng))
  const coordinateLabel = hasCoordinates
    ? `${Number(destination.lat).toFixed(6)}, ${Number(destination.lng).toFixed(6)}`
    : '-'

  const descriptionParagraphs = destination.description
    ? destination.description
        .split(/\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : []

  const editorialParagraphs = descriptionParagraphs.length
    ? descriptionParagraphs
    : [
        `${destination.name} menghadirkan lanskap terpencil dengan nuansa editorial yang kuat, jauh dari hiruk pikuk destinasi arus utama.`,
        `Perjalanan menuju ${destination.name} menjadi bagian dari pengalaman, melewati rute-rute alami Enggano yang masih terasa liar dan tenang.`,
        `Karakter tempat ini terletak pada perpaduan panorama, ritme komunitas lokal, dan sensasi ekspedisi yang membuat kunjungan terasa intim.`,
      ]

  const galleryItems = destination.gallery?.length
    ? destination.gallery.filter(Boolean)
    : [
        {
          id: 'fallback-1',
          type: 'image',
          url: destination.image ||
            'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: 'fallback-2',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: 'fallback-3',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
        },
      ]

  return (
    <>
      <Head title={destination.name} />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={
            destination.background_image ||
            destination.image ||
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'
          }
          alt={destination.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Destinasi
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Button
          href="/destinations"
          variant="ghostLight"
          showArrow
          arrowPosition="left"
          className="reveal-up"
        >
          Kembali ke Destinations
        </Button>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px]">
          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
            <h2 className="font-display text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              Tentang {destination.name}
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600 md:text-lg">
              {editorialParagraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="hover-lift reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '220ms' }}>
            <h3 className="font-display text-2xl font-semibold text-neutral-900">
              Expedition Details
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Mountain size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Difficulty</p>
                  <p className="font-semibold text-neutral-900">
                    {destination.difficulty_level || 'Mudah'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Timer size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Travel Time</p>
                  <p className="font-semibold text-neutral-900">{destination.travel_time || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Access</p>
                  <p className="font-semibold text-neutral-900">{destination.access_note || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Koordinat</p>
                  <p className="font-semibold text-neutral-900">{coordinateLabel}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <h2 className="reveal-up font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
          Visual Journey
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div key={item.id || `${item.url}-${index}`} className="group hover-lift reveal-up overflow-hidden bg-white shadow-sm" style={{ '--reveal-delay': `${120 + index * 90}ms` }}>
              {item.type === 'video' ? (
                <div className="relative aspect-4/5">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover media-zoom"
                    controls
                    playsInline
                    preload="metadata"
                    poster={item.url_thumb}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none">
                    <Play className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url_medium || item.url}
                  alt={`${destination.name} visual ${index + 1}`}
                  className="media-zoom aspect-4/5 w-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <h2 className="reveal-up font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
          Location
        </h2>

        <div className="hover-lift reveal-up mt-8 overflow-hidden bg-white p-4 shadow-sm ring-1 ring-neutral-200/70 md:p-5" style={{ '--reveal-delay': '120ms' }}>
          <LeafletMap
            mapMarkers={
              hasCoordinates
                ? [{ name: destination.name, lat: destination.lat, lng: destination.lng }]
                : []
            }
            useMarkerBounds
          />
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
            <Navigation size={16} className="text-primary-700" />
            {hasCoordinates
              ? <span>{destination.name}, Enggano</span>
              : <span className="text-neutral-400 italic">Koordinat belum tersedia untuk destinasi ini.</span>
            }
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="border-t border-neutral-200 pt-8">
          <PrevNext
            prev={prev ? { href: `/destinations/${prev.slug}`, title: prev.name } : null}
            next={next ? { href: `/destinations/${next.slug}`, title: next.name } : null}
            prevLabel="Previous"
            nextLabel="Next"
            prevEmptyText="Belum ada destinasi sebelumnya."
            nextEmptyText="Belum ada destinasi berikutnya."
            prevCardClass="bg-white"
            nextCardClass="bg-white"
          />
        </div>
      </section>
    </>
  )
}
