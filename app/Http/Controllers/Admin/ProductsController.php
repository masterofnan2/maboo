<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Actions\ProductActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductsController extends Controller
{
    public function get(ProductActions $productActions)
    {
        $products = $productActions->getProductsOf(null, ADMIN);
        return response()->json(['products' => $products]);
    }
}
