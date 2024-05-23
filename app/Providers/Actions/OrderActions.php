<?php

namespace App\Providers\Actions;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use App\Providers\Helpers\Helpers;

class OrderActions extends Actions
{
    public function getOrder(string $id)
    {
        return Order::find($id);
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
}