<?php

namespace Database\Seeders;

use App\Models\Homestay;
use App\Models\Village;
use Illuminate\Database\Seeder;

class HomestaySeeder extends Seeder
{
    public function run(): void
    {
        $villageIds = Village::query()
            ->pluck('id', 'name');

        $homestays = [
            [
                'name' => 'Pondok Bundo',
                'owner' => 'Ibu Wati',
                'whatsapp_number' => '6281234567801',
                'facilities' => '2 Kamar Tidur, Kamar Mandi Dalam, Termasuk Makan 3x',
                'price_per_night' => 200000,
                'village_id' => $villageIds['Apoho'] ?? null,
            ],
            [
                'name' => 'Wisma Samudera',
                'owner' => 'Bapak Hasan',
                'whatsapp_number' => '6281234567802',
                'facilities' => '4 Kamar Tidur, Kamar Mandi Luar, Dekat Pesisir',
                'price_per_night' => 250000,
                'village_id' => $villageIds['Malakoni'] ?? null,
            ],
            [
                'name' => 'Rumah Singgah Kahyapu',
                'owner' => 'Ibu Maria',
                'whatsapp_number' => '6281234567803',
                'facilities' => '2 Kamar Tidur, Sarapan Lokal, Akses Pelabuhan Mudah',
                'price_per_night' => 180000,
                'village_id' => $villageIds['Kahyapu'] ?? null,
            ],
        ];

        foreach ($homestays as $homestay) {
            Homestay::query()->updateOrCreate(
                ['name' => $homestay['name']],
                $homestay
            );
        }
    }
}
