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
        // Ambil destinations untuk homepage
        $destinations = Destination::query()
            ->take(4)
            ->get()
            ->map(function (Destination $dest) {
                $backgroundImage = $dest->getFirstMedia('background');
                $firstPhoto = $dest->getFirstMedia('photos');
                $previewMedia = $backgroundImage ?: $firstPhoto;

                $imageUrl = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';
                if ($previewMedia) {
                    $imageUrl = $previewMedia->hasGeneratedConversion('medium')
                        ? $previewMedia->getUrl('medium')
                        : $previewMedia->getUrl();
                }

                return [
                    'id' => $dest->id,
                    'name' => $dest->name,
                    'slug' => $dest->slug,
                    'type' => $dest->type,
                    'short_description' => $this->excerptFromDescription($dest->description),
                    'description' => $dest->description,
                    'image' => $imageUrl,
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
