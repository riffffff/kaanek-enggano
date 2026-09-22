import {
  ChevronLeft,
  ChevronRight,
  Code2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Image as ImageIcon,
  Users,
  X,
  ZoomIn,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PageHeader from '../../Components/PageHeader'
import SeoHead from '../../Components/SeoHead'

// =============================================================================
// DAFTAR GAMBAR GALERI KEGIATAN (STATIS)
// Kamu bisa langsung ganti / tambah gambar di daftar ini (bisa path lokal atau URL):
// Contoh lokal: '/images/kegiatan-1.jpg' atau URL online
// =============================================================================
const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    title: 'Survei Pantai & Wilayah Pesisir',
    caption: 'Dokumentasi pemetaan potensi wisata bahari di pesisir Pulau Enggano.',
  },
  {
    src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    title: 'Wawancara & Diskusi Tokoh Adat',
    caption: 'Pengumpulan data sejarah lisan bersama tetua adat enam suku Enggano.',
  },
  {
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    title: 'Pendataan Homestay & Warga',
    caption: 'Verifikasi fasilitas dan pendataan kontak pemilik penginapan lokal.',
  },
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    title: 'Eksplorasi Danau Bak Blau',
    caption: 'Mata air alami dengan air jernih kebiruan di tengah hutan Enggano.',
  },
  {
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    title: 'Rapat Kerja & Koordinasi Tim',
    caption: 'Evaluasi mingguan progres program kerja KKN di posko.',
  },
  {
    src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    title: 'Dermaga & Transportasi Laut',
    caption: 'Pencatatan alur logistik kapal perintis dan jadwal penyeberangan.',
  },
  {
    src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80',
    title: 'Sosialisasi Website ke Pemuda Desa',
    caption: 'Penyampaian pemanfaatan platform digital untuk promosi desa.',
  },
  {
    src: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
    title: 'Konservasi Mangrove & Pesisir',
    caption: 'Peninjauan area bakau dan ekosistem pulau terluar.',
  },
]

