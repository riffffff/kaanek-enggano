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
                'id' => $umkm->id,
                'name' => $umkm->business_name,
                'description' => $umkm->notes,
                'village' => $umkm->village?->name,
                'whatsapp_number' => $umkm->whatsapp_number,
                'image' => $umkm->getFirstMediaUrl('product_photos') ?: null,
            ]);

        return Inertia::render('Umkm/Index', [
            'umkms' => $umkms,
        ]);
    }
}
