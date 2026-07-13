import { Link, usePage } from '@inertiajs/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Tentang Enggano', href: '/villages' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Accommodations', href: '/accommodations' },
  { label: 'Aktivitas', href: '/kkn-log' },
  { label: 'UMKM', href: '/umkm' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { url } = usePage()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  // Cek apakah link aktif berdasarkan URL saat ini
  function isActive(href) {
    return url === href || url.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        solid
          ? 'border-neutral-200/80 bg-surface-50/95 text-primary-700 shadow-sm backdrop-blur'
          : 'border-white/10 bg-transparent text-white'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        <Link href="/" className="font-display text-3xl font-semibold transition-transform duration-500 hover:scale-[1.02]">
          Enggano
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-body text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  active
                    ? solid
                      ? 'text-primary-700 font-semibold'
                      : 'text-white font-semibold'
                    : solid
                      ? 'text-neutral-500 hover:text-primary-700'
                      : 'text-white/75 hover:text-white'
                }`}
              >
                {item.label}
                {/* Indikator garis bawah aktif */}
                {active && (
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all duration-300 ${
                      solid ? 'bg-primary-700' : 'bg-white'
                    }`}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <Link
          href="/local-guide"
          className="hidden hover-lift overlay-glow bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 md:inline-flex"
        >
          Local Guide
        </Link>

        <button
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(value => !value)}
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="reveal-up border-t border-neutral-200 bg-surface-50 px-6 pb-6 text-primary-700 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 py-2 font-body text-base transition-all duration-300 hover:translate-x-1 ${
                    active ? 'font-semibold text-primary-700' : 'text-neutral-600 hover:text-primary-700'
                  }`}
                >
                  {/* Bullet aktif di mobile */}
                  {active && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />}
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/local-guide"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center bg-accent-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-600"
            >
              Local Guide
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
