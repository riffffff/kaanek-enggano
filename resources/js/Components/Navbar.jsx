import { Link, usePage } from '@inertiajs/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { url } = usePage()
  const { tt } = useTranslate('common')
  const belajarBahasaUrl = 'https://katekora-eic-enggano.vercel.app'

  const navItems = [
    { label: tt('Tentang Enggano', 'nav.aboutEnggano'), href: '/about-enggano' },
    { label: tt('Destinations', 'nav.destinations'), href: '/destinations' },
    { label: tt('Accommodations', 'nav.accommodations'), href: '/accommodations' },
    { label: tt('Aktivitas', 'nav.activities'), href: '/activities' },
    { label: tt('Tentang Kami', 'nav.aboutUs'), href: '/credits' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = url === '/' || url === '' || url.startsWith('/?') || url.startsWith('/#')
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
          : isHome
            ? 'border-white/10 bg-transparent text-white'
            : 'border-neutral-200/80 bg-surface-50/95 text-primary-700 shadow-sm backdrop-blur md:border-white/10 md:bg-transparent md:text-white'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full items-center justify-between px-4 sm:px-6 lg:w-[80%] lg:px-0">
        <Link href="/" className="font-display text-3xl font-semibold transition-transform duration-500 hover:scale-[1.02]">
          Enggano
        </Link>

        <div className="hidden items-center gap-6 md:flex">
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
          <a
            href={belajarBahasaUrl}
            target="_blank"
            rel="noreferrer"
            className={`nav-bounce group inline-flex items-center gap-1 font-body text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              solid
                ? 'text-accent-600 hover:text-accent-700'
                : 'text-accent-400 hover:text-accent-300'
            }`}
          >
            <span>Bahasa Enggano</span>
            <ArrowUpRight
              size={13}
              className="opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher solid={solid} />
          <Link
            href="/local-guide"
            className="hover-lift overlay-glow bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800"
          >
            {tt('Local Guide', 'nav.localGuide')}
          </Link>
        </div>

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
          <div className="flex flex-col gap-3 pt-4">
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

            {/* Bahasa Enggano sejajar langsung di bawah Tentang Kami */}
            <a
              href={belajarBahasaUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="nav-bounce flex items-center justify-between py-2 font-body text-base font-semibold text-accent-600 hover:text-accent-700 transition-all duration-300 hover:translate-x-1"
            >
              <span>Bahasa Enggano</span>
              <ArrowUpRight size={16} className="opacity-70" />
            </a>

            {/* Pemisah & Tombol Aksi di Bawah */}
            <div className="mt-2 pt-4 border-t border-neutral-200/80 flex flex-col gap-3">
              <div className="flex justify-center">
                <LanguageSwitcher solid={true} />
              </div>
              <Link
                href="/local-guide"
                onClick={() => setOpen(false)}
                className="inline-flex justify-center rounded-xl bg-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-xs transition-all duration-300 hover:bg-primary-800 active:scale-[0.98]"
              >
                {tt('Local Guide', 'nav.localGuide')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
