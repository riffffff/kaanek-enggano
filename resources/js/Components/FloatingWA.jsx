import { usePage } from '@inertiajs/react'
import { MessageCircle } from 'lucide-react'

export default function FloatingWA() {
  const { appWhatsappNumber } = usePage().props
  const number = appWhatsappNumber ?? '6280000000000'
  const url = `https://wa.me/${number}?text=${encodeURIComponent('Halo, saya ingin info tentang Enggano')}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi pengelola Web Enggano via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center bg-accent-500 text-white shadow-lg hover:bg-accent-600"
    >
      <MessageCircle size={22} />
    </a>
  )
}
