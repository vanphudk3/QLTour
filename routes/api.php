<?php

use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\ManagerTourController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/profileMember/{id}/update', [KhachHangController::class, 'updateProfileMember']);
Route::post('/profileMember/{id}/cancelorder', [KhachHangController::class, 'cancelorder']);

Route::get('/search/{search}', [SearchController::class, 'search'])->name('search');