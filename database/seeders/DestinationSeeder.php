<?php

namespace Database\Seeders;

use App\Models\Destination;
use App\Models\LocalGuide;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DestinationSeeder extends Seeder
{
    public function run(): void
    {
        $guides = LocalGuide::query()->get()->keyBy('name');

        $destinations = [
            [
                'name' => 'Pantai Kioyo',
                'description' => implode("\n\n", [
                    'Pantai Kioyo berada di salah satu tepian paling tenang Enggano, menghadirkan garis pantai yang terasa terpencil namun memikat sejak langkah pertama.',
                    'Perjalanan menuju lokasi ini menjadi bagian dari pengalaman, dengan lanskap vegetasi tropis, udara asin, dan bukaan pandang ke Samudera Hindia.',
                    'Air yang relatif jernih, batu karang, dan ritme ombak yang kontras dengan sunyinya area sekitar menjadikan Kioyo cocok untuk kunjungan yang lebih kontemplatif.',
                ]),
                'type' => 'bahari',
                'difficulty_level' => 'sedang',
                'lat' => -5.3903,
                'lng' => 102.2336,
                'local_guide' => 'Guide Bahari Enggano',
            ],
            [
                'name' => 'Hutan Endemik Enggano',
                'description' => implode("\n\n", [
                    'Kawasan hutan Enggano memperlihatkan wajah pulau yang lebih teduh, liar, dan rapat oleh lapisan vegetasi endemik.',
                    'Rute masuknya menghadirkan pengalaman observasi alam yang pelan, cocok untuk membaca lanskap, satwa, dan ritme ekologis setempat.',
                    'Destinasi ini menekankan pengalaman berjalan, mengamati, dan memahami pulau melalui karakter hutan yang masih kuat.',
                ]),
                'type' => 'wildlife',
                'difficulty_level' => 'sedang',
                'lat' => -5.3648,
                'lng' => 102.2612,
                'local_guide' => 'Guide Jelajah Hutan',
            ],
            [
                'name' => 'Jejak Budaya Enggano',
                'description' => implode("\n\n", [
                    'Jejak Budaya Enggano membawa pengunjung membaca pulau melalui cerita warga, ruang kampung, dan warisan enam suku yang masih hadir dalam keseharian.',
                    'Alih-alih sekadar melihat artefak, pengalaman di destinasi ini lebih dekat dengan narasi, pengetahuan lisan, dan struktur sosial desa.',
                    'Ia cocok untuk perjalanan yang lebih reflektif, terutama bagi pengunjung yang ingin memahami identitas Enggano di balik pemandangannya.',
                ]),
                'type' => 'history',
                'difficulty_level' => 'mudah',
                'lat' => -5.4001,
                'lng' => 102.2822,
                'local_guide' => 'Guide Jelajah Hutan',
            ],
        ];

        foreach ($destinations as $destination) {
            Destination::query()->updateOrCreate(
                ['name' => $destination['name']],
                [
                    'name' => $destination['name'],
                    'description' => $destination['description'],
                    'type' => $destination['type'],
                    'difficulty_level' => $destination['difficulty_level'],
                    'slug' => Str::slug($destination['name']),
                    'lat' => $destination['lat'],
                    'lng' => $destination['lng'],
                    'local_guide_id' => $guides[$destination['local_guide']]?->id,
                ]
            );
        }
    }
}
