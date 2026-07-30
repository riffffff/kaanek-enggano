<?php

namespace Tests\Unit;

use App\Models\Destination;
use App\Models\Village;
use App\Support\DynamicPathGenerator;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Tests\TestCase;

class DynamicPathGeneratorTest extends TestCase
{
    public function test_it_generates_correct_path_for_images_with_slug()
    {
        $generator = new DynamicPathGenerator();

        $destination = new Destination(['name' => 'Pantai Kabuabua', 'slug' => 'pantai-kabuabua']);
        $media = new Media(['mime_type' => 'image/jpeg', 'model_type' => Destination::class, 'model_id' => 10]);
        $media->setRelation('model', $destination);

        $path = $generator->getPath($media);

        $this->assertEquals('destinations/pantai-kabuabua/images/', $path);
    }

    public function test_it_generates_correct_path_for_videos()
    {
        $generator = new DynamicPathGenerator();

        $village = new Village(['name' => 'Desa Apoho', 'slug' => 'desa-apoho']);
        $media = new Media(['mime_type' => 'video/mp4', 'model_type' => Village::class, 'model_id' => 5]);
        $media->setRelation('model', $village);

        $path = $generator->getPath($media);

        $this->assertEquals('villages/desa-apoho/videos/', $path);
    }

    public function test_it_generates_conversions_and_responsive_paths()
    {
        $generator = new DynamicPathGenerator();

        $destination = new Destination(['slug' => 'pantai-kabuabua']);
        $media = new Media(['mime_type' => 'image/png', 'model_type' => Destination::class, 'model_id' => 10]);
        $media->setRelation('model', $destination);

        $this->assertEquals('destinations/pantai-kabuabua/conversions/', $generator->getPathForConversions($media));
        $this->assertEquals('destinations/pantai-kabuabua/responsive-images/', $generator->getPathForResponsiveImages($media));
    }
}
