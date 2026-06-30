# Git Commit Message Rules
scene: git_message
alwaysApply: true

## Format

```
<type>(<scope>): <description singkat dalam bahasa Indonesia>
```

## Type yang digunakan

| Type | Kapan dipakai |
|---|---|
| `feat` | Fitur baru (model, komponen, halaman, resource) |
| `fix` | Perbaikan bug |
| `chore` | Setup, config, dependency, deploy |
| `style` | Perubahan styling/CSS saja, tanpa logic |
| `refactor` | Refactor kode tanpa ubah behavior |
| `docs` | Perubahan dokumentasi saja |
| `seed` | Perubahan seeder atau data dummy |

## Scope yang digunakan

`backend`, `frontend`, `filament`, `migration`, `model`, `controller`, `component`, `page`, `deploy`, `config`

## Contoh

```
feat(model): tambah model Umkm dengan relasi ke Village
feat(migration): tambah kolom ticket_link dan agent_whatsapp_number ke ship_schedules
feat(filament): tambah UmkmResource dengan filter by desa
feat(component): buat UmkmCard dengan tombol WA pre-filled
feat(page): halaman Village/Show dengan section UMKM conditional
fix(frontend): perbaiki video hero iOS — tambah atribut playsInline
chore(deploy): setup Nginx config dan SSL Certbot
seed: tambah VillageSeeder dengan 6 desa Enggano
```

## Aturan
- Deskripsi dalam **bahasa Indonesia**
- Maksimal 72 karakter per baris
- Tidak perlu titik di akhir description
- Jangan tulis "update file X" — tulis apa yang berubah secara fungsional
