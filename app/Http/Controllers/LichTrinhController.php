<?php

namespace App\Http\Controllers;

use App\Models\LichTrinh;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LichTrinhController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $schedules = DB::table('lich_trinhs')
            ->join('tours', 'lich_trinhs.ma_tour', '=', 'tours.id')
            ->select('lich_trinhs.id', 'lich_trinhs.ma_tour', 'lich_trinhs.tieu_de', 'lich_trinhs.noi_dung', 'lich_trinhs.lich_trinh_ngay', 'tours.ten_tour')
            ->groupBy('lich_trinhs.id', 'lich_trinhs.ma_tour', 'lich_trinhs.tieu_de', 'lich_trinhs.noi_dung', 'lich_trinhs.lich_trinh_ngay', 'tours.ten_tour')
            ->paginate(10)
            ->withQueryString();
        
        // dd($schedules);
        
        foreach($schedules as $schedule){
            $schedule->tieu_de = $this->Trancate($schedule->tieu_de, 10);
            $schedule->noi_dung = $this->Trancate($schedule->noi_dung, 50);
            $schedule->lich_trinh_ngay = date('d-m-Y', strtotime($schedule->lich_trinh_ngay));
        }
        // dd ($schedules);
        return Inertia::render('Schedule/Index',compact('schedules'));
    }

    public function create()
    {

        $schedule = LichTrinh::groupBy('ma_tour')
        ->select('ma_tour')
        ->get()
        ->keyBy('ma_tour');
        $tours = DB::table('tours')
            ->select('id', 'ten_tour', 'so_ngay')
            ->where('status', '=', 'active')
            ->whereNotIn('id', $schedule->keys())
            ->get();

        if(request('idTour')){
            $forcusTour = Tour::find(request('idTour'));
            $arr = [];
            for($i = 0; $i < $forcusTour->so_ngay; $i++){
                $forcusTour->ngay_khoi_hanh = date('Y-m-d', strtotime($forcusTour->ngay_khoi_hanh. ' + 1 days'));
                array_push($arr,$forcusTour->ngay_khoi_hanh);
                
            }
            $forcusTour->schedule = $arr;
            return Inertia::render('Schedule/Create',compact('tours','forcusTour'));
        }
        $forcusTour = null;
        return Inertia::render('Schedule/Create',compact('tours','forcusTour'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        // dd(count($request->schedule));
        for($i = 0; $i < count($request->schedule); $i++){
            $request->validate([
                'idTour' => 'required',
                'title' . $i => 'required',
                'content' . $i => 'required',
                'schedule' => 'required',
            ]);
        }
        // dd($request->all());
        $tour = Tour::where('ten_tour',$request->idTour)->first('id');
        for($i = 0; $i < count($request->schedule); $i++){
            $data = array(
                'ma_tour' => $tour->id,
                'tieu_de' => request('title'. $i),
                'noi_dung' => request('content'. $i),
                'lich_trinh_ngay' => $request->schedule[$i],
            );
            // dd($data);
            LichTrinh::create($data);
        }
        return redirect()->route('schedule.index')->with('success', 'Schedule created successfully.');
    }

    public function Edit($id){
        $schedule = LichTrinh::find($id);
        $schedule->lich_trinh_ngay = date('Y-m-d', strtotime($schedule->lich_trinh_ngay));
        return Inertia::render('Schedule/Edit',compact('schedule'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $id = LichTrinh::find($id);
        $id->tieu_de = $request->title;
        $id->noi_dung = $request->content;
        $id->save();
        
        return redirect()->route('schedule.index')->with('success', 'Schedule updated successfully');
    }

    public function destroy($id)
    {
        // dd($id);
        $schedule = LichTrinh::where('ma_tour', $id)->get();
        // dd ($schedule);
        foreach($schedule as $item){
            $item->delete();
        }
        return redirect()->route('schedule.index')->with('success', 'Schedule deleted successfully');
    }

    public function Trancate($string, $length){
        if(strlen($string) > $length){
            $string = substr($string, 0, $length) . '...';
        }
        return $string;
    }
}
