<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\BinhLuanController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\DiaDiemController;
use App\Http\Controllers\ExtraServiceController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\LichTrinhController;
use App\Http\Controllers\LoaiTourController;
use App\Http\Controllers\ManagerBlogController;
use App\Http\Controllers\ManagerTourController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SendEmailController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\CheckLoginCustomer;
use App\Http\Controllers\KhuyenMai;
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

// Route::group(['prefix' => '{language}'], function ($language) {
//     config(['app.locale' => $language]); //đặt dòng này ở đầu
    
//     //Toàn bộ các route khác đặt ở đây.
// });


Route::get('/', [WelcomeController::class, 'index'])->name('welcome');



Route::group(['middleware' => 'locale'], function() {
    Route::get('?lang={locale}', [WelcomeController::class, 'index'])->name('welcome-locale');
    Route::get('/tour?lang={locale}', [TourController::class, 'index'])->name('tour-locale');
    Route::get('/tour/{slug}?lang={locale}', [TourController::class, 'show'])->name('tour.show-locale');
    Route::get('/destination?lang={locale}', [DestinationController::class, 'index'])->name('destination-locale');
    Route::get('/destination/{slug}?lang={locale}', [DestinationController::class, 'show'])->name('destination.show-locale');
    Route::get('/booking?lang={locale}', [BookingController::class, 'booking'])->name('booking-locale');
    Route::get('/checkout?lang={locale}', [BookingController::class, 'checkout'])->name('checkout-locale');
    Route::get('/blog?lang={locale}', [BlogController::class, 'index'])->name('blog-locale');
    Route::get('/blog/{slug}?lang={locale}', [BlogController::class, 'show'])->name('blog.show-locale');
    Route::get('/profileMember?lang={locale}', [KhachHangController::class, 'profile'])->name('customer.profile-locale');
    Route::get('/loginMember?lang={locale}', [KhachHangController::class, 'login'])->name('customer.login-locale');
    Route::get('/registerMember?lang={locale}', [KhachHangController::class, 'register'])->name('customer.register-locale');
    Route::get('/logoutMember?lang={locale}', [KhachHangController::class, 'logout'])->name('customer.logout-locale');
    Route::get('/profileMember?lang={locale}', [KhachHangController::class, 'profile'])->name('customer.profile-locale');
    });

    Route::get('storage/{filename}', [WelcomeController::class, 'displayImage'])->name('image');
    Route::get('/tour', [TourController::class, 'index'])->name('tour');
    Route::get('/api/getlocation', [TourController::class, 'get_locations'])->name('getlocation-api');
    Route::get('/api/tour', [TourController::class, 'search_tour'])->name('tour-api');
    Route::get('/tour/{slug}', [TourController::class, 'show'])->name('tour.show');
    Route::post('/tour/review', [BinhLuanController::class, 'store'])->name('review.store');
    Route::get('destination', [DestinationController::class, 'index'])->name('destination');
    Route::get('destination/{slug}', [DestinationController::class, 'show'])->name('destination.show');
    // seeking for price tour
    Route::get('/tour/price/{price}', [SearchController::class, 'price'])->name('tour.price');
    // seeking for category tour
    Route::get('/tour/category/{category}', [SearchController::class, 'category'])->name('tour.category');
    // seeking for location tour
    Route::get('/tour/location/{location}', [SearchController::class, 'location'])->name('tour.location');
    
    Route::get('/booking', [BookingController::class, 'booking'])->name('booking');
    Route::get('/api/coupon/{coupon}', [BookingController::class, 'apply_coupon'])->name('coupon-api');
    Route::get('/checkout', [BookingController::class, 'checkout'])->name('checkout');
    
    Route::get('/blog', [BlogController::class, 'index'])->name('blog');
    Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
    
    Route::post('loginMember', [KhachHangController::class, 'process_login'])->name('customer.process_login');
    Route::post('registerMember', [KhachHangController::class, 'process_register'])->name('customer.process_register');
    Route::get('logoutMember', [KhachHangController::class, 'logout'])->name('customer.logout');
    
    
    Route::group(['middleware' => CheckLoginCustomer::class], function () {
        Route::get('loginMember', [KhachHangController::class, 'login'])->name('customer.login');
        Route::get('registerMember', [KhachHangController::class, 'register'])->name('customer.register');
    });
    Route::get('profileMember', [KhachHangController::class, 'profile'])->name('customer.profile');
    
    
    Route::middleware('cors')->group(function(){
        Route::post('/checkout', [BookingController::class, 'process'])->name('checkout.process');
    });
    Route::get('/checkout/success', [BookingController::class, 'success'])->name('checkout.success');
    
    Route::get('/test-mail', [SendEmailController::class, 'index'])->name('test-mail');
    // Route::get('/search/{search}', [SearchController::class, 'search'])->name('search');


Route::middleware(['auth','verified'])->group(function () {
    Route::get('/auth/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('/auth/managerblog', ManagerBlogController::class);
    Route::resource('/auth/role', RoleController::class);
    Route::resource('/auth/account', AccountController::class);
    Route::resource('/auth/managerTour', ManagerTourController::class);
    // Route::get('/auth/slug', [ManagerTourController::class, 'proccess_slug'])->name('managerTour.slug');
    Route::resource('/auth/category', LoaiTourController::class);
    Route::resource('/auth/location', DiaDiemController::class);
    Route::post('/auth/location', [DiaDiemController::class, 'store'])->name('location.store');
    Route::put('/api/addLocation/{location}', [DiaDiemController::class, 'addLocation'])->name('location.addLocation');
    Route::put('/api/removeLocation/{location}', [DiaDiemController::class, 'removeLocation'])->name('location.removeLocation');

    // Route::post('/auth/location', [DiaDiemController::class, 'process'])->name('location.process');
    Route::resource('/auth/extraService', ExtraServiceController::class);
    Route::resource('/auth/question', QuestionController::class);
    Route::resource('/auth/schedule', LichTrinhController::class);
    Route::post('/api/schedule/updatestatus', [LichTrinhController::class, 'updateStatus'])->name('lichtrinh.updateStatus');
    Route::get('/api/schedule/search', [LichTrinhController::class, 'search'])->name('lichtrinh.search');
    Route::get('/api/schedule/checkorder/{lichtrinh}', [LichTrinhController::class, 'checkOrder'])->name('lichtrinh.checkOrder');
    Route::delete('/api/schedule/delete/{lichtrinh}', [LichTrinhController::class, 'delete'])->name('lichtrinh.delete');
    Route::get('/api/nhanvien', [LichTrinhController::class, 'nhanvien'])->name('lichtrinh.nhanvien');
    Route::resource('/auth/order', OrderController::class);
    Route::get('/auth/order/{order}/browse', [OrderController::class, 'browse_order'])->name('order.browse');

    Route::get('/auth/khuyenmai', [KhuyenMai::class, 'index'])->name('khuyenmai.index');
    Route::get('/auth/khuyenmai/create', [KhuyenMai::class, 'create'])->name('khuyenmai.create');
    Route::post('/auth/khuyenmai', [KhuyenMai::class, 'store'])->name('khuyenmai.store');
    Route::get('/auth/khuyenmai/{id}/edit', [KhuyenMai::class, 'edit'])->name('khuyenmai.edit');
    Route::put('/auth/khuyenmai/{id}', [KhuyenMai::class, 'update'])->name('khuyenmai.update');
    Route::get('/api/khuyenmai/search', [KhuyenMai::class, 'search'])->name('khuyenmai.search');
    Route::delete('/auth/khuyenmai/{id}', [KhuyenMai::class, 'destroy'])->name('khuyenmai.destroy');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
