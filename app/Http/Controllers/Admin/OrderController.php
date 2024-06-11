<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatuses;
use App\Events\Transaction\OrderConfirmedEvent;
use App\Http\Controllers\Controller;
use App\Actions\AdminActions;
use App\Http\Requests\Order\UpdateTransactionRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function processing(AdminActions $actions)
    {
        $ids = $actions->adminIds();
        $orderItems = OrderItem::whereIn('merchant_id', $ids)
            ->with('user')
            ->where('status', OrderStatuses::PROCESSING->value)
            ->get();

        return response()->json(['orders' => $orderItems]);
    }

    public function unchecked()
    {
        $orders = Order::where('transaction_id', '!=', null)
            ->with('user')
            ->whereHas('transaction', function ($query) {
                $query
                    ->where('status', '!=', Transaction::STATUS_SUCCESS)
                    ->where('status', '!=', Transaction::STATUS_CANCELLED);
            })
            ->get();

        return response()->json(['orders' => $orders]);
    }

    public function updateTransaction(string $id, UpdateTransactionRequest $request): JsonResponse
    {
        $updated = false;
        $order = Order::find($id);
        $transaction = $order->transaction;

        if ($request->status === Transaction::STATUS_SUCCESS) {
            event(new OrderConfirmedEvent($order));
        }

        if ($transaction) {
            $transaction->status = $request->status;
            $updated = $transaction->save();
        }

        return response()->json(['updated' => $updated]);
    }
}