<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ChiTietTourController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\DiaDiemController;
use App\Http\Controllers\ExtraServiceController;
use App\Http\Controllers\LichTrinhController;
use App\Http\Controllers\LoaiTourController;
use App\Http\Controllers\ManagerTourController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/tour', [TourController::class, 'index'])->name('tour');
Route::get('/tour/{slug}', [TourController::class, 'show'])->name('tour.show');
Route::get('destination', [DestinationController::class, 'index'])->name('destination');
Route::get('destination/{slug}', [DestinationController::class, 'show'])->name('destination.show');
// seeking for price tour
Route::get('/tour/price/{price}', [SearchController::class, 'price'])->name('tour.price');
// seeking for category tour
Route::get('/tour/category/{category}', [SearchController::class, 'category'])->name('tour.category');
// seeking for location tour
Route::get('/tour/location/{location}', [SearchController::class, 'location'])->name('tour.location');

Route::get('/booking', [ChiTietTourController::class, 'booking'])->name('booking');
Route::post('/booking/getDistricts', [ChiTietTourController::class, 'getDistricts'])->name('getDistricts');
Route::post('/booking/getWards', [ChiTietTourController::class, 'getWards'])->name('getWards');

Route::get('/checkout', [ChiTietTourController::class, 'checkout'])->name('checkout');

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/auth/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('/auth/role', RoleController::class);
    Route::resource('/auth/account', AccountController::class);
    Route::resource('/auth/managerTour', ManagerTourController::class);
    Route::resource('/auth/category', LoaiTourController::class);
    Route::resource('/auth/location', DiaDiemController::class);
    Route::post('/auth/location', [DiaDiemController::class, 'store'])->name('location.store');
    // Route::post('/auth/location', [DiaDiemController::class, 'process'])->name('location.process');
    Route::resource('/auth/extraService', ExtraServiceController::class);
    Route::resource('/auth/question', QuestionController::class);
    Route::resource('/auth/schedule', LichTrinhController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
