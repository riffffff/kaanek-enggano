import { Head } from '@inertiajs/react'
import Button from '../../Components/Button'

export const tribesData = [
  {
    id: 'suku-kaitora',
    name: 'Suku Kaitora',
    village: 'Apoho',
    summary: 'Dikenal dengan keahlian berburu dan pengetahuan mendalam tentang hutan.',
    description: `Suku Kaitora adalah salah satu suku tertua di Pulau Enggano yang mendiami wilayah Desa Apoho. Mereka dikenal dengan keahlian berburu dan pengetahuan mendalam tentang hutan.

Masyarakat Kaitora hidup secara harmonis dengan alam, menjaga keseimbangan ekosistem hutan melalui kearifan lokal yang diwariskan turun-temurun. Sistem sosial mereka diatur oleh hukum adat yang kuat, dengan tokoh adat yang menjadi panutan dalam pengambilan keputusan.

Suku Kaitora juga dikenal dengan kerajinan tangan tradisional, khususnya anyaman rotan dan pembuatan alat-alat berburu yang berkualitas tinggi.`,
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'suku-kauno',
    name: 'Suku Kauno',
    village: 'Enggano',
    summary: 'Penjaga warisan budaya dan situs-situs bersejarah di pulau.',
    description: `Suku Kauno mendiami wilayah Desa Enggano dan dikenal sebagai penjaga warisan budaya dan situs-situs bersejarah di pulau. Mereka memiliki tanggung jawab menjaga kelestarian peninggalan nenek moyang.

Masyarakat Kauno terkenal dengan keahlian mereka dalam mengelola lahan dan sumber daya hutan secara lestari. Mereka menggunakan pola tanam tradisional yang ramah lingkungan, menjaga keanekaragaman hayati di sekitar mereka.

Suku Kauno juga memiliki tradisi lisan yang kaya, dengan cerita-cerita tentang asal-usul pulau yang diceritakan dari generasi ke generasi.`,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'suku-kaharubi',
    name: 'Suku Kaharubi',
    village: 'Meok',
    summary: 'Suku nelayan dengan keterikatan kuat pada wilayah pesisir.',
    description: `Suku Kaharubi adalah suku nelayan yang mendiami wilayah Desa Meok. Mereka memiliki keterikatan yang kuat dengan wilayah pesisir dan pengetahuan tentang siklus laut tak tertandingi.

Masyarakat Kaharubi mengenal dengan baik musim-musim ikan, rute migrasi biota laut, dan cara menangkap ikan secara berkelanjutan. Teknik menangkap ikan tradisional mereka telah teruji selama berabad-abad dan tidak merusak ekosistem laut.

Selain sebagai nelayan, suku Kaharubi juga dikenal dengan kerajinan dari bahan-bahan laut, seperti pembuatan kerajinan cangkang dan anyaman dari rotan laut.`,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'suku-kaahua',
    name: 'Suku Kaahua',
    village: 'Kahyapu',
    summary: 'Suku yang tinggal di gerbang masuk pulau, terbuka terhadap pendatang.',
    description: `Suku Kaahua mendiami wilayah sekitar Kahyapu yang menjadi gerbang utama menuju Enggano. Mereka memiliki sejarah panjang berinteraksi dengan pendatang dan merupakan penghubung budaya antara Enggano dan dunia luar.

Keahlian utama mereka selain berladang adalah berdagang dan mengolah hasil bumi untuk dipertukarkan. Nilai-nilai keterbukaan namun tetap mempertahankan identitas lokal sangat kuat di suku ini.`,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'suku-kaahoao',
    name: 'Suku Kaahoao',
    village: 'Malakoni',
    summary: 'Suku yang berfokus pada pelestarian adat dan hukum tradisional.',
    description: `Suku Kaahoao memiliki peran penting dalam struktur sosial Enggano, sering kali dilibatkan dalam penyelesaian masalah adat. Mereka mendiami area strategis di pulau dan menjaga nilai luhur persaudaraan antarsuku.

Suku ini sangat mempertahankan tradisi musyawarah dalam balai adat, serta memiliki seni tari dan ukir kayu yang khas.`,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80',
  },
  {
    id: 'suku-kamay',
    name: 'Suku Kamay (Pendatang)',
    village: 'Kaana',
    summary: 'Kelompok pendatang yang telah membaur dan menjadi bagian integral dari Enggano.',
    description: `Suku Kamay adalah sebutan bagi masyarakat pendatang (seperti dari Sumatera atau Jawa) yang telah lama menetap, beradaptasi, dan diakui sebagai salah satu pilar kehidupan sosial di Enggano.

Mereka membawa pengaruh baru dalam sistem pertanian dan perdagangan, sekaligus menghormati dan tunduk pada hukum adat yang berlaku di Enggano. Suku Kamay menjadi simbol harmoni antara tradisi asli dan kemajuan dari luar.`,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80',
  },
]

export default function VillageTribe({ tribe = null, id = null }) {
  const tribeData = tribe || tribesData.find(item => item.id === id) || tribesData[0]

  return (
    <>
      <Head title={`${tribeData.name} | Desa & Budaya`} />

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={tribeData.image}
          alt={tribeData.name}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
          <Button
            href="/villages"
            variant="ghost"
            showArrow
            arrowPosition="left"
            className="reveal-up mb-4"
          >
            Kembali
          </Button>
          <div className="max-w-4xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/70">
              {tribeData.village}
            </p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-7xl" style={{ '--reveal-delay': '120ms' }}>
              {tribeData.name}
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-[#f8f7f4] min-h-screen">
        <section className="mx-auto max-w-4xl px-6 py-20 md:px-12 lg:px-16">
          <div className="reveal-up space-y-6 text-base leading-8 text-slate-600 md:text-lg">
            {tribeData.description.split('\n\n').map((paragraph, index) => (
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
