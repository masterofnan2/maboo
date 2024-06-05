<?php

namespace App\Providers\Actions;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Providers\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;

class OrderActions extends Actions
{

    public function getUser(string $order_id)
    {
        $order = Order::with('user')->find($order_id);
        return $order->user;
    }

    protected function orderCartItems(array $cartItemIds)
    {
        CartItem::whereIn('id', $cartItemIds)
            ->update([
                'ordered_at' => Helpers::getIsoString(date_create())
            ]);
    }

    protected function toFormatedOrderItem(int $cartItemId, string $orderId)
    {
        return [
            'cart_item_id' => $cartItemId,
            'order_id' => $orderId,
        ];
    }

    public function createOrderItems(array $cartItemIds, string $orderId): bool
    {
        $orderItemsData = [];

        foreach ($cartItemIds as $cartItemId) {
            $orderItemsData[] = $this->toFormatedOrderItem($cartItemId, $orderId);
        }

        $this->orderCartItems($cartItemIds);
        return OrderItem::insert($orderItemsData);
    }

    public function groupOrderItems(Model|Order $order): array
    {
        $dispatched = [];
        $orderItems = $order->order_items;

        $adminId = null;

        foreach ($orderItems as $orderItem) {
            $cartItem = $orderItem->cartItem;
            $product = $cartItem->product;
            $merchant = $product->merchant;

            $merchant_id = $merchant->id;

            if ($merchant->type === ADMIN) {
                if (!$adminId) {
                    $adminId = $merchant->id;
                }

                $merchant_id = $adminId;
            }

            if (isset($dispatched[$merchant_id]) && !empty($dispatched[$merchant_id])) {
                $dispatched[$merchant_id][] = $orderItem;
            } else {
                $dispatched[$merchant_id] = [$orderItem];
            }
        }

        return $dispatched;
    }

    public function getOrderTotalPrice(Order|int $orderInfo)
    {
        $order = $orderInfo;
        $sum = 0;

        if (gettype($orderInfo) === "integer") {
            $order = Order::find($orderInfo);
        }

        $orderItems = $order->order_items;
        $cartActions = new CartActions();

        foreach ($orderItems as $orderItem) {
            $cartItem = $orderItem->cart_item;
            $product = $cartItem->product;

            $subTotal = $cartActions->getProductPrice($product, [
                'quantity' => $cartItem->quantity,
                'product_variant_id' => $cartItem->product_variant_id,
            ]);
            $sum += $subTotal;
        }

        return $sum;
    }

    public function getRefreshedOrder(string $order_id)
    {
        $order = Order::find($order_id);
        $newTotal = $this->getOrderTotalPrice($order);

        if ($order->total_price !== $newTotal) {
            $order->total_price = $newTotal;
            $order->save();
        }

        return $order;
    }

    public function soldItemsData(Order $order): array
    {
        $soldItemsData = [];

        foreach ($order->order_items as $order_item) {
            /** @var CartItem */
            $cart_item = $order_item->cart_item;

            $soldItemsData[] = [
                'buyer_id' => $order->user_id,
                'product_id' => $cart_item->product_id,
                'merchant_id' => $cart_item->product->user_id,
                'product_variant_id' => $cart_item->product_variant_id,
                'order_id' => $order->id,
                'quantity' => $cart_item->quantity,
                'subtotal' => $cart_item->subtotal,
            ];
        }

        return $soldItemsData;
    }
}