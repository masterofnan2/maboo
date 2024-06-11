<?php

namespace App\Http\Controllers;

use App\Events\Transaction\OrderConfirmedEvent;
use App\Models\Order;
use App\Models\Transaction;
use App\Actions\Transaction\OrangeMoneyActions;
use Illuminate\Http\Request;

class TransactionController extends Controller
{

    public function purchaseOrder(Request $request)
    {
        $transactionData = $response = [];

        $order_id = $request->order_id;
        $method = $request->method;

        $order = Order::find($order_id);

        if ($order->transaction?->status === Transaction::STATUS_SUCCESS)
            abort(403);

        $transactionData['transactionnable_id'] = $order_id;
        $transactionData['method'] = $method;
        $transactionData['user_id'] = $order->user_id;

        switch ($method) {
            case 'ORANGEMONEY':
                $details = (new OrangeMoneyActions)
                    ->setAmount($order->total_price)
                    ->setOrderId($order_id)
                    ->initTransaction();

                $notificationToken = $details->notif_token;
                $paymentToken = $details->pay_token;

                $transactionData['description'] = json_encode([
                    'notif_token' => $notificationToken,
                    'payment_token' => $paymentToken,
                ]);

                $response['payment_url'] = $details->payment_url;
                break;

            default:
                break;
        }

        $transaction = Transaction::create($transactionData);
        $order->update([
            'transaction_id' => $transaction->id
        ]);

        return response()->json($response);
    }

    public function orangeMoneyStatus(string $transactionnable_id, Request $request)
    {
        $transaction = Transaction::where('transactionnable_id', $transactionnable_id)->with('user')->first();
        $user = $transaction->user;

        // $description = json_decode($transaction?->description);

        // if ($description?->notif_token !== $request->notif_token) {
        //     abort(403);
        // }

        // Notification::send(
        //     $user,
        //     new CustomerTransactionNotification($transactionnable_id, $request->status)
        // );

        // (new UserActions())
        //     ->notifyAdmins(new AdminTransactionNotification($request->status, $user));

        switch ($transaction->type) {
            case Transaction::TYPE_ORDER:
                if ($request->status === Transaction::STATUS_SUCCESS) {
                    event(new OrderConfirmedEvent(Order::find($transactionnable_id)));
                }
                break;

            default:
                # code...
                break;
        }

        $transaction->update([
            'status' => $request->status
        ]);
    }
}