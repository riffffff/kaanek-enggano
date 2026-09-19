import { Head, Link } from '@inertiajs/react'
import {
  BookOpen,
  UsersRound,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { historyData, historyImageFallback } from '../../data/history.js'
import Button from '../../Components/Button'
import PageHeader from '../../Components/PageHeader'

export default function VillageHistory({ history = null }) {
  const data = history || historyData
  const sections = data.sections || []
  const visibleSections = sections.filter((section) => ['sejarah', 'sosial-budaya'].includes(section.id))
  const [activeTab, setActiveTab] = useState(visibleSections[0]?.id || 'sejarah')
  const activeSection = visibleSections.find((section) => section.id === activeTab) || visibleSections[0]
  const paragraphs = (activeSection?.content || '').split('\n\n').filter((p) => p.trim())
  const contentRef = useRef(null)

  const handleTabChange = (sectionId) => {
    setActiveTab(sectionId)
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Head title={`${data.title}`} />

      <PageHeader
        pageKey="history"
        title={data.title}
        subtitle={data.subtitle}
        background={data.heroImage || historyImageFallback}
      />

      {/* Main Content Area */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 py-16 md:py-24">
        <Button
          href="/villages"
          variant="ghostLight"
          showArrow
          arrowPosition="left"
          className="reveal-up mb-12"
        >
          Kembali ke Villages
        </Button>

        {/*  TAB NAVIGATION  */}
        <div className="reveal-up mb-10 sticky top-0 z-20 -mx-6 md:mx-0 md:static md:z-auto bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-0 border-y border-neutral-200/70 md:border-0 pt-1.5 pb-2 md:p-0">
          <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 gap-2 md:gap-3 px-6 md:px-0 scrollbar-hide">
            {visibleSections.map((sec) => {
              const isActive = sec.id === activeTab
              const TabIcon = sec.id === 'sosial-budaya' ? UsersRound : BookOpen
              return (
                <button
                  type="button"
                  key={sec.id}
                  onClick={() => handleTabChange(sec.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`shrink-0 md:shrink inline-flex items-center justify-center min-h-[56px] md:min-h-[64px] px-5 md:px-4 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-600/20 scale-[1.01]'
                      : 'border-neutral-200 bg-white/70 hover:bg-white hover:border-primary-200 hover:text-primary-700 text-neutral-700'
                  }`}
                >
                  <TabIcon size={17} className="md:w-[18px] md:h-[18px] shrink-0 mr-2 md:mr-2.5" strokeWidth={2.1} />
                  <span className="whitespace-nowrap">{sec.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/*  TAB CONTENT: Active Section  */}
        <article
          key={activeSection.id}
          ref={contentRef}
          className="bg-white rounded-3xl p-8 md:p-10 lg:p-14 shadow-xl shadow-neutral-200/60 border border-neutral-200/80"
        >
          {/* Section Heading */}
          <header className="mb-8 md:mb-12 pb-6 md:pb-10 border-b border-dashed border-neutral-200">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight">
              {activeSection.heading || activeSection.label}
            </h2>
            <div className="mt-4 h-1 w-10 bg-accent-500 rounded-full" />
          </header>

          {/* Paragraphs */}
          <div className="space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body text-justify">
            {paragraphs.map((p, idx) => {
              const isLegendSection = activeSection.id === 'sejarah' && idx === 3
              if (isLegendSection) return null

              return (
                <p
                  key={idx}
                  className="indent-8 md:indent-10"
                >
                  {p}
                </p>
              )
            })}
          </div>

          {activeSection.id === 'sosial-budaya' && activeSection.tribes?.length > 0 && (
            <section className="mt-10 border-t border-neutral-200 pt-8 md:mt-12 md:pt-10">
              <h3 className="mb-4 font-display text-2xl font-semibold text-neutral-900 md:text-3xl">
                {activeSection.tribesTitle}
              </h3>
              <div className="mb-6 space-y-5 text-base leading-relaxed text-neutral-700 md:text-lg">
                {(activeSection.tribesIntro || '').split('\n\n').filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                  <p key={index} className="text-justify indent-8 md:indent-10">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              <ol className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-neutral-700 md:pl-8 md:text-lg">
                {activeSection.tribes.map((tribe) => (
                  <li key={tribe.name} className="pl-2 text-justify">
                    <strong className="font-semibold text-neutral-900">{tribe.name}</strong>{' '}
                    {tribe.description}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {activeSection.id === 'sosial-budaya' && activeSection.villages?.length > 0 && (
            <section className="mt-10 border-t border-neutral-200 pt-8 md:mt-12 md:pt-10">
              <h3 className="mb-6 font-display text-2xl font-semibold text-neutral-900 md:text-3xl">
                {activeSection.villagesTitle}
              </h3>
              <ol className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-neutral-700 md:pl-8 md:text-lg">
                {activeSection.villages.map((village) => (
                  <li key={village.name} className="pl-2">
                    <strong className="font-semibold text-neutral-900">{village.name}</strong>
                    <div className="mt-2 space-y-3 pl-4 md:pl-6">
                      {(village.description || '').split('\n\n').filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                        <p key={index} className="text-justify indent-12 md:indent-16">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

        </article>
      </section>
    </>
  )
}
