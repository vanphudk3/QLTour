<?php

namespace App\Http\Controllers;

use App\Models\BinhLuan;
use Illuminate\Http\Request;

class BinhLuanController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'tour_id' => 'required',
            'customer_id' => 'required',
            'comment' => 'required',
            'rate' => 'required',
        ]);

        $binhLuan = BinhLuan::create([
            'ma_tour' => $request->tour_id,
            'ma_khach_hang' => $request->customer_id,
            'noi_dung' => $request->comment,
            'so_sao' => $request->rate,
        ]);

        return redirect()->route('tour.show', $binhLuan->tour->slug)->with('success', 'Đã thêm bình luận thành công');
    }
}