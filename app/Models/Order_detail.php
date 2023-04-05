<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    use HasFactory;

    protected $table = 'order_details';

    protected $fillable = [
        'order_id',
        'ma_tour',
        'so_luong_nguoi',
        'total',
        'ghi_chu',
    ];

    public function order(){
        return $this->belongsTo('App\Models\Order', 'order_id', 'id');
    }

    public function tour(){
        return $this->belongsTo('App\Models\Tour', 'ma_tour', 'id');
    }
}
