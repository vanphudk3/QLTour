<?php

namespace App\Http\Controllers;

use App\Models\ChiTietTour;
use App\Models\DiaDiem;
use App\Models\LoaiTour;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DestinationController extends Controller
{
    public function index(Request $request)
    {
        $lang = $request->query('lang')??'en';
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $destinations1 = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten', 'dia_diems.slug', 'hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'dia_diems.slug', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem')
            ->limit(3)
            ->get();
        // dd($inf1);

        $destinations2 = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tour_diadiems.ma_dia_diem', DB::raw('count(tour_diadiems.ma_dia_diem) as sum'),'dia_diems.id', 'dia_diems.ten', 'dia_diems.slug','hinh_anhs.ten as hinh_anh')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1 offset 1)'))
            ->groupBy('dia_diems.id', 'dia_diems.ten', 'dia_diems.slug', 'hinh_anhs.ten', 'tour_diadiems.ma_dia_diem')
            ->offset(3)
            ->limit(6)
            ->get();
        // dd($destinations2);

        foreach($destinations1 as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        foreach($destinations2 as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        return Inertia::render('Destination', compact('destinations1', 'destinations2', 'lang', '_lang'));
    }

    public function show(Request $request,$slug){
        // dd($slug);
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $categories = LoaiTour::select('ten', 'id')->get();
        $locations = DiaDiem::select('ten', 'id', 'slug')->get();
        foreach($locations as $destination){
            $destination->ten = Str::substrReplace($destination->ten, '', 0, 10);
        }
        $destination = DB::table('dia_diems')
            ->select('dia_diems.id', 'dia_diems.ten', 'dia_diems.mo_ta', 'dia_diems.slug')
            ->where('dia_diems.slug', $slug)
            ->first();
        // dd($destination);
        $tours = DB::table('tour_diadiems')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
        ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
        ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
        ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.slug', 'tours.id as ma_tour', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
        ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
        ->where('tours.status', '=', 'active')
        ->where('tour_diadiems.ma_dia_diem', $destination->id)
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
        // foreach ($tours as $tour) {
        //     $tour->gia_nguoi_lon = number_format($tour->gia_nguoi_lon, 0, ',', '.');
        // }
        $lastdealsTours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->where('tours.ngay_khoi_hanh', '<=', Carbon::tomorrow())
            ->limit(3)
            ->get();

        // foreach ($lastdealsTours as $lastdealsTour) {
        //     $lastdealsTour->gia_nguoi_lon = number_format($lastdealsTour->gia_nguoi_lon, 0, ',', '.');
        // }

        $price = request('price');
        $category = request('category');
        $depart = request('depart');
        $location = request('destination');
        $max_price = DB::table('tour_diadiems')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
        ->select(DB::raw('max(gia_nguoi_lon) as max_price'))
        ->where('tours.status', '=', 'active')
        ->where('tour_diadiems.ma_dia_diem', $destination->id)
        // ->groupBy('id', 'gia_nguoi_lon')
        ->orderBy('max_price', 'desc')
        ->first();
        $min_price = DB::table('tour_diadiems')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
        ->select(DB::raw('min(gia_nguoi_lon) as min_price'))
        ->where('tours.status', '=', 'active')
        ->where('tour_diadiems.ma_dia_diem', $destination->id)
        // ->groupBy('id', 'gia_nguoi_lon', 'tours.ngay_khoi_hanh')
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

        return Inertia::render('Destination/Show',  compact('locations', 'categories', 'tours', 'countTour', 'category', 'price', 'budget', 'departures', 'depart', 'location', 'lastdealsTours', 'questions', 'destination', 'lang', '_lang'));
    }

    public function getLanguage($lang)
    {
        $this->language = $lang??'en';
    
        // dd($this->language);
        $langFilePath = base_path('lang/' . $this->language . '/home.php');
        if (file_exists($langFilePath)) {
            $lang = include $langFilePath;
            $data = array();
            foreach ($lang as $key => $value) {
                $data[$key] = $value;
            }
            return $data;
        } else {
            return array();
        }
    }
}

