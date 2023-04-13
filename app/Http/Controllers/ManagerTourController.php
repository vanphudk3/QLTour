<?php

namespace App\Http\Controllers;

use App\Enums\TranspostRole;
use App\Models\ChiTietTour;
use App\Models\City;
use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\Hinh_anh;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Tour;
use App\Models\Tour_DiaDiem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ManagerTourController extends Controller
{
    public function index()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $schedule = LichTrinh::all();
        $tours = Tour::paginate(6);

        $arrDetailTour = [];
        foreach($tours as $key => $tour){
            $arrDetailTour[$key] = ChiTietTour::where('ma_tour', $tour->id)->first('ma_tour');
        }

        $arrDetailTour = array_filter($arrDetailTour, function($value) { return $value !== null; });
        $arrDetailTour = array_values($arrDetailTour);
        // dd($arrDetailTour);

        return Inertia::render('ManagerTour/Index', compact('tours', 'categories', 'locations', 'extra_services', 'schedule'));
    }

    public function show($id)
    {
        return Inertia::render('ManagerTour/Show', [
            'tour' => $id,
        ]);
    }

    public function create()
    {
        $cities = City::all();
        $categories = LoaiTour::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $locations = DiaDiem::all();
        return Inertia::render('ManagerTour/Create', compact('locations', 'categories', 'extra_services', 'tours', 'schedule', 'cities'));
    }

    public function edit($managerTour)
    {
        $categories = LoaiTour::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $tour = Tour::where('id', $managerTour)->get();
        $tour[0]->dateStart = date("Y-m-d", strtotime($tour[0]->ngay_khoi_hanh));
        
        $detaiTour = ChiTietTour::where('ma_tour', $managerTour)->get();
        $locations = DiaDiem::all();
        $getLocations = Tour_DiaDiem::where('ma_tour', $managerTour)->get();
        $location = DiaDiem::where('id', $getLocations[0]->ma_dia_diem)->get();
        return Inertia::render('ManagerTour/Edit', compact('tour', 'location','locations', 'detaiTour', 'categories', 'extra_services', 'tours', 'schedule'));
    }

    public function proccess_slug(Request $request){
        // dd($request->all());
        try{
            if(request("name")){
                $forcusname = request("name");
                $lug = Str::slug($request->name);
                return redirect()->back()->with(['slug' => $lug, 'name' => $forcusname]);

            }
        }
        catch(Exception $e){
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'code' => 'required|unique:tours,ky_hieu',
            'name' => 'required',
            'transpost' => 'required',
            'agerfrom' => 'required|numeric|min:1|max:100',
            'priceAdult' => 'required|numeric|min:1|max:100000000',
            'priceYoung' => 'required|numeric',
            'priceChild' => 'required|numeric|min:0|max:100000000',
            'dateStart' => 'required|date|after:today',
            'amountPeople' => 'required|numeric|min:1|max:100',
            'amountDay' => 'required|numeric|min:1|max:100',
            'amountNight' => 'required|numeric|min:0|max:100',
            'location' => 'required',
            'location_depart' => 'required',
            'location_general' => 'required',
            'time_depart' => 'required|date_format:H:i',
        ]);

        if($request->agerfrom < 1 || $request->agerfrom > 100){
            return redirect()->back()->with('error', 'Tuổi phải từ 1 đến 100');
        }

        if($request->priceAdult < 1 || $request->priceAdult > 100000000){
            return redirect()->back()->with('error', 'Giá người lớn phải từ 1 đến 100.000.000');
        }

        if($request->priceYoung < 1 || $request->priceYoung > 100000000){
            return redirect()->back()->with('error', 'Giá thiếu niên phải từ 1 đến 100.000.000');
        }

        if($request->priceChild < 0 || $request->priceChild > 100000000){
            return redirect()->back()->with('error', 'Giá em bé phải từ 0 đến 100.000.000');
        }

        if($request->priceYoung > $request->priceAdult){
            return redirect()->back()->with('error', 'Giá trẻ em phải nhỏ hơn giá người lớn');
        }
        if($request->priceChild > $request->priceYoung){
            return redirect()->back()->with('error', 'Giá em bé phải nhỏ hơn giá trẻ em');
        }

        if($request->amountPeople < 1 || $request->amountPeople > 100){
            return redirect()->back()->with('error', 'Số người phải từ 1 đến 100');
        }

        if($request->amountDay < 1 || $request->amountDay > 100){
            return redirect()->back()->with('error', 'Số ngày phải từ 1 đến 100');
        }

        if($request->amountNight < 0 || $request->amountNight > 100){
            return redirect()->back()->with('error', 'Số đêm phải từ 0 đến 100');
        }

        if($request->amountDay < $request->amountNight){
            return redirect()->back()->with('error', 'Số ngày phải lớn hơn số đêm');
        }

        switch($request->transpost){
            case '1':
                $request->transpost = TranspostRole::Car;
                break;
            case '2':
                $request->transpost = TranspostRole::Bus;
                break;
            case '3':
                $request->transpost = TranspostRole::Train;
                break;
            case '4':
                $request->transpost = TranspostRole::Plane;
                break;
        }

        $tour = new Tour();
        $tour->ky_hieu = $request->code;
        $tour->ten_tour = $request->name;
        $tour->transpost = $request->transpost;
        $tour->do_tuoi_tu = $request->agerfrom;
        $tour->gia_nguoi_lon = $request->priceAdult;
        $tour->gia_thieu_nien = $request->priceYoung;
        $tour->gia_tre_em = $request->priceChild;
        $tour->ngay_khoi_hanh = $request->dateStart;
        $tour->so_cho = $request->amountPeople;
        $tour->so_ngay = $request->amountDay;
        $tour->so_dem = $request->amountNight;
        $tour->mo_ta = $request->description;
        $tour->yeu_cau = $request->required;
        $tour->luu_y = $request->notice;
        if($tour->save()){
            $tour_location = new Tour_DiaDiem();
            $tour_location->ma_tour = $tour->id;
            $tour_location->ma_dia_diem = $request->location;
            $tour_location->save();
            $detail_tour = new ChiTietTour();
            $detail_tour->ma_tour = $tour->id;
            $detail_tour->gio_khoi_hanh = $request->time_depart;
            $detail_tour->noi_khoi_hanh = $request->location_depart;
            $detail_tour->noi_tap_chung = $request->location_general;
            $detail_tour->save();
            return redirect()->route('managerTour.index');
        }

        return redirect()->back();

    }

    public function update(Request $request, $managerTour)
    {
        $request->validate([
            'code' => 'required',
            'name' => 'required',
            'transpost' => 'required',
            'agerfrom' => 'required|numeric|min:1|max:100',
            'priceAdult' => 'required|numeric|min:1|max:100000000',
            'priceYoung' => 'required|numeric',
            'priceChild' => 'required|numeric|min:0|max:100000000',
            'dateStart' => 'required|date|after:today',
            'amountPeople' => 'required|numeric|min:1|max:100',
            'amountDay' => 'required|numeric|min:1|max:100',
            'amountNight' => 'required|numeric',
            'location' => 'required',
            'location_depart' => 'required',
            'location_general' => 'required',
            'time_depart' => 'required',
            

        ]);

        if($request->agerfrom < 1 || $request->agerfrom > 100){
            return redirect()->back()->with('error', 'Tuổi phải từ 1 đến 100');
        }

        if($request->priceAdult < 1 || $request->priceAdult > 100000000){
            return redirect()->back()->with('error', 'Giá người lớn phải từ 1 đến 100.000.000');
        }

        if($request->priceYoung < 1 || $request->priceYoung > 100000000){
            return redirect()->back()->with('error', 'Giá trẻ em phải từ 1 đến 100.000.000');
        }

        if($request->priceChild < 0 || $request->priceChild > 100000000){
            return redirect()->back()->with('error', 'Giá em bé phải từ 0 đến 100.000.000');
        }

        if($request->priceYoung > $request->priceAdult){
            return redirect()->back()->with('error', 'Giá trẻ em phải nhỏ hơn giá người lớn');
        }
        if($request->priceChild > $request->priceYoung){
            return redirect()->back()->with('error', 'Giá em bé phải nhỏ hơn giá trẻ em');
        }

        if($request->amountPeople < 1 || $request->amountPeople > 100){
            return redirect()->back()->with('error', 'Số người phải từ 1 đến 100');
        }

        if($request->amountDay < 1 || $request->amountDay > 100){
            return redirect()->back()->with('error', 'Số ngày phải từ 1 đến 100');
        }

        if($request->amountNight < 0 || $request->amountNight > 100){
            return redirect()->back()->with('error', 'Số đêm phải từ 0 đến 100');
        }

        if($request->amountDay < $request->amountNight){
            return redirect()->back()->with('error', 'Số ngày phải lớn hơn số đêm');
        }

        switch($request->transpost){
            case '1':
                $request->transpost = TranspostRole::Car;
                break;
            case '2':
                $request->transpost = TranspostRole::Bus;
                break;
            case '3':
                $request->transpost = TranspostRole::Train;
                break;
            case '4':
                $request->transpost = TranspostRole::Plane;
                break;
        }

        $tour = Tour::find($managerTour);
        $tour->ky_hieu = $request->code;
        $tour->ten_tour = $request->name;
        $tour->transpost = $request->transpost;
        $tour->do_tuoi_tu = $request->agerfrom;
        $tour->gia_nguoi_lon = $request->priceAdult;
        $tour->gia_thieu_nien = $request->priceYoung;
        $tour->gia_tre_em = $request->priceChild;
        $tour->ngay_khoi_hanh = $request->dateStart;
        $tour->so_cho = $request->amountPeople;
        $tour->so_ngay = $request->amountDay;
        $tour->so_dem = $request->amountNight;
        $tour->mo_ta = $request->description;
        $tour->yeu_cau = $request->required;
        $tour->luu_y = $request->notice;
        if($tour->save()){
            $tour_location = new Tour_DiaDiem();
            if($tour_location->where('ma_tour', $tour->id)->delete()){
                $tour_location->ma_tour = $tour->id;
                $tour_location->ma_dia_diem = $request->location;
                $tour_location->save();
            }
            $detail_tour = new ChiTietTour();
            if($detail_tour->where('ma_tour', $tour->id)->delete()){
                $detail_tour->ma_tour = $tour->id;
                $detail_tour->gio_khoi_hanh = $request->time_depart;
                $detail_tour->noi_khoi_hanh = $request->location_depart;
                $detail_tour->noi_tap_chung = $request->location_general;
                $detail_tour->save();
            }
            return redirect()->route('managerTour.index');
        }

        return redirect()->back();
    }

    public function destroy($id)
    {
        // dd($id);
        $tour = Tour::find($id);
        $tour_location = new Tour_DiaDiem();
        $detail_tour = new ChiTietTour();
        $detail_tour->where('ma_tour', $tour->id)->delete();
        $tour_location->where('ma_tour', $tour->id)->delete();
        $tour->delete();

        return redirect()->route('managerTour.index');
    }
}
