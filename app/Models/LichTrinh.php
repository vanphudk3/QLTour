<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LichTrinh extends Model
{
    use HasFactory;

    protected $table = 'lich_trinhs';

    protected $fillable = [
        'ma_tour',
        'noi_khoi_hanh',
        'noi_tap_chung',
        'tieu_de',
        'noi_dung',
        'lich_trinh_ngay',
    ];
}
