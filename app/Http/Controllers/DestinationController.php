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
            ->map(function (Destination $destination) {
                $backgroundImage = $destination->getFirstMedia('background');
                $firstPhoto = $destination->getFirstMedia('photos');
                $previewMedia = $backgroundImage ?: $firstPhoto;

                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                    'short_description' => $this->excerptFromDescription($destination->description),
                    'type' => $destination->type,
                    'difficulty_level' => $destination->difficulty_level,
                    'image' => $previewMedia?->hasGeneratedConversion('medium')
                        ? $previewMedia->getUrl('medium')
                        : $previewMedia?->getUrl(),
                    'image_thumb' => $previewMedia?->hasGeneratedConversion('thumbnail')
                        ? $previewMedia->getUrl('thumbnail')
                        : null,
                ];
            });

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

        $backgroundMedia = $destination->getFirstMedia('background');
        $backgroundImage = null;
        $backgroundImageThumb = null;
        if ($backgroundMedia) {
            $backgroundImage = $backgroundMedia->hasGeneratedConversion('medium')
                ? $backgroundMedia->getUrl('medium')
                : $backgroundMedia->getUrl();
            $backgroundImageThumb = $backgroundMedia->hasGeneratedConversion('thumbnail')
                ? $backgroundMedia->getUrl('thumbnail')
                : null;
        }

        $gallery = $destination->getMedia('photos')
            ->map(function ($media) {
                $isVideo = str_starts_with((string) $media->getAttributeValue('mime_type'), 'video/');
                $url = $media->getUrl();
                $thumb = null;
                $medium = null;

                if (! $isVideo) {
                    if ($media->hasGeneratedConversion('thumbnail')) {
                        $thumb = $media->getUrl('thumbnail');
                    }
                    if ($media->hasGeneratedConversion('medium')) {
                        $medium = $media->getUrl('medium');
                    }
                }

                return [
                    'id' => $media->id,
                    'type' => $isVideo ? 'video' : 'image',
                    'mime' => $media->getAttributeValue('mime_type'),
                    'url' => $url,
                    'url_thumb' => $thumb,
                    'url_medium' => $medium,
                    'name' => $media->getAttributeValue('name'),
                ];
            })
            ->values();

        $firstGalleryItem = $gallery->first();
        $frontImage = $firstGalleryItem
            ? ($firstGalleryItem['url_medium'] ?: $firstGalleryItem['url'])
            : null;

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
                'background_image' => $backgroundImage,
                'background_image_thumb' => $backgroundImageThumb,
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
