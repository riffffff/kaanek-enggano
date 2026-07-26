# 🚀 PANDUAN DEPLOY LARAVEL 12 - ARENHOST / LIIQU.ID
## Domain: jelajahenggano.com
## ✨ KAMU BELI HOSTING + DOMAIN SEKALIAN → AUTO-CONFIG LEBIH MUDAH!

---

## 🔑 ⚠️ BEDA PANEL DI ARENHOST (JANGAN SAMPAI BINGUNG!)

### Panel 1: **ArenHost Billing Panel** (YANG KAMU BUKA SEKARANG)
🔗 URL: `https://reseller13400.liiqu.id/customer`
- **Fungsi**: Belanja domain & hosting, bayar tagihan, manage order
- **Bisa manage**: Nameserver domain, lihat invoice, upgrade hosting
- **TIDAK BISA disini**: Upload file, buat database, setting PHP (ini tugas panel hosting di bawah!)
- **Cara ke panel hosting**: Lihat **sidebar kiri → menu "Services" / "My Services" / "Hosting"** → Klik hosting plan kamu → tombol **"Login to Control Panel"** (auto login ke MyHPanel/cPanel!)

### Panel 2: **MyHPanel / Hosting Control Panel** (PANEL UTAMA DEPLOY)
- Ini panel hosting yang mirip cPanel (biasanya warna biru/ungu custom Liiqu)
- **Fungsi**: Upload file website, buat MySQL database, setting upload size PHP, buat email, dll
- **Nama menu disini**: File Manager, MySQL Databases, Select PHP Version, PHPMyAdmin, Cron Jobs, dll
- **Cara masuk**:
  - Opsi A: Klik menu "Services" di panel billing ArenHost → pilih hosting → **Login to Control Panel** ✅ (MUDAH, tanpa password!)
  - Opsi B: Login manual dari URL yang dikirim email welcome
  - Opsi C: URL lompat: `https://jelajahenggano.com/cpanel` atau `https://cpanel.jelajahenggano.com` (jika DNS sudah propagate)

---

## ⏱️ QUICK START CHECKLIST 15 MENIT (KHUSUS USER ARENHOST BELI PAKET HEMAT!)
Jika kamu tidak mau baca panjang, langsung ikuti 8 step ini:

| # | Waktu | Aksi di Panel | Keterangan |
|---|-------|--------------|-------------|
| 1 | 1m | **Panel Billing ArenHost → Services → Login to Control Panel** | Buka MyHPanel / hosting panel |
| 2 | 2m | **Hosting Panel → Select PHP Version** | Pilih PHP **8.2 atau 8.3**, set upload_max_filesize=256M, post_max_size=260M, memory_limit=512M, max_execution_time=300 → Save |
| 3 | 2m | **Hosting Panel → MySQL Databases** | Buat database + user → Add user ke DB, centang ALL PRIVILEGES → Catat nama DB+user+pass |
| 4 | 3m | **Panel Billing ArenHost → My Domains → jelajahenggano.com → Nameserver** | PASTIKAN isinya: `srv1.arenhost.com` dan `srv2.arenhost.com` → **JANGAN DIUBAH!** (sudah auto-set karena beli domain+hosting sekaligus) |
| 5 | 3m | **Hosting Panel → File Manager** | Upload ZIP project + ZIP public ke folder yang benar (lihat gambar struktur di Langkah 3) → Extract |
| 6 | 2m | **File Manager** | Edit file `public_html/index.php` → Ubah path project, edit `.env` di folder project → isi DB, APP_URL, SESSION_DOMAIN |
| 7 | 1m | **Hosting Panel → Cron Jobs (atau buat setup.php)** | Jalankan artisan key:generate, migrate, cache, storage:link |
| 8 | 1m | **Buka https://jelajahenggano.com** | Test website, test login admin, test upload file besar |

---

## 📋 YANG PERLU DIPERSIAPKAN SEBELUM DEPLOY

✅ Project ini di komputer lokal (sudah include build assets, tinggal zip)
✅ Sudah login ke **kedua panel**: Billing ArenHost (liiqu.id) + Hosting Control Panel (MyHPanel)
✅ Domain **jelajahenggano.com** aktif (status Live)
✅ Nameserver domain sudah otomatis di-set ArenHost

---

## ✅ LANGKAH 0: NAMESERVER DOMAIN (KAMU BELI DOMAIN+HOSTING SEKALIAN → SUDAH AUTO DONE!)

Karena kamu beli **domain + hosting BERSAMAAN di provider YANG SAMA (ArenHost)**, nameserver **OTOMATIS SUDAH BENAR** di-set system!

Dari screenshot kamu (Manage Domain > Name Servers):
```
NS1: srv1.arenhost.com    ✅
NS2: srv2.arenhost.com    ✅
```

👉 **JANGAN DIUBAH / JANGAN KLIK MODIFY!** Biarkan apa adanya. Status sudah 100% benar.

> 🧪 Cek propagate DNS setelah semua siap: Buka https://dnschecker.org → search `jelajahenggano.com` → pilih "A" record → jika muncul 1 IP kuning = sukses. Biasanya 5-30 menit untuk provider internal Liiqu/ArenHost (cepat!).

---

## 🔐 LANGKAH 1: MASUK KE HOSTING CONTROL PANEL (MyHPanel)

Ini **PENTING**, jangan salah panel (jangan di Billing ArenHost terus!):

