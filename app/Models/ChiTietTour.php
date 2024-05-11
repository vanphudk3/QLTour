<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietTour extends Model
{
    use HasFactory;

    protected $table = 'chi_tiet_tours';

    protected $fillable = [
        'ma_tour',
        'noi_khoi_hanh',
        'noi_tap_chung',
        'gio_khoi_hanh',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class, 'ma_tour', 'id');
    }
}
