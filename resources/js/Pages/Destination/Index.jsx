import { ChevronLeft, ChevronRight, X, Download, Map, Eye } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import PageHeader from '../../Components/PageHeader'
import SeoHead from '../../Components/SeoHead'


const fallbackDestinations = [
  {
    id: 1,
    slug: 'destinasi-bahari',
    name: 'Destinasi Bahari',
    tag: 'BAHARI',
    short_description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    slug: 'hutan-endemik',
    name: 'Hutan Endemik',
    tag: 'WILDLIFE',
    short_description: 'Paru-paru pulau yang menyimpan flora dan fauna langka serta petualangan alam yang liar dan memukau.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    slug: 'warisan-enam-suku',
    name: 'Warisan Enam Suku',
    tag: 'HISTORY',
    short_description: 'Lapisan sejarah, adat tradisi, dan artefak kebudayaan asli pulau yang membentuk identitas Enggano.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function DestinationIndex({ destinations = [], selectedType = null }) {
  const items = useMemo(() => {
    if (!destinations || destinations.length === 0) return fallbackDestinations

    return destinations.map((item, idx) => ({
      id: item.id || idx + 1,
      slug: item.slug,
      name: item.name,
      tag: item.type ? item.type.toUpperCase() : 'DESTINASI',
      short_description: item.short_description || item.description || 'Jelajahi keindahan alam dan kebudayaan Pulau Enggano.',
      image: item.image || fallbackDestinations[idx % fallbackDestinations.length].image,
    }))
  }, [destinations])

  const qrTargetUrl = 'https://www.google.com/maps/d/viewer?mid=1AO0IZMyY83BGzK2OW7gaCDFDi-Tu7Yo&hl=id'
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(qrTargetUrl)}`

  const itineraryPosters = [
    {
      id: 1,
      tag: 'Itinerary 01',
      title: 'Trekking Mangrove',
      description: 'Jelajahi ekosistem mangrove Kahyapu yang asri dan edukatif bersama pemandu lokal.',
      image: '/storage/destinations/itenerary/mangrove.png',
      fallback: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80',
      file: '/storage/destinations/itenerary/mangrove.png',
    },
    {
      id: 2,
      tag: 'Itinerary 02',
      title: 'Paket Wisata Enggano',
      description: 'Paket lengkap kunjungi destinasi ikonik Pulau Enggano selama 3 hari 2 malam.',
      image: '/storage/destinations/itenerary/paket.png',
      fallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
      file: '/storage/destinations/itenerary/paket.png',
    },
    {
      id: 3,
      tag: 'Itinerary 03',
      title: 'Fullday Pulau Duo',
      description: 'Pengalaman seharian menjelajahi eksotika Pulau Duo dan sekitarnya.',
      image: '/storage/destinations/itenerary/pulau-duo.png',
      fallback: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=80',
      file: '/storage/destinations/itenerary/pulau-duo.png',
    },
  ]



  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxSrc, setLightboxSrc] = useState('')

  const openPosterLightbox = (idx) => {
    const poster = itineraryPosters[idx]
    setLightboxIndex(idx)
    setLightboxSrc(poster.image)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setLightboxSrc('')
  }

  const lightboxPrev = () => {
    const newIdx = lightboxIndex === 0 ? itineraryPosters.length - 1 : lightboxIndex - 1
    openPosterLightbox(newIdx)
  }
  const lightboxNext = () => {
    const newIdx = lightboxIndex === itineraryPosters.length - 1 ? 0 : lightboxIndex + 1
    openPosterLightbox(newIdx)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, lightboxIndex])


  const maxItineraryIndex = itineraryPosters.length - 1

  return (
    <>
      <SeoHead
        title="Destinasi Wisata Pulau Enggano"
        description="Temukan destinasi bahari, hutan, dan budaya di Pulau Enggano. Peta wisata, itinerary, dan rekomendasi tempat yang bisa dikunjungi."
      />

      {/* Hero PageHeader */}
      <PageHeader
        pageKey="destinations"
        background={items[0]?.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'}
      />

      {/* 1. Integrated Header: Destinasi Unggulan & Quick Map Access */}
      <section className="w-full pt-10 md:pt-24 pb-6 md:pb-12">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
          <div className="reveal-up flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-14">

            {/* Kiri: Heading */}
            <div className="max-w-xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
                Jelajahi Enggano
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <p className="mt-3.5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                Temukan pesona pantai eksotis, kearifan adat suku asli, dan keindahan bahari tak terjamah. Ada{' '}
                <span className="font-bold text-slate-800">{items.length} destinasi pilihan</span> siap Anda jelajahi.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href={qrTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-2 text-sm font-semibold text-amber-800 shadow-xs hover:bg-amber-100 transition-all duration-300 active:scale-95"
                >
                  <Map size={15} />
                  Buka Peta di Browser
                </a>
              </div>
            </div>

            {/* Kanan: QR Code — hidden di mobile, tampil di lg+ */}
            <div className="hidden lg:flex shrink-0 justify-end lg:mr-8 xl:mr-16">
              <div className="w-64 sm:w-72 rounded-3xl bg-white border border-slate-200/80 p-5 shadow-[0_15px_35px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/5 transition-transform duration-300 hover:-translate-y-1">
                <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100/80">
                  <img
                    src={qrImageUrl}
                    alt="QR Code Peta Wisata Pulau Enggano"
                    className="w-full aspect-square object-contain rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="mt-3.5 text-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Peta Wisata Enggano</h3>
                  <p className="mt-0.5 text-[11px] text-slate-400">Arahkan kamera HP ke QR di atas</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Zigzag editorial panels (dengan ambient background tiap destinasi) */}
      {items.map((item, index) => {
        const isEven = index % 2 === 0
        const panelPhoto = item.image || fallbackDestinations[index % fallbackDestinations.length].image

        return (
          <section
            key={item.id || `feat-${index}`}
            className="group/section relative w-full py-0 overflow-hidden"
          >
            {/* Ambient backdrop dari foto destinasi */}
            <div className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0 bg-[#f8f7f2]">
              <img
                src={panelPhoto}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-center opacity-[0.11] sm:opacity-[0.14] mix-blend-multiply transition-all duration-700 ease-out group-hover/section:scale-105 group-hover/section:opacity-[0.18]"
              />
              {/* Gradien pemudar halus di atas dan bawah agar transisi antar section mulus */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f2] via-transparent to-[#f8f7f2]" />
            </div>

            <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
              <a
                href={`/destinations/${item.slug ?? '#'}`}
                className={`reveal-up group relative flex items-center gap-0 py-6 sm:py-12 md:py-16 lg:py-24 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                {/* Giant watermark number — desktop only */}
                <span
                  className={`pointer-events-none absolute select-none font-display font-black text-[160px] md:text-[240px] leading-none text-slate-900/[0.04] group-hover:text-amber-500/[0.08] transition-colors duration-700 ${
                    isEven ? 'right-2 bottom-0' : 'left-2 bottom-0'
                  }`}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Image block with identical 4:3 ratio */}
                <div className="relative w-[48%] sm:w-[48%] lg:w-[52%] shrink-0 aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-slate-200 shadow-md sm:shadow-xl shadow-slate-900/15">
                  <img
                    src={panelPhoto}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Number watermark on image */}
                  <span className="absolute bottom-1.5 right-2 sm:bottom-3 sm:right-4 lg:hidden font-display font-black text-3xl sm:text-5xl leading-none text-white/20 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Text block */}
                <div
                  className={`relative flex flex-col justify-center flex-1 min-w-0 z-10 lg:pt-0 ${
                    isEven
                      ? 'pl-3 sm:pl-6 lg:pl-0 lg:order-2 lg:pl-14 xl:pl-20'
                      : 'pr-3 sm:pr-6 lg:pr-0 lg:order-1 lg:pr-14 xl:pr-20'
                  }`}
                >
                  <div className="hidden lg:block overflow-hidden mb-8">
                    <div className="h-[3px] w-10 rounded-full bg-amber-400 transition-all duration-500 ease-out group-hover:w-20" />
                  </div>

                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-amber-500 font-black mb-1 sm:mb-2 lg:hidden">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  <h3 className="font-display text-base sm:text-2xl md:text-4xl xl:text-[2.85rem] font-semibold text-slate-900 tracking-tight leading-[1.15] transition-colors duration-300 group-hover:text-amber-900 line-clamp-2 sm:line-clamp-none">
                    {item.name}
                  </h3>

                  <p className="hidden sm:block mt-3 sm:mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-500 line-clamp-3">
                    {item.short_description || item.description || 'Jelajahi keindahan alam dan kebudayaan Pulau Enggano yang menakjubkan.'}
                  </p>

                  <div className="mt-3 sm:mt-8">
                    <span className="inline-flex items-center gap-1.5 sm:gap-2.5 rounded-lg sm:rounded-xl bg-slate-900 group-hover:bg-amber-600 px-3 sm:px-5 lg:px-7 py-2 sm:py-3 lg:py-3.5 text-[10px] sm:text-xs lg:text-sm font-bold text-white uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-all duration-300 shadow-md sm:shadow-lg">
                      Jelajahi
                      <ChevronRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Section divider */}
            {index < items.length - 1 && (
              <div className="relative z-10 mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent" />
              </div>
            )}
          </section>
        )
      })}

      {/* 3. Itinerary Posters Section — Poster Gallery */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">

          {/* Header */}
          <div className="reveal-up max-w-2xl mb-8 sm:mb-14 md:mb-18">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-tight">
              Paket Wisata Enggano
            </h2>
            <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
            <p className="mt-3.5 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
              Pilih paket terbaik bersama pemandu lokal. Ketuk poster untuk pratinjau dan unduh.
            </p>
          </div>

          {/* Poster Grid — 2 kolom di mobile (poster ke-3 di tengah), 3 kolom di desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 md:gap-8">
            {itineraryPosters.map((poster, idx) => (
              <div
                key={poster.id}
                className={`reveal-up group relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-100 shadow-md sm:shadow-xl shadow-slate-200/70 ring-1 ring-slate-200/80 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-200/40 hover:ring-2 hover:ring-amber-400/60 ${
                  idx === 2 ? 'col-span-2 max-w-[calc(50%-0.5rem)] sm:max-w-[calc(50%-0.875rem)] lg:max-w-none mx-auto w-full lg:col-span-1' : ''
                }`}
                style={{ '--reveal-delay': `${80 + idx * 130}ms` }}
                onClick={() => openPosterLightbox(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Buka poster ${poster.title}`}
                onKeyDown={(e) => e.key === 'Enter' && openPosterLightbox(idx)}
              >
                {/* Poster Image */}
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="absolute inset-0 h-full w-full object-contain bg-white transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fb) {
                      e.currentTarget.dataset.fb = '1'
                      e.currentTarget.onerror = null
                      e.currentTarget.src = poster.fallback
                      e.currentTarget.classList.remove('object-contain')
                      e.currentTarget.classList.add('object-cover')
                    }
                  }}
                />

                {/* Mobile: always-visible bottom bar with actions */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-2 px-2 sm:hidden">
                  <p className="text-[9px] font-bold text-white/90 uppercase tracking-wider truncate">{poster.title}</p>
                  <div className="mt-1.5 flex gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); openPosterLightbox(idx) }}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-white/20 backdrop-blur-sm py-1 text-[10px] font-semibold text-white"
                    >
                      <Eye size={10} /> Lihat
                    </button>
                    <a
                      href={poster.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-amber-500/80 backdrop-blur-sm py-1 text-[10px] font-semibold text-white"
                    >
                      <Download size={10} /> Unduh
                    </a>
                  </div>
                </div>

                {/* Desktop: hover glassmorphism overlay */}
                <div className="hidden sm:block absolute inset-x-0 bottom-0 z-20 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                  <div className="m-3 rounded-2xl border border-white/20 bg-white/80 p-5 shadow-lg backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">{poster.tag}</p>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-slate-900 leading-snug">{poster.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{poster.description}</p>
                    <div className="mt-4 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); openPosterLightbox(idx) }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
                      >
                        <Eye size={13} /> Pratinjau
                      </button>
                      <a
                        href={poster.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Download size={13} /> Unduh
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Lightbox for Poster Itinerary */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Tutup poster"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 hover:border-white/30"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              lightboxPrev()
            }}
            aria-label="Poster sebelumnya"
            className="hidden md:flex absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur items-center justify-center transition-all border border-white/15 hover:border-white/30"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              lightboxNext()
            }}
            aria-label="Poster berikutnya"
            className="hidden md:flex absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur items-center justify-center transition-all border border-white/15 hover:border-white/30"
          >
            <ChevronRight size={24} />
          </button>

          <div
            className="relative flex flex-col items-center max-h-[94vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.7)] ring-1 ring-white/15 flex items-center justify-center">
              <img
                src={lightboxSrc}
                alt={itineraryPosters[lightboxIndex]?.title || 'Poster Itinerary'}
                className="max-h-[72vh] sm:max-h-[76vh] w-auto max-w-[88vw] object-contain block"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb) {
                    e.currentTarget.dataset.fb = '1'
                    e.currentTarget.onerror = null
                    e.currentTarget.src = itineraryPosters[lightboxIndex]?.fallback
                  }
                }}
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left max-w-xl w-full px-2">
              <div className="text-white/90 text-sm md:text-base">
                <span className="uppercase tracking-[0.2em] text-accent-400 text-xs font-semibold">
                  {itineraryPosters[lightboxIndex]?.tag}
                </span>
                <h3 className="mt-0.5 font-display text-lg md:text-2xl font-semibold">
                  {itineraryPosters[lightboxIndex]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 mt-0.5 line-clamp-1">
                  {itineraryPosters[lightboxIndex]?.description}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={itineraryPosters[lightboxIndex]?.file || itineraryPosters[lightboxIndex]?.fallback}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:bg-accent-50 hover:text-accent-700 transition-colors"
                >
                  <Download size={15} />
                  Unduh Poster
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}