1. Login ke ArenHost Billing Panel: https://reseller13400.liiqu.id/customer
2. Lihat **Sidebar Kiri**:
   - Cari menu **`Services`** (ikon folder / server / hosting, biasanya di bawah My Domains)
   - Jika menu dropdown: klik **`My Services`** / **`My Hosting`**
3. Akan muncul daftar hosting aktif kamu (nama plan: Starter / Bisnis / dll)
4. **Klik nama plan hosting** itu → masuk halaman detail hosting
5. Disini ada tombol BIRU BESAR: **`Login to Control Panel`** / **`Login ke cPanel`** / **`Login to MyHPanel`**
6. Klik tombol itu → **Auto login tanpa password!** ✨
7. Welcome MyHPanel! Ini panel tempat kamu upload file, buat database, dll.

> 📧 Jika tombol tidak ada / error: Cek email inbox (dan SPAM!) subject "Informasi Akun Hosting" / "Your Hosting Account Details" dari arenhost@ atau support@.liiqu.id. Isinya URL MyHPanel + username + password.

---

## ⚙️ LANGKAH 2: SETTING PHP VERSION + UPLOAD SIZE 256MB (DI MYHPANEL)

**WAJIB LAKUKAN!** Default shared hosting biasanya upload cuma 8MB. Ini bikin upload file destination error 413.

1. Di **MyHPanel / Control Panel** → cari menu **`Select PHP Version`** (ikon gajah / kotak PHP)
2. Tab **`Settings`** atau **`Options`** (ada di tab sebelah kanan "Extensions")
3. Atur nilai INI berikut:
   | Setting | Value | Alasan |
   |---------|-------|--------|
   | PHP Version | **8.2** atau **8.3** | Laravel 12 butuh 8.2+ |
   | `upload_max_filesize` | **256M** ← penting! | Upload file video/foto besar |
   | `post_max_size` | **260M** ← penting! | Harus lebih besar dr upload_max |
   | `max_execution_time` | **300** (5 menit) | Upload file besar tidak timeout |
   | `max_input_time` | **300** | |
   | `memory_limit` | **512M** | Laravel + Filament butuh banyak |
   | `max_input_vars` | **5000** | Input form banyak |
   | `date.timezone` | **Asia/Jakarta** | |
   | `display_errors` | **Off** (production) | |
   | `allow_url_fopen` | **On** | |
4. Klik tombol **`Save`** di pojok kanan bawah!
5. (Opsional) Tab **Extensions** → pastikan tercentang: `bcmath`, `ctype`, `fileinfo`, `gd`, `json`, `mbstring`, `openssl`, `pdo_mysql`, `tokenizer`, `xml`, `zip`, `curl` (Laravel butuh ini, kebanyakan sudah default ON)

---

## 🗂️ LANGKAH 3: BUAT DATABASE MYSQL DI MYHPANEL

1. Di MyHPanel → cari menu **`MySQL Databases`** (ikon silinder database biru)
2. **Buat Database baru:**
   - Kolom "New Database Name": isi `jelajah_web` atau `web_enggano` (nama akan auto-prefix username panelmu, jadi hasilnya contoh: `userkamu_jelajahweb`)
   - Klik **Create Database** → catat nama lengkapnya (dengan prefix!)
3. **Buat Database User baru:**
   - Scroll kebawah → "MySQL Users" → "Add New User"
   - Username: `jelajah_user` (juga di-prefix, jadi `userkamu_jelajahuser`)
   - Password: klik tombol **Generate Password** (SIMPAN PASSWORD INI! JANGAN SAMPAI HILANG)
   - Klik **Create User**
4. **Add User ke Database (PENTING - JANGAN LUPA!)**
   - "Add User To Database" section
   - Pilih User yang baru dibuat di dropdown User
   - Pilih Database yang baru dibuat di dropdown Database
   - Klik **Add**
   - Muncul halaman Manage Privileges → centang kolom **`ALL PRIVILEGES`** di atas (atau centang semua checkbox satu per satu)
   - Klik **`Make Changes`** / **Save**
5. **Simpan 3 nilai ini!** (tempel di Notepad dulu):
   ```
   DB_CONNECTION=mysql
   DB_HOST=localhost                 ← SELALU localhost di shared hosting
   DB_PORT=3306
   DB_DATABASE=userkamu_jelajahweb   ← Ganti DENGAN NAMA LENGKAP DARI STEP 2
   DB_USERNAME=userkamu_jelajahuser  ← Ganti DENGAN USER LENGKAP DARI STEP 3
   DB_PASSWORD=passwordYangDiGenerate 💾 ← PASTE DISINI
   ```

---

## 📦 LANGKAH 4: PERSIAPKAN 2 FILE ZIP DI KOMPUTER KAMU

Di **laptop/komputer lokal** (folder project web-enggano ini):

### 📦 ZIP 1: Semua File KECUALI Folder `public/`
1. Buka folder project `/home/rifai/project/kaanek-enggano/web-enggano`
2. **Pilih SEMUA file & folder KECUALI folder `public/`**
   - Yang di-ZIP: app, bootstrap, config, database, resources, routes, vendor, .env, .env.example, .htaccess, artisan, composer.*, package.*, php-cli.ini, DEPLOY.md, serve.sh, dll
   - **YANG DILUAR** (jangan ikut): folder `public/` SATU-SATUNYA!
3. Klik kanan → **Compress** / **Create ZIP** → beri nama **`project-webenggano.zip`**

