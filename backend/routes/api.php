<?php

use App\Http\Controllers\Api\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Api\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\Admin\UserController as AdminCUserController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'getUsers']);

});

Route::get('articles/{page}', [ArticleController::class, 'index']);
Route::get('article/{id}', [ArticleController::class, 'show']);
Route::get('articles/category/{id}/{page}', [ArticleController::class, 'articlesAllByCategoryId']);
Route::get('article-slug/{slug}', [ArticleController::class, 'searchArticleBySlug']);

Route::get('categories/{page}', [CategoryController::class, 'index']);
Route::get('category/{id}', [CategoryController::class, 'show']);


Route::group(['middleware' => ['auth:api', 'checkUserRole:ADMIN'], 'prefix' => 'admin'], function () {

    Route::get('users/{page}', [UserController::class, 'index']);
    Route::get('user/{id}', [UserController::class, 'show']);

    Route::post('article', [AdminArticleController::class, 'create']);
    Route::put('article/{id}', [AdminArticleController::class, 'update']);
    Route::delete('article-delete/{id}', [AdminArticleController::class, 'delete']);

    Route::post('category', [AdminCategoryController::class, 'create']);
    Route::put('category/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('category-delete/{id}', [AdminCategoryController::class, 'delete']);

    Route::post('user', [AdminCUserController::class, 'create']);
    Route::put('user/{id}', [AdminCUserController::class, 'update']);
    Route::delete('user-delete/{id}', [AdminCUserController::class, 'delete']);
});

