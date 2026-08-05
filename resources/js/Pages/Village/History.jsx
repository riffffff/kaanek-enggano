import { Head, Link } from '@inertiajs/react'
import {
  ArrowLeft,
  Compass,
  Users,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import { useState } from 'react'
import { historyData, historyImageFallback } from '../../data/history.js'
import Button from '../../Components/Button'

export default function VillageHistory({ history = null }) {
  const data = history || historyData
  const sections = data.sections || []
  const [activeTab, setActiveTab] = useState(sections[0]?.id || 'sejarah')
  const activeSection = sections.find((s) => s.id === activeTab) || sections[0]
  const paragraphs = (activeSection?.content || '').split('\n\n').filter((p) => p.trim())

  return (
    <>
      <Head title={`${data.title} | Desa & Budaya`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={data.heroImage || historyImageFallback}
          alt={data.title}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/75" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Warisan Leluhur
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl leading-[1.05]" style={{ '--reveal-delay': '120ms' }}>
              {data.title}
            </h1>
            {data.subtitle && (
              <p className="reveal-up mt-6 text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl" style={{ '--reveal-delay': '200ms' }}>
                {data.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Button
          href="/villages"
          variant="ghostLight"
          showArrow
          arrowPosition="left"
          className="reveal-up mb-12"
        >
          Kembali ke Villages
        </Button>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 reveal-up">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary-50 text-primary-700 shrink-0">
              <Compass size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Nama Asli</span>
              <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Ekeppu Yanipah</h4>
              <p className="text-xs text-neutral-500 mt-1">Juga dikenal sebagai Pulau Aru oleh masyarakat adat kuno.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent-50 text-accent-700 shrink-0">
              <Users size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sistem Kekerabatan</span>
              <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Matrilineal</h4>
              <p className="text-xs text-neutral-500 mt-1">Garis keturunan dari pihak Ibu (Nanipah).</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Pakta Perdamaian</span>
              <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Paano&apos;a (1908)</h4>
              <p className="text-xs text-neutral-500 mt-1">Penyatuan dan pemulihan kerukunan 6 suku.</p>
            </div>
          </div>
        </div>

        {/* ==================== TAB NAVIGATION 4 SECTION ==================== */}
        <div className="reveal-up mb-10 sticky top-0 z-20 -mx-6 md:mx-0 md:static md:z-auto bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-0 border-y border-neutral-200/70 md:border-0 pt-1.5 pb-2 md:p-0">
          <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 gap-2 md:gap-3 px-6 md:px-0 scrollbar-hide">
            {sections.map((sec) => {
              const isActive = sec.id === activeTab
              return (
                <button
                  type="button"
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`shrink-0 md:shrink inline-flex items-center justify-center min-h-[56px] md:min-h-[64px] px-5 md:px-4 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/20 scale-[1.01]'
                      : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-primary-200 hover:text-primary-700 text-neutral-700'
                  }`}
                >
                  <BookOpen size={17} className="md:w-[18px] md:h-[18px] shrink-0 mr-2 md:mr-2.5" strokeWidth={2.1} />
                  <span className="whitespace-nowrap">{sec.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ==================== TAB CONTENT: Active Section ==================== */}
        <article
          key={activeSection.id}
          className="bg-white rounded-3xl p-8 md:p-10 lg:p-14 shadow-xl shadow-neutral-200/60 border border-neutral-200/80"
        >
          {/* Section Eyelash + Heading */}
          <header className="mb-10 md:mb-12 pb-8 md:pb-10 border-b border-dashed border-neutral-200">
            <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-primary-700 font-bold">
              {activeSection.eyelash || activeSection.shortLabel || ''}
            </p>
            <h2 className="mt-4 md:mt-5 font-display text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 leading-[1.08]">
              {activeSection.heading || activeSection.label}
            </h2>
          </header>

          {/* Highlight Sparkles Quote (hanya untuk tab Sejarah — baris pertama) */}
          {activeSection.id === 'sejarah' && paragraphs.length > 4 && (
            <div className="mb-10 md:mb-12 p-6 md:p-8 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-medium text-base md:text-lg leading-relaxed flex items-start gap-4 shadow-sm">
              <Sparkles size={24} className="text-amber-600 shrink-0 mt-1" />
              <div>
                &quot;Pertemuan antara Kamanppa dan Nanipah di pesisir pantai Pulau Enggano menjadi batu pijakan pertama terbentuknya kebudayaan, tata bahasa, dan tatanan adat lima suku induk asli.&quot;
              </div>
            </div>
          )}

          {/* Paragraphs */}
          <div className="space-y-6 md:space-y-7 text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body">
            {paragraphs.map((p, idx) => {
              const isFirst = idx === 0
              const isLegendSection = activeSection.id === 'sejarah' && idx === 3
              if (isLegendSection) return null

              return (
                <p
                  key={idx}
                  className={`${
                    isFirst
                      ? 'first-letter:text-5xl first-letter:md:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-primary-800 first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:pt-1'
                      : ''
                  }`}
                >
                  {p}
                </p>
              )
            })}
          </div>

          {/* Sejarah: Special Box Kamanppa & Nanipah (setelah paragraf 3) */}
          {activeSection.id === 'sejarah' && paragraphs.length > 4 && (
            <div className="my-10 md:my-14 p-7 md:p-9 lg:p-10 rounded-3xl bg-gradient-to-br from-primary-900 via-neutral-900 to-neutral-900 text-white shadow-2xl">
              <div className="flex items-center gap-3 text-accent-400 text-xs md:text-sm font-bold uppercase tracking-[0.25em] mb-4">
                <BookOpen size={18} strokeWidth={2.1} />
                Kisah Legenda Peradaban
              </div>
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-5 leading-[1.12]">
                Asal Usul Kamanppa &amp; Nanipah
              </h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base mb-6">
                {paragraphs[3]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10 text-xs md:text-sm text-white/85">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-400 shadow-[0_0_0_4px_rgba(250,204,21,0.18)]" />
                  <span>
                    <strong className="text-white font-semibold mr-1">Kamanppa:</strong>
                    Dari &quot;Kah Kaminppa&quot; (Ayo pergi memecahkan)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-400 shadow-[0_0_0_4px_rgba(250,204,21,0.18)]" />
                  <span>
                    <strong className="text-white font-semibold mr-1">Nanipah:</strong>
                    Dari &quot;Nai Nipahha&quot; (Ibu yang memecahkan)
                  </span>
                </div>
              </div>
            </div>
          )}
        </article>

        {/* Footer Back Action */}
        <div className="pt-14 mt-4 md:mt-6 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/villages"
            className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke Desa &amp; Budaya</span>
          </Link>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-sm hover:shadow-md"
          >
            <span>Jelajahi Destinasi Enggano</span>
          </Link>
        </div>
      </section>
    </>
  )
}
