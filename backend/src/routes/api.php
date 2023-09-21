<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UnitBaseStatController;
use App\Http\Controllers\ClsController;
use App\Http\Controllers\StrengthController;
use App\Http\Controllers\WeaknessController;
use App\Http\Controllers\ParentController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/units', [UnitController::class, 'index']);
// Route::get('/unit_base_stats', [UnitBaseStatController::class, 'index']);
Route::resource('unit_base_stats', UnitBaseStatController::class)->only(['index', 'show']);
// Route::get('/unit_base_stats/', [UnitBaseStatController::class, 'index']);
Route::resource('classes', ClsController::class)->only(['index', 'show']);
Route::resource('strengths', StrengthController::class)->only(['index', 'show']);
Route::resource('weaknesses', WeaknessController::class)->only(['index', 'show']);
Route::resource('parents', ParentController::class)->only(['index']);