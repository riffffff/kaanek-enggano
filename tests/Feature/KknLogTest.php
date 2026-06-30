<?php

namespace Tests\Feature;

use App\Models\KknLogItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KknLogTest extends TestCase
{
    use RefreshDatabase;

    public function test_kkn_log_index_returns_successful_response(): void
    {
        KknLogItem::factory()->create([
            'title' => 'Test Log Item',
            'slug' => 'test-log-item',
            'category' => 'digitalisasi',
            'date' => '2026-06-24',
            'content' => 'Test content here.',
        ]);

        $response = $this->get('/kkn-log');
        $response->assertStatus(200);
    }

    public function test_kkn_log_show_returns_successful_response(): void
    {
        $item = KknLogItem::factory()->create([
            'title' => 'Test Log Item',
            'slug' => 'test-log-item',
            'category' => 'digitalisasi',
            'date' => '2026-06-24',
            'content' => 'Test content here.',
        ]);

        $response = $this->get('/kkn-log/test-log-item');
        $response->assertStatus(200);
    }
}
