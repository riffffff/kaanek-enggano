import { Head, Link } from '@inertiajs/react'

export default function Placeholder({ title, description }) {
  return (
    <>
      <Head title={title} />

      <section className="mx-auto flex min-h-[70vh] w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 items-center pb-16 pt-32">
        <div>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 leading-tight">{title}</h1>
          <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600 md:text-lg">{description}</p>
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
