<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class UmkmController extends Controller
{
    public function index(): Response
    {
        $umkms = Umkm::query()
            ->with('village')
            ->orderBy('business_name')
            ->get()
            ->map(fn (Umkm $umkm) => [
                'id'              => $umkm->id,
                'business_name'   => $umkm->business_name,
                'owner_name'      => $umkm->owner_name,
                'business_type'   => $umkm->business_type,
                'notes'           => $umkm->notes,
                'village'         => $umkm->village?->name,
                'lat'             => $umkm->lat,
                'lng'             => $umkm->lng,
                'product_photos'  => $umkm->getFirstMediaUrl('product_photos') ?: null,
            ]);

        return Inertia::render('Umkm/Index', [
            'umkms' => $umkms,
        ]);
    }
}
