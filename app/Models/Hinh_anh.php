<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hinh_anh extends Model
{
    use HasFactory;

    protected $table = 'hinh_anhs';

    protected $fillable = [
        'ma_tour',
        'ten_hinh_anh',
        'duong_dan',
    ];
}
