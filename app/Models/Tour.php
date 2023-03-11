<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $table = 'tours';

    public function lichTrinhs()
    {
        return $this->hasMany(LichTrinh::class, 'ma_tour', 'id');
    }

    public function LoaiTour()
    {
        return $this->belongsTo(LoaiTour::class, 'ma_tour', 'id');
    }
}
