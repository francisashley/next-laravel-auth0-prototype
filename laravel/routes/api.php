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

Route::get('/articles', 'Api\ArticleController@index');
Route::get('/articles/{article}', 'Api\ArticleController@show');
Route::middleware(['jwt'])->group(function () {
  Route::post('/articles', 'Api\ArticleController@store');
  Route::patch('/articles/{article}', 'Api\ArticleController@update');
  Route::delete('/articles/{article}', 'Api\ArticleController@destroy');
});