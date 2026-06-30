<?php

namespace App\Http\Controllers;

use App\Models\Homestay;
use App\Models\ShipSchedule;
use Inertia\Inertia;
use Inertia\Response;

class AccommodationController extends Controller
{
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
            ->with('village')
            ->orderBy('name')
            ->get()
            ->map(fn (Homestay $homestay) => [
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
                'image' => $homestay->getFirstMediaUrl('photos') ?: null,
            ]);

        return Inertia::render('Accommodation/Index', [
            'schedules' => $schedules,
            'homestays' => $homestays,
            'signalPoints' => [],
        ]);
    }

    public function show(string $id): Response
    {
        $homestay = Homestay::query()
            ->with('village')
            ->findOrFail($id);

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
            'image' => $homestay->getFirstMediaUrl('photos') ?: null,
            'gallery' => $homestay->getMedia('photos')->map(fn ($media) => $media->getUrl()),
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
