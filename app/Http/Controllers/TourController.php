<?php

namespace App\Http\Controllers;

use App\Enums\TranspostRole;
use App\Http\Resources\ImageResource;
use App\Models\BinhLuan;
use App\Models\ChiTietTour;
use App\Models\DiaDiem;
use App\Models\Hinh_anh;
use App\Models\KhachHang;
use App\Models\LoaiTour;
use App\Models\Order;
use App\Models\Question;
use App\Models\Tour;
use App\Models\Tour_yeu_thich;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Session;
use Illuminate\Support\Facades\Cookie;

class TourController extends Controller
{
    public function index(Request $request)
    {
        $type = request('type')??'';
        $where = request('where')??'';
        $date = request('date')??'';

        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $frompage = 'tour';
        if ($type == 0 || $type == '') {
            $locations = DiaDiem::all();
        } else
        $locations = DiaDiem::select('ten', 'id')->where('ma_loai_tour', $type)->get();
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
            ->whereExists(function ($query) {
                if(request('date')){
                $query->select(DB::raw(1))
                ->from('tour_ngay')
                ->whereColumn('tour_ngay.ma_tour', 'tours.id')
                ->where('tour_ngay.ngay', '=', strtotime(request('date')))
                ->where('tour_ngay.is_delete', 0);

                }

            })
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
            })
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.id', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->paginate(6)
            ->withQueryString();
        foreach ($tours as $tour) {
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
        $countTour = $tours->count();
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
        // foreach ($lastdealsTours as $lastdealsTour) {
        //     $lastdealsTour->gia_nguoi_lon = number_format($lastdealsTour->gia_nguoi_lon, 0, ',', '.');
        // }

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
        
        $departures = ChiTietTour::select('noi_khoi_hanh')
        ->groupBy('noi_khoi_hanh')
        ->get();
        $questions = Question::all();

        return Inertia::render('Tour/Tour', compact('locations', 'categories', 'tours', 'countTour', 'category', 'price', 'budget', 'departures', 'depart', 'location', 'lastdealsTours', 'questions', 'lang', '_lang', 'type', 'where', 'date', 'frompage'));
    }

    public function show(Request $request,$slug)
    {
        $lang = $request->query('lang');
        $_lang = $lang;
        $lang = $this->getLanguage($lang);
        $customer = null;
        $detailTour = DB::table('tour_diadiems')
        ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
        ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('loai_tours', 'dia_diems.ma_loai_tour', '=', 'loai_tours.id')
        ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
        ->select('tours.id as ma_tour','tours.ten_tour', 'tours.slug','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay','tours.do_tuoi_tu', 'tours.so_cho', 'tours.mo_ta', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'dia_diems.du_lieu_map', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
        ->where('tours.slug', $slug)
        ->groupBy('tours.id','tours.ten_tour', 'tours.slug','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay','tours.do_tuoi_tu', 'tours.so_cho', 'tours.mo_ta', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'dia_diems.du_lieu_map', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
        ->first();

        $comments = DB::table('binh_luans')
        ->join('khach_hangs', 'binh_luans.ma_khach_hang', '=', 'khach_hangs.id')
        ->select('binh_luans.id', 'binh_luans.so_sao', 'binh_luans.noi_dung', 'binh_luans.created_at', 'khach_hangs.ten_khach_hang')
        ->where('binh_luans.ma_tour', $detailTour->ma_tour)
        ->get();
        $detailCmt = [];
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
            $detailCmt['amountRate'] = $amoutRate;
            $detailCmt['agvRate'] = $agvRate;
            $detailCmt['countCmt'] = $comments->count();
            $detailCmt['start'] = $start;
        }
        // kiểm tra mỗi tour chỉ cho phép được comment 1 lần theo lần đặt
        $detailTour->isCommented = false;
        
        if (session()->has('customer')){
            $customer = KhachHang::find(session('customer'));
            // $order = $customer->orders()->get();
        }
        if (isset($_COOKIE['remember'])){
            $remember = request()->cookie('remember');
            $customer = KhachHang::where('remember_token', $remember)->first();
        }
        if(session()->has('customer') || isset($_COOKIE['remember'])){
            $order = $customer->orders()->get();
            if ($order != null){
                $arrListTourFormCustomer = [];
                foreach ($order as $key => $item) {
                    $arrListTourFormCustomer['status'][$key] = $item->trang_thai;
                    $order_detail = $item->order_detail()->get();
                    foreach ($order_detail as $item) {
                        $arrListTourFormCustomer['TourID'][$key] = $item->tour()->first('id');
                    }
                }
            }
            // kiểm tra tour đã đặt chưa
            $count = 1;
            if ($arrListTourFormCustomer != null){
                foreach ($arrListTourFormCustomer as $key => $item) {
                    if($key == 'status'){
                        foreach ($item as $key => $value) {
                            // neu trang thai = 0 thi tour chua duoc dat
                            if($value == 0){
                                if ($arrListTourFormCustomer['TourID'][$key]->id == $detailTour->ma_tour){
                                    $detailTour->isBooked = 0;
                                }
                            }
                            // neu trang thai = 1 thi tour chua duoc duyet
                            if($value == 1){
                                if ($arrListTourFormCustomer['TourID'][$key]->id == $detailTour->ma_tour){
                                    $detailTour->isBooked = 1;
                                }
                            }
                            // neu trang thai = 2 thi tour da dat thanh cong
                            if($value == 2){
                                if ($arrListTourFormCustomer['TourID'][$key]->id == $detailTour->ma_tour){
                                    $detailTour->isBooked = 2;
                                }
                            }
                            if($value == 3){
                                if ($arrListTourFormCustomer['TourID'][$key]->id == $detailTour->ma_tour){
                                    $detailTour->isBooked = 3;
                                    $detailTour->count = $count++;
                                }
                            }
                        }
                    }
                }
            }
            // kiểm tra mỗi tour chỉ cho phép được comment 1 lần
            $comment = $customer->binhLuan()->get();
            $arrListTourFormCustomer = [];
            $count = 1;
            foreach ($comment as $key => $item) {
                $arrListTourFormCustomer['TourID'][$key] = $item->tour()->first('id');
            }
            if ($arrListTourFormCustomer != null){
                foreach ($arrListTourFormCustomer as $key => $item) {
                    if($key == 'TourID'){
                        foreach ($item as $key => $value) {
                            if ($value->id == $detailTour->ma_tour){
                                $detailTour->iscoment = $count++;
                            }
                        }
                    }
                }
            }
        }

        // lấy ra danh sách ngày khởi hành của tour
        $detailTour->tour_ngay = DB::table('tour_ngay')
        ->select('*')
        ->where('ma_tour', $detailTour->ma_tour)
        ->get();
        // trừ đi 1 ngày để hiển thị đúng ngày khởi hành
        foreach($detailTour->tour_ngay as $lt) {
            $lt->ngay = date('Y-m-d', $lt->ngay - 86400);
            $lt->so_cho = $lt->so_cho - $lt->so_cho_da_dat;
        }

        // $detailTour->gio_khoi_hanh = strtotime($detailTour->gio_khoi_hanh);

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
        $now = strtotime(Carbon::now());
        $getdate = $now - strtotime($detailTour->ngay_khoi_hanh);
        $detailTour->ngay_khoi_hanh = date('d/m/Y', strtotime($detailTour->ngay_khoi_hanh));
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

        // tour yêu thích theo khách hàng đang đăng nhập
        $tour_yeu_thich = null;
        if (session()->has('customer')){
            $customer = KhachHang::find(session('customer'));
            $tour_yeu_thich = Tour_yeu_thich::where('khach_hang_id', $customer->id)->where('tour_id', $detailTour->ma_tour)->first();
        }
        if (isset($_COOKIE['remember'])){
            $remember = request()->cookie('remember');
            $customer = KhachHang::where('remember_token', $remember)->first();
            $tour_yeu_thich = Tour_yeu_thich::where('khach_hang_id', $customer->id)->where('tour_id', $detailTour->ma_tour)->where('status', 1)->first();
        }

        if(isset($tour_yeu_thich) && $tour_yeu_thich != null){
            $detailTour->isFavorite = true;
        }else{
            $detailTour->isFavorite = false;
        }

        return Inertia::render('Tour/Detail-tour', compact('detailTour', 'extraServices', 'lichTrinh', 'totalPrice', 'forcusAdult', 'forcusYouth', 'forcusChild', 'customer', 'comments', 'detailCmt', 'lang', '_lang'));

    }

    public function get_locations(Request $request) {
        $type = $request->type??'';
        if ($type == 0) {
            $diadiems = DiaDiem::all();
            return response()->json($diadiems);
        } else {
            $diadiems = DiaDiem::where('ma_loai_tour', $type)->get();
            return response()->json($diadiems);
        }
    }

    public function search_tour(Request $request) {
        $page = $request->page??'';
        $type = $request->type??'';
        $where = $request->where??'';
        $date = $request->date??'';
        $price = $request->price??'';
        $category = $request->category??'';
        $depart = $request->depart??'';
        $destination = $request->destination??'';
        // $date = $request->date??'';
        $lang = $request->query('lang');
        $lang = $this->getLanguage($lang);

        if (request('star')) {
            $star = request('star');
            $star = explode(',', $star);
            $binhluan = BinhLuan::select('ma_tour', DB::raw('avg(so_sao) as avg_star'))
            ->groupBy('ma_tour')
            ->get();
            $filteredBinhluan = collect();

            foreach ($binhluan as $value) {
                foreach ($star as $item) {
                    if ($value->avg_star >= $item) {
                        $filteredBinhluan->push($value);
                        break;
                    }
                }
            }
            $binhluan = $filteredBinhluan->pluck('ma_tour');
            $tours = DB::table('tour_diadiems')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->whereExists(function ($query) {
                if(request('date')){
                $query->select(DB::raw(1))
                ->from('tour_ngay')
                ->whereColumn('tour_ngay.ma_tour', 'tours.id')
                ->where('tour_ngay.ngay', '=', strtotime(request('date')))
                ->where('tour_ngay.is_delete', 0);
                }

            })
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
            })
            ->whereIn('tours.id', $binhluan)
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.id', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->paginate(6)
            ->withQueryString()
            ;
        } else {
        $tours = DB::table('tour_diadiems')
        ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
        ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            // ->join('binh_luans', 'tours.id', '=', 'binh_luans.ma_tour')
            ->select('dia_diems.id', 'dia_diems.dia_chi', 'tours.id as ma_tour', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten')
            ->where(DB::raw('hinh_anhs.id'), DB::raw('(SELECT id FROM hinh_anhs WHERE hinh_anhs.ma_dia_diem = dia_diems.id LIMIT 1)'))
            ->where('tours.status', '=', 'active')
            ->whereExists(function ($query) {
                if(request('date')){
                $query->select(DB::raw(1))
                ->from('tour_ngay')
                ->whereColumn('tour_ngay.ma_tour', 'tours.id')
                ->where('tour_ngay.ngay', '=', strtotime(request('date')))
                ->where('tour_ngay.is_delete', 0);
                }

            })
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
                // if(request('date')){
                //     // $query->where('tours.ngay_khoi_hanh', '=', request('date'));
                //     // truy vấn con vào table tour_ngay
                //     $query->where('tours.id', '=', DB::raw('(SELECT ma_tour FROM tour_ngay WHERE ngay = "'.strtotime(request('date')).'" LIMIT 1)'));
                // }
            })
            ->groupBy('dia_diems.id', 'dia_diems.dia_chi', 'tours.id', 'tours.slug', 'tours.ten_tour', 'tours.gia_nguoi_lon', 'tours.so_ngay', 'tours.ngay_khoi_hanh', 'hinh_anhs.ten', 'tours.id')
            ->paginate(6)
            ->withQueryString()
            ;
        }
        $countTour = $tours->count();

        foreach ($tours as $tour) {
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
        return response()->json(['tours' => $tours, 'countTour' => $countTour]);
    }

    public function add_to_list(Request $request) {
        $data = $request->all();
        $customer = null;
        if (session()->has('customer')){
            $customer = KhachHang::find(session('customer'));
            // $order = $customer->orders()->get();
        }
        // Determine if a cookie exists on the request.
        $remember = $request->cookie('remember');

        if (isset($_COOKIE['remember'])){

            $remember = request()->cookie('remember');
            $customer = KhachHang::where('remember_token', $remember)->first();
        }        
        if (empty($customer)) {
        $customer = KhachHang::where('id', $data['id_customer'])->first();
        }
        if ($customer != null){
            $check = Tour_yeu_thich::where('khach_hang_id', $customer->id)->where('tour_id', $data['id'])->first();
            if ($check != null){
                // nếu có thì câp nhật lại trạng thái
                $check->status = $data['status'];
                $check->saveOrFail();
            } else {
                $tour_yeu_thich = new Tour_yeu_thich;
                $tour_yeu_thich->khach_hang_id = $customer->id;
                $tour_yeu_thich->tour_id = $data['id'];
                $tour_yeu_thich->status = $data['status'];
                $tour_yeu_thich->saveOrFail();
            }
                return response()->json(['success' => 'Đã thêm vào danh sách yêu thích']);
        } else {
            return response()->json(['error' => 'Vui lòng đăng nhập để thêm vào danh sách yêu thích']);
        }
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
