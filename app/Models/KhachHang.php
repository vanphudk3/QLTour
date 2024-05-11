<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhachHang extends Model
{
    use HasFactory;

    protected $table = 'khach_hangs';

    protected $fillable = [
        'ten_khach_hang',
        'email',
        'citizen_identification_number',
        'so_dien_thoai',
        'dia_chi',
        'mat_khau',
        'ngay_sinh',
        'tong_so_tour_da_di',
        'remember_token',
        'created_by',
    ];

    protected $hidden = [
        'mat_khau',
        'remember_token',
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    public function getAuthPassword()
    {
        return $this->mat_khau;
    }

    public function getRememberTokenName()
    {
        return DB::table('khach_hangs')->where('id', $this->id)->value('remember_token');
    }

    public function orders(){
        return $this->hasMany('App\Models\Order', 'ma_khach_hang', 'id');
    }

    public function binhLuan(){
        return $this->hasMany('App\Models\BinhLuan', 'ma_khach_hang', 'id');
    }
}