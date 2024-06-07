<?php 

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\MakeOrderRequest;
use App\Models\Order;
use App\Actions\CartActions;
use App\Actions\OrderActions;
use Illuminate\Support\Facades\Auth;


class OrderController extends Controller{
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

    public function all()
    {
        $orders = Order::where('user_id', Auth::id())->latest('created_at')->get();
        return response()->json(['orders' => $orders]);
    }
}