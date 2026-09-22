<?php

namespace Tests\Feature;

use App\Models\KknLogItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class KknLogTest extends TestCase
{
    use RefreshDatabase;

    public function test_activities_index_returns_successful_response(): void
    {
        KknLogItem::factory()->create([
            'title' => 'Test Log Item',
            'slug' => 'test-log-item',
            'category' => 'digitalisasi',
            'date' => '2026-06-24',
            'content' => 'Test content here.',
        ]);

        $this->get('/activities')->assertOk();
    }

    public function test_activities_index_paginates_and_respects_per_page(): void
    {
        KknLogItem::factory()->count(25)->create();

        $this->get('/activities?per_page=9')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->where('perPage', 9)
                ->has('items.data', 9)
                ->where('items.total', 25)
                ->where('items.last_page', 3)
            );

        $this->get('/activities?per_page=9&page=3')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->has('items.data', 7)
                ->where('items.current_page', 3)
            );
    }

    public function test_activities_show_returns_successful_response(): void
    {
        KknLogItem::factory()->create([
            'title' => 'Test Log Item',
            'slug' => 'test-log-item',
            'category' => 'digitalisasi',
            'date' => '2026-06-24',
            'content' => 'Test content here.',
        ]);

        $this->get('/activities/test-log-item')->assertOk();
    }
}
