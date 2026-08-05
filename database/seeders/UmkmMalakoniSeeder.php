<?php

namespace Database\Seeders;

use App\Models\Umkm;
use App\Models\Village;
use Illuminate\Database\Seeder;

class UmkmMalakoniSeeder extends Seeder
{
    public function run(): void
    {
        $malakoni = Village::query()->where('name', 'Malakoni')->first();

        if ($malakoni) {
            $malakoniUmkms = [
                ['business_name' => 'Insan Berkah', 'owner_name' => 'Ira', 'business_type' => 'Makanan Olahan', 'notes' => 'Menjual Pisang Sale dan Kripik Pisang. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.366825, 'lng' => 102.319150],
                ['business_name' => 'Bedil Meubel', 'owner_name' => 'Junaidi', 'business_type' => 'Meubel', 'notes' => 'Usaha meubel dan perabotan kayu, berdiri sejak 2022. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.365594, 'lng' => 102.315153],
                ['business_name' => 'Warung Bude Sayur', 'owner_name' => 'Tri Asih', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Menjual sayur, lotek, dan cendol. Berdiri sejak 2023. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.366618, 'lng' => 102.315096],
                ['business_name' => 'Warung Vina', 'owner_name' => 'Priyan Saputra', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2019. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.367018, 'lng' => 102.319113],
                ['business_name' => 'Warung Bude Pirang', 'owner_name' => 'Nur', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2024. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.366074, 'lng' => 102.319045],
                ['business_name' => 'Warung Mak Trik', 'owner_name' => 'Miyati', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2017. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => null, 'lng' => null],
                ['business_name' => 'Mie Ayam Bakso 2 Saudara', 'owner_name' => 'Siti', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Menjual mie ayam dan bakso. Berdiri sejak 2019. Lokasi: Dusun 3.', 'whatsapp_number' => null, 'lat' => -5.364259, 'lng' => 102.321358],
                ['business_name' => 'Mak Rena', 'owner_name' => 'Sriastato', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2021. Lokasi: Dusun 2.', 'whatsapp_number' => null, 'lat' => -5.360565, 'lng' => 102.289987],
                ['business_name' => 'Warung Bu Najum', 'owner_name' => 'Najum', 'business_type' => 'Toko Kelontong', 'notes' => 'Warung kelontong warga, berdiri sejak 2021. Lokasi: Dusun 2.', 'whatsapp_number' => null, 'lat' => -5.360507, 'lng' => 102.289450],
                ['business_name' => 'Emping Malakoni', 'owner_name' => '-', 'business_type' => 'Makanan Olahan', 'notes' => 'Usaha makanan olahan emping.', 'whatsapp_number' => null, 'lat' => -5.347970, 'lng' => 102.274254],
                ['business_name' => 'Martabak Bangka Pak Tri', 'owner_name' => 'Pak Tri', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Penjual martabak bangka.', 'whatsapp_number' => null, 'lat' => -5.364601, 'lng' => 102.321578],
                ['business_name' => 'Mie Ayam dan Bakso Rehan', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung mie ayam dan bakso.', 'whatsapp_number' => null, 'lat' => -5.348830, 'lng' => 102.273223],
                ['business_name' => 'Pangkas Rambut', 'owner_name' => '-', 'business_type' => 'Jasa', 'notes' => 'Layanan pangkas rambut.', 'whatsapp_number' => null, 'lat' => -5.366166, 'lng' => 102.319205],
                ['business_name' => 'Rumah Makan Arifi', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Rumah makan.', 'whatsapp_number' => null, 'lat' => -5.347871, 'lng' => 102.274784],
                ['business_name' => 'Somay & Tekwan Mak Nefa', 'owner_name' => 'Mak Nefa', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Penjual siomay dan tekwan.', 'whatsapp_number' => null, 'lat' => -5.349065, 'lng' => 102.274211],
                ['business_name' => 'Toko Citra mandiri', 'owner_name' => '-', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong.', 'whatsapp_number' => null, 'lat' => -5.364330, 'lng' => 102.321544],
                ['business_name' => 'Toko Puji', 'owner_name' => 'Puji', 'business_type' => 'Toko Kelontong', 'notes' => 'Toko kelontong.', 'whatsapp_number' => null, 'lat' => -5.365530, 'lng' => 102.319234],
                ['business_name' => 'Warung Ibu Aline', 'owner_name' => 'Ibu Aline', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.366651, 'lng' => 102.319151],
                ['business_name' => 'Warung Mak Yola', 'owner_name' => 'Mak Yola', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.348095, 'lng' => 102.274732],
                ['business_name' => 'Warung Makan Al-Farizqi', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makan.', 'whatsapp_number' => null, 'lat' => -5.347319, 'lng' => 102.275179],
                ['business_name' => 'Warung Makan Mak Nabila', 'owner_name' => 'Mak Nabila', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makan.', 'whatsapp_number' => null, 'lat' => -5.348901, 'lng' => 102.273636],
                ['business_name' => 'Warung Pak Herlin', 'owner_name' => 'Pak Herlin', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.347109, 'lng' => 102.275401],
                ['business_name' => 'Warung Sudi Mampir', 'owner_name' => '-', 'business_type' => 'Usaha Makanan dan Minuman', 'notes' => 'Warung makanan dan minuman.', 'whatsapp_number' => null, 'lat' => -5.348440, 'lng' => 102.274529],
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
