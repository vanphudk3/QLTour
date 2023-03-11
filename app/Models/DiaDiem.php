<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiaDiem extends Model
{
    use HasFactory;

    protected $table = 'dia_diems';

    protected $fillable = [
        'ma_tour',
        'ten_dia_diem',
        'mo_ta',
        'dia_chi',
        'vi_do',
        'kinh_do',
        'du_lieu_map',
    ];

}
