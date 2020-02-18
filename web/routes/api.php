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

Route::post('register', 'API\RegisterAPIController@register');
Route::post('forgot', 'API\ForgotPasswordAPIController@sendResetLinkEmail');

Route::middleware('auth:api')->group( function() {
    Route::get('products', 'API\ProductsAPIController@index');
    Route::get('products/{id}', 'API\ProductsAPIController@show');
    Route::post('products', 'API\ProductsAPIController@store');
    Route::put('products/{id}', 'API\ProductsAPIController@update');
    Route::delete('products/{id}', 'API\ProductsAPIController@delete');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});