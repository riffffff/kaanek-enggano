import { Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

export default function PrevNext({
  prev,
  next,
  indexHref = null,
  indexLabel = 'Lihat Semua',
  prevLabel = 'Sebelumnya',
  nextLabel = 'Selanjutnya',
  className = '',
}) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Navigasi entri"
      className={`flex items-center justify-between gap-3 sm:gap-6 py-5 sm:py-6 border-y border-neutral-200/80 ${className}`}
    >
      {/* Sisi Kiri: Entri Sebelumnya */}
      <div className="flex-1 min-w-0">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex flex-col items-start focus:outline-hidden text-left"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-primary-800 transition-colors">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
              <span>{prevLabel}</span>
            </span>
            <span className="mt-1 font-display text-sm sm:text-base md:text-lg font-semibold text-neutral-900 group-hover:text-primary-800 line-clamp-1 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div className="opacity-25 cursor-not-allowed select-none text-left">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <ArrowLeft size={13} />
              <span>{prevLabel}</span>
            </span>
            <span className="mt-1 block text-xs sm:text-sm text-neutral-400">
              -
            </span>
          </div>
        )}
      </div>

      {/* Sisi Tengah: Tombol Kembali ke Daftar / Indeks atau Pemisah Halus */}
      {indexHref ? (
        <div className="shrink-0 px-2 sm:px-4">
          <Link
            href={indexHref}
            title={indexLabel}
            aria-label={indexLabel}
            className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-neutral-100/90 hover:bg-primary-50 text-neutral-500 hover:text-primary-800 transition-all border border-neutral-200/70 hover:border-primary-200 active:scale-95 shadow-2xs"
          >
            <LayoutGrid size={15} className="group-hover:scale-110 transition-transform" />
          </Link>
        </div>
      ) : (
        <div className="shrink-0 w-px h-7 bg-neutral-200/70 mx-1" />
      )}

      {/* Sisi Kanan: Entri Selanjutnya */}
      <div className="flex-1 min-w-0 text-right">
        {next ? (
          <Link
            href={next.href}
            className="group flex flex-col items-end focus:outline-hidden text-right"
          >
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-primary-800 transition-colors">
              <span>{nextLabel}</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="mt-1 font-display text-sm sm:text-base md:text-lg font-semibold text-neutral-900 group-hover:text-primary-800 line-clamp-1 transition-colors">
              {next.title}
            </span>
          </Link>
        ) : (
          <div className="opacity-25 cursor-not-allowed select-none text-right">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span>{nextLabel}</span>
              <ArrowRight size={13} />
            </span>
            <span className="mt-1 block text-xs sm:text-sm text-neutral-400">
              -
            </span>
          </div>
        )}
      </div>
    </nav>
  )
}
