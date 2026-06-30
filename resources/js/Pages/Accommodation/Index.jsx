import { Head, Link } from '@inertiajs/react'
import { Bath, BedDouble, Clock3, Info, MessageCircle, Plane, Route, Ship, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

const fallbackSchedules = [
  {
    id: 'asdp',
    type: 'kapal',
    name: 'Kapal Ferry ASDP',
    label: 'SEA ROUTE - FERRY',
    duration: '±12 Hrs',
    routes: [
      { from: 'Bengkulu → Enggano', schedule: 'Selasa, Jumat (17:00)' },
      { from: 'Enggano → Bengkulu', schedule: 'Rabu, Sabtu (17:00)' },
    ],
    fareLabel: 'Passenger Fare',
    fare: 'Rp 65.000',
    actionLabel: 'Kunjungi Website ASDP',
    actionType: 'link',
    official_link: 'https://www.asdp.id/',
  },
  {
    id: 'perintis',
    type: 'kapal',
    name: 'Kapal Perintis',
    label: 'SEA ROUTE - PERINTIS',
    duration: '±14-16 Hrs',
    routes: [
      { from: 'Bengkulu → Enggano', schedule: 'Lihat Jadwal di Website' },
      { from: 'Enggano → Bengkulu', schedule: 'Lihat Jadwal di Website' },
    ],
    fareLabel: 'Passenger Fare',
    fare: 'Rp 50.000 - Rp 75.000',
    actionLabel: 'Kunjungi Website Pelni',
    actionType: 'link',
    official_link: 'https://www.pelni.co.id/',
  },
  {
    id: 'susi-air',
    type: 'pesawat',
    name: 'Susi Air (Pioneer Flight)',
    label: 'AIR ROUTE',
    duration: '45 Mins',
    routes: [
      { from: 'Bengkulu → Enggano', schedule: 'Selasa, Kamis (08:00)' },
      { from: 'Enggano → Bengkulu', schedule: 'Selasa, Kamis (09:15)' },
    ],
    fareLabel: 'Estimated Fare',
    fare: 'Rp 300.000+',
    actionLabel: 'Kunjungi Website Susi Air',
    actionType: 'link',
    official_link: 'https://www.susiair.com/',
  },
]

const fallbackHomestays = [
  {
    id: 'pondok-bundo',
    name: 'Pondok Bundo',
    owner: 'Ibu Wati',
    village: 'Apoho',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: 'Pondok Bundo adalah homestay yang nyaman di Desa Apoho, Enggano. Dikelola oleh Ibu Wati yang ramah.',
    features: ['2 Kamar Tidur', 'Kamar Mandi Dalam', 'Termasuk Makan 3x'],
    price: 'Rp 200k /malam',
    whatsapp_number: '6280000000000',
  },
  {
    id: 'wisma-samudera',
    name: 'Wisma Samudera',
    owner: 'Bapak Hasan',
    village: 'Malaro',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    description: 'Wisma Samudera menawarkan pemandangan laut yang indah, dekat dengan pantai Malaro.',
    features: ['4 Kamar Tidur', 'Kamar Mandi Luar', 'Dekat Pesisir'],
    price: 'Rp 250k /malam',
    whatsapp_number: '6280000000000',
  },
  {
    id: 'rumah-pesisir',
    name: 'Rumah Pesisir',
    owner: 'Ibu Maria',
    village: 'Kahyapu',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    description: 'Rumah Pesisir cocok untuk yang ingin merasakan hidup nelayan di Enggano.',
    features: ['2 Kamar Tidur', 'Sarapan Lokal', 'Akses Pelabuhan Mudah'],
    price: 'Rp 180k /malam',
    whatsapp_number: '6280000000000',
  },
]

export default function AccommodationIndex({ schedules = [], homestays = [] }) {
  const [selectedVillage, setSelectedVillage] = useState('All Villages')

  const transportCards = useMemo(() => {
    if (!schedules.length) {
      return fallbackSchedules
    }

    // Jika ada data dari backend, tetap gunakan tapi sesuaikan struktur
    return schedules.map((schedule, index) => {
      const fallback = fallbackSchedules[index % fallbackSchedules.length]
      return {
        id: schedule.id || fallback.id,
        type: schedule.type || fallback.type,
        name: schedule.name || fallback.name,
        label: schedule.label || fallback.label,
        duration: schedule.duration || fallback.duration,
        routes: schedule.routes || fallback.routes,
        fareLabel: schedule.fareLabel || fallback.fareLabel,
        fare: schedule.estimated_price || fallback.fare,
        actionLabel: schedule.actionLabel || fallback.actionLabel,
        actionType: 'link',
        official_link: schedule.official_link || fallback.official_link,
      }
    })
  }, [schedules])

  const normalizedHomestays = useMemo(() => {
    if (!homestays.length) {
      return fallbackHomestays
    }

    return homestays.map((homestay, index) => ({
      id: homestay.id ?? homestay.name,
      name: homestay.name,
      owner: homestay.owner ?? 'Host Lokal',
      village: homestay.village ?? homestay.village_name ?? fallbackHomestays[index % fallbackHomestays.length].village,
      image:
        homestay.image ??
        fallbackHomestays[index % fallbackHomestays.length].image,
      description: homestay.description ?? fallbackHomestays[index % fallbackHomestays.length].description,
      features: Array.isArray(homestay.features) && homestay.features.length
        ? homestay.features
        : typeof homestay.facilities === 'string'
          ? homestay.facilities.split(',').map(item => item.trim()).filter(Boolean).slice(0, 3)
          : [],
      price: homestay.price_per_night
        ? `Rp ${Number(homestay.price_per_night).toLocaleString('id-ID')} /malam`
        : 'Hubungi host',
      whatsapp_number: homestay.whatsapp_number ?? '6280000000000',
    }))
  }, [homestays])

  const villages = ['All Villages', ...new Set(normalizedHomestays.map(homestay => homestay.village))]

  const visibleHomestays =
    selectedVillage === 'All Villages'
      ? normalizedHomestays
      : normalizedHomestays.filter(homestay => homestay.village === selectedVillage)

  return (
    <>
      <Head title="Accommodations" />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
          alt="Perjalanan menuju Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/20 via-primary-950/45 to-primary-950/80" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 md:pb-28 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="reveal-up font-display text-5xl font-semibold leading-tight md:text-7xl">
              Info Perjalanan & Akomodasi
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '140ms' }}>
              A curated guide to navigating the untamed beauty of Enggano Island.
              From vital transport schedules to hand-picked local homestays.
            </p>
          </div>
        </div>
      </section>

      <section id="transportation" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="reveal-up max-w-3xl">
          <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Survival Guide: Transport
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Accessing the frontier of the Indian Ocean requires planning. Schedules are
            subject to weather conditions. Always verify with local agents 24 hours prior
            to departure.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {transportCards.map((card, index) => {
            const isFlight = card.type === 'pesawat'
            const Icon = isFlight ? Plane : Ship
            const actionHref = card.official_link

            return (
              <article key={card.id} className="hover-lift overlay-glow reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': `${140 + index * 40}ms` }}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center bg-primary-950 text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-semibold text-neutral-900">
                      {card.name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-primary-700">
                      {card.label}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Duration</p>
                    <p className="mt-2 text-lg font-semibold text-neutral-900">{card.duration}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 border-t border-neutral-200 pt-6">
                  {card.routes.map(route => (
                    <div key={`${card.id}-${route.from}`} className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Route size={18} className="mt-1 text-primary-700" />
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">{route.from}</p>
                          <p className="mt-1 text-sm text-neutral-500">{route.schedule}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-neutral-200 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{card.fareLabel}</p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900">{card.fare}</p>
                  </div>
                  <a
                    href={actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
                  >
                    <Icon size={16} />
                    {card.actionLabel}
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <div className="reveal-up mt-6 flex items-start gap-3 bg-primary-50 px-5 py-4 text-sm leading-6 text-neutral-600 ring-1 ring-primary-100" style={{ '--reveal-delay': '280ms' }}>
          <Info size={18} className="mt-0.5 shrink-0 text-primary-700" />
          <p>
            *Disclaimer: Jadwal dan harga dapat berubah sewaktu-waktu tergantung pada
            kondisi cuaca dan kebijakan operator. Sangat disarankan untuk memverifikasi
            informasi secara langsung ke pihak pelabuhan atau agen maskapai sebelum
            keberangkatan.
          </p>
        </div>
      </section>

      <section id="homestay" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="reveal-up max-w-3xl">
              <h2 className="font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
                Homestay Directory
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Experience authentic island hospitality. Immerse yourself in the daily
                rhythms of Enggano by staying with local families in thoughtfully
                maintained accommodations.
              </p>
            </div>

            <div className="reveal-up flex flex-wrap gap-3" style={{ '--reveal-delay': '100ms' }}>
              {villages.map(village => {
                const active = village === selectedVillage

                return (
                  <button
                    key={village}
                    type="button"
                    onClick={() => setSelectedVillage(village)}
                    className={`hover-lift px-4 py-2 text-sm font-semibold ${
                      active
                        ? 'bg-primary-950 text-white'
                        : 'bg-surface-50 text-neutral-700 ring-1 ring-neutral-200'
                    }`}
                  >
                    {village}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {visibleHomestays.map(homestay => (
              <Link
                key={homestay.id}
                href={`/accommodations/${homestay.id}`}
                className="group hover-lift overlay-glow reveal-up overflow-hidden bg-surface-50 shadow-sm ring-1 ring-neutral-200/70"
                style={{ '--reveal-delay': '160ms' }}
              >
                <div className="relative">
                  <img
                    src={homestay.image}
                    alt={homestay.name}
                    className="media-zoom aspect-4/3 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 bg-primary-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    {homestay.village} Village
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-3xl font-semibold text-neutral-900">
                    {homestay.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                    <UserRound size={15} />
                    <span>{homestay.owner}</span>
                  </div>

                  {homestay.description && (
                    <p className="mt-3 text-sm leading-relaxed text-neutral-600 line-clamp-2">
                      {homestay.description}
                    </p>
                  )}

                  <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                    {(homestay.features.length ? homestay.features : ['Homestay lokal', 'Ramah pengunjung', 'Hubungi host untuk detail']).map(
                      (feature, index) => {
                        const Icon = feature.toLowerCase().includes('kamar mandi') ? Bath : BedDouble

                        return (
                          <li key={`${homestay.id}-${feature}`} className="flex items-center gap-3">
                            <Icon size={16} className="text-primary-700" />
                            <span>{feature}</span>
                          </li>
                        )
                      }
                    )}
                  </ul>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-neutral-200 pt-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                        Mulai Dari
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-neutral-900">{homestay.price}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://wa.me/${homestay.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik menginap di ${homestay.name}`)}`, '_blank')
                      }}
                      aria-label={`Hubungi ${homestay.name}`}
                      className="hover-lift inline-flex h-11 w-11 items-center justify-center bg-accent-500 text-white hover:bg-accent-600"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {!visibleHomestays.length && (
            <div className="reveal-up mt-8 flex items-center gap-3 bg-surface-50 px-5 py-4 text-sm text-neutral-600 ring-1 ring-neutral-200">
              <Clock3 size={18} className="text-primary-700" />
              <p>Belum ada homestay untuk filter ini. Pilih desa lain untuk melihat opsi yang tersedia.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
