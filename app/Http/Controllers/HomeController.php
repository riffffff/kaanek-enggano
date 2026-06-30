<?php

namespace App\Http\Controllers;

use App\Models\KknLogItem;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
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
        ]);
    }
}
