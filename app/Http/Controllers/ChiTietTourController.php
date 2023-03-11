<?php

namespace App\Http\Controllers;

use App\Models\ChiTietTour;
use App\Models\City;
use App\Models\District;
use App\Models\Ward;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChiTietTourController extends Controller
{

    public function booking(){
        
        $detailTour = null;
        if(request("tourId")){
            $detailTour = DB::table('tour_diadiems')
            ->join('tours', 'tour_diadiems.ma_tour', '=', 'tours.id')
            ->join('chi_tiet_tours', 'tours.id', '=', 'chi_tiet_tours.ma_tour')
            ->join('dia_diems', 'tour_diadiems.ma_dia_diem', '=', 'dia_diems.id')
            ->join('loai_tours', 'dia_diems.ma_loai_tour', '=', 'loai_tours.id')
            ->join('hinh_anhs', 'dia_diems.id', '=', 'hinh_anhs.ma_dia_diem')
            ->select('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten as hinh_anh', 'loai_tours.ten as loai_tour', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->where('tours.slug', request("tourId"))
            ->groupBy('tours.ten_tour', 'tours.ky_hieu', 'tours.transpost','tours.gia_nguoi_lon', 'tours.gia_thieu_nien', 'tours.gia_tre_em','tours.so_ngay', 'tours.so_dem','tours.do_tuoi_tu', 'tours.so_cho', 'tours.ngay_khoi_hanh', 'dia_diems.dia_chi', 'dia_diems.id', 'hinh_anhs.ten', 'loai_tours.ten', 'chi_tiet_tours.noi_khoi_hanh','chi_tiet_tours.noi_tap_chung','chi_tiet_tours.gio_khoi_hanh')
            ->first();
            // dd($detailTour);
            $detailTour->ngay_khoi_hanh = date("d/m/Y", strtotime($detailTour->ngay_khoi_hanh));
            if(request("totalPrice")){
                $detailTour->totalPrice = request("totalPrice");
            }
            // $detailTour->subtotal = 0;
            // $detailTour->counttraveller = 0;

            $detailTour->adults = (request("adult") + 1);
            $detailTour->priceAdults = (request("adult") + 1) * $detailTour->gia_nguoi_lon;
            $detailTour->counttraveller = (request("adult") + 1);
            $detailTour->subtotal = $detailTour->priceAdults;
            
            if(request("youth")){
                $detailTour->youth = request("youth");
                $detailTour->priceYouth = request("youth") * $detailTour->gia_thieu_nien;
                $detailTour->subtotal += $detailTour->priceYouth;
                $detailTour->counttraveller += request("youth");
            }
            
            if(request("child")){
                $detailTour->child = request("child");
                $detailTour->priceChild = request("child") * $detailTour->gia_tre_em;
                $detailTour->subtotal += $detailTour->priceChild;
                $detailTour->counttraveller += request("child");
            }
            
            if(request("extra")){
                for($i = 0; $i < count(request("extra")); $i++){
                    $extra = DB::table('extra_services')
                    ->select('extra_services.name', 'extra_services.price', 'extra_services.id', 'extra_services.description')
                    ->where('extra_services.id', request("extra")[$i])
                    ->first();
                    $detailTour->extra[] = $extra;
                }
                $detailTour->priceExtra = 0;
                for($i = 0; $i < count($detailTour->extra); $i++){
                    $detailTour->priceExtra += $detailTour->extra[$i]->price;
                }
            }
            
            if(request("timeDeparture")){
                $detailTour->timeDeparture = request("timeDeparture");
            }
            
        }
        
        $cities = DB::table('cities')->select('cities.name', 'cities.id')->get();
        $districts = [];
        $wards = [];
        // $forcusDistricts = "";
        // if(request("city")){
        //     $city = City::where('name', request("city"))->first();
        //     $districts = DB::table('districts')->select('districts.name', 'districts.id')->where('districts.city_id', $city->id)->get();
        // }
        // if(request("district")){
        //     $wards = DB::table('wards')->select('wards.name', 'wards.id')->where('wards.district_id', request("district"))->get();
        //     $forcusDistricts = District::find(request("district"))->name;
        // }
        
        // $forcusCity = request("city");
        return Inertia::render("Booking/TourBooking", compact('detailTour', 'cities', 'districts', 'wards'));
    }

    public function getDistricts(Request $request){
        // dd($request->all());
        $city = City::where('name', $request->city)->first();
        $districts = DB::table('districts')->select('districts.name', 'districts.id')->where('districts.city_id', $city->id)->get();
        // dd($districts);
        return redirect()->back()->with('districts', $districts);
    }

    public function getWards(Request $request){
        $wards = DB::table('wards')->select('wards.name', 'wards.id')->where('wards.district_id', $request->district)->get();
        return redirect()->back()->with('wards', $wards);
    }
    
    public function checkout()
    {
        return Inertia::render("Booking/Checkout");
    }
}
