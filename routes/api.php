<?php

use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\ManagerTourController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\DiaDiemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourController;

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
// Route::put('/addLocation/{location}', [DiaDiemController::class, 'addLocation'])->name('addLocation');

// Route::get('/language/{locale}', [WelcomeController::class, 'changeLanguage'])->name('change-language');
Route::get('/language/change/{locale}', [WelcomeController::class, 'changeLanguage'])->name('change-language');
Route::post('/subscribe', [WelcomeController::class, 'subscribe'])->name('subscribe');
Route::post('/addtoList', [TourController::class, 'add_to_list'])->name('add-to-list');
