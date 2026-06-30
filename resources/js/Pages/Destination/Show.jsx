import { Head, Link } from '@inertiajs/react'
import { Camera, MessageCircle, Mountain, Navigation, Timer, Waves } from 'lucide-react'
import LeafletMap from '../../Components/LeafletMap'

export default function DestinationShow({ destination, prev = null, next = null }) {
  const guideWhatsappUrl = destination.local_guide
    ? `https://wa.me/${destination.local_guide.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik mengunjungi ${destination.name}`)}`
    : null

  const descriptionParagraphs = destination.description
    ? destination.description
        .split(/\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : []

  const editorialParagraphs = descriptionParagraphs.length
    ? descriptionParagraphs
    : [
        destination.short_description ||
          `${destination.name} menghadirkan lanskap terpencil dengan nuansa editorial yang kuat, jauh dari hiruk pikuk destinasi arus utama.`,
        `Perjalanan menuju ${destination.name} menjadi bagian dari pengalaman, melewati rute-rute alami Enggano yang masih terasa liar dan tenang.`,
        `Karakter tempat ini terletak pada perpaduan panorama, ritme komunitas lokal, dan sensasi ekspedisi yang membuat kunjungan terasa intim.`,
      ]

  const iconByExperience = {
    Snorkeling: Waves,
    'Wild Camping': Mountain,
    Photography: Camera,
    'Forest Trekking': Navigation,
    Birdwatching: Camera,
    'Nature Study': Mountain,
    'Heritage Walk': Navigation,
    Documentation: Camera,
    'Site Exploration': Mountain,
  }

  const experiences = (destination.experiences?.length ? destination.experiences : ['Snorkeling', 'Wild Camping', 'Photography'])
    .map(label => ({
      label,
      icon: iconByExperience[label] ?? Navigation,
    }))

  const galleryImages = destination.gallery?.length
    ? [destination.image || destination.gallery[0], ...destination.gallery.filter(Boolean).slice(1)]
    : [
        destination.image ||
          'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
      ]

  return (
    <>
      <Head title={destination.name} />

      <section className="relative min-h-[78vh] overflow-hidden bg-primary-950 text-white">
        <img
          src={
            destination.image ||
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'
          }
          alt={destination.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/20 via-primary-950/40 to-primary-950/85" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 pb-20 pt-32 md:px-12 lg:px-16">
          <div>
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/75">
              {String(destination.type ?? 'bahari').toUpperCase()}
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {destination.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Link href="/destinations" className="reveal-up text-sm font-semibold text-primary-700 hover:text-primary-600">
          Kembali ke Destinations
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px]">
          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
            <h2 className="font-display text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              {destination.headline || 'A Hidden Sanctuary on the Edge of the Indian Ocean'}
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600 md:text-lg">
              {editorialParagraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Experiences at {destination.name}
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {experiences.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="hover-lift inline-flex items-center gap-2 bg-surface-50 px-4 py-3 text-sm font-semibold text-neutral-700 ring-1 ring-neutral-200"
                  >
                    <Icon size={16} className="text-primary-700" />
                    {label}
                  </div>
                ))}
              </div>
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
                    {destination.difficulty_level || 'Easy to Moderate'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Timer size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Travel Time</p>
                  <p className="font-semibold text-neutral-900">{destination.travel_time || '30 mins from Malakoni'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Navigation size={18} className="mt-1 text-primary-700" />
                <div>
                  <p className="text-sm text-neutral-500">Access</p>
                  <p className="font-semibold text-neutral-900">{destination.access_note || 'Motorbike & short trek'}</p>
                </div>
              </div>
            </div>

            {destination.local_guide && (
              <div className="mt-8 border-t border-neutral-200 pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700">
                  Local Guide
                </p>
                <h4 className="mt-3 font-display text-2xl font-semibold text-neutral-900">
                  {destination.local_guide.name}
                </h4>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {destination.local_guide.expertise}
                </p>
                <a
                  href={guideWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift overlay-glow mt-5 inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
                >
                  <MessageCircle size={16} />
                  Contact Local Guide
                </a>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <h2 className="reveal-up font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
          Visual Journey
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div key={`${image}-${index}`} className="group hover-lift reveal-up overflow-hidden bg-white shadow-sm" style={{ '--reveal-delay': `${120 + index * 90}ms` }}>
              <img
                src={image}
                alt={`${destination.name} visual ${index + 1}`}
                className="media-zoom aspect-4/5 w-full object-cover"
                loading="lazy"
              />
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
              destination.lat && destination.lng
                ? [{ name: destination.name, lat: destination.lat, lng: destination.lng }]
                : []
            }
          />
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
            <Navigation size={16} className="text-primary-700" />
            {destination.lat && destination.lng
              ? <span>{destination.name}, Enggano</span>
              : <span className="text-neutral-400 italic">Koordinat belum tersedia untuk destinasi ini.</span>
            }
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="grid gap-4 border-t border-neutral-200 pt-8 md:grid-cols-2">
          <div className="hover-lift reveal-up bg-white p-6 shadow-sm ring-1 ring-neutral-200/70">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Previous</p>
            {prev ? (
              <Link href={`/destinations/${prev.slug}`} className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700">
                {prev.name}
              </Link>
            ) : (
              <p className="mt-3 text-sm text-neutral-500">Belum ada destinasi sebelumnya.</p>
            )}
          </div>

          <div className="hover-lift reveal-up bg-white p-6 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '100ms' }}>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Next</p>
            {next ? (
              <Link href={`/destinations/${next.slug}`} className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700">
                {next.name}
              </Link>
            ) : (
              <p className="mt-3 text-sm text-neutral-500">Belum ada destinasi berikutnya.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
