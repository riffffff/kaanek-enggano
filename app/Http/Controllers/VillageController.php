<?php

namespace App\Http\Controllers;

use App\Models\Village;
use Inertia\Inertia;
use Inertia\Response;

class VillageController extends Controller
{
    public function index(): Response
    {
        $villages = Village::query()
            ->withCount('umkms')
            ->orderBy('name')
            ->get()
            ->map(fn (Village $village) => [
                'id' => $village->id,
                'name' => $village->name,
                'slug' => $village->slug,
                'summary' => $village->summary,
                'umkms_count' => $village->umkms_count,
                'lat' => $village->lat,
                'lng' => $village->lng,
                'potential' => collect(explode(',', (string) $village->potential))
                    ->map(fn (string $item) => trim($item))
                    ->filter()
                    ->values(),
                'image' => $village->getFirstMediaUrl('photos') ?: null,
            ]);

        return Inertia::render('Village/Index', [
            'villages' => $villages,
        ]);
    }

    public function show(string $slug): Response
    {
        $village = Village::query()
            ->with('umkms')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Village/Show', [
            'village' => [
                'id' => $village->id,
                'name' => $village->name,
                'slug' => $village->slug,
                'summary' => $village->summary,
                'history' => $village->history,
                'tribe' => $village->tribe,
                'traditions' => $village->traditions,
                'potential' => collect(explode(',', (string) $village->potential))
                    ->map(fn (string $item) => trim($item))
                    ->filter()
                    ->values(),
                'lat' => $village->lat,
                'lng' => $village->lng,
                'image' => $village->getFirstMediaUrl('photos') ?: null,
                'gallery' => $village->getMedia('photos')->map(fn ($media) => $media->getUrl())->values()->all(),
                'umkms' => $village->umkms->map(fn ($umkm) => [
                    'id' => $umkm->id,
                    'business_name' => $umkm->business_name,
                    'owner_name' => $umkm->owner_name,
                    'business_type' => $umkm->business_type,
                    'whatsapp_number' => $umkm->whatsapp_number,
                    'notes' => $umkm->notes,
                    'product_photos' => $umkm->getFirstMediaUrl('product_photos') ?: null,
                ]),
            ],
            'prev' => Village::query()
                ->where('id', '<', $village->id)
                ->latest('id')
                ->first(['name', 'slug']),
            'next' => Village::query()
                ->where('id', '>', $village->id)
                ->oldest('id')
                ->first(['name', 'slug']),
        ]);
    }
}
