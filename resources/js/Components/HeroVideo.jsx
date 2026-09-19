export default function HeroVideo({ src = '/videos/hero-enggano.mp4', poster, children }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-primary-900 text-white">
      <video autoPlay muted loop playsInline poster={poster} className="absolute inset-0 h-full w-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
      <div className="relative z-10 mx-auto flex min-h-screen w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 items-end pb-24 pt-32">
        {children}
      </div>
    </section>
  )
}
