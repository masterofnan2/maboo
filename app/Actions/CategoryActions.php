<?php

namespace App\Actions;

use App\Models\Category;
use App\Models\Product;
use App\Providers\Helpers\Helpers;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class CategoryActions
{

    public function storeImage(UploadedFile $image): string
    {
        $path = $image->store('public/images/categories/');
        $path = str_replace('public/', '', $path);

        return $path;
    }

    public function getHierarchy(?int $id = null): array
    {
        $categories = Category::where('parent_id', $id ?? null)->get();

        $hierarchy = $categories->map(function (Category $category) {
            return [
                'category' => $category,
                'children' => $this->getHierarchy($category->id),
            ];
        })->all();

        return $hierarchy;
    }

    public function allChildrenIds(int $category_id, array &$categoryIds)
    {
        $categories = Category::where('parent_id', $category_id)->get();

        if (!$categories->isEmpty()) {
            foreach ($categories as $category) {
                $categoryIds[] = $category->id;
                $this->allChildrenIds($category->id, $categoryIds);
            }
        }
    }

    public function getProducts(int $category_id): Collection
    {
        $relatedCategoryIds = [$category_id];
        $this->allChildrenIds($category_id, $relatedCategoryIds);

        $products = Product::whereIn('category_id', $relatedCategoryIds)->get();

        return $products;
    }
}