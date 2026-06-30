import { Link } from '@inertiajs/react'
import { ShoppingBag } from 'lucide-react'

export default function VillageCard({ village }) {
  return (
    <Link href={`/villages/${village.slug ?? '#'}`} className="group block bg-white shadow-sm">
      {village.image && <img src={village.image} alt={village.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />}
      <div className="p-5">
        <h3 className="font-display text-2xl font-semibold text-neutral-800">{village.name}</h3>
        {village.summary && <p className="mt-2 text-sm leading-6 text-neutral-500">{village.summary}</p>}
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <ShoppingBag size={13} className="text-surface-500" />
          <span>{village.umkms_count ?? 0} UMKM Lokal</span>
        </div>
      </div>
    </Link>
  )
}
