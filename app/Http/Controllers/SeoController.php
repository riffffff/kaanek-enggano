<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Homestay;
use App\Models\KknLogItem;
use Illuminate\Http\Response;

class SeoController extends Controller
{
    public function robots(): Response
    {
        $sitemap = url('/sitemap.xml');
        $body = <<<TXT
User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /livewire
Disallow: /livewire/

Sitemap: {$sitemap}

TXT;

        return response($body, 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
        ]);
    }

    public function sitemap(): Response
    {
        $urls = [
            $this->entry(route('home'), now(), 'weekly', '1.0'),
            $this->entry(route('destinations.index'), now(), 'weekly', '0.9'),
            $this->entry(route('accommodations.index'), now(), 'weekly', '0.9'),
            $this->entry(route('activities.index'), now(), 'weekly', '0.8'),
            $this->entry(route('about-enggano.index'), now(), 'monthly', '0.8'),
            $this->entry(route('about-enggano.history'), now(), 'monthly', '0.8'),
            $this->entry(route('local-guide.index'), now(), 'monthly', '0.7'),
            $this->entry(route('credits'), now(), 'yearly', '0.4'),
            $this->entry(route('privacy-policy'), now(), 'yearly', '0.2'),
        ];

        Destination::query()
            ->select(['slug', 'updated_at'])
            ->orderBy('id')
            ->get()
            ->each(function (Destination $destination) use (&$urls) {
                $urls[] = $this->entry(
                    route('destinations.show', $destination->slug),
                    $destination->updated_at,
                    'monthly',
                    '0.8',
                );
            });

        Homestay::query()
            ->select(['id', 'updated_at'])
            ->orderBy('id')
            ->get()
            ->each(function (Homestay $homestay) use (&$urls) {
                $urls[] = $this->entry(
                    route('accommodations.show', $homestay->id),
                    $homestay->updated_at,
                    'monthly',
                    '0.7',
                );
            });

        KknLogItem::query()
            ->select(['slug', 'updated_at'])
            ->orderByDesc('date')
            ->get()
            ->each(function (KknLogItem $item) use (&$urls) {
                $urls[] = $this->entry(
                    route('activities.show', $item->slug),
                    $item->updated_at,
                    'weekly',
                    '0.6',
                );
            });

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }

    /**
     * @return array{loc: string, lastmod: string, changefreq: string, priority: string}
     */
    private function entry(string $loc, mixed $lastmod, string $changefreq, string $priority): array
    {
        return [
            'loc' => $loc,
            'lastmod' => optional($lastmod)?->toAtomString() ?? now()->toAtomString(),
            'changefreq' => $changefreq,
            'priority' => $priority,
        ];
    }
}
