import { Head, Link } from '@inertiajs/react'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Info,
  MapPin,
  MessageCircle,
  UserRound,
  Utensils,
  Wifi,
  Wind,
  Zap,
} from 'lucide-react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'
import Breadcrumb from '../../Components/Breadcrumb'

// Helper icon selector for facilities
function getFeatureIcon(featureName = '') {
  const name = featureName.toLowerCase()
  if (name.includes('kamar mandi') || name.includes('toilet') || name.includes('bath') || name.includes('wc')) {
    return Bath
  }
  if (name.includes('kasur') || name.includes('kamar tidur') || name.includes('bed') || name.includes('springbed')) {
    return BedDouble
  }
  if (name.includes('wifi') || name.includes('internet')) {
    return Wifi
  }
  if (name.includes('ac') || name.includes('kipas') || name.includes('fan') || name.includes('angin')) {
    return Wind
  }
  if (name.includes('dapur') || name.includes('makan') || name.includes('sarapan') || name.includes('kopi')) {
    return Utensils
  }
  if (name.includes('listrik') || name.includes('genset') || name.includes('colokan')) {
    return Zap
  }
  return CheckCircle2
}

export default function HomestayShow({ homestay, prev = null, next = null }) {
  const data = homestay
  const heroImage = data.hero || data.cover || data.cover_image || data.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'

  const descriptionText = data.description?.trim() || [
    `${data.name} menawarkan pengalaman bermalam yang hangat dan otentik di Pulau Enggano. Dikelola langsung oleh warga lokal di Desa ${data.village || 'Enggano'}, penginapan ini menghadirkan suasana hunian yang asri, tenang, dan bersahaja.`,
    `Pilihan tepat bagi penjelajah dan wisatawan yang ingin beristirahat dengan nyaman setelah menempuh perjalanan laut maupun udara, sembari merasakan kehangatan keramahan masyarakat adat Enggano.`,
  ].join('\n\n')

  return (
    <>
      <Head title={`${data.name} - Penginapan Enggano`} />

      {/* Spacer di mobile agar konten tidak tertutup fixed navbar h-20 */}
      <div className="h-20 md:hidden" />

      {/* Hero Page Header — Hanya tampil di Desktop (≥ md), disembunyikan di Mobile */}
      <section className="relative hidden md:block overflow-hidden bg-primary-950 text-white">
        <img
          src={heroImage}
          alt={data.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            if (!e.currentTarget.dataset.fb) {
              e.currentTarget.dataset.fb = '1'
              e.currentTarget.src =
                data.cover_image ||
                data.image ||
                'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80'
            }
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/30 via-primary-950/50 to-primary-950/90" />
        <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-28 pt-44">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-tight" style={{ '--reveal-delay': '120ms' }}>
              {data.name}
            </h1>
            <div className="reveal-up mt-4 h-1 w-12 bg-accent-500 rounded-full" style={{ '--reveal-delay': '150ms' }} />
            <p className="reveal-up mt-4 text-sm sm:text-base text-white/80 flex items-center gap-2" style={{ '--reveal-delay': '180ms' }}>
              <MapPin size={15} className="text-accent-400 shrink-0" />
              <span>Desa {data.village || 'Enggano'}</span>
              <span className="text-white/40">•</span>
              <UserRound size={15} className="text-accent-400 shrink-0" />
              <span>Dikelola oleh <strong className="text-white font-semibold">{data.owner}</strong></span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pt-4 pb-16 sm:py-12 md:py-20">
        {/* Navigation Breadcrumb (Desktop) & Back Link (Mobile) */}
        <div className="reveal-up flex items-center justify-between gap-4 border-b border-neutral-200/60 pb-4 mb-6">
          <Breadcrumb
            items={[
              { label: 'Penginapan', href: '/accommodations' },
              { label: data.name },
            ]}
          />
          <Link
            href="/accommodations"
            className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-primary-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Penginapan</span>
          </Link>
          <span className="text-xs text-neutral-400 font-medium shrink-0">
            Desa {data.village || 'Enggano'}
          </span>
        </div>

        {/* Mobile Header Block (< md): Tampil rapi tanpa Page Header besar */}
        <div className="mt-4 md:hidden">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 leading-snug">
            {data.name}
          </h1>
          <div className="mt-3 h-1 w-10 bg-accent-500 rounded-full" />
          <p className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
            <UserRound size={13} className="text-accent-600 shrink-0" />
            <span>Dikelola oleh <strong>{data.owner}</strong></span>
          </p>

          {/* Mobile Main Image Showcase — Bersih tanpa badge */}
          <div className="mt-3 relative overflow-hidden rounded-2xl shadow-xs ring-1 ring-neutral-200/80 aspect-[16/10] bg-neutral-100">
            <img
              src={heroImage}
              alt={data.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Two Column Layout (Content & Booking Sidebar) */}
        <div className="mt-6 sm:mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_360px] items-start">
          {/* Left Column: Details, Facilities, Gallery */}
          <article className="space-y-8 sm:space-y-10">
            {/* Description Section */}
            <div className="reveal-up">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
                Tentang Penginapan
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <div className="mt-5 space-y-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
                {descriptionText.split(/\n+/).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="reveal-up pt-8 sm:pt-10 border-t border-neutral-200/80" style={{ '--reveal-delay': '100ms' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
                    Fasilitas yang Tersedia
                  </h3>
                  <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
                </div>
                <span className="text-xs font-semibold text-neutral-400">
                  {data.features.length} fasilitas
                </span>
              </div>

              <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(data.features.length ? data.features : ['Kamar Tidur Nyaman', 'Kamar Mandi', 'Host Lokal Ramah']).map((feature, index) => {
                  const Icon = getFeatureIcon(feature)
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-surface-50/60 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-neutral-800 ring-1 ring-neutral-200/50"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 text-primary-800">
                        <Icon size={16} />
                      </div>
                      <span className="truncate">{feature}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="reveal-up pt-8 sm:pt-10 border-t border-neutral-200/80" style={{ '--reveal-delay': '150ms' }}>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
                Galeri Foto Homestay
              </h3>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
              <p className="mt-3 text-xs sm:text-sm text-neutral-500">
                Dokumentasi suasana dan kamar di {data.name}
              </p>

              <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(data.gallery?.length ? data.gallery : [
                  { url: heroImage, name: 'Tampak Utama' }
                ]).map((image, index, arr) => {
                  const imgUrl = typeof image === 'string' ? image : (image.url_medium || image.url)
                  return (
                    <div
                      key={image.id || index}
                      className={`group overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200/70 shadow-2xs ${
                        index >= 2 ? 'hidden sm:block' : ''
                      }`}
                    >
                      <div className="relative aspect-4/3">
                        <img
                          src={imgUrl}
                          alt={`Galeri ${data.name} - ${index + 1}`}
                          className="media-zoom aspect-4/3 w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fb && typeof image !== 'string') {
                              e.currentTarget.dataset.fb = '1'
                              e.currentTarget.src = image.url
                            }
                          }}
                        />
                        {index === 1 && arr.length > 2 && (
                          <div className="sm:hidden absolute inset-0 bg-black/60 backdrop-blur-2xs flex items-center justify-center text-white font-bold text-xs">
                            +{arr.length - 1}
                          </div>
                        )}
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
          </article>

          {/* Right Column: Pricing & Host Contact Card */}
          <aside className="sticky top-24 space-y-4">
            <div className="reveal-up bg-neutral-100/80 p-5 sm:p-7 rounded-2xl ring-1 ring-neutral-200 shadow-sm" style={{ '--reveal-delay': '120ms' }}>
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-neutral-400 block">
                  Tarif Menginap
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl sm:text-3xl font-black text-neutral-900">
                    {data.price_per_night ? `Rp ${Number(data.price_per_night).toLocaleString('id-ID')}` : 'Hubungi Host'}
                  </span>
                  {data.price_per_night && (
                    <span className="text-xs text-neutral-500 font-medium">/ malam</span>
                  )}
                </div>
              </div>

              {/* Host Profile Box */}
              <div className="mt-5 border-t border-neutral-100 pt-5 flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-xl bg-primary-950 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <UserRound size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base text-neutral-900 truncate">
                    {data.owner}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    Warga & Pemilik di Desa {data.village || 'Enggano'}
                  </p>
                </div>
              </div>

              {/* Direct WhatsApp CTA Button */}
              {data.whatsapp_number ? (
                <a
                  href={`https://wa.me/${data.whatsapp_number}?text=${encodeURIComponent(`Halo Bapak/Ibu ${data.owner}, saya tertarik ingin menginap di ${data.name} (Desa ${data.village || 'Enggano'}). Apakah ada kamar yang tersedia?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-xl text-sm font-bold tracking-wide shadow-sm active:scale-[0.98] transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Hubungi via WhatsApp</span>
                </a>
              ) : (
                <div className="mt-6 bg-surface-50 p-3 rounded-xl text-center text-xs text-neutral-500 ring-1 ring-neutral-200">
                  Kontak WhatsApp dapat ditanyakan langsung melalui pos desa setempat.
                </div>
              )}

              {/* Useful Notice Box */}
              <div className="mt-4 flex items-start gap-2 bg-primary-50/70 p-3 rounded-xl text-[11px] leading-relaxed text-neutral-600 ring-1 ring-primary-100">
                <Info size={14} className="mt-0.5 shrink-0 text-primary-700" />
                <p>
                  <strong>Tips Perjalanan:</strong> Hubungi pemilik homestay beberapa hari sebelum keberangkatan kapal/pesawat untuk memastikan ketersediaan kamar dan koordinasi penjemputan dari pelabuhan/bandara.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Prev / Next Homestay Navigation */}
        <div className="mt-12 sm:mt-16">
          <PrevNext
            prev={prev ? { href: `/accommodations/${prev.id}`, title: prev.name } : null}
            next={next ? { href: `/accommodations/${next.id}`, title: next.name } : null}
            indexHref="/accommodations"
            indexLabel="Semua Homestay"
            prevLabel="Sebelumnya"
            nextLabel="Selanjutnya"
          />
        </div>
      </section>
    </>
  )
}
