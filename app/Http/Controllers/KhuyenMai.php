<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class KhuyenMai extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){
        $search = request()->query('search') ?? '';

        $schedules = \App\Models\KhuyenMai::where('title', 'like', '%'.$search.'%')
            ->where('is_delete', 0)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        foreach($schedules as $schedule){
            $schedule->ngay_bat_dau = date('d/m/Y', ($schedule->ngay_bat_dau));
            $schedule->ngay_ket_thuc = date('d/m/Y', ($schedule->ngay_ket_thuc));
            if ($schedule->giam_theo == '0') {
                $schedule->gia_tri = $schedule->gia_tri . '%';
            } else {
                $schedule->gia_tri = number_format($schedule->gia_tri) . ' VND';
            }
        }

        return Inertia::render('KhuyenMai/Index', compact('schedules'));
    }


    public function create(){
        return Inertia::render('KhuyenMai/Create');
    }

    public function store(Request $request){
        try{
            $request->validate([
                'title' => 'required',
                'giam_theo' => 'required',
                'gia_tri' => 'required',
                'so_lan_su_dung' => 'required',
                'ngay_bat_dau' => 'required',
                'ngay_ket_thuc' => 'required',
            ]);
            $request->gia_tri = str_replace('.', '', $request->gia_tri);
            $request->gia_tri = str_replace(',', '', $request->gia_tri);
            $request->gia_tri = intval($request->gia_tri);
            $khuyenmai = new \App\Models\KhuyenMai();
            $khuyenmai->title = $request->title;
            $khuyenmai->giam_theo = $request->giam_theo;
            $khuyenmai->gia_tri = $request->gia_tri;
            $khuyenmai->so_lan_su_dung = $request->so_lan_su_dung;
            $khuyenmai->ngay_bat_dau = strtotime($request->ngay_bat_dau);
            $khuyenmai->ngay_ket_thuc = strtotime($request->ngay_ket_thuc);
            $khuyenmai->save();
    
            return redirect()->route('khuyenmai.index');
        }
        catch(\Exception $e){
            return redirect()->back()->with('errorKhuyenMai', $e->getMessage());
        }
    }

    public function edit($id){
        $khuyenmai = \App\Models\KhuyenMai::find($id);
        return Inertia::render('KhuyenMai/Edit', compact('khuyenmai'));
    }

    public function update(Request $request, $id){
        try{
            $request->validate([
                'title' => 'required',
                'giam_theo' => 'required',
                'gia_tri' => 'required',
                'so_lan_su_dung' => 'required',
                'ngay_bat_dau' => 'required',
                'ngay_ket_thuc' => 'required',
            ]);
            $khuyenmai = \App\Models\KhuyenMai::find($id);
            $request->gia_tri = str_replace('.', '', $request->gia_tri);
            $request->gia_tri = str_replace(',', '', $request->gia_tri);
            $request->gia_tri = intval($request->gia_tri);
            $khuyenmai->title = $request->title;
            $khuyenmai->giam_theo = $request->giam_theo;
            $khuyenmai->gia_tri = $request->gia_tri;
            $khuyenmai->so_lan_su_dung = $request->so_lan_su_dung;
            $khuyenmai->ngay_bat_dau = strtotime($request->ngay_bat_dau);
            $khuyenmai->ngay_ket_thuc = strtotime($request->ngay_ket_thuc);
            $khuyenmai->trang_thai = $request->trang_thai;
            $khuyenmai->save();
    
            return redirect()->route('khuyenmai.index');
        }
        catch(\Exception $e){
            return redirect()->back()->with('errorKhuyenMai', $e->getMessage());
        }
    }

    public function destroy($id){
        $khuyenmai = \App\Models\KhuyenMai::find($id);
        // $khuyenmai->delete();
        $khuyenmai->is_delete = 1;
        $khuyenmai->save();
        return redirect()->route('khuyenmai.index');
    }

    public function search(){
        $search = request()->query('search') ?? '';

        $khuyenmais = \App\Models\KhuyenMai::where('title', 'like', '%'.$search.'%')
            ->where('is_delete', 0)
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return response()->json(array('status' => 'success', 'data' => $khuyenmais));
    }

}
