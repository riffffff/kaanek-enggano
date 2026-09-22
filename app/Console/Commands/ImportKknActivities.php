<?php

namespace App\Console\Commands;

use App\Models\KknLogItem;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ImportKknActivities extends Command
{
    protected $signature = 'activities:import
                            {path? : Path to JSON file (default: database/data/kkn-activities.json)}
                            {--dry-run : Parse and report without writing to the database}';

    protected $description = 'Import KKN activities from a JSON file (title, category, date, content)';

    public function handle(): int
    {
        $path = $this->argument('path') ?: database_path('data/kkn-activities.json');

        if (! File::exists($path)) {
            $this->error("File not found: {$path}");

            return self::FAILURE;
        }

        $items = json_decode(File::get($path), true);

        if (! is_array($items)) {
            $this->error('JSON must be an array of activity objects.');

            return self::FAILURE;
        }

        $allowed = ['ekonomi', 'kesehatan', 'digitalisasi', 'lingkungan'];
        $created = 0;
        $updated = 0;
        $skipped = 0;

        foreach ($items as $index => $item) {
            $title = trim((string) ($item['title'] ?? ''));
            $category = trim((string) ($item['category'] ?? ''));
            $content = trim((string) ($item['content'] ?? ''));
            $date = $item['date'] ?? null;

            if ($title === '' || $content === '' || ! in_array($category, $allowed, true) || empty($date)) {
                $skipped++;
                $this->warn('Skip row '.($index + 1).': missing title/content/date or invalid category.');

                continue;
            }

            $slug = Str::slug($title);
            $payload = [
                'title' => $title,
                'slug' => $slug,
                'category' => $category,
                'date' => $date,
                'content' => $content,
                'is_highlighted' => (bool) ($item['is_highlighted'] ?? false),
            ];

            if ($this->option('dry-run')) {
                $this->line("[dry-run] {$slug}");
                $created++;

                continue;
            }

            $existing = KknLogItem::query()->where('slug', $slug)->first();

            KknLogItem::query()->updateOrCreate(
                ['slug' => $slug],
                $payload
            );

            if ($existing) {
                $updated++;
            } else {
                $created++;
            }
        }

        $this->info("Created: {$created} · Updated: {$updated} · Skipped: {$skipped}");

        return self::SUCCESS;
    }
}
