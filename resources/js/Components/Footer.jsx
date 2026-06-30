import { Link } from '@inertiajs/react'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary-900 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="float-soft pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-12 lg:px-16">
        <div className="reveal-up" style={{ '--reveal-delay': '60ms' }}>
          <p className="font-display text-3xl font-semibold">Enggano</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Mendokumentasikan dan memajukan pesona perbatasan samudera melalui penelitian dan eksplorasi berkelanjutan.
          </p>
        </div>

        <div className="reveal-up" style={{ '--reveal-delay': '140ms' }}>
          <p className="text-xs font-semibold tracking-[0.25em] text-white/50">NAVIGASI</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/destinations" className="transition-transform duration-300 hover:translate-x-1 hover:text-white">
              Destinations
            </Link>
            <Link href="/accommodations" className="transition-transform duration-300 hover:translate-x-1 hover:text-white">
              Accommodations
            </Link>
            <Link href="/kkn-log" className="transition-transform duration-300 hover:translate-x-1 hover:text-white">
              KKN Log
            </Link>
          </div>
        </div>

        <div className="reveal-up" style={{ '--reveal-delay': '220ms' }}>
          <p className="text-xs font-semibold tracking-[0.25em] text-white/50">INFORMASI</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/villages" className="transition-transform duration-300 hover:translate-x-1 hover:text-white">
              Villages
            </Link>
            <Link href="/privacy-policy" className="transition-transform duration-300 hover:translate-x-1 hover:text-white">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="reveal-up text-xs text-white/50 md:col-span-3" style={{ '--reveal-delay': '300ms' }}>
          {new Date().getFullYear()} Enggano. KKN UGM Credit.
        </div>
      </div>
    </footer>
  )
}
