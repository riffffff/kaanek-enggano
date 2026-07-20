import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'
import PrevNext from '../../Components/PrevNext'

const imageByCategory = {
  lingkungan:
    'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80',
  digitalisasi:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
  ekonomi:
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80',
  kesehatan:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
}

export default function KknLogShow({ item, prev = null, next = null }) {
  const contentParagraphs = item.content
    ? item.content
        .split(/\n+/)
        .map(paragraph => paragraph.trim())
        .filter(Boolean)
    : [
        'Catatan ini merangkum proses kerja lapangan, diskusi dengan warga, dan pengamatan langsung yang membentuk program KKN di Enggano.',
        'Setiap intervensi dilakukan dengan pendekatan kolaboratif, menempatkan kebutuhan lokal sebagai pusat dari keputusan desain kegiatan.',
        'Hasil sementara menunjukkan bahwa penguatan pengetahuan, dokumentasi, dan jejaring lokal menjadi fondasi penting untuk keberlanjutan program setelah tim kembali.',
      ]

  const heroImage =
    item.image ??
    imageByCategory[item.category] ??
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'

  return (
    <>
      <Head title={item.title} />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img src={heroImage} alt={item.title} className="reveal-scale absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/25 via-primary-950/55 to-primary-950/90" />
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <Button
            href="/kkn-log"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up"
          >
            Kembali ke KKN Log
          </Button>
          <div className="mt-8 max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70" style={{ '--reveal-delay': '80ms' }}>
              {String(item.category ?? 'archive').toUpperCase()}
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold leading-tight md:text-7xl" style={{ '--reveal-delay': '150ms' }}>
              {item.title}
            </h1>
            <p className="reveal-up mt-6 text-sm text-white/70 md:text-base" style={{ '--reveal-delay': '230ms' }}>{item.date}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hover-lift reveal-up space-y-5" style={{ '--reveal-delay': '120ms' }}>
            <div className="border-b border-neutral-200 pb-5">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Archive</p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Editorial record of work, dialogue, and field learning during KKN in Enggano.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Category</p>
              <p className="mt-3 text-sm font-semibold text-primary-700">
                {String(item.category ?? 'archive').toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Date</p>
              <p className="mt-3 text-sm text-neutral-700">{item.date}</p>
            </div>
            {item.read_time && (
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Read Time</p>
                <p className="mt-3 text-sm text-neutral-700">{item.read_time}</p>
              </div>
            )}
          </aside>

          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '200ms' }}>
            <div className="space-y-7 text-base leading-8 text-neutral-700 md:text-lg">
              {contentParagraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-primary-700 pl-6 font-display text-2xl italic leading-9 text-neutral-900">
              "Kerja lapangan di Enggano bukan hanya soal program, tetapi tentang cara
              membaca ritme pulau dan merawat relasi yang ada di dalamnya."
            </blockquote>
          </article>
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-8">
          <PrevNext
            prev={prev ? { href: `/kkn-log/${prev.slug}`, title: prev.title } : null}
            next={next ? { href: `/kkn-log/${next.slug}`, title: next.title } : null}
            prevLabel="Previous"
            nextLabel="Next"
            prevEmptyText="Belum ada entri sebelumnya."
            nextEmptyText="Belum ada entri berikutnya."
            prevCardClass="bg-white"
            nextCardClass="bg-white"
          />
        </div>
      </section>
    </>
  )
}
