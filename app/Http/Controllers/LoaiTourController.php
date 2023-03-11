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
    public function index()
    {
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        $categories = LoaiTour::all();
        foreach ($categories as $category){
            $category->mo_ta = $this->Trancate($category->mo_ta, 50);
        }
        return Inertia::render('Category/Index', compact('categories', 'locations', 'extra_services', 'tours', 'schedule'));
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
            'description' => 'required',
        ]);

        $category = new LoaiTour();
        $category->ten = $request->name;
        $category->mo_ta = $request->description;
        $category->save();

        return redirect()->route('category.index');
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
            'name' => 'required|unique:loai_tours,ten',
            'description' => 'required',
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
