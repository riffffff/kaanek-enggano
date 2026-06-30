<?php

namespace Database\Seeders;

use App\Models\KknLogItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KknLogItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'title' => 'Pendataan Awal Potensi Desa Enggano',
                'category' => 'digitalisasi',
                'date' => now()->subDays(7)->toDateString(),
                'content' => implode("\n\n", [
                    'Tim KKN memulai pengumpulan data dasar untuk website Enggano dengan fokus pada struktur informasi publik yang paling dibutuhkan warga dan calon pengunjung.',
                    'Pendataan dilakukan melalui diskusi dengan perangkat desa, observasi lapangan, serta penyusunan kebutuhan konten yang dapat dipublikasikan bertahap.',
                    'Langkah awal ini menjadi fondasi penting agar pengembangan platform digital tetap dekat dengan kebutuhan nyata di pulau.',
                ]),
            ],
            [
                'title' => 'Diskusi UMKM dan Homestay Warga',
                'category' => 'ekonomi',
                'date' => now()->subDays(5)->toDateString(),
                'content' => implode("\n\n", [
                    'Pendataan pelaku usaha dan penginapan lokal dilakukan bersama perangkat desa untuk memetakan potensi ekonomi yang siap ditampilkan ke publik.',
                    'Percakapan dengan warga memperlihatkan bahwa kebutuhan utama bukan hanya promosi, tetapi juga penyajian informasi yang jelas dan mudah dihubungi.',
                    'Dari sini, tim mulai menyusun direktori awal homestay dan UMKM sebagai pintu masuk katalog digital desa.',
                ]),
            ],
            [
                'title' => 'Pemetaan Informasi Perjalanan ke Enggano',
                'category' => 'lingkungan',
                'date' => now()->subDays(3)->toDateString(),
                'content' => implode("\n\n", [
                    'Jadwal transportasi, pola kedatangan, dan kebutuhan dasar wisatawan mulai dipetakan untuk merapikan informasi perjalanan ke Enggano.',
                    'Tim mencatat bahwa informasi publik seputar kapal, penerbangan, dan kesiapan akomodasi sering tersebar dan tidak selalu mudah diverifikasi.',
                    'Karena itu, halaman perjalanan dirancang sebagai survival guide yang ringkas, visual, dan mudah dipahami oleh pengunjung baru.',
                ]),
            ],
        ];

        foreach ($items as $item) {
            $slug = Str::slug($item['title']);

            KknLogItem::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    ...$item,
                    'slug' => $slug,
                ]
            );
        }
    }
}
