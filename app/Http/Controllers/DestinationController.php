<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    private const DESTINATION_META = [
        'bahari' => [
            'headline' => 'A Hidden Sanctuary on the Edge of the Indian Ocean',
            'travel_time' => '30 mins from Malakoni',
            'access_note' => 'Motorbike & short trek',
            'experiences' => ['Snorkeling', 'Wild Camping', 'Photography'],
            'gallery' => [
                'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'wildlife' => [
            'headline' => 'An Immersive Walk Through Enggano’s Endemic Wilderness',
            'travel_time' => '45 mins from Apoho',
            'access_note' => 'Motorbike & forest trail',
            'experiences' => ['Forest Trekking', 'Birdwatching', 'Nature Study'],
            'gallery' => [
                'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
        'history' => [
            'headline' => 'Tracing Memory, Settlement, and Cultural Continuity',
            'travel_time' => '20 mins from Enggano village',
            'access_note' => 'Village road & short walk',
            'experiences' => ['Heritage Walk', 'Documentation', 'Site Exploration'],
            'gallery' => [
                'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
            ],
        ],
    ];

    public function index(Request $request): Response
    {
        $type = $request->string('type')->toString();
        $allowedTypes = ['bahari', 'history', 'wildlife'];

        $destinations = Destination::query()
            ->with('localGuide')
            ->when(in_array($type, $allowedTypes, true), fn ($query) => $query->where('type', $type))
            ->orderBy('name')
            ->get()
            ->map(fn (Destination $destination) => [
                'id' => $destination->id,
                'name' => $destination->name,
                'slug' => $destination->slug,
                'short_description' => $destination->short_description,
                'type' => $destination->type,
                'difficulty_level' => $destination->difficulty_level,
                'image' => $destination->getFirstMediaUrl('photos') ?: null,
            ]);

        return Inertia::render('Destination/Index', [
            'destinations' => $destinations,
            'selectedType' => in_array($type, $allowedTypes, true) ? $type : null,
        ]);
    }

    public function show(string $slug): Response
    {
        $destination = Destination::query()
            ->with('localGuide')
            ->where('slug', $slug)
            ->firstOrFail();
        $meta = self::DESTINATION_META[$destination->type] ?? self::DESTINATION_META['bahari'];

        return Inertia::render('Destination/Show', [
            'destination' => [
                'id' => $destination->id,
                'name' => $destination->name,
                'slug' => $destination->slug,
                'description' => $destination->description,
                'short_description' => $destination->short_description,
                'type' => $destination->type,
                'difficulty_level' => $destination->difficulty_level,
                'lat' => $destination->lat,
                'lng' => $destination->lng,
                'headline' => $meta['headline'],
                'travel_time' => $meta['travel_time'],
                'access_note' => $meta['access_note'],
                'experiences' => $meta['experiences'],
                'gallery' => $meta['gallery'],
                'image' => $destination->getFirstMediaUrl('photos') ?: null,
                'local_guide' => $destination->localGuide ? [
                    'name' => $destination->localGuide->name,
                    'whatsapp_number' => $destination->localGuide->whatsapp_number,
                    'expertise' => $destination->localGuide->expertise,
                ] : null,
            ],
            'prev' => Destination::query()
                ->where('id', '<', $destination->id)
                ->latest('id')
                ->first(['name', 'slug']),
            'next' => Destination::query()
                ->where('id', '>', $destination->id)
                ->oldest('id')
                ->first(['name', 'slug']),
        ]);
    }
}
