<?php

return [

    'paths' => ['*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('APP_URL', 'http://localhost:8000'),
        'https://jelajahenggano.com',
        'https://www.jelajahenggano.com',
        'http://jelajahenggano.com',
        'http://www.jelajahenggano.com',
        'http://localhost',
        'http://localhost:8000',
        'http://127.0.0.1',
        'http://127.0.0.1:8000',
        'https://localhost',
        'https://localhost:8000',
        'https://127.0.0.1',
        'https://127.0.0.1:8000',
    ],

    'allowed_origins_patterns' => [
        '#^https?://localhost(:\d+)?$#',
        '#^https?://127\.0\.0\.1(:\d+)?$#',
        '#^https?://[^.]+\.localhost(:\d+)?$#',
        '#^https?://jelajahenggano\.com$#',
        '#^https?://www\.jelajahenggano\.com$#',
        '#^https?://[^.]+\.jelajahenggano\.com$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];
