<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController
{
    public function index($type) {
    switch($type){
        case 'dashboard':
            return Inertia::render('Welcome');
            
            case 'articles':
                return Inertia::render('articles/page');
                
        case 'categories':
            return Inertia::render('categories/page');

            case 'users':
            return Inertia::render('users/page');
            
            case 'settings':
            return Inertia::render('settings/page');
            
            default:
            return Inertia::render('Welcome');
    }
}

}
