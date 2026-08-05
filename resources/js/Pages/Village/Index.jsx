import { Head, Link } from '@inertiajs/react'
import { MapPin, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react'
import { lazy, Suspense, useRef, useState } from 'react'
import { tribesData } from '../../data/tribes.js'
import { historyData } from '../../data/history.js'
import { villagesList, villageImageFallback } from '../../data/villages.js'
import Button from '../../Components/Button'

const LeafletMap = lazy(() => import('../../Components/LeafletMap'))

export default function VillageIndex() {
  const villageSliderRef = useRef(null)
  const tribeSliderRef = useRef(null)
  const [activeMapTab, setActiveMapTab] = useState('wilayah')

  const scrollVillagePrev = () => {
    if (!villageSliderRef.current) return
    villageSliderRef.current.scrollBy({ left: -Math.max(360, villageSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollVillageNext = () => {
    if (!villageSliderRef.current) return
    villageSliderRef.current.scrollBy({ left: Math.max(360, villageSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollTribePrev = () => {
    if (!tribeSliderRef.current) return
    tribeSliderRef.current.scrollBy({ left: -Math.max(360, tribeSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }
  const scrollTribeNext = () => {
    if (!tribeSliderRef.current) return
    tribeSliderRef.current.scrollBy({ left: Math.max(360, tribeSliderRef.current.clientWidth * 0.8), behavior: 'smooth' })
  }

  const entries = villagesList.map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    image: v.heroImage || villageImageFallback,
    summary: v.summary && v.summary.trim() !== '' ? v.summary : null,
    lat: v.lat,
    lng: v.lng,
    potential: v.potential || [],
  }))

  return (
    <>
      <Head title="Villages" />

      <section className="relative overflow-hidden text-white">
        <img
          src={entries[0]?.image || villageImageFallback}
          alt="Desa Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Desa & Budaya
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              Lebih Kenal dengan Enggano
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Jelajahi keragaman budaya dan pesona alam dari yang menjadi denyut nadi kehidupan di garis terdepan Samudera Hindia.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16 pb-2">
        <div className="reveal-up max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary-700">PETA ENGGANO</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
            Wilayah & Mitigasi Bencana
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-500">
            Jelajahi informasi wilayah dan kesiapsiagaan bencana Pulau Enggano.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="reveal-up mt-10" style={{ '--reveal-delay': '120ms' }}>
          <div className="inline-flex rounded-xl bg-neutral-100 p-1.5 gap-1">
            <button
              onClick={() => setActiveMapTab('wilayah')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all ${
                activeMapTab === 'wilayah'
                  ? 'bg-white text-primary-800 shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
              }`}
            >
              <MapPin size={18} />
              Peta Wilayah
            </button>
            <button
              onClick={() => setActiveMapTab('mitigasi')}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all ${
                activeMapTab === 'mitigasi'
                  ? 'bg-white text-primary-800 shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
              }`}
            >
              <AlertTriangle size={18} />
              Peta Kerentanan Bencana Tsunami
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeMapTab === 'wilayah' && (
            <div className="hover-lift reveal-up overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70 rounded-xl">
              <Suspense
                fallback={
                  <div className="flex h-[480px] items-center justify-center bg-neutral-50 text-sm text-neutral-400 rounded-xl">
                    <div className="text-center">
                      <MapPin size={32} className="mx-auto mb-3 animate-pulse text-primary-400" />
                      <p>Memuat peta Enggano…</p>
                    </div>
                  </div>
                }
              >
                <LeafletMap mapMarkers={[]} height={480} useMarkerBounds={false} />
              </Suspense>
            </div>
          )}

          {activeMapTab === 'mitigasi' && (
            <div className="reveal-up space-y-6">
              {/* Peta Mitigasi Tsunami */}
              <div className="hover-lift overflow-hidden bg-[#f8f7f4] shadow-sm ring-1 ring-neutral-200/70 rounded-xl">
                <div className="relative bg-[#f8f7f4] rounded-xl overflow-hidden">
                  <img
                    src="/storage/maps/peta-kerentanan-bencana-tsunami.png"
                    alt="Peta Kerentanan Bencana Tsunami Pulau Enggano"
                    className="w-full h-auto object-contain max-h-[600px] mix-blend-multiply"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/storage/maps/peta-kerentanan-bencana-tsunami.png'
                    }}
                  />
                </div>
              </div>

              {/* Deskripsi Peta Mitigasi */}
              <div className="space-y-6">
                {/* Tentang Peta */}
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm ring-1 ring-neutral-200/70">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-4">
                    📖 Tentang Peta
                  </h3>
                  <p className="text-base leading-7 text-neutral-600">
                    Peta Kerawanan Tsunami Pulau Enggano merupakan media informasi yang menggambarkan tingkat kerawanan suatu wilayah terhadap potensi tsunami berdasarkan analisis spasial. Peta ini disusun untuk membantu masyarakat memahami wilayah yang memiliki tingkat kerawanan berbeda sehingga dapat meningkatkan kesiapsiagaan terhadap bencana.
                  </p>
                </div>

                {/* Cara Membaca Peta + Legenda */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm ring-1 ring-neutral-200/70">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-5">
                      🎨 Cara Membaca Peta
                    </h3>
                    <div className="overflow-x-auto rounded-lg border border-neutral-200">
                      <table className="w-full text-sm">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="px-4 py-3 text-left font-semibold text-neutral-800 uppercase tracking-wider text-xs">Warna</th>
                            <th className="px-4 py-3 text-left font-semibold text-neutral-800 uppercase tracking-wider text-xs">Tingkat Kerawanan</th>
                            <th className="px-4 py-3 text-left font-semibold text-neutral-800 uppercase tracking-wider text-xs">Keterangan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          <tr>
                            <td className="px-4 py-3"><div className="w-5 h-5 rounded bg-red-600 ring-1 ring-neutral-300" /></td>
                            <td className="px-4 py-3 font-semibold text-neutral-900">Sangat Rentan</td>
                            <td className="px-4 py-3 text-neutral-600">Wilayah pesisir dengan potensi terdampak paling tinggi.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3"><div className="w-5 h-5 rounded bg-orange-500 ring-1 ring-neutral-300" /></td>
                            <td className="px-4 py-3 font-semibold text-neutral-900">Rentan</td>
                            <td className="px-4 py-3 text-neutral-600">Berpotensi terdampak tsunami dan perlu meningkatkan kewaspadaan.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3"><div className="w-5 h-5 rounded bg-yellow-400 ring-1 ring-neutral-300" /></td>
                            <td className="px-4 py-3 font-semibold text-neutral-900">Cukup Rentan</td>
                            <td className="px-4 py-3 text-neutral-600">Potensi terdampak sedang.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3"><div className="w-5 h-5 rounded bg-green-500 ring-1 ring-neutral-300" /></td>
                            <td className="px-4 py-3 font-semibold text-neutral-900">Aman</td>
                            <td className="px-4 py-3 text-neutral-600">Relatif lebih aman dibanding wilayah pesisir.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3"><div className="w-5 h-5 rounded bg-green-700 ring-1 ring-neutral-300" /></td>
                            <td className="px-4 py-3 font-semibold text-neutral-900">Sangat Aman</td>
                            <td className="px-4 py-3 text-neutral-600">Berada pada wilayah dengan tingkat kerawanan paling rendah.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm ring-1 ring-neutral-200/70">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-neutral-900 mb-5">
                      🗺 Parameter Penyusun Peta
                    </h3>
                    <p className="text-base leading-7 text-neutral-600 mb-5">
                      Peta ini disusun menggunakan beberapa parameter spasial, yaitu:
                    </p>
                    <ul className="space-y-3">
                      {[
                        { text: 'Elevasi' },
                        { text: 'Jarak dari garis pantai' },
                        { text: 'Kemiringan lereng' },
                        { text: 'Penggunaan lahan' },
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <span className="text-2xl">{item.icon}</span>
                          <span className="font-medium text-neutral-800">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Langkah Jika Tsunami */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 md:p-8 rounded-xl shadow-sm ring-1 ring-red-100 border border-red-200/50">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-red-900 mb-4">
                    🚨 Apa yang Harus Dilakukan Saat Tsunami?
                  </h3>
                  <p className="text-base leading-7 text-red-800">
                    Apabila terjadi gempa kuat yang berlangsung lama, segera lakukan <strong className="font-bold">Drop, Cover, and Hold On</strong>. Setelah guncangan berhenti, segera menuju tempat yang lebih tinggi dan ikuti arahan dari petugas serta informasi resmi <strong className="font-bold">BMKG</strong> dan <strong className="font-bold">BPBD</strong>.
                  </p>
                </div>

                {/* Informasi Penting */}
                <div className="bg-blue-50 p-6 md:p-8 rounded-xl shadow-sm ring-1 ring-blue-100 border border-blue-200/50">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-blue-900 mb-4">
                    ℹ️ Informasi Penting
                  </h3>
                  <p className="text-base leading-7 text-blue-800">
                    Peta ini merupakan media <strong className="font-bold">edukasi</strong> untuk meningkatkan pemahaman masyarakat mengenai kerawanan tsunami. Untuk informasi resmi mengenai peringatan dini, evakuasi, dan penanganan bencana, masyarakat diimbau mengikuti arahan dari <strong className="font-bold">BMKG</strong>, <strong className="font-bold">BNPB</strong>, dan <strong className="font-bold">BPBD Kabupaten Bengkulu Utara</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sejarah Enggano Section */}
      <section className="bg-[#fcfbf9] py-20 md:py-28 border-y border-neutral-200/50">
        <div className="mx-auto max-w-4xl px-6 md:px-12 text-center">
          <article className="reveal-up">
            <p className="font-body text-xs uppercase tracking-[0.35em] text-primary-700 font-medium">
              WARISAN LELUHUR
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-neutral-900 md:text-5xl tracking-tight">
              {historyData.title}
            </h2>
            <div className="mx-auto mt-6 h-0.5 w-12 bg-primary-600/40" />

            <div className="mt-10 space-y-6 text-base leading-8 text-neutral-600 md:text-lg md:leading-9 font-body text-center">
              {historyData.content.split('\n\n').slice(0, 2).map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                href="/villages/history"
                showArrow
                className="reveal-up"
              >
                Baca Selengkapnya
              </Button>
            </div>
          </article>
        </div>
      </section>

      <section id="bagian-desa" className="w-full bg-surface-50 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            src={entries[0]?.image || villageImageFallback}
            alt="Enggano Desa"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-surface-50 via-surface-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 items-center">
            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">DESA ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                {entries.length} Desa Pulau Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Jelajahi {entries.length} desa yang menjadi pilar kehidupan di Pulau Enggano, masing-masing dengan keunikan budaya dan pesona alamnya.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{entries.length}</span>
              </div>
            </div>

            <div className="relative w-full">
              <div className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollVillagePrev}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Prev Desa"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
              </div>
              <div className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollVillageNext}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Next Desa"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              </div>

              <div ref={villageSliderRef} className="w-full overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-10 py-3">
                <div className="flex gap-6 min-w-max pb-1">
                  {entries.map((village, index) => (
                    <Link
                      key={village.slug || index}
                      href={`/villages/${village.slug}`}
                      className="group hover-lift overlay-glow reveal-up relative overflow-hidden bg-white shadow-md shrink-0 w-72 sm:w-80 md:w-96 rounded-lg"
                      style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                    >
                      <img
                        src={village.image}
                        alt={village.name}
                        className="media-zoom h-full w-full object-cover aspect-4/5 rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95 rounded-lg" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          DESA
                        </p>
                        <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">{village.name}</h3>
                        {village.summary && <p className="mt-3 text-sm text-white/80 line-clamp-3">{village.summary}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>

      <section className="w-full bg-accent-50 py-16 md:py-24 overflow-hidden relative">
        <div className="absolute inset-0">
          <img
            src={tribesData[0]?.image || villageImageFallback}
            alt="Enggano Suku"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-linear-to-l from-accent-50 via-accent-50/90 to-transparent" />
        </div>

        <div className="relative mx-auto w-full px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8 items-center">
            <div className="relative w-full">
              <div className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollTribePrev}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Prev Suku"
                >
                  <ChevronLeft size={26} strokeWidth={2.5} />
                </button>
              </div>
              <div className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={scrollTribeNext}
                  className="bg-white/95 backdrop-blur-sm ring-1 ring-neutral-200 shadow-lg rounded-full p-3 text-neutral-800 hover:bg-white hover:scale-110 transition-all"
                  aria-label="Next Suku"
                >
                  <ChevronRight size={26} strokeWidth={2.5} />
                </button>
              </div>

              <div ref={tribeSliderRef} className="w-full overflow-x-auto scrollbar-hide px-4 sm:px-8 md:px-10 py-3">
                <div className="flex gap-6 min-w-max pb-1">
                  {tribesData.map((tribe, index) => (
                    <Link
                      key={tribe.id || index}
                      href={`/tribes/${tribe.id}`}
                      className="group hover-lift overlay-glow reveal-up relative overflow-hidden bg-white shadow-md shrink-0 w-72 sm:w-80 md:w-96 rounded-lg"
                      style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                    >
                      <img
                        src={tribe.image}
                        alt={tribe.name}
                        className="media-zoom h-full w-full object-cover aspect-4/5 rounded-lg"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-neutral-950/95 via-neutral-950/30 to-transparent transition-opacity duration-500 group-hover:opacity-95 rounded-lg" />
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          SUKU
                        </p>
                        <h3 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-white leading-tight">{tribe.name}</h3>
                        <p className="mt-3 text-sm text-white/80 line-clamp-3">{tribe.summary}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal-up z-10">
              <p className="font-body text-sm uppercase tracking-[0.3em] text-accent-700">SUKU ENGGANO</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-tight">
                Warisan Suku-Suku Enggano
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                Kenali {tribesData.length} suku asli dan pendatang yang membangun peradaban serta mewariskan kearifan lokal di Pulau Enggano.
              </p>
              <div className="mt-12 flex items-center gap-4">
                <span className="font-display text-2xl font-semibold text-neutral-900">01</span>
                <div className="h-px w-16 bg-neutral-300" />
                <span className="font-display text-2xl font-semibold text-neutral-400">/{tribesData.length}</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </section>
    </>
  )
}
