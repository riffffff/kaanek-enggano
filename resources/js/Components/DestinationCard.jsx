import { Link } from '@inertiajs/react'
import { ChevronRight } from 'lucide-react'

export default function DestinationCard({ destination, isLarge = false, className = '' }) {
  return (
    <Link
      href={`/destinations/${destination.slug ?? '#'}`}
      className={`group reveal-up relative block overflow-hidden rounded-2xl ${isLarge ? 'md:row-span-2' : ''} ${className}`}
      style={{ '--reveal-delay': '140ms' }}
    >
      {/* Gambar */}
      <div className={`${isLarge ? 'aspect-4/3 md:aspect-auto md:h-full' : 'aspect-[3/4]'} absolute inset-0 overflow-hidden`}>
        <img
          src={destination.image || 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'}
          alt={destination.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />


      {/* Konten bawah */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-5 lg:p-6 text-white z-10">
        <h3 className={`font-display font-bold leading-tight tracking-tight drop-shadow-lg mb-1.5 md:mb-2 ${isLarge ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl lg:text-2xl'}`}>
          {destination.name}
        </h3>
        {(destination.short_description || destination.description) && (
          <p className="text-[11px] md:text-xs leading-relaxed text-white/85 line-clamp-2 mb-2 md:mb-3 drop-shadow-md">
            {destination.short_description || destination.description}
          </p>
        )}
        <div className="inline-flex items-center gap-1.5 md:gap-2 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
          <span>Jelajahi</span>
          <ChevronRight size={13} className="md:w-[15px] md:h-[15px] transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
