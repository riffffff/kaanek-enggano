import { Link } from '@inertiajs/react'

export default function PrevNext({
  prev,
  next,
  prevLabel = 'Previous',
  nextLabel = 'Next',
  prevEmptyText = 'Belum ada entri sebelumnya.',
  nextEmptyText = 'Belum ada entri berikutnya.',
  prevCardClass = 'bg-surface-50',
  nextCardClass = 'bg-surface-50',
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className={`hover-lift reveal-up ${prevCardClass} p-6 ring-1 ring-neutral-200/70`}>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{prevLabel}</p>
        {prev ? (
          <Link
            href={prev.href}
            className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700"
          >
            {prev.title}
          </Link>
        ) : (
          <p className="mt-3 text-sm text-neutral-500">{prevEmptyText}</p>
        )}
      </div>

      <div className={`hover-lift reveal-up ${nextCardClass} p-6 ring-1 ring-neutral-200/70`} style={{ '--reveal-delay': '100ms' }}>
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{nextLabel}</p>
        {next ? (
          <Link
            href={next.href}
            className="mt-3 block font-display text-2xl font-semibold text-neutral-900 hover:text-primary-700"
          >
            {next.title}
          </Link>
        ) : (
          <p className="mt-3 text-sm text-neutral-500">{nextEmptyText}</p>
        )}
      </div>
    </div>
  )
}
