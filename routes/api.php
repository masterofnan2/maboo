<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Customer\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductColorController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProductVariantController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SoldItemController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('sold-items')->controller(SoldItemController::class)->group(function () {
    Route::get('pending', 'pending');
});

Route::prefix('transaction')->controller(TransactionController::class)->group(function () {
    Route::prefix('order')->group(function () {
        Route::post('make', 'purchaseOrder');
    });

    Route::prefix('status')->group(function () {
        Route::post('orangemoney/{transactionnable_id}', 'orangeMoneyStatus');
    });
});

Route::prefix('search')->controller(SearchController::class)->group(function () {
    Route::get('/small/{query}', 'small');
});

Route::prefix('order')->controller(OrderController::class)
    ->middleware('auth:sanctum')
    ->group(function () {
        Route::get('get/{id}', 'get');
        Route::delete('delete/{id}', 'delete');
        Route::get('grouped/{id}', 'grouped');
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

Route::prefix('product')->group(function () {
    Route::controller(ProductsController::class)->group(function () {
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

    Route::prefix('variant')->controller(ProductVariantController::class)->middleware('auth:sanctum')->group(function () {
        Route::post('create', 'create');
        Route::post('delete', 'delete');
        Route::post('update/{id}', 'update');
    });

    Route::prefix('color')->controller(ProductColorController::class)->middleware('auth:sanctum')->group(function () {
        Route::post('create', 'create');
        Route::post('delete', 'delete');
        Route::post('update/{id}', 'update');
    });
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

    Route::prefix('order')
        ->middleware('auth:sanctum')
        ->controller(\App\Http\Controllers\Customer\OrderController::class)
        ->group(function () {
            Route::post('make', 'make');
            Route::get('all', 'all');
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

    Route::prefix('order')
        ->controller(\App\Http\Controllers\Admin\OrderController::class)
        ->middleware('auth:sanctum')
        ->group(function () {
            Route::get('processing', 'processing');
            Route::get('unchecked', 'unchecked');
            Route::put('update-transaction/{id}', 'updateTransaction');
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