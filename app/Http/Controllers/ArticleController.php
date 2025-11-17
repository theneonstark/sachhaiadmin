<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleType;
use Illuminate\Http\Request;

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

    public function articles()
    {
        $articles = Article::with('type')->get();

        return response()->json([
            'status' => true,
            'articles' => $articles
        ]);
    }

    public function addArticle(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required',
            'type_id'     => 'required|exists:article_types,id',
            'author'      => 'required|string|max:255',
            'image'       => 'nullable|string',
            'featured'    => 'nullable|boolean'
        ]);

        $article = Article::create([
            'title'       => $request->title,
            'description' => $request->description,
            'type_id'     => $request->type_id,
            'type'        => ArticleType::find($request->type_id)->type,
            'author'      => $request->author,
            'image'       => $request->image,
            'likes'       => 0,
            'views'       => 0,
            'saves'       => 0,
            'shares'      => 0,
            'featured'    => $request->featured ?? 0
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Article added successfully!',
            'article' => $article
        ]);
    }


    public function removeArticle($id)
    {
        $article = Article::find($id);

        if (!$article) {
            return response()->json([
                'status' => false,
                'message' => 'Article not found'
            ], 404);
        }

        $article->delete();

        return response()->json([
            'status' => true,
            'message' => 'Article deleted successfully'
        ]);
    }
}
