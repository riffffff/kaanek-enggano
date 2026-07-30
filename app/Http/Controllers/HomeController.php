<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\KknLogItem;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private function excerptFromDescription(?string $description, int $limit = 120): string
    {
        $line = trim((string) str($description ?? '')->before("\n"));

        if ($line === '') {
            return '';
        }

        return str($line)->limit($limit, '...')->toString();
    }

    public function index(): Response
    {
        $destinations = Destination::query()
            ->with('media')
            ->orderBy('name')
            ->take(5)
            ->get()
            ->map(function (Destination $dest) {
                $backgroundImage = $dest->getFirstMedia('background');
                $firstPhoto = $dest->getFirstMedia('photos');

                $coverMedia = $backgroundImage ?: $firstPhoto;

                $coverUrl = null;
                $heroUrl = null;
                if ($coverMedia) {
                    $coverUrl = $coverMedia->hasGeneratedConversion('medium')
                        ? $coverMedia->getUrl('medium')
                        : $coverMedia->getUrl();
                    $heroUrl = $coverMedia->getUrl();
                }

                $fallbackHero = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80';
                $fallbackCard = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';

                $tagLabel = $dest->type ? strtoupper((string) $dest->type) : 'DESTINASI';
                $shortDesc = $this->excerptFromDescription($dest->description, 110);
                if ($shortDesc === '') {
                    $shortDesc = 'Jelajahi keindahan alam dan kebudayaan Pulau Enggano yang masih perawan.';
                }

                return [
                    'id' => $dest->id,
                    'name' => $dest->name,
                    'slug' => $dest->slug,
                    'type' => $dest->type,
                    'tag' => $tagLabel,
                    'short_description' => $shortDesc,
                    'description' => $shortDesc,
                    'hero' => $heroUrl ?: $fallbackHero,
                    'cover' => $coverUrl ?: $fallbackCard,
                    'cover_thumb' => $coverUrl ?: $fallbackCard,
                    'image' => $heroUrl ?: $fallbackCard,
                ];
            });

        return Inertia::render('Home/Index', [
            'latestKkn' => KknLogItem::query()
                ->latest('date')
                ->take(3)
                ->get()
                ->map(fn (KknLogItem $item) => [
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'category' => $item->category,
                    'date' => $item->date?->format('d M Y'),
                    'image' => $item->getFirstMediaUrl('photos') ?: null,
                ]),
            'destinations' => $destinations,
        ]);
    }
}
