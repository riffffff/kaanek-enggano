import { getPageHeader } from '../data/pageHeaders.js'

export default function PageHeader({ pageKey, background, ...overrides }) {
  const header = getPageHeader(pageKey, {
    ...overrides,
    ...(background ? { background } : {}),
  })

  return (
    <>
      {/* Spacer di mobile agar konten tidak tertutup fixed navbar h-20 */}
      <div className="h-20 md:hidden" />

      {/* Hero PageHeader hanya tampil di desktop (≥ 768px) */}
      <section className="relative hidden md:block overflow-hidden text-white">
        {header.background && (
          <img
            src={header.background}
            alt={header.title}
            className="reveal-scale absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pb-32 pt-48">
          <div className="max-w-4xl">
            <h1 className="reveal-up font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold" style={{ '--reveal-delay': '120ms' }}>
              {header.title}
            </h1>
            <div className="reveal-up mt-4 h-1 w-12 bg-accent-500 rounded-full" style={{ '--reveal-delay': '160ms' }} />
            {header.subtitle && (
              <p className="reveal-up mt-4 text-base leading-7 text-white/90 md:text-xl max-w-2xl" style={{ '--reveal-delay': '200ms' }}>
                {header.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
