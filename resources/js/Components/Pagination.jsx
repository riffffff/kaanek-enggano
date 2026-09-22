import { Link } from '@inertiajs/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Renders Laravel LengthAwarePaginator links.
 * Expects the `links` array from an Inertia-serialized paginator:
 *   [{ url, label, active }, ...]
 */
export default function Pagination({ links = [], only = null, onNavigate = null }) {
  if (!links || links.length <= 3) return null

  const linkProps = {
    preserveScroll: !onNavigate,
    preserveState: true,
    only: only || undefined,
    onSuccess: onNavigate || undefined,
  }

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1 pt-6">
      {links.map((link, i) => {
        const isPrev = i === 0
        const isNext = i === links.length - 1

        if (isPrev || isNext) {
          return (
            <Link
              key={i}
              href={link.url ?? '#'}
              {...linkProps}
              className={[
                'inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm transition',
                link.url
                  ? 'text-neutral-600 hover:bg-neutral-100'
                  : 'pointer-events-none text-neutral-300',
              ].join(' ')}
              aria-label={isPrev ? 'Halaman sebelumnya' : 'Halaman berikutnya'}
              aria-disabled={!link.url}
            >
              {isPrev ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </Link>
          )
        }

        return (
          <Link
            key={i}
            href={link.url ?? '#'}
            {...linkProps}
            className={[
              'inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition',
              link.active
                ? 'bg-primary-700 text-white'
                : link.url
                  ? 'text-neutral-600 hover:bg-neutral-100'
                  : 'pointer-events-none text-neutral-400',
            ].join(' ')}
            aria-current={link.active ? 'page' : undefined}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
        )
      })}
    </nav>
  )
}