### 📦 ZIP 2: HANYA ISI Folder `public/` SAJA
1. Masuk ke folder `public/`
2. Pilih SEMUA yang didalamnya: build/, css/, js/, .htaccess, .user.ini, favicon.ico, index.php, robots.txt, dll
3. Compress / ZIP → beri nama **`public-webenggano.zip`**

> ⚠️ **JANGAN SAMPAI SALAH!** Kalau kamu masukkan folder project ke public_html semua, file `.env` kamu bisa diakses orang dari internet.

---

## 📤 LANGKAH 5: UPLOAD DAN EXTRACT ZIP (DI FILE MANAGER MYHPANEL)

1. Di MyHPanel → buka menu **`File Manager`** (ikon folder kuning)
2. Double-click folder **`/home/usernamekamu/`** di sidebar kiri untuk ke root akun

### Upload ZIP 1 (project-webenggano.zip) ke LUAR public_html:
3. Kamu sekarang ada di `/home/usernamekamu/` (disini ada folder: `public_html`, `tmp`, `etc`, `mail`, dll)
4. Klik tombol **`Upload`** di toolbar atas
5. Upload file **`project-webenggano.zip`**
6. Setelah upload selesai, kembali ke File Manager
7. **Klik kanan** `project-webenggano.zip` → **`Extract`** (Extract All Files)
8. Muncul dialog extract path: KOSONGKAN ATAU ISI `/home/usernamekamu/web-enggano` → **Extract File(s)**
9. Hasilnya: muncul folder baru **`web-enggano`** di `/home/usernamekamu/web-enggano/` (ini folder project RAHASIA, TIDAK bisa diakses publik!)
10. ✅ Selesai ZIP 1. (Opsional: hapus `project-webenggano.zip` untuk hemat storage)

### Upload ZIP 2 (public-webenggano.zip) KE DALAM public_html:
11. Klik folder **`public_html`** di sidebar (masuk ke dalamnya). Isinya biasanya cuma file `index.html` default welcome Liiqu/ArenHost.
12. **HAPUS SEMUA file default di public_html!** (index.html, logo.png, dll). Jangan sampai bentrok dengan index.php Laravel.
13. Klik tombol **Upload** lagi → upload **`public-webenggano.zip`**
14. Setelah upload selesai, klik kanan ZIP nya → **Extract** → Extract ke dalam `/home/usernamekamu/public_html/` (TIDAK usa ada subfolder!)
15. ✅ Hasilnya: di public_html sekarang ada file `index.php`, `.htaccess`, `.user.ini`, folder `build/`, `js/`, `css/` dll.
16. Hapus file ZIP yang sudah diextract.

### ✅ AKHIRNYA STRUKTUR FOLDER SEHARUSNYA SEPERTI INI:
```
/home/usernamekamu/
├── 📁 etc/
├── 📁 logs/
├── 📁 mail/
├── 📁 tmp/
├── 📁 web-enggano/              ← 📁 FOLDER PROJECT (hasil extract ZIP 1)
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── resources/
│   ├── routes/
│   ├── vendor/
│   ├── .env                     ← NANTI KITA EDIT INI (Langkah 6)
│   ├── .htaccess
│   ├── artisan
│   └── ...semua file lainnya
│
└── 📁 public_html/              ← 🌐 FOLDER WEB PUBLIK (hasil extract ZIP 2)
    ├── 📁 build/
    ├── 📁 css/
    ├── 📁 js/
    ├── .htaccess                ← DARI KITA, isinya redirect HTTPS + upload size
    ├── .user.ini                ← ⭐ PENTING! Setting PHP upload size
    ├── favicon.ico
    ├── index.php                ← NANTI KITA EDIT PATH NYA (Langkah 6)
    └── robots.txt
```

---

## ✏️ LANGKAH 6: EDIT 2 FILE KRITIS

Masih di **File Manager MyHPanel**:

### 🔧 File 1: `public_html/index.php` → UBAH PATH PROJECT
1. Klik folder `public_html/`
2. Klik kanan file **`index.php`** → **`Edit`** / **`Code Editor`**
3. **HAPUS SEMUA ISI INDEX.PHP YANG LAMA**, lalu **PASTE kode berikut** (SUDAH KITA SESUAIKAN nama folder `web-enggano`):
   ```php
   <?php

   use Illuminate\Http\Request;

   define('LARAVEL_START', microtime(true));

   // NAMA FOLDER PROJECT KITA = web-enggano (di LUAR public_html)
   $PROJECT_PATH = __DIR__ . '/../web-enggano';

   if (file_exists($maintenance = $PROJECT_PATH . '/storage/framework/maintenance.php')) {
       require $maintenance;
   }

   require $PROJECT_PATH . '/vendor/autoload.php';

   $app = require_once $PROJECT_PATH . '/bootstrap/app.php';

   $app->handleRequest(Request::capture());
   ```
4. Klik **`Save`**

> ⚠️ Kalau kamu ganti nama folder project (misal bukan `web-enggano` tapi `laravel`), ganti baris `$PROJECT_PATH` menyesuaikan.

