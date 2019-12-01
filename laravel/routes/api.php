<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/posts', 'Api\PostController@index');
Route::get('/posts/{post}', 'Api\PostController@get');
Route::middleware(['jwt'])->group(function () {
    Route::post('/posts', 'Api\PostController@store');
    Route::patch('/posts/{post}', 'Api\PostController@update');
    Route::delete('/posts/{post}', 'Api\PostController@destroy');
});

Route::get('/users', 'Api\UserController@index');
Route::get('/users/{user}', 'Api\UserController@get');
Route::get('/users/{user}/posts', 'Api\PostController@getByUser');
Route::middleware(['jwt'])->group(function () {
    Route::get('/me', 'Api\UserController@me');
    Route::patch('/me', 'Api\UserController@update');
});