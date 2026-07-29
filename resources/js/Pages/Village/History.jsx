import { Head, Link } from '@inertiajs/react'
import {
  ArrowLeft,
  Landmark,
  Clock,
  Users,
  ShieldCheck,
  Utensils,
  BookOpen,
  Compass,
  Sparkles,
} from 'lucide-react'
import { historyData, historyImageFallback } from '../../data/history.js'
import Button from '../../Components/Button'

export default function VillageHistory({ history = null }) {
  const data = history || historyData
  const paragraphs = data.content.split('\n\n').filter((p) => p.trim())

  const sukuList = [
    {
      name: 'Suku Kaahoao',
      origin: 'Ahua\'y / Ko\'iyao / Bagug (Pohon Melinjo)',
      meaning: 'Melambangkan sifat yang tidak mudah patah serta selalu memberikan manfaat bagi kehidupan manusia.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      name: 'Suku Kauno',
      origin: 'Ea\'unno (Sebangsa Ikan)',
      meaning: 'Bermakna sebangsa ikan berkerumun dengan lincah serta bermanfaat bagi kehidupan.',
      color: 'bg-sky-50 border-sky-200 text-sky-900',
      badgeColor: 'bg-sky-100 text-sky-800',
    },
    {
      name: 'Suku Kaitora',
      origin: 'Itorra (Kayu Teras Kuat)',
      meaning: 'Bermakna kayu sangat kuat dan keras yang memberikan manfaat serta daya tahan tinggi.',
      color: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      name: 'Suku Kaarubi',
      origin: 'Eadubbi (Ketangguhan)',
      meaning: 'Bermakna ketangguhan untuk tidak kalah saing dengan lingkungan sekelilingnya.',
      color: 'bg-purple-50 border-purple-200 text-purple-900',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      name: 'Suku Kaaruba',
      origin: 'Ubah\'hi (Dinamis)',
      meaning: 'Mencerminkan karakter keturunan yang dinamis dan memiliki pemikiran yang terbuka.',
      color: 'bg-rose-50 border-rose-200 text-rose-900',
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      name: 'Suku Kaamay',
      origin: 'Wadah Pendatang',
      meaning: 'Suku yang secara khusus mewadahi dan mengayomi kelompok masyarakat pendatang.',
      color: 'bg-teal-50 border-teal-200 text-teal-900',
      badgeColor: 'bg-teal-100 text-teal-800',
    },
  ]

  const kulinerKhas = [
    { name: 'Ubi Duri', native: 'Ubi Hutan' },
    { name: 'Buah Picung', native: 'Eeyo\'ou' },
    { name: 'Buah Terok', native: 'Eheyoubu' },
    { name: 'Buah Kasai', native: 'Ekaahoo' },
    { name: 'Keladi Birah', native: 'Ebabba' },
    { name: 'Pisang', native: 'Kibahao\'a' },
    { name: 'Ikan Laut', native: 'Eeyaiyo' },
    { name: 'Tuak', native: 'Emenno' },
  ]

  return (
    <>
      <Head title={`${data.title} | Desa & Budaya`} />

      {/* Standard Hero Section */}
      <section className="relative overflow-hidden text-white">
        <img
          src={data.image || historyImageFallback}
          alt={data.title}
          className="reveal-scale absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 pb-32 pt-48 md:px-12 lg:px-16">
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

      {/* Main Content Area */}
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
          
          {/* Quick Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 reveal-up">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-50 text-primary-700 shrink-0">
                <Compass size={24} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Nama Asli</span>
                <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Ekeppu Yanipah</h4>
                <p className="text-xs text-neutral-500 mt-1">Juga dikenal sebagai Pulau Aru oleh masyarakat adat kuno.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent-50 text-accent-700 shrink-0">
                <Users size={24} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Sistem Kekerabatan</span>
                <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Matrilineal</h4>
                <p className="text-xs text-neutral-500 mt-1">Garis keturunan dari pihak Ibu (Nanipah).</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Pakta Perdamaian</span>
                <h4 className="font-display text-lg font-semibold text-neutral-900 mt-0.5">Paano'a (1908)</h4>
                <p className="text-xs text-neutral-500 mt-1">Penyatuan dan pemulihan kerukunan 6 suku.</p>
              </div>
            </div>
          </div>

          {/* Article Header & Highlight Quote */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-neutral-200/60 border border-neutral-200/80 space-y-8">
            <div className="p-6 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-medium text-base md:text-lg leading-relaxed flex items-start gap-4">
              <Sparkles size={24} className="text-amber-600 shrink-0 mt-1" />
              <div>
                "Pertemuan antara Kamanppa dan Nanipah di pesisir pantai Pulau Enggano menjadi batu pijakan pertama terbentuknya kebudayaan, tata bahasa, dan tatanan adat lima suku induk asli."
              </div>
            </div>

            {/* Paragraphs 1-3 */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body">
              {paragraphs.slice(0, 3).map((p, idx) => (
                <p key={idx} className="first-letter:text-4xl first-letter:font-display first-letter:font-bold first-letter:text-primary-800 first-letter:mr-2 first-letter:float-left">
                  {p}
                </p>
              ))}
            </div>

            {/* Manusia Pertama Highlight Box */}
            <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-primary-900 to-neutral-900 text-white shadow-lg">
              <div className="flex items-center gap-3 text-accent-400 text-xs font-bold uppercase tracking-widest mb-3">
                <BookOpen size={16} />
                Kisah Legenda Peradaban
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
                Asal Usul Kamanppa & Nanipah
              </h3>
              <p className="text-white/90 leading-relaxed text-sm md:text-base mb-4">
                {paragraphs[3]}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-400" />
                  <strong>Kamanppa:</strong> Dari "Kah Kaminppa" (Ayo pergi memecahkan)
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent-400" />
                  <strong>Nanipah:</strong> Dari "Nai Nipahha" (Ibu yang memecahkan)
                </div>
              </div>
            </div>

            {/* Paragraph 4 */}
            {paragraphs[4] && (
              <div className="text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body">
                <p>{paragraphs[4]}</p>
              </div>
            )}

            {/* Enam Suku Enggano Visual Grid */}
            <div className="my-12 pt-8 border-t border-neutral-200">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-700">Struktur Adat</span>
                <h3 className="font-display text-3xl font-semibold text-neutral-900 mt-2">
                  Filosofi Enam Suku Enggano
                </h3>
                <p className="text-sm text-neutral-500 mt-2">
                  Penamaan suku-suku di Enggano diadaptasi secara filosofis dari nama flora & fauna yang menggambarkan karakter kehidupan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sukuList.map((suku, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border ${suku.color} transition-all hover:shadow-md`}>
                    <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold mb-3 ${suku.badgeColor}`}>
                      {suku.name}
                    </span>
                    <h4 className="font-display font-semibold text-base mb-1">
                      {suku.origin}
                    </h4>
                    <p className="text-xs opacity-90 leading-relaxed">
                      {suku.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matrilineal & History Paragraphs 5-7 */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body">
              {paragraphs.slice(5, 8).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Kuliner Khas Section */}
            <div className="my-10 p-6 md:p-8 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div className="flex items-center gap-3 text-primary-700 text-xs font-bold uppercase tracking-widest mb-2">
                <Utensils size={18} />
                Kekayaan Pangan Tradisional
              </div>
              <h3 className="font-display text-2xl font-semibold text-neutral-900 mb-4">
                Kuliner & Komoditas Khas Enggano
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {kulinerKhas.map((item, idx) => (
                  <div key={idx} className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 shadow-2xs text-xs font-medium text-neutral-800 flex items-center gap-1.5">
                    <span className="font-semibold text-primary-700">{item.name}</span>
                    <span className="text-neutral-400">({item.native})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Remaining Paragraphs */}
            <div className="space-y-6 text-base md:text-lg leading-relaxed md:leading-8 text-neutral-700 font-body">
              {paragraphs.slice(8).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Footer Back Action */}
            <div className="pt-10 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/villages"
                className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                <ArrowLeft size={18} />
                <span>Kembali ke Desa & Budaya</span>
              </Link>

              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm"
              >
                <span>Jelajahi Destinasi Enggano</span>
              </Link>
            </div>
          </div>
      </section>
    </>
  )
}
