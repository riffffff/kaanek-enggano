import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'
import { tribesData, tribeImageFallback } from '../../data/tribes.js'

export default function VillageTribe({ tribe = null, id = null }) {
  const tribeData = tribe || tribesData.find(item => item.id === id) || tribesData[0]

  return (
    <>
      <Head title={`${tribeData.name} | Desa & Budaya`} />

      <section className="relative overflow-hidden text-white">
        <img
          src={tribeData.image || tribeImageFallback}
          alt={tribeData.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <Button
            href="/villages"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up mb-4"
          >
            Kembali
          </Button>
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              {tribeData.village}
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {tribeData.name}
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7f4] min-h-screen">
        <section className="mx-auto max-w-4xl px-6 py-20 md:px-12 lg:px-16">
          <div className="reveal-up space-y-6 text-base leading-8 text-slate-600 md:text-lg">
            {tribeData.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="reveal-up" style={{ '--reveal-delay': `${120 + index * 80}` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
