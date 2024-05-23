<?php

namespace App\Models;

use App\Models\Scopes\Order\WithOrderItemsScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $incrementing = false; 
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'total_price',
        'transaction_id',
        'user_id',
    ];

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }

    protected static function booted(): void
    {
        static::addGlobalScope(new WithOrderItemsScope);
    }
}
