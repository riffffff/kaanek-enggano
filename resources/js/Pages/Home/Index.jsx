import { Head, Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import BentoGrid from '../../Components/BentoGrid'
import KknCard from '../../Components/KknCard'
import { historyData } from '../Village/History'
import Button from '../../Components/Button'

export default function HomeIndex({ latestKkn = [] }) {
  return (
    <>
      <Head>
        <title>Enggano</title>
        <meta
          name="description"
          content="Website resmi digital Pulau Enggano untuk informasi perjalanan, destinasi, desa, dan dokumentasi KKN."
        />
      </Head>

      <section className="relative min-h-screen overflow-hidden bg-primary-950 text-white flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
          alt="Pulau Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />
        <div className="relative z-10 mx-auto flex flex-col items-center text-center px-6 pb-24 pt-32 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-3xl font-semibold leading-tight md:text-5xl uppercase tracking-wider">
              Enggano: Garis Terdepan Samudera Hindia
            </h1>
            <p className="reveal-up mt-6 max-w-3xl mx-auto font-body text-base leading-7 text-white/80 md:text-lg uppercase tracking-widest" style={{ '--reveal-delay': '120ms' }}>
              Jelajahi pulau terluar di Samudera Hindia, sebuah simfoni laut, hutan endemik, dan warisan budaya enam suku asli
            </p>
            <div className="reveal-up mt-10 flex flex-wrap gap-4 justify-center" style={{ '--reveal-delay': '220ms' }}>
              <Link
                href="/destinations"
                className="hover-lift overlay-glow inline-flex items-center gap-2 bg-accent-500 px-8 py-4 text-sm font-semibold text-white hover:bg-accent-600 uppercase tracking-wider"
              >
                Jelajahi Destinasi
              </Link>
              <Link
                href="/accommodations"
                className="hover-lift inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-sm font-semibold text-white hover:bg-white hover:text-black uppercase tracking-wider"
              >
                Info Perjalanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px]">
            <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">Warisan Leluhur</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                {historyData.title}
              </h2>
              <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600 md:text-lg">
                {historyData.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="reveal-up" style={{ '--reveal-delay': `${120 + index * 80}ms` }}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <Button
                href="/villages/history"
                showArrow
                className="reveal-up mt-10"
              >
                Baca Selengkapnya
              </Button>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="reveal-up mb-10">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">Eksplorasi Enggano</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">
            Bahari, hutan endemik, dan warisan enam suku dalam satu lanskap editorial.
          </h2>
        </div>
        <BentoGrid />
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="reveal-up">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">Jurnal Ekspedisi</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">
                Catatan lapangan dari ujung samudera.
              </h2>
            </div>
            <Link href="/kkn-log" className="reveal-up text-sm font-semibold text-primary-700 hover:text-primary-600" style={{ '--reveal-delay': '120ms' }}>
              Lihat Semua
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
