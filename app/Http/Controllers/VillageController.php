<?php

namespace App\Http\Controllers;

use App\Models\Umkm;
use Inertia\Inertia;
use Inertia\Response;

class VillageController extends Controller
{
    private $villageMap = [
        'kahyapu'    => ['id' => 2, 'name' => 'Kahyapu'],
        'kaana'      => ['id' => 3, 'name' => 'Kaana'],
        'meok'       => ['id' => 4, 'name' => 'Meok'],
        'apoho'      => ['id' => 5, 'name' => 'Apoho'],
        'malakoni'   => ['id' => 6, 'name' => 'Malakoni'],
        'banjarsari' => ['id' => 7, 'name' => 'Banjarsari'],
    ];

    private $villageOrder = ['kahyapu', 'kaana', 'meok', 'apoho', 'malakoni', 'banjarsari'];

    public function index(): Response
    {
        return Inertia::render('Village/Index');
    }

    public function show(string $slug): Response
    {
        $meta = $this->villageMap[$slug] ?? null;

        $umkms = [];
        if ($meta) {
            $umkms = Umkm::query()
                ->with('media')
                ->where('village_id', $meta['id'])
                ->get()
                ->map(fn (Umkm $umkm) => [
                    'id' => $umkm->id,
                    'business_name' => $umkm->business_name,
                    'owner_name' => $umkm->owner_name,
                    'business_type' => $umkm->business_type,
                    'whatsapp_number' => $umkm->whatsapp_number,
                    'notes' => $umkm->notes,
                    'product_photos' => $umkm->getFirstMediaUrl('product_photos') ?: null,
                ])
                ->values()
                ->all();
        }

        $idx = array_search($slug, $this->villageOrder, true);
        $prevSlug = ($idx > 0) ? $this->villageOrder[$idx - 1] : null;
        $nextSlug = ($idx !== false && $idx < count($this->villageOrder) - 1) ? $this->villageOrder[$idx + 1] : null;

        $prev = $prevSlug ? ['slug' => $prevSlug, 'name' => $this->villageMap[$prevSlug]['name']] : null;
        $next = $nextSlug ? ['slug' => $nextSlug, 'name' => $this->villageMap[$nextSlug]['name']] : null;

        return Inertia::render('Village/Show', [
            'slug' => $slug,
            'umkms' => $umkms,
            'prev' => $prev,
            'next' => $next,
        ]);
    }
}
