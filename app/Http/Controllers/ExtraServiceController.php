<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ExtraServiceController extends Controller
{
    public function index()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $extraServices = DB::table('extra_services')
            ->join('dia_diems', 'extra_services.ma_dia_diem', '=', 'dia_diems.id')
            ->select('extra_services.id', 'extra_services.name', 'extra_services.description', 'extra_services.price', 'dia_diems.ten as location')
            ->get();
        foreach ($extraServices as $extraService) {
            $extraService->price = number_format($extraService->price, 0, ',', '.');
        }

        return Inertia::render('ExtraService/Index', compact('extraServices', 'categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    public function create()
    {
        $categories = LoaiTour::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $locations = DiaDiem::all();
        return Inertia::render('ExtraService/Create', compact('locations', 'categories', 'extra_services', 'tours', 'schedule'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'location' => 'required',
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric|min:0|max:999999999',
        ]);

        $extraService = new extra_service();
        $extraService->ma_dia_diem = $request->location;
        $extraService->name = $request->name;
        $extraService->description = $request->description;
        $extraService->price = $request->price;
        $extraService->save();

        return redirect()->route('extraService.index');
    }

    public function show($id)
    {
        //
    }

    public function edit($extraService)
    {
        $categories = LoaiTour::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $extraService = DB::table('extra_services')
            ->join('dia_diems', 'extra_services.ma_dia_diem', '=', 'dia_diems.id')
            ->select('extra_services.id','extra_services.name', 'extra_services.description', 'extra_services.price', 'dia_diems.id as ma_dd', 'dia_diems.ten as location')
            ->where('extra_services.id', '=', $extraService)
            ->first();
        $locations = DiaDiem::all();
        return Inertia::render('ExtraService/Edit', compact('extraService', 'locations', 'categories', 'extra_services', 'tours', 'schedule'));
    }

    public function update(Request $request, $extraService)
    {
        $request->validate([
            'location' => 'required',
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric|min:0|max:999999999',
        ]);

        $extraService = extra_service::find($extraService);

        if ($extraService) {
            $extraService->ma_dia_diem = $request->location;
            $extraService->name = $request->name;
            $extraService->description = $request->description;
            $extraService->price = $request->price;
            $extraService->save();
        }

        return redirect()->route('extraService.index');
    }

    public function destroy($extraService)
    {
        $extraService = extra_service::find($extraService);
        if ($extraService) {
            $extraService->delete();
        }

        return redirect()->route('extraService.index');
    }
}
