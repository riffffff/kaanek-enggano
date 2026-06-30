# Backend Rules — Laravel 12
alwaysApply: false
description: Aturan spesifik untuk pekerjaan backend — migrations, models, controllers, Filament, seeders

## Kapan file ini relevan
Aktifkan rule ini saat mengerjakan file di: `app/`, `database/`, `routes/web.php`

---

## Migration

Urutan wajib (karena foreign key):
```
1. create_villages_table
2. create_local_guides_table
3. create_destinations_table
4. create_homestays_table
5. create_kkn_log_items_table
6. create_ship_schedules_table
7. create_umkms_table
```

Wajib ada di `umkms` migration:
```php
$table->foreignId('village_id')->constrained('villages')->cascadeOnDelete();
```

Wajib ada di `ship_schedules` migration:
```php
$table->string('ticket_link')->nullable();
$table->string('agent_whatsapp_number', 20)->nullable();
```

Jangan lupa tambahkan kolom `role` ke `users` table:
```php
$table->string('role')->default('editor');
```

---

## Model Checklist

Setiap model yang punya photos harus punya:
```php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class ModelName extends Model implements HasMedia {
    use InteractsWithMedia;

    public function registerMediaCollections(): void {
        $this->addMediaCollection('photos')->useDisk('public');
    }
}
```

Model dengan slug (`Village`, `Destination`, `KknLogItem`) harus pakai:
```php
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

public function getSlugOptions(): SlugOptions {
    return SlugOptions::create()
        ->generateSlugsFrom('name')
        ->saveSlugsTo('slug')
        ->generateSlugsOnlyOnCreate(); // WAJIB — jangan slug berubah setelah create
}
```

---

## Controller Pattern

```php
// Selalu return Inertia::render(), bukan view()
// Selalu load relasi yang dibutuhkan frontend via with() atau withCount()
// Jangan ada logic di controller, cukup query + return

public function show(string $slug) {
    $village = Village::where('slug', $slug)
        ->with(['umkms.media'])
        ->withMedia()
        ->firstOrFail();

    return Inertia::render('Village/Show', [
        'village' => $village,
        'prev' => Village::where('id', '<', $village->id)->latest('id')->first(['name', 'slug']),
        'next' => Village::where('id', '>', $village->id)->oldest('id')->first(['name', 'slug']),
    ]);
}
```

---

## Filament Resource Pattern

### Navigation group wajib diset:
```php
protected static ?string $navigationGroup = 'Konten Utama'; // atau 'Operasional'
```

### Group yang disarankan:
- **Konten Utama**: Destination, Village, KKN Log
- **Operasional**: Ship Schedule, Homestay, UMKM, Local Guide

### Form field untuk rich text (Village, KknLogItem):
```php
Forms\Components\RichEditor::make('history')
    ->toolbarButtons(['bold', 'italic', 'link', 'bulletList', 'orderedList', 'h2', 'h3'])
    ->columnSpanFull(),
```

### Form field untuk JSON days (ShipSchedule):
```php
Forms\Components\CheckboxList::make('days')
    ->options([
        'senin' => 'Senin', 'selasa' => 'Selasa', 'rabu' => 'Rabu',
        'kamis' => 'Kamis', 'jumat' => "Jum'at", 'sabtu' => 'Sabtu', 'minggu' => 'Minggu',
    ])
    ->columns(4),
```

### Upload photos di Filament:
```php
Forms\Components\SpatieMediaLibraryFileUpload::make('photos')
    ->collection('photos')
    ->multiple()
    ->reorderable()
    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
    ->maxSize(5120), // 5MB
```

---

## Seeder

`VillageSeeder` — 6 desa ini yang dipakai, name harus persis:
```php
$villages = [
    ['name' => 'Enggano',  'tribe' => 'Kauno'],
    ['name' => 'Kahyapu',  'tribe' => 'Kaahua'],
    ['name' => 'Kaana',    'tribe' => 'Kaana'],
    ['name' => 'Meok',     'tribe' => 'Meok'],
    ['name' => 'Apoho',    'tribe' => 'Apoho'],
    ['name' => 'Malakoni', 'tribe' => 'Malakoni'],
];
```

`UserSeeder` — buat 2 user:
```php
// Admin — akses semua resource
// Editor — hanya: ShipSchedule, KknLogItem, Homestay, Umkm
```
