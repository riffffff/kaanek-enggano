<?php

namespace Database\Seeders;

use App\Models\Umkm;
use App\Models\Village;
use Illuminate\Database\Seeder;

class UmkmSeeder extends Seeder
{
    public function run(): void
    {
        $villages = Village::query()->get();

        foreach ($villages as $village) {
            $entries = [
                [
                    'business_name' => "Produk Unggulan {$village->name}",
                    'owner_name' => "Pelaku Usaha {$village->name}",
                    'business_type' => 'Produk lokal',
                    'whatsapp_number' => '6281234567820',
                    'notes' => "Produk lokal dari Desa {$village->name} yang mewakili identitas ekonomi warga dan cocok ditampilkan sebagai katalog awal UMKM.",
                ],
                [
                    'business_name' => "Kerajinan {$village->name}",
                    'owner_name' => "Kelompok Warga {$village->name}",
                    'business_type' => 'Kerajinan',
                    'whatsapp_number' => '6281234567821',
                    'notes' => "Kerajinan tangan dan olahan khas warga {$village->name} yang dibuat dalam skala rumah tangga dan komunitas.",
                ],
            ];

            foreach ($entries as $entry) {
                Umkm::query()->updateOrCreate(
                    [
                        'village_id' => $village->id,
                        'business_name' => $entry['business_name'],
                    ],
                    $entry
                );
            }
        }
    }
}
