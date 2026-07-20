<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KknLogController;
use App\Http\Controllers\LocalGuideController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\VillageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
Route::get('/destinations/{slug}', [DestinationController::class, 'show'])->name('destinations.show');
Route::get('/accommodations', [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/accommodations/{id}', [AccommodationController::class, 'show'])->name('accommodations.show');
Route::get('/kkn-log', [KknLogController::class, 'index'])->name('kkn.index');
Route::get('/kkn-log/{slug}', [KknLogController::class, 'show'])->name('kkn.show');
Route::get('/villages', [VillageController::class, 'index'])->name('villages.index');
Route::get('/villages/history', fn () => Inertia::render('Village/History'))->name('villages.history');
Route::get('/villages/{slug}', [VillageController::class, 'show'])->name('villages.show');
Route::get('/tribes/{slug}', fn ($slug) => Inertia::render('Village/Tribe', ['id' => $slug]))->name('tribes.show');
Route::get('/umkm', [UmkmController::class, 'index'])->name('umkm.index');
Route::get('/local-guide', [LocalGuideController::class, 'index'])->name('local-guide.index');
Route::get('/privacy-policy', fn () => Inertia::render('PrivacyPolicy'))->name('privacy-policy');
