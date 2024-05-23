<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('order')->controller(OrderController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('make', 'make');
    Route::get('get/{id}', 'get');
});

Route::prefix('user')->controller(UserController::class)->middleware('auth:sanctum')->group(function () {
    Route::post('/update', 'update');
    Route::post('/change-password', 'changePassword');
});

Route::prefix('category')->controller(CategoryController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/create', 'create');
        Route::post('/update', 'update');
        Route::post('/delete', 'delete');
    });

    Route::get('/{id}/products', 'products');
    Route::get('hierarchy', 'getHierarchy');
    Route::get('all', 'all');
});

Route::prefix('cart')->controller(CartController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('get', 'get');
    Route::post('add', 'add');
    Route::put('update/{id}', 'update');
    Route::post('delete', 'delete');
});

Route::prefix('product')->controller(ProductsController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/create', 'create');
        Route::post('/update', 'update');
        Route::post('/cancel-update', 'cancelUpdate');
        Route::post('/delete', 'delete');

        Route::prefix('image')->group(function () {
            Route::delete('/delete/{id}', 'deleteImage');
        });
    });

    Route::get('/get/{slug}', 'get');
    Route::get('/featured', 'featured');
});

Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/email/make_confirmation', 'makeEmailConfirmation');
        Route::post('/email/match_code', 'matchConfirmationCode');
    });

    Route::post('/forgotten-password', 'forgottenPassword');
    Route::post('/verify-email-conformity', 'verifyEmailConformity');
    Route::post('/reset-password', 'resetPassword');
});

Route::prefix('customer')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\Customer\AuthController::class)->group(function () {
        Route::post('/login', 'login');
        Route::post('/signup', 'signup');
        Route::post('/reset-password', 'resetPassword');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/user', 'getAuth');
        });
    });
});

Route::prefix('admin')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\Admin\AuthController::class)->group(function () {
        Route::post('/login', 'login');
        Route::post('/signup', 'signup');
        Route::post('/reset-password', 'resetPassword');

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/user', 'getAuth');
        });
    });

    Route::prefix('user')->controller(\App\Http\Controllers\Admin\UserController::class)->group(function () {
        Route::post('/validate', 'validate');
    })->middleware('auth:sanctum');

    Route::prefix('seller')->controller(\App\Http\Controllers\Admin\SellerController::class)->group(function () {
        Route::get('/requests', 'requests');
    })->middleware('auth:sanctum');

    Route::prefix('admin')->controller(\App\Http\Controllers\Admin\AdminController::class)->group(function () {
        Route::get('/requests', 'requests');
    })->middleware('auth:sanctum');

    Route::prefix('product')->controller(\App\Http\Controllers\Admin\ProductsController::class)->group(function () {
        Route::get('get', 'get');
    });
});

Route::prefix('seller')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\Seller\AuthController::class)->group(function () {
        Route::post('/login', 'login');
        Route::post('/signup', 'signup');
    });
});

Route::prefix('professional')->group(function () {
    Route::prefix('auth')->controller(\App\Http\Controllers\Professional\AuthController::class)->group(function () {
        Route::post('/login', 'login');
        Route::post('/signup', 'signup');
    });
});