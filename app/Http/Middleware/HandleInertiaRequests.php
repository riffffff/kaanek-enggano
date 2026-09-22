<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $appUrl = rtrim((string) config('app.url'), '/');

        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'appWhatsappNumber' => config('app.whatsapp_number'),
            'flash' => [
                'message' => $request->session()->get('message'),
            ],
            'seo' => [
                'siteName' => 'Jelajah Enggano',
                'appUrl' => $appUrl,
                'url' => $request->url(),
                'locale' => 'id_ID',
                'defaultDescription' => 'Jelajah Enggano: informasi destinasi wisata, penginapan, transportasi, desa, dan catatan kegiatan KKN di Pulau Enggano, pulau terluar di Samudra Hindia.',
                'defaultImage' => 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            ],
        ];
    }
}
