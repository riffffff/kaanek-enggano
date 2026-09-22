import { Phone } from 'lucide-react'
import PageHeader from '../../Components/PageHeader'
import SeoHead from '../../Components/SeoHead'

export default function LocalGuideIndex({ guides = [] }) {
  return (
    <>
      <SeoHead
        title="Pemandu Lokal Pulau Enggano"
        description="Temukan pemandu wisata lokal Pulau Enggano. Perjalanan bersama warga yang mengenal pulau, budaya, dan rute alam lebih dekat."
      />

      <PageHeader
        pageKey="localGuide"
        background="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80"
      />

      <div className="bg-[#f8f7f4] min-h-screen">
        <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-10 sm:py-16 md:py-20">
          <div className="reveal-up max-w-3xl mb-8 sm:mb-12">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 leading-tight">
              Pemandu Wisata Lokal
            </h2>
            <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
              Jelajahi keindahan alam dan kebudayaan Pulau Enggano didampingi warga lokal yang ramah dan berpengalaman.
            </p>
          </div>

          {!guides.length && (
            <div className="mb-8 bg-white px-6 py-5 text-sm text-slate-600 shadow-sm ring-1 ring-neutral-200/70 rounded-xl">
              Data local guide belum tersedia di admin.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 md:gap-8 xl:grid-cols-3">
            {guides.map((guide, index) => (
              <div
                key={guide.id}
                className="group hover-lift reveal-up bg-white shadow-sm overflow-hidden rounded-xl flex flex-col justify-between h-full"
                style={{ '--reveal-delay': `${140 + index * 60}` }}
              >
                <div className="relative overflow-hidden">
                  {guide.image ? (
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex aspect-4/3 items-center justify-center bg-slate-100 text-xs text-slate-400">
                      Belum ada foto
                    </div>
                  )}
                  <div className="absolute left-2 top-2 bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 rounded">
                    {guide.expertise || 'Local Guide'}
                  </div>
                </div>
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-sm sm:text-base font-semibold text-slate-800 leading-snug">
                      {guide.name}
                    </h3>
                    {guide.expertise && (
                      <p className="mt-0.5 text-[11px] sm:text-xs text-slate-400">{guide.expertise}</p>
                    )}
                  </div>
                  <a
                    href={`https://wa.me/${guide.whatsapp_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Phone size={13} />
                    WhatsApp
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
