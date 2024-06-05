<?php

namespace App\Listeners\Transaction;

use App\Events\Transaction\OrderConfirmedEvent;
use App\Models\Order;
use App\Models\SoldItem;
use App\Providers\Actions\OrderActions;

class RegisterSoldItems
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(OrderConfirmedEvent $event): void
    {

        $actions = new OrderActions;

        $order = $event->order;
        $orderItems = $order->order_items;

        if (!$orderItems->isEmpty()) {
            $soldItemsData = $actions->soldItemsData($order);
            SoldItem::insert($soldItemsData);
        }
    }
}