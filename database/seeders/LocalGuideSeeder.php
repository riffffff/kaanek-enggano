<?php

namespace Database\Seeders;

use App\Models\LocalGuide;
use Illuminate\Database\Seeder;

class LocalGuideSeeder extends Seeder
{
    public function run(): void
    {
        $guides = [
            [
                'name' => 'Guide Bahari Enggano',
                'whatsapp_number' => '6281234567890',
            ],
            [
                'name' => 'Guide Jelajah Hutan',
                'whatsapp_number' => '6281234567891',
            ],
        ];

        foreach ($guides as $guide) {
            LocalGuide::query()->updateOrCreate(
                ['name' => $guide['name']],
                $guide
            );
        }
    }
}
