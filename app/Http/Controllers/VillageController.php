<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class VillageController extends Controller
{
    public function index(): Response
    {
        // All markers for the map (no pagination, coordinate-filtered)
        $umkmMarkers = Umkm::query()
            ->with('village')
            ->orderBy('business_name')
            ->whereNotNull('lat')
            ->whereNotNull('lng')
            ->whereBetween('lat', [-6, -5])
            ->whereBetween('lng', [101, 103])
            ->get()
            ->map(fn (Umkm $umkm) => [
                'id'   => $umkm->id,
                'name' => $umkm->business_name,
                'lat'  => $umkm->lat,
                'lng'  => $umkm->lng,
            ])
            ->values()
            ->all();

        // Paginated list for the table (10 per page)
        $umkms = Umkm::query()
            ->with('village')
            ->orderBy('business_name')
            ->paginate(10)
            ->through(fn (Umkm $umkm) => [
                'id'            => $umkm->id,
                'name'          => $umkm->business_name,
                'owner_name'    => $umkm->owner_name,
                'business_type' => $umkm->business_type,
                'description'   => $umkm->notes,
                'village'       => $umkm->village?->name,
                'lat'           => $umkm->lat,
                'lng'           => $umkm->lng,
            ]);

        return Inertia::render('Village/Index', [
            'umkms'       => $umkms,
            'umkmMarkers' => $umkmMarkers,
        ]);
    }
}
