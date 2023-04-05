<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'image',
        'slug',
    ];

    public function getFromDateAttribute($value)
    {
        $blog = Blog::all();
        return $blog->created_at->diffForHumans();
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
