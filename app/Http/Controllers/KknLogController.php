<?php

namespace App\Http\Controllers;

use App\Models\KknLogItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KknLogController extends Controller
{
    public function index(Request $request): Response
    {
        $category = $request->string('category')->toString();
        $allowedCategories = ['ekonomi', 'kesehatan', 'digitalisasi', 'lingkungan'];

        $query = KknLogItem::query()
            ->with('media')
            ->when(in_array($category, $allowedCategories, true), fn ($query) => $query->where('category', $category))
            ->orderByDesc('is_highlighted')
            ->latest('date');

        $highlighted = (clone $query)
            ->where('is_highlighted', true)
            ->limit(4)
            ->get();

        $allItems = $query->get();

        $mapper = function (KknLogItem $item): array {
            $coverMedia = $item->getFirstMedia('cover');
            $firstPhoto = $item->getFirstMedia('photos');

            $fallbackImage = null;
            if ($coverMedia) {
                $fallbackImage = $coverMedia->hasGeneratedConversion('medium')
                    ? $coverMedia->getUrl('medium')
                    : $coverMedia->getUrl();
            } elseif ($firstPhoto) {
                $fallbackImage = $firstPhoto->hasGeneratedConversion('medium')
                    ? $firstPhoto->getUrl('medium')
                    : $firstPhoto->getUrl();
            }

            $coverUrl = $coverMedia?->getUrl();

            return [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'date' => $item->date?->format('d M Y'),
                'excerpt' => str($item->content)->explode("\n\n")->first(),
                'read_time' => max(3, (int) ceil(str_word_count((string) $item->content) / 120)).' min read',
                'is_highlighted' => (bool) $item->is_highlighted,
                'cover' => $coverUrl,
                'image' => $fallbackImage,
            ];
        };

        $mappedHighlighted = $highlighted->map($mapper)->all();
        $carouselCount = count($mappedHighlighted);

        if ($carouselCount < 4) {
            $needed = 4 - $carouselCount;
            $highlightedIds = $highlighted->pluck('id')->all();
            $fillUpsMapped = $allItems
                ->whereNotIn('id', $highlightedIds)
                ->take($needed)
                ->map($mapper)
                ->all();
            $carouselItems = collect(array_merge($mappedHighlighted, $fillUpsMapped));
        } else {
            $carouselItems = collect($mappedHighlighted);
        }

        $items = $allItems->map($mapper)->values();

        return Inertia::render('KknLog/Index', [
            'items' => $items,
            'carouselItems' => $carouselItems,
            'highlightedCount' => $highlighted->count(),
            'selectedCategory' => in_array($category, $allowedCategories, true) ? $category : null,
        ]);
    }

    public function show(string $slug): Response
    {
        $item = KknLogItem::query()
            ->with('media')
            ->where('slug', $slug)
            ->firstOrFail();

        $coverMedia = $item->getFirstMedia('cover');
        $firstPhoto = $item->getFirstMedia('photos');

        $heroImage = null;
        $coverFull = null;
        if ($coverMedia) {
            $heroImage = $coverMedia->hasGeneratedConversion('medium')
                ? $coverMedia->getUrl('medium')
                : $coverMedia->getUrl();
            $coverFull = $coverMedia->getUrl();
        } elseif ($firstPhoto) {
            $heroImage = $firstPhoto->hasGeneratedConversion('medium')
                ? $firstPhoto->getUrl('medium')
                : $firstPhoto->getUrl();
            $coverFull = $firstPhoto->getUrl();
        }

        $gallery = $item->getMedia('photos')
            ->map(fn ($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'url_medium' => $media->hasGeneratedConversion('medium') ? $media->getUrl('medium') : null,
                'url_thumb' => $media->hasGeneratedConversion('thumbnail') ? $media->getUrl('thumbnail') : null,
                'name' => $media->getAttributeValue('name'),
            ])
            ->values()
            ->all();

        return Inertia::render('KknLog/Show', [
            'item' => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'date' => $item->date?->format('d M Y'),
                'content' => $item->content,
                'read_time' => max(3, (int) ceil(str_word_count((string) $item->content) / 120)).' min read',
                'cover' => $coverFull,
                'cover_image' => $coverFull,
                'image' => $heroImage,
                'gallery' => $gallery,
            ],
            'prev' => KknLogItem::query()
                ->where('id', '<', $item->id)
                ->latest('id')
                ->first(['title', 'slug']),
            'next' => KknLogItem::query()
                ->where('id', '>', $item->id)
                ->oldest('id')
                ->first(['title', 'slug']),
        ]);
    }
}