export default function CreditsIndex() {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Kontrol keyboard untuk Lightbox (Escape tutup, Panah Kanan/Kiri geser foto)
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxIndex])

  const activeImage = lightboxIndex !== null ? galleryImages[lightboxIndex] : null

  return (
    <>
      <SeoHead
        title="Tentang Kami"
        description="Inisiator, pengembang website Jelajah Enggano, dan dokumentasi kegiatan program kolaborasi di Pulau Enggano."
      />

      <PageHeader pageKey="credits" />

      {/* =================================================================== */}
      {/* 2. KONTEN UTAMA: KETERANGAN PROGRAM & TIM (STATIS)                   */}
      {/* =================================================================== */}
      <section className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0 pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-16 md:py-24">


        {/* BAGIAN TENTANG PEMBUATAN WEBSITE */}
        <div className="reveal-up" style={{ '--reveal-delay': '100ms' }}>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] items-start">

            {/* Narasi Statis */}
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
                Tentang Website Ka'anek Enggano
              </h2>
              <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />

              <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-neutral-600">
                <p className="indent-6 sm:indent-8 md:indent-10 text-justify">
                  Website <strong>Ka'anek Enggano</strong> ini dibangun dan dikembangkan melalui kolaborasi antara <strong>Tim Mahasiswa KKN-PPM Universitas Gadjah Mada (UGM)</strong> bersama <strong>Universitas Bengkulu (UNIB)</strong> dalam rangka program pengabdian kepada masyarakat di Pulau Enggano, Kabupaten Bengkulu Utara.
                </p>
                <p className="indent-6 sm:indent-8 md:indent-10 text-justify">
                  Pembuatan website ini bertujuan untuk menyediakan pusat informasi digital terpadu bagi Pulau Enggano. Melalui website ini, pengunjung dapat menemukan informasi lengkap seputar destinasi wisata bahari dan alam, penginapan (homestay) milik warga, jadwal dan transportasi kapal laut/udara, profil enam suku adat, kontak pemandu lokal (local guide), hingga catatan kegiatan dan berita terkini.
                </p>
                <p className="indent-6 sm:indent-8 md:indent-10 text-justify">
                  Kolaborasi lintas universitas ini diharapkan dapat terus bermanfaat untuk memajukan potensi pariwisata berbasis kearifan lokal serta memudahkan aksesibilitas informasi bagi wisatawan, peneliti, maupun masyarakat luas yang hendak berkunjung ke Pulau Enggano.
                </p>
              </div>
            </div>

            {/* Kotak Info Ringkas Statis */}
            <div className="rounded-2xl border border-neutral-200/80 bg-surface-50 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-neutral-200/70 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-900 text-white shadow-xs">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-500 font-semibold">Inisiator Pembuat</p>
                  <p className="font-bold text-neutral-900 text-base">Tim Kolaborasi KKN UGM & Universitas Bengkulu</p>
                </div>
              </div>

              <dl className="mt-5 space-y-4 text-xs sm:text-sm">
                <div>
                  <dt className="text-neutral-500 font-medium">Lembaga Penyelenggara</dt>
                  <dd className="mt-0.5 font-semibold text-neutral-800">
                    Direktorat Pengabdian kepada Masyarakat (DPkM) UGM & Universitas Bengkulu (UNIB)
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 font-medium">Program Kerja</dt>
                  <dd className="mt-0.5 font-semibold text-neutral-800">
                    Digitalisasi Informasi Pariwisata & Arsip Budaya Pulau Enggano
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 font-medium">Lokasi Pengabdian</dt>
                  <dd className="mt-0.5 font-semibold text-neutral-800">
                    Pulau Enggano, Kabupaten Bengkulu Utara, Provinsi Bengkulu
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-500 font-medium">Mitra Kolaborasi</dt>
                  <dd className="mt-0.5 font-semibold text-neutral-800">
                    Masyarakat Adat 6 Suku Enggano, Pemerintah Desa, & Pengelola Wisata Lokal
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* DAFTAR TIM / PENGEMBANG (STATIS) — disembunyikan di mobile */}
          <div className="hidden sm:block mt-14">
            <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 mb-6">
              Tim Pengembang & Kontributor
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Web Development */}
              <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:border-accent-400 transition-colors">
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-800 mb-3">
                    <Code2 size={18} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">Pengembangan Website</h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Pengembangan sistem frontend & backend, penataan basis data, dan performa website.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-800">Tim Web KKN Kolaborasi</p>
                </div>
              </div>

              {/* Card 2: Dokumentasi */}
              <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:border-accent-400 transition-colors">
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-800 mb-3">
                    <ImageIcon size={18} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">Foto & Dokumentasi</h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Pengambilan foto destinasi, video dokumenter lapangan, dan pengelolaan aset visual.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-800">Tim Dokumentasi (UGM & UNIB)</p>
                </div>
              </div>

              {/* Card 3: Riset Budaya & Konten */}
              <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:border-accent-400 transition-colors">
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-800 mb-3">
                    <FileText size={18} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">Riset & Penulisan Konten</h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Wawancara pemangku adat, pendataan homestay warga, dan penyusunan narasi sejarah.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-800">Tim Riset & Humas (UGM & UNIB)</p>
                </div>
              </div>

              {/* Card 4: DPL */}
              <div className="flex flex-col justify-between rounded-xl border border-neutral-200/80 bg-white p-5 shadow-xs hover:border-accent-400 transition-colors">
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-800 mb-3">
                    <GraduationCap size={18} />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">Pembimbing Lapangan</h4>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                    Arahan akademik, bimbingan program pengabdian, dan supervisi pelaksanaan di lapangan.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <p className="text-xs font-semibold text-neutral-800">Dosen Pembimbing Lapangan (UGM & UNIB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. GALERI KEGIATAN LAPANGAN (MASONRY PINTEREST)                    */}
      {/* ================================================================= */}
      <section className="bg-white py-14 sm:py-16 md:py-24 border-t border-neutral-200/70">
        <div className="mx-auto w-full px-4 sm:px-6 lg:w-[80%] lg:px-0">
          <div className="max-w-3xl mb-8 reveal-up" style={{ '--reveal-delay': '120ms' }}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-neutral-900 leading-tight">
              Galeri Kegiatan & Dokumentasi
            </h2>
            <div className="mt-3.5 h-1 w-10 bg-accent-500 rounded-full" />
            <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-neutral-600">
              Dokumentasi foto perjalanan dan pelaksanaan program kegiatan di Pulau Enggano. Klik foto mana saja untuk memperbesar.
            </p>
          </div>

          {/* MASONRY GRID (ALA PINTEREST DENGAN CSS COLUMNS) */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setLightboxIndex(index)}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200/80 shadow-xs cursor-pointer active:scale-[0.98] transition-transform duration-300"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-white">
                  <p className="font-semibold text-xs sm:text-sm leading-snug line-clamp-2">
                    {image.title}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-white/80">
                    <ZoomIn size={13} />
                    <span>Lihat foto</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================== */}
      {/* 4. LIGHTBOX MODAL (PREVIEW FOTO BESAR)                               */}
      {/* =================================================================== */}
      {lightboxIndex !== null && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Tombol Tutup (X) */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            aria-label="Tutup"
          >
            <X size={20} />
          </button>

          {/* Tombol Sebelumnya */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
            }}
            className="absolute left-3 sm:left-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Tombol Selanjutnya */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((prev) => (prev + 1) % galleryImages.length)
            }}
            className="absolute right-3 sm:right-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 transition-colors"
            aria-label="Selanjutnya"
          >
            <ChevronRight size={24} />
          </button>

          {/* Kotak Preview Modal */}
          <div
            className="max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-neutral-900 text-white">
              <div className="flex items-center justify-between gap-4 mb-1">
                <h3 className="font-display text-base sm:text-lg font-bold">{activeImage.title}</h3>
                <span className="text-xs text-white/50">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
              {activeImage.caption && (
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {activeImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
