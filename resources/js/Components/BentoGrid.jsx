import { Link } from '@inertiajs/react'

const pillars = [
  {
    eyebrow: 'EKSPLORASI',
    title: 'Destinasi Bahari',
    description: 'Garis pantai tak tersentuh, laguna tersembunyi, dan kekayaan terumbu karang yang menanti untuk dijelajahi di perairan Samudera Hindia.',
    href: '/destinations?type=bahari',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    eyebrow: 'KONSERVASI',
    title: 'Hutan Endemik',
    description: 'Paru-paru pulau yang menyimpan flora dan fauna langka.',
    href: '/destinations?type=wildlife',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
  },
  {
    eyebrow: 'BUDAYA',
    title: 'Warisan Enam Suku',
    description: 'Lapisan sejarah, tradisi, dan artefak yang membentuk identitas Enggano.',
    href: '/destinations?type=history',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
  },
]

export default function BentoGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2">
      {pillars.map((pillar, index) => (
        <Link
          key={pillar.title}
          href={pillar.href}
          className={`group hover-lift overlay-glow reveal-up relative min-h-72 overflow-hidden bg-primary-900 text-white ${index === 0 ? 'md:row-span-2' : ''}`}
          style={{ '--reveal-delay': `${120 + index * 100}ms` }}
        >
          <img src={pillar.image} alt="" className="media-zoom absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xs font-semibold tracking-[0.25em] text-white/80">{pillar.eyebrow}</p>
            <h3 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{pillar.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80">{pillar.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
