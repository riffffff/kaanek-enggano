import { Link } from '@inertiajs/react'
import { ChevronRight, Home } from 'lucide-react'

/**
 * Breadcrumb Component (Desktop-focused)
 * 
 * @param {Array<{ label: string, href?: string }>} items - List of breadcrumb items
 * @param {string} className - Optional container class names
 */
export default function Breadcrumb({ items = [], className = '' }) {
  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={`hidden md:flex items-center gap-1.5 text-xs sm:text-sm text-neutral-500 font-medium ${className}`}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 hover:text-primary-800 transition-colors shrink-0"
      >
        <Home size={14} className="shrink-0" />
        <span>Beranda</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={index} className="flex items-center gap-1.5 min-w-0">
            <ChevronRight size={13} className="shrink-0 text-neutral-400" />
            {isLast || !item.href ? (
              <span
                className="font-semibold text-neutral-800 truncate max-w-[220px] lg:max-w-[360px]"
                aria-current={isLast ? 'page' : undefined}
                title={item.label}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-primary-800 transition-colors truncate max-w-[180px] shrink-0"
                title={item.label}
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
