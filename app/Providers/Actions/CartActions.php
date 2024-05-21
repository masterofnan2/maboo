<?php

namespace App\Providers\Actions;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CartActions extends Actions
{
    protected $user;

    public function __construct()
    {
        $this->user = Auth::user();
    }

    public function getSimilarCartItem(array $cartItem): CartItem|Model|null
    {
        $CartItem = CartItem::where('product_id', $cartItem['product_id']);

        if (isset($cartItem['product_color_id']) && !empty($cartItem['product_color_id'])) {
            $CartItem = $CartItem->where('product_color_id', $cartItem['product_color_id']);
        }

        if (isset($cartItem['product_variant_id']) && !empty($cartItem['product_color_id'])) {
            $CartItem = $CartItem->where('product_variant_id', $cartItem['product_variant_id']);
        }

        return $CartItem->first();
    }

    public function editCartItem(int $id, array $cartItem)
    {
        $updated = CartItem::where('id', $id)->update($cartItem);
        return $updated;
    }

    public function addToCart(array $cartItem): bool
    {
        $cartItem['user_id'] = $this->user->id;
        $existingCartItem = $this->getSimilarCartItem($cartItem);

        if ($existingCartItem) {
            return $this->editCartItem($existingCartItem->id, $cartItem);
        }

        $added = CartItem::create($cartItem);
        return boolval($added);
    }

    public function getCartItems(): Collection
    {
        $CartItem = CartItem::with([
            'product' => function ($query) {
                $query->with('images');
            }
            ,
            'product_variant',
            'product_color'
        ])
            ->where('user_id', $this->user->id)
            ->where('ordered_at', null)
            ->get();

        return $CartItem;
    }

    public function deleteCartItems(array $cartItemIds): bool
    {
        $deleted = CartItem::whereIn('id', $cartItemIds)->delete();
        return $deleted;
    }
}