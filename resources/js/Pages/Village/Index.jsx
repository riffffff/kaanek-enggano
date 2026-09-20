import { Head } from '@inertiajs/react'
import { MapPin, ExternalLink } from 'lucide-react'
import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { historyData } from '../../data/history.js'
import { villagesList, villageImageFallback } from '../../data/villages.js'
import Button from '../../Components/Button'
import PageHeader from '../../Components/PageHeader'
import Pagination from '../../Components/Pagination'
import VideoDocumentaryCard from '../../Components/VideoDocumentaryCard'

const LeafletMap = lazy(() => import('../../Components/LeafletMap'))

const engganoRegionalBounds = [
  [-6.1, 100.4],
  [-3.8, 103.4],
]

const mapConfig = {
  frameHeight: 520,
  regionalZoom: 6.5,
  umkmHeight: 560,
  umkmZoom: 16,
}

// ── Mobile carousel for the two maps ─────────────────────────────────────────
function MobileMapCarousel({ regionalMapHeight }) {
  const [slide, setSlide] = useState(0)
  const touchStartX = useRef(null)

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) setSlide(dx < 0 ? 1 : 0)
    touchStartX.current = null
  }

  return (
    <div className="mt-8">
      {/* Tab pills */}
      <div className="mb-3 flex gap-2">
        {['Peta Wilayah', 'Kerawanan Tsunami'].map((label, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              slide === i
                ? 'bg-primary-700 text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Slide container */}
      <div
        className="overflow-hidden rounded-xl bg-[#f3f5f2] shadow-sm ring-1 ring-neutral-200/70"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slide 0 — Peta Wilayah */}
        {slide === 0 && (
          <>
            <div style={{ height: regionalMapHeight }}>
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center bg-neutral-50 text-sm text-neutral-400">
                    <div className="text-center">
                      <MapPin size={28} className="mx-auto mb-2 animate-pulse text-primary-400" />
                      <p>Memuat peta…</p>
                    </div>
                  </div>
                }
              >
                <LeafletMap
                  mapMarkers={[]}
                  height={regionalMapHeight}
                  zoom={mapConfig.regionalZoom}
                  viewMaxZoom={mapConfig.regionalZoom}
                  useMarkerBounds={false}
                  viewBounds={engganoRegionalBounds}
                  highlightPoint={{ lat: -5.39, lng: 102.28, radius: 30000 }}
                />
              </Suspense>
            </div>
            <div className="border-t border-neutral-200/70 bg-surface-50/70 px-4 py-2.5 text-xs text-neutral-500">
              Gunakan gesture atau scroll untuk zoom dan eksplorasi peta.
            </div>
          </>
        )}

        {/* Slide 1 — Peta Kerawanan */}
        {slide === 1 && (
          <>
            <div className="flex items-center justify-center p-3" style={{ height: regionalMapHeight }}>
              <img
                src="/storage/maps/peta-kerentanan-bencana-tsunami.png"
                alt="Peta Kerentanan Bencana Tsunami Pulau Enggano"
                className="h-full w-full object-contain mix-blend-multiply"
                onError={(e) => { e.currentTarget.onerror = null }}
              />
            </div>
            <div className="border-t border-neutral-200/70 bg-surface-50/70 px-4 py-2.5 text-xs text-neutral-500 flex items-center justify-between">
              <span>Zonasi kerentanan bencana tsunami pesisir Enggano.</span>
              <a
                href="/storage/maps/peta-kerentanan-bencana-tsunami.png"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary-700"
              >
                Full <ExternalLink size={11} />
              </a>
            </div>
          </>
        )}

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 py-2">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${slide === i ? 'w-5 bg-primary-600' : 'w-1.5 bg-neutral-300'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function VillageIndex({ umkms = { data: [], links: [] }, umkmMarkers = [] }) {

  // Responsive map heights — Leaflet needs explicit px, not CSS classes
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  const regionalMapHeight = isMobile ? 220 : mapConfig.frameHeight
  const umkmMapHeight    = isMobile ? 220 : mapConfig.umkmHeight

  const entries = (villagesList || []).map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    image: v.heroImage || villageImageFallback,
    summary: v.summary && v.summary.trim() !== '' ? v.summary : null,
    lat: v.lat,
    lng: v.lng,
    potential: v.potential || [],
  }))

  const headerBackground = entries.length > 0 && entries[0]?.image ? entries[0].image : villageImageFallback

  return (
    <>
      <Head title="Villages" />

      <PageHeader pageKey="villages" background={headerBackground} />

      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-16 md:py-24 pb-2">
        <div className="reveal-up max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
            Wilayah & Mitigasi Bencana
          </h2>
          <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
          <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
            Jelajahi informasi wilayah dan kesiapsiagaan bencana Pulau Enggano.
          </p>
        </div>

        {/* ── Mobile: Swipeable carousel ─────────────────────────── */}
        {isMobile ? (
          <MobileMapCarousel regionalMapHeight={regionalMapHeight} />
        ) : (
          /* ── Desktop: Side-by-side grid ──────────────────────── */
          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            {/* 1. Peta Kewilayahan */}
            <div className="hover-lift flex flex-col w-full overflow-hidden rounded-xl bg-[#f3f5f2] shadow-sm ring-1 ring-neutral-200/70">
              <div className="relative w-full flex-1 overflow-hidden" style={{ height: mapConfig.frameHeight }}>
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center rounded-xl bg-neutral-50 text-sm text-neutral-400">
                      <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-3 animate-pulse text-primary-400" />
                        <p>Memuat peta Enggano…</p>
                      </div>
                    </div>
                  }
                >
                  <LeafletMap
                    mapMarkers={[]}
                    height={mapConfig.frameHeight}
                    zoom={mapConfig.regionalZoom}
                    viewMaxZoom={mapConfig.regionalZoom}
                    useMarkerBounds={false}
                    viewBounds={engganoRegionalBounds}
                    highlightPoint={{ lat: -5.39, lng: 102.28, radius: 30000 }}
                  />
                </Suspense>
              </div>
              <div className="border-t border-neutral-200/70 bg-surface-50/70 px-5 py-3 text-xs text-neutral-500">
                <span>Gunakan gesture atau scroll untuk zoom dan eksplorasi peta.</span>
              </div>
            </div>

            {/* 2. Peta Kerawanan Tsunami */}
            <div className="hover-lift flex flex-col w-full overflow-hidden rounded-xl bg-[#f3f5f2] shadow-sm ring-1 ring-neutral-200/70">
              <div className="relative flex-1 overflow-hidden p-5 flex items-center justify-center" style={{ height: mapConfig.frameHeight }}>
                <img
                  src="/storage/maps/peta-kerentanan-bencana-tsunami.png"
                  alt="Peta Kerentanan Bencana Tsunami Pulau Enggano"
                  className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-[1.015]"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/storage/maps/peta-kerentanan-bencana-tsunami.png' }}
                />
              </div>
              <div className="border-t border-neutral-200/70 bg-surface-50/70 px-5 py-3 text-xs text-neutral-500 flex items-center justify-between">
                <span>Peta zonasi tingkat kerentanan bencana tsunami pesisir Enggano.</span>
                <a href="/storage/maps/peta-kerentanan-bencana-tsunami.png" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary-700 hover:text-primary-800 transition-colors">
                  Resolusi Penuh <ExternalLink size={12} />
                </a>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Sejarah & Film Dokumenter Enggano Section */}
      <section className="bg-[#fcfbf9] py-16 md:py-24 border-y border-neutral-200/50">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Kiri: Narasi Sejarah (6 kolom) */}
            <article className="reveal-up lg:col-span-6 space-y-4 sm:space-y-5 text-left">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 tracking-tight leading-tight">
                {historyData.title}
              </h2>
              <div className="h-1 w-10 bg-accent-500 rounded-full" />

              <div className="space-y-4 text-base leading-relaxed text-neutral-600 md:text-lg font-body">
                {historyData.content.split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index} className="line-clamp-4 lg:line-clamp-none">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-3">
                <Button
                  href="/about-enggano/history"
                  showArrow
                  className="reveal-up"
                >
                  Baca Selengkapnya
                </Button>
              </div>
            </article>

            {/* Kanan: Video Dokumenter (6 kolom) */}
            <div className="reveal-up lg:col-span-6 w-full" style={{ '--reveal-delay': '140ms' }}>
              <VideoDocumentaryCard
                videoId="nTHJ1kEVIpw"
                title="Video Dokumenter"
                subtitle="Suara Enggano: Dokumentasi audio-visual peradaban, budaya, dan pesona pulau terluar."
              />
            </div>

          </div>
        </div>
      </section>

      {umkms.data.length > 0 && (
        <section className="bg-white py-20 md:py-24 border-y border-neutral-200/70">
          <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
            <div className="max-w-3xl reveal-up">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                UMKM Enggano
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600 md:text-lg">
                Kenali usaha lokal yang menggerakkan ekonomi masyarakat di Pulau Enggano.
              </p>
            </div>

            {umkmMarkers.length > 0 && (
              <div className="mt-12 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/70 reveal-up">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center bg-neutral-50 text-sm text-neutral-400 h-[220px] md:h-[400px]">
                      <div className="text-center">
                        <MapPin size={32} className="mx-auto mb-3 animate-pulse text-primary-400" />
                        <p>Memuat peta UMKM…</p>
                      </div>
                    </div>
                  }
                >
                  <LeafletMap
                    mapMarkers={umkmMarkers}
                    height={umkmMapHeight}
                    zoom={mapConfig.umkmZoom}
                    useMarkerBounds
                  />
                </Suspense>
              </div>
            )}

            {/* Table — scrollable on mobile, full on desktop */}
            <div className="mt-12 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/70 reveal-up">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead className="bg-neutral-50">
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Nama UMKM</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Desa</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Pemilik</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Jenis Usaha</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Deskripsi</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">Lokasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {umkms.data.map((umkm) => (
                    <tr key={umkm.id} className="align-top">
                      <td className="px-4 py-4 font-display font-semibold text-neutral-900 text-sm max-w-[140px]"><span className="line-clamp-2">{umkm.name || 'UMKM Lokal'}</span></td>
                      <td className="px-4 py-4 text-sm text-neutral-600 max-w-[100px]"><span className="line-clamp-2">{umkm.village || 'Belum diisi'}</span></td>
                      <td className="px-4 py-4 text-sm text-neutral-600 max-w-[120px]"><span className="line-clamp-2">{umkm.owner_name || 'Belum diisi'}</span></td>
                      <td className="px-4 py-4 text-sm text-neutral-600 max-w-[120px]"><span className="line-clamp-2">{umkm.business_type || 'Belum diisi'}</span></td>
                      <td className="px-4 py-4 text-sm leading-6 text-neutral-600 max-w-[200px]"><span className="line-clamp-2">{umkm.description || 'Belum diisi'}</span></td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {Number.isFinite(Number(umkm.lat)) && Number.isFinite(Number(umkm.lng)) ? (
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-red-700 hover:text-red-900 hover:underline"
                          >
                            Buka di Maps
                          </a>
                        ) : (
                          <span className="text-neutral-400">–</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination links={umkms.links} only={['umkms']} />
          </div>
        </section>
      )}
    </>
  )
}