### 🔧 File 2: `web-enggano/.env` → FILL DATABASE + PRODUCTION CONFIG
1. Kembali ke root `/home/usernamekamu/`
2. Masuk ke folder **`web-enggano/`**
3. **Kalau tidak ada file `.env`**: Copy file **`.env.example`** → Rename jadi **`.env`** (klik kanan Copy → Paste)
4. Klik kanan file **`.env`** → **`Edit`** / **`Code Editor`**
5. **Ganti baris-baris PENTING ini** (lainnya biarkan default):
   ```env
   # ===== UMUM =====
   APP_NAME="Web Enggano"
   APP_ENV=production                      # ← HARUS production!
   APP_KEY=                                # ← KOSONGIN, nanti generate otomatis
   APP_DEBUG=false                         # ← HARUS false! (JANGAN tampilkan error ke user)
   APP_URL=https://jelajahenggano.com
   APP_DOMAIN=jelajahenggano.com
   APP_WA_NUMBER=628xxxxxx                 # ← Ganti NO WA KAMU

   # ===== DATABASE (DARI LANGKAH 3, PASTEKAN NILAI YANG KAMU SIMPAN) =====
   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=userkamu_jelajahweb         # ← GANTI! Nama DB lengkap (dgn prefix)
   DB_USERNAME=userkamu_jelajahuser        # ← GANTI! Nama user lengkap (dgn prefix)
   DB_PASSWORD=password_dari_step3         # ← GANTI! Password user DB

   # ===== SESSION (PENTING! JANGAN SALAH) =====
   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   SESSION_ENCRYPT=true
   SESSION_PATH=/
   SESSION_DOMAIN=.jelajahenggano.com      # ← ADA TITIK DI DEPAN, JANGAN HILANG!

   # ===== FILESYSTEM (UPLOAD FOTO/VIDEO SIMPAN KE SINI) =====
   FILESYSTEM_DISK=public

   # ===== EMAIL (OPSIONAL, BISA DISET NANTI) =====
   MAIL_MAILER=log                         # ← SEMENTARA pake log, ganti ke SMTP kalo sudah punya email hostingan

   # ===== LIVEWIRE/FILAMENT UPLOAD =====
   LIVEWIRE_TEMP_UPLOAD_RULES_MAX=262144
   ```
6. Klik **`Save`**

---

## 🔒 LANGKAH 7: SET PERMISSION FOLDER STORAGE

Laravel butuh bisa menulis file ke `storage/` dan `bootstrap/cache/`. Kalau permission salah = 500 error!

Di **File Manager MyHPanel**:
1. Masuk folder `/home/usernamekamu/web-enggano/`
2. Klik kanan folder **`storage`** → **`Change Permissions`**
   - Isi permission: **`0755`** ATAU **`0775`**
   - Centang opsi: **`Recurse into subdirectories`** / **Apply recursively** → pilih "Apply to all files and directories"
   - Klik **Change**
3. Klik kanan folder **`bootstrap/cache`** → **`Change Permissions`** → **`0755`** → recurse juga → Save

### (OPSIONAL) File .env protection:
- Klik kanan file `.env` di web-enggano/ → Permission → isi **`0640`** (hanya kamu yang bisa baca)

---

## 🧰 LANGKAH 8: RUN ARTISAN COMMAND (KEY, MIGRATE, CACHE, STORAGE LINK)

Laravel butuh jalanin beberapa command artisan sebelum live. Di shared hosting kadang tidak ada SSH. **PILIH 1 OPSI TERMUDAH!**

### ✨ OPSI A (TERMUDAH! TANPA SSH): Pakai file setup.php temporary
1. Di MyHPanel → File Manager → masuk **`public_html/`**
2. Klik tombol **New File** (file baru) → nama: **`setup.php`** → Create
3. Klik kanan `setup.php` → **Edit** → paste SEMUA kode ini:
   ```php
   <?php
   // ⚠️⚠️⚠️ HAPUS FILE INI SETELAH SELESAI! JANGAN TINGGAL DI SERVER ⚠️⚠️⚠️
   // Ini file sementara untuk run artisan command tanpa SSH

   // PATH FOLDER PROJECT (pastikan SAMA dengan di index.php!)
   $PROJECT_PATH = __DIR__ . '/../web-enggano';

   require $PROJECT_PATH . '/vendor/autoload.php';
   $app = require_once $PROJECT_PATH . '/bootstrap/app.php';
   $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

   echo "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Setup Web Enggano</title>";
   echo "<style>body{font-family:monospace;background:#111;color:#afa;padding:20px;font-size:14px}h2{color:#ff0}.ok{color:#0f0}.err{color:#f00}</style></head><body>";
   echo "<h2>🚀 Setup Web Enggano - jelajahenggano.com</h2>";
   echo "<hr><pre>";

   $commands = [
       ['🔑 Generate APP_KEY...', 'key:generate', ['--force' => true]],
       ['⚡ Optimize Config...', 'config:cache', []],
       ['🛣️  Cache Routes...', 'route:cache', []],
       ['🎨 Cache Views...', 'view:cache', []],
       ['💽 MIGRATE DATABASE (membuat tabel)...', 'migrate', ['--force' => true]],
       // ⚠️ JIKA INGIN SEED DATA (Jalankan HANYA SEKALI SAJA, kalo data sudah ada TIDAK USAH!):
       // ['🌱 Seed Data awal...', 'db:seed', ['--force' => true]],
       // ⚠️ JIKA INGIN FRESH + SEED (DROP SEMUA TABEL LAMA!):
       // ['🔄 Fresh Migrate + Seed...', 'migrate:fresh', ['--seed' => true, '--force' => true]],
       ['🔗 Storage Link (symlink)...', 'storage:link', []],
   ];

   $allOk = true;
   foreach ($commands as [$label, $cmd, $args]) {
       echo "<h3>{$label} <small>(php artisan {$cmd})</small></h3>";
       flush();
       try {
           $exit = $kernel->call($cmd, $args);
           $out = $kernel->output();
           if ($exit === 0) echo "<span class='ok'>✅ Berhasil!</span>\n"; else echo "<span class='err'>⚠️ Exit code: {$exit}</span>\n";
           echo trim($out) ? htmlspecialchars($out)."\n" : "(no output)\n";
       } catch (Throwable $e) {
           $allOk = false;
           echo "<span class='err'>❌ ERROR: " . $e->getMessage() . "</span>\nFile: " . $e->getFile() . ":" . $e->getLine() . "\n";
       }
       echo "<hr>";
   }

   echo "</pre>";

   if ($allOk) {
       echo "<h2 style='color:#0f0'>✅ SEMUA BERHASIL!</h2>";
       echo "<h3>SEKARANG <u>HAPUS FILE setup.php INI</u> (klik kanan delete di File Manager). JANGAN SAMPAI TERTINGGAL!</h3>";
       echo "<p><a href='/'>🚀 BUKA BERANDA SITUS →</a></p>";
       echo "<p><a href='/admin'>🔐 LOGIN ADMIN PANEL FILAMENT →</a></p>";
   } else {
       echo "<h2 style='color:#f00'>⚠️ ADA ERROR, lihat pesan diatas. Perbaiki lalu refresh halaman ini.</h2>";
   }

   echo "</body></html>";
   ```
