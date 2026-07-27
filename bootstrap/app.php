<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->trustProxies(at: '*');

        $appDomain = env('APP_DOMAIN', 'jelajahenggano.com');
        $middleware->trustHosts(at: array_values(array_filter([
            // Localhost & local testing
            'localhost',
            '127.0.0.1',
            '/.*\.localhost$/',
            // Temporary hosting domain (cPanel ArenHost)
            'mten.kencang.id',
            '/.*\.mten\.kencang\.id$/',
            // Production domain: explicit hosts
            (string) $appDomain,
            'www.' . (string) $appDomain,
            // Production domain: wildcard subdomains (REGEX)
            '/.*\.' . preg_quote((string) $appDomain, '/') . '$/',
        ], fn ($v) => !empty($v) && is_string($v))));
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
