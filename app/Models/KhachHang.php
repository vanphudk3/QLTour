<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    use HasFactory;

    protected $table = 'khach_hangs';

    protected $fillable = [
        'ma_khach_hang',
        'ten_khach_hang',
        'gioi_tinh',
        'ngay_sinh',
        'so_dien_thoai',
        'email',
        'dia_chi',
        'ngay_sinh',
        'gioi_tinh',
    ];
}
