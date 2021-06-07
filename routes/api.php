<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseChartController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SignupController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('expense-categories', ExpenseCategoryController::class)->except(['create', 'show']);
    Route::resource('expenses', ExpenseController::class)->except(['create', 'show']);

    Route::prefix('settings')->group(function () {
        Route::resource('permissions', PermissionController::class)->except(['create', 'show']);
        Route::resource('roles', RoleController::class)->except(['create', 'show']);
        Route::resource('users', UserController::class)->except(['create', 'show']);
        Route::post('change-password', [UserController::class, 'changePassword']);
    });

    Route::get('expense-chart', [ExpenseChartController::class, 'index']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('logout', [AuthController::class, 'logout']);
});

Route::post('signup', [SignupController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);
