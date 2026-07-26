<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            return;
        }

        $scheme = request()->getScheme();
        $host = request()->getHost();
        $port = request()->getPort();
        $portSuffix = (!in_array($port, [80, 443]) ? ':' . $port : '');
        $rootUrl = "{$scheme}://{$host}{$portSuffix}";

        config(['app.url' => $rootUrl]);
        config(['filesystems.disks.public.url' => "{$rootUrl}/storage"]);

        URL::forceRootUrl($rootUrl);

        if (request()->isSecure() || (request()->headers->get('X-Forwarded-Proto') === 'https')) {
            URL::forceScheme('https');
        }
    }
}

