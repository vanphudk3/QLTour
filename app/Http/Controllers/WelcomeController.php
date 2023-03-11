<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\LoaiTour;
use App\Models\Tour;
use App\Models\Tour_DiaDiem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class WelcomeController extends Controller
{
    public function index()
    {
        $tours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->get();
            
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        
        $today = date('d/m/Y', strtotime($today));
        $yesterday = date('d/m/Y', strtotime($yesterday));
            
            
        foreach($tours as $tour){
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
            $tour->ngay_khoi_hanh = date('d/m/Y', strtotime($tour->ngay_khoi_hanh));
        }

        $locations = DiaDiem::select('ten', 'id')
            ->where(function ($query){
                if(request('type')){
                    $query->where('ma_loai_tour', '=', request('type'));
                }
            })
            ->get();
            // dd($locations);
        foreach($locations as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        $categories = LoaiTour::select('ten', 'id')->get();

        $destinations1 = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten', 'hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem')
            ->limit(2)
            ->get();
        // dd($inf1);

        $destinations2 = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten','hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem')
            ->offset(2)
            ->limit(3)
            ->get();
        // dd($inf2);

        foreach($destinations1 as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        foreach($destinations2 as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }

        $lastMinuteTours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->orderBy('tours.ngay_khoi_hanh', 'asc')
            ->get();
        foreach($lastMinuteTours as $tour){
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
        }

        return Inertia::render('Home/Welcome', compact('tours', 'locations', 'categories', 'destinations1', 'destinations2', 'lastMinuteTours'));
    }
}
