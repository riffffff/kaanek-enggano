import { Head, Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'
import { useTranslate } from '../../hooks/useTranslate'
import BentoGrid from '../../Components/BentoGrid'
import KknCard from '../../Components/KknCard'
import { historyData } from '../Village/History'
import Button from '../../Components/Button'

export default function HomeIndex({ latestKkn = [], destinations = [] }) {
  const { tt } = useTranslate('home')

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
            <h1 className="reveal-up font-display text-5xl font-semibold leading-tight md:text-7xl uppercase tracking-wider">
              {tt('JELAJAH ENGGANO', 'hero.title')}
            </h1>
            <p className="reveal-up mt-6 max-w-3xl mx-auto font-body text-base leading-7 text-white/80 md:text-lg uppercase tracking-widest" style={{ '--reveal-delay': '120ms' }}>
              {tt('JELAJAHI KEINDAHAN ALAMNYA, SELAMI KEKAYAAN WARISAN ENAM SUKUNYA!.', 'hero.subtitle')}
            </p>
            <div className="reveal-up mt-10 flex flex-wrap gap-4 justify-center" style={{ '--reveal-delay': '220ms' }}>
              <Link
                href="/destinations"
                className="hover-lift overlay-glow inline-flex items-center gap-2 bg-accent-500 px-8 py-4 text-sm font-semibold text-white hover:bg-accent-600 uppercase tracking-wider"
              >
                {tt('Jelajahi Destinasi', 'hero.exploreDestinations')}
              </Link>
              <Link
                href="/accommodations"
                className="hover-lift inline-flex items-center gap-2 border-2 border-white px-8 py-4 text-sm font-semibold text-white hover:bg-white hover:text-black uppercase tracking-wider"
              >
                {tt('Info Perjalanan', 'hero.travelInfo')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f7f4] justify-center text-center">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="mt-8 grid gap-10 justify-center ">
            <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">{tt('Warisan Leluhur', 'history.label')}</p>
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
                {tt('Baca Selengkapnya', 'history.readMore')}
              </Button>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full bg-accent-50 py-16 md:py-24 overflow-hidden ">
        <div className="mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-8 items-center justify-center">
            <div className="reveal-up ">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-accent-700">{tt('Eksplorasi Enggano', 'explore.label')}</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-neutral-900">
                {tt('Bahari, hutan endemik, dan warisan enam suku dalam satu lanskap editorial.', 'explore.title')}
              </h2>
            </div>

            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max pb-4">
                {destinations.map((dest, index) => (
                  <Link
                    key={dest.slug || index}
                    href={`/destinations/${dest.slug}`}
                    className="group hover-lift overlay-glow reveal-up relative overflow-hidden bg-white text-neutral-900 flex-shrink-0 w-72 sm:w-80 md:w-96 shadow-md"
                    style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="media-zoom h-full w-full object-cover aspect-[9/16]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-900/90 via-neutral-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-95" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                        {dest.type?.toUpperCase() || 'DESTINASI'}
                      </p>
                      <h3 className="mt-4 font-display text-2xl sm:text-3xl font-semibold text-white">{dest.name}</h3>
                      <div className="mt-8">
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/50 bg-white/10 hover:bg-white/20 px-5 py-3 transition-all">
                          Jelajahi Destinasi
                          <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
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

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="reveal-up">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">{tt('Jurnal Ekspedisi', 'kkn.label')}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">
                {tt('Catatan lapangan dari ujung samudera.', 'kkn.title')}
              </h2>
            </div>
            <Link href="/kkn-log" className="reveal-up text-sm font-semibold text-primary-700 hover:text-primary-600" style={{ '--reveal-delay': '120ms' }}>
              {tt('Lihat Semua', 'kkn.viewAll')}
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
