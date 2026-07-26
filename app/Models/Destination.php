<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Destination extends Model implements HasMedia
{
    use HasFactory, HasSlug, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
        'lat',
        'lng',
        'difficulty_level',
        'travel_time',
        'access_note',
        'local_guide_id',
    ];

    protected function casts(): array
    {
        return [
            'lat' => 'float',
            'lng' => 'float',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function localGuide(): BelongsTo
    {
        return $this->belongsTo(LocalGuide::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('background')->useDisk('public')->singleFile();

        $this->addMediaCollection('photos')
            ->useDisk('public')
            ->acceptsMimeTypes([
                'image/jpeg',
                'image/png',
                'image/webp',
                'image/gif',
                'video/mp4',
                'video/webm',
                'video/quicktime',
            ]);
    }

    public function registerMediaConversions(?\Spatie\MediaLibrary\MediaCollections\Models\Media $media = null): void
    {
        $this->addMediaConversion('thumbnail')
            ->width(400)
            ->height(400)
            ->crop('crop-center', 400, 400)
            ->optimize()
            ->performOnCollections('photos', 'background')
            ->nonQueued();

        $this->addMediaConversion('medium')
            ->width(1200)
            ->height(1200)
            ->optimize()
            ->performOnCollections('photos', 'background')
            ->nonQueued();
    }
}
