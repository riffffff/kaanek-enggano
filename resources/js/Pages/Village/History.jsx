import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'

export const historyData = {
  title: 'Jejak Sejarah Enggano',
  content: `
  Enggano merupakan pulau terluar di Indonesia yang memiliki akar sejarah yang kuat akan eksistensi masyarakat adatnya. Pulau Enggano terletak pada jajaran sebelah barat pantai Pulau Sumatera. Lebih lanjut, secara geografis terletak di wilayah Kabupaten Bengkulu Utara, Provinsi Bengkulu, serta terdiri dari 6 Desa, antara lain Desa Kahyapu, Desa Kaana, Desa Apoho, Desa Meok, dan Desa Bajarsari. Selain itu, terdapat beberapa pulau yang mengelilingi Pulau Enggano, antara lain Pulau Dua, Pulau Merbau, Pulau Satu, serta Pulau Bangkai.
  `,
  image: 'https://images.unsplash.com/photo-1533136305213-cd4275d9e8a6?auto=format&fit=crop&w=1800&q=80',
}

export default function VillageHistory({ history = null }) {
  const data = history || historyData

  return (
    <>
      <Head title={`${data.title} | Desa & Budaya`} />

      {/* Hero Section */}
      <section className="relative min-h-[78vh] overflow-hidden bg-primary-950 text-white ">
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-end px-6 pb-20 pt-32 md:px-12 lg:px-16">
          <div>
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/75">
              Warisan Leluhur
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <Button
          href="/villages"
          variant="ghostLight"
          showArrow
          arrowPosition="left"
          className="reveal-up"
        >
          Kembali ke Villages
        </Button>

        <div className="mt-8 flex justify-center">
          <article className="reveal-up max-w-3xl text-center" style={{ '--reveal-delay': '100ms' }}>
            <h2 className="font-display text-4xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              Jejak Sejarah Enggano
            </h2>

            <div className="mt-8 space-y-6 text-base leading-8 text-neutral-600 md:text-lg">
              {data.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="reveal-up" style={{ '--reveal-delay': `${120 + index * 80}ms` }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
