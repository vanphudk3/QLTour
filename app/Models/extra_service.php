<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class extra_service extends Model
{
    use HasFactory;

    protected $table = 'extra_services';

    protected $fillable = [
        'ma_dia_diem',
        'name',
        'price',
        'description',
    ];
}
