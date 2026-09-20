import { Film } from 'lucide-react'
import { useState } from 'react'

export default function VideoDocumentaryCard({
  videoId = 'nTHJ1kEVIpw',
  title = 'Video Dokumenter',
  subtitle = 'Suara Enggano: Dokumentasi audio-visual peradaban, budaya, dan pesona pulau terluar.',
  badge,
  className = '',
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [thumbSrc, setThumbSrc] = useState(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl shadow-neutral-900/15 ring-1 ring-neutral-200/60 transition-all duration-500 hover:shadow-2xl ${className}`}
    >
      {isPlaying ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsPlaying(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setIsPlaying(true)
            }
          }}
          className="relative h-full w-full cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-accent-500/50"
          aria-label={`Putar video dokumenter ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbSrc}
            alt={title}
            className="media-zoom h-full w-full object-cover"
            onError={() => {
              setThumbSrc(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`)
            }}
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Optional Badge */}
          {badge && (
            <div className="absolute top-3.5 left-3.5 z-10 sm:top-4 sm:left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-300 backdrop-blur-md ring-1 ring-white/15">
                <Film className="h-3.5 w-3.5 text-accent-400" />
                {badge}
              </span>
            </div>
          )}

          {/* Center Play Button (Official YouTube Style) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <svg
              className="h-12 w-[68px] drop-shadow-xl transition-all duration-200 ease-out group-hover:scale-110 sm:h-14 sm:w-[78px]"
              viewBox="0 0 68 48"
              aria-hidden="true"
            >
              <path
                className="fill-[#212121]/80 transition-colors duration-200 group-hover:fill-[#ff0000]"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
              />
              <path d="M 45,24 27,14 27,34" fill="#ffffff" />
            </svg>
          </div>

          {/* Bottom Title & Subtitle */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6 text-left">
            <div className="flex items-center gap-2">
              <Film className="h-4 w-4 sm:h-5 sm:w-5 text-accent-400 shrink-0 drop-shadow" aria-hidden="true" />
              <h3 className="font-display text-base font-bold text-white line-clamp-1 drop-shadow-md sm:text-xl md:text-2xl">
                {title}
              </h3>
            </div>
            {subtitle && (
              <p className="mt-1 text-xs text-white/80 line-clamp-1 drop-shadow sm:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
