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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// This endpoint does not need authentication.
Route::get('/public', function (Request $request) {
  return response()->json(['message' => 'Hello from a public endpoint!']);
});

// Article routes
Route::get('/articles', 'Api\ArticleController@index');
Route::get('/articles/{article}', 'Api\ArticleController@show');
Route::middleware(['jwt'])->group(function () {
  Route::post('/articles', 'Api\ArticleController@store');
  Route::patch('/articles/{article}', 'Api\ArticleController@update');
  Route::delete('/articles/{article}', 'Api\ArticleController@destroy');
});

// These endpoints require a valid access token.
Route::middleware(['jwt'])->group(function () {
  Route::get('/private', function (Request $request) {
      return response()->json(['message' => 'Hello from a private endpoint!']);
  });
});

// These endpoints require a valid access token with a "read:messages" scope.
Route::middleware(['jwt:read:messages'])->group(function () {
  Route::get('/private-scoped', function (Request $request) {
      return response()->json(['message' => 'Hello from a private, scoped endpoint!']);
  });
});