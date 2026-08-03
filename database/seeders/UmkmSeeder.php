<?php

namespace Database\Seeders;

use App\Models\Umkm;
use App\Models\Village;
use Illuminate\Database\Seeder;

class UmkmSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seeder Desa Kahyapu
        $kahyapu = Village::query()->where('name', 'Kahyapu')->first();

        if ($kahyapu) {
            $kahyapuUmkms = [
                ['business_name' => 'Lotek Ibu Idem', 'owner_name' => 'Ibu Idem', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Usaha makanan khas Enggano.', 'whatsapp_number' => null, 'lat' => -5.420604, 'lng' => 102.369949],
                ['business_name' => 'Warung Mak Tiani', 'owner_name' => 'Mak Tiani', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong sehari-hari.', 'whatsapp_number' => null, 'lat' => -5.420703674583053, 'lng' => 102.37076145552139],
                ['business_name' => 'Warung Ibu Oswarida', 'owner_name' => 'Ibu Oswarida', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.421665, 'lng' => 102.372031],
                ['business_name' => 'Dara Cell', 'owner_name' => '-', 'business_type' => 'Konter', 'notes' => 'Layanan konter pulsa dan aksesoris.', 'whatsapp_number' => null, 'lat' => -5.421665, 'lng' => 102.372031],
                ['business_name' => 'Warung Makan Mama Ella', 'owner_name' => 'Mama Ella', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makan dengan menu sehari-hari.', 'whatsapp_number' => null, 'lat' => -5.426185, 'lng' => 102.373527],
                ['business_name' => 'Warung Ibu Hartini', 'owner_name' => 'Ibu Hartini', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.427045370102447, 'lng' => 102.37785193085965],
                ['business_name' => 'Warung Aannisa', 'owner_name' => 'Aannisa', 'business_type' => 'Pengepul Ikan', 'notes' => 'Tempat pengepul ikan hasil tangkapan nelayan.', 'whatsapp_number' => null, 'lat' => -5.422129648621664, 'lng' => 102.37284999973639],
                ['business_name' => 'Warung Nikma', 'owner_name' => 'Nikma', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong warga.', 'whatsapp_number' => null, 'lat' => -5.412296478494264, 'lng' => 102.3670165613824],
                ['business_name' => 'Warung 2JR', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.413968989420357, 'lng' => 102.3681053559645],
                ['business_name' => 'Toko Ira', 'owner_name' => 'Ira', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong warga.', 'whatsapp_number' => null, 'lat' => -5.4195869907724115, 'lng' => 102.35726710343954],
                ['business_name' => 'Warung Mufik', 'owner_name' => 'Mufik', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong warga.', 'whatsapp_number' => null, 'lat' => -5.416432183259255, 'lng' => 102.35652110185478],
                ['business_name' => 'GeeMby', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.415985340469418, 'lng' => 102.369471644182],
                ['business_name' => 'Wahid Snack', 'owner_name' => 'Wahid', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong dan snack.', 'whatsapp_number' => null, 'lat' => -5.416737616761935, 'lng' => 102.37054974603679],
                ['business_name' => 'Toko Intan', 'owner_name' => 'Intan', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong warga.', 'whatsapp_number' => null, 'lat' => -5.420542556468931, 'lng' => 102.36953179086224],
                ['business_name' => 'Wafa Ponsel dan Fotocopy', 'owner_name' => 'Wafa', 'business_type' => 'Konter', 'notes' => 'Layanan fotocopy, pulsa, dan kebutuhan ponsel.', 'whatsapp_number' => null, 'lat' => -5.416135706182796, 'lng' => 102.36867921382407],
            ];

            foreach ($kahyapuUmkms as $entry) {
                Umkm::query()->updateOrCreate(
                    [
                        'village_id' => $kahyapu->id,
                        'business_name' => $entry['business_name'],
                    ],
                    $entry
                );
            }

            $this->command->info('UMKM Desa Kahyapu berhasil di-seed.');
        }

        // 2. Seeder Desa Malakoni
        $malakoni = Village::query()->where('name', 'Malakoni')->first();

        if ($malakoni) {
            $malakoniUmkms = [
                ['business_name' => 'Insan Berkah', 'owner_name' => 'Ira', 'business_type' => 'Makanan Olahan', 'notes' => 'Menjual Pisang Sale dan Kripik Pisang. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Bedil Meubel', 'owner_name' => 'Junaidi', 'business_type' => 'Meubel', 'notes' => 'Usaha meubel dan perabotan kayu, berdiri sejak 2022. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Warung Bude Sayur', 'owner_name' => 'Tri Asih', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Menjual sayur, lotek, dan cendol. Berdiri sejak 2023. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Warung Vina', 'owner_name' => 'Priyan Saputra', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2019. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Warung Bude Pirang', 'owner_name' => 'Nur', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2024. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Warung Mak Trik', 'owner_name' => 'Miyati', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2017. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Mie Ayam Bakso 2 Saudara', 'owner_name' => 'Siti', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Menjual mie ayam dan bakso. Berdiri sejak 2019. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Mak Rena', 'owner_name' => 'Sriastato', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2021. Lokasi: Dusun 2.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Warung Bu Najum', 'owner_name' => 'Najum', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2021. Lokasi: Dusun 2.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
            ];

            foreach ($malakoniUmkms as $entry) {
                Umkm::query()->updateOrCreate(
                    [
                        'village_id' => $malakoni->id,
                        'business_name' => $entry['business_name'],
                    ],
                    $entry
                );
            }

            $this->command->info('UMKM Desa Malakoni berhasil di-seed.');
        }
    }
}
