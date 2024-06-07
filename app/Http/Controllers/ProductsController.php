<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CategoryDeleteRequest;
use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductImage;
use App\Actions\ProductActions;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    public function create(CreateProductRequest $request, ProductActions $productActions)
    {
        $data = $request->only('title', 'description', 'price', 'inStock', 'user_id', 'category_id', 'slug', 'sale_price');
        $product = Product::create($data);

        $images = $request->hasFile('images') ? $request->images : null;

        if ($images && $product) {
            $insertImagesData = $productActions->getInsertImagesData($images, $product->id);
            ProductImage::insert($insertImagesData);
        }

        return response()->json([
            'product' => $productActions->getProduct($product->id),
        ]);
    }

    public function update(UpdateProductRequest $request, ProductActions $productActions)
    {
        $data = $request->validated();
        $product = Product::find($request->id);

        if (isset($data['images'])) {
            unset($data['images']);
        }

        $images = $request->hasFile('images') ? $request->images : null;

        $productActions->deleteTrashedImages($product->id);

        if ($images && $product) {
            $insertImages = $productActions->getInsertImagesData($images, $product->id);
            ProductImage::insert($insertImages);
        }

        $updated = $product->update($data);
        return response()->json(['updated' => $updated]);
    }

    public function delete(CategoryDeleteRequest $request, ProductActions $productActions)
    {
        $ids = $request->ids;

        foreach ($ids as $id) {
            $product = $productActions->getProduct($id);
            $images = $product->images;

            if ($images->count() > 0) {
                $productActions->deleteImages($images);
            }

            $product->delete();
        }
    }

    public function deleteImage(int $id)
    {
        $deleted = ProductImage::findOrFail($id)->delete();
        return response()->json(['image' => $deleted]);
    }

    public function cancelUpdate(Request $request, ProductActions $productActions)
    {
        $request->validate(['id' => 'required|exists:products']);
        $id = $request->input('id');

        $restored = $productActions->restoreTrashedImages($id);
        return response()->json(['restored' => $restored]);
    }

    public function featured(ProductActions $productActions)
    {
        $products = $productActions->getProductsOf(null, ADMIN)->random(5);
        return response()->json(['products' => $products]);
    }

    public function get(ProductActions $productActions, Request $request)
    {
        $product = Product::where('slug', $request->slug)->first();
        return response()->json(['product' => $product]);
    }
}