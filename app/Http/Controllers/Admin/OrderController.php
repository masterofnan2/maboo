<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatuses;
use App\Http\Controllers\Controller;
use App\Actions\AdminActions;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;

class OrderController extends Controller
{
    public function pending(AdminActions $actions)
    {
        $ids = $actions->adminIds();
        $orderItems = OrderItem::whereIn('merchant_id', $ids)
            ->where('status', '!=', OrderStatuses::CANCELLED->value)
            ->get();

        return response()->json(['orders' => $orderItems]);
    }

    public function unchecked()
    {
        $orders = Order::where('transaction_id', '!=', null)
            ->with('user')
            ->whereHas('transaction', function ($query) {
                $query->where('status', '!=', Transaction::STATUS_SUCCESS);
            })
            ->get();

        return response()->json(['orders' => $orders]);
    }
}   