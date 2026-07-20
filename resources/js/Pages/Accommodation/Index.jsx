import { Head, Link } from '@inertiajs/react'
import { Bath, BedDouble, Clock3, Info, MessageCircle, Plane, Route, Ship, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function AccommodationIndex({ schedules = [], homestays = [] }) {
  const [selectedVillage, setSelectedVillage] = useState('All Villages')

  const transportCards = useMemo(() => {
    return schedules.map(schedule => {
      const isFlight = schedule.type === 'susi_air'
      const departureDays = Array.isArray(schedule.days) ? schedule.days.filter(Boolean) : []
      const scheduleLabel = departureDays.length
        ? `${departureDays.join(', ')} (${schedule.departure_time})`
        : schedule.departure_time
      const actionHref = schedule.ticket_link
        ? schedule.ticket_link
        : schedule.agent_whatsapp_number
          ? `https://wa.me/${schedule.agent_whatsapp_number}?text=${encodeURIComponent(`Halo, saya ingin info jadwal ${schedule.route}`)}`
          : null

      return {
        id: schedule.id,
        type: schedule.type,
        title: schedule.route,
        label: isFlight ? 'AIR ROUTE' : 'SEA ROUTE',
        scheduleLabel,
        fare: schedule.estimated_price || 'Hubungi admin',
        actionHref,
        actionLabel: schedule.ticket_link ? 'Buka Tiket' : schedule.agent_whatsapp_number ? 'Hubungi Agen' : null,
      }
    })
  }, [schedules])

  const normalizedHomestays = useMemo(() => {
    return homestays.map(homestay => ({
      id: homestay.id ?? homestay.name,
      name: homestay.name,
      owner: homestay.owner ?? 'Host Lokal',
      village: homestay.village ?? homestay.village_name ?? 'Desa belum diatur',
      image: homestay.image,
      description: homestay.description,
      features: Array.isArray(homestay.features) && homestay.features.length
        ? homestay.features
        : typeof homestay.facilities === 'string'
          ? homestay.facilities.split(',').map(item => item.trim()).filter(Boolean).slice(0, 3)
          : [],
      price: homestay.price_per_night
        ? `Rp ${Number(homestay.price_per_night).toLocaleString('id-ID')} /malam`
        : 'Hubungi host',
      whatsapp_number: homestay.whatsapp_number,
    }))
  }, [homestays])

  const villages = ['All Villages', ...new Set(normalizedHomestays.map(homestay => homestay.village).filter(Boolean))]

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
          {!transportCards.length && (
            <div className="lg:col-span-3 bg-white px-6 py-5 text-sm text-neutral-600 shadow-sm ring-1 ring-neutral-200/70">
              Jadwal transport belum tersedia di admin.
            </div>
          )}

          {transportCards.map((card, index) => {
            const isFlight = card.type === 'susi_air'
            const Icon = isFlight ? Plane : Ship

            return (
              <article key={card.id} className="hover-lift overlay-glow reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': `${140 + index * 40}ms` }}>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center bg-primary-950 text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 font-display text-3xl font-semibold text-neutral-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.25em] text-primary-700">
                      {card.label}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 border-t border-neutral-200 pt-6">
                  <div className="flex items-start gap-3">
                    <Route size={18} className="mt-1 text-primary-700" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{card.title}</p>
                      <p className="mt-1 text-sm text-neutral-500">{card.scheduleLabel}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-neutral-200 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Estimasi Harga</p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900">{card.fare}</p>
                  </div>
                  {card.actionHref && card.actionLabel && (
                    <a
                      href={card.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-lift inline-flex items-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
                    >
                      <Icon size={16} />
                      {card.actionLabel}
                    </a>
                  )}
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
            {!visibleHomestays.length && selectedVillage === 'All Villages' && (
              <div className="xl:col-span-3 lg:col-span-2 bg-surface-50 px-5 py-4 text-sm text-neutral-600 ring-1 ring-neutral-200">
                Data homestay belum tersedia di admin.
              </div>
            )}

            {visibleHomestays.map(homestay => (
              <Link
                key={homestay.id}
                href={`/accommodations/${homestay.id}`}
                className="group hover-lift overlay-glow reveal-up overflow-hidden bg-surface-50 shadow-sm ring-1 ring-neutral-200/70"
                style={{ '--reveal-delay': '160ms' }}
              >
                <div className="relative">
                  {homestay.image ? (
                    <img
                      src={homestay.image}
                      alt={homestay.name}
                      className="media-zoom aspect-4/3 w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-4/3 items-center justify-center bg-neutral-100 text-sm font-medium text-neutral-400">
                      Foto homestay belum tersedia
                    </div>
                  )}
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
                    {(homestay.features.length ? homestay.features : ['Fasilitas belum diisi host']).map(
                      feature => {
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
                    {homestay.whatsapp_number && (
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
                    )}
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
