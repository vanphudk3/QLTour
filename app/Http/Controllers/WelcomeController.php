<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\DiaDiem;
use App\Models\KhachHang;
use App\Models\LoaiTour;
use App\Models\Order;
use App\Models\Tour;
use App\Models\Tour_DiaDiem;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cookie;
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
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.ten_tour', 'tours.slug', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.id', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten','tours.slug')
            ->get();         
        foreach($tours as $tour){
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
            $tour->ngay_khoi_hanh = date('d/m/Y', strtotime($tour->ngay_khoi_hanh));
            $comments = DB::table('binh_luans')
                ->join('khach_hangs', 'binh_luans.ma_khach_hang', '=', 'khach_hangs.id')
                ->select('binh_luans.id', 'binh_luans.so_sao', 'binh_luans.noi_dung', 'binh_luans.created_at', 'khach_hangs.ten_khach_hang')
                ->where('binh_luans.ma_tour', $tour->ma_tour)
                ->get();
            if ($comments != null) {
                $amoutRate = 0;
                $start = [];
                // dem so sao
                $flag5 = 0;
                $flag4 = 0;
                $flag3 = 0;
                $flag2 = 0;
                $flag1 = 0;
                $start['five'] = 0;
                $start['four'] = 0;
                $start['three'] = 0;
                $start['two'] = 0;
                $start['one'] = 0;
                foreach ($comments as $key => $comment) {
                    $amoutRate += $comment->so_sao;
                    if($comment->so_sao == 5){
                        $flag5 += 1;
                        $start['five'] = $flag5;
                    }
                    if($comment->so_sao == 4){
                        $flag4 += 1;
                        $start['four'] = $flag4;
                    }
                    if($comment->so_sao == 3){
                        $flag3 += 1;
                        $start['three'] = $flag3;
                    }
                    if($comment->so_sao == 2){
                        $flag2 += 1;
                        $start['two'] = $flag2;
                    }
                    if($comment->so_sao == 1){
                        $flag1 += 1;
                        $start['one'] = $flag1;
                    }
                }
                if ($comments->count() == 0) {
                    $agvRate = 0;
                }else{
                    $agvRate = (float)($amoutRate / $comments->count());
                }
                $tour->rating = $agvRate;
            }
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
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten', 'dia_diems.slug', 'hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem','dia_diems.slug')
            ->limit(2)
            ->get();
        // dd($inf1);

        $destinations2 = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten', 'dia_diems.slug','hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem','dia_diems.slug')
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

        $specialBlogs = Blog::orderBy('created_at', 'desc')->first();
        $specialBlogs->nameUser = $specialBlogs->user->name;
        $forcusBlogs = Blog::orderBy('created_at', 'desc')->take(3)->skip(1)->get();
        foreach($forcusBlogs as $key => $forcusBlog){
            $forcusBlogs[$key]->nameUser = $forcusBlog->user->name;
            $forcusBlogs[$key]->formartDate = Carbon::parse($forcusBlog->created_at)->format('d/m/Y');
        }
        $specialBlogs->formartDate = Carbon::parse($specialBlogs->created_at)->format('d/m/Y');
        return Inertia::render('Home/Welcome', compact('tours', 'locations', 'categories', 'destinations1', 'destinations2', 'lastMinuteTours', 'specialBlogs', 'forcusBlogs'));
    }
}
