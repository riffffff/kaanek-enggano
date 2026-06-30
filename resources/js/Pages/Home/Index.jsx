import { Head, Link } from '@inertiajs/react'
import { ChevronRight, Home, Ship, Signal } from 'lucide-react'
import BentoGrid from '../../Components/BentoGrid'
import KknCard from '../../Components/KknCard'

const quickLinks = [
  {
    title: 'Ship Schedule',
    description: 'Cek estimasi rute kapal dan pesawat menuju Enggano.',
    href: '/accommodations#transportation',
    icon: Ship,
  },
  {
    title: 'Cari Homestay',
    description: 'Temukan penginapan warga lokal saat halaman akomodasi siap.',
    href: '/accommodations#homestay',
    icon: Home,
  },
  {
    title: 'Peta Sinyal',
    description: 'Lihat gambaran area konektivitas sebelum berangkat.',
    href: '/accommodations#signal-map',
    icon: Signal,
  },
]

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

      <section className="relative min-h-screen overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80"
          alt="Pulau Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/30 via-black/15 to-black/70" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-24 pt-32 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-5xl font-semibold leading-tight md:text-7xl">
              Enggano: Garis Terdepan Samudera Hindia.
            </h1>
            <p className="reveal-up mt-6 max-w-3xl font-body text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '120ms' }}>
              Jelajahi pulau terluar di Samudera Hindia, sebuah simfoni laut, hutan endemik, dan warisan budaya enam suku asli.
            </p>
            <div className="reveal-up mt-8 flex flex-wrap gap-4" style={{ '--reveal-delay': '220ms' }}>
              <Link
                href="/destinations"
                className="hover-lift overlay-glow inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
              >
                Jelajahi Destinasi
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/accommodations#transportation"
                className="hover-lift inline-flex items-center gap-2 border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:border-white"
              >
                Info Perjalanan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="reveal-up max-w-3xl">
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">Trip Essentials</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-800 md:text-5xl">
            Tiga pijakan awal sebelum berangkat ke Enggano.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {quickLinks.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="group hover-lift reveal-up bg-white p-6 shadow-sm" style={{ '--reveal-delay': '140ms' }}>
              <Icon size={22} className="text-accent-500" />
              <h3 className="mt-4 font-display text-2xl font-semibold text-neutral-800">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-500">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                Lihat detail
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
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
