<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour_ngay extends Model
{
    use HasFactory;

    protected $table = 'tour_ngay';

    protected $fillable = [
        'ma_tour',
        'ngay',
        'gia',
        'so_cho',
        'trang_thai',
        'so_cho_da_dat',
    ];

    public function orders(){
        return $this->hasMany('App\Models\Order', 'ma_tour_ngay', 'id');
    }

    public function tour(){
        return $this->belongsTo('App\Models\Tour', 'ma_tour', 'id');
    }
}
