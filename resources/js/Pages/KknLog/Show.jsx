import { Head } from '@inertiajs/react'
import { Calendar, Clock, Newspaper, Share2, Tag } from 'lucide-react'
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
        'Warta dan catatan ini merangkum seluruh proses kerja lapangan, wawancara bersama warga, serta pengamatan intensif yang mewarnai dinamika di Pulau Enggano.',
        'Seluruh bentuk intervensi dan kegiatan dilaksanakan dengan prinsip partisipatif, menempatkan kearifan lokal serta suara warga suku sebagai pijakan utama.',
        'Hasil pengamatan di lapangan menegaskan pentingnya kesinambungan program, dokumentasi sejarah, serta penguatan jejaring lokal untuk kemajuan bersama.',
      ]

  const heroImage =
    item.image ??
    imageByCategory[item.category] ??
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'

  return (
    <>
      <Head title={`${item.title} - Berita & Artikel Kaanek Enggano`} />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img src={heroImage} alt={item.title} className="reveal-scale absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/40 via-primary-950/70 to-primary-950" />
        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-36 md:px-12 lg:px-16">
          <Button
            href="/kkn-log"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up"
          >
            Kembali ke Berita & Artikel
          </Button>
          <div className="mt-8">
            <div className="reveal-up inline-flex items-center gap-2 rounded-full bg-accent-500/20 border border-accent-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent-400">
              <Tag size={13} />
              <span>{String(item.category ?? 'artikel').toUpperCase()}</span>
            </div>
            <h1 className="reveal-up mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl" style={{ '--reveal-delay': '150ms' }}>
              {item.title}
            </h1>

            <div className="reveal-up mt-6 flex flex-wrap items-center gap-6 border-t border-white/10 pt-5 text-sm text-neutral-300" style={{ '--reveal-delay': '230ms' }}>
              <span className="flex items-center gap-2"><Calendar size={16} className="text-accent-500" /> {item.date}</span>
              {item.read_time && (
                <span className="flex items-center gap-2"><Clock size={16} className="text-accent-500" /> {item.read_time}</span>
              )}
              <span className="flex items-center gap-2"><Newspaper size={16} className="text-accent-500" /> Redaksi Kaanek Enggano</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-20 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hover-lift reveal-up space-y-6" style={{ '--reveal-delay': '120ms' }}>
            <div className="border-b border-neutral-200 pb-5">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-400">Rubrik Warta</p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Arsip berita resmi dan jurnal lapangan seputar Enggano.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-400">Kategori</p>
              <span className="mt-2 inline-block rounded-md bg-accent-50 text-accent-700 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {String(item.category ?? 'artikel').toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-neutral-400">Tanggal Rilis</p>
              <p className="mt-2 text-sm font-semibold text-neutral-800">{item.date}</p>
            </div>
          </aside>

          <article className="reveal-up max-w-3xl" style={{ '--reveal-delay': '200ms' }}>
            {(item.cover || item.cover_image || heroImage) && (
              <figure className="mb-12 overflow-hidden rounded-3xl shadow-lg shadow-primary-900/10 ring-1 ring-neutral-200/70">
                <img
                  src={item.cover || item.cover_image || heroImage}
                  alt={`Cover: ${item.title}`}
                  className="w-full h-auto object-cover aspect-[16/9] media-zoom"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fb) {
                      e.currentTarget.dataset.fb = '1'
                      e.currentTarget.src = heroImage
                    }
                  }}
                />
                <figcaption className="bg-surface-50 px-6 py-3 text-sm italic text-neutral-500 border-t border-neutral-100">
                  Cover ilustrasi — {item.title}
                </figcaption>
              </figure>
            )}

            <div className="space-y-7 text-base leading-8 text-neutral-700 md:text-lg">
              {contentParagraphs.map(paragraph => (
                <p key={paragraph} className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-primary-950 first-letter:font-display">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-12 rounded-2xl bg-surface-50 p-8 border-l-4 border-accent-500 font-display text-xl font-medium italic leading-relaxed text-neutral-900 shadow-xs">
              "Pemberdayaan dan publikasi mengenai Enggano adalah langkah nyata menjaga warisan budaya serta keanekaragaman hayati pulau terluar Indonesia."
            </blockquote>
          </article>
        </div>

        {(item.gallery?.length > 0) && (
          <div className="mt-20 border-t border-neutral-200/80 pt-14">
            <div className="reveal-up max-w-3xl">
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent-600">Dokumentasi Lapangan</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-neutral-900 md:text-4xl">
                Galeri {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-neutral-500">
                Foto-foto dokumentasi selama pelaksanaan aktivitas & kegiatan di lapangan.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {item.gallery.map((image, index) => (
                <div
                  key={image.id || index}
                  className="group hover-lift reveal-up overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/70"
                  style={{ '--reveal-delay': `${120 + index * 80}ms` }}
                >
                  <img
                    src={image.url_medium || image.url}
                    alt={`Galeri ${item.title} - ${index + 1}`}
                    loading="lazy"
                    className="media-zoom aspect-4/3 w-full object-cover"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fb) {
                        e.currentTarget.dataset.fb = '1'
                        e.currentTarget.src = image.url
                      }
                    }}
                  />
                  {image.name && (
                    <div className="bg-surface-50 px-5 py-3 text-xs font-medium text-neutral-500 border-t border-neutral-100">
                      {image.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-neutral-200/80 pt-10">
          <PrevNext
            prev={prev ? { href: `/kkn-log/${prev.slug}`, title: prev.title } : null}
            next={next ? { href: `/kkn-log/${next.slug}`, title: next.title } : null}
            prevLabel="Artikel Sebelumnya"
            nextLabel="Artikel Berikutnya"
            prevEmptyText="Belum ada artikel sebelumnya."
            nextEmptyText="Belum ada artikel berikutnya."
            prevCardClass="bg-white rounded-xl shadow-xs border border-neutral-200/70"
            nextCardClass="bg-white rounded-xl shadow-xs border border-neutral-200/70"
          />
        </div>
      </section>
    </>
  )
}

