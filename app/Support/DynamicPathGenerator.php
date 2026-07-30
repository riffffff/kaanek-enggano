<?php

namespace App\Support;

use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\MediaLibrary\Support\PathGenerator\PathGenerator;

class DynamicPathGenerator implements PathGenerator
{
    public function getPath(Media $media): string
    {
        return $this->getBasePath($media) . '/' . $this->getMediaTypeFolder($media) . '/';
    }

    public function getPathForConversions(Media $media): string
    {
        return $this->getBasePath($media) . '/conversions/';
    }

    public function getPathForResponsiveImages(Media $media): string
    {
        return $this->getBasePath($media) . '/responsive-images/';
    }

    protected function getBasePath(Media $media): string
    {
        $category = 'general';
        if ($media->model_type) {
            $category = Str::plural(Str::kebab(class_basename($media->model_type)));
        }

        $itemSlug = null;
        $model = $media->model;

        if ($model) {
            if (isset($model->slug) && ! empty($model->slug)) {
                $itemSlug = $model->slug;
            } elseif (isset($model->name) && ! empty($model->name)) {
                $itemSlug = Str::slug($model->name);
            } elseif (isset($model->title) && ! empty($model->title)) {
                $itemSlug = Str::slug($model->title);
            }
        }

        if (empty($itemSlug)) {
            $itemSlug = $media->model_id ? (string) $media->model_id : ($media->uuid ?? (string) $media->id);
        }

        return $category . '/' . $itemSlug;
    }

    protected function getMediaTypeFolder(Media $media): string
    {
        $mime = $media->mime_type ?? '';

        if (Str::startsWith($mime, 'video/')) {
            return 'videos';
        }

        if (Str::startsWith($mime, 'image/')) {
            return 'images';
        }

        return 'files';
    }
}
