import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

const fallbackDestinations = [
  {
    slug: 'destinasi-bahari',
    type: 'bahari',
    name: 'Destinasi Bahari',
    short_description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'hutan-endemik',
    type: 'wildlife',
    name: 'Hutan Endemik',
    short_description: 'Paru-paru pulau yang menyimpan flora dan fauna langka.',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'warisan-enam-suku',
    type: 'history',
    name: 'Warisan Enam Suku',
    short_description: 'Lapisan sejarah, tradisi, dan artefak yang membentuk identitas Enggano.',
    description: 'Lapisan sejarah, tradisi, dan artefak yang membentuk identitas Enggano.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function DestinationIndex({ destinations = [] }) {
  const items = destinations.length > 0 ? destinations : fallbackDestinations

  return (
    <>
      <Head title="Destinations" />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
          alt="Destinasi Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/25 via-primary-950/50 to-primary-950/85" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">Destinations</p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '100ms' }}>
              Editorial atlas untuk lanskap dan pengalaman Enggano.
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Bahari, sejarah, dan wildlife dirangkai sebagai pintu masuk untuk membaca
              pulau terluar ini secara lebih tenang, visual, dan kuratorial.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {items.map((dest, index) => {
            const feature = index === 0

            return (
              <article
                key={dest.slug || index}
                className={`group hover-lift overlay-glow reveal-up overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70 ${
                  feature ? 'lg:col-span-2' : ''
                }`}
                style={{ '--reveal-delay': `${120 + index * 80}ms` }}
              >
                <Link href={`/destinations/${dest.slug || '#'}`} className={`grid ${feature ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={dest.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'}
                      alt={dest.name}
                      className={`media-zoom w-full object-cover ${feature ? 'aspect-[16/10] min-h-[350px]' : 'aspect-[4/3]'}`}
                      loading="lazy"
                    />
                    <div className="absolute left-5 top-5 bg-primary-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {String(dest.type ?? 'destinasi').toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h2 className={`mt-4 font-display font-semibold text-neutral-900 ${feature ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                      {dest.name}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-neutral-600">{dest.short_description || dest.description || ''}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                      Jelajahi Destinasi
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