4. **Save** file setup.php
5. Buka **`https://jelajahenggano.com/setup.php`** di browser baru
6. ✨ Tunggu 5-30 detik, lihat progressnya
7. ❗ **SETELAH SEMUA BERTANDA ✅ BERHASIL → KEMBALI KE FILE MANAGER → HAPUS FILE `setup.php` SEKARANG JUGA!** (keamanan!)

> **Jika "Storage Link" gagal** ("File exists"): Karena symlink sudah ada atau hosting tidak support symlink. Tidak apa, bisa dilewati atau nanti buat manually (copy folder storage/app/public ke public_html/storage)

### 💻 OPSI B (JIKA ADA SSH AKSES):
Lebih disarankan jika host menyediakan SSH (ArenHost plan tertentu biasanya support):
```bash
ssh usernamekamu@jelajahenggano.com
cd web-enggano

php artisan key:generate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
# php artisan db:seed --force   # (optional, seed data)
php artisan storage:link
```

---

## 🔍 LANGKAH 9: SECURITY + FINAL CHECKLIST (WAJIB!)

### 🚨 PALING PENTING PERTAMA:
- ✅ File **`public_html/setup.php` SUDAH DIHAPUS ❗** (refresh url setup.php → 404 = ok)

### ✅ Semua Security Check:
Buka URL di browser baru, cek status:
1. `https://jelajahenggano.com/.env` → HARUS **403 / 404 Forbidden** (TIDAK BOLEH terlihat! Kalau kebuka = struktur folder salah)
2. `https://jelajahenggano.com/vendor/` → HARUS **403**
3. `https://jelajahenggano.com/artisan` → HARUS **403 / 404**
4. `http://jelajahenggano.com` → **OTOMATIS pindah ke https://** (301 redirect HTTPS)
5. `https://www.jelajahenggano.com` → OTOMATIS pindah ke https://jelajahenggano.com (non-www)
6. Buka DevTools → Network tab → refresh → lihat Response Headers ada `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff` → ✅

---

## 🧪 LANGKAH 10: TEST SEMUA FITUR WEBSITE

| Fitur | Cara Test | Expected Result |
|-------|-----------|-----------------|
| **Halaman Depan** | Buka `https://jelajahenggano.com` | Muncul Web Enggano (bukan welcome ArenHost!) |
| **Admin Filament** | Buka `/admin` | Muncul login form Filament |
| **Login Admin** | Login pakai user yang ada di DB (atau register dulu jika perlu) | Masuk dashboard admin |
| **Upload File 50MB+** | Admin → Destinasi → Edit → Upload foto/video besar | Success, 0% error 413 Content Too Large |
| **Gambar Terupload** | Buka destinasi → klik gambar | Gambar terload (bukan broken) |
| **CRUD Data** | Create / Edit / Delete Destinasi, Aktivitas, UMKM, Homestay | Data tersimpan ke DB |
| **WhatsApp Button** | Klik ikon WA di halaman | Buka wa.me dengan nomormu |
| **Session Tidak Hilang** | Refresh halaman 5x → tetap login | Tidak auto-logout |

---

## 💸 TES UPLOAD SIZE - JIKA MASIH ERROR 413:
Jalankan file `phpinfo()` untuk check apakah 256M aktif:
1. Buat file `public_html/cek.php`:
   ```php
   <?php phpinfo();
   ```
2. Buka `https://jelajahenggano.com/cek.php`
3. Cari 3 baris ini (gunakan Ctrl+F):
   - `upload_max_filesize` → harus **256M**
   - `post_max_size` → harus **260M**
   - `Loaded Configuration File` / `.user.ini` yang aktif
4. Jika masih 8M / 2M:
   - Coba di MyHPanel → Select PHP Version → Options save ulang
   - Pastikan `public_html/.user.ini` ADA (buka File Manager → Settings → Show Hidden Files)
   - Masih kecil? Chat support ArenHost minta dinaikkan limit upload PHP

> ❌ **SELESAI CEK, HAPUS FILE `cek.php` JUGA!** (Jangan ditinggal)

