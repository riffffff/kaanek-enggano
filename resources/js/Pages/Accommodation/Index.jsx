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

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
          alt="Info Perjalanan & Akomodasi"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Info Perjalanan
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              Akomodasi & Transportasi
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Panduan lengkap untuk mengakses Pulau Enggano dan penginapan lokal yang nyaman.
            </p>
          </div>
        </div>
      </section>

      {/* Transportation Section (Static 3 Cards: Perintis, Ferry ASDP, Susi Air) */}
      <section id="transportation" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="reveal-up max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-accent-600">Survival Guide: Access & Transport</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Opsi Transportasi Bengkulu &harr; Enggano
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-600">
            Akses menuju Pulau Enggano di Samudera Hindia dapat ditempuh melalui 3 jalur moda transportasi utama. Pilih moda transportasi di bawah ini untuk melihat estimasi tarif, waktu tempuh, serta tautan langsung untuk memesan tiket.
          </p>
        </div>

        {/* 3 Distinct Static Cards Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">

          {/* Card 1: Kapal Perintis */}
          <article className="group hover-lift overlay-glow reveal-up flex flex-col justify-between bg-white p-7 shadow-sm ring-1 ring-neutral-200/80 rounded-2xl" style={{ '--reveal-delay': '140ms' }}>
            <div>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-primary-950 text-white rounded-xl">
                  <Ship size={22} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-surface-100 text-primary-800 px-3 py-1 rounded-full">
                  Jalur Laut
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">
                Kapal Perintis
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] font-semibold text-accent-600">
                KM Sabuk Nusantara / Perintis
              </p>

              <p className="mt-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                Pelayaran kapal niaga perintis menghubungkan Pelabuhan Pulau Baai (Bengkulu) dengan pelabuhan-pelabuhan utama di Enggano. Cocok untuk perjalanan ekonomis dan pengangkutan barang.
              </p>

              <div className="mt-6 space-y-3 text-sm text-neutral-700 bg-surface-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2"><Clock3 size={15} className="text-primary-700" /> Waktu Tempuh:</span>
                  <span className="font-semibold text-neutral-900">± 12 - 14 Jam</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2">
                  <span className="text-neutral-500 flex items-center gap-2"><Route size={15} className="text-primary-700" /> Jadwal:</span>
                  <span className="font-semibold text-neutral-900">2x Seminggu</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 block">Estimasi Tarif</span>
                <span className="text-2xl font-extrabold text-neutral-900">Rp 60.000</span>
              </div>
              <a
                href="https://pelni.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center gap-2 bg-primary-950 hover:bg-primary-900 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase"
              >
                <span>Buka Website</span>
                <Ship size={14} />
              </a>
            </div>
          </article>

          {/* Card 2: Ferry ASDP */}
          <article className="group hover-lift overlay-glow reveal-up flex flex-col justify-between bg-white p-7 shadow-sm ring-1 ring-neutral-200/80 rounded-2xl" style={{ '--reveal-delay': '200ms' }}>
            <div>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-accent-500 text-white rounded-xl">
                  <Ship size={22} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-accent-50 text-accent-700 px-3 py-1 rounded-full">
                  Ferry Penyeberangan
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">
                Ferry ASDP
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] font-semibold text-primary-700">
                KMP Pulo Tello
              </p>

              <p className="mt-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                Kapal Ro-Ro Ferry resmi ASDP yang melayani penyeberangan reguler penumpang dan kendaraan dari Pelabuhan Baai (Bengkulu) ke Kahyapu (Enggano).
              </p>

              <div className="mt-6 space-y-3 text-sm text-neutral-700 bg-surface-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2"><Clock3 size={15} className="text-accent-600" /> Waktu Tempuh:</span>
                  <span className="font-semibold text-neutral-900">± 12 Jam</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2">
                  <span className="text-neutral-500 flex items-center gap-2"><Route size={15} className="text-accent-600" /> Jadwal:</span>
                  <span className="font-semibold text-neutral-900">Selasa & Jumat</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 block">Estimasi Tarif</span>
                <span className="text-2xl font-extrabold text-neutral-900">Rp 75.000</span>
              </div>
              <a
                href="https://ferizy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase"
              >
                <span>Buka Website</span>
                <Ship size={14} />
              </a>
            </div>
          </article>

          {/* Card 3: Susi Air */}
          <article className="group hover-lift overlay-glow reveal-up flex flex-col justify-between bg-white p-7 shadow-sm ring-1 ring-neutral-200/80 rounded-2xl" style={{ '--reveal-delay': '260ms' }}>
            <div>
              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-600 text-white rounded-xl">
                  <Plane size={22} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-sky-50 text-sky-700 px-3 py-1 rounded-full">
                  Jalur Udara
                </span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-bold text-neutral-900">
                Susi Air
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] font-semibold text-sky-600">
                Penerbangan Perintis
              </p>

              <p className="mt-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                Penerbangan udara dari Bandara Fatmawati Soekarno (Bengkulu) langsung menuju Bandara Enggano. Pilihan tercepat dan nyaman untuk mobilitas tinggi.
              </p>

              <div className="mt-6 space-y-3 text-sm text-neutral-700 bg-surface-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 flex items-center gap-2"><Clock3 size={15} className="text-sky-600" /> Waktu Tempuh:</span>
                  <span className="font-semibold text-neutral-900">± 45 Menit</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-2">
                  <span className="text-neutral-500 flex items-center gap-2"><Route size={15} className="text-sky-600" /> Jadwal:</span>
                  <span className="font-semibold text-neutral-900">Selasa & Kamis</span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-100 pt-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 block">Estimasi Tarif</span>
                <span className="text-2xl font-extrabold text-neutral-900">Rp 300.000</span>
              </div>
              <a
                href="https://susiair.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase"
              >
                <span>Buka Website</span>
                <Plane size={14} />
              </a>
            </div>
          </article>

        </div>

        {/* Disclaimer Info */}
        <div className="reveal-up mt-10 flex items-start gap-3 bg-primary-50 px-5 py-4 text-sm leading-6 text-neutral-700 ring-1 ring-primary-100 rounded-xl" style={{ '--reveal-delay': '320ms' }}>
          <Info size={18} className="mt-0.5 shrink-0 text-primary-700" />
          <p>
            *<strong>Informasi Penting:</strong> Jadwal keberangkatan dan tarif tiket sewaktu-waktu dapat berubah tergantung pada kondisi cuaca dan gelombang di Samudera Hindia. Klik tombol <strong>"BUKA WEBSITE"</strong> pada masing-masing moda di atas untuk langsung membuka situs resmi pemesanan atau verifikasi tiket.
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
