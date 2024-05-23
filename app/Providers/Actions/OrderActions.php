<?php

namespace App\Providers\Actions;

use App\Models\Order;
use App\Models\OrderItem;

class OrderActions extends Actions
{
    public function getOrder(string $id)
    {
        $order = Order::with([
            'order_items' => function ($query) {
                $query->with([
                    'cart_item' => function ($query) {
                        $query->with([
                            'product' => function ($query) {
                                $query->with('images', 'merchant');
                            },
                            'product_variant',
                            'product_color',
                        ]);
                    }
                ]);
            }
        ]);

        return $order->find($id);
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

        return OrderItem::insert($orderItemsData);
    }
}