<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
        'publish_date',
        'excerpt',
    ];

    // Automatically set slug if not provided
    public static function booted()
    {
        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title) . '-' . substr(md5(time()), 0, 6);
            }
            if (empty($article->type) && $article->type_id) {
                $type = \App\Models\ArticleType::find($article->type_id);
                $article->type = $type?->type;
            }
        });

        static::updating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title) . '-' . substr(md5(time()), 0, 6);
            }
            if ($article->isDirty('type_id')) {
                $type = \App\Models\ArticleType::find($article->type_id);
                $article->type = $type?->type;
            }
        });
    }

    public function type()
    {
        return $this->belongsTo(ArticleType::class, 'type_id');
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', 1);
    }

    public function getCreatedAtAttribute($value){
        return date('d M y - h:i A', strtotime($value));
    }

    public function getUpdatedAtAttribute($value){
        return date('d M y - h:i A', strtotime($value));
    }
}