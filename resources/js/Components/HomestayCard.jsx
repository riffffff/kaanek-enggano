import { MessageCircle } from 'lucide-react'

export default function HomestayCard({ homestay }) {
  const whatsappUrl = `https://wa.me/${homestay.whatsapp_number}?text=${encodeURIComponent(`Halo, saya tertarik menginap di ${homestay.name}`)}`

  return (
    <article className="bg-white shadow-sm">
      {homestay.image && <img src={homestay.image} alt={homestay.name} className="aspect-[4/3] w-full object-cover" loading="lazy" />}
      <div className="p-5">
        <h3 className="font-display text-2xl font-semibold text-neutral-800">{homestay.name}</h3>
        <p className="mt-1 text-sm text-neutral-500">{homestay.owner}</p>
        {homestay.facilities && <p className="mt-3 text-sm leading-6 text-neutral-600">{homestay.facilities}</p>}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
          <MessageCircle size={15} />
          Hubungi Owner
        </a>
      </div>
    </article>
  )
}
