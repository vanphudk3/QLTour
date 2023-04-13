<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\LoaiTour;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $tours = Tour::where('ten_tour', 'like', '%'.$search.'%')->paginate(6);
        $countTour = Tour::count();
        return Inertia::render('Tour', compact('tours', 'countTour'));
    }

    public function price($price)
    {
        $locations = DiaDiem::select('ten', 'id')->get();
        $categories = LoaiTour::select('ten', 'id')->get();
        $tours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->where('tours.gia_nguoi_lon', '<=', $price)
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->paginate(6);
        foreach ($tours as $tour) {
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
        }
        
        $focusCategory['id'] = 0;
        
        $countTour = Tour::count();
        return Inertia::render('Tour', compact('tours', 'countTour', 'locations', 'categories', 'focusCategory', 'price'));
    }

    public function category($category)
    {
        $locations = DiaDiem::select('ten', 'id')->get();
        $categories = LoaiTour::select('ten', 'id')->get();
        $tours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten', 'dia_diems.ma_loai_tour')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->where('dia_diems.ma_loai_tour', '=', $category)
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten','dia_diems.ma_loai_tour')
            ->paginate(6);
        foreach ($tours as $tour) {
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
        }

        $focusCategory = LoaiTour::where('id', $category)->first();

        $countTour = $tours->count();
        return Inertia::render('Tour', compact('locations', 'categories', 'tours', 'countTour', 'focusCategory'));
    }

    public function location(Request $request)
    {
        $location = $request->get('location');
        $tours = Tour::where('dia_diem_id', 'like', '%'.$location.'%')->paginate(6);
        $countTour = Tour::count();
        return Inertia::render('Tour', compact('tours', 'countTour'));
    }

    public function search($search){
        $tours = DB::table('tours')
            ->join('tour_diadiems', 'tours.id', '=', 'tour_diadiems.ma_tour')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tours.ten_tour', 'tours.slug', 'tours.gia_nguoi_lon', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('ten_tour', 'like', '%'.$search.'%')
            ->limit(5)
            ->get();
        return response()->json([
            'tours' => $tours,
        ]);
    }
}
