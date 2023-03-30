<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\Hinh_anh;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Tour;
use App\Models\Tour_DiaDiem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DiaDiemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Request
     */
    public function index()
    {
        // Request::request('category', request('category'));s
        // dd(request('category'));
        // dd(Request::request('category', request('category')));
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $categories = LoaiTour::all();
        $locations = DiaDiem::query()
            ->where(function($query){
                if(request('category')){
                    $query->where('ma_loai_tour', request('category'));
                }
            })
            ->paginate(10)
            ->withQueryString();
        $arrTour = [];
        foreach($locations as $key => $location){
            $arrTour[$key] = Tour_DiaDiem::where('ma_dia_diem', $location->id)->first('ma_dia_diem');
        }
        $arrTour = array_filter($arrTour, function($value) { return $value !== null; });
        
        $arrTour = array_values($arrTour);
        $category = request('category');
        return Inertia::render('Location/Index', compact('locations', 'categories', 'category', 'extra_services', 'tours', 'schedule', 'arrTour'));
    }


    public function process(Request $request)
    {
        if($request->category == 0){
            return redirect()->route('location.index');
        }

        $categories = LoaiTour::all();

        $locations = DB::table('loai_tours')
            ->join('dia_diems', 'loai_tours.id', '=', 'dia_diems.ma_loai_tour')
            ->select('dia_diems.*')
            ->where('loai_tours.id', $request->category)
            ->paginate(5);
        return Inertia::render('Location/Index', compact('locations', 'categories'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $categories = LoaiTour::all();
        return Inertia::render('Location/Create', compact('categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:dia_diems,ten',
            'address' => 'required',
            'description' => 'required',
            'category' => 'required',
        ]);

        $location = new DiaDiem();
        $location->ten = $request->name;
        $location->ma_loai_tour = $request->category;
        $location->dia_chi = $request->address;
        $location->mo_ta = $request->description;
        $location->du_lieu_map = $request->mapdata;
        if($location->save()){
            foreach($request->images as $image){
                $filename = $image->store('locations', 'public');
                $imgLocation = new Hinh_anh();
                $imgLocation->ma_dia_diem = $location->id;
                $imgLocation->ten = $filename;
                $imgLocation->save();
            }
            return redirect()->route('location.index');
        }

        return redirect()->back();

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DiaDiem  $diaDiem
     * @return \Illuminate\Http\Response
     */
    public function show(DiaDiem $diaDiem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DiaDiem  $location
     * @return \Illuminate\Http\Response
     */
    public function edit(DiaDiem $location)
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $imgLocation = Hinh_anh::where('ma_dia_diem', $location->id)->get();
        return Inertia::render('Location/Edit', compact('location', 'imgLocation', 'categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DiaDiem  $location
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DiaDiem $location)
    {

        // dd($request->all());
        $request->validate([
            'name' => 'required|unique:dia_diems,ten,' . $location->id,
            'address' => 'required',
            'description' => 'required',
        ]);

        $location->ten = $request->name;
        $location->dia_chi = $request->address;
        $location->mo_ta = $request->description;
        $location->du_lieu_map = $request->mapdata;
        if($location->save()){
            if($request->images){
                $imgOld = Hinh_anh::where('ma_dia_diem', $location->id)->get();
                foreach($imgOld as $img){
                    $img->delete();
                }
                foreach($request->images as $image){
                    $filename = $image->store('locations', 'public');
                    $imgLocation = new Hinh_anh();
                    $imgLocation->ma_dia_diem = $location->id;
                    $imgLocation->ten = $filename;
                    $imgLocation->save();
                }
            }
            return redirect()->route('location.index');
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DiaDiem  $location
     * @return \Illuminate\Http\Response
     */
    public function destroy(DiaDiem $location)
    {
        
        $imgOld = Hinh_anh::where('ma_dia_diem', $location->id)->get();
        foreach($imgOld as $img){
            $img->delete();
        }
        $location->delete();
        return redirect()->route('location.index');
    }
}
