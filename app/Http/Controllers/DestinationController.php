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
            ->with('media')
            ->when(in_array($type, $allowedTypes, true), fn ($query) => $query->where('type', $type))
            ->orderBy('name')
            ->get()
            ->map(function (Destination $destination) {
                $backgroundImage = $destination->getFirstMedia('background');
                $firstPhoto = $destination->getFirstMedia('photos');

                $coverMedia = $backgroundImage ?: $firstPhoto;

                $coverUrl = null;
                $coverThumbUrl = null;
                if ($coverMedia) {
                    $coverUrl = $coverMedia->hasGeneratedConversion('medium')
                        ? $coverMedia->getUrl('medium')
                        : $coverMedia->getUrl();
                    $coverThumbUrl = $coverMedia->hasGeneratedConversion('thumbnail')
                        ? $coverMedia->getUrl('thumbnail')
                        : null;
                }

                $heroUrl = null;
                if ($backgroundImage) {
                    $heroUrl = $backgroundImage->hasGeneratedConversion('medium')
                        ? $backgroundImage->getUrl('medium')
                        : $backgroundImage->getUrl();
                } elseif ($firstPhoto) {
                    $heroUrl = $firstPhoto->hasGeneratedConversion('medium')
                        ? $firstPhoto->getUrl('medium')
                        : $firstPhoto->getUrl();
                }

                return [
                    'id' => $destination->id,
                    'name' => $destination->name,
                    'slug' => $destination->slug,
                    'short_description' => $this->excerptFromDescription($destination->description),
                    'type' => $destination->type,
                    'difficulty_level' => $destination->difficulty_level,
                    'image' => $heroUrl,
                    'image_thumb' => $coverThumbUrl,
                    'cover' => $coverUrl,
                    'cover_thumb' => $coverThumbUrl,
                    'hero' => $heroUrl,
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
            ->with('media')
            ->where('slug', $slug)
            ->firstOrFail();

        $backgroundMedia = $destination->getFirstMedia('background');
        $firstPhoto = $destination->getFirstMedia('photos');

        $backgroundImage = null;
        $backgroundImageThumb = null;
        $heroImage = null;

        if ($backgroundMedia) {
            $backgroundImage = $backgroundMedia->hasGeneratedConversion('medium')
                ? $backgroundMedia->getUrl('medium')
                : $backgroundMedia->getUrl();
            $backgroundImageThumb = $backgroundMedia->hasGeneratedConversion('thumbnail')
                ? $backgroundMedia->getUrl('thumbnail')
                : null;
            $heroImage = $backgroundMedia->getUrl();
        } elseif ($firstPhoto) {
            $backgroundImage = $firstPhoto->hasGeneratedConversion('medium')
                ? $firstPhoto->getUrl('medium')
                : $firstPhoto->getUrl();
            $backgroundImageThumb = $firstPhoto->hasGeneratedConversion('thumbnail')
                ? $firstPhoto->getUrl('thumbnail')
                : null;
            $heroImage = $firstPhoto->getUrl();
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
            : $heroImage;

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
                'hero_image' => $heroImage,
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
