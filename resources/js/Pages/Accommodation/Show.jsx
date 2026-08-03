import { Head } from '@inertiajs/react'
import { Bath, BedDouble, MessageCircle, UserRound } from 'lucide-react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'

export default function HomestayShow({ homestay, prev = null, next = null }) {
  const data = homestay

  return (
    <>
      <Head title={data.name} />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        {(data.hero || data.cover || data.cover_image || data.image) ? (
          <img
            src={data.hero || data.cover || data.cover_image || data.image}
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
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary-950 via-primary-900 to-primary-800" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/20 via-primary-950/40 to-primary-950/85" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div>
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/75">
              {data.village || 'Enggano'} Village
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {data.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Button
          href="/accommodations"
          variant="ghostLight"
          showArrow
          arrowPosition="left"
          className="reveal-up"
        >
          Kembali ke Daftar Homestay
        </Button>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px]">
          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Fasilitas yang Tersedia
              </h3>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {(data.features.length ? data.features : ['Fasilitas belum tersedia']).map((feature, index) => {
                  const Icon = feature.toLowerCase().includes('kamar mandi') ? Bath : BedDouble
                  return (
                    <div
                      key={index}
                      className="hover-lift flex items-center gap-3 bg-surface-50 px-4 py-3 text-sm font-semibold text-neutral-700 ring-1 ring-neutral-200"
                    >
                      <Icon size={18} className="text-primary-700" />
                      {feature}
                    </div>
                  )
                })}
              </div>
            </div>
          </article>

          <aside className="hover-lift reveal-up bg-white p-7 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '220ms' }}>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Harga per Malam</p>
                <p className="mt-2 text-3xl font-semibold text-accent-500">{data.price || 'Hubungi host'}</p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Pemilik Homestay</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <UserRound size={24} className="text-primary-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{data.owner}</p>
                    <p className="text-sm text-neutral-500">Host Lokal</p>
                  </div>
                </div>
              </div>

              {data.whatsapp_number && (
                <a
                  href={`https://wa.me/${data.whatsapp_number}?text=${encodeURIComponent(`Halo ${data.owner}, saya tertarik menginap di ${data.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-lift overlay-glow mt-6 flex w-full items-center justify-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
                >
                  <MessageCircle size={18} />
                  Hubungi via WhatsApp
                </a>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <h2 className="reveal-up font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
          Galeri Homestay
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(data.gallery || []).map((image, index) => {
            const imgUrl = typeof image === 'string' ? image : (image.url_medium || image.url)
            return (
              <div key={image.id || index} className="group hover-lift reveal-up overflow-hidden bg-white shadow-sm ring-1 ring-neutral-200/70 rounded-xl" style={{ '--reveal-delay': `${120 + index * 90}ms` }}>
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
                {typeof image !== 'string' && image.name && (
                  <div className="bg-surface-50 px-5 py-3 text-xs font-medium text-neutral-500 border-t border-neutral-100">
                    {image.name}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {!data.gallery?.length && (
          <div className="mt-8 bg-surface-50 px-5 py-4 text-sm text-neutral-600 ring-1 ring-neutral-200">
            Galeri homestay belum tersedia.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="border-t border-neutral-200 pt-8">
          <PrevNext
            prev={prev ? { href: `/accommodations/${prev.id}`, title: prev.name } : null}
            next={next ? { href: `/accommodations/${next.id}`, title: next.name } : null}
            prevLabel="Homestay Sebelumnya"
            nextLabel="Homestay Berikutnya"
            prevEmptyText="Belum ada homestay sebelumnya."
            nextEmptyText="Belum ada homestay berikutnya."
            prevCardClass="bg-white"
            nextCardClass="bg-white"
          />
        </div>
      </section>
    </>
  )
}
