<?php

namespace App\Models;

use App\Models\Scopes\Product\WithCategoryScope;
use App\Models\Scopes\Product\WithImagesScope;
use App\Models\Scopes\Product\WithMerchantScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price',
        'sale_price',
        'inStock',
        'user_id',
        'category_id',
        'slug',
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function merchant()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new WithMerchantScope);
        static::addGlobalScope(new WithImagesScope);
        static::addGlobalScope(new WithCategoryScope);
    }
}