import { MessageCircle } from 'lucide-react'
import Badge from './Badge'

export default function UmkmCard({ umkm }) {
  const whatsappUrl = `https://wa.me/${umkm.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${umkm.business_name}`)}`

  return (
    <article className="bg-white p-4 shadow-sm">
      {umkm.product_photos && <img src={umkm.product_photos} alt={umkm.business_name} className="mb-3 aspect-square w-full object-cover" loading="lazy" />}
      <Badge variant="umkm">{umkm.business_type}</Badge>
      <h4 className="mt-2 font-display text-xl font-semibold text-neutral-800">{umkm.business_name}</h4>
      <p className="text-sm text-neutral-500">{umkm.owner_name}</p>
      {umkm.notes && <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-500">{umkm.notes}</p>}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
        <MessageCircle size={14} />
        Pesan via WA
      </a>
    </article>
  )
}
