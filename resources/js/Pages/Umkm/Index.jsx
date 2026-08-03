import { Head } from '@inertiajs/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import LeafletMap from '../../Components/LeafletMap'

const fallbackUmkms = [
  {
    id: 'usaha-1',
    name: 'Kedai Makan Ibu Siti',
    village: 'Kahyapu',
    description: 'Menjual makanan khas Enggano seperti nasi goreng seafood dan ikan bakar segar dari laut.',
    image: null,
    lat: null,
    lng: null,
  },
  {
    id: 'usaha-2',
    name: 'Kerajinan Anyaman',
    village: 'Kaana',
    description: 'Menghasilkan berbagai kerajinan tangan dari rotan dan anyaman daun khas Enggano.',
    image: null,
    lat: null,
    lng: null,
  },
  {
    id: 'usaha-3',
    name: 'Pengolahan Kelapa',
    village: 'Malakoni',
    description: 'Memproduksi minyak kelapa murni dan berbagai produk olahan kelapa organik.',
    image: null,
    lat: null,
    lng: null,
  },
  {
    id: 'usaha-4',
    name: 'Budidaya Ikan',
    village: 'Apoho',
    description: 'Usaha budidaya ikan air tawar dan keramba ikan laut yang dikelola secara tradisional.',
    image: null,
    lat: null,
    lng: null,
  },
]

export default function UmkmIndex({ umkms = [] }) {
  const [activeCardId, setActiveCardId] = useState(null)
  const highlightTimerRef = useRef(null)

  const entries = useMemo(() => {
    if (umkms.length) {
      return umkms.map(item => ({
        ...item,
        name: item.business_name ?? item.name,
        description: item.notes ?? item.description,
        image: item.product_photos ?? item.image ?? null,
      }))
    }

    return fallbackUmkms
  }, [umkms])

  const mapMarkers = useMemo(() => (
    entries
      .filter(item => Number.isFinite(Number(item.lat)) && Number.isFinite(Number(item.lng)))
      .map(item => ({
        id: item.id,
        name: item.name,
        lat: Number(item.lat),
        lng: Number(item.lng),
        cardId: `umkm-card-${item.id}`,
      }))
  ), [entries])

  const handleMarkerClick = useCallback((marker) => {
    if (marker.cardId) {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current)
      }

      setActiveCardId(marker.cardId)

      const el = document.getElementById(marker.cardId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      highlightTimerRef.current = window.setTimeout(() => {
        setActiveCardId(null)
        highlightTimerRef.current = null
      }, 2000)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        clearTimeout(highlightTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <Head title="UMKM Lokal" />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1800&q=80"
          alt="UMKM Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Ekonomi Lokal
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              UMKM Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Mendukung pertumbuhan ekonomi lokal dengan membeli produk dan jasa dari usaha mikro kecil menengah di Pulau Enggano.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7f4] min-h-screen">
        {/* Map Section */}
        <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:px-16">
          <div className="reveal-up max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-700 font-semibold">
              Peta Lokasi
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Temukan UMKM di Peta
            </h2>
            <p className="mt-4 text-slate-600 text-base leading-7 md:text-lg">
              Arahkan kursor ke marker untuk melihat nama UMKM. Klik marker untuk menuju card UMKM yang sesuai dan menyorotnya selama 2 detik.
            </p>
          </div>

          <div className="mt-12 reveal-up shadow-sm" style={{ '--reveal-delay': '120ms' }}>
            <LeafletMap
              mapMarkers={mapMarkers}
              height={520}
              useMarkerBounds={mapMarkers.length > 0}
              onMarkerClick={handleMarkerClick}
            />
          </div>
        </section>

        {/* UMKM List Section */}
        <section className="mx-auto max-w-7xl px-6 pb-24 md:px-12 lg:px-16">
          <div className="reveal-up max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-700 font-semibold">
              Usaha Lokal
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Daftar UMKM
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {entries.map((item, index) => (
              <div
                key={item.id}
                id={`umkm-card-${item.id}`}
                className={`group hover-lift reveal-up overflow-hidden bg-white shadow-sm transition-all duration-300 ${activeCardId === `umkm-card-${item.id}` ? 'ring-2 ring-amber-400 bg-amber-50 shadow-md' : ''}`}
                style={{ '--reveal-delay': `${140 + index * 60}` }}
              >
                <div className="relative overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="aspect-4/3 w-full bg-linear-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className="mt-2 text-xs text-slate-400 uppercase tracking-wide">Foto belum tersedia</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                    {item.village}
                  </div>
                  {!Number.isFinite(Number(item.lat)) || !Number.isFinite(Number(item.lng)) ? (
                    <div className="absolute right-4 top-4 bg-slate-800/80 text-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      Koordinat belum ada
                    </div>
                  ) : null}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  {item.owner_name ? (
                    <p className="mt-1 text-sm text-slate-500">
                      Pemilik: {item.owner_name}
                    </p>
                  ) : null}
                  {item.business_type ? (
                    <p className="mt-2 inline-block bg-amber-50 text-amber-800 px-2.5 py-0.5 text-xs font-semibold rounded">
                      {item.business_type}
                    </p>
                  ) : null}
                  <p className="mt-3 text-base leading-7 text-slate-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
