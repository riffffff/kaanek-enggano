import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

const filters = [
  { label: 'SEMUA', value: null },
  { label: 'EKONOMI', value: 'ekonomi' },
  { label: 'KESEHATAN', value: 'kesehatan' },
  { label: 'DIGITALISASI', value: 'digitalisasi' },
  { label: 'LINGKUNGAN', value: 'lingkungan' },
]

const fallbackItems = [
  {
    slug: 'restorasi-mangrove',
    category: 'lingkungan',
    date: '12 Aug 2024',
    title: 'Restorasi Mangrove di Pesisir Desa Kahyapu',
    excerpt:
      'A collaborative effort to restore the natural coastal defenses of Enggano, ensuring long-term resilience against coastal erosion and providing a thriving habitat for local marine life.',
    read_time: '5 min read',
    image:
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'literasi-digital-umkm',
    category: 'digitalisasi',
    date: '08 Aug 2024',
    title: 'Literasi Digital untuk UMKM Lokal',
    excerpt:
      'Empowering local artisans and business owners with the essential digital tools needed to expand their market reach beyond the island.',
    read_time: '3 min read',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'panen-melinjo',
    category: 'ekonomi',
    date: '25 Jul 2024',
    title: 'Optimalisasi Hasil Panen Melinjo',
    excerpt:
      'Introducing efficient harvesting techniques to maximize yield while preserving the long-term health of the trees.',
    read_time: '4 min read',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'kesehatan-lansia',
    category: 'kesehatan',
    date: '14 Jul 2024',
    title: 'Pemeriksaan Kesehatan Rutin Lansia',
    excerpt:
      'A comprehensive health screening initiative targeting the elderly population in remote village clusters.',
    read_time: '4 min read',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'pemetaan-batas-desa',
    category: 'lingkungan',
    date: '02 Jul 2024',
    title: 'Pemetaan Batas Desa Partisipatif',
    excerpt:
      'Collaborative geographic mapping with local elders to officially document traditional land boundaries.',
    read_time: '6 min read',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]

const excerptByTitle = {
  'Restorasi Mangrove di Pesisir Desa Kahyapu':
    'A collaborative effort to restore the natural coastal defenses of Enggano, ensuring long-term resilience against coastal erosion and providing a thriving habitat for local marine life.',
  'Literasi Digital untuk UMKM Lokal':
    'Empowering local artisans and business owners with the essential digital tools needed to expand their market reach beyond the island.',
  'Optimalisasi Hasil Panen Melinjo':
    'Introducing efficient harvesting techniques to maximize yield while preserving the long-term health of the trees.',
  'Pemeriksaan Kesehatan Rutin Lansia':
    'A comprehensive health screening initiative targeting the elderly population in remote village clusters.',
  'Pemetaan Batas Desa Partisipatif':
    'Collaborative geographic mapping with local elders to officially document traditional land boundaries.',
}

const imageByCategory = {
  lingkungan:
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80',
  digitalisasi:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  ekonomi:
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
  kesehatan:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
}

export default function KknLogIndex({ items = [], selectedCategory = null }) {
  const [visibleCount, setVisibleCount] = useState(4)

  const entries = items.length
    ? items.map((item, index) => ({
        ...item,
        excerpt:
          item.excerpt ??
          excerptByTitle[item.title] ??
          'Editorial notes from the field, documenting practical work, local collaboration, and island realities in Enggano.',
        read_time: item.read_time ?? `${3 + (index % 4)} min read`,
        image:
          item.image ??
          imageByCategory[item.category] ??
          fallbackItems[index % fallbackItems.length].image,
      }))
    : fallbackItems

  const visibleEntries = entries.slice(0, visibleCount)

  function handleFilter(category) {
    setVisibleCount(4) // Reset pagination when changing filters
    router.get('/kkn-log', category ? { category } : {}, { preserveState: true, replace: true })
  }

  return (
    <>
      <Head title="KKN Log" />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80"
          alt="KKN Log"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/25 via-primary-950/50 to-primary-950/85" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">ARCHIVE</p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '100ms' }}>KKN Log</h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              An editorial chronicle of community development, environmental stewardship,
              and cultural preservation on Enggano Island.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="reveal-up flex flex-wrap gap-3">
          {filters.map(filter => {
            const active = selectedCategory === filter.value || (!selectedCategory && filter.value === null)

            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => handleFilter(filter.value)}
                className={`hover-lift px-4 py-2 text-sm font-semibold tracking-[0.18em] ${
                  active
                    ? 'bg-primary-950 text-white'
                    : 'bg-white text-neutral-700 ring-1 ring-neutral-200'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {visibleEntries.map((item, index) => {
            const feature = index === 0

            return (
              <article
                key={item.slug}
                className={`group hover-lift overlay-glow reveal-up overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70 ${
                  feature ? 'lg:col-span-2' : ''
                }`}
                style={{ '--reveal-delay': `${120 + index * 80}ms` }}
              >
                <Link href={`/kkn-log/${item.slug}`} className={`grid ${feature ? 'lg:grid-cols-[1.15fr_0.85fr]' : ''}`}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`media-zoom w-full object-cover ${feature ? 'h-full min-h-90' : 'aspect-4/3'}`}
                      loading="lazy"
                    />
                    <div className="absolute left-5 top-5 bg-primary-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      {String(item.category ?? 'arsip').toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span>{item.date}</span>
                      <span>{item.read_time}</span>
                    </div>
                    <h2 className={`mt-4 font-display font-semibold text-neutral-900 ${feature ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                      {item.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-neutral-600">{item.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                      Baca Catatan
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {entries.length > visibleCount && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount(prev => prev + 4)}
              className="hover-lift reveal-up bg-primary-950 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-900"
            >
              Load More Entries
            </button>
          </div>
        )}
      </section>
    </>
  )
}
