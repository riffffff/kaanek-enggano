import { useState, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import { Calendar, Clock, Newspaper, Share2, Tag, ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'
import Breadcrumb from '../../Components/Breadcrumb'

const imageByCategory = {
  lingkungan:
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80',
  digitalisasi:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  ekonomi:
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
  kesehatan:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
}

export default function KknLogShow({ item, prev = null, next = null }) {
  const contentParagraphs = item.content
    ? item.content
        .split(/\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : [
        'Warta dan catatan ini merangkum seluruh proses kerja lapangan, wawancara bersama warga, serta pengamatan intensif yang mewarnai dinamika di Pulau Enggano.',
        'Seluruh bentuk intervensi dan kegiatan dilaksanakan dengan prinsip partisipatif, menempatkan kearifan lokal serta suara warga suku sebagai pijakan utama.',
        'Hasil pengamatan di lapangan menegaskan pentingnya kesinambungan program, dokumentasi sejarah, serta penguatan jejaring lokal untuk kemajuan bersama.',
      ]

  const heroImage =
    item.image ??
    imageByCategory[item.category] ??
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const galleryList = item.gallery || []

  const openLightbox = (index = 0) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const lightboxNext = () => {
    if (!galleryList.length) return
    setLightboxIndex((prev) => (prev + 1) % galleryList.length)
  }

  const lightboxPrev = () => {
    if (!galleryList.length) return
    setLightboxIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length)
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
  }, [lightboxOpen, galleryList.length])

  return (
    <>
      <Head title={`${item.title} - Berita & Artikel Kaanek Enggano`} />

      {/* Spacer di mobile agar konten tidak tertutup fixed navbar h-20 */}
      <div className="h-20 md:hidden" />

      {/* Hero Section — Desktop Only (≥ md) */}
      <section className="relative hidden md:block overflow-hidden bg-primary-950 text-white">
        <img src={heroImage} alt={item.title} className="reveal-scale absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/40 via-primary-950/70 to-primary-950" />
        <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-20 pt-36">
          <Button
            href="/activities"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up"
          >
            Kembali ke Berita & Artikel
          </Button>
          <div className="mt-8">
            <h1 className="reveal-up font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-white" style={{ '--reveal-delay': '150ms' }}>
              {item.title}
            </h1>
            <div className="reveal-up mt-4 h-1 w-12 bg-accent-500 rounded-full" style={{ '--reveal-delay': '180ms' }} />

            <div className="reveal-up mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-5 text-sm text-neutral-300" style={{ '--reveal-delay': '230ms' }}>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-accent-500" /> {item.date}</span>
              {item.read_time && (
                <span className="flex items-center gap-2"><Clock size={16} className="text-accent-500" /> {item.read_time}</span>
              )}
              <span className="flex items-center gap-2"><Newspaper size={16} className="text-accent-500" /> Redaksi Kaanek Enggano</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pt-4 pb-14 sm:py-12 md:py-20">
        {/* Navigation Breadcrumb (Desktop) & Back Link (Mobile) */}
        <div className="reveal-up flex items-center justify-between gap-4 border-b border-neutral-200/60 pb-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'Aktivitas', href: '/activities' },
              { label: item.title },
            ]}
          />
          <Link
            href="/activities"
            className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-primary-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Aktivitas</span>
          </Link>
          {item.category && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent-700 bg-accent-50 px-2.5 py-1 rounded-full shrink-0">
              {item.category}
            </span>
          )}
        </div>

        {/* Mobile Title Block */}
        <div className="md:hidden mb-6">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
            {item.title}
          </h1>
          <div className="mt-3 h-0.5 w-10 bg-accent-500 rounded-full" />
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1"><Calendar size={12} className="text-neutral-400" /> {item.date}</span>
            {item.read_time && (
              <span className="flex items-center gap-1"><Clock size={12} className="text-neutral-400" /> {item.read_time}</span>
            )}
          </div>
        </div>

        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1fr)_220px] items-start">
          <article className="reveal-up min-w-0" style={{ '--reveal-delay': '160ms' }}>
            <figure className="mb-8 overflow-hidden rounded-2xl ring-1 ring-neutral-200/70">
              <img
                src={item.cover || item.image || heroImage}
                alt={`Cover: ${item.title}`}
                className="w-full object-cover aspect-video"
              />
            </figure>

            <div className="space-y-4 text-sm sm:text-base leading-7 sm:leading-8 text-neutral-700 text-justify">
              {contentParagraphs.map((paragraph, i) => (
                <p key={i} className="indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 pl-4 border-l-2 border-accent-400">
              <p className="text-sm sm:text-base italic leading-relaxed text-neutral-500">
                "Pemberdayaan dan publikasi mengenai Enggano adalah langkah nyata menjaga warisan budaya serta keanekaragaman hayati pulau terluar Indonesia."
              </p>
            </div>
          </article>

          {/* Sidebar Metadata — Desktop Only */}
          <aside className="hidden lg:flex flex-col gap-6 reveal-up" style={{ '--reveal-delay': '120ms' }}>
            <div className="pb-5 border-b border-neutral-100">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">Rubrik Warta</p>
              <p className="text-sm leading-relaxed text-neutral-500">
                Arsip berita resmi dan jurnal lapangan seputar Enggano.
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">Kategori</p>
              <span className="inline-block rounded-full bg-accent-50 text-accent-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                {item.category ?? 'artikel'}
              </span>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">Tanggal Rilis</p>
              <p className="text-sm font-semibold text-neutral-800">{item.date}</p>
            </div>
            {item.read_time && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">Waktu Baca</p>
                <p className="text-sm font-semibold text-neutral-800">{item.read_time}</p>
              </div>
            )}
          </aside>
        </div>

        {(item.gallery?.length > 0) && (
          <div className="mt-20 border-t border-neutral-200/80 pt-14">
            <div className="reveal-up max-w-3xl">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                Galeri {item.title}
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
                Foto-foto dokumentasi selama pelaksanaan aktivitas & kegiatan di lapangan.
              </p>
            </div>

            <div className="mt-6 sm:mt-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {item.gallery.map((image, index) => (
                <div
                  key={image.id || index}
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                  aria-label={`Buka foto ${index + 1}`}
                  className={`group hover-lift reveal-up overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-xs ring-1 ring-neutral-200/70 cursor-pointer active:scale-[0.98] transition-transform ${
                    index >= 2 ? 'hidden md:block' : ''
                  }`}
                  style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={image.url_medium || image.url}
                      alt={`Galeri ${item.title} - ${index + 1}`}
                      loading="lazy"
                      className="media-zoom aspect-4/3 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.fb) {
                          e.currentTarget.dataset.fb = '1'
                          e.currentTarget.src = image.url
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white">
                        <ZoomIn size={16} />
                      </div>
                    </div>
                    {index === 1 && item.gallery.length > 2 && (
                      <div className="md:hidden absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-sm sm:text-base">
                        +{item.gallery.length - 1}
                      </div>
                    )}
                  </div>
                  {image.name && (
                    <div className="hidden sm:block bg-surface-50 px-4 py-2.5 text-xs font-medium text-neutral-500 border-t border-neutral-100 truncate">
                      {image.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16">
          <PrevNext
            prev={prev ? { href: `/activities/${prev.slug}`, title: prev.title } : null}
            next={next ? { href: `/activities/${next.slug}`, title: next.title } : null}
            indexHref="/activities"
            indexLabel="Semua Artikel"
            prevLabel="Sebelumnya"
            nextLabel="Selanjutnya"
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && galleryList.length > 0 && (
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
          {galleryList.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                lightboxPrev()
              }}
              aria-label="Foto sebelumnya"
              className="absolute left-2 sm:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next Button */}
          {galleryList.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                lightboxNext()
              }}
              aria-label="Foto berikutnya"
              className="absolute right-2 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur flex items-center justify-center transition-all border border-white/15 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative flex flex-col items-center max-h-[92vh] max-w-[94vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15 flex items-center justify-center bg-black/40">
              <img
                src={galleryList[lightboxIndex]?.url || galleryList[lightboxIndex]?.url_medium}
                alt={galleryList[lightboxIndex]?.name || `${item.title} - ${lightboxIndex + 1}`}
                className="max-h-[72vh] sm:max-h-[78vh] w-auto max-w-[88vw] object-contain block select-none"
              />
            </div>

            {/* Lightbox Footer */}
            <div className="mt-3 flex items-center justify-between gap-4 text-white/90 text-xs sm:text-sm max-w-xl w-full px-2">
              <span className="font-semibold text-accent-400 truncate">
                {galleryList[lightboxIndex]?.name || item.title}
              </span>
              <span className="text-white/60 font-medium shrink-0">
                {lightboxIndex + 1} / {galleryList.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

