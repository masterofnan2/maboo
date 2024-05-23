<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\MakeOrderRequest;
use App\Models\Order;
use App\Providers\Actions\CartActions;
use App\Providers\Actions\OrderActions;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function make(MakeOrderRequest $request, CartActions $cartActions, OrderActions $orderActions)
    {
        $cartItemIds = $request->cart_item_ids;

        $cartItems = $cartActions->getCartItems($cartItemIds);

        if (!$cartItems->isEmpty()) {
            $totalPrice = $cartItems->sum(fn($cartItem) => $cartItem->subtotal);
            $orderId = uuid_create();

            Order::create([
                'id' => $orderId,
                'total_price' => $totalPrice,
                'user_id' => Auth::id(),
            ]);

            $orderActions->createOrderItems($cartItemIds, $orderId);

            return response()->json(['order_id' => $orderId]);
        }
    }

    public function get(string $id, OrderActions $orderActions)
    {
        return response()->json(['order' => $orderActions->getOrder($id)]);
    }
}