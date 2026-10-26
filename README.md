# Dokumentasi Proyek Kaanek Enggano

Proyek **Kaanek Enggano** adalah platform sistem informasi dan promosi potensi Pulau Enggano berbasis web yang dibangun menggunakan ekosistem Laravel modern (Laravel 12), Inertia.js dengan React, serta Filament Admin Panel v3.

### 1. Ringkasan Aplikasi

Aplikasi ini dirancang sebagai platform informasi terpadu untuk Pulau Enggano yang menyajikan data pariwisata, penginapan, UMKM lokal, jadwal kapal penyeberangan, serta dokumentasi aktivitas Kuliah Kerja Nyata (KKN) masyarakat lokal dan mahasiswa.

### 2. Permasalahan & Solusi

* **Permasalahan 1: Akses Informasi Wisata dan Penyeberangan yang Terbatas**
  * *Masalah:* Wisatawan dan pendatang sering kesulitan mendapatkan informasi pasti mengenai jadwal kapal penyeberangan, objek wisata, penginapan (*homestay*), serta pemandu lokal di Pulau Enggano karena informasi masih tersebar lisan.
  * *Solusi:* Menyediakan pusat informasi digital terpadu yang merangkum seluruh katalog pariwisata, profil desa, kontak pemandu lokal, hingga jadwal operasional kapal secara transparan dan mudah diakses dari mana saja.

* **Permasalahan 2: Keterbatasan Pemasaran Produk UMKM dan Jasa Penginapan Warga**
  * *Masalah:* Pelaku usaha UMKM dan pemilik penginapan lokal di Enggano memiliki jangkauan promosi yang terbatas untuk mengenalkan produk olahan serta akomodasi mereka kepada masyarakat luar pulau.
  * *Solusi:* Menyediakan direktori digital khusus UMKM dan *homestay* yang dilengkapi dengan peta lokasi interaktif serta fitur komunikasi langsung via WhatsApp ke pengelola usaha.

* **Permasalahan 3: Pengelolaan Foto dan Galeri Potensi Desa secara Mandiri**
  * *Masalah:* Pengelola desa dan UMKM lokal sering kesulitan mengunggah serta memperbarui dokumentasi foto destinasi atau produk secara rapi tanpa harus mengerti teknis pengoperasian web yang rumit.
  * *Solusi:* Menyediakan sistem manajemen konten yang ramah pengguna serta penataan galeri foto otomatis sehingga pengelola lokal dapat memperbarui informasi dan dokumentasi media dengan cepat dan rapi.

### 3. Manfaat Aplikasi

* **Bagi Wisatawan & Pendatang:** Memudahkan perencanaan perjalanan ke Pulau Enggano melalui kepastian jadwal transportasi penyeberangan, pilihan penginapan, dan daftar destinasi wisata.

* **Bagi Masyarakat & Pelaku Usaha Lokal:** Meningkatkan visibilitas dan daya saing ekonomi lokal melalui promosi produk UMKM serta jasa pemandu wisata (*local guide*).

* **Bagi Pemerintah Daerah & Tim KKN:** Menjadi basis data digital terstruktur mengenai potensi desa serta sarana publikasi transparansi kegiatan KKN di Pulau Enggano.

### 4. Stack Teknologi & Arsitektur

* **Backend Framework:** Laravel 12 (PHP 8.2+) dengan arsitektur MVC dan perintah CLI Artisan kustom.

* **Admin Panel:** Filament Panel Builder v3 untuk manajemen data internal (CRUD destinasi, homestay, UMKM, jadwal kapal, dan logbook KKN).

* **Frontend Framework:** Inertia.js dengan React, menggabungkan kemudahan Single Page Application (SPA) dengan keandalan routing backend Laravel.

* **Styling & Tampilan:** Tailwind CSS, Lucide Icons, BentoGrid, serta komponen kartu terstruktur.

* **Geo-Mapping:** Leaflet.js untuk peta interaktif pemetaan lokasi destinasi dan UMKM.

* **Internasionalisasi (i18n):** Dukungan multi-bahasa (Bahasa Indonesia dan Bahasa Inggris) berbasis `locales/id` dan `locales/en`.

* **Manajemen Media & SEO:** `spatie/laravel-medialibrary` untuk pengelolaan unggahan foto dan `spatie/laravel-sluggable` untuk optimasi URL SEO-friendly.
