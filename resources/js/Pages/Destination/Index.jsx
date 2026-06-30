import { Head, router } from '@inertiajs/react'
import DestinationCard from '../../Components/DestinationCard'

export default function DestinationIndex({ destinations = [] }) {

  return (
    <>
      <Head title="Destinations" />

      <section className="relative overflow-hidden bg-primary-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80"
          alt="Destinasi Enggano"
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-950/25 via-primary-950/50 to-primary-950/85" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">Destinations</p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '100ms' }}>
              Editorial atlas untuk lanskap dan pengalaman Enggano.
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/80 md:text-xl" style={{ '--reveal-delay': '200ms' }}>
              Bahari, sejarah, dan wildlife dirangkai sebagai pintu masuk untuk membaca
              pulau terluar ini secara lebih tenang, visual, dan kuratorial.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20 lg:px-16">
        <div className="mt-10 grid gap-6 md:grid-cols-2 md:grid-rows-2">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.slug}
              destination={destination}
              isLarge={index === 0}
            />
          ))}
        </div>
      </section>
    </>
  )
}
