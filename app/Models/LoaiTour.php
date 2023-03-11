<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiTour extends Model
{
    use HasFactory;

    protected $table = 'loai_tours';

    protected $fillable = [
        'ma_tour',
        'ten_loai_tour',
        'mo_ta',
    ];

    public function tours()
    {
        return $this->hasMany(Tour::class, 'ma_tour', 'id');
    }
}
