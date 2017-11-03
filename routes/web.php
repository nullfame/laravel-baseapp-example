<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth middleware around all routes
Route::group(['middleware' => ['auth', 'fast_user_switch']], function () {
    Route::get('/', function () {
        return view('home');
    });
    Route::get('/admin', function () {
        return view('admin');
    });
});

// API routes outside of WebSSO and usual middleware
//