---

## 💻 LAMPIRAN A: CARA AKSES TERMINAL / SSH AKSES DI ARENHOST

Ada 2 cara akses command line di shared hosting, pilih salah satu:

### ⚡ METODE 1: PAKAI BUILT-IN TERMINAL (MYHPANEL / CPANEL) - PALING MUDAH!
Tidak perlu install software apapun, langsung dari browser:
1. Login ke MyHPanel / cPanel (Billing ArenHost → Services → Login to Control Panel)
2. Cari menu **`Terminal`** (ikon monitor hitam >_, section Advanced / System)
3. Klik → muncul warning risiko keamanan → centang / klik **I Accept**
4. ✨ Masuk ke terminal Linux, langsung di folder `/home/usernamekamu/`

Kalau menu Terminal tidak muncul: Enable via Ticket Support Billing ArenHost.

### 💻 METODE 2: SSH DARI TERMINAL KOMPUTER KAMU (LINUX / MAC / WSL)
1. MyHPanel → cari menu **`SSH Access`** (ikon gembok) → Enable SSH Access
2. Dapatkan data login:
   ```
   Host:     jelajahenggano.com ATAU srv1.arenhost.com ATAU IP Server
   Port:     22 ATAU 7822 ATAU 64000 (custom port shared hosting)
   Username: username panel kamu
   Password: password cPanel kamu
   ```
3. Jalankan di terminal lokal:
   ```bash
   ssh usernamekamu@jelajahenggano.com -p 22
   # (jika port custom): ssh usernamekamu@srv1.arenhost.com -p 7822
   ```
4. Masukkan password cPanel. Jika "Are you sure you want to continue?" → ketik **yes**.

---

## 🌿 LAMPIRAN B: DEPLOY / UPDATE VIA GIT (LEBIH RAPI!)

Kalau kamu suka update code nantinya tinggal push, upload ZIP ribet, pakai Git.
**Pastikan source code kamu sudah di-push ke GitHub / GitLab / Bitbucket dulu sebelum mulai.**

---

### 🅰️ OPSI A: GIT VERSION CONTROL (CPANEL GUI) - UNTUK PEMULA
Fitur bawaan MyHPanel/cPanel:
1. **Push code lokal ke GitHub dulu:**
   ```bash
   cd /home/rifai/project/kaanek-enggano/web-enggano
   git init
   git add .
   git commit -m "Initial commit Web Enggano"
   git branch -M main
   git remote add origin git@github.com:USERNAMEKAMU/web-enggano.git
   git push -u origin main
   ```
   > ⚠️ Pastikan file `.env` masuk ke `.gitignore`! (Jangan di-push ke GitHub!)

2. **MyHPanel → Menu `Git Version Control`** 🌿 → Create / Clone
3. Clone URL: `git@github.com:USERNAMEKAMU/web-enggano.git`
4. Repository Path: **`web-enggano`** (di LUAR public_html!)
5. Jika repo PRIVATE: Clone gagal? Klik repo di Git Version Control → Settings → SSH Keys → Copy Public Key → GitHub repo → Settings → **Deploy Keys** → Add Key (centang Allow Write) → kembali ke cPanel → Pull / Deploy ulang.

6. **Setup public_html (SETELAH CLONE BERHASIL - via Terminal):**
   ```bash
   cd ~
   mv public_html public_html_backup  # backup default
   mkdir public_html
   
   # Copy index.php template dari repo agar path ke folder project BENAR:
   cat > public_html/index.php <<'EOF'
   <?php
   use Illuminate\Http\Request;
   define('LARAVEL_START', microtime(true));
   $PROJECT_PATH = __DIR__ . '/../web-enggano';
   if (file_exists($maintenance = $PROJECT_PATH . '/storage/framework/maintenance.php')) require $maintenance;
   require $PROJECT_PATH . '/vendor/autoload.php';
   $app = require_once $PROJECT_PATH . '/bootstrap/app.php';
   $app->handleRequest(Request::capture());
   EOF
   
   # Copy .htaccess + .user.ini + assets dari folder public project ke public_html
   cp web-enggano/public/.htaccess public_html/
   cp web-enggano/public/.user.ini public_html/
   cp -r web-enggano/public/build public_html/ 2>/dev/null
   cp -r web-enggano/public/js public_html/ 2>/dev/null
   cp -r web-enggano/public/css public_html/ 2>/dev/null
   cp -r web-enggano/public/* public_html/ 2>/dev/null
   ```

7. **Install Vendor + Setup Laravel:**
   ```bash
   cd ~/web-enggano
   
   # Install Composer Production (jika OOM/RAM kecil → jalankan di LOKAL + push folder vendor ke git)
   composer install --no-dev --optimize-autoloader
   
   # Setup env + key + migrate + cache
   cp .env.example .env
   nano .env  # Isi DB credentials, APP_URL=https://jelajahenggano.com, APP_ENV=production, APP_DEBUG=false
   chmod -R 755 storage bootstrap/cache
   php artisan key:generate --force
   php artisan config:cache && php artisan route:cache && php artisan view:cache
   php artisan migrate --force
   # php artisan db:seed --force   # (jika perlu seed awal)
   php artisan storage:link
   ```

