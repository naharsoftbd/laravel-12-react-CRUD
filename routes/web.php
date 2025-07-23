<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(ProductController::class)->group(function () {
        Route::resource('products',ProductController::class);
    });

    Route::controller(UserController::class)->group(function () {
        Route::resource('users',UserController::class);
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
