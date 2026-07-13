import { Head, Link } from '@inertiajs/react'
import { Phone } from 'lucide-react'

const fallbackUmkms = [
  {
    id: 'usaha-1',
    name: 'Kedai Makan Ibu Siti',
    village: 'Kahyapu',
    description: 'Menjual makanan khas Enggano seperti nasi goreng seafood dan ikan bakar segar dari laut.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    whatsapp_number: '6280000000000',
  },
  {
    id: 'usaha-2',
    name: 'Kerajinan Anyaman',
    village: 'Kaana',
    description: 'Menghasilkan berbagai kerajinan tangan dari rotan dan anyaman daun khas Enggano.',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb7?auto=format&fit=crop&w=1200&q=80',
    whatsapp_number: '6280000000000',
  },
  {
    id: 'usaha-3',
    name: 'Pengolahan Kelapa',
    village: 'Malakoni',
    description: 'Memproduksi minyak kelapa murni dan berbagai produk olahan kelapa organik.',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    whatsapp_number: '6280000000000',
  },
  {
    id: 'usaha-4',
    name: 'Budidaya Ikan',
    village: 'Apoho',
    description: 'Usaha budidaya ikan air tawar dan keramba ikan laut yang dikelola secara tradisional.',
    image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?auto=format&fit=crop&w=1200&q=80',
    whatsapp_number: '6280000000000',
  },
]

export default function UmkmIndex({ umkms = [] }) {
  const entries = umkms.length
    ? umkms.map((item, index) => ({
      ...item,
      image: item.image ?? fallbackUmkms[index % fallbackUmkms.length].image,
    }))
    : fallbackUmkms

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
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-16">
          <div className="reveal-up max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-700 font-semibold">
              Usaha Lokal
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold text-slate-800 md:text-5xl">
              Jelajahi Produk UMKM
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {entries.map((item, index) => (
              <div
                key={item.id}
                className="group hover-lift reveal-up overflow-hidden bg-white shadow-sm"
                style={{ '--reveal-delay': `${140 + index * 60}` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                    {item.village}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600 line-clamp-3">
                    {item.description}
                  </p>
                  <a
                    href={`https://wa.me/${item.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-700 text-white text-sm font-semibold hover:bg-amber-800 transition-colors"
                  >
                    <Phone size={16} />
                    Hubungi
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
