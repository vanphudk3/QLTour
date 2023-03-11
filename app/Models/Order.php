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
        'ky_hieu_tour',
        'ten_nguoi_dat',
        'so_dien_thoai',
        'email',
        'dia_chi',
        'ngay_dat',
        'tong_tien',
        'trang_thai',
        'ghi_chu',
    ];
}
