<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Dashboard\PermissionController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(ProductController::class)->group(function () {
        Route::resource('products',ProductController::class)->middleware('permission:products.menu');
    });

    Route::controller(UserController::class)->group(function () {
        Route::resource('users',UserController::class)->middleware('permission:users.menu');
    });

    Route::controller(RoleController::class)->group(function () {
        
        Route::resource('roles',RoleController::class)->middleware('permission:roles.menu'); 
        
    });

    Route::controller(PermissionController::class)->group(function () {
        
        Route::resource('permissions',PermissionController::class)->middleware('permission:permissions.menu');        
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
