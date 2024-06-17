<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\UpdateStatusRequest;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Transaction;
use App\Actions\OrderActions;

class OrderController extends Controller
{

    public function delete(string $id)
    {
        $deleted = Order::find($id)->delete();
        return response()->json(['deleted' => $deleted]);
    }

    public function get(string $id, OrderActions $orderActions)
    {
        $order = $orderActions->getRefreshedOrder($id);

        if ($order->transaction?->status === Transaction::STATUS_SUCCESS)
            abort(403);

        return response()->json(['order' => $order]);
    }

    public function grouped(Order $order, OrderActions $orderActions)
    {
        $grouped = $orderActions->groupedOrderItems($order);
        return response()->json(['grouped' => $grouped]);
    }

    public function updateStatus(UpdateStatusRequest $request)
    {
        $data = $request->validated();
        $updated = OrderItem::whereIn('id', $data['ids'])->update(['status' => $data['status']]);
        return response()->json(['updated' => $updated]);
    }
}           