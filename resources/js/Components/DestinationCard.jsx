import { Link } from '@inertiajs/react'
import Badge from './Badge'

export default function DestinationCard({ destination, isLarge = false }) {
  return (
    <Link
      href={`/destinations/${destination.slug ?? '#'}`}
      className={`group hover-lift reveal-up relative block overflow-hidden ${isLarge ? 'md:row-span-2' : ''}`}
      style={{ '--reveal-delay': '140ms' }}
    >
      <div className={`${isLarge ? 'aspect-4/3 md:aspect-auto md:h-full' : 'aspect-4/3'} overflow-hidden`}>
        <img
          src={destination.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'}
          alt={destination.name}
          className="media-zoom h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white">
        <h3 className={`mt-3 font-display font-semibold text-white ${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{destination.name}</h3>
        {destination.short_description && (
          <p className={`mt-2 line-clamp-1 leading-6 text-white/80 ${isLarge ? 'text-base md:text-lg' : 'text-sm'}`}>
            {destination.short_description}
          </p>
        )}
      </div>
    </Link>
  )
}
