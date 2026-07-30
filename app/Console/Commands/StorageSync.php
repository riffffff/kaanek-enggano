<?php

namespace App\Console\Commands;

use App\Providers\SharedHostingStorageSyncProvider;
use Illuminate\Console\Command;

class StorageSync extends Command
{
    protected $signature = 'storage:sync {--f|force : Force sync semua file (skip lock & cooldown)}';

    protected $description = 'Sinkronkan storage/app/public ke public/storage (lokal) atau public_html/storage (shared hosting production)';

    public function handle(): void
    {
        $source = storage_path('app/public');
        $force = (bool) $this->option('force');

        $env = app()->environment();
        if (in_array($env, ['local', 'development', 'testing'], true)) {
            $dest = base_path('public/storage');
            $this->info("Environment: <fg=yellow>{$env}</> (LOCAL) → destination = <fg=cyan>public/storage</>");
        } else {
            $projectBase = rtrim(base_path(), '/');
            $sharedHostingDest = $projectBase . '/../../public_html/storage';
            if (is_dir(realpath($projectBase . '/../../public_html'))) {
                $dest = realpath($sharedHostingDest) ?: $sharedHostingDest;
                $this->info("Environment: <fg=yellow>{$env}</> (SHARED HOSTING) → destination = <fg=cyan>public_html/storage</>");
            } else {
                $dest = base_path('public/storage');
                $this->warn("Environment: <fg=yellow>{$env}</> tapi public_html tidak ditemukan → fallback = <fg=cyan>public/storage</>");
            }
        }

        if (! is_dir($source)) {
            @mkdir($source, 0755, true);
        }

        $stats = SharedHostingStorageSyncProvider::runIfNeeded($source, $dest, $force);

        $this->table(
            ['Metric', 'Value'],
            [
                ['Source', $source],
                ['Destination', $dest],
                ['Destination is symlink?', $stats['dest_is_symlink'] ? '✅ YES (skip copy)' : 'NO (akan copy)'],
                ['Skipped (path invalid)?', $stats['skipped_path'] ? 'YES ❌' : 'NO'],
                ['Skipped (lock cooldown)?', $stats['skipped_lock'] ? 'YES (pakai --force untuk bypass)' : 'NO'],
                ['Files copied', '<fg=green>' . $stats['files_copied'] . '</>'],
                ['Directories created', '<fg=green>' . $stats['dirs_created'] . '</>'],
                ['Total bytes copied', '<fg=green>' . number_format($stats['bytes_copied'], 0, ',', '.') . ' bytes</>'],
            ]
        );

        if ($stats['files_copied'] > 0 || $stats['dirs_created'] > 0) {
            $this->info('✅ Sinkronisasi storage BERHASIL!');
        } elseif ($stats['dest_is_symlink']) {
            $this->info('ℹ️ Destination berupa symlink → dianggap sudah sinkron, tidak perlu copy file.');
        } elseif ($stats['skipped_lock']) {
            $this->warn('⏳ Skip sync karena baru saja dijalankan < 10 detik lalu. Gunakan <fg=yellow>--force</> untuk bypass.');
        } elseif ($stats['skipped_path']) {
            $this->error('❌ Skip sync: path source atau destination tidak ada / tidak writable.');
        } else {
            $this->info('ℹ️ Tidak ada file baru yang perlu disalin (storage sudah sinkron).');
        }
    }
}
