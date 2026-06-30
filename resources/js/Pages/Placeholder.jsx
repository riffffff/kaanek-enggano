import { Head, Link } from '@inertiajs/react'

export default function Placeholder({ title, description }) {
  return (
    <>
      <Head title={title} />

      <section className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-6 pb-16 pt-32 md:px-12 lg:px-16">
        <div>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary-700">Dalam Progres</p>
          <h1 className="mt-4 font-display text-5xl font-semibold text-neutral-800 md:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-500 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/" className="bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600">
              Kembali ke Home
            </Link>
            <Link
              href="/accommodations#transportation"
              className="border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 hover:border-primary-700 hover:text-primary-700"
            >
              Lihat Rencana Perjalanan
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
