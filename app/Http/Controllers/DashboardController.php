<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Order;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        // lấy ra tổng doanh thu của đơn hàng
        $doanh_thu = Order::where('trang_thai', '3')->sum('tong_tien');
        $doanh_thu = number_format($doanh_thu, 0, ',', '.') . ' VND';
        $tong_don_hang = Order::count();
        $cho_xac_nhan = Order::where('trang_thai', '1')->count();
        $da_xac_nhan = Order::where('trang_thai', '2')->count();
        // doanh thu từ tháng 1 đên tháng hiện tại
        // $doanh_thu_thang = Order::where('trang_thai', '3')
        //     ->whereMonth('created_at', date('m'))
        //     ->whereYear('created_at', date('Y'))
        //     ->sum('tong_tien');

        // dd($doanh_thu_thang);
        // chạy vòng lặp để lấy ra doanh thu từ tháng 1 đến tháng hiện tại
        for($i = 1; $i <= date('m'); $i++){
            $doanh_thu_thang = Order::where('trang_thai', '3')
                ->whereMonth('created_at', $i)
                ->whereYear('created_at', date('Y'))
                ->sum('tong_tien');
            // $doanh_thu_thang = number_format($doanh_thu_thang, 0, ',', '.') . ' VND';
            $doanh_thu_thang_arr[] = $doanh_thu_thang;
        }

        $data = [
            'categories' => $categories,
            'locations' => $locations,
            'extra_services' => $extra_services,
            'tours' => $tours,
            'schedule' => $schedule,
            'doanh_thu' => $doanh_thu,
            'tong_don_hang' => $tong_don_hang,
            'cho_xac_nhan' => $cho_xac_nhan,
            'da_xac_nhan' => $da_xac_nhan,
            'doanh_thu_thang_arr' => $doanh_thu_thang_arr
        ];

        return Inertia::render('Dashboard', compact('data'));
    }
}
