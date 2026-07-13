import { Head, Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

const fallbackHistory = {
  title: 'Sejarah Pulau Enggano',
  content: `Pulau Enggano memiliki sejarah yang unik sebagai salah satu pulau terluar Indonesia di Samudra Hindia. Terisolasi selama berabad-abad, pulau ini mengembangkan kebudayaan yang sangat berbeda dari daratan utama Sumatera.

Nama "Enggano" sendiri diyakini berasal dari bahasa Melayu yang berarti "pulau terpencil". Pulau ini pertama kali dicatat oleh penjelajah Eropa pada abad ke-16, namun bukti arkeologi menunjukkan adanya aktivitas manusia ribuan tahun sebelumnya. Pulau ini kemudian menjadi bagian dari Nusantara, namun tetap mempertahankan identitasnya yang unik.

Selama berabad-abad, masyarakat Enggano hidup berdampingan dengan alam, mengembangkan sistem sosial dan hukum adat yang khas. Mereka menjadi penghuni pulau yang tangguh dan mandiri, memanfaatkan sumber daya alam dengan bijaksana.

Pada masa kolonial, pulau ini menjadi bagian dari Hindia Belanda, namun pengaruh luar tidak banyak mengubah cara hidup masyarakat setempat. Hingga saat ini, warisan budaya nenek moyang masih terasa kuat di setiap sudut pulau.`,
  image: 'https://images.unsplash.com/photo-1533136305213-cd4275d9e8a6?auto=format&fit=crop&w=1800&q=80',
}

export default function VillageHistory({ history = null }) {
  const data = history || fallbackHistory

  return (
    <>
      <Head title={`${data.title} | Desa & Budaya`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={data.image}
          alt={data.title}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <Link
            href="/villages"
            className="reveal-up inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={18} />
            Kembali
          </Link>
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              Warisan Leluhur
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {data.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7f4] min-h-screen">
        <section className="mx-auto max-w-4xl px-6 py-20 md:px-12 lg:px-16">
          <div className="reveal-up space-y-6 text-base leading-8 text-slate-600 md:text-lg">
            {data.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="reveal-up" style={{ '--reveal-delay': `${120 + index * 80}` }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
