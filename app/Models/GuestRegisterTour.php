<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuestRegisterTour extends Model
{
    use HasFactory;

    protected $table = 'guest_register_tours';

    protected $fillable = [
        'order_id',
        'user_id',
        'name',
        'CMND',
        'age',
        'phone',
    ];
}
