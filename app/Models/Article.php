<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'type_id',
        'type',
        'author',
        'image',
        'likes',
        'views',
        'saves',
        'shares',
        'featured',
    ];

    // 🔥 Every article belongs to one type
    public function type()
    {
        return $this->belongsTo(ArticleType::class, 'type_id');
    }

    public function getCreatedAtAttribute($value){
        return date('d M y - h:i A', strtotime($value));
    }

    public function getUpdatedAtAttribute($value){
        return date('d M y - h:i A', strtotime($value));
    }
}
