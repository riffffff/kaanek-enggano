import { Head, Link } from '@inertiajs/react'

const sections = [
  {
    title: 'Informasi yang Kami Kumpulkan',
    content:
      'Website ini tidak mengumpulkan data pribadi secara aktif. Saat Anda mengunjungi halaman ini, server mungkin menyimpan log akses standar (alamat IP, jenis browser, waktu kunjungan) yang bersifat anonim dan tidak dapat digunakan untuk mengidentifikasi Anda secara langsung.',
  },
  {
    title: 'Tautan ke Layanan Pihak Ketiga',
    content:
      'Beberapa fitur di website ini mengarahkan Anda ke layanan pihak ketiga seperti WhatsApp untuk menghubungi pengelola, operator kapal, atau UMKM lokal. Interaksi Anda dengan layanan tersebut tunduk pada kebijakan privasi masing-masing platform.',
  },
  {
    title: 'Gambar dan Konten',
    content:
      'Foto destinasi dan ilustrasi yang belum memiliki sumber lokal menggunakan layanan Unsplash. Data dari database (destinasi, desa, jadwal kapal, homestay) bersumber dari dokumentasi lapangan tim KKN UGM di Pulau Enggano.',
  },
  {
    title: 'Cookie',
    content:
      'Website ini menggunakan cookie sesi minimal yang diperlukan untuk fungsi dasar aplikasi (seperti keamanan CSRF dari Laravel). Kami tidak menggunakan cookie untuk pelacakan perilaku atau iklan.',
  },
  {
    title: 'Keamanan Data',
    content:
      'Kami berkomitmen untuk menjaga keamanan informasi yang ada di platform ini. Namun, mengingat keterbatasan infrastruktur di Pulau Enggano, kami menyarankan Anda untuk tidak mengirimkan informasi sensitif melalui form kontak yang tersedia.',
  },
  {
    title: 'Perubahan Kebijakan',
    content:
      'Kebijakan privasi ini dapat diperbarui sewaktu-waktu seiring perkembangan website. Perubahan akan tercermin di halaman ini dengan tanggal pembaruan terbaru.',
  },
]

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — Enggano</title>
        <meta
          name="description"
          content="Kebijakan privasi website resmi Pulau Enggano. Informasi tentang penggunaan data, cookie, dan tautan pihak ketiga."
        />
      </Head>

      {/* Hero */}
      <section className="bg-primary-950 text-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-12 lg:px-16">
          <div className="max-w-3xl">
            <p className="reveal-up text-sm uppercase tracking-[0.35em] text-white/60">Legal</p>
            <h1 className="reveal-up mt-4 font-display text-5xl font-semibold md:text-6xl" style={{ '--reveal-delay': '100ms' }}>
              Privacy Policy
            </h1>
            <p className="reveal-up mt-6 text-base leading-7 text-white/75 md:text-lg" style={{ '--reveal-delay': '200ms' }}>
              Kami menghormati privasi Anda. Dokumen ini menjelaskan bagaimana website Enggano
              mengelola informasi yang terkait dengan kunjungan Anda.
            </p>
            <p className="reveal-up mt-4 text-sm text-white/50" style={{ '--reveal-delay': '280ms' }}>
              Terakhir diperbarui: Juni 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={section.title} className="reveal-up" style={{ '--reveal-delay': `${index * 80}ms` }}>
                <h2 className="font-display text-2xl font-semibold text-neutral-900">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-neutral-600">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="reveal-up mt-16 border-t border-neutral-200 pt-10">
            <h2 className="font-display text-2xl font-semibold text-neutral-900">Hubungi Kami</h2>
            <p className="mt-4 text-base leading-8 text-neutral-600">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi tim
              pengelola website melalui WhatsApp yang tersedia di halaman utama.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/"
                className="hover-lift bg-accent-500 px-5 py-3 text-sm font-semibold text-white hover:bg-accent-600"
              >
                Kembali ke Home
              </Link>
              <Link
                href="/accommodations"
                className="hover-lift border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 hover:border-primary-700 hover:text-primary-700"
              >
                Info Akomodasi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
