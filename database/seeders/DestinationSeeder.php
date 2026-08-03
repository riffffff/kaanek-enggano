<?php

namespace Database\Seeders;

use App\Models\Destination;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'Pulau Dua',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Pulau Dua.',
                    'Data ini sengaja dibuat dummy agar seed awal bisa langsung dipakai.',
                    'Nama lokasi mengikuti label yang terlihat pada peta publik.',
                ]),
                'type' => 'bahari',
                'difficulty_level' => 'sedang',
                'lat' => -5.3821000,
                'lng' => 102.3015000,
                'travel_time' => '±45 menit dari pusat Enggano',
                'access_note' => 'Akses laut dengan cuaca yang menentukan jadwal berangkat.',
            ],
            [
                'name' => 'Pulau Merbau',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Pulau Merbau.',
                    'Konten utama akan diisi setelah kurasi editorial selesai.',
                    'Saat ini data difokuskan untuk marker dan kartu destinasi.',
                ]),
                'type' => 'wildlife',
                'difficulty_level' => 'sedang',
                'lat' => -5.4183000,
                'lng' => 102.2874000,
                'travel_time' => '±50 menit dari pusat Enggano',
                'access_note' => 'Perlu perahu kecil dan kondisi air yang stabil.',
            ],
            [
                'name' => 'Pulau Bangkai',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Pulau Bangkai.',
                    'Informasi lanjutan mengenai daya tarik wisata akan dilengkapi kemudian.',
                    'Untuk sekarang, data ini dipakai sebagai sumber marker dan kartu destinasi.',
                ]),
                'type' => 'wildlife',
                'difficulty_level' => 'sedang',
                'lat' => -5.3448000,
                'lng' => 102.2712000,
                'travel_time' => '±1 jam dari pusat Enggano',
                'access_note' => 'Akses laut dan bergantung pada kondisi ombak.',
            ],
            [
                'name' => 'Ekowisata Mangrove Kahyapu',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Ekowisata Mangrove Kahyapu.',
                    'Teks ini sengaja dibuat dummy agar seed awal bisa langsung dipakai.',
                    'Setelah data final siap, deskripsi dapat diganti tanpa mengubah struktur peta.',
                ]),
                'type' => 'bahari',
                'difficulty_level' => 'mudah',
                'lat' => -5.3899000,
                'lng' => 102.2799000,
                'travel_time' => '±20 menit dari Kahyapu',
                'access_note' => 'Akses darat singkat lalu jalur papan/tepi mangrove.',
            ],
            [
                'name' => 'Pantai Podipo',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Pantai Podipo.',
                    'Data lokasi disiapkan mengikuti nama yang muncul pada peta publik.',
                    'Bagian isi akan dilengkapi setelah foto dan narasi final tersedia.',
                ]),
                'type' => 'bahari',
                'difficulty_level' => 'mudah',
                'lat' => -5.4446000,
                'lng' => 102.3397000,
                'travel_time' => '±35 menit dari pusat Enggano',
                'access_note' => 'Akses darat lalu berjalan pendek ke bibir pantai.',
            ],
            [
                'name' => 'Titik 6',
                'description' => implode("\n\n", [
                    'Deskripsi sementara untuk Titik 6.',
                    'Nama ini mengikuti label yang terlihat di peta publik.',
                    'Jika nama final tersedia, data dapat diperbarui tanpa mengubah struktur aplikasi.',
                ]),
                'type' => 'history',
                'difficulty_level' => 'mudah',
                'lat' => -5.3712000,
                'lng' => 102.3238000,
                'travel_time' => '±25 menit dari pusat Enggano',
                'access_note' => 'Akses darat biasa dengan kendaraan lokal.',
            ],
        ];

        foreach ($destinations as $destinationData) {
            Destination::query()->updateOrCreate(
                ['name' => $destinationData['name']],
                [
                    'name' => $destinationData['name'],
                    'description' => $destinationData['description'],
                    'type' => $destinationData['type'],
                    'difficulty_level' => $destinationData['difficulty_level'],
                    'travel_time' => $destinationData['travel_time'],
                    'access_note' => $destinationData['access_note'],
                    'slug' => Str::slug($destinationData['name']),
                    'lat' => $destinationData['lat'],
                    'lng' => $destinationData['lng'],
                    'local_guide_id' => null,
                ]
            );
        }
    }
}

