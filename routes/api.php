<?php

use App\Http\Controllers\tradeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/trades/create', [tradeController::class, 'store']);
Route::get('/trades', [tradeController::class, 'show']);
Route::get('/trade', [tradeController::class, 'search']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
