<?php

namespace App\Http\Controllers;

use App\Models\DiaDiem;
use App\Models\extra_service;
use App\Models\LichTrinh;
use App\Models\LoaiTour;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $categories = LoaiTour::all();
        $locations = DiaDiem::all();
        $extra_services = extra_service::all();
        $tours = Tour::all();
        $schedule = LichTrinh::all();
        return Inertia::render('Dashboard', compact('categories', 'locations', 'extra_services', 'tours', 'schedule'));
    }
}
