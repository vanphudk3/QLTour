<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour_DiaDiem extends Model
{
    use HasFactory;

    protected $table = 'tour_diadiems';

    protected $fillable = [
        'ma_tour',
        'ma_dia_diem',
    ];
}
