<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BinhLuan extends Model
{
    use HasFactory;

    protected $table = 'binh_luans';

    protected $fillable = [
        'ma_tour',
        'ma_khach_hang',
        'noi_dung',
        'so_sao',
        'trang_thai',
    ];

    public function getFromDateAttribute($value)
    {
        return date('d-m-Y', strtotime($value));
    }

    public function tour()
    {
        return $this->belongsTo(Tour::class, 'ma_tour', 'id');
    }

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'ma_khach_hang', 'id');
    }
}