8. **CARA UPDATE KEDAPANNYA (setiap push code baru ke main):**
   - Opsi GUI: cPanel → Git Version Control → Pull / Deploy
   - Opsi Terminal (LEBIH CEPAT):
     ```bash
     cd ~/web-enggano
     git pull origin main
     composer install --no-dev --optimize-autoloader
     php artisan optimize
     php artisan migrate --force
     
     # JIKA ADA perubahan di folder public (CSS/JS/Vite build) → RE-COPY ke public_html:
     cp web-enggano/public/.htaccess public_html/
     cp web-enggano/public/.user.ini public_html/
     cp -r web-enggano/public/* public_html/
     ```

---

### 🅱️ OPSI B: CLONE MANUAL VIA SSH TERMINAL (LEBIH FLEKSIBEL)
1. Push code ke GitHub dulu
2. SSH ke hosting, lalu:
   ```bash
   cd ~
   # (Jika repo private) Generate + install SSH Key:
   if [ ! -f ~/.ssh/id_ed25519 ]; then
     ssh-keygen -t ed25519 -C "arenhost-webenggano" -f ~/.ssh/id_ed25519 -N ""
     echo -e "\n\n=== COPY SSH KEY INI KE GITHUB DEPLOY KEYS ===\n"; cat ~/.ssh/id_ed25519.pub; echo "\n===================================================="
   fi
   # Test koneksi ke GitHub setelah deploy key di-install → pesan "successfully authenticated":
   # ssh -T git@github.com
   
   # CLONE REPO
   git clone -b main git@github.com:USERNAMEKAMU/web-enggano.git web-enggano
   ```
3. Setup public_html, vendor, env, migrate → **SAMA DENGAN OPSI A Step 6-7 diatas.**

---

### 🚀 OPSI C: AUTO-DEPLOY VIA GITHUB WEBHOOK (CI/CD OTOMATIS!)
Setiap kamu `git push origin main` di laptop → website hosting otomatis update sendiri tanpa login cPanel!

1. Deploy dulu via Opsi A atau B sampai website jalan normal
2. **Buat deploy script (server):**
   ```bash
   cd ~/web-enggano
   cat > deploy-hook.sh <<'EOF'
   #!/bin/bash
   set -e
   cd ~/web-enggano
   echo "===== Deploy Start: $(date) ====="
   
   # 1. Pull code terbaru
   echo "[1/6] Git Pull..."
   git pull origin main
   
   # 2. Update composer
   echo "[2/6] Composer Install..."
   composer install --no-dev --optimize-autoloader --no-interaction
   
   # 3. (Optional) Build assets - JIKA hosting RAM cukup! Kalau OOM → Build di LOKAL SAJA.
   # echo "[3/6] NPM Build..."
   # npm ci --omit=dev --no-audit --no-fund
   # npm run build
   
   # 4. Copy public assets ke public_html (karena kita pakai index.php manual bukan symlink)
   echo "[4/6] Sync Public Assets..."
   cp -f public/.htaccess ../public_html/.htaccess
   cp -f public/.user.ini ../public_html/.user.ini
   cp -rf public/build ../public_html/ 2>/dev/null || true
   cp -rf public/js ../public_html/ 2>/dev/null || true
   cp -rf public/css ../public_html/ 2>/dev/null || true
   cp -rf public/favicon.ico ../public_html/ 2>/dev/null || true
   cp -rf public/robots.txt ../public_html/ 2>/dev/null || true
   
   # 5. Laravel cache + migrate
   echo "[5/6] Laravel Optimize..."
   php artisan down --render="errors::503" || true
   php artisan optimize:clear -n
   php artisan config:cache -n
   php artisan route:cache -n
   php artisan view:cache -n
   echo "[5.1/6] Migrate DB..."
   php artisan migrate --force -n
   
   # 6. Finish
   php artisan up -n || true
   echo "===== ✅ Deploy Selesai: $(date) ====="
   EOF
   chmod +x deploy-hook.sh
   ```
3. **Buat Webhook endpoint di folder public (agar GitHub bisa POST kesini):**
   ```bash
   cat > ~/web-enggano/public/webhook-deploy.php <<'EOF'
   <?php
   // === PENGATURAN ===
   $SECRET = "GANTI_DENGAN_STRING_RANDOM_PANJANG_SEKALI_JANGAN_SIMPLE_123abc!@#WebEnggano2026";
   // ==================
   
   header("Content-Type: text/plain");
   http_response_code(200);
   
   // Security: Cek token via ?token=...
   if (!isset($_GET['token']) || hash_equals($SECRET, (string)$_GET['token']) === false) {
       http_response_code(403);
       die("403 Forbidden: Invalid token.");
   }
   
   // Jalankan deploy script secara async agar GitHub tidak menunggu timeout
   $logFile = __DIR__ . '/../storage/logs/deploy-' . date('Y-m-d') . '.log';
   $cmd = sprintf(
       'bash %s >> %s 2>&1 & echo $!',
       escapeshellarg(__DIR__ . '/../deploy-hook.sh'),
       escapeshellarg($logFile)
   );
   
   echo "🔔 Deploy Triggered at " . date('Y-m-d H:i:s') . "\n";
   echo "📜 Log file: storage/logs/deploy-" . date('Y-m-d') . ".log\n";
   echo "🆔 PID: " . trim(shell_exec($cmd)) . "\n";
   echo "✅ Done! Cek log beberapa saat lagi untuk progress.\n";
   EOF
   
   # Copy ke public_html (supaya accessible via internet):
   cp ~/web-enggano/public/webhook-deploy.php ~/public_html/webhook-deploy.php
   ```
