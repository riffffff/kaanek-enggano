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

        $items = KknLogItem::query()
            ->when(in_array($category, $allowedCategories, true), fn ($query) => $query->where('category', $category))
            ->latest('date')
            ->get()
            ->map(fn (KknLogItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'date' => $item->date?->format('d M Y'),
                'excerpt' => str($item->content)->explode("\n\n")->first(),
                'read_time' => max(3, (int) ceil(str_word_count((string) $item->content) / 120)).' min read',
                'image' => $item->getFirstMediaUrl('photos') ?: null,
            ]);

        return Inertia::render('KknLog/Index', [
            'items' => $items,
            'selectedCategory' => in_array($category, $allowedCategories, true) ? $category : null,
        ]);
    }

    public function show(string $slug): Response
    {
        $item = KknLogItem::query()->where('slug', $slug)->firstOrFail();

        return Inertia::render('KknLog/Show', [
            'item' => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'category' => $item->category,
                'date' => $item->date?->format('d M Y'),
                'content' => $item->content,
                'read_time' => max(3, (int) ceil(str_word_count((string) $item->content) / 120)).' min read',
                'image' => $item->getFirstMediaUrl('photos') ?: null,
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
