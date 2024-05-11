<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoaiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $categories = LoaiTour::all();
        $categories = LoaiTour::paginate(10)->withQueryString()->onEachSide(2); //
        // chuyển đổi mảng thành object
        // $categories = json_decode(json_encode($categories));
        $arrLocation = [];
        $arrAllLocation = [];
        $arrLocationNotIn = [];
        foreach($categories as $key => $category){
            $arrLocation[$key] = DiaDiem::where('ma_loai_tour', $category->id)->first('ma_loai_tour');
            // $category->location = DiaDiem::where('ma_loai_tour', $category->id)->first();
            $arrAllLocation[$key] = DiaDiem::where('ma_loai_tour', $category->id)->get();
        }
        $arrLocation = array_filter($arrLocation, function($value) { return $value !== null; });
        // nếu có 1 phần tử null thì xóa phần tử đó
        $arrAllLocation = array_filter($arrAllLocation, function($value) { return $value !== null; });
        $locationsNotIn = DiaDiem::where('ma_loai_tour', null)->get();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        // foreach ($categories as $category){
        //     $category->mo_ta = $this->Trancate($category->mo_ta, 50);
        // }
        return Inertia::render('Category/Index', compact('categories', 'arrLocation', 'arrAllLocation', 'extra_services', 'tours', 'schedule', 'locations', 'locationsNotIn'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        return Inertia::render('Category/Create', compact('categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'name' => 'required|unique:loai_tours,ten',
            // 'description' => 'required',
        ]);

        $category = new LoaiTour();
        $category->ten = $request->name;
        $category->mo_ta = $request->description;
        $category->save();

        return redirect()->route('category.index');
        // return redirect()->back()->with('status', 'true');
        // tra ve json
        // return response()->json([
        //     'message' => 'Create success',
        //     'status' => 'success',
        // ]); // status: success, error, warning

        // return response()->json(['message' => 'Create success', 'status' => 'success']);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LoaiTour  $loaiTour
     * @return \Illuminate\Http\Response
     */
    public function show(LoaiTour $loaiTour)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LoaiTour  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(LoaiTour $category)
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        return Inertia::render('Category/Edit', compact('category', 'categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LoaiTour  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LoaiTour $category)
    {
        $request->validate([
            'name' => 'required',
        ]);
        

        $category->ten = $request->name;
        $category->mo_ta = $request->description;
        $category->save();

        return redirect()->route('category.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LoaiTour  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(LoaiTour $category)
    {
        $category->delete();
        return redirect()->route('category.index');
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}
