<?php

namespace Database\Seeders;

use App\Models\ShipSchedule;
use Illuminate\Database\Seeder;

class ShipScheduleSeeder extends Seeder
{
    public function run(): void
    {
        $schedules = [
            [
                'type' => 'kapal_perintis',
                'route' => 'Bengkulu <-> Enggano',
                'days' => ['senin', 'kamis'],
                'departure_time' => '16:00',
                'estimated_price' => 60000,
                'ticket_link' => 'https://pelni.co.id',
                'agent_whatsapp_number' => '6281234567810',
                'is_active' => true,
            ],
            [
                'type' => 'ferry_asdp',
                'route' => 'Bengkulu <-> Enggano',
                'days' => ['selasa', 'jumat'],
                'departure_time' => '17:00',
                'estimated_price' => 75000,
                'ticket_link' => 'https://ferizy.com',
                'agent_whatsapp_number' => '6281234567810',
                'is_active' => true,
            ],
            [
                'type' => 'susi_air',
                'route' => 'Bengkulu <-> Enggano',
                'days' => ['selasa', 'kamis'],
                'departure_time' => '08:00',
                'estimated_price' => 300000,
                'ticket_link' => 'https://susiair.com',
                'agent_whatsapp_number' => '6281234567811',
                'is_active' => true,
            ],
        ];

        foreach ($schedules as $schedule) {
            ShipSchedule::query()->updateOrCreate(
                ['type' => $schedule['type']],
                $schedule
            );
        }
    }
}

