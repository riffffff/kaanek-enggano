<?php

namespace App\Console\Commands;

use App\Providers\SharedHostingStorageSyncProvider;
use Illuminate\Console\Command;

class StorageSyncCommand extends Command
{
    protected $signature = 'storage:sync
        {--force : Abaikan lock file 10 detik, jalankan sync paksa SEKARANG}
        {--no-output : Tidak menampilkan progress detail (untuk CI/shutdown hook)}';

    protected $description = 'Sync storage/app/public -> ../public_html/storage (shared hosting tanpa symlink)';

    public function handle(): int
    {
        $source = storage_path('app/public');
        $dest   = rtrim(base_path(), '/') . '/../public_html/storage';
        $dest   = realpath($dest) ?: $dest;
        $force  = (bool) $this->option('force');
        $quiet  = (bool) $this->option('no-output');

        if (!$quiet) {
            $this->line('============================================');
            $this->info('🔧 Shared Hosting Storage Sync');
            $this->line('============================================');
            $this->line(' Source : ' . $source . '  (' . (is_dir($source) ? '✅' : '❌') . ')');
            $this->line(' Dest   : ' . $dest   . '  (' . (is_dir($dest) || @mkdir($dest, 0755, true) ? '✅' : '❌') . ')');
            $this->line(' Force  : ' . ($force ? '✅ YA (abaikan lock)' : '⚠️  Tidak (hanya jika > 10 detik dari sync terakhir)'));
            $this->newLine();
        }

        $result = SharedHostingStorageSyncProvider::runIfNeeded($source, $dest, $force);

        if (!$quiet) {
            if ($result['skipped_path']) {
                $this->error('❌ DILEWATI: Folder source/dest tidak ada atau tidak bisa ditulis. Cek permission folder.');
                return self::FAILURE;
            }
            if ($result['dest_is_symlink']) {
                $this->warn('⚠️  DILEWATI: Dest adalah SYMLINK (storage:link work). Tidak perlu copy manual.');
                return self::INVALID;
            }
            if ($result['skipped_lock']) {
                $this->warn('⏸️  DILEWATI: Lock file < 10 detik. Jalankan dengan --force untuk paksa sync.');
                return self::SUCCESS;
            }

            $this->line('✅ SELESAI!');
            $this->table(['Item', 'Jumlah'], [
                ['Folder dibuat',  number_format($result['dirs_created'])],
                ['File di-copy',   number_format($result['files_copied'])],
                ['Total bytes',    number_format($result['bytes_copied']) . '  (' . $this->formatBytes($result['bytes_copied']) . ')'],
            ]);
            $this->newLine();
        }

        return self::SUCCESS;
    }

    protected function formatBytes(int $bytes): string
    {
        if ($bytes === 0) return '0 B';
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $i = (int) floor(log($bytes, 1024));
        return round($bytes / pow(1024, $i), 2) . ' ' . $units[$i];
    }
}
