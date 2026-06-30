import { Head, Link } from '@inertiajs/react'
import { ArrowRight } from 'lucide-react'

const fallbackVillages = [
  {
    id: 'kahyapu',
    name: 'Kahyapu',
    slug: 'kahyapu',
    summary: 'Pintu gerbang laut Enggano dengan pelabuhan utama yang menjadi pusat aktivitas ekonomi awal.',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'kaana',
    name: 'Kaana',
    slug: 'kaana',
    summary: 'Dikenal dengan keindahan pesisir dan masyarakat agraris yang mempertahankan tradisi leluhur.',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'malakoni',
    name: 'Malakoni',
    slug: 'malakoni',
    summary: 'Pusat pemerintahan dan denyut nadi komunitas, tempat bertemunya berbagai suku lokal.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'apoho',
    name: 'Apoho',
    slug: 'apoho',
    summary: 'Tersembunyi di rimbunnya hutan, desa ini menyimpan kekayaan flora dan fauna endemik yang memukau.',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'meok',
    name: 'Meok',
    slug: 'meok',
    summary: 'Desa nelayan dengan pesona garis pantai terpanjang, menawarkan pemandangan samudra yang tak berujung.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'enggano',
    name: 'Enggano',
    slug: 'enggano',
    summary: 'Membawa nama pulau, desa ini merawat situs-situs bersejarah dan cerita lisan masa lampau.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  },
]

const pointPositions = {
  Kahyapu: 'left-[18%] top-[24%]',
  Kaana: 'left-[38%] top-[18%]',
  Malakoni: 'left-[55%] top-[33%]',
  Apoho: 'left-[68%] top-[24%]',
  Meok: 'left-[47%] top-[58%]',
  Enggano: 'left-[75%] top-[56%]',
}

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

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="reveal-up max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-700">PETA WILAYAH</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Titik Kehidupan Enggano
          </h2>
        </div>

        <div className="hover-lift reveal-up mt-10 overflow-hidden bg-white p-6 shadow-sm ring-1 ring-neutral-200/70 md:p-8" style={{ '--reveal-delay': '140ms' }}>
          <div className="relative aspect-video overflow-hidden bg-linear-to-br from-primary-100 via-surface-50 to-highlight-100">
            <div className="absolute inset-x-[12%] inset-y-[14%] rounded-[48%] bg-primary-950/10 blur-3xl" />
            <div className="absolute inset-x-[16%] inset-y-[18%] rounded-[46%] border border-primary-300/50" />

            {entries.map(village => (
              <div
                key={village.slug}
                className={`float-soft absolute ${pointPositions[village.name] ?? 'left-1/2 top-1/2'} -translate-x-1/2 -translate-y-1/2`}
              >
                <div className="h-3 w-3 rounded-full bg-accent-500 ring-4 ring-accent-500/20" />
                <span className="mt-2 block whitespace-nowrap text-sm font-semibold text-primary-950">
                  {village.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(village => (
            <Link
              key={village.slug}
              href={`/villages/${village.slug}`}
              className="group hover-lift overlay-glow reveal-up overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70"
              style={{ '--reveal-delay': '160ms' }}
            >
              <div className="relative">
                <img
                  src={village.image}
                  alt={village.name}
                  className="media-zoom aspect-4/3 w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl font-semibold text-neutral-900">
                  {village.name}
                </h3>
                <p className="mt-3 text-base leading-7 text-neutral-600">{village.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
                  Lihat Detail
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
