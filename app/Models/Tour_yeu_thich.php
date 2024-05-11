<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour_yeu_thich extends Model
{
    use HasFactory;

    protected $table = 'tour_yeu_thich';

    protected $fillable = [
        'khach_hang_id',
        'tour_id',
        'status',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class, 'tour_id', 'id');
    }

    public function khach_hang()
    {
        return $this->belongsTo(KhachHang::class, 'khach_hang_id', 'id');
    }
}
