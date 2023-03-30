<?php

namespace App\Http\Controllers;

use App\Enums\TranspostRole;
use App\Http\Resources\ImageResource;
use App\Models\ChiTietTour;
use App\Models\DiaDiem;
use App\Models\Hinh_anh;
use App\Models\KhachHang;
use App\Models\LoaiTour;
use App\Models\Question;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TourController extends Controller
{
    public function index()
    {
        $locations = DiaDiem::select('ten', 'id')->get();
        foreach($locations as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        $categories = LoaiTour::select('ten', 'id')->get();
        $tours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->where(function ($query) {
                if(request('date') && request('where') && request('type')){
                    $query->where('tours.ngay_khoi_hanh', '=', request('date'));
                    $query->where('dia_diems.id', '=', request('where'));
                    $query->where('dia_diems.ma_loai_tour', '=', request('type'));
                }
                if(request('where') && request('type')){
                    $query->where('dia_diems.id', '=', request('where'));
                    $query->where('dia_diems.ma_loai_tour', '=', request('type'));
                }
                if (request('price') && request('price') != 0 ){
                    $query->where('tours.gia_nguoi_lon', '<=', request('price'));
                }
                if (request('category')){
                    $query->where('dia_diems.ma_loai_tour', '=', request('category'));
                }
                if(request('depart')){
                    $query->where('chi_tiet_tours.noi_khoi_hanh', '=', request('depart'));
                }
                if(request('destination')){
                    $query->where('dia_diems.id', '=', request('destination'));
                }
                if(request('date')){
                    $query->where('tours.ngay_khoi_hanh', '=', request('date'));
                }
            })
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.id', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->paginate(6)
            ->withQueryString();
        foreach ($tours as $tour) {
            $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
        }

        $lastdealsTours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->where('tours.ngay_khoi_hanh', '<=', Carbon::tomorrow())
            ->limit(5)
            ->get();
        foreach ($lastdealsTours as $lastdealsTour) {
            $lastdealsTour->gia_nguoi_lon = number_format($lastdealsTour->gia_nguoi_lon, 0, ',', '.');
        }

        $price = request('price');
        $category = request('category');
        $depart = request('depart');
        $location = request('destination');
        $max_price = DB::table('tours')
        ->select(DB::raw('max(gia_nguoi_lon) as max_price'))
        ->groupBy('id', 'gia_nguoi_lon')
        ->orderBy('max_price', 'desc')
        ->first();
        $min_price = DB::table('tours')
        ->select(DB::raw('min(gia_nguoi_lon) as min_price'))
        ->groupBy('id', 'gia_nguoi_lon')
        ->orderBy('min_price', 'asc')
        ->first();
        $budget = [
            'min' => $min_price->min_price,
            'max' => $max_price->max_price,
        ];
        
        $countTour = $tours->count();
        $departures = ChiTietTour::select('noi_khoi_hanh')
        ->groupBy('noi_khoi_hanh')
        ->get();
        $questions = Question::all();

        return Inertia::render('Tour/Tour', compact('locations', 'categories', 'tours', 'countTour', 'category', 'price', 'budget', 'departures', 'depart', 'location', 'lastdealsTours', 'questions'));
    }

    public function show($slug)
    {
        $customer = null;
        if (session()->has('customer')){
            $customer = KhachHang::find(session('customer'));
        }

        $detailTour = DB::table('tour_diadiems')
        ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
        ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('loai_tours', 'dia_diems.ma_loai_tour', '=', 'loai_tours.id')
        ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
        ->select('tours.ten_tour', 'tours.slug','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay','tours.do_tuoi_tu', 'tours.so_cho', 'tours.mo_ta', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'dia_diems.du_lieu_map', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
        ->where('tours.slug', $slug)
        ->groupBy('tours.ten_tour', 'tours.slug','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay','tours.do_tuoi_tu', 'tours.so_cho', 'tours.mo_ta', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'dia_diems.du_lieu_map', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
        ->first();

        $lichTrinh = DB::table('lich_trinhs')
        ->join('tours', 'lich_trinhs.ma_tour', '=', 'tours.id')
        ->select('lich_trinhs.*')
        ->where('tours.slug', $slug)
        ->get();
        foreach($lichTrinh as $lt) {
            $lt->lich_trinh_ngay = date('d-m-Y', strtotime($lt->lich_trinh_ngay));
        }

        $detailTour->gio_khoi_hanh = date('H:i', strtotime($detailTour->gio_khoi_hanh));
        $detailTour->hinh_anh = ImageResource::collection(Hinh_anh::where('ma_dia_diem', $detailTour->id)->get());
        
        if($detailTour->so_cho == 0) {
            $detailTour->so_cho = 'Hết chỗ';
        }
        
        if($detailTour->do_tuoi_tu == 0) {
            $detailTour->do_tuoi_tu = 'Không giới hạn';
        }
        // dd($detailTour->ngay_khoi_hanh);
        $detailTour->ngay_khoi_hanh = date('d/m/Y', strtotime($detailTour->ngay_khoi_hanh));
        $now = strtotime(Carbon::now());
        $getdate = $now - strtotime($detailTour->ngay_khoi_hanh);
        if($getdate > 0){
            $detailTour->ngay_khoi_hanh = 'Đã khởi hành';
        }
        
        $extraServices = DB::table('extra_services')
        ->join('dia_diems', 'extra_services.ma_dia_diem', '=', 'dia_diems.id')
        ->select('extra_services.id', 'extra_services.name', 'extra_services.description', 'extra_services.price')
        ->where('dia_diems.id', $detailTour->id)
        ->get();
        
        $adult = 1;
        $youth = 0;
        $child = 0;
        if(request("adult")) {
            $adult = (int)request("adult")+1;
        }
        if(request("youth")) {
            $youth = (int)request("youth");
        }
        if(request("child")) {
            $child = (int)request("child");
        }
        
        $totalPrice = (float)$detailTour->gia_nguoi_lon*$adult + (float)$detailTour->gia_thieu_nien*$youth + (float)$detailTour->gia_tre_em*$child;
        $forcusAdult = request("adult");
        $forcusYouth = request("youth");
        $forcusChild = request("child");
        return Inertia::render('Tour/Detail-tour', compact('detailTour', 'extraServices', 'lichTrinh', 'totalPrice', 'forcusAdult', 'forcusYouth', 'forcusChild', 'customer'));

    }

}
