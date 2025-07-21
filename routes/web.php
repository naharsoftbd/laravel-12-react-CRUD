<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(ProductController::class)->group(function () {
        Route::resource('products',ProductController::class);
        // Route::get('products',[ProductController::class,'index'])->name('products.index');
        // Route::get('products/create',[ProductController::class,'create'])->name('products.create');
        // Route::post('products',[ProductController::class,'store'])->name('products.store');
        // Route::get('products/{id}/edit',[ProductController::class,'edit'])->name('products.edit');
        // Route::post('products',[ProductController::class,'update'])->name('products.update');
        // Route::DELETE('products/{id}',[ProductController::class,'destroy'])->name('products.destroy');
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
