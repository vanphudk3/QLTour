<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'ma_khach_hang',
        'ma_nhan_vien',
        'ky_hieu_tour',
        'ten_nguoi_dat',
        'so_dien_thoai',
        'email',
        'dia_chi',
        'gio_khoi_hanh',
        'tong_tien',
        'trang_thai',
        'ghi_chu',
    ];


    public function customer(){
        return $this->belongsTo('App\Models\KhachHang', 'ma_khach_hang', 'id');
    }

    public function employee(){
        return $this->belongsTo('App\Models\NhanVien', 'ma_nhan_vien', 'id');
    }

    public function order_detail(){
        return $this->hasMany('App\Models\Order_detail', 'order_id', 'id');
    }

    public function tour(){
        return $this->belongsTo('App\Models\Tour', 'ma_tour', 'id');
    }

    public function ma_giam_gia(){
        return $this->belongsTo('App\Models\KhuyenMai', 'ma_giam_gia', 'id');
    }

    public function tour_ngay(){
        return $this->belongsTo('App\Models\Tour_Ngay', 'ma_tour_ngay', 'id');
    }
}
