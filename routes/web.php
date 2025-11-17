<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/page');
})->middleware('guest');

Route::group(['prefix' => 'auth'], function () {
    Route::post('/check', [HomeController::class, 'login']);
    Route::get('/logout', [HomeController::class, 'logout'])->name('logout');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('/{type}', [HomeController::class, 'index']);

    Route::group(['prefix' => 'article'], function () {
        Route::get('/category', [ArticleController::class, 'articleCategory']);
        Route::post('/category/add', [ArticleController::class, 'addCategory']);
        Route::post('/category/update/{id}', [ArticleController::class, 'updateCategory']);
        Route::post('/category/remove/{id}', [ArticleController::class, 'removeCategory']);
        Route::get('/data', [ArticleController::class, 'articles']);
        Route::get('/{identifier}', [ArticleController::class, 'show']); // id or slug
        Route::post('/add', [ArticleController::class, 'addArticle']);
        Route::post('/update/{id}', [ArticleController::class, 'updateArticle']);
        Route::post('/remove/{id}', [ArticleController::class, 'removeArticle']);
    });
});



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
