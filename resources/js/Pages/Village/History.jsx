import { Link } from '@inertiajs/react'
import {
  BookOpen,
  UsersRound,
} from 'lucide-react'
import { useState } from 'react'
import { historyData, historyImageFallback } from '../../data/history.js'
import Button from '../../Components/Button'
import PageHeader from '../../Components/PageHeader'
import Breadcrumb from '../../Components/Breadcrumb'
import SeoHead from '../../Components/SeoHead'

export default function VillageHistory({ history = null }) {
  const data = history || historyData
  const sections = data.sections || []
  const visibleSections = sections.filter((section) => ['sejarah', 'sosial-budaya'].includes(section.id))
  const [activeTab, setActiveTab] = useState(visibleSections[0]?.id || 'sejarah')
  const activeSection = visibleSections.find((section) => section.id === activeTab) || visibleSections[0]
  const paragraphs = (activeSection?.content || '').split('\n\n').filter((p) => p.trim())

  const handleTabChange = (sectionId) => {
    setActiveTab(sectionId)
  }

  return (
    <>
      <SeoHead
        title={`${data.title} — Sejarah Pulau Enggano`}
        description={data.subtitle || 'Sejarah, sosial budaya, dan enam suku adat Pulau Enggano.'}
        image={data.heroImage || historyImageFallback}
        type="article"
      />

      <PageHeader
        pageKey="history"
        title={data.title}
        subtitle={data.subtitle}
        background={data.heroImage || historyImageFallback}
      />

      {/* Main Content Area */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pt-8 sm:pt-12 md:pt-16 pb-16 md:pb-24">
        <Breadcrumb
          className="reveal-up mb-6 sm:mb-8"
          items={[
            { label: 'Tentang Enggano', href: '/about-enggano' },
            { label: data.title || 'Sejarah & Budaya' },
          ]}
        />

        {/* TAB NAVIGATION — Minimalist with middle divider & active underline */}
        <div className="reveal-up mb-6 sm:mb-8 flex justify-start">
          <div className="inline-flex items-center w-full sm:w-auto">
            {visibleSections.map((sec, idx) => {
              const isActive = sec.id === activeTab
              const TabIcon = sec.id === 'sosial-budaya' ? UsersRound : BookOpen
              return (
                <div key={sec.id} className="flex-1 sm:flex-initial flex items-center">
                  {idx > 0 && (
                    <span className="h-5 w-px bg-neutral-300 shrink-0" aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleTabChange(sec.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold transition-colors duration-200 ${
                      isActive
                        ? 'text-primary-800'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    <TabIcon
                      size={17}
                      strokeWidth={isActive ? 2.2 : 1.8}
                      className={`shrink-0 transition-colors ${
                        isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
                      }`}
                    />
                    <span className="whitespace-nowrap">{sec.label}</span>

                    {/* Underline for active tab */}
                    <span
                      className={`absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-[2.5px] rounded-full transition-all duration-300 ${
                        isActive ? 'bg-accent-500 opacity-100 scale-x-100' : 'bg-accent-500 opacity-0 scale-x-0'
                      }`}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/*  TAB CONTENT: Active Section  */}
        <article
          key={activeSection.id}
          className="bg-white rounded-2xl p-5 sm:p-8 md:p-10 lg:p-14 shadow-sm sm:shadow-xl shadow-neutral-200/60 border border-neutral-200/80"
        >
          {/* Section Heading */}
          <header className="mb-5 sm:mb-8 md:mb-12 pb-4 sm:pb-6 md:pb-10 border-b border-dashed border-neutral-200">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight text-neutral-900 leading-tight">
              {activeSection.heading || activeSection.label}
            </h2>
            <div className="mt-3 h-1 w-10 bg-accent-500 rounded-full" />
          </header>

          {/* Paragraphs */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-relaxed md:leading-8 text-neutral-700 font-body">
            {paragraphs.map((p, idx) => {
              const isLegendSection = activeSection.id === 'sejarah' && idx === 3
              if (isLegendSection) return null

              return (
                <p
                  key={idx}
                  className="indent-6 sm:indent-8 md:indent-10 text-justify"
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
              <div className="mb-6 space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg leading-7 sm:leading-relaxed md:leading-8 text-neutral-700 font-body">
                {(activeSection.tribesIntro || '').split('\n\n').filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                  <p key={index} className="indent-6 sm:indent-8 md:indent-10 text-justify">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
              <ol className="list-decimal space-y-3 pl-5 sm:pl-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-relaxed md:leading-8 text-neutral-700 font-body md:pl-8">
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
              <ol className="list-decimal space-y-3 pl-5 sm:pl-6 text-sm sm:text-base md:text-lg leading-7 sm:leading-relaxed md:leading-8 text-neutral-700 font-body md:pl-8">
                {activeSection.villages.map((village) => (
                  <li key={village.name} className="pl-2">
                    <strong className="font-semibold text-neutral-900">{village.name}</strong>
                    <div className="mt-2 space-y-3 pl-2 sm:pl-4 md:pl-6">
                      {(village.description || '').split('\n\n').filter((paragraph) => paragraph.trim()).map((paragraph, index) => (
                        <p key={index} className="indent-6 sm:indent-8 md:indent-12 text-justify">
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
