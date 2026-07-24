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
                'image_url' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
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
                'image_url' => 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
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
                'image_url' => 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
            ],
        ];

        foreach ($destinations as $destinationData) {
            $imageUrl = $destinationData['image_url'];
            unset($destinationData['image_url']);

            $dest = Destination::query()->updateOrCreate(
                ['name' => $destinationData['name']],
                [
                    'name' => $destinationData['name'],
                    'description' => $destinationData['description'],
                    'type' => $destinationData['type'],
                    'difficulty_level' => $destinationData['difficulty_level'],
                    'slug' => Str::slug($destinationData['name']),
                    'lat' => $destinationData['lat'],
                    'lng' => $destinationData['lng'],
                    'local_guide_id' => $guides[$destinationData['local_guide']]?->id ?? null,
                ]
            );

            if ($dest->getMedia('photos')->isEmpty() && $dest->getMedia('background')->isEmpty()) {
                try {
                    $dest->addMediaFromUrl($imageUrl)
                        ->toMediaCollection('photos');
                } catch (\Throwable $e) {
                    // Fallback silently if offline or blocked
                }
            }
        }
    }
}

