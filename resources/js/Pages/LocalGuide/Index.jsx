import { Head } from '@inertiajs/react'
import { Phone } from 'lucide-react'

const fallbackGuides = [
  {
    id: 'pak-sudi',
    name: 'Pak Sudi',
    village: 'Kahyapu',
    whatsappNumber: '6280000000000',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bu-rina',
    name: 'Bu Rina',
    village: 'Malakoni',
    whatsappNumber: '6280000000001',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pak-andi',
    name: 'Pak Andi',
    village: 'Apoho',
    whatsappNumber: '6280000000002',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bu-siti',
    name: 'Bu Siti',
    village: 'Meok',
    whatsappNumber: '6280000000003',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'pak-arif',
    name: 'Pak Arif',
    village: 'Enggano',
    whatsappNumber: '6280000000004',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'bu-nina',
    name: 'Bu Nina',
    village: 'Kaana',
    whatsappNumber: '6280000000005',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function LocalGuideIndex({ guides = [] }) {
  const guideEntries = guides.length ? guides : fallbackGuides

  return (
    <>
      <Head title="Local Guide" />

      <section className="relative overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80"
          alt="Local Guide Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Explore
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              Local Guide
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/90 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Hubungi guide lokal profesional untuk pengalaman terbaik menjelajahi Pulau Enggano dengan lebih mendalam.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7f4] min-h-screen">
        <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 lg:px-16">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {guideEntries.map((guide, index) => (
              <div
                key={guide.id}
                className="group hover-lift reveal-up bg-white shadow-sm overflow-hidden"
                style={{ '--reveal-delay': `${140 + index * 60}` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                    {guide.village}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-slate-800">
                    {guide.name}
                  </h3>
                  <a
                    href={`https://wa.me/${guide.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold"
                  >
                    <Phone size={18} />
                    Hubungi via WhatsApp
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
