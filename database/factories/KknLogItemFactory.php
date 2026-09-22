<?php

namespace Database\Factories;

use App\Models\KknLogItem;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<KknLogItem>
 */
class KknLogItemFactory extends Factory
{
    protected $model = KknLogItem::class;

    public function definition(): array
    {
        $title = fake()->unique()->sentence(6);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numerify('###'),
            'category' => fake()->randomElement(['ekonomi', 'kesehatan', 'digitalisasi', 'lingkungan']),
            'date' => fake()->date(),
            'content' => fake()->paragraphs(3, true),
            'is_highlighted' => false,
        ];
    }
}
