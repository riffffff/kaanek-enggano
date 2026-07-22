<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DestinationController extends Controller
{
    private function excerptFromDescription(?string $description, int $limit = 120): string
    {
        $line = trim((string) str($description ?? '')->before("\n"));

        if ($line === '') {
            return '';
        }

        return str($line)->limit($limit, '...')->toString();
    }

    public function index(Request $request): Response
    {
        $type = $request->string('type')->toString();
        $allowedTypes = ['bahari', 'history', 'wildlife'];

        $destinations = Destination::query()
            ->when(in_array($type, $allowedTypes, true), fn ($query) => $query->where('type', $type))
            ->orderBy('name')
            ->get()
            ->map(fn (Destination $destination) => [
                'id' => $destination->id,
                'name' => $destination->name,
                'slug' => $destination->slug,
                'short_description' => $this->excerptFromDescription($destination->description),
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
            ->where('slug', $slug)
            ->firstOrFail();
        $gallery = $destination->getMedia('photos')
            ->map(fn ($media) => $media->getUrl())
            ->values();
        $frontImage = $gallery->first();

        return Inertia::render('Destination/Show', [
            'destination' => [
                'id' => $destination->id,
                'name' => $destination->name,
                'slug' => $destination->slug,
                'description' => $destination->description,
                'short_description' => $this->excerptFromDescription($destination->description),
                'type' => $destination->type,
                'difficulty_level' => $destination->difficulty_level,
                'travel_time' => $destination->travel_time,
                'access_note' => $destination->access_note,
                'lat' => $destination->lat,
                'lng' => $destination->lng,
                'background_image' => $destination->getFirstMediaUrl('background') ?: null,
                'gallery' => $gallery->all(),
                'image' => $frontImage,
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
