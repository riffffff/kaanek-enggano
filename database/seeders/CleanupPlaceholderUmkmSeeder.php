<?php

namespace Database\Seeders;

use App\Models\Umkm;
use App\Models\Village;
use Illuminate\Database\Seeder;

class CleanupPlaceholderUmkmSeeder extends Seeder
{
    public function run(): void
    {
        $kahyapu = Village::query()->where('name', 'Kahyapu')->first();
        $malakoni = Village::query()->where('name', 'Malakoni')->first();

        if ($kahyapu) {
            $deleted = Umkm::query()
                ->where('village_id', $kahyapu->id)
                ->whereIn('business_name', ['Produk Unggulan Kahyapu', 'Kerajinan Kahyapu'])
                ->delete();
            $this->command->info("Deleted {$deleted} placeholder UMKM entries for Kahyapu.");
        }

        if ($malakoni) {
            $deleted = Umkm::query()
                ->where('village_id', $malakoni->id)
                ->whereIn('business_name', ['Produk Unggulan Malakoni', 'Kerajinan Malakoni'])
                ->delete();
            $this->command->info("Deleted {$deleted} placeholder UMKM entries for Malakoni.");
        }
    }
}
