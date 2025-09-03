<?php

use App\Http\Controllers\Api\AnggotaController;
use App\Http\Controllers\Api\BukuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('buku', [BukuController::class, 'index'])
    ->name('api.buku.index');

Route::post('buku', [BukuController::class, 'store'])
    ->name('api.buku.store');

// Route::get('buku/{id}', [BukuController::class, 'show'])
//     ->name('api.buku.show');

Route::put('buku/{id}', [BukuController::class, 'update'])
    ->name('api.buku.update');

Route::delete('buku/{id}', [BukuController::class, 'destroy'])
    ->name('api.buku.destroy');


// anggota route
Route::get('anggota', [AnggotaController::class, 'index'])
    ->name('api.anggota.index');

Route::post('anggota', [AnggotaController::class, 'store'])
    ->name('api.anggota.store');

// Route::get('anggota/{id}', [AnggotaController::class, 'show'])
//     ->name('api.anggota.show');

Route::put('anggota/{idKey}', [AnggotaController::class, 'update'])
    ->name('api.anggota.update');

Route::delete('anggota/{idKey}', [AnggotaController::class, 'destroy'])
    ->name('api.anggota.destroy');






