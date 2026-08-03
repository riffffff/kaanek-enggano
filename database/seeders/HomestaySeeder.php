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
                'name' => 'Samudera Enggano',
                'owner' => 'Pak Nasir',
                'whatsapp_number' => '6285268668611',
                'facilities' => 'Isi disini ya al',
                'price_per_night' => 200000,
                'village_id' => $villageIds['Apoho'] ?? null,
            ],
            [
                'name' => 'Hotel Berlian',
                'owner' => 'Pak Bambang',
                'whatsapp_number' => '6282177796666',
                'facilities' => 'Isi disini ya al',
                'price_per_night' => 250000,
                'village_id' => $villageIds['Kahyapu'] ?? null,
            ],
            [
                'name' => 'La Reina',
                'owner' => '-',
                'whatsapp_number' => '-',
                'facilities' => 'Isi disini ya al',
                'price_per_night' => 180000,
                'village_id' => $villageIds['Malakoni'] ?? null,
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