4. **Register Webhook di GitHub:**
   - GitHub → Repo → Settings → Webhooks → **Add webhook**
   - Payload URL: `https://jelajahenggano.com/webhook-deploy.php?token=GANTI_STRING_RANDOM_KAMU` (GANTI TOKEN!)
   - Content type: `application/x-www-form-urlencoded`
   - Secret: (bisa dikosongkan karena kita pakai token URL)
   - Events: **Just the push event**
   - Active: ✅ → Add Webhook
5. **Test:** Lakukan 1 commit test → push ke main → cek tab Recent Deliveries di GitHub Webhook → response 200. Lihat log di MyHPanel File Manager: `web-enggano/storage/logs/deploy-TANGGAL.log`

---

## ⚠️ CATATAN GIT UNTUK SHARED HOSTING KECIL (1-2 GB RAM)

| Issue | Solusi Paling Work |
|-------|--------------------|
| `composer install` OOM (kehabisan RAM) | Jalankan `composer install --no-dev --optimize-autoloader` di **LAPTOP KAMU** → folder `vendor/` di-ADD & di-PUSH ke GitHub (hapus vendor dari `.gitignore`). Di hosting cuma `git pull` → skip composer install! |
| `npm run build` OOM / timeout | Build selalu di LOKAL (`npm run build`) → push folder `public/build/` ke git (hapus public/build dari .gitignore jika perlu). |
| Symlink `public_html` gagal (di blokir hosting) | Pakai cara **COPY index.php manual + cp -r public/* ke public_html** seperti Opsi A Step 6 diatas (cara ini 99% work). |
| `.env` hilang setiap git pull | BENAR! .env masuk `.gitignore` (TIDAK BOLEH di-push). Copy 1x saja saat setup awal, seterusnya git pull tidak akan overwrite. |

---

## 🆘 TROUBLESHOOTING UMUM ARENHOST

### ❌ ERROR 500 Internal Server Error (Paling umum!)
**Penyebab + Solusi:**
1. **Permission `storage/` salah:** Kembali ke Langkah 7, set 0755 recursive ke storage/ dan bootstrap/cache
2. **Path di `public_html/index.php` salah:** Kembali Langkah 6 File 1, pastikan $PROJECT_PATH = `__DIR__.'/../web-enggano'` (dan folder web-enggano BENAR-BENAR ada di `/home/usernamekamu/`)
3. **File `.env` format error:** Ada spasi di value tanpa tanda petik (contoh: `APP_NAME=Web Enggano` ← SALAH! Harus `APP_NAME="Web Enggano"`). Cek baris yang kamu edit di .env
4. **DB username/password salah:** Cek Langkah 3, pastikan DB_HOST=localhost, dan nama DB+USER + prefix username panel (bukan nama pendek yang kamu ketik!)
5. **Cara debug (temporary):** Ubah `.env` → `APP_DEBUG=true` untuk lihat error detailnya. Setelah selesai debug → BALIKKAN ke `APP_DEBUG=false`!
6. **Cek log error:** Buka File Manager → `/home/usernamekamu/web-enggano/storage/logs/laravel-TANGGAL.log` → lihat baris terakhir error message.

### ❌ "413 Content Too Large" upload file
- Langkah 2 (Select PHP Version) belum di-save → ulangi
- `public_html/.user.ini` tidak terupload / isinya kosong → reupload dari project
- Hosting limit maksimal lebih kecil dari 256M → chat support ArenHost

### ❌ Gambar / Storage tidak tampil (broken image)
1. Storage link gagal di Langkah 8 → Copy manual:
   - File Manager: Copy semua isi `/web-enggano/storage/app/public/` → Paste ke `/public_html/storage/` (buat folder storage baru jika belum ada)
2. Atau di `.env` coba set `FILESYSTEM_DISK=local` tapi kurang aman

### ❌ Session logout sendiri / CSRF Token Mismatch
1. Pastikan `.env` → `SESSION_DOMAIN=.jelajahenggano.com` (ada titik di depan!)
2. `SESSION_DRIVER=database`
3. Hapus semua file di `/web-enggano/storage/framework/sessions/`
4. Clear cache browser + cookies domain kamu

### ❌ Website tidak bisa dibuka / DNS_PROBE_FINISHED_NXDOMAIN
DNS masih propagate. Biasanya ArenHost internal cepat (10-30 menit), tapi bisa sampai 24 jam global:
1. Cek di https://dnschecker.org/?domain=jelajahenggano.com&type=A
2. Jika semua merah semua → nameserver salah / belum save
3. Jika sebagian kuning sebagian hijau → masih proses propagate, tunggu 1 jam coba lagi

### ❌ 404 Not Found semua halaman kecuali beranda
File `.htaccess` di `public_html/` tidak kebaca.
- Di MyHPanel → Advanced → Configure PHP / Apache Settings → pastikan **mod_rewrite = ON** (sudah default sih)
- Pastikan file `.htaccess` di public_html BUKAN file kosong. Lihat hidden files (File Manager Settings → Show hidden files dotfiles)

---

## 📧 ADA MASALAH? CONTACT PERSON:
1. **Masalah Domain / Nameserver / Billing:** Chat support ArenHost via menu Support → Open Ticket di Billing Panel
2. **Masalah Kode Laravel / 500 Error / Desain:** Periksa file `web-enggano/storage/logs/laravel-*.log` baris terakhir

---
**Versi Panduan**: 2.0 | **Khusus**: ArenHost/Liiqu user (domain+hosting 1 paket) | **Terakhir Update**: Juli 2026
