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
}
