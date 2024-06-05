<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoldItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'buyer_id',
        'merchant_id',
        'product_id',
        'product_variant_id',
        'quantity',
        'subtotal',
    ];
}
