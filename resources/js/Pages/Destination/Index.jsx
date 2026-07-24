import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

const fallbackDestinations = [
  {
    slug: 'destinasi-bahari',
    name: 'Destinasi Bahari',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'hutan-endemik',
    name: 'Hutan Endemik',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'warisan-enam-suku',
    name: 'Warisan Enam Suku',
    description: 'Lapisan sejarah, tradisi, dan artefak yang membentuk identitas Enggano.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function DestinationIndex({ destinations = [] }) {
  const items = destinations.length > 0 ? destinations : fallbackDestinations

  return (
    <>
      <Head title="Destinations" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-950 text-white">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />

        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
          alt="Destinasi Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/60 via-primary-950/70 to-primary-950/95" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:px-12 lg:px-16">
          <div className="max-w-3xl py-20">
            <p className="reveal-up text-xs uppercase tracking-[0.4em] text-white/70 font-medium">Destinations</p>
            <h1 className="reveal-up mt-4 font-display text-4xl md:text-5xl font-bold leading-tight" style={{ '--reveal-delay': '100ms' }}>
              Jelajahi Keindahan Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-relaxed text-white/85 md:text-lg" style={{ '--reveal-delay': '200ms' }}>
              Temukan destinasi terbaik yang menawarkan keindahan alam, budaya, dan pengalaman tak terlupakan di Pulau Enggano.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16 bg-surface-50 -mx-6 md:-mx-12 lg:-mx-16">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900">
            Destinasi Pilihan
          </h2>
          <p className="mt-4 text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Pilih destinasi impianmu dan mulailah petualanganmu di Pulau Enggano.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((dest, index) => (
            <article
              key={dest.slug || index}
              className="group hover-lift reveal-up overflow-hidden rounded-2xl bg-white shadow-sm border border-neutral-100"
              style={{ '--reveal-delay': `${120 + index * 80}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={dest.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'}
                  alt={dest.name}
                  className="media-zoom w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-neutral-900 leading-snug">
                  {dest.name}
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                  {dest.description || ''}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/destinations/${dest.slug || '#'}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    <span>Lihat Detail</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
