import { Head, Link } from '@inertiajs/react'
import { Bath, BedDouble, MessageCircle, UserRound } from 'lucide-react'

const fallbackHomestay = {
  id: 'pondok-bundo',
  name: 'Pondok Bundo',
  owner: 'Ibu Wati',
  village: 'Apoho',
  image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  ],
  features: ['2 Kamar Tidur', 'Kamar Mandi Dalam', 'Termasuk Makan 3x', 'Akses Wi-Fi (terbatas)', 'Parkir Motor'],
  price_per_night: 200000,
  price: 'Rp 200.000 /malam',
  description: 'Pondok Bundo adalah homestay yang nyaman di Desa Apoho, Enggano. Dikelola oleh Ibu Wati yang ramah, homestay ini menawarkan pengalaman menginap yang autentik bersama keluarga lokal. Nikmati suasana tenang di tengah alam Enggano dan hidangan masakan tradisional khas pulau.',
  whatsapp_number: '6280000000000',
}

export default function HomestayShow({ homestay, prev = null, next = null }) {
  const data = {
    ...fallbackHomestay,
    ...homestay,
    // Pastikan field penting pakai fallback jika kosong
    description: homestay?.description || fallbackHomestay.description,
    price: homestay?.price || fallbackHomestay.price,
  }

  return (
    <>
      <Head title={data.name} />

      <section className="relative min-h-[78vh] overflow-hidden bg-primary-950 text-white">
        <img
          src={data.image}
          alt={data.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/20 via-primary-950/40 to-primary-950/85" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 pb-20 pt-36 md:px-12 lg:px-16">
          <div>
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/75">
              {data.village} Village
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {data.name}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Link href="/accommodations" className="reveal-up text-sm font-semibold text-primary-700 hover:text-primary-600">
          ← Kembali ke Daftar Homestay
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_360px]">
          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '100ms' }}>
            <h2 className="font-display text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              Penginapan Autentik di Tengah Alam Enggano
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600 md:text-lg">
              <p>{data.description}</p>
            </div>

            <div className="mt-10">
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Fasilitas yang Tersedia
              </h3>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {(data.features.length ? data.features : ['Homestay lokal', 'Ramah pengunjung', 'Hubungi host untuk detail']).map((feature, index) => {
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
                <p className="mt-2 text-3xl font-semibold text-accent-500">{data.price}</p>
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

              <a
                href={`https://wa.me/${data.whatsapp_number}?text=${encodeURIComponent(`Halo ${data.owner}, saya tertarik menginap di ${data.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift overlay-glow mt-6 flex w-full items-center justify-center gap-2 bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
              >
                <MessageCircle size={18} />
                Hubungi via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <h2 className="reveal-up font-display text-4xl font-semibold text-neutral-900 md:text-5xl">
          Galeri Homestay
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {(data.gallery && data.gallery.length > 0 ? data.gallery : fallbackHomestay.gallery).map((image, index) => (
            <div key={index} className="group hover-lift reveal-up overflow-hidden bg-white shadow-sm" style={{ '--reveal-delay': `${120 + index * 90}ms` }}>
              <img
                src={image}
                alt={`Galeri ${data.name} - ${index + 1}`}
                className="media-zoom aspect-4/3 w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24 lg:px-16">
        <div className="grid gap-4 border-t border-neutral-200 pt-8 md:grid-cols-2">
          <div className="hover-lift reveal-up bg-white p-6 shadow-sm ring-1 ring-neutral-200/70">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Homestay Sebelumnya</p>
            {prev ? (
              <Link href={`/accommodations/${prev.id}`} className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700">
                {prev.name}
              </Link>
            ) : (
              <p className="mt-3 text-sm text-neutral-500">Belum ada homestay sebelumnya.</p>
            )}
          </div>

          <div className="hover-lift reveal-up bg-white p-6 shadow-sm ring-1 ring-neutral-200/70" style={{ '--reveal-delay': '100ms' }}>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Homestay Berikutnya</p>
            {next ? (
              <Link href={`/accommodations/${next.id}`} className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700">
                {next.name}
              </Link>
            ) : (
              <p className="mt-3 text-sm text-neutral-500">Belum ada homestay berikutnya.</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
