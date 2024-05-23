<?php

namespace App\Providers\Actions;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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
        $item = CartItem::find($id);

        if ($cartItem['quantity']) {
            $subtotal = $this->getRowSubtotal($item->product_id, $cartItem['quantity']);
            $cartItem['subtotal'] = $subtotal;
        }

        $updated = $item->update($cartItem);
        return $updated;
    }

    public function addToCart(array $cartItem): bool
    {
        $cartItem['user_id'] = $this->user->id;
        $existingCartItem = $this->getSimilarCartItem($cartItem);

        if ($existingCartItem) {
            return $this->editCartItem($existingCartItem->id, $cartItem);
        }

        $subtotal = $this->getRowSubtotal($cartItem['product_id'], $cartItem['quantity']);
        $cartItem['subtotal'] = $subtotal;

        $added = CartItem::create($cartItem);
        return boolval($added);
    }

    public function getCartItems(?array $ids = null): Collection
    {
        $CartItem = CartItem::where('user_id', $this->user->id)
            ->where('ordered_at', null);

        if ($ids && !empty($ids)) {
            $CartItem = $CartItem->whereIn('id', $ids);
        }

        return $CartItem->get();
    }

    public function deleteCartItems(array $cartItemIds): bool
    {
        $deleted = CartItem::whereIn('id', $cartItemIds)->delete();
        return $deleted;
    }

    public function getRowSubtotal($productId, $quantity): int
    {
        $product = Product::find($productId);

        if ($product) {
            $subtotal = ($product->sale_price > 0 ? $product->sale_price : $product->price) * $quantity;
            return $subtotal;
        } else {
            throw ValidationException::withMessages([
                'product_id' => 'The product does not exist'
            ]);
        }
    }
}