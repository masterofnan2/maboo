<?php

namespace App\Providers\Actions;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Providers\Helpers\Helpers;
use Illuminate\Database\Eloquent\Model;

class OrderActions extends Actions
{
    public function getOrder(string $id)
    {
        return Order::find($id);
    }

    public function getUser(string $order_id)
    {
        $order = $this->getOrder($order_id)->with('user')->first();
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
}   