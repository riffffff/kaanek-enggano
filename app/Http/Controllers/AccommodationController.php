<?php

namespace App\Http\Controllers;

use App\Models\Homestay;
use App\Models\ShipSchedule;
use Inertia\Inertia;
use Inertia\Response;

class AccommodationController extends Controller
{
    private function resolveHomestayCover(Homestay $homestay): array
    {
        $coverMedia = $homestay->getFirstMedia('cover');
        $firstPhoto = $homestay->getFirstMedia('photos');

        $cover = $coverMedia ?: $firstPhoto;

        $coverUrl = null;
        $heroUrl = null;
        if ($cover) {
            $coverUrl = $cover->hasGeneratedConversion('medium')
                ? $cover->getUrl('medium')
                : $cover->getUrl();
            $heroUrl = $cover->getUrl();
        }

        return [$coverUrl, $heroUrl];
    }

    public function index(): Response
    {
        $schedules = ShipSchedule::query()
            ->where('is_active', true)
            ->orderBy('type')
            ->orderBy('departure_time')
            ->get()
            ->map(fn (ShipSchedule $schedule) => [
                'id' => $schedule->id,
                'type' => $schedule->type,
                'route' => $schedule->route,
                'days' => $schedule->days,
                'departure_time' => substr((string) $schedule->departure_time, 0, 5),
                'estimated_price' => $schedule->estimated_price ? 'Rp '.number_format($schedule->estimated_price, 0, ',', '.') : 'Hubungi admin',
                'ticket_link' => $schedule->ticket_link,
                'agent_whatsapp_number' => $schedule->agent_whatsapp_number,
            ]);

        $homestays = Homestay::query()
            ->with(['village', 'media'])
            ->orderBy('name')
            ->get()
            ->map(function (Homestay $homestay) {
                [$coverUrl, $heroUrl] = $this->resolveHomestayCover($homestay);

                return [
                    'id' => $homestay->id,
                    'name' => $homestay->name,
                    'owner' => $homestay->owner,
                    'whatsapp_number' => $homestay->whatsapp_number,
                    'facilities' => $homestay->facilities,
                    'description' => $homestay->description,
                    'features' => collect(explode(',', (string) $homestay->facilities))
                        ->map(fn (string $feature) => trim($feature))
                        ->filter()
                        ->take(3)
                        ->values(),
                    'price_per_night' => $homestay->price_per_night,
                    'village' => $homestay->village?->name,
                    'village_slug' => $homestay->village?->slug,
                    'cover' => $coverUrl,
                    'hero' => $heroUrl,
                    'image' => $heroUrl ?: $coverUrl,
                ];
            });

        $firstWithCover = $homestays->firstWhere(fn ($h) => filled($h['hero'] ?? null))
            ?? $homestays->firstWhere(fn ($h) => filled($h['cover'] ?? null));

        return Inertia::render('Accommodation/Index', [
            'schedules' => $schedules,
            'homestays' => $homestays,
            'signalPoints' => [],
            'headerHero' => $firstWithCover ? ($firstWithCover['hero'] ?? $firstWithCover['cover']) : null,
        ]);
    }

    public function show(string $id): Response
    {
        $homestay = Homestay::query()
            ->with(['village', 'media'])
            ->findOrFail($id);

        [$coverUrl, $heroUrl] = $this->resolveHomestayCover($homestay);

        $gallery = $homestay->getMedia('photos')
            ->map(fn ($media) => [
                'id' => $media->id,
                'url' => $media->getUrl(),
                'url_medium' => $media->hasGeneratedConversion('medium') ? $media->getUrl('medium') : null,
                'url_thumb' => $media->hasGeneratedConversion('thumbnail') ? $media->getUrl('thumbnail') : null,
                'name' => $media->getAttributeValue('name'),
            ])
            ->values()
            ->all();

        $homestayData = [
            'id' => $homestay->id,
            'name' => $homestay->name,
            'owner' => $homestay->owner,
            'whatsapp_number' => $homestay->whatsapp_number,
            'description' => $homestay->description,
            'features' => collect(explode(',', (string) $homestay->facilities))
                ->map(fn (string $feature) => trim($feature))
                ->filter()
                ->values(),
            'price_per_night' => $homestay->price_per_night,
            'price' => $homestay->price_per_night ? 'Rp '.number_format($homestay->price_per_night, 0, ',', '.').' /malam' : 'Hubungi host',
            'village' => $homestay->village?->name,
            'cover' => $heroUrl,
            'hero' => $heroUrl,
            'cover_image' => $coverUrl,
            'image' => $heroUrl ?: $coverUrl,
            'gallery' => $gallery,
        ];

        $prevHomestay = Homestay::query()
            ->where('id', '<', $homestay->id)
            ->orderBy('id', 'desc')
            ->first();

        $nextHomestay = Homestay::query()
            ->where('id', '>', $homestay->id)
            ->orderBy('id', 'asc')
            ->first();

        return Inertia::render('Accommodation/Show', [
            'homestay' => $homestayData,
            'prev' => $prevHomestay ? ['id' => $prevHomestay->id, 'name' => $prevHomestay->name] : null,
            'next' => $nextHomestay ? ['id' => $nextHomestay->id, 'name' => $nextHomestay->name] : null,
        ]);
    }
}
