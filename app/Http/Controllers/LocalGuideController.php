<?php

namespace App\Http\Controllers;

use App\Models\LocalGuide;
use Inertia\Inertia;
use Inertia\Response;

class LocalGuideController extends Controller
{
    public function index(): Response
    {
        $guides = LocalGuide::query()
            ->with('media')
            ->orderBy('name')
            ->get()
            ->map(fn (LocalGuide $guide) => [
                'id'               => $guide->id,
                'name'             => $guide->name,
                'whatsapp_number'  => $guide->whatsapp_number,
                'expertise'        => $guide->expertise,
                'image'            => $guide->getFirstMediaUrl('photos') ?: null,
            ]);

        return Inertia::render('LocalGuide/Index', [
            'guides' => $guides,
        ]);
    }
}
