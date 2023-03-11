<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'question',
        'answer',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    protected $table = 'questions';
}
