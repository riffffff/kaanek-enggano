import { useState, useEffect, useMemo } from 'react'
import { Link, usePage } from '@inertiajs/react'
import {
  Play,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ExternalLink,
} from 'lucide-react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'
import Breadcrumb from '../../Components/Breadcrumb'
import SeoHead from '../../Components/SeoHead'

// Helper to check if file is video
const isVideo = (url) => {
  if (!url) return false
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi']
  return videoExtensions.some(ext => url.toLowerCase().includes(ext))
}

export default function DestinationShow({ destination, prev = null, next = null }) {
  const { seo } = usePage().props
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const hasCoordinates = Number.isFinite(Number(destination.lat)) && Number.isFinite(Number(destination.lng))
  const coordinateLabel = hasCoordinates
    ? `${Number(destination.lat).toFixed(6)}, ${Number(destination.lng).toFixed(6)}`
    : '-'

  const descriptionParagraphs = destination.description
    ? destination.description
        .split(/\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : []

  const editorialParagraphs = descriptionParagraphs.length
    ? descriptionParagraphs
    : [
        `${destination.name} menghadirkan lanskap terpencil dengan nuansa editorial yang kuat, jauh dari hiruk pikuk destinasi arus utama.`,
        `Perjalanan menuju ${destination.name} menjadi bagian dari pengalaman, melewati rute-rute alami Enggano yang masih terasa liar dan tenang.`,
        `Karakter tempat ini terletak pada perpaduan panorama, ritme komunitas lokal, dan sensasi ekspedisi yang membuat kunjungan terasa intim.`,
      ]

  const rawGallery = destination.gallery?.length
    ? destination.gallery.filter(Boolean)
    : [
        {
          id: 'fallback-1',
          type: 'image',
          url: destination.image ||
            'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: 'fallback-2',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        },
        {
          id: 'fallback-3',
          type: 'image',
          url: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
        },
      ]

  const galleryItems = rawGallery.map((item, idx) => {
    if (typeof item === 'string') {
      const isVid = isVideo(item)
      return {
        id: `g-${idx}`,
        type: isVid ? 'video' : 'image',
        url: item,
        url_medium: item,
        url_thumb: null,
      }
    }
    return {
      id: item.id || `g-${idx}`,
      type: item.type || (isVideo(item.url) ? 'video' : 'image'),
      url: item.url || item.src || item.path || item,
      url_medium: item.url_medium || item.url || item.src || item.path || item,
      url_thumb: item.url_thumb || item.thumb || null,
    }
  })

  const heroPhoto =
    destination.hero_image ||
    destination.background_image ||
    destination.image ||
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'

  const allMedia = useMemo(() => {
    return galleryItems.length > 0
      ? galleryItems
      : [
          {
            id: 'hero-media',
            type: 'image',
            url: heroPhoto,
            url_medium: heroPhoto,
          },
        ]
  }, [galleryItems, heroPhoto])

  const openLightbox = (index = 0) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const lightboxNext = () => {
    if (!allMedia.length) return
    setLightboxIndex((prev) => (prev + 1) % allMedia.length)
  }

  const lightboxPrev = () => {
    if (!allMedia.length) return
    setLightboxIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length)
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') lightboxNext()
      if (e.key === 'ArrowLeft') lightboxPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxOpen, allMedia.length])

  return (
    <>
      <SeoHead
        title={`${destination.name} — Destinasi Enggano`}
        description={
          destination.short_description ||
          `Jelajahi ${destination.name} di Pulau Enggano, destinasi wisata di garis terdepan Samudra Hindia.`
        }
        image={heroPhoto}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'TouristAttraction',
          name: destination.name,
          description:
            destination.short_description ||
            `Destinasi wisata ${destination.name} di Pulau Enggano.`,
          image: heroPhoto,
          url: seo?.url,
          geo:
            Number.isFinite(Number(destination.lat)) && Number.isFinite(Number(destination.lng))
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: Number(destination.lat),
                  longitude: Number(destination.lng),
                }
              : undefined,
        }}
      />

      {/* Spacer di mobile agar konten tidak tertutup fixed navbar h-20 */}
      <div className="h-20 md:hidden" />

      {/* Hero Section — Desktop Only (≥ md) */}
      <section className="relative hidden md:block overflow-hidden text-white">
        <img
          src={heroPhoto}
          alt={destination.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallbackSet) {
              e.currentTarget.dataset.fallbackSet = 'true'
              e.currentTarget.src =
                destination.background_image ||
                destination.image ||
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80'
            }
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-32 pt-48">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-3xl sm:text-5xl md:text-7xl font-semibold" style={{ '--reveal-delay': '120ms' }}>
              {destination.name}
            </h1>
            <div className="reveal-up mt-4 h-1 w-12 bg-accent-500 rounded-full" style={{ '--reveal-delay': '160ms' }} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pt-4 pb-16 sm:py-12 md:py-24">
        {/* Navigation Breadcrumb (Desktop) & Back Link (Mobile) */}
        <div className="reveal-up flex items-center justify-between gap-4 border-b border-neutral-200/60 pb-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'Destinasi', href: '/destinations' },
              { label: destination.name },
            ]}
          />
          <Link
            href="/destinations"
            className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-primary-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Destinasi</span>
          </Link>
          {destination.village && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-700 bg-accent-50 px-2.5 py-1 rounded-full shrink-0">
              {destination.village}
            </span>
          )}
        </div>

        {/* Mobile Magazine Hero Card (< md): Judul terpadu di dalam foto dengan gradien halus */}
        <div className="mt-4 md:hidden">
          <div
            className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 aspect-[16/11] bg-neutral-900 cursor-pointer group"
            onClick={() => openLightbox(0)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
            aria-label="Buka pratinjau foto utama"
          >
            <img
              src={heroPhoto}
              alt={destination.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Smooth dark gradient overlay at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Integrated Title & Accent Bar inside the card (tanpa badge kategori) */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 pointer-events-none">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-xs">
                {destination.name}
              </h1>
              <div className="mt-2.5 h-1 w-10 bg-accent-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Two Column Layout: Deskripsi & Sidebar Detail */}
        <div className="mt-6 sm:mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px] items-start">

          {/* Artikel Deskripsi */}
          <article className="reveal-up px-2 sm:px-0" style={{ '--reveal-delay': '100ms' }}>
            <div className="space-y-4 text-sm sm:text-base leading-7 sm:leading-[1.85] text-neutral-600 text-justify">
              {editorialParagraphs.map((paragraph, index) => (
                <p key={index} className="indent-8">{paragraph}</p>
              ))}
            </div>
          </article>

          {/* Sidebar Detail Destinasi (Simpel & Bersih) */}
          <aside className="rounded-2xl border border-neutral-200/80 bg-white p-5 sm:p-6 shadow-xs">
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
              Detail Destinasi
            </h3>

            <dl className="mt-4 divide-y divide-neutral-100 text-xs sm:text-sm">
              <div className="flex justify-between items-center gap-4 py-3 first:pt-1">
                <dt className="text-neutral-500">Tingkat Kesulitan</dt>
                <dd className="font-medium text-neutral-900 capitalize">{destination.difficulty_level || 'Mudah'}</dd>
              </div>

              <div className="flex justify-between items-center gap-4 py-3">
                <dt className="text-neutral-500">Estimasi Perjalanan</dt>
                <dd className="font-medium text-neutral-900">{destination.travel_time || '-'}</dd>
              </div>

              <div className="flex justify-between items-start gap-4 py-3">
                <dt className="text-neutral-500 shrink-0">Akses</dt>
                <dd className="font-medium text-neutral-900 text-right max-w-[200px] leading-snug">{destination.access_note || '-'}</dd>
              </div>

              <div className="flex justify-between items-center gap-4 py-3">
                <dt className="text-neutral-500">Koordinat</dt>
                <dd className="text-right">
                  {hasCoordinates ? (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${destination.lat},${destination.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-neutral-700 hover:text-primary-700 underline underline-offset-2 inline-flex items-center gap-1"
                    >
                      {coordinateLabel}
                      <ExternalLink size={11} className="text-neutral-400" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-neutral-400">-</span>
                  )}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {/* Galeri Foto Section — Sebaris 2 Foto di Mobile (Rasio 4:3), Klik Membuka Lightbox Preview */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-16 md:pb-24">
        <h2 className="reveal-up font-display text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
          Galeri Foto
        </h2>
        <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />

        <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {allMedia.map((item, index) => (
            <div
              key={item.id || `${item.url}-${index}`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              aria-label={`Buka foto ${index + 1}`}
              className={`group hover-lift reveal-up overflow-hidden rounded-xl sm:rounded-2xl bg-neutral-100 shadow-xs ring-1 ring-neutral-200/70 cursor-pointer active:scale-[0.98] transition-transform ${
                index >= 2 ? 'hidden md:block' : ''
              }`}
              style={{ '--reveal-delay': `${120 + index * 90}ms` }}
            >
              {item.type === 'video' ? (
                <div className="relative aspect-4/3">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover media-zoom pointer-events-none"
                    preload="metadata"
                    poster={item.url_thumb}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <Play className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="currentColor" />
                  </div>
                </div>
              ) : (
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={item.url_medium || item.url}
                    alt={`${destination.name} visual ${index + 1}`}
                    className="media-zoom aspect-4/3 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white">
                      <ZoomIn size={16} />
                    </div>
                  </div>
                  {index === 1 && allMedia.length > 2 && (
                    <div className="md:hidden absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      +{allMedia.length - 1}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Prev / Next navigation */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-16 md:pb-24">
        <PrevNext
          prev={prev ? { href: `/destinations/${prev.slug}`, title: prev.name } : null}
          next={next ? { href: `/destinations/${next.slug}`, title: next.name } : null}
          indexHref="/destinations"
          indexLabel="Semua Destinasi"
          prevLabel="Sebelumnya"
          nextLabel="Selanjutnya"
        />
      </section>

      {/* Lightbox Modal (Preview Layar Penuh seperti Itinerary) */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Tutup preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Prev Button */}
          {allMedia.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                lightboxPrev()
              }}
              aria-label="Media sebelumnya"
              className="absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next Button */}
          {allMedia.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                lightboxNext()
              }}
              aria-label="Media berikutnya"
              className="absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Media Container */}
          <div
            className="relative flex flex-col items-center max-h-[92vh] max-w-[94vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 flex items-center justify-center bg-black/40">
              {allMedia[lightboxIndex]?.type === 'video' ? (
                <video
                  src={allMedia[lightboxIndex]?.url}
                  className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-[88vw] object-contain block"
                  controls
                  autoPlay
                  playsInline
                  poster={allMedia[lightboxIndex]?.url_thumb}
                />
              ) : (
                <img
                  src={allMedia[lightboxIndex]?.url || allMedia[lightboxIndex]?.url_medium}
                  alt={`${destination.name} - ${lightboxIndex + 1}`}
                  className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-[88vw] object-contain block select-none"
                />
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="mt-3 flex items-center justify-between gap-4 text-white/90 text-xs sm:text-sm max-w-xl w-full px-2">
              <span className="font-semibold text-accent-400 truncate">
                {destination.name}
              </span>
              <span className="text-white/60 font-medium shrink-0">
                {lightboxIndex + 1} / {allMedia.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
