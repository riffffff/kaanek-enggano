<?php

namespace App\Console\Commands;

use App\Support\DynamicPathGenerator;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class OrganizeMediaPaths extends Command
{
    protected $signature = 'media:organize';

    protected $description = 'Organize existing media files into the dynamic directory structure';

    public function handle(): void
    {
        $generator = new DynamicPathGenerator();
        $mediaItems = Media::all();

        $movedCount = 0;

        foreach ($mediaItems as $media) {
            $disk = Storage::disk($media->disk ?? 'public');
            $oldDir = (string) $media->id;
            $newDir = rtrim($generator->getPath($media), '/');

            if ($disk->exists($oldDir)) {
                $files = $disk->allFiles($oldDir);
                foreach ($files as $file) {
                    $relativePath = Str::after($file, $oldDir . '/');
                    $targetPath = $newDir . '/' . $relativePath;

                    $disk->makeDirectory(dirname($targetPath));
                    $disk->move($file, $targetPath);
                    $movedCount++;
                }

                $disk->deleteDirectory($oldDir);
                $this->info("Media #{$media->id} dipindahkan ke: {$newDir}");
            }
        }

        // Clean up remaining numeric directories in public disk
        $publicPath = storage_path('app/public');
        if (File::exists($publicPath)) {
            $dirs = File::directories($publicPath);
            foreach ($dirs as $dir) {
                $basename = basename($dir);
                if (is_numeric($basename)) {
                    File::deleteDirectory($dir);
                    $this->info("Folder numeric lama dibersihkan: {$basename}");
                }
            }
        }

        $this->info("Selesai! {$movedCount} file dipindahkan ke lokasi baru.");
    }
}
