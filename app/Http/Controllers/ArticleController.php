<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ArticleController
{
    public function articleCategory()
    {
        return response()->json([
            'status' => true,
            'categories' => ArticleType::all()
        ]);
    }

    public function addCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $category = ArticleType::create([
            'type' => $request->name,
            'slug' => $request->slug,
            'color' => $request->color,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category added successfully!',
            'category' => $category
        ]);
    }

    public function updateCategory(Request $request, $id)
    {
        // 1. Validation
        $request->validate([
            'type' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255'
        ]);

        // 2. Find category
        $category = ArticleType::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found'
            ], 404);
        }

        // 3. Update fields
        $category->update([
            'type' => $request->type,
            'slug' => $request->slug ?? $category->slug,
            'color' => $request->color,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Category updated successfully!',
            'category' => $category
        ]);
    }

    public function removeCategory($id)
    {
        $category = ArticleType::find($id);

        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found'
            ], 404);
        }

        $category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Category deleted successfully'
        ]);
    }

    // Get all articles
    public function articles()
    {
        $articles = Article::with('type')->orderBy('created_at','desc')->get();
        return response()->json(['status'=>true, 'articles'=>$articles]);
    }

    // Get single by id or slug
    public function show($identifier)
    {
        $article = is_numeric($identifier) ? Article::with('type')->find($identifier) : Article::with('type')->where('slug', $identifier)->first();
        if (!$article) return response()->json(['status'=>false,'message'=>'Article not found'],404);
        return response()->json(['status'=>true, 'article'=>$article]);
    }

    // Add article (multipart/form-data supported)
    public function addArticle(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'type_id' => 'required|exists:article_types,id',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120', // 5MB
            'featured' => 'nullable|boolean',
            'status' => ['nullable', Rule::in(['draft','published','scheduled'])],
            'publish_date' => 'nullable|date',
            'excerpt' => 'nullable|string|max:1000',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:articles,slug'
        ]);

        $data = $request->only([
            'title','description','type_id','author','featured','status','publish_date','excerpt','meta_title','meta_description','meta_keywords','slug'
        ]);

        // handle image
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('articles', 'public'); // storage/app/public/articles
            $data['image'] = $path;
        }

        // set type name
        $type = ArticleType::find($data['type_id']);
        $data['type'] = $type?->type;

        $article = Article::create($data);

        return response()->json(['status'=>true,'message'=>'Article added','article'=>$article], 201);
    }

    // Update article
    public function updateArticle(Request $request, $id)
    {
        $article = Article::find($id);
        if (!$article) return response()->json(['status'=>false,'message'=>'Article not found'],404);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'type_id' => 'required|exists:article_types,id',
            'author' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:5120',
            'featured' => 'nullable|boolean',
            'status' => ['nullable', Rule::in(['draft','published','scheduled'])],
            'publish_date' => 'nullable|date',
            'excerpt' => 'nullable|string|max:1000',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:160',
            'meta_keywords' => 'nullable|string|max:255',
            'slug' => ['nullable','string','max:255', Rule::unique('articles','slug')->ignore($article->id)],
        ]);

        $data = $request->only([
            'title','description','type_id','author','featured','status','publish_date','excerpt','meta_title','meta_description','meta_keywords','slug'
        ]);

        if ($request->hasFile('image')) {
            // delete old
            if ($article->image) Storage::disk('public')->delete($article->image);
            $path = $request->file('image')->store('articles', 'public');
            $data['image'] = $path;
        }

        $type = ArticleType::find($data['type_id']);
        $data['type'] = $type?->type;

        $article->update($data);

        return response()->json(['status'=>true,'message'=>'Article updated','article'=>$article]);
    }

    // Remove
    public function removeArticle($id)
    {
        $article = Article::find($id);
        if (!$article) return response()->json(['status'=>false,'message'=>'Article not found'],404);

        if ($article->image) Storage::disk('public')->delete($article->image);
        $article->delete();

        return response()->json(['status'=>true,'message'=>'Article deleted']);
    }
}
