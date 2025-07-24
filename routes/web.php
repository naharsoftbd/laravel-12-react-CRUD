<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(ProductController::class)->group(function () {
        Route::resource('products',ProductController::class)
                                    ->only('create', 'store')
                                    ->middleware('permission:Create');
        Route::resource('products',ProductController::class)
                                    ->only('edit', 'update')
                                    ->middleware('permission:Edit');
        Route::resource('products',ProductController::class)
                                    ->only('destroy')
                                    ->middleware('permission:Delete');
        Route::resource('products',ProductController::class)
                                    ->only('index', 'show')
                                    ->middleware('permission:View|Create|Edit|Delete');
    });

    Route::controller(UserController::class)->group(function () {
        Route::resource('users',UserController::class)
                                    ->only('create', 'store')
                                    ->middleware('permission:Create');
        Route::resource('users',UserController::class)
                                    ->only('edit', 'update')
                                    ->middleware('permission:Edit');
        Route::resource('users',UserController::class)
                                    ->only('destroy')
                                    ->middleware('permission:Delete');
        Route::resource('users',UserController::class)
                                    ->only('index', 'show')
                                    ->middleware('permission:View|Create|Edit|Delete');
    });

    Route::controller(RoleController::class)->group(function () {
        
        Route::resource('roles',RoleController::class)
                                    ->only('create', 'store')
                                    ->middleware('permission:Create');
        Route::resource('roles',RoleController::class)
                                    ->only('edit', 'update')
                                    ->middleware('permission:Edit');
        Route::resource('roles',RoleController::class)
                                    ->only('destroy')
                                    ->middleware('permission:Delete');
        Route::resource('roles',RoleController::class)
                                    ->only('index', 'show')
                                    ->middleware('permission:View|Create|Edit|Delete');
        
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
