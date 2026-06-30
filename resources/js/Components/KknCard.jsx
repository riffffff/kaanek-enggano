import { Link } from '@inertiajs/react'
import { Calendar } from 'lucide-react'
import Badge from './Badge'

export default function KknCard({ item }) {
  return (
    <Link href={`/kkn-log/${item.slug ?? '#'}`} className="group hover-lift reveal-up block bg-white shadow-sm" style={{ '--reveal-delay': '180ms' }}>
      {item.image && <img src={item.image} alt={item.title} className="media-zoom aspect-4/3 w-full object-cover" loading="lazy" />}
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          {item.category && <Badge variant={item.category}>{item.category}</Badge>}
          {item.date && (
            <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
              <Calendar size={13} />
              {item.date}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl font-semibold text-neutral-800">{item.title}</h3>
      </div>
    </Link>
  )
}
