<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController
{

    public function login(Request $request)
    {
        // 1. Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // 2. Credentials
        $credentials = $request->only('email', 'password');

        // 3. Check auth
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password'
            ], 401);
        }

        // 4. Check if user is admin
        $user = Auth::user();

        if ($user->type !== 'admin') {
            Auth::logout();
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized access!'
            ], 403);
        }

        // 5. Success
        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'user' => $user
        ], 200);
    }

    public function index($type)
    {
        switch ($type) {
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

    public function logout(Request $request)
    {
        Auth::guard()->logout();
        $request->session()->invalidate();
        return Inertia::location('/');
    }
}
