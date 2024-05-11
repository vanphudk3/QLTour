<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhuyenMai extends Model
{
    use HasFactory;

    protected $table = 'khuyen_mais';

    protected $fillable = [
        'title',
        'giam_theo',
        'gia_tri',
        'so_lan_su_dung',
        'ngay_bat_dau',
        'ngay_ket_thuc',
        'trang_thai'
    ];
}
