<?php

namespace App\Models;

use App\Models\Scopes\OrderItem\WithCartItemScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'cart_item_id',
    ];

    public function cart_item()
    {
        return $this->belongsTo(CartItem::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new WithCartItemScope);
    }
}
