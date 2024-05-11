<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Tour extends Model
{
    use HasFactory;

    protected $table = 'tours';

    protected $hidden = [
        'deleted_at',
    ];

    protected $fillable = [
        'co_lich_trinh',
    ];

    protected $casts = [
        'ngay_khoi_hanh' => 'datetime:d-m-Y',
    ];

    public function lichTrinhs()
    {
        return $this->hasMany(LichTrinh::class, 'ma_tour', 'id');
    }

    public function LoaiTour()
    {
        return $this->belongsTo(LoaiTour::class, 'ma_tour', 'id');
    }

    public function tour_ngay() {
        return $this->hasMany(Tour_ngay::class, 'ma_tour', 'id');
    }

    public function chi_tiet_tour(){
        return $this->hasMany(ChiTietTour::class, 'ma_tour', 'id');
    }
}
