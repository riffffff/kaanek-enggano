<?php

namespace Tests\Feature;

use App\Models\KknLogItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\File;
use Tests\TestCase;

class ImportKknActivitiesTest extends TestCase
{
    use RefreshDatabase;

    public function test_import_command_creates_activities_from_json(): void
    {
        $path = storage_path('app/test-activities.json');
        File::put($path, json_encode([
            [
                'title' => 'Program Uji Impor Aktivitas',
                'category' => 'digitalisasi',
                'date' => '2026-07-01',
                'content' => "Paragraf pertama.\n\nParagraf kedua.",
                'is_highlighted' => true,
            ],
        ], JSON_UNESCAPED_UNICODE));

        $this->artisan('activities:import', ['path' => $path])
            ->assertSuccessful();

        $this->assertDatabaseHas('kkn_log_items', [
            'slug' => 'program-uji-impor-aktivitas',
            'category' => 'digitalisasi',
            'is_highlighted' => true,
        ]);

        File::delete($path);
    }
}
