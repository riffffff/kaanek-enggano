import { Head, Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Download } from 'lucide-react'
import { useMemo, useRef, useState, useEffect } from 'react'

const fallbackDestinations = [
  {
    id: 1,
    slug: 'destinasi-bahari',
    name: 'Destinasi Bahari',
    tag: 'BAHARI',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    slug: 'hutan-endemik',
    name: 'Hutan Endemik',
    tag: 'WILDLIFE',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka serta petualangan alam yang liar dan memukau.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    slug: 'warisan-enam-suku',
    name: 'Warisan Enam Suku',
    tag: 'HISTORY',
    description: 'Lapisan sejarah, adat tradisi, dan artefak kebudayaan asli pulau yang membentuk identitas Enggano.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
  },
]

export default function DestinationIndex({ destinations = [], selectedType = null }) {
  const items = useMemo(() => {
    if (!destinations || destinations.length === 0) return fallbackDestinations

    return destinations.map((item, idx) => {
      const tagLabel = item.type ? item.type.toUpperCase() : 'DESTINASI'
      const imageSrc = item.image || fallbackDestinations[idx % fallbackDestinations.length].image
      return {
        id: item.id || idx + 1,
        slug: item.slug,
        name: item.name,
        tag: tagLabel,
        description: item.short_description || item.description || 'Jelajahi keindahan alam dan kebudayaan Pulau Enggano.',
        image: imageSrc,
      }
    })
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

  const [itineraryScrollIndex, setItineraryScrollIndex] = useState(0)
  const itineraryContainerRef = useRef(null)
  const itinerarySectionRef = useRef(null)

  const [showAllDestinations, setShowAllDestinations] = useState(false)
  const toggleDestinations = () => setShowAllDestinations(prev => !prev)

  const visibleDestinations = showAllDestinations ? items : items.slice(0, 6)

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

  const getVisibleCount = (ref) => {
    if (!ref?.current) return 1
    const card = ref.current.querySelector('.scroll-card-item')
    if (!card) return 1
    const cardWidth = card.getBoundingClientRect().width
    const containerWidth = ref.current.clientWidth
    const gap = 24
    const perPage = cardWidth + gap
    const visible = Math.max(1, Math.floor((containerWidth + gap) / perPage))
    return visible
  }

  const getScrollIndex = (ref, itemsArr) => {
    if (!ref?.current) return 0
    const card = ref.current.querySelector('.scroll-card-item')
    if (!card) return 0
    const cardWidth = card.getBoundingClientRect().width
    const gap = 24
    const perPage = cardWidth + gap
    const scrollLeft = ref.current.scrollLeft
    const visible = getVisibleCount(ref, itemsArr)
    const idx = Math.round(scrollLeft / perPage)
    const maxIndex = Math.max(0, itemsArr.length - visible)
    return Math.min(Math.max(0, idx), maxIndex)
  }

  const scrollContainer = (ref, direction, setter, itemsArr) => {
    if (!ref.current) return
    const card = ref.current.querySelector('.scroll-card-item')
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width
    const gap = 24
    const perPage = cardWidth + gap
    const currentIdx = getScrollIndex(ref, itemsArr)
    const visible = getVisibleCount(ref)
    const maxIndex = Math.max(0, itemsArr.length - visible)
    const newIndex = direction === 'left'
      ? Math.max(0, currentIdx - 1)
      : Math.min(maxIndex, currentIdx + 1)
    setter(newIndex)
    const newScroll = newIndex * perPage
    ref.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    })
  }

  const handleItineraryScroll = () => {
    const idx = getScrollIndex(itineraryContainerRef, itineraryPosters)
    if (idx !== itineraryScrollIndex) setItineraryScrollIndex(idx)
  }

  return (
    <>
      <Head title="Destinations" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={items[0]?.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'}
          alt="Destinasi Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Destinasi
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              Jelajahi Keindahan Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Temukan destinasi terbaik yang menawarkan keindahan alam, budaya, dan pengalaman tak terlupakan di Pulau Enggano.
            </p>
          </div>
        </div>
      </section>

      {/* 1. QR Code Section - FULL WIDTH + QR DI TENGAH */}
      <section className="w-full px-6 py-16 md:px-12 lg:px-20 pb-0">
        <div className="max-w-none">
          {/* Title Center */}
          <div className="reveal-up max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700 font-semibold">
              Peta Wisata Pulau Enggano
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Scan untuk Buka Peta Wisata
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Pindai QR code ini untuk membuka peta wisata Pulau Enggano langsung di ponsel Anda.
            </p>
          </div>

          {/* QR Card DI TENGAH - TIDAK ADA KOLOM KIRI */}
          <div className="reveal-up mx-auto w-full max-w-md" style={{ '--reveal-delay': '120ms' }}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-100">
                <div className="mx-auto flex aspect-square w-full max-w-72 items-center justify-center rounded-2xl bg-white p-5 shadow-sm">
                  <img
                    src={qrImageUrl}
                    alt="QR Code Peta Wisata Pulau Enggano"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                    Peta Wisata Pulau Enggano
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Arahkan kamera HP ke QR code di atas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destinations List Section - BENTO GRID 4 KOLOM (sesuai mockup) */}
      <section className="w-full py-16 md:py-24">
        <div className="w-full px-6 md:px-12 lg:px-20 max-w-none">
          {/* Bento Grid - Responsive fallback ke 2 kolom di mobile */}
          <div className="grid gap-5 md:gap-6 lg:gap-7 grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 max-w-none w-full">
            {/* ==== POSISI 1 (BARIS 1 KOLOM 1): TITLE CARD - TRANSPARAN (NYATU BG UTAMA) */}
            <div className="reveal-up aspect-[3/4] relative overflow-hidden p-8 md:p-9 lg:p-11 flex flex-col justify-center bg-transparent ring-0 shadow-none border-0">
              <div className="bg-transparent">
                <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-primary-700 font-semibold">
                  Destinasi Unggulan
                </p>
                <h2 className="mt-5 md:mt-7 font-display text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.1rem] font-semibold tracking-tight text-slate-900 leading-[1.12]">
                  Jelajahi Destinasi Enggano
                </h2>
                <p className="mt-5 md:mt-6 text-sm md:text-base lg:text-lg leading-relaxed text-slate-600">
                  Temukan setiap sudut keindahan Pulau Enggano dari pantai berpasir putih hingga hutan endemik yang asri. Total{' '}
                  <span className="font-bold text-primary-700">{items.length}</span>{' '}
                  destinasi siap dijelajahi.
                </p>
              </div>
            </div>

            {/* ==== DESTINATION CARDS (6 pertama / SEMUA sesuai state showAll) */}
            {visibleDestinations.map((item, index) => (
              <Link
                key={item.id || `dest-${index}`}
                href={`/destinations/${item.slug}`}
                className="group reveal-up aspect-[3/4] relative overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
                style={{ '--reveal-delay': `${120 + index * 70}ms` }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-800 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute top-4 md:top-5 left-4 md:left-5">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] md:text-[10px] lg:text-xs font-bold uppercase tracking-[0.22em] px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-sm">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 lg:p-6 text-white">
                  <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-tight drop-shadow-lg mb-1.5 md:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-[11px] md:text-xs leading-relaxed text-white/85 line-clamp-2 mb-2 md:mb-3 drop-shadow-md">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 md:gap-2 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                    <span>Jelajahi</span>
                    <ChevronRight size={13} className="md:w-[15px] md:h-[15px] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}

            {/* ==== TOGGLE CTA: Selengkapnya / Sembunyikan Sebagian (hanya jika destinasi > 6) ==== */}
            {items.length > 6 && (
              <button
                type="button"
                onClick={toggleDestinations}
                aria-label={showAllDestinations ? 'Sembunyikan sebagian destinasi' : 'Tampilkan semua destinasi'}
                className="reveal-up aspect-[3/4] relative overflow-hidden flex flex-col items-center justify-center text-slate-700 hover:text-primary-700 cursor-pointer p-6 md:p-7 group bg-transparent ring-0 shadow-none border-0"
              >
                <div className="flex flex-col items-center justify-center text-center gap-4 md:gap-5">
                  {showAllDestinations ? (
                    <ChevronUp size={34} className="md:w-12 md:h-12 transition-transform group-hover:-translate-y-1" strokeWidth={2} />
                  ) : (
                    <ChevronDown size={34} className="md:w-12 md:h-12 transition-transform group-hover:translate-y-1" strokeWidth={2} />
                  )}
                  <div className="font-semibold tracking-wide text-lg md:text-xl xl:text-2xl font-display">
                    {showAllDestinations ? 'Sembunyikan Sebagian' : 'Selengkapnya'}
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Itinerary Posters Section - FULL WIDTH */}
      <section ref={itinerarySectionRef} className="w-full bg-[#f8f7f4] py-16 md:py-24 overflow-hidden">
  <div className="w-full px-6 md:px-12 lg:px-20 max-w-none">
    <div className="flex flex-col gap-10 lg:gap-12 items-center text-center">

      {/* Bagian Judul & Deskripsi (Rata Tengah) */}
      <div className="reveal-up w-full max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-[0.35em] text-accent-700 font-semibold">
          Paket & Itinerary
        </p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.1]">
          Paket Wisata Enggano
        </h2>
        <p className="mt-5 text-base md:text-lg leading-8 text-slate-600">
          Pilih paket pengalaman terbaik untuk menjelajahi setiap sudut keindahan Pulau Enggano dengan pemandu lokal.
          Klik poster untuk melihat detail lebih jelas.
        </p>
      </div>

      {/* Bagian Poster/Cards (Rata Tengah) */}
      <div
        ref={itineraryContainerRef}
        onScroll={handleItineraryScroll}
        className="w-full flex gap-6 overflow-x-auto justify-center md:justify-center snap-x snap-mandatory pb-4 scrollbar-hide px-4"
      >
        {itineraryPosters.map((poster, idx) => (
          <button
            type="button"
            key={poster.id}
            onClick={() => openPosterLightbox(idx)}
            aria-label={`Buka poster ${poster.title}`}
            className="scroll-card-item group reveal-up shrink-0 snap-start w-[88%] sm:w-[65%] md:w-[50%] lg:w-[33%] xl:w-[28%] aspect-[3/4] relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-slate-200/60 bg-white cursor-zoom-in hover:ring-primary-300 transition-all duration-500 text-left"
            style={{ '--reveal-delay': `${100 + idx * 120}ms` }}
          >
            <img
              src={poster.image}
              alt={poster.title}
              className="absolute inset-0 w-full h-full object-contain bg-white transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-[1.02]"
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
            <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-inset ring-primary-400/50 rounded-2xl transition-all duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

    </div>
  </div>
</section>

      {/* Lightbox for Poster Itinerary - KLIK POSTER TIDAK MUNCUL KODE PNG LAGI! */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" role="dialog" aria-modal="true">
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
            onClick={lightboxPrev}
            aria-label="Poster sebelumnya"
            className="hidden md:flex absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur items-center justify-center transition-all border border-white/15 hover:border-white/30"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={lightboxNext}
            aria-label="Poster berikutnya"
            className="hidden md:flex absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur items-center justify-center transition-all border border-white/15 hover:border-white/30"
          >
            <ChevronRight size={24} />
          </button>

          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <img
                src={lightboxSrc}
                alt={itineraryPosters[lightboxIndex]?.title || 'Poster Itinerary'}
                className="max-h-[80vh] w-full object-contain bg-white"
                onError={(e) => {
                  if (!e.currentTarget.dataset.fb) {
                    e.currentTarget.dataset.fb = '1'
                    e.currentTarget.onerror = null
                    e.currentTarget.src = itineraryPosters[lightboxIndex]?.fallback
                    e.currentTarget.classList.remove('object-contain')
                    e.currentTarget.classList.add('object-cover')
                  }
                }}
              />
            </div>

            <div className="mt-6 flex items-center gap-4 flex-wrap justify-center">
              <div className="text-white/90 text-sm md:text-base text-center md:text-left">
                <span className="uppercase tracking-[0.2em] text-white/60 text-xs font-semibold">
                  {itineraryPosters[lightboxIndex]?.tag}
                </span>
                <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold">
                  {itineraryPosters[lightboxIndex]?.title}
                </h3>
                <p className="text-sm text-white/70 mt-1">
                  {itineraryPosters[lightboxIndex]?.description}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={itineraryPosters[lightboxIndex]?.file || itineraryPosters[lightboxIndex]?.fallback}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold tracking-wide shadow-lg hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  <Download size={16} />
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
