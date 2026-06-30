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
                'type' => 'ferry',
                'route' => 'Bengkulu -> Enggano',
                'days' => ['selasa', 'jumat'],
                'departure_time' => '17:00',
                'estimated_price' => 65000,
                'ticket_link' => null,
                'agent_whatsapp_number' => '6281234567810',
                'is_active' => true,
            ],
            [
                'type' => 'ferry',
                'route' => 'Enggano -> Bengkulu',
                'days' => ['rabu', 'sabtu'],
                'departure_time' => '17:00',
                'estimated_price' => 65000,
                'ticket_link' => null,
                'agent_whatsapp_number' => '6281234567810',
                'is_active' => true,
            ],
            [
                'type' => 'susi_air',
                'route' => 'Bengkulu -> Enggano',
                'days' => ['selasa', 'kamis'],
                'departure_time' => '08:00',
                'estimated_price' => 300000,
                'ticket_link' => 'https://example.com/tiket-enggano',
                'agent_whatsapp_number' => '6281234567811',
                'is_active' => true,
            ],
            [
                'type' => 'susi_air',
                'route' => 'Enggano -> Bengkulu',
                'days' => ['selasa', 'kamis'],
                'departure_time' => '09:15',
                'estimated_price' => 300000,
                'ticket_link' => 'https://example.com/tiket-enggano',
                'agent_whatsapp_number' => '6281234567811',
                'is_active' => true,
            ],
        ];

        foreach ($schedules as $schedule) {
            ShipSchedule::query()->updateOrCreate(
                ['type' => $schedule['type'], 'route' => $schedule['route']],
                $schedule
            );
        }
    }
}
