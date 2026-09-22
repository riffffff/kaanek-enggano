import { Link } from '@inertiajs/react'
import { Bath, BedDouble, Clock3, Info, MapPin, MessageCircle, Plane, Route, Ship, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageHeader from '../../Components/PageHeader'
import SeoHead from '../../Components/SeoHead'

export default function AccommodationIndex({ schedules = [], homestays = [] }) {
  const [selectedVillage, setSelectedVillage] = useState('All Villages')

  const heroImageSrc = 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'

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
      <SeoHead
        title="Penginapan & Transportasi ke Enggano"
        description="Cara ke Pulau Enggano: jadwal kapal, pesawat, dan daftar homestay warga lokal beserta kontak WhatsApp."
      />

      <PageHeader pageKey="accommodations" background={heroImageSrc} />

      {/* Transportation Section (Static 3 Cards: Perintis, Ferry ASDP, Susi Air) */}
      <section id="transportation" className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-10 sm:py-16 md:py-24">
        <div className="reveal-up max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
            Opsi Transportasi Bengkulu &harr; Enggano
          </h2>
          <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
            Akses menuju Pulau Enggano di Samudera Hindia dapat ditempuh melalui 3 moda transportasi utama.
          </p>
        </div>

        {/* Mobile View: Horizontal Swipe / Snap Carousel (< md) — Gaya Travel App Modern */}
        <div className="mt-6 md:hidden">
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-2.5 px-1">
            <span className="font-medium text-neutral-700">Pilihan Moda Transportasi</span>
            <span className="text-[11px] text-neutral-400">Geser untuk melihat &rarr;</span>
          </div>

          <div className="flex gap-3.5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none">
            {/* Card 1: Kapal Perintis */}
            <article className="w-[82vw] max-w-[305px] shrink-0 snap-start bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-primary-950 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Ship size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-900 leading-tight">
                      Kapal Perintis
                    </h3>
                    <span className="text-[11px] text-neutral-500">Malaakoni & Baai</span>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="mt-4 bg-surface-50/80 rounded-xl p-3 border border-neutral-100/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                    <span>Pel. Baai</span>
                    <span className="text-neutral-400">&rarr;</span>
                    <span>Pel. Malaakoni</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-200/50 pt-2">
                    <span className="flex items-center gap-1.5"><Clock3 size={12} className="text-primary-800" /> &plusmn; 12 - 14 Jam</span>
                    <span className="font-medium text-neutral-700">2x Seminggu</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">Estimasi Tarif</span>
                  <span className="text-sm font-extrabold text-neutral-900">&plusmn; Rp 30.000</span>
                </div>
                <a
                  href="https://www.easybook.com/id-id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg bg-primary-950 text-white text-xs font-semibold shadow-xs hover:bg-primary-900 active:scale-95 transition-all"
                >
                  Pesan Tiket
                </a>
              </div>
            </article>

            {/* Card 2: Ferry ASDP */}
            <article className="w-[82vw] max-w-[305px] shrink-0 snap-start bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-accent-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Ship size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-900 leading-tight">
                      Ferry ASDP
                    </h3>
                    <span className="text-[11px] text-neutral-500">Kahyapu & Baai</span>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="mt-4 bg-surface-50/80 rounded-xl p-3 border border-neutral-100/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                    <span>Pel. Baai</span>
                    <span className="text-neutral-400">&rarr;</span>
                    <span>Pel. Kahyapu</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-200/50 pt-2">
                    <span className="flex items-center gap-1.5"><Clock3 size={12} className="text-accent-600" /> &plusmn; 12 Jam</span>
                    <span className="font-medium text-neutral-700">Sel &amp; Jum</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">Estimasi Tarif</span>
                  <span className="text-sm font-extrabold text-neutral-900">&plusmn; Rp 75.000</span>
                </div>
                <a
                  href="tel:021191"
                  className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg bg-accent-500 text-white text-xs font-semibold shadow-xs hover:bg-accent-600 active:scale-95 transition-all"
                >
                  Info Jadwal
                </a>
              </div>
            </article>

            {/* Card 3: Susi Air */}
            <article className="w-[82vw] max-w-[305px] shrink-0 snap-start bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Plane size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-neutral-900 leading-tight">
                      Susi Air
                    </h3>
                    <span className="text-[11px] text-neutral-500">Penerbangan Perintis</span>
                  </div>
                </div>

                {/* Route Visualizer */}
                <div className="mt-4 bg-surface-50/80 rounded-xl p-3 border border-neutral-100/80">
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-800">
                    <span>Fatmawati</span>
                    <span className="text-neutral-400">&rarr;</span>
                    <span>Enggano</span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500 border-t border-neutral-200/50 pt-2">
                    <span className="flex items-center gap-1.5"><Clock3 size={12} className="text-sky-600" /> &plusmn; 45 Menit</span>
                    <span className="font-medium text-neutral-700">Sel &amp; Kam</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-medium">Estimasi Tarif</span>
                  <span className="text-sm font-extrabold text-neutral-900">&plusmn; Rp 450.000</span>
                </div>
                <a
                  href="https://susiair.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-8 px-3.5 rounded-lg bg-sky-600 text-white text-xs font-semibold shadow-xs hover:bg-sky-700 active:scale-95 transition-all"
                >
                  Pesan Tiket
                </a>
              </div>
            </article>

            {/* Trailing Spacer for scroll padding */}
            <div className="w-1.5 shrink-0" aria-hidden="true" />
          </div>
        </div>

        {/* Desktop View: 3 Distinct Static Cards Grid (≥ md) */}
        <div className="mt-10 hidden md:grid md:grid-cols-3 gap-8 items-stretch">

          {/* Card 1: Kapal Perintis */}
          <article className="group hover-lift overlay-glow reveal-up flex flex-col justify-between bg-white p-7 shadow-sm ring-1 ring-neutral-200/80 rounded-2xl" style={{ '--reveal-delay': '140ms' }}>
            <div>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-primary-950 text-white rounded-xl shrink-0">
                  <Ship size={22} />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">
                  Kapal Perintis
                </h3>
              </div>

              <p className="mt-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                Pelayaran kapal niaga perintis menghubungkan Pelabuhan Pulau Baai (Bengkulu) dengan Pelabuhan Malaakoni (Enggano). Cocok untuk perjalanan ekonomis tanpa pengangkutan kendaraan.
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
                <span className="text-xl font-extrabold text-neutral-900">± Rp 30.000</span>
              </div>
              <a
                href="https://www.easybook.com/id-id"
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
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-accent-500 text-white rounded-xl shrink-0">
                  <Ship size={22} />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">
                  Ferry ASDP
                </h3>
              </div>

              <p className="mt-4 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">
                Kapal Ferry resmi ASDP yang melayani penyeberangan reguler penumpang dan kendaraan dari Pelabuhan Baai (Bengkulu) ke Kahyapu (Enggano).
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
                <span className="text-xl font-extrabold text-neutral-900">± Rp 75.000</span>
              </div>
              <a
                href="tel:021191"
                className="hover-lift inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase"
              >
                <span>Call Center 021191</span>
                <Ship size={14} />
              </a>
            </div>
          </article>

          {/* Card 3: Susi Air */}
          <article className="group hover-lift overlay-glow reveal-up flex flex-col justify-between bg-white p-7 shadow-sm ring-1 ring-neutral-200/80 rounded-2xl" style={{ '--reveal-delay': '260ms' }}>
            <div>
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center bg-sky-600 text-white rounded-xl shrink-0">
                  <Plane size={22} />
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-neutral-900 leading-tight">
                  Susi Air
                </h3>
              </div>

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
                <span className="text-xl font-extrabold text-neutral-900">± Rp 450.000</span>
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
        <div className="reveal-up mt-6 sm:mt-10 flex items-start gap-2.5 sm:gap-3 bg-primary-50 px-3.5 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm leading-relaxed text-neutral-700 ring-1 ring-primary-100 rounded-xl" style={{ '--reveal-delay': '320ms' }}>
          <Info size={16} className="mt-0.5 shrink-0 text-primary-700" />
          <p>
            *<strong>Informasi Penting:</strong> Jadwal keberangkatan dan tarif tiket sewaktu-waktu dapat berubah tergantung pada kondisi cuaca dan gelombang di Samudera Hindia. Klik tombol <strong>"PESAN / INFO"</strong> pada masing-masing moda untuk memeriksa jadwal terkini.
          </p>
        </div>
      </section>

      <section id="homestay" className="bg-white">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-10 sm:py-16 md:py-24">
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="reveal-up max-w-3xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                Homestay Directory
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
                Pilihan akomodasi homestay bersama warga lokal untuk pengalaman tinggal yang hangat dan autentik di Pulau Enggano.
              </p>
            </div>

            {/* Filter buttons — scrollable on mobile without jumping or shifting */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap">
              {villages.map(village => {
                const active = village === selectedVillage

                return (
                  <button
                    key={village}
                    type="button"
                    onClick={() => setSelectedVillage(village)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold whitespace-nowrap rounded-full transition-colors active:scale-95 cursor-pointer ${
                      active
                        ? 'bg-primary-950 text-white border border-primary-950 shadow-xs'
                        : 'bg-surface-50 text-neutral-700 border border-neutral-200/80 hover:bg-neutral-100 hover:text-neutral-900'
                    }`}
                  >
                    {village}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Homestay Grid — 2 Kolom di Mobile ala Traveloka / Airbnb */}
          <div className="mt-6 sm:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {!visibleHomestays.length && selectedVillage === 'All Villages' && (
              <div className="col-span-2 xl:col-span-3 bg-surface-50 px-5 py-4 text-sm text-neutral-600 ring-1 ring-neutral-200">
                Data homestay belum tersedia di admin.
              </div>
            )}

            {visibleHomestays.map(homestay => (
              <Link
                key={homestay.id}
                href={`/accommodations/${homestay.id}`}
                className="group hover-lift overlay-glow reveal-up overflow-hidden rounded-xl sm:rounded-none bg-surface-50 shadow-sm ring-1 ring-neutral-200/70 flex flex-col justify-between h-full"
                style={{ '--reveal-delay': '160ms' }}
              >
                <div className="flex-1 flex flex-col">
                  <div className="relative overflow-hidden">
                    {homestay.image ? (
                      <img
                        src={homestay.image}
                        alt={homestay.name}
                        className="media-zoom aspect-[4/3] w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center bg-neutral-100 text-xs sm:text-sm font-medium text-neutral-400">
                        Foto belum tersedia
                      </div>
                    )}
                  </div>

                  <div className="p-2.5 sm:p-4 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-sm sm:text-xl md:text-3xl font-semibold text-neutral-900 line-clamp-1 leading-snug">
                        {homestay.name}
                      </h3>

                      <div className="mt-1 sm:mt-2.5 flex items-center gap-2 text-[10px] sm:text-sm text-neutral-500 truncate">
                        <span className="inline-flex items-center gap-1 font-medium text-neutral-700">
                          <MapPin size={13} className="shrink-0 text-accent-500" />
                          <span className="truncate">{homestay.village}</span>
                        </span>
                        {homestay.owner && (
                          <>
                            <span className="text-neutral-300">•</span>
                            <span className="inline-flex items-center gap-1 truncate text-neutral-500">
                              <UserRound size={13} className="shrink-0 text-neutral-400" />
                              <span className="truncate">{homestay.owner}</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <ul className="hidden md:block mt-5 space-y-3 text-sm text-neutral-600">
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
                  </div>
                </div>

                <div className="p-2.5 pt-0 sm:p-4 sm:pt-0 md:p-6 md:pt-0">
                  <div className="flex items-end justify-between gap-1 sm:gap-4 border-t border-neutral-200/80 pt-2 sm:pt-5">
                    <div className="min-w-0">
                      <p className="text-[8px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500">
                        Mulai Dari
                      </p>
                      <p className="mt-0.5 sm:mt-2 text-xs sm:text-lg md:text-2xl font-bold text-neutral-900 truncate">{homestay.price}</p>
                    </div>
                    {homestay.whatsapp_number && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(`https://wa.me/${homestay.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik menginap di ${homestay.name}`)}`, '_blank')
                        }}
                        aria-label={`Hubungi ${homestay.name}`}
                        className="hover-lift shrink-0 inline-flex h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11 items-center justify-center rounded-lg sm:rounded-none bg-accent-500 text-white hover:bg-accent-600"
                      >
                        <MessageCircle size={13} className="sm:hidden" />
                        <MessageCircle size={18} className="hidden sm:inline" />
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
