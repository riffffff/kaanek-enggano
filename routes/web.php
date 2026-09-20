<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KknLogController;
use App\Http\Controllers\LocalGuideController;
use App\Http\Controllers\VillageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/accommodations', [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/accommodations/{id}', [AccommodationController::class, 'show'])->name('accommodations.show');
Route::get('/activities', [KknLogController::class, 'index'])->name('activities.index');
Route::get('/activities/{slug}', [KknLogController::class, 'show'])->name('activities.show');
Route::get('/about-enggano', [VillageController::class, 'index'])->name('about-enggano.index');
Route::get('/about-enggano/history', fn () => Inertia::render('Village/History'))->name('about-enggano.history');
Route::get('/local-guide', [LocalGuideController::class, 'index'])->name('local-guide.index');
Route::get('/privacy-policy', fn () => Inertia::render('PrivacyPolicy'))->name('privacy-policy');
Route::get('/credits', fn () => Inertia::render('Credits/Index'))->name('credits');
